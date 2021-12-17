const $ = new Env("东东小窝_Timorpic"),
    notify = $.isNode() ? require("./sendNotify") : "",
    jdCookieNode = $.isNode() ? require("./jdCookie.js") : "";
let cookiesArr = [],
    cookie = "",
    message = "",
    isPurchaseShops = !1;
$.helpToken = [], $.isNode() ? (Object.keys(jdCookieNode).forEach((item => {
    cookiesArr.push(jdCookieNode[item])
})), process.env.JD_DEBUG && "false" === process.env.JD_DEBUG && (console.log = () => {})) : cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonParse($.getdata("CookiesJD") || "[]").map((item => item.cookie))].filter((item => !!item)), $.newShareCodes = [];
const JD_API_HOST = "https://lkyl.dianpusoft.cn/api";
async function smallHome() {
    try {
        if (await loginHome(), await ssjjRooms(), !$.isUnLock) return;
        await createInviteUser(), await queryDraw(), await lottery(), await doAllTask(), await queryByUserId(), await queryFurnituresCenterList(), await showMsg()
    } catch (e) {
        $.logErr(e)
    }
}

function showMsg() {
    return new Promise((resolve => {
        $.msg($.name, "", `【京东账号${$.index}】${$.nickName}\n${message}`), resolve()
    }))
}
async function lottery() {
    $.freeDrawCount > 0 ? await drawRecord($.lotteryId) : console.log("免费抽奖机会今日已使用\n")
}
async function doChannelsListTask(taskId, taskType) {
    await queryChannelsList(taskId);
    for (let item of $.queryChannelsList) 1 === item.showOrder && (await $.wait(1e3), await followChannel(taskId, item.id), await queryDoneTaskRecord(taskId, taskType))
}
async function helpFriends() {
    if ($.inviteCodes && $.inviteCodes.inviteCode && $.inviteCodes.inviteCode.length) {
        console.log("\n去帮助作者\n");
        for (let item of $.inviteCodes.inviteCode) item && await createAssistUser(item, $.createAssistUserID)
    }
}
async function doAllTask() {
    await queryAllTaskInfo(), console.log(" 任务名称   完成进度 ");
    for (let item of $.taskList) console.log(`${item.ssjjTaskInfo.name}      ${item.doneNum}/${item.ssjjTaskInfo.awardOfDayNum||(1===item.ssjjTaskInfo.type?4:1)}`);
    for (let item of $.taskList) {
        if (1 === item.ssjjTaskInfo.type && ($.createAssistUserID = item.ssjjTaskInfo.id, console.log(`\n\n助力您的好友:${item.doneNum}人\n\n`)), 2 === item.ssjjTaskInfo.type) {
            if (item.doneNum >= (item.ssjjTaskInfo.awardOfDayNum || 1)) {
                console.log(`${item.ssjjTaskInfo.name}已完成[${item.doneNum}/${item.ssjjTaskInfo.awardOfDayNum||1}]`);
                continue
            }
            await clock(item.ssjjTaskInfo.id, item.ssjjTaskInfo.awardWoB)
        }
        if (3 === item.ssjjTaskInfo.type) {
            if (item.doneNum >= item.ssjjTaskInfo.awardOfDayNum) {
                console.log(`${item.ssjjTaskInfo.name}已完成[${item.doneNum}/${item.ssjjTaskInfo.awardOfDayNum}]`);
                continue
            }
            for (let i = 0; i < new Array(item.ssjjTaskInfo.awardOfDayNum || 1).fill("").length; i++) await game(item.ssjjTaskInfo.id, item.doneNum)
        }
        if (4 === item.ssjjTaskInfo.type) {
            if (item.doneNum >= item.ssjjTaskInfo.awardOfDayNum) {
                console.log(`${item.ssjjTaskInfo.name}已完成[${item.doneNum}/${item.ssjjTaskInfo.awardOfDayNum}]`);
                continue
            }
            for (let i = 0; i < new Array(item.ssjjTaskInfo.awardOfDayNum).fill("").length; i++) await followShops("followShops", item.ssjjTaskInfo.id), await queryDoneTaskRecord(item.ssjjTaskInfo.id, item.ssjjTaskInfo.type)
        }
        if (5 === item.ssjjTaskInfo.type) {
            if (item.doneNum >= item.ssjjTaskInfo.awardOfDayNum) {
                console.log(`${item.ssjjTaskInfo.name}已完成[${item.doneNum}/${item.ssjjTaskInfo.awardOfDayNum}]`);
                continue
            }
            for (let i = 0; i < new Array(item.ssjjTaskInfo.awardOfDayNum).fill("").length; i++) await browseChannels("browseShops", item.ssjjTaskInfo.id, item.browseId)
        }
        if (6 === item.ssjjTaskInfo.type) {
            if (item.doneNum >= item.ssjjTaskInfo.awardOfDayNum) {
                console.log(`${item.ssjjTaskInfo.name}已完成[${item.doneNum}/${item.ssjjTaskInfo.awardOfDayNum}]`);
                continue
            }
            await doChannelsListTask(item.ssjjTaskInfo.id, item.ssjjTaskInfo.type)
        }
        if (7 === item.ssjjTaskInfo.type) {
            if (item.doneNum >= item.ssjjTaskInfo.awardOfDayNum) {
                console.log(`${item.ssjjTaskInfo.name}已完成[${item.doneNum}/${item.ssjjTaskInfo.awardOfDayNum}]`);
                continue
            }
            for (let i = 0; i < new Array(item.ssjjTaskInfo.awardOfDayNum || 1).fill("").length; i++) await browseChannels("browseChannels", item.ssjjTaskInfo.id, item.browseId)
        }
        if (isPurchaseShops = $.isNode() ? process.env.PURCHASE_SHOPS ? process.env.PURCHASE_SHOPS : isPurchaseShops : $.getdata("isPurchaseShops") ? $.getdata("isPurchaseShops") : isPurchaseShops, isPurchaseShops && 9 === item.ssjjTaskInfo.type) {
            if (item.doneNum >= item.ssjjTaskInfo.awardOfDayNum) {
                console.log(`${item.ssjjTaskInfo.name}已完成[${item.doneNum}/${item.ssjjTaskInfo.awardOfDayNum}]`);
                continue
            }
            for (let i = 0; i < new Array(item.ssjjTaskInfo.awardOfDayNum).fill("").length; i++) await followShops("purchaseCommodities", item.ssjjTaskInfo.id), await queryDoneTaskRecord(item.ssjjTaskInfo.id, item.ssjjTaskInfo.type)
        }
        if (10 === item.ssjjTaskInfo.type) {
            if (item.doneNum >= item.ssjjTaskInfo.awardOfDayNum) {
                console.log(`${item.ssjjTaskInfo.name}已完成[${item.doneNum}/${item.ssjjTaskInfo.awardOfDayNum}]`);
                continue
            }
            for (let i = 0; i < new Array(item.ssjjTaskInfo.awardOfDayNum).fill("").length; i++) await browseChannels("browseCommodities", item.ssjjTaskInfo.id, item.browseId)
        }
        if (11 === item.ssjjTaskInfo.type) {
            if (item.doneNum >= item.ssjjTaskInfo.awardOfDayNum) {
                console.log(`${item.ssjjTaskInfo.name}已完成[${item.doneNum}/${item.ssjjTaskInfo.awardOfDayNum}]`);
                continue
            }
            for (let i = 0; i < new Array(item.ssjjTaskInfo.awardOfDayNum || 1).fill("").length; i++) await browseChannels("browseMeetings", item.ssjjTaskInfo.id, item.browseId)
        }
    }
}

