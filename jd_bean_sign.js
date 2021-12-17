const $ = new Env("京东多合一签到_Timorpic"),
  notify = $.isNode() ? require("./sendNotify") : "",
  jdCookieNode = $.isNode() ? require("./jdCookie.js") : "",
  exec = require("child_process").execSync,
  fs = require("fs"),
  download = require("download");
let resultPath = "./result.txt",
  JD_DailyBonusPath = "./JD_DailyBonus.js",
  outPutUrl = "./",
  NodeSet = "CookieSet.json",
  cookiesArr = [],
  cookie = "",
  allMessage = "",
  jrBodyArr = [],
  jrBody = "";
async
function execSign() {
  console.log(`\n开始执行 ${$.name} 签到，请稍等...\n`);
  try {
    await exec(`${process.execPath} ${JD_DailyBonusPath} >> ${resultPath}`);
    const notifyContent = await fs.readFileSync(resultPath, "utf8");
    console.error(`👇👇👇👇👇👇👇👇👇👇👇签到详情👇👇👇👇👇👇👇👇👇👇👇\n${notifyContent}\n👆👆👆👆👆👆👆👆👆签到详情👆👆👆👆👆👆👆👆👆👆👆`);
    let BarkContent = "";
    if (fs.existsSync(resultPath)) {
      const barkContentStart = notifyContent.indexOf("【签到概览】"),
        barkContentEnd = notifyContent.length;
      "true" !== process.env.JD_BEAN_SIGN_STOP_NOTIFY && ("true" === process.env.JD_BEAN_SIGN_NOTIFY_SIMPLE ? (barkContentStart > -1 && barkContentEnd > -1 && (BarkContent = notifyContent.substring(barkContentStart, barkContentEnd)), BarkContent = BarkContent.split("\n\n")[0]) : barkContentStart > -1 && barkContentEnd > -1 && (BarkContent = notifyContent.substring(barkContentStart, barkContentEnd)))
    }
    const UTC8 = (new Date).getTime() + 6e4 * (new Date).getTimezoneOffset() + 288e5;
    $.beanSignTime = new Date(UTC8).toLocaleString("zh", {
      hour12: !1
    }), BarkContent && (allMessage += `【京东号 ${$.index}】: ${$.nickName||$.UserName}\n【签到时间】:  ${$.beanSignTime}\n${BarkContent}${$.index!==cookiesArr.length?"\n\n":""}`, (!process.env.JD_BEAN_SIGN_NOTIFY_SIMPLE || process.env.JD_BEAN_SIGN_NOTIFY_SIMPLE && "true" !== process.env.JD_BEAN_SIGN_NOTIFY_SIMPLE) && await notify.sendNotify(`${$.name} - 账号${$.index} - ${$.nickName||$.UserName}`, `【签到号 ${$.index}】: ${$.nickName||$.UserName}\n【签到时间】:  ${$.beanSignTime}\n${BarkContent}`)), await deleteFile(resultPath), await deleteFile("./CookieSet.json"), console.log(`\n\n*****************${new Date((new Date).getTime()).toLocaleString("zh",{hour12:!1})} 京东账号${$.index} ${$.nickName||$.UserName} ${$.name}完成*******************\n\n`)
  } catch (e) {
    console.log("京东签到脚本执行异常:" + e)
  }
}
async
function downFile() {
  let url = "";
  await downloadUrl(), url = $.body ? "https://raw.githubusercontent.com/NobyDa/Script/master/JD-DailyBonus/JD_DailyBonus.js" : "https://cdn.jsdelivr.net/gh/NobyDa/Script@master/JD-DailyBonus/JD_DailyBonus.js";
  try {
    const options = {};
    if (process.env.TG_PROXY_HOST && process.env.TG_PROXY_PORT) {
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
    await download(url, outPutUrl, options), console.log("JD_DailyBonus.js文件下载完毕\n\n")
  } catch (e) {
    console.log("JD_DailyBonus.js 文件下载异常:" + e)
  }
}
async
function changeFile(content) {
  console.log("开始替换变量");
  let newContent = content.replace(/var OtherKey = `.*`/, `var OtherKey = \`[{"cookie":"${cookie}","jrBody":"${jrBody}"}]\``);
  newContent = newContent.replace(/const NodeSet = 'CookieSet.json'/, `const NodeSet = '${NodeSet}'`), process.env.JD_BEAN_STOP && "0" !== process.env.JD_BEAN_STOP && (newContent = newContent.replace(/var stop = '0'/, `var stop = '${process.env.JD_BEAN_STOP}'`));
  0 === (new Date).getTimezoneOffset() && (newContent = newContent.replace(/tm\s=.*/, "tm = new Date(new Date().toLocaleDateString()).getTime() - 28800000;"));
  try {
    await fs.writeFileSync(JD_DailyBonusPath, newContent, "utf8"), console.log("替换变量完毕")
  } catch (e) {
    console.log("京东签到写入文件异常:" + e)
  }
}
async
function deleteFile(path) {
  if (await fs.existsSync(path)) {
    await fs.unlinkSync(path)
  }
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
      },
      timeout: 1e4
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

function downloadUrl(url = "https://raw.githubusercontent.com/NobyDa/Script/master/JD-DailyBonus/JD_DailyBonus.js") {
  return new Promise((resolve => {
    const options = {
      url: url,
      timeout: 1e4
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
    $.get(options, (async(err, resp, data) => {
      try {
        err ? (console.log("检测到您当前网络环境不能访问外网,将使用jsdelivr CDN下载JD_DailyBonus.js文件"), await $.http.get({
          url: "https://purge.jsdelivr.net/gh/NobyDa/Script@master/JD-DailyBonus/JD_DailyBonus.js",
          timeout: 1e4
        }).then((resp => {
          if (200 === resp.statusCode) {
            let {
              body: body
            } = resp;
            body = JSON.parse(body), body.success ? console.log("JD_DailyBonus.js文件  CDN刷新成功") : console.log("JD_DailyBonus.js文件 CDN刷新失败")
          }
        }))) : $.body = data
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve()
      }
    }))
  }))
}

function requireConfig() {
  return new Promise((resolve => {
    resultPath = "SCF" === process.env.TENCENTCLOUD_RUNENV ? "/tmp/result.txt" : resultPath, JD_DailyBonusPath = "SCF" === process.env.TENCENTCLOUD_RUNENV ? "/tmp/JD_DailyBonus.js" : JD_DailyBonusPath, outPutUrl = "SCF" === process.env.TENCENTCLOUD_RUNENV ? "/tmp/" : outPutUrl, NodeSet = "SCF" === process.env.TENCENTCLOUD_RUNENV ? "/tmp/CookieSet.json" : NodeSet, resolve()
  }))
}

function timeFormat(time) {
  let date;
  return date = time ? new Date(time) : new Date, date.getFullYear() + "-" + (date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1)) + "-" + (date.getDate() >= 10 ? date.getDate() : "0" + date.getDate())
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
}
$.isNode() && (Object.keys(jdCookieNode).forEach((item => {
  cookiesArr.push(jdCookieNode[item])
})), process.env.JD_BEAN_SIGN_BODY && (jrBodyArr = process.env.JD_BEAN_SIGN_BODY.indexOf("&") > -1 ? process.env.JD_BEAN_SIGN_BODY.split("&") : process.env.JD_BEAN_SIGN_BODY.indexOf("\n") > -1 ? process.env.JD_BEAN_SIGN_BODY.split("\n") : [process.env.JD_BEAN_SIGN_BODY]), process.env.JD_DEBUG && "false" === process.env.JD_DEBUG && (console.log = () => {})), (async() => {
  if (!cookiesArr[0]) return void $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
    "open-url": "https://bean.m.jd.com/bean/signIndex.action"
  });
  if (process.env.JD_BEAN_SIGN_NOTIFY_SIMPLE = process.env.JD_BEAN_SIGN_NOTIFY_SIMPLE ? process.env.JD_BEAN_SIGN_NOTIFY_SIMPLE : "true", await requireConfig(), await downFile(), !await fs.existsSync(JD_DailyBonusPath)) return console.log(`\nJD_DailyBonus.js 文件不存在，停止执行${$.name}\n`), void await notify.sendNotify($.name, `本次执行${$.name}失败，JD_DailyBonus.js 文件下载异常，详情请查看日志`);
  const content = await fs.readFileSync(JD_DailyBonusPath, "utf8");
  for (let i = 0; i < cookiesArr.length; i++)
    if (cookie = cookiesArr[i], cookie) {
      if ($.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]), $.index = i + 1, $.nickName = "", $.isLogin = !0, await TotalBean(), console.log(`*****************开始京东账号${$.index} ${$.nickName||$.UserName}京豆签到*******************\n`), !$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", `京东账号${$.index} ${$.nickName||$.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action`, {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        }), $.isNode() && await notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请重新登录获取cookie`);
        continue
      }
      if (jrBody = "", jrBodyArr && jrBodyArr.length)
        for (let key in Object.keys(jrBodyArr)) {
          let vo = JSON.parse(jrBodyArr[key]);
          decodeURIComponent(vo.pin) == $.UserName && (jrBody = vo.body || "")
        } else jrBody = "";
      await changeFile(content), await execSign()
    }
  $.isNode() && allMessage && "true" === process.env.JD_BEAN_SIGN_NOTIFY_SIMPLE && ($.msg($.name, "", allMessage), await notify.sendNotify($.name, allMessage))
})().catch((e => $.logErr(e))).finally((() => $.done()));