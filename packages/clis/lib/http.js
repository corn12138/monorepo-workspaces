const axios = require('axios')


async function geRepoList() {
    const  data  = await axios.get('http://api.github.com/orgs/FEcourseZone/repos') // 获取远程仓库列表
    return data
}
async function geTagList(repo) {
    const  data  = await axios.get(`http://api.github.com/orgs/FEcourseZone/${repo}/repos`) // 获取远程仓库列表
    return data
}

module.exports ={
    geRepoList,
    geTagList
}