function queryFurnituresCenterList() {
    return new Promise((resolve => {
        $.get(taskUrl("ssjj-furnitures-center/queryFurnituresCenterList"), (async (err, resp, data) => {
            try {
                if (err) console.log(`${JSON.stringify(err)}`), console.log(`${$.name} API请求失败，请检查网路重试`);
                else if (safeGet(data) && 200 === (data = JSON.parse(data)).head.code && data.body) {
                    let {
                        buy: buy,
                        list: list
                    } = data.body;
                    $.canBuyList = [], list.map(((item, index) => {
                        buy.some((buyItem => buyItem === item.id)) || $.canBuyList.push(item)
                    })), $.canBuyList.sort(sortByjdBeanNum), $.canBuyList[0].needWoB <= $.woB ? await furnituresCenterPurchase($.canBuyList[0].id, $.canBuyList[0].jdBeanNum) : (console.log(`\n兑换${$.canBuyList[0].jdBeanNum}京豆失败:当前wo币${$.woB}不够兑换所需的${$.canBuyList[0].needWoB}WO币`), message += `【装饰领京豆】兑换${$.canBuyList[0].jdBeanNum}京豆失败,原因:WO币不够\n`)
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data)
            }
        }))
    }))
}

function furnituresCenterPurchase(id, jdBeanNum) {
    return new Promise((resolve => {
        $.post(taskPostUrl(`ssjj-furnitures-center/furnituresCenterPurchase/${id}`), (async (err, resp, data) => {
            try {
                err ? (console.log(`${JSON.stringify(err)}`), console.log(`${$.name} API请求失败，请检查网路重试`)) : safeGet(data) && 200 === (data = JSON.parse(data)).head.code && (message += `【装饰领京豆】${jdBeanNum}兑换成功\n`, await notify.sendNotify($.name, `【京东账号 ${$.index}】 ${$.UserName||$.nickName}\n【装饰领京豆】${jdBeanNum}兑换成功`))
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data)
            }
        }))
    }))
}

