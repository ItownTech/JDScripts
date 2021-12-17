const $ = new Env("东东萌宠_Timorpic");
let notify, cookiesArr = [],
    cookie = "",
    jdPetShareArr = [],
    isBox = !1,
    newShareCodes = [],
    allMessage = "",
    shareCodes = ["MTAxODcxOTI2NTAwMDAwMDAyNTUxNzEwMw==@MTE1NDQ5OTIwMDAwMDAwNDQwMzIxNDc=", "MTAxODcxOTI2NTAwMDAwMDAyNTUxNzEwMw==@MTE1NDQ5OTIwMDAwMDAwNDQwMzIxNDc="],
    message = "",
    subTitle = "",
    option = {},
    jdNotify = !1;
const JD_API_HOST = "https://api.m.jd.com/client.action";
let goodsUrl = "",
    taskInfoKey = [],
    randomCount = ($.isNode(), 0);
async function jdPet() {
    try {
        const initPetTownRes = await request("initPetTown");
        if (message = `【京东账号${$.index}】${$.nickName}\n`, "0" === initPetTownRes.code && "0" === initPetTownRes.resultCode && "success" === initPetTownRes.message) {
            if ($.petInfo = initPetTownRes.result, 0 === $.petInfo.userStatus) return await slaveHelp(), void $.log($.name, "", `【提示】京东账号${$.index}${$.nickName}\n萌宠活动未开启\n请手动去京东APP开启活动\n入口：我的->游戏与互动->查看更多开启`);
            if (!$.petInfo.goodsInfo) return $.msg($.name, "", `【提示】京东账号${$.index}${$.nickName}\n暂未选购新的商品`, {
                "open-url": "openapp.jdmoble://"
            }), void($.isNode() && await notify.sendNotify(`${$.name} - ${$.index} - ${$.nickName}`, `【提示】京东账号${$.index}${$.nickName}\n暂未选购新的商品`));
            if (goodsUrl = $.petInfo.goodsInfo && $.petInfo.goodsInfo.goodsUrl, 5 === $.petInfo.petStatus) return await slaveHelp(), option["open-url"] = "openApp.jdMobile://", $.msg($.name, "", `【京东账号${$.index}】${$.nickName||$.UserName}\n【提醒⏰】${$.petInfo.goodsInfo.goodsName}已可领取\n请去京东APP或微信小程序查看\n点击弹窗即达`, option), void($.isNode() && await notify.sendNotify(`${$.name} - 账号${$.index} - ${$.nickName||$.UserName}奖品已可领取`, `京东账号${$.index} ${$.nickName}\n${$.petInfo.goodsInfo.goodsName}已可领取`));
            if (6 === $.petInfo.petStatus) return await slaveHelp(), option["open-url"] = "openApp.jdMobile://", $.msg($.name, "", `【京东账号${$.index}】${$.nickName||$.UserName}\n【提醒⏰】已领取红包,但未继续领养新的物品\n请去京东APP或微信小程序查看\n点击弹窗即达`, option), void($.isNode() && await notify.sendNotify(`${$.name} - 账号${$.index} - ${$.nickName||$.UserName}奖品已可领取`, `京东账号${$.index} ${$.nickName}\n已领取红包,但未继续领养新的物品`));
            if (console.log(`\n【京东账号${$.index}（${$.UserName}）的${$.name}好友互助码】${$.petInfo.shareCode}\n`), await taskInit(), "9999" === $.taskInit.resultCode || !$.taskInit.result) return void console.log("初始化任务异常, 请稍后再试");
            $.taskInfo = $.taskInit.result, await petSport(), await slaveHelp(), await masterHelpInit(), await doTask(), await feedPetsAgain(), await energyCollect(), await showMsg(), console.log("全部任务完成, 如果帮助到您可以点下🌟STAR鼓励我一下, 明天见~")
        } else "0" === initPetTownRes.code && console.log(`初始化萌宠失败:  ${initPetTownRes.message}`)
    } catch (e) {
        $.logErr(e);
        const errMsg = `京东账号${$.index} ${$.nickName||$.UserName}\n任务执行异常，请检查执行日志 ‼️‼️`;
        $.isNode() && await notify.sendNotify(`${$.name}`, errMsg), $.msg($.name, "", `${errMsg}`)
    }
}
async function energyCollect() {
    console.log("开始收取任务奖励好感度");
    let function_id = arguments.callee.name.toString();
    const response = await request(function_id);
    "0" === response.resultCode && (message += `【第${response.result.medalNum+1}块勋章完成进度】${response.result.medalPercent}%，还需收集${response.result.needCollectEnergy}好感\n`, message += `【已获得勋章】${response.result.medalNum}块，还需收集${response.result.needCollectMedalNum}块即可兑换奖品“${$.petInfo.goodsInfo.goodsName}”\n`)
}
async function feedPetsAgain() {
    const response = await request("initPetTown");
    if ("0" === response.code && "0" === response.resultCode && "success" === response.message) {
        $.petInfo = response.result;
        let foodAmount = $.petInfo.foodAmount;
        if (foodAmount - 100 >= 10) {
            for (let i = 0; i < parseInt((foodAmount - 100) / 10); i++) {
                const feedPetRes = await request("feedPets");
                console.log("投食feedPetRes"), 0 == feedPetRes.resultCode && 0 == feedPetRes.code && console.log("投食成功")
            }
            const response2 = await request("initPetTown");
            $.petInfo = response2.result, subTitle = $.petInfo.goodsInfo.goodsName
        } else console.log("目前剩余狗粮：【" + foodAmount + "】g,不再继续投食,保留部分狗粮用于完成第二天任务"), subTitle = $.petInfo.goodsInfo && $.petInfo.goodsInfo.goodsName
    } else console.log(`初始化萌宠失败:  ${JSON.stringify($.petInfo)}`)
}
async function doTask() {
    const {
        signInit: signInit,
        threeMealInit: threeMealInit,
        firstFeedInit: firstFeedInit,
        feedReachInit: feedReachInit,
        inviteFriendsInit: inviteFriendsInit,
        browseShopsInit: browseShopsInit,
        taskList: taskList
    } = $.taskInfo;
    for (let item of taskList) $.taskInfo[item].finished && console.log(`任务 ${item} 已完成`);
    signInit && !signInit.finished && await signInitFun(), firstFeedInit && !firstFeedInit.finished && await firstFeedInitFun(), threeMealInit && !threeMealInit.finished && (-1 === threeMealInit.timeRange ? console.log("未到三餐时间") : await threeMealInitFun()), browseShopsInit && !browseShopsInit.finished && await browseShopsInitFun();
    let browseSingleShopInitList = [];
    taskList.map((item => {
        item.indexOf("browseSingleShopInit") > -1 && browseSingleShopInitList.push(item)
    }));
    for (let item of browseSingleShopInitList) {
        const browseSingleShopInitTask = $.taskInfo[item];
        browseSingleShopInitTask && !browseSingleShopInitTask.finished && await browseSingleShopInit(browseSingleShopInitTask)
    }
    inviteFriendsInit && !inviteFriendsInit.finished && await inviteFriendsInitFun(), feedReachInit && !feedReachInit.finished && await feedReachInitFun()
}
async function masterHelpInit() {
    let res = await request(arguments.callee.name.toString());
    if ("0" === res.code && "0" === res.resultCode) {
        if (res.result.masterHelpPeoples && res.result.masterHelpPeoples.length >= 5)
            if (res.result.addedBonusFlag) console.log("已经领取过5好友助力额外奖励"), message += "【额外奖励】已领取\n";
            else {
                console.log("开始领取额外奖励");
                let getHelpAddedBonusResult = await request("getHelpAddedBonus");
                "0" === getHelpAddedBonusResult.resultCode && (message += `【额外奖励${getHelpAddedBonusResult.result.reward}领取】${getHelpAddedBonusResult.message}\n`), console.log(`领取30g额外奖励结果：【${getHelpAddedBonusResult.message}】`)
            }
        else console.log("助力好友未达到5个"), message += "【额外奖励】领取失败，原因：给您助力的人未达5个\n";
        if (res.result.masterHelpPeoples && res.result.masterHelpPeoples.length > 0) {
            console.log("帮您助力的好友的名单开始");
            let str = "";
            res.result.masterHelpPeoples.map(((item, index) => {
                index === res.result.masterHelpPeoples.length - 1 ? str += item.nickName || "匿名用户" : str += (item.nickName || "匿名用户") + "，"
            })), message += `【助力您的好友】${str}\n`
        }
    }
}
async function slaveHelp() {
    let helpPeoples = "";
    for (let code of newShareCodes) {
        if (console.log(`开始助力京东账号${$.index} - ${$.nickName}的好友: ${code}`), !code) continue;
        let response = await request(arguments.callee.name.toString(), {
            shareCode: code
        });
        if ("0" === response.code && "0" === response.resultCode)
            if (0 === response.result.helpStatus) console.log("已给好友: 【" + response.result.masterNickName + "】助力成功"), helpPeoples += response.result.masterNickName + "，";
            else {
                if (1 === response.result.helpStatus) {
                    console.log(`助力好友${response.result.masterNickName}失败，您今日已无助力机会`);
                    break
                }
                2 === response.result.helpStatus ? console.log(`该好友${response.result.masterNickName}已满5人助力，无需您再次助力`) : console.log(`助力其他情况：${JSON.stringify(response)}`)
            }
        else console.log(`助力好友结果: ${response.message}`)
    }
    helpPeoples && helpPeoples.length > 0 && (message += `【您助力的好友】${helpPeoples.substr(0,helpPeoples.length-1)}\n`)
}
async function petSport() {
    console.log("开始遛弯");
    let times = 1;
    const code = 0;
    let resultCode = 0;
    do {
        let response = await request(arguments.callee.name.toString());
        if (console.log(`第${times}次遛狗完成: ${JSON.stringify(response)}`), resultCode = response.resultCode, 0 == resultCode) {
            let sportRevardResult = await request("getSportReward");
            console.log(`领取遛狗奖励完成: ${JSON.stringify(sportRevardResult)}`)
        }
        times++
    } while (0 == resultCode && 0 == code)
}
async function taskInit() {
    console.log("开始任务初始化"), $.taskInit = await request(arguments.callee.name.toString(), {
        version: 1
    })
}
async function signInitFun() {
    console.log("准备每日签到");
    const response = await request("getSignReward");
    console.log(`每日签到结果: ${JSON.stringify(response)}`), "0" === response.code && "0" === response.resultCode ? console.log(`【每日签到成功】奖励${response.result.signReward}g狗粮\n`) : console.log(`【每日签到】${response.message}\n`)
}
async function threeMealInitFun() {
    console.log("准备三餐签到");
    const response = await request("getThreeMealReward");
    console.log(`三餐签到结果: ${JSON.stringify(response)}`), "0" === response.code && "0" === response.resultCode ? console.log(`【定时领狗粮】获得${response.result.threeMealReward}g\n`) : console.log(`【定时领狗粮】${response.message}\n`)
}
async function browseSingleShopInit(item) {
    console.log(`开始做 ${item.title} 任务， ${item.desc}`);
    const body = {
            index: item.index,
            version: 1,
            type: 1
        },
        body2 = {
            index: item.index,
            version: 1,
            type: 2
        },
        response = await request("getSingleShopReward", body);
    if ("0" === response.code && "0" === response.resultCode) {
        const response2 = await request("getSingleShopReward", body2);
        "0" === response2.code && "0" === response2.resultCode && console.log(`【浏览指定店铺】获取${response2.result.reward}g\n`)
    }
}
async function browseShopsInitFun() {
    console.log("开始浏览店铺任务");
    let times = 0,
        resultCode = 0,
        code = 0;
    do {
        let response = await request("getBrowseShopsReward");
        console.log(`第${times}次浏览店铺结果: ${JSON.stringify(response)}`), code = response.code, resultCode = response.resultCode, times++
    } while (0 == resultCode && 0 == code && times < 5);
    console.log("浏览店铺任务结束")
}

