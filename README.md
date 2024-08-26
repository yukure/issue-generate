# Issue generate

## Description

Issue generate by [Octokit](https://github.com/octokit/octokit.js)

## Installation

### Personal access token の発行

https://github.com/settings/personal-access-tokens/new

まずは上記URLへアクセスして下記の箇条書きを参考にTokenの発行をしてください。

- `Token name`: 任意で名前をつけてください
- `Expiration`: Tokenの有効期限
- `Resource owner`: Issue を作りたいリポジトリが属している Organization or アカウント名
- `Repository access`: `Only select repositories`を選択し、Issue を作成したいリポジトリのみを選択
- `Permissions`: Issues を `Read and write` に設定

### Install package

```shell
npm i
```

### .env & .txt

- `.env.tmp` と `body-elements.txt.tmp` の `.tmp` を取り除く
- `.env` の下記を埋める
  - **OWNER**: リポジトリのオーナー（Organization名）
  - **REPO**: リポジトリ名
  - **ISSUE_LABELS**: Issueに紐づけたいラベル
  - **GH_TOKEN**: 発行した `github_***` の形式のToken
- `body-elements.txt` には下記のような形式でテキストを入力する
  -

```
Issue_title1 // タイトル(大文字の英字始まりの必要あり。重複不可。)
method_1
method_2
method_3

Issue_title2
method_4
method_5
method_6

Issue_title3
method_7
method_8
method_9
```

### Issue body

- `src/util.ts` の `generateIssueBody()` に生成したいIssueのDescriptionを追加
- 引数などをいじればいろんな形式のDescriptionに対応できる

### Issue generate

```ruby
npm run build
```