function queryByUserId() {
    return new Promise((resolve => {
        $.get(taskUrl("ssjj-wo-home-info/queryByUserId/2"), ((err, resp, data) => {
            try {
                err ? (console.log(`${JSON.stringify(err)}`), console.log(`${$.name} API请求失败，请检查网路重试`)) : safeGet(data) && 200 === (data = JSON.parse(data)).head.code && data.body && (message += `【小窝名】${data.body.name}\n`, $.woB = data.body.woB, message += `【当前WO币】${data.body.woB}\n`)
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data)
            }
        }))
    }))
}

function queryChannelsList(taskId) {
    return new Promise((resolve => {
        $.get(taskUrl(`ssjj-task-channels/queryChannelsList/${taskId}`), ((err, resp, data) => {
            try {
                err ? (console.log(`${JSON.stringify(err)}`), console.log(`${$.name} API请求失败，请检查网路重试`)) : safeGet(data) && 200 === (data = JSON.parse(data)).head.code && data.body && ($.queryChannelsList = data.body)
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data)
            }
        }))
    }))
}

function browseChannels(functionID, taskId, browseId) {
    return new Promise((resolve => {
        $.get(taskUrl(`/ssjj-task-record/${functionID}/${taskId}/${browseId}`), ((err, resp, data) => {
            try {
                err ? (console.log(`${JSON.stringify(err)}`), console.log(`${$.name} API请求失败，请检查网路重试`)) : safeGet(data) && (console.log("" + ("browseChannels" === functionID ? "浏览频道" : "browseMeetings" === functionID ? "浏览会场" : "browseShops" === functionID ? "浏览店铺" : "浏览商品"), data), 200 === (data = JSON.parse(data)).head.code && data.body)
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data)
            }
        }))
    }))
}

function queryDoneTaskRecord(taskId, taskType) {
    return new Promise((resolve => {
        $.get(taskUrl(`/ssjj-task-record/queryDoneTaskRecord/${taskType}/${taskId}`), ((err, resp, data) => {
            try {
                err ? (console.log(`${JSON.stringify(err)}`), console.log(`${$.name} API请求失败，请检查网路重试`)) : safeGet(data) && 200 === (data = JSON.parse(data)).head.code && data.body
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data)
            }
        }))
    }))
}

function followShops(functionID, taskId) {
    return new Promise((async resolve => {
        $.get(taskUrl(`/ssjj-task-record/${functionID}/${taskId}`), ((err, resp, data) => {
            try {
                err ? (console.log(`${JSON.stringify(err)}`), console.log(`${$.name} API请求失败，请检查网路重试`)) : safeGet(data) && 200 === (data = JSON.parse(data)).head.code && data.body && console.log(`${"followShops"===functionID?"一键关注店铺":"一键加购商品"}结果：${data.head.msg}`)
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data)
            }
        }))
    }))
}