function firstFeedInitFun() {
    console.log("首次投食任务合并到10次喂食任务中\n")
}
async function inviteFriendsInitFun() {
    if (console.log("邀请新用户功能未实现"), 1 == $.taskInfo.inviteFriendsInit.status && $.taskInfo.inviteFriendsInit.inviteFriendsNum > 0) {
        const res = await request("getInviteFriendsReward");
        0 == res.code && 0 == res.resultCode && (console.log(`领取邀请新用户奖励成功,获得狗粮现有狗粮${$.taskInfo.inviteFriendsInit.reward}g，${res.result.foodAmount}g`), message += `【邀请新用户】获取狗粮${$.taskInfo.inviteFriendsInit.reward}g\n`)
    }
}
async function feedReachInitFun() {
    console.log("投食任务开始...");
    let needFeedTimes = 10 - $.taskInfo.feedReachInit.hadFeedAmount / 10,
        tryTimes = 20;
    do {
        console.log(`还需要投食${needFeedTimes}次`);
        const response = await request("feedPets");
        console.log(`本次投食结果: ${JSON.stringify(response)}`), 0 == response.resultCode && 0 == response.code && needFeedTimes--, 3003 == response.resultCode && 0 == response.code && (console.log("剩余狗粮不足, 投食结束"), needFeedTimes = 0), tryTimes--
    } while (needFeedTimes > 0 && tryTimes > 0);
    console.log("投食任务结束...\n")
}
async function showMsg() {
    $.isNode() && process.env.PET_NOTIFY_CONTROL ? $.ctrTemp = "false" == `${process.env.PET_NOTIFY_CONTROL}` : $.getdata("jdPetNotify") ? $.ctrTemp = "false" === $.getdata("jdPetNotify") : $.ctrTemp = "false" == `${jdNotify}`, $.ctrTemp ? $.isNode() && (allMessage += `${subTitle}\n${message}${$.index!==cookiesArr.length?"\n\n":""}`) : $.log(`\n${message}\n`)
}

