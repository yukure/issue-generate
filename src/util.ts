import { Octokit } from "octokit"

export const generateIssueBody = (title: string, methods: []) => {
    return ``
}

export const createIssue = async (owner: string, repo: string, labels: string[], title: string, body: string) => {
    const octokit = new Octokit({
        auth: process.env.GH_TOKEN
    });

    try {
        await octokit.request('POST /repos/{owner}/{repo}/issues', {
            owner: owner,
            repo: repo,
            title: `\`${ title }\``,
            body: body,
            labels: labels,
            headers: { 'X-GitHub-Api-Version': '2022-11-28' }
        });
    } catch (error) {
        console.log(error);
    }
}