function followChannel(taskId, channelId) {
    return new Promise((async resolve => {
        $.get(taskUrl(`/ssjj-task-record/followChannel/${channelId}/${taskId}`), ((err, resp, data) => {
            try {
                err ? (console.log(`${JSON.stringify(err)}`), console.log(`${$.name} API请求失败，请检查网路重试`)) : safeGet(data) && 200 === (data = JSON.parse(data)).head.code && data.body
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data)
            }
        }))
    }))
}

function createInviteUser() {
    return new Promise((resolve => {
        $.get(taskUrl("/ssjj-task-record/createInviteUser"), ((err, resp, data) => {
            try {
                err ? (console.log(`${JSON.stringify(err)}`), console.log(`${$.name} API请求失败，请检查网路重试`)) : safeGet(data) && 200 === (data = JSON.parse(data)).head.code && data.body && data.body.id && (console.log(`\n您的${$.name}shareCode(每天都是变化的):【${data.body.id}】\n`), $.shareCode = data.body.id, $.newShareCodes.push({
                    code: data.body.id,
                    token: $.token,
                    cookie: cookie
                }))
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data)
            }
        }))
    }))
}

function createAssistUser(inviteId, taskId) {
    return new Promise((resolve => {
        $.get(taskUrl(`/ssjj-task-record/createAssistUser/${inviteId}/${taskId}`), ((err, resp, data) => {
            try {
                err ? (console.log(`${JSON.stringify(err)}`), console.log(`${$.name} API请求失败，请检查网路重试`)) : safeGet(data) && (200 === (data = JSON.parse(data)).head.code ? data.body && console.log(`给好友${data.body.inviteId}:【${data.head.msg}】\n`) : console.log(`助力失败${JSON.stringify(data)}\n`))
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data)
            }
        }))
    }))
}

function game(taskId, index, awardWoB = 100) {
    return new Promise((resolve => {
        $.get(taskUrl(`/ssjj-task-record/game/${index}/${taskId}`), ((err, resp, data) => {
            try {
                err ? (console.log(`${JSON.stringify(err)}`), console.log(`${$.name} API请求失败，请检查网路重试`)) : safeGet(data) && 200 === (data = JSON.parse(data)).head.code && data.body && (message += `【限时连连看】成功，活动${awardWoB}WO币\n`)
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data)
            }
        }))
    }))
}

function clock(taskId, awardWoB) {
    return new Promise((resolve => {
        $.get(taskUrl(`/ssjj-task-record/clock/${taskId}`), ((err, resp, data) => {
            try {
                err ? (console.log(`${JSON.stringify(err)}`), console.log(`${$.name} API请求失败，请检查网路重试`)) : safeGet(data) && 200 === (data = JSON.parse(data)).head.code && data.body && (message += `【每日打卡】成功，活动${awardWoB}WO币\n`)
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data)
            }
        }))
    }))
}

function queryAllTaskInfo() {
    return new Promise((resolve => {
        $.get(taskUrl("ssjj-task-info/queryAllTaskInfo/2"), ((err, resp, data) => {
            try {
                err ? (console.log(`${JSON.stringify(err)}`), console.log(`${$.name} API请求失败，请检查网路重试`)) : safeGet(data) && 200 === (data = JSON.parse(data)).head.code && data.body && ($.taskList = data.body)
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve()
            }
        }))
    }))
}

function drawRecord(id) {
    return new Promise((resolve => {
        $.get(taskUrl(`ssjj-draw-record/draw/${id}`), ((err, resp, data) => {
            try {
                err ? (console.log(`${JSON.stringify(err)}`), console.log(`${$.name} API请求失败，请检查网路重试`)) : safeGet(data) && 200 === (data = JSON.parse(data)).head.code && (data.body ? message += `【免费抽奖】获得：${data.body.name}\n` : message += "【免费抽奖】未中奖\n")
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data)
            }
        }))
    }))
}

function queryDraw() {
    return new Promise((resolve => {
        $.get(taskUrl("ssjj-draw-center/queryDraw"), ((err, resp, data) => {
            try {
                err ? (console.log(`${JSON.stringify(err)}`), console.log(`${$.name} API请求失败，请检查网路重试`)) : safeGet(data) && 200 === (data = JSON.parse(data)).head.code && ($.freeDrawCount = data.body.freeDrawCount, $.lotteryId = data.body.center.id)
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data)
            }
        }))
    }))
}