function shareCodesFormat() {
    return new Promise((async resolve => {
        if (newShareCodes = [], $.shareCodesArr[$.index - 1]) newShareCodes = $.shareCodesArr[$.index - 1].split("@");
        else {
            console.log(`由于您第${$.index}个京东账号未提供shareCode,将采纳本脚本自带的助力码\n`);
            const tempIndex = $.index > shareCodes.length ? shareCodes.length - 1 : $.index - 1;
            newShareCodes = shareCodes[tempIndex].split("@")
        }
        console.log(`第${$.index}个京东账号将要助力的好友${JSON.stringify(newShareCodes)}`), resolve()
    }))
}

function requireConfig() {
    return new Promise((resolve => {
        console.log("开始获取东东萌宠配置文件\n"), notify = $.isNode() ? require("./sendNotify") : "";
        const jdCookieNode = $.isNode() ? require("./jdCookie.js") : "",
            jdPetShareCodes = $.isNode() ? require("./jdPetShareCodes.js") : "";
        $.isNode() ? (Object.keys(jdCookieNode).forEach((item => {
            jdCookieNode[item] && cookiesArr.push(jdCookieNode[item])
        })), process.env.JD_DEBUG && "false" === process.env.JD_DEBUG && (console.log = () => {})) : cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonParse($.getdata("CookiesJD") || "[]").map((item => item.cookie))].filter((item => !!item)), console.log(`共${cookiesArr.length}个京东账号\n`), $.shareCodesArr = [], $.isNode() ? Object.keys(jdPetShareCodes).forEach((item => {
            jdPetShareCodes[item] && $.shareCodesArr.push(jdPetShareCodes[item])
        })) : ($.getdata("jd_pet_inviter") && ($.shareCodesArr = $.getdata("jd_pet_inviter").split("\n").filter((item => !!item))), console.log(`\nBoxJs设置的${$.name}好友邀请码:${$.getdata("jd_pet_inviter")?$.getdata("jd_pet_inviter"):"暂无"}\n`)), console.log(`您提供了${$.shareCodesArr.length}个账号的东东萌宠助力码\n`), resolve()
    }))
}

