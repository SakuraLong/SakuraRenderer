import { Octokit } from "octokit";
import Template from "./template";
import utils from "../../../utils";

class GithubParser extends Template {
    constructor(option, content, rendererData, parserData) {
        super(option, content, rendererData, parserData);
        this.name = ["github"]; // 这个模板的名字
    }
    judge() {
        if (this.name.indexOf(this.dataList[0]) !== -1) {
            return true;
        } else {
            return false;
        }
    }
    
    analyseTemplate(content) {
        const githubImgId = "github-img-" + (parseInt(Math.random() * 100000000)).toString();
        const githubAId = "github-a-" + (parseInt(Math.random() * 100000000)).toString();
        this.dataListInit(content); // 对dataList初始化，必须要写
        if (!this.judge()) return content; // 判断是不是这个模板
        let login = ""; // 文本内容
        const github = document.createElement("span");
        const avatar = document.createElement("img");
        const a = document.createElement("a");
        const switchKeyValue = (key, value) => {
            switch (key) {
                case "login":
                    login=value;
                    return true;
            }
            return false;
        };
        this.dataList.forEach((data, index) => {
            const key = data.split("=")[0];
            const left = data.indexOf("=");
            const value = data.slice(left + 1, data.length);
            switch (index) {
                case 1:
                    if (switchKeyValue(key, value)) break;
                    else login = data;
                    break;
            }
        });

        avatar.setAttribute("id", githubImgId);
        a.setAttribute("id", githubAId);
        github.classList.add("sr-github");
        avatar.draggable = false;
        a.target = "_blank";
        a.rel = "nofollow noopener noreferrer";
        a.textContent = login;
        github.appendChild(avatar);
        github.appendChild(a);

        const githubItem = github.outerHTML;

        if(login === "") return githubItem;

        const getUserInfo = async (login) => {
            const token = this.rendererData.userData.githubToken;
            const auth = token === null || token === undefined ? null : token;
            const octokit = new Octokit({
                auth: auth,
            });

            const response = await octokit.request(`GET /users/${login}`, {
                headers: {
                    "X-Github-Api-Version": "2022-11-28",
                }
            });
            if(response.status !== 200) return;
            const user = response.data;

            if(user.avatar_url === undefined) {
                return;
            }
            const userImage = user.avatar_url;
            const username = user.name === null ? user.login : user.name;
            const userurl = user.html_url;
            const saveData = {
                userImage: userImage,
                username: username,
                userurl: userurl,
                timestamp: new Date().getTime()
            };
            const dataMap = utils.get(0, "SARE", {SARE: true}, "JSON");
            dataMap.github[login] = saveData;
            utils.set(0, "SARE", dataMap, "JSON");
            const timer = setInterval(() => {
                if(document.getElementById(githubImgId) !== undefined && document.getElementById(githubImgId) !== null) {
                    document.getElementById(githubImgId).src = userImage;
                    document.getElementById(githubAId).textContent = username;
                    document.getElementById(githubAId).href = userurl;
                    clearInterval(timer);
                }
            }, 100);
        };
        const time = 1000 * 60 * 60 * 24; // 一天
        let needSearch = true;
        let data = {};
        const dataMap = utils.get(0, "SARE", {SARE: true}, "JSON");
        if(dataMap.github === null || dataMap.github === undefined) dataMap.github = {};
        try {
            if(dataMap.github[login] !== null && dataMap.github[login] !== undefined) {
                data = dataMap.github[login];
                const timestamp = data.timestamp;
                try {
                    if(new Date().getTime() - timestamp < time) {
                        if(data.userImage !== undefined && data.userImage !== null && data.username !== undefined && data.username !== null && data.userurl !== undefined && data.userurl !== null) {
                            needSearch = false;
                        }
                    }
                }
                catch {
                    needSearch = true;
                }
            }
        }
        catch {
            dataMap.github = {};
        }
        utils.set(0, "SARE", dataMap, "JSON");
        if(needSearch) {
            console.log("搜索github用户");
            getUserInfo(login);
        }
        else {
            const timer = setInterval(() => {
                if(document.getElementById(githubImgId) !== undefined && document.getElementById(githubImgId) !== null) {
                    document.getElementById(githubImgId).src = data.userImage;
                    document.getElementById(githubAId).textContent = data.username;
                    document.getElementById(githubAId).href = data.userurl;
                    clearInterval(timer);
                }
            }, 100);
        }

        return githubItem; // 返回被替换的内容
    }
}

export default GithubParser;