function ssjjRooms() {
    return new Promise((resolve => {
        $.get(taskUrl("ssjj-rooms/info/%E5%AE%A2%E5%8E%85"), ((err, resp, data) => {
            try {
                err ? (console.log(`${JSON.stringify(err)}`), console.log(`${$.name} API请求失败，请检查网路重试`)) : safeGet(data) && 200 === (data = JSON.parse(data)).head.code && ($.isUnLock = data.body.isUnLock, $.isUnLock || console.log(`京东账号${$.index}${$.nickName}未开启此活动\n`))
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data)
            }
        }))
    }))
}

function loginHome() {
    return new Promise((resolve => {
        const options = {
            url: "https://jdhome.m.jd.com/saas/framework/encrypt/pin?appId=6d28460967bda11b78e077b66751d2b0",
            headers: {
                Accept: "*/*",
                "Accept-Encoding": "gzip, deflate, br",
                "Accept-Language": "zh-cn",
                Connection: "keep-alive",
                "Content-Length": "0",
                "Content-Type": "application/json",
                Cookie: cookie,
                Host: "jdhome.m.jd.com",
                Origin: "https://jdhome.m.jd.com",
                Referer: "https://jdhome.m.jd.com/dist/taro/index.html/",
                "User-Agent": $.isNode() ? process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : require("./USER_AGENTS").USER_AGENT : $.getdata("JDUA") ? $.getdata("JDUA") : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"
            }
        };
        $.post(options, (async (err, resp, data) => {
            try {
                err ? (console.log(`${JSON.stringify(err)}`), console.log(`${$.name} encrypt/pin API请求失败，请检查网路重试`)) : safeGet(data) && ((data = JSON.parse(data)).success ? await login(data.data.lkEPin) : console.log(`异常：${JSON.stringify(data)}\n`))
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve()
            }
        }))
    }))
}

function login(userName) {
    return new Promise((resolve => {
        const body = {
                body: {
                    client: 2,
                    userName: userName
                }
            },
            options = {
                url: `${JD_API_HOST}/user-info/login`,
                body: JSON.stringify(body),
                headers: {
                    Accept: "*/*",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Accept-Language": "zh-cn",
                    Connection: "keep-alive",
                    "Content-Type": "application/json",
                    Host: "lkyl.dianpusoft.cn",
                    Origin: "https://lkyl.dianpusoft.cn",
                    Referer: "https://h5.m.jd.com/babelDiy/Zeus/2HFSytEAN99VPmMGZ6V4EYWus1x/index.html",
                    "User-Agent": $.isNode() ? process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : require("./USER_AGENTS").USER_AGENT : $.getdata("JDUA") ? $.getdata("JDUA") : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"
                }
            };
        $.post(options, (async (err, resp, data) => {
            try {
                err ? (console.log(`${JSON.stringify(err)}`), console.log(`${$.name} API请求失败，请检查网路重试`)) : 200 === (data = JSON.parse(data)).head.code && ($.token = data.head.token, $.helpToken.push(data.head.token))
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data)
            }
        }))
    }))
}

function getAuthorShareCode(url) {
    return new Promise((resolve => {
        const options = {
            url: `${url}?${new Date}`,
            timeout: 1e4,
            headers: {
                "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
            }
        };
        if ($.isNode() && process.env.TG_PROXY_HOST && process.env.TG_PROXY_PORT) {
            const agent = {
                https: require("tunnel").httpsOverHttp({
                    proxy: {
                        host: process.env.TG_PROXY_HOST,
                        port: 1 * process.env.TG_PROXY_PORT
                    }
                })
            };
            Object.assign(options, {
                agent: agent
            })
        }
        $.get(options, (async (err, resp, data) => {
            try {
                err || data && (data = JSON.parse(data))
            } catch (e) {} finally {
                resolve(data)
            }
        }))
    }))
}