function TotalBean() {
    return new Promise((async resolve => {
        const options = {
            url: "https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2",
            headers: {
                Accept: "application/json,text/plain, */*",
                "Content-Type": "application/x-www-form-urlencoded",
                "Accept-Encoding": "gzip, deflate, br",
                "Accept-Language": "zh-cn",
                Connection: "keep-alive",
                Cookie: cookie,
                Referer: "https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2",
                "User-Agent": $.isNode() ? process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : require("./USER_AGENTS").USER_AGENT : $.getdata("JDUA") ? $.getdata("JDUA") : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"
            }
        };
        $.post(options, ((err, resp, data) => {
            try {
                if (err) console.log(`${JSON.stringify(err)}`), console.log(`${$.name} API请求失败，请检查网路重试`);
                else if (data) {
                    if (13 === (data = JSON.parse(data)).retcode) return void($.isLogin = !1);
                    0 === data.retcode ? $.nickName = data.base && data.base.nickname || $.UserName : $.nickName = $.UserName
                } else console.log("京东服务器返回空数据")
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve()
            }
        }))
    }))
}
async function request(function_id, body = {}) {
    return await $.wait(3e3), new Promise(((resolve, reject) => {
        $.post(taskUrl(function_id, body), ((err, resp, data) => {
            try {
                err ? (console.log("\n东东萌宠: API查询请求失败 ‼️‼️"), console.log(JSON.stringify(err)), $.logErr(err)) : data = JSON.parse(data)
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data)
            }
        }))
    }))
}

