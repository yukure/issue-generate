import fs from 'fs'
import 'dotenv/config'
import { generateIssueBody, createIssue } from './util'


// MEMO: 20Issue同時登録しようとするとエラーになるので、18~19Issueずつ登録する
const body_elements = fs.readFileSync('./src/body-elements.txt', 'utf8')
const suspicious_code_array = body_elements.split('\n')
const issue_tag = process.env.ISSUE_LABELS.split(',')
const dead_code_array = {}
let isTitle = true
let processing_title = ''

/**
 * - Issueのタイトルはテキストファイルの１行目&空行の後の行の想定
 * - タイトル以降は空行が来るまでのテキストをタイトルのKeyの配列に格納する
 *
 * 【入力される値】
 * Issue_title1
 * method_1
 * method_2
 * method_3
 *
 * Issue_title2
 * method_4
 * method_5
 * method_6
 *
 * Issue_title3
 * method_7
 * method_8
 * method_9
 *
 * 【生成される値】
 * {
 *   Issue_title1: [ 'method_1', 'method_2', 'method_3' ],
 *   Issue_title2: [ 'method_4', 'method_5', 'method_6' ],
 *   Issue_title3: [ 'method_7', 'method_8', 'method_9' ]
 * }
 */
while (suspicious_code_array.length) {
    const line = suspicious_code_array[0]

    if (!isTitle && line !== '') dead_code_array[processing_title].push(line)

    if (isTitle) {
        processing_title = line
        Object.assign(dead_code_array, {[line]: []})
        isTitle = false
    }

    if (!isTitle && line === '') {
        processing_title = ''
        isTitle = true
    }
    suspicious_code_array.shift()
}

console.log('process start')
for (const title in dead_code_array) {
    // https://docs.github.com/ja/rest/issues/issues?apiVersion=2022-11-28#create-an-issue
    await createIssue(
        process.env.OWNER,
        process.env.REPO,
        issue_tag,
        title,
        generateIssueBody(title, dead_code_array[title])
    );

    console.log(`Issue: ${title} created`);
}
console.log('process end')