function taskUrl(url, body = {}) {
    return {
        url: `${JD_API_HOST}/${url}?body=${escape(body)}`,
        timeout: 1e4,
        headers: {
            Accept: "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-CN,zh;q=0.9",
            Connection: "keep-alive",
            "content-type": "application/json",
            Host: "lkyl.dianpusoft.cn",
            Referer: "https://h5.m.jd.com/babelDiy/Zeus/2HFSytEAN99VPmMGZ6V4EYWus1x/index.html",
            token: $.token,
            "User-Agent": $.isNode() ? process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : require("./USER_AGENTS").USER_AGENT : $.getdata("JDUA") ? $.getdata("JDUA") : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"
        }
    }
}

function taskPostUrl(url) {
    return {
        url: `${JD_API_HOST}/${url}`,
        timeout: 1e4,
        headers: {
            Accept: "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-CN,zh;q=0.9",
            Connection: "keep-alive",
            "content-type": "application/json",
            Host: "lkyl.dianpusoft.cn",
            Referer: "https://h5.m.jd.com/babelDiy/Zeus/2HFSytEAN99VPmMGZ6V4EYWus1x/index.html",
            token: $.token,
            "User-Agent": $.isNode() ? process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : require("./USER_AGENTS").USER_AGENT : $.getdata("JDUA") ? $.getdata("JDUA") : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"
        }
    }
}

function sortByjdBeanNum(a, b) {
    return a.jdBeanNum - b.jdBeanNum
}

function TotalBean() {
    return new Promise((async resolve => {
        const options = {
            url: "https://me-api.jd.com/user_new/info/GetJDUserInfoUnion",
            headers: {
                Host: "me-api.jd.com",
                Accept: "*/*",
                Connection: "keep-alive",
                Cookie: cookie,
                "User-Agent": $.isNode() ? process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : require("./USER_AGENTS").USER_AGENT : $.getdata("JDUA") ? $.getdata("JDUA") : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
                "Accept-Language": "zh-cn",
                Referer: "https://home.m.jd.com/myJd/newhome.action?sceneval=2&ufc=&",
                "Accept-Encoding": "gzip, deflate, br"
            }
        };
        $.get(options, ((err, resp, data) => {
            try {
                if (err) $.logErr(err);
                else if (data) {
                    if ("1001" === (data = JSON.parse(data)).retcode) return void($.isLogin = !1);
                    "0" === data.retcode && data.data && data.data.hasOwnProperty("userInfo") && ($.nickName = data.data.userInfo.baseInfo.nickname)
                } else $.log("京东服务器返回空数据")
            } catch (e) {
                $.logErr(e)
            } finally {
                resolve()
            }
        }))
    }))
}

function safeGet(data) {
    try {
        if ("object" == typeof JSON.parse(data)) return !0
    } catch (e) {
        return console.log(e), console.log("京东服务器访问数据为空，请检查自身设备网络情况"), !1
    }
}

function jsonParse(str) {
    if ("string" == typeof str) try {
        return JSON.parse(str)
    } catch (e) {
        return console.log(e), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), []
    }
}