function taskUrl(function_id, body = {}) {
    return body.version = 2, body.channel = "app", {
        url: `${JD_API_HOST}?functionId=${function_id}`,
        body: `body=${escape(JSON.stringify(body))}&appid=wh5&loginWQBiz=pet-town&clientVersion=9.0.4`,
        headers: {
            Cookie: cookie,
            "User-Agent": $.isNode() ? process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : require("./USER_AGENTS").USER_AGENT : $.getdata("JDUA") ? $.getdata("JDUA") : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
            Host: "api.m.jd.com",
            "Content-Type": "application/x-www-form-urlencoded"
        }
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
    if (await requireConfig(), cookiesArr[0]) {
        for (let i = 0; i < cookiesArr.length; i++)
            if (cookiesArr[i]) {
                if (cookie = cookiesArr[i], $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]), $.index = i + 1, $.isLogin = !0, $.nickName = "", await TotalBean(), console.log(`\n开始【京东账号${$.index}】${$.nickName||$.UserName}\n`), !$.isLogin) {
                    $.msg($.name, "【提示】cookie已失效", `京东账号${$.index} ${$.nickName||$.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action`, {
                        "open-url": "https://bean.m.jd.com/bean/signIndex.action"
                    }), $.isNode() && await notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请重新登录获取cookie`);
                    continue
                }
                message = "", subTitle = "", goodsUrl = "", taskInfoKey = [], option = {}, await shareCodesFormat(), await jdPet()
            } $.isNode() && allMessage && $.ctrTemp && await notify.sendNotify(`${$.name}`, `${allMessage}`)
    } else $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
        "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    })
})().catch((e => {
    $.log("", `❌ ${$.name}, 失败! 原因: ${e}!`, "")
})).finally((() => {
    $.done()
}));