function Env(t, e) {
    "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0);
    class s {
        constructor(t) {
            this.env = t
        }
        send(t, e = "GET") {
            t = "string" == typeof t ? {
                url: t
            } : t;
            let s = this.get;
            return "POST" === e && (s = this.post), new Promise(((e, i) => {
                s.call(this, t, ((t, s, r) => {
                    t ? i(t) : e(s)
                }))
            }))
        }
        get(t) {
            return this.send.call(this.env, t)
        }
        post(t) {
            return this.send.call(this.env, t, "POST")
        }
    }
    return new class {
        constructor(t, e) {
            this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`)
        }
        isNode() {
            return "undefined" != typeof module && !!module.exports
        }
        isQuanX() {
            return "undefined" != typeof $task
        }
        isSurge() {
            return "undefined" != typeof $httpClient && "undefined" == typeof $loon
        }
        isLoon() {
            return "undefined" != typeof $loon
        }
        toObj(t, e = null) {
            try {
                return JSON.parse(t)
            } catch {
                return e
            }
        }
        toStr(t, e = null) {
            try {
                return JSON.stringify(t)
            } catch {
                return e
            }
        }
        getjson(t, e) {
            let s = e;
            if (this.getdata(t)) try {
                s = JSON.parse(this.getdata(t))
            } catch {}
            return s
        }
        setjson(t, e) {
            try {
                return this.setdata(JSON.stringify(t), e)
            } catch {
                return !1
            }
        }
        getScript(t) {
            return new Promise((e => {
                this.get({
                    url: t
                }, ((t, s, i) => e(i)))
            }))
        }
        runScript(t, e) {
            return new Promise((s => {
                let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
                i = i ? i.replace(/\n/g, "").trim() : i;
                let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
                r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r;
                const [o, h] = i.split("@"), n = {
                    url: `http://${h}/v1/scripting/evaluate`,
                    body: {
                        script_text: t,
                        mock_type: "cron",
                        timeout: r
                    },
                    headers: {
                        "X-Key": o,
                        Accept: "*/*"
                    }
                };
                this.post(n, ((t, e, i) => s(i)))
            })).catch((t => this.logErr(t)))
        }
        loaddata() {
            if (!this.isNode()) return {}; {
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile),
                    e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t),
                    i = !s && this.fs.existsSync(e);
                if (!s && !i) return {}; {
                    const i = s ? t : e;
                    try {
                        return JSON.parse(this.fs.readFileSync(i))
                    } catch (t) {
                        return {}
                    }
                }
            }
        }
        writedata() {
            if (this.isNode()) {
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile),
                    e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t),
                    i = !s && this.fs.existsSync(e),
                    r = JSON.stringify(this.data);
                s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r)
            }
        }
        lodash_get(t, e, s) {
            const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
            let r = t;
            for (const t of i)
                if (r = Object(r)[t], void 0 === r) return s;
            return r
        }
        lodash_set(t, e, s) {
            return Object(t) !== t || (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce(((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}), t)[e[e.length - 1]] = s), t
        }
        getdata(t) {
            let e = this.getval(t);
            if (/^@/.test(t)) {
                const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : "";
                if (r) try {
                    const t = JSON.parse(r);
                    e = t ? this.lodash_get(t, i, "") : e
                } catch (t) {
                    e = ""
                }
            }
            return e
        }
        setdata(t, e) {
            let s = !1;
            if (/^@/.test(e)) {
                const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}";
                try {
                    const e = JSON.parse(h);
                    this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i)
                } catch (e) {
                    const o = {};
                    this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i)
                }
            } else s = this.setval(t, e);
            return s
        }
        getval(t) {
            return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null
        }
        setval(t, e) {
            return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null
        }
        initGotEnv(t) {
            this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar))
        }
        get(t, e = (() => {})) {
            t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
                "X-Surge-Skip-Scripting": !1
            })), $httpClient.get(t, ((t, s, i) => {
                !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
            }))) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
                hints: !1
            })), $task.fetch(t).then((t => {
                const {
                    statusCode: s,
                    statusCode: i,
                    headers: r,
                    body: o
                } = t;
                e(null, {
                    status: s,
                    statusCode: i,
                    headers: r,
                    body: o
                }, o)
            }), (t => e(t)))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", ((t, e) => {
                try {
                    if (t.headers["set-cookie"]) {
                        const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
                        s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar
                    }
                } catch (t) {
                    this.logErr(t)
                }
            })).then((t => {
                const {
                    statusCode: s,
                    statusCode: i,
                    headers: r,
                    body: o
                } = t;
                e(null, {
                    status: s,
                    statusCode: i,
                    headers: r,
                    body: o
                }, o)
            }), (t => {
                const {
                    message: s,
                    response: i
                } = t;
                e(s, i, i && i.body)
            })))
        }
        post(t, e = (() => {})) {
            if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
                "X-Surge-Skip-Scripting": !1
            })), $httpClient.post(t, ((t, s, i) => {
                !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
            }));
            else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
                hints: !1
            })), $task.fetch(t).then((t => {
                const {
                    statusCode: s,
                    statusCode: i,
                    headers: r,
                    body: o
                } = t;
                e(null, {
                    status: s,
                    statusCode: i,
                    headers: r,
                    body: o
                }, o)
            }), (t => e(t)));
            else if (this.isNode()) {
                this.initGotEnv(t);
                const {
                    url: s,
                    ...i
                } = t;
                this.got.post(s, i).then((t => {
                    const {
                        statusCode: s,
                        statusCode: i,
                        headers: r,
                        body: o
                    } = t;
                    e(null, {
                        status: s,
                        statusCode: i,
                        headers: r,
                        body: o
                    }, o)
                }), (t => {
                    const {
                        message: s,
                        response: i
                    } = t;
                    e(s, i, i && i.body)
                }))
            }
        }
        time(t, e = null) {
            const s = e ? new Date(e) : new Date;
            let i = {
                "M+": s.getMonth() + 1,
                "d+": s.getDate(),
                "H+": s.getHours(),
                "m+": s.getMinutes(),
                "s+": s.getSeconds(),
                "q+": Math.floor((s.getMonth() + 3) / 3),
                S: s.getMilliseconds()
            };
            /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length)));
            for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length)));
            return t
        }
        msg(e = t, s = "", i = "", r) {
            const o = t => {
                if (!t) return t;
                if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? {
                    "open-url": t
                } : this.isSurge() ? {
                    url: t
                } : void 0;
                if ("object" == typeof t) {
                    if (this.isLoon()) {
                        return {
                            openUrl: t.openUrl || t.url || t["open-url"],
                            mediaUrl: t.mediaUrl || t["media-url"]
                        }
                    }
                    if (this.isQuanX()) {
                        return {
                            "open-url": t["open-url"] || t.url || t.openUrl,
                            "media-url": t["media-url"] || t.mediaUrl
                        }
                    }
                    if (this.isSurge()) {
                        return {
                            url: t.url || t.openUrl || t["open-url"]
                        }
                    }
                }
            };
            if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) {
                let t = ["", "==============📣系统通知📣=============="];
                t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t)
            }
        }
        log(...t) {
            t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator))
        }
        logErr(t, e) {
            !this.isSurge() && !this.isQuanX() && !this.isLoon() ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t)
        }
        wait(t) {
            return new Promise((e => setTimeout(e, t)))
        }
        done(t = {}) {
            const s = ((new Date).getTime() - this.startTime) / 1e3;
            this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t)
        }
    }(t, e)
}(async () => {
    if (cookiesArr[0]) {
        for (let i = 0; i < cookiesArr.length; i++)
            if (cookiesArr[i]) {
                if (cookie = cookiesArr[i], $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]), $.index = i + 1, $.isLogin = !0, $.nickName = "", message = "", await TotalBean(), console.log(`\n*******开始【京东账号${$.index}】${$.nickName||$.UserName}********\n`), !$.isLogin) {
                    $.msg($.name, "【提示】cookie已失效", `京东账号${$.index} ${$.nickName||$.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action`, {
                        "open-url": "https://bean.m.jd.com/bean/signIndex.action"
                    }), $.isNode() && await notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请重新登录获取cookie`);
                    continue
                }
                await smallHome()
            } $.inviteCodes = await getAuthorShareCode("https://sub.timor.icu/JDscripts/jd_updateSmallHomeInviteCode.json"), $.inviteCodes || ($.http.get({
            url: "https://sub.timor.icu/JDscripts/jd_updateSmallHomeInviteCode.json"
        }).then((resp => {})).catch((e => $.log("刷新CDN异常", e))), await $.wait(1e3), $.inviteCodes = await getAuthorShareCode("https://sub.timor.icu/JDscripts/jd_updateSmallHomeInviteCode.json"));
        for (let i = 0; i < cookiesArr.length; i++)
            if (cookiesArr[i]) {
                if (cookie = cookiesArr[i], $.token = $.helpToken[i], $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]), $.newShareCodes.length > 1) {
                    let code = $.newShareCodes[(i + 1) % $.newShareCodes.length].code;
                    console.log(`\n${$.UserName} 去给自己的下一账号 ${decodeURIComponent($.newShareCodes[(i+1)%$.newShareCodes.length].cookie.match(/pt_pin=([^; ]+)(?=;?)/)&&$.newShareCodes[(i+1)%$.newShareCodes.length].cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])}助力，助力码为 ${code}`), await createAssistUser(code, $.createAssistUserID)
                }
                await helpFriends()
            }
    } else $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
        "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    })
})().catch((e => {
    $.log("", `❌ ${$.name}, 失败! 原因: ${e}!`, "")
})).finally((() => {
    $.done()
}));