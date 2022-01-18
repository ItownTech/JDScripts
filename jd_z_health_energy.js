/*
健康社区-收能量

更新地址：https://share.r2ray.com/dust/i-chenzhe/z_health_energy.js
============Quantumultx===============
[task_local]
#健康社区-收能量
25 * * * * https://share.r2ray.com/dust/i-chenzhe/z_health_energy.js, tag=健康社区-收能量,  enabled=true
================Loon==============
[Script]
cron "25 * * * *" script-path=https://share.r2ray.com/dust/i-chenzhe/z_health_energy.js,tag=健康社区-收能量
===============Surge=================
健康社区-收能量 = type=cron,cronexp="25 * * * *",wake-system=1,timeout=3600,script-path=https://share.r2ray.com/dust/i-chenzhe/z_health_energy.js
============小火箭=========
健康社区-收能量 = type=cron,script-path=https://share.r2ray.com/dust/i-chenzhe/z_health_energy.js, cronexpr="25 * * * *", timeout=3600, enable=true
*/
const $ = new Env('健康社区收取能量_Timorpic');
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
const notify = $.isNode() ? require('./sendNotify') : '';
let cookiesArr = [],
    cookie = '',
    message = '',
    shareCodeList = [];
var _0xodV = 'jsjiami.com.v6',
    _0x5b19 = [_0xodV, 'aMK2OTjDrMOE', 'wrrClsO9TRM=', 'wrjCn8OEw5DCvQ==', 'AsOUUMOjBw==', 'w4dtYQI/', 'FHINLmc=', 'M0PDs2TDmw==', 'wprDiMOkYkI=', 'wpw7EMKhfw==', 'ZjMaw7HCmw==', 'dkEXYgrDp8K6bXhuwqU=', 'CcOKW8O6LQ==', 'w7vCm2jCtzjCmMOCcXFiL8ODw48JC8ONw5FIFxbClcKzw4MbLhgKwonCqA1YFDUjfcOmw5DCmcOxwp9jOFM=', 'IBPDkcKXUw==', 'wp8qVxZK', 'UsOTasOaJU9abcK/w7p9wojkvZTopKTmmr7ku6jkuqnlsZvmipzmiKHnmZXohZLmnI3kuIDkvLbku5LluK3phJjlio7ku4k=', 'SsK9IsOzw6U=', '44KN5o+c56Wn44K06Kyw5YWE6I+N5Y2L5Lm75LmG6LSZ5YyF5LuBS8OZAsKpB8KqEOeZhuaOquS+l+eXnno7ejgdwpLnmrbkuqTku7XnrL3lipzojLblj5w=', 'wrUNIWEVIcKLwqlbBVTCkMOla8KawqVOGivCicKIwqE=', 'QGnChDHDnQ==', 'TsOwwq/CsMKL4pa1wo4=', 'wpnDuXrDqg==', 'RRBMwq13TA==', 'YMK+OCk=', 'WMKPJ8O3w5BNwpQ4woskwrwvw6zDk8OTWhdsBCzDtknCvMKIwoFCdMO4YTExZcKawq1TwpZQw5xDwoDDpsOXw5E=', 'QGHCtzk=', 'JlUfJEs=', 'w5TDmlXDpwbDnQDDvyjCoQlq', 'w4LDhsKQwrXDq8Kjw7EAwpNHwppmf8OrHhnDgw==', 'XnzCtMKJWRPDnSJUw5LCpB/CpsKOw51wwopjMsKlMljCjcO5P8OiwrzCtylGWwTCgA==', 'T33CsyrDu8OBLzLCrsKGw7oxw6vDg8OEL0AhwrZILSzCvMKYwqHCgRTDssOfZcKYG3drcMOgHhQPw7tTYMK9ecOBFFzCjRh9P8OawpXDqj8lwoDDt8KxwqnDribDpcKCD0AIcsOMeTN3wqbDtcKXw5LDtcKMw7zDmR14wqU8wpkvwp3Cr8OVOhDDuB1OwrpBGXFVYDbDqXZgFjrCv8KkOyoxwqc/OcOowpnDr8ORJRvDkGgbKXbDm8Oaw5PCog1kw71Uw7Rqwoghw4vDv8KbDS1gF8O7KD91wrPCo8OKw4vCgwbDr8OxOVNILVEEw5rDiR/DhcKBwr01RXNTw50Gwp3Cp8KhPi0qwpjCpMO2w7szQA4TcifCj8OOw7bCvn9bEUBgw4fDlMK1wpbDqcK+w6MsBMOyw4bCi1PCvgPDoMKUwrkpEiXDgsKfAMO5HcODwpEDEyzDkMOjMMOfXMODwrQsYMOnPgMvTS3DgwvCpS/DisOgWEkmw6bCtkBgKgzCg8OhwprCtMOrw7PClMKMwrkIa8O8B19+SMKMwpNCwrHCg8OkwqYQwpbDi8OOWsOcwp0=', 'w5rCtgV+w50=', 'wowNdxd3', 'VcKFYMKjwr8=', 'w7V4KcOVwrQ2VcKywrYqVsOcwrMaw4QMwrtAwqx1w58gwoLCkho2eTM+wpJbZsOGJ8ODw69v', 'w6o9JTHDmQ==', 'WcKVMMOrw5YTw55k', 'MgjDisKwTg==', 'Z8KxNiDDvMOSNj0=', 'U2vDrVPCog==', 'w7RiPsOJwrJoH8Ou', 'B8OBR8OrP0k=', 'w7DCoRxKw552O0k=', 'Xxsmw7zCpQ==', 'w4pkCMOAwr8=', 'UcKLXsKowoA=', 'cMKlSMKcwoUF', 'w5jDkmHDqmfCqUko', 'ScK1bMK5w7s=', 'w5k3NwzDrQ==', 'wo8ZGMKddF8G', 'w4vDlcKawq7CicOiw7gA', 'wpHDt2k=', 'wqfDsDbCuMOowqtrag==', 'FSbDrsOPGlrClnw3', 'XcKINA==', 'AMKxw6LDtQ==', '44CV5o+k56Wd44CWG8OlwrRoeH/ltLjlp4fmlZM=', '5Lix5LiQ6LW75Y2S', 'wqrCn8K4bsKX', 'Dn/DvnXDs2fDssKc', 'cGrCtyjDhcKbKwc=', 'wr/orZ3ph7HmlbnnmJDlvqboj53ljY0MwqoSc8KPwoUQw4FnwpYQwoDDqi7CqsO2RsO0KXrChcKxw5bDh8OAK2DCmEvDqATDgWJAw4TDi8OxBXMGesKpMcK0', 'w4VUw4/DujQ=', 'Z8KsGyPDrcOT', 'TcKrw5E+N1FldcKsTA==', 'w75jMsOOwq5p5baI5aas5pafehLDkg==', 'w5hnYgocXTLDvw==', '5Lm65LuS6LaM5Y+o', 'wqjDq2vDucKvCCBD', 'YOitl+mHpOaUsueYsOW9s+iMmuWOtBnDr8KDY8KfZQ==', 'wozDlH7DusKn', 'w7A3CsKvdQ==', 'wrLCiMORw5fCgg==', 'CS/DgMKneQ==', 'w63DtsKKwqnCiA==', 'J8OoHSFR', 'w6dewqTCtQI=', 'U2PCo8KgQgI=', 'OSlUwrx8', 'w77DqTUaFQ==', 'acK6IQ==', 'BlEzHXZac8KCT8OASGktZsOxIMK6wpt8fG9Lw5rDpS3Ct3MrwpbDj8O8w5bCmC0cX8O+w7A=', 'w4bChVDCpTk=', 'IDPCikDDsQ==', 'QmnDqVHChA==', 'UsKhw5g=', 'asK+IS0=', 'wq3DrMOVwqJow6Q=', 'w4XClWrCjRw=', 'w7V4JMOEwos=', 'w7zDui4CPA==', 'w7vDlsOGwpw=', 'LxXDrA==', 'wq3CgSTCuAnil5QE5ZOB5bKW6K+x5Lqw5LiY5ouu5qKz6Kyr5Lqw6L+x5ZOr5L6+77+u5b6K5YyA5Lq+5L2L44Kb', 'w696w4XDgw==', 'wqXDtjI=', 'Y1rCq8O1FuKUtnQ=', 'w7AdOMKC', 'woQDLsK/YFE=', 'csKxEcOIw5Q=', 'w6HDjmM=', 'wpnDqzrCvsOPwrlj5byN5bmK77yX', 'I8Kyw6XDp8Op', 'BgBWwr5p', 'w53DnkjCuRjDiUXCtGfCsg8pwpLDmEDCimbClxrCjMKrY8KrwrFJw75zN8KLwr/CjcOMw4ok', 'RcKkaMK2w7rDnVlOfFTClMKDBxFXwq9Aw7PChMKCwqnDo8Ocw7XCoMOtQcKSw6hSFcK5TQ==', 'w6A/Ji7DvQ==', 'w7JUD8O0wo0=', 'wpTDrW/DpMKn', 'wqtjZgFvDHnDtinDiDZ5w6vCsGHDqMK7bMOdHU/Cj8OPMsKKwovDh8Oyw6RB', 'wrTCu8KkfsKY', 'wrEuKMOWwqJ+KsO0wrR4BcOQw6NVwpAOwq4Hwqp0w4Yywp/CngFyey0wwpZcfMK/JsOew7Jjw5jCrhnDvMOaw55PCQ==', 'd8OKQMOzGw==', 'wpbDg8Orwrlq', 'ThB2N8OM', 'w69Kw7vDmhg=', 'QMKUIMOz', 'w61tL8OWwqI=', 'MDbDnjfCjg==', 'w5d+wqnCpA==', 'w5ZBw6XDojA=', '5Lih5LiI6L+T5Zqm5LuU56mG5pSv5o+0', 'w7vDqHfDvUM=', 'wpbCvsKbc8Kq', 'w7lJwobCtSo=', 'BTnDli7Chg==', 'woTDqMOJwod+', 'HznDlcOpQQ==', 'Ky7DoADCog==', 'QW0kwoQD', 'wpHCnMOOw47CvsK1w40Bw4o1w41uwqJydsOe', 'MA7DucK8WEU9CBo=', 'wovCqMKyW8KF', 'w6PCnjt1w4c=', 'KxLDkcKweg==', 'wpDDj8K6dQ==', 'RUoEwooN', 'VsKuOC3Dgw==', 'w7zDlcK+wofCiA==', 'dUEUbw==', 'w5fDr8Kvwq3Cqw==', 'w5vCuWTChCQ=', 'w5HDusOGwpnDiA==', 'OT7DqsKhVw==', 'wqXDvDvCtMOSwqI=', 'FBHDjsKbUg==', 'AsK1w6HDt8Ofw4E=', 'D8K6XhzDnA==', 'w7LCjGjCjg8=', 'ZcOHbsOe', 'JT7CtXjDsMKf', 'wq/DvX0=', 'wrgew4zCp8KcQQ==', 'X1ARXzQ=', 'asKVw7A8wqw=', 'wpbDvXfDuA==', 'w4PDk8KLwoDCpsOgw70=', 'w4NOw6E=', 'cWkU', 'ZQZYOMOswqPCoTQ=', 'w7TDkhM=', 'wrgIbCo=', 'w6LDgXnChw8=', 'wp7CjcOTw4c=', 'CRTCkEXDvA==', 'w6F7YA==', 'GAZKwq4=', 'UMKvw5I/', 'w6nDkXfDgG8=', 'K8Kjw4bDgcOJ', 'ccKnfcKow53Dn1Vf', 'U8Kvw4s5EQ==', 'w7BtKcOGwq8=', 'em4BwrYJGz0q', 'wozDj8Ku', 'LVMcw4ouAVzlv5flp4njgbTku6/kubDotqLlj7U=', 'w7NlPsOOwoltF8O4', 'OsONABBwwpPDg1M=', 'F8OWwoBGw5ZCwoXCnS7CkQ==', 'aMOVVsOQMGtV', 'A8Kjw6g=', '44Kd5o2x56S+44KJSsKnSybDpWDltZ7lpLXml74=', '5Lqp5Lio6LWB5Y+w', 'w6TDj2DDvVE=', 'w7HDnsORwpbDgz7Cj14=', 'FgnDrsKneEM5Cw==', 'w5zorp7ph4zml7/nmYDlvZTojJrljZlxCknCkMK1asOFw6cODCvDiMOLw7nCkEvCqXxrwpHDj8OvwrrDu01kw7jDh8OKwrJUwpg2wr5tBcKewqoPZsKla3Ir', 'IA7Dk8K+Vw==', 'w5VFw7nDtRvCtnFSwrEP', 'CB3DoR8=', 'w758w5nDg8OvBOW0reWlnuaUsBnDiMOq', 'WcKVN8Oiw5s=', 'O1YiH0sBMcOI', 'TeiupumFquaUj+eZkuW9g+iMnOWMkcOEwrnCtl4FWQ==', 'woLDhcKobw==', 'ZlvCjsK2cg==', 'Uhcyw5s=', 'wofjgrHkuqjkuoTotI/ljL8=', 'fWkGwrg/', 'G8KXXAPDs8OYw5PDqQ==', 'w4EPKcKRXcKhwoUB', 'wrR2bMODM8Ogw4hETuKXtTbojZTlvqXCnw==', 'wq3DoMOOwoE=', 'HyzDpMOFEOKVpMKc', 'JxvDv8K0', 'CMOJU8OPOEE=', 'RnrCtcKXQQ==', 'w4zDj8K3wqrCo8Om', 'w75xaRwcUyvDsyHDlg==', 'AQZOwr8=', 'wqLDtsOI', 'w7Nyw5vDjQ==', '6YOe6KSO5Lyf5piJ5Lqr56ef56eR5rCu', 'f8KhUsKYwpk=', 'wrPCl+Wmg+i3mMKsf+WNveWbm8O2w7Y=', 'IjTCr2rDlcK3wog=', 'VMKUPcOi', 'wowOPMKXclocw4thMyd/Tj/CrcOHw5tfLmc=', 'wrzCqsOCejsQN08Lw7XCusO3AmPCs8KSwq7DsFbCtycBBAQrbsKRfw==', 'HcOXFgk=', 'wozDjcKOU1w=', 'cnkfdgs=', 'w7/DiHfDsw==', 'RAYqw6DClQ==', 'acK+GMO1w5k=', 'VMKqw5c/GFJldMKVUsOKK8OXwpQdOg16UcKU', 'woDCn8OfWzQ=', 'WMKZCsOUw6A=', '5LqL5Lml6L+i5Zi+5LqC5Lir57qy56qt5pWy5oyK', 'ZmvCmwnDhQ==', 'dxZoNcOE', 'wqswMcKrdA==', 'GlQ3CVc=', 'wovDmjTCosOz', 'UcK3cMK4wpU=', 'E8OCQcOtPA==', 'D8OEfcOHMg==', 'e8OBQ8OOJg==', 'NsOPAy5u', 'w6/Dr2XDrWI=', 'w6bCi0XCrRI=', 'bnLCnRbDqg==', 'wovDjSfCpcOO', 'S23CiMKVYQ==', 'IDzCtWo=', 'wqcFw4o=', 'w7bDrsKKP3rilahj5a6r5omE5Lmt5Ym0776X6I+Z5b6R', 'w7lyw4LDiQ==', 'w6zDgnXDrUDCukEpw59mw4N2w5M=', '5YKD5bud6IKp6YS977yf5b2l5Yil6LaF5oiJ5YCx5bu16IO26YeJag==', 'w4fDj0/CvAfChw==', 'wqMaZD1oYsOCw70e', 'wrQAewxUZcOI', 'UcKTw40=', 'w7ZJIW8b4pSdwo0=', 'w7fCjmjCpg==', 'w73DnsOIwrDDvjg=', 'GsOBW8OxLg==', 'w5zDpEbCiy4=', 'w6nDgHDDuQ==', 'XDdkH8OMwpLChw==', 'wq7DpsObwqZ1w6XChA==', 'w4HDncKNwqQ=', 'wrPDjzzDp2vilrbDjeOBjg==', 'woILIMKT', 'd1EUchTDvg==', 'NxvDuMK+YE0n', 'w71hdBA=', 'wo/DvX3DvsKNHQ==', 'Bw/DvxPCmsK1YF4Kw5lvcsKuVRM0w5wr', 'GkQ0BlEPN8OIQA==', 'w5R7wq3CsCY=', 'N8Kaw63DpMOO', 'E8OUXsO0KQ==', 'w6PCjm7CtC4=', 'H8KaVw3DnMOVw4rDpB/CkUUiMkQSLHLCqcKCw4NM', 'X8KiFsOkw5E=', 'w7gTKw==', 'QXjCpjs=', 'UFXCgcKGQg==', 'CwZXwrs=', 'w7YVNsKgfMKkwo0=', 'VWjCosKIZQ==', 'w5dUP8OLwo0=', 'w5/DlcKvwpzCog==', 'BsOPTg==', 'EMObc8KnwoPilaPCm+Wum+aLueS6uuWJvO+9jeiNteW8qQ==', 'c8ODacOKO3Y=', 'wpzDu3/DvsKIGyhCXQ7DnMKJBg==', '5YOD5bqX6IGq6YWe772Z5b6K5YmI6LSd5oug5YCT5bmy6IGN6YeMw60=', 'w6rDhMOXwo/DnjzCjUnCqQ==', 'UsKSKcOEw4wTw54=', 'Kz7DgA==', 'wo0Mw6zDt3Lil7hh', 'wrIIdS4=', 'b8Osb8OKJQ==', 'w7FjOg==', 'HcOcwopMw5zilbTCj+aKp+WKm+aWreWOreiAuOmFgO+8kuiPi+W+lQ==', 'W23CsMKE', 'V3zCoS/Dp8KO', 'wpDDksKmZVkUf8O+w4guw51w', 'wqPCvcOPbQkfLFUx', 'wpUeJsKbfVEBw4VH', 'w5ZpB8OXwq8=', 'NCdCw71n4pWmcOWTg+WzhOivt+S4tuS4ruaKleaivuisreS4uOi8qeWRqOS8qO+9veW/jeWOsOS7suS+g+OBhA==', 'Qhsgw54=', 'w59Hw4TDnsOu', 'c0I3wqwT', 'woYlSgxo', 'TgVnTSXilbR8', 'CsKxw7vDsQ==', 'UGrCtyjDgsKUIA0=', 'DMKxw7zDtcOiw4fDiGo=', 'em4BwrYpGz0q', 'w4IbAcKaVQ==', 'TMOnVcOREg==', 'QSNqGQ==', '6YGo6KaD5L2n5pmT5Lqp56Ss56W75rGn', 'KDLCpg==', 'FC/CrmbDkMKowpTlvbzluZbvvKQ=', 'SXbCtQ==', 'wrnDr18GwovilIZ+44Cq', 'WV7Du0zClh3DpsKxF8KPwp3DoV3CuFNxwqsn', 'wqLCr8OZdA4TKEI6', 'UMK1a8Kxw4XDkUs=', 'wr7CusOebylGbAg8wqPDu8O2QGzCtMOIwp3DrVQ=', 'wpvCicObw5LDusK3w4Acw5U/', 'Shp+w5bCvQ==', 'w6zDkW3CtkTDpk4pwqJmw4Np', 'aMKLw4sEwqQ=', 'wrIow7XCm8Kq', 'eFjCrsKvWQ==', 'woHDkMK5bUUUe8OZw4Iuw4E6w4nCi8KoeMKvwp3CicKnYxXCiwvCosKIwrXCiCLDu8KSwqwz', 'wqfDscObwp9owrnDhAPDohfDjMKVW2ZawoXDgB84KWPDm0NVwo7CoAR5VcO1wpbCrcOcAsKnwqDDi8KxwqzCnMOrwrZXw7JawqzCvk7Cj0kbAMOlwpYNwpfCv8K3wqfDh8OgwrlnRgbCtmlnwrrCu8K7RMOgw6rDsgHDjsKww5PCpsO0wp1jwojCkW7Cjh7DhVEFJl/CksOJw7DCrVdna2XCgcO4b8KJC8OiJm07w5Vawp7DggXDnQvDqHfCoW7Cs8OGDSVxw5cxwo0owrssUMOmw7p9w6cHRywkw5EqMEocA8KPwpF7worClRQ1wrjDgcOzwqnCv1vCgcK8JwHCqWDDucOCX3Ybw5XCgVnDlHvDpcK3FsOgw7HDpDhAwqtjEmvCrsOwdcO7LXViw4zDisK9DklvwrIdPEoywq4Kw4XDr8KWKcOvDMKbw7Vpw7k=', 'w5F4w7nDsy8=', 'CFApDnEJM8ODZ8OUHA==', 'w5vDumHDr8KYVA==', 'QwYhw5zCvTZGXcOS', 'Hk7DpEzCgAfDhsOtE8KMw6zCokrCtVN4wpM8AsOqXncxAy56G0lTw5fCgMKyFgvCnmvClw==', 'SCs5w4zCnA==', 'MS7CpHnDsMK1wpcR', '5LiJ5Lqg6Lyt5Zib5LmB56u55pel5oyL', 'w7TCqlJHw5t7cFB1HVsaNQ==', 'wqfCji4=', 'bm7DqmvCgA==', 'VHk+dSw=', 'w7bDhMOGwrXDoQ==', 'AsOUXcOyOBzCgk0Sw6/CgW3DmG3CpWjDtzJqwrYtwpvDhnd/YMOea8OLw7kcPgJASCYrUMOvccKKwrDDlmPDln1vF2sswqlXw5fDr8KpwrvDpj8=', 'wq7DozzCo8KKw6piahRhO0pxehXDhX4=', 'TcKOWcKRw4c=', 'w7Niw57DgSE=', 'w4U+Ow3DhA==', 'VUzDoUvCsQjDgcK7LcKKwr/Dqw==', 'YsKwMgnDu8OE', 'w5zDsH3Cgj8=', 'U2YPwpUF', 'wrnDuCfCoMOD', 'w6RORjMG', 'TWnCsMKGXxTDmQ==', 'NARXNg==', 'wr/CvcOmcD0VLQ==', 'wpTCjcOKw4M=', 'BkQ0InIODMOfQcOARDUrLQ==', 'w4c7PDHDgg==', 'RQE2w4fCmj9JVA==', 'wq3DpMOcwopSw63CjUM=', 'ZwRlCcOO', 'wpLjgq3ku5jkuanotbHljYs=', 'CXjDuXvDhQ==', 'a10EbDbDq8K2Zg==', 'w4h/OMOXwoltF8O4', 'wr0ZwpbCiMKmQcO/T1jilK3DheiNveW+rsOr', 'wqvDvDTCvQ==', 'wrTku5DosIrjg6E=', 'KgnDhcK6Ukc=', 'TBxPwpM=', 'W8KTw5gpwp0Lw4c=', 'wqbCu8OZdw==', 'EMKQSQ==', 'w5DDhEo=', 'WW3CqMKWVQ==', 'AsK/w6g=', 'IzjCtW/DmMKvwpA=', 'fGPCq8KOWRXDjxx5', 'w7Byw4Y=', 'DAhMwrFzw64=', 'w692w4DDjcO0EsK6', 'EGPDrnY=', 'w7TCimjCoyrDlsKM', 'w5c8Jw3DtEPDpw==', 'wozDqsOAwoRyw6bCoWg=', 'w4I8JQzDp0TDow==', 'WjsjiamiVD.coJmn.QvZ6fkqCDfHq=='];
(function (_0x29fb60, _0x30ab26, _0x11cd1c) {
    var _0x1cd110 = function (_0x52318b, _0x470356, _0x344348, _0x2ace14, _0x3f70f7) {
        _0x470356 = _0x470356 >> 0x8, _0x3f70f7 = 'po';
        var _0x163b17 = 'shift',
            _0x248179 = 'push';
        if (_0x470356 < _0x52318b) {
            while (--_0x52318b) {
                _0x2ace14 = _0x29fb60[_0x163b17]();
                if (_0x470356 === _0x52318b) {
                    _0x470356 = _0x2ace14;
                    _0x344348 = _0x29fb60[_0x3f70f7 + 'p']();
                } else if (_0x470356 && _0x344348['replace'](/[WVDJnQZfkqCDfHq=]/g, '') === _0x470356) {
                    _0x29fb60[_0x248179](_0x2ace14);
                }
            }
            _0x29fb60[_0x248179](_0x29fb60[_0x163b17]());
        }
        return 0x82221;
    };
    return _0x1cd110(++_0x30ab26, _0x11cd1c) >> _0x30ab26 ^ _0x11cd1c;
}(_0x5b19, 0x177, 0x17700));
var _0x2a44 = function (_0x4929ca, _0x2a2ccc) {
    _0x4929ca = ~~'0x' ['concat'](_0x4929ca);
    var _0x146316 = _0x5b19[_0x4929ca];
    if (_0x2a44['sAwVGE'] === undefined) {
        (function () {
            var _0x318072 = typeof window !== 'undefined' ? window : typeof process === 'object' && typeof require === 'function' && typeof global === 'object' ? global : this;
            var _0x353ea4 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
            _0x318072['atob'] || (_0x318072['atob'] = function (_0x5add74) {
                var _0x522f2c = String(_0x5add74)['replace'](/=+$/, '');
                for (var _0x4b63db = 0x0, _0x161efb, _0x2890a1, _0x4d532e = 0x0, _0x1be416 = ''; _0x2890a1 = _0x522f2c['charAt'](_0x4d532e++); ~_0x2890a1 && (_0x161efb = _0x4b63db % 0x4 ? _0x161efb * 0x40 + _0x2890a1 : _0x2890a1, _0x4b63db++ % 0x4) ? _0x1be416 += String['fromCharCode'](0xff & _0x161efb >> (-0x2 * _0x4b63db & 0x6)) : 0x0) {
                    _0x2890a1 = _0x353ea4['indexOf'](_0x2890a1);
                }
                return _0x1be416;
            });
        }());
        var _0x476670 = function (_0x325d5c, _0x2a2ccc) {
            var _0x425471 = [],
                _0x5d6e6e = 0x0,
                _0x26f2a8, _0x5277ff = '',
                _0x2fabac = '';
            _0x325d5c = atob(_0x325d5c);
            for (var _0x1d3cab = 0x0, _0x2b424a = _0x325d5c['length']; _0x1d3cab < _0x2b424a; _0x1d3cab++) {
                _0x2fabac += '%' + ('00' + _0x325d5c['charCodeAt'](_0x1d3cab)['toString'](0x10))['slice'](-0x2);
            }
            _0x325d5c = decodeURIComponent(_0x2fabac);
            for (var _0xfc45dc = 0x0; _0xfc45dc < 0x100; _0xfc45dc++) {
                _0x425471[_0xfc45dc] = _0xfc45dc;
            }
            for (_0xfc45dc = 0x0; _0xfc45dc < 0x100; _0xfc45dc++) {
                _0x5d6e6e = (_0x5d6e6e + _0x425471[_0xfc45dc] + _0x2a2ccc['charCodeAt'](_0xfc45dc % _0x2a2ccc['length'])) % 0x100;
                _0x26f2a8 = _0x425471[_0xfc45dc];
                _0x425471[_0xfc45dc] = _0x425471[_0x5d6e6e];
                _0x425471[_0x5d6e6e] = _0x26f2a8;
            }
            _0xfc45dc = 0x0;
            _0x5d6e6e = 0x0;
            for (var _0x54e5a6 = 0x0; _0x54e5a6 < _0x325d5c['length']; _0x54e5a6++) {
                _0xfc45dc = (_0xfc45dc + 0x1) % 0x100;
                _0x5d6e6e = (_0x5d6e6e + _0x425471[_0xfc45dc]) % 0x100;
                _0x26f2a8 = _0x425471[_0xfc45dc];
                _0x425471[_0xfc45dc] = _0x425471[_0x5d6e6e];
                _0x425471[_0x5d6e6e] = _0x26f2a8;
                _0x5277ff += String['fromCharCode'](_0x325d5c['charCodeAt'](_0x54e5a6) ^ _0x425471[(_0x425471[_0xfc45dc] + _0x425471[_0x5d6e6e]) % 0x100]);
            }
            return _0x5277ff;
        };
        _0x2a44['bFmjUF'] = _0x476670;
        _0x2a44['EjrgNV'] = {};
        _0x2a44['sAwVGE'] = !![];
    }
    var _0x16e3d9 = _0x2a44['EjrgNV'][_0x4929ca];
    if (_0x16e3d9 === undefined) {
        if (_0x2a44['cfymRB'] === undefined) {
            _0x2a44['cfymRB'] = !![];
        }
        _0x146316 = _0x2a44['bFmjUF'](_0x146316, _0x2a2ccc);
        _0x2a44['EjrgNV'][_0x4929ca] = _0x146316;
    } else {
        _0x146316 = _0x16e3d9;
    }
    return _0x146316;
};
const cp = $['isNode']() ? require('child_process') : '';
if ($[_0x2a44('0', 'QDLa')]()) {
    Object[_0x2a44('1', '%3Ah')](jdCookieNode)[_0x2a44('2', 'z26o')](_0x39ed80 => {
        cookiesArr[_0x2a44('3', 'pJo^')](jdCookieNode[_0x39ed80]);
    });
    if (process[_0x2a44('4', '%MS!')]['JD_DEBUG'] && process[_0x2a44('5', ']V6j')]['JD_DEBUG'] === _0x2a44('6', 'iFki')) console[_0x2a44('7', 'wSgu')] = () => {};
} else {
    let cookiesData = $[_0x2a44('8', 'NZE8')](_0x2a44('9', 'iFki')) || '[]';
    cookiesData = JSON['parse'](cookiesData);
    cookiesArr = cookiesData[_0x2a44('a', '4F#s')](_0x56112d => _0x56112d[_0x2a44('b', 'At40')]);
    cookiesArr[_0x2a44('c', '4F#s')]();
    cookiesArr[_0x2a44('d', 'bI(1')](...[$[_0x2a44('e', '&Zc^')]('CookieJD2'), $[_0x2a44('f', '0G0)')](_0x2a44('10', 'RLNB'))]);
    cookiesArr[_0x2a44('11', '0G0)')]();
    cookiesArr = cookiesArr[_0x2a44('12', 'e2TS')](_0x3b5c62 => !!_0x3b5c62);
}!(async () => {
    var _0x1463fd = {
        'qLpqF': _0x2a44('13', 'pJo^'),
        'BdouU': _0x2a44('14', 'C^C*'),
        'JUKrO': 'zQsjt',
        'HJslO': _0x2a44('15', 'Mc(r'),
        'HVxCo': function (_0x240ea4) {
            return _0x240ea4();
        },
        'DnMCM': _0x2a44('16', '3pyI'),
        'JrhbP': _0x2a44('17', '1JJi'),
        'CYNUk': 'false',
        'HpXIN': function (_0x3394f4, _0x1544de) {
            return _0x3394f4 !== _0x1544de;
        },
        'xWAQu': _0x2a44('18', 'bI(1'),
        'sXDJA': _0x2a44('19', ')tWv'),
        'CyzXv': '京东返回了一组空数据',
        'ZdvXL': function (_0x24f2d6, _0xecd793) {
            return _0x24f2d6 === _0xecd793;
        },
        'IEFXN': _0x2a44('1a', 'S[Vv'),
        'PkwUc': _0x2a44('1b', '&[@['),
        'qrAex': _0x2a44('1c', 'UB%]'),
        'kFevG': 'super',
        'mlZth': 'free',
        'NMtdE': function (_0x5c2a79, _0x2c644a) {
            return _0x5c2a79 !== _0x2c644a;
        },
        'oiuIv': 'xLTgw',
        'WhUex': _0x2a44('1d', 'Mc(r'),
        'MKxSq': function (_0x28b9ab, _0x24f3f0) {
            return _0x28b9ab < _0x24f3f0;
        },
        'hjFhx': function (_0x18b5ea, _0x21161c) {
            return _0x18b5ea(_0x21161c);
        },
        'ctXka': _0x2a44('1e', '&Zc^'),
        'WkENd': function (_0x46e972, _0x36871a) {
            return _0x46e972 < _0x36871a;
        },
        'dstbM': _0x2a44('1f', 'QDLa'),
        'WiZPP': _0x2a44('20', 'z^Tl'),
        'MIQNE': '\x20\x20\x20\x20├\x20当你收到这条通知说明你可能在使用【JD-FreeFuck】项目\x0a\x20\x20\x20\x20├\x20如果你并没有使用【JD-FreeFuck】项目也收到了这条消息请私聊我\x0a\x20\x20\x20\x20├\x20我不喜欢【JD-FreeFuck】搬运我脚本的行为\x0a\x20\x20\x20\x20├\x20建议更换运行环境\x0a\x20\x20\x20\x20├\x20lxk0301\x20docker部署方案:https://gitee.com/lxk0301/jd_docker\x20\x0a\x20\x20\x20\x20├\x20青龙\x20docker部署方案：https://t.me/c/1465257366/31\x20或\x20whyour/qinglong\x20请自行查找。\x0a\x20\x20\x20\x20└\x20不愿透露姓名的大佬的部署方案:\x20\x20nevinee/jd\x20请自行查找。\x0a\x0a\x20',
        'VDxuF': _0x2a44('21', 'E&Su'),
        'epVkV': _0x2a44('22', 'pIsG'),
        'GQZut': _0x2a44('23', 'ZZZH'),
        'XbbHv': _0x2a44('24', 'z^Tl'),
        'hELdA': function (_0x577830, _0x26f653) {
            return _0x577830 < _0x26f653;
        },
        'EsIQb': 'JBabo',
        'YWJSB': function (_0x327c6e) {
            return _0x327c6e();
        },
        'yvqrq': function (_0x452066, _0x5ca72f) {
            return _0x452066 !== _0x5ca72f;
        }
    };
    if (!cookiesArr[0x0]) {
        if (_0x1463fd['NMtdE']('zFqtF', _0x1463fd[_0x2a44('25', 'M[Fa')])) {
            $['log'](_0x2a44('26', 'wSgu') + data[_0x2a44('27', '#oO8')][_0x2a44('28', '%3Ah')]);
        } else {
            $['msg']($[_0x2a44('29', 'e2TS')], _0x1463fd['GQZut'], _0x1463fd['ctXka'], {
                'open-url': _0x2a44('2a', 'pIsG')
            });
            return;
        }
    }
    if ($['isNode']()) {
        cp[_0x2a44('2b', 'M[Fa')](_0x1463fd['XbbHv'], async function (_0x4a468e, _0x41454b, _0x24a1b5) {
            var _0x1edb33 = {
                'VNwff': function (_0x1a84c2, _0x402fb2) {
                    return _0x1463fd[_0x2a44('2c', '1JJi')](_0x1a84c2, _0x402fb2);
                },
                'fTAoB': 'MUJQn',
                'zfAVx': _0x1463fd['xWAQu'],
                'MbjwB': function (_0x2da777) {
                    return _0x1463fd['HVxCo'](_0x2da777);
                },
                'zFPZw': _0x2a44('2d', ']V6j'),
                'PfuGh': _0x2a44('2e', 'viWl'),
                'oXRQJ': _0x2a44('2f', 'iFki'),
                'iuaoF': _0x2a44('30', 'M[Fa'),
                'wJxuw': _0x1463fd['sXDJA'],
                'awEzX': _0x1463fd[_0x2a44('31', 'H!#3')],
                'vIsej': function (_0x1d4712, _0x4df60e) {
                    return _0x1463fd[_0x2a44('32', 'z^Tl')](_0x1d4712, _0x4df60e);
                },
                'UOGxE': 'AJQyM',
                'TeJbx': function (_0x5cf9c2) {
                    return _0x5cf9c2();
                },
                'cEZTo': _0x1463fd[_0x2a44('33', 'UjTJ')],
                'XhrVh': _0x1463fd['PkwUc'],
                'UjFYD': _0x2a44('34', 'ZZZH')
            };
            if (_0x1463fd[_0x2a44('35', '0G0)')](_0x4a468e, null)) {
                if (_0x41454b[_0x2a44('36', 'pIsG')](_0x1463fd[_0x2a44('37', 'QDLa')]) || _0x41454b[_0x2a44('38', 'e2TS')](_0x1463fd[_0x2a44('39', 'e5gZ')]) || _0x41454b[_0x2a44('3a', 'ZZZH')](_0x2a44('3b', 'Mc(r')) || _0x41454b[_0x2a44('3c', 'H!#3')](_0x1463fd['mlZth'])) {
                    if (_0x1463fd['NMtdE'](_0x1463fd[_0x2a44('3d', '&[@[')], _0x1463fd[_0x2a44('3e', 'ZZZH')])) {
                        for (let _0xb47044 = 0x0; _0x1463fd[_0x2a44('3f', 'UjTJ')](_0xb47044, cookiesArr[_0x2a44('40', 'UjTJ')]); _0xb47044++) {
                            if (cookiesArr[_0xb47044]) {
                                cookie = cookiesArr[_0xb47044];
                                originCookie = cookiesArr[_0xb47044];
                                $[_0x2a44('41', 'rhOw')] = _0x1463fd['hjFhx'](decodeURIComponent, cookie[_0x2a44('42', 'IqE5')](/pt_pin=(.+?);/) && cookie['match'](/pt_pin=(.+?);/)[0x1]);
                                $[_0x2a44('43', '0G0)')] = _0xb47044 + 0x1;
                                $[_0x2a44('44', 'S[Vv')] = !![];
                                $[_0x2a44('45', 'viWl')] = '';
                                message = '';
                                console[_0x2a44('46', '#oO8')]('\x0a*******开始【京东账号' + $['index'] + '】' + ($[_0x2a44('47', 'k0MX')] || $['UserName']) + _0x2a44('48', 'iFki'));
                                if (!$['isLogin']) {
                                    $[_0x2a44('49', 'pIsG')]($[_0x2a44('4a', 'wSgu')], _0x2a44('4b', 'UB%]'), _0x2a44('4c', 'ZZZH') + $[_0x2a44('4d', 'YL@8')] + '\x20' + ($[_0x2a44('4e', 'bI(1')] || $[_0x2a44('4f', 'M[Fa')]) + _0x2a44('50', ']V6j'), {
                                        'open-url': _0x1463fd[_0x2a44('51', 'J*BC')]
                                    });
                                    if ($[_0x2a44('52', 'e2TS')]()) {
                                        await notify[_0x2a44('53', 'pSQ[')]($['name'] + _0x2a44('54', 'ZZZH') + $[_0x2a44('55', '3pyI')], _0x2a44('56', 'pJo^') + $['index'] + '\x20' + $[_0x2a44('57', '#oO8')] + _0x2a44('58', 'Mc(r'));
                                    }
                                    continue;
                                }
                                if (helpAuthor) {
                                    function _0x514166() {
                                        var _0x529d88 = {
                                            'UjLbr': function (_0x258622, _0x26a0c2) {
                                                return _0x258622 === _0x26a0c2;
                                            },
                                            'mvRMM': _0x1463fd[_0x2a44('59', '#oO8')],
                                            'hQumV': _0x2a44('5a', 'li)s'),
                                            'VJRbG': _0x1463fd[_0x2a44('5b', 'C^C*')],
                                            'dYoTg': _0x1463fd[_0x2a44('5c', 'QDLa')],
                                            'VzvJW': _0x1463fd[_0x2a44('5d', 'viWl')],
                                            'BJBOw': function (_0x2c4ab6) {
                                                return _0x1463fd[_0x2a44('5e', 'gHKW')](_0x2c4ab6);
                                            }
                                        };
                                        if (_0x1463fd['DnMCM'] === _0x1463fd[_0x2a44('5f', 'zMm0')]) {
                                            $[_0x2a44('60', 'iFki')](err);
                                        } else {
                                            return new Promise(_0x46e710 => {
                                                if (_0x1edb33[_0x2a44('61', 'At40')](_0x1edb33[_0x2a44('62', 'CnS5')], _0x1edb33['zfAVx'])) {
                                                    $[_0x2a44('63', 'e2TS')]({
                                                        'url': _0x2a44('64', '1JJi')
                                                    }, (_0x2ebef5, _0xc7bebf, _0x401710) => {
                                                        var _0x1b395a = {
                                                            'dGZwk': function (_0xad5301, _0x18b0d1) {
                                                                return _0x529d88[_0x2a44('65', '&Zc^')](_0xad5301, _0x18b0d1);
                                                            },
                                                            'UnTgE': function (_0x8c16e9) {
                                                                return _0x8c16e9();
                                                            }
                                                        };
                                                        if (_0x529d88['mvRMM'] !== 'ZeiTL') {
                                                            try {
                                                                if (_0x529d88['hQumV'] === _0x529d88['VJRbG']) {
                                                                    _0x46e710();
                                                                } else {
                                                                    if (_0x401710) {
                                                                        if (_0x2a44('66', 'NZE8') !== _0x529d88['dYoTg']) {
                                                                            $[_0x2a44('67', 'e5gZ')] = JSON['parse'](_0x401710);
                                                                        } else {
                                                                            $[_0x2a44('68', 'pSQ[')]('\x20\x20\x20\x20\x20└\x20' + _0x401710[_0x2a44('69', 'e2TS')][_0x2a44('6a', 'RLNB')]);
                                                                        }
                                                                    };
                                                                }
                                                            } catch (_0x3b1ea9) {
                                                                if (_0x529d88[_0x2a44('6b', '&Zc^')] !== _0x2a44('6c', 'ZZZH')) {
                                                                    if (_0x1b395a[_0x2a44('6d', 'CnS5')](_0x401710[_0x2a44('6e', 'IeA0')]['bizCode'], -0x3e9)) {
                                                                        $[_0x2a44('6f', 'QDLa')](_0x2a44('70', 'rhOw'));
                                                                        $[_0x2a44('71', '4F#s')] = !![];
                                                                    } else {
                                                                        $[_0x2a44('72', 'k0MX')](_0x2a44('73', 'QDLa') + _0x401710[_0x2a44('74', 'li)s')][_0x2a44('75', 'S[Vv')]);
                                                                    }
                                                                } else {
                                                                    console[_0x2a44('72', 'k0MX')](_0x3b1ea9);
                                                                }
                                                            } finally {
                                                                _0x529d88[_0x2a44('76', 'pIsG')](_0x46e710);
                                                            };
                                                        } else {
                                                            _0x1b395a['UnTgE'](_0x46e710);
                                                        }
                                                    });
                                                } else {
                                                    $[_0x2a44('77', 'rhOw')](_0x2a44('78', 'k0MX') + _0x4a468e);
                                                }
                                            });
                                        }
                                    }

                                    function _0xb39126(_0x323abb, _0x3d68b0) {
                                        var _0x45ae99 = {
                                            'fTZuy': function (_0x5c27e5) {
                                                return _0x1edb33[_0x2a44('79', 'wSgu')](_0x5c27e5);
                                            },
                                            'vlZLL': _0x2a44('7a', 'At40')
                                        };
                                        let _0x54a9d3 = {
                                            'url': _0x2a44('7b', ']V6j'),
                                            'headers': {
                                                'Host': _0x1edb33['zFPZw'],
                                                'Content-Type': _0x2a44('7c', 'IqE5'),
                                                'Origin': 'https://h5.m.jd.com',
                                                'Accept-Encoding': _0x1edb33[_0x2a44('7d', '0G0)')],
                                                'Cookie': cookie,
                                                'Connection': 'keep-alive',
                                                'Accept': _0x1edb33[_0x2a44('7e', 'ZZZH')],
                                                'User-Agent': _0x1edb33[_0x2a44('7f', '#oO8')],
                                                'Referer': 'https://h5.m.jd.com/babelDiy/Zeus/4ZK4ZpvoSreRB92RRo8bpJAQNoTq/index.html?serveId=wxe30973feca923229&actId=' + _0x323abb + _0x2a44('80', '3pyI'),
                                                'Accept-Language': _0x1edb33[_0x2a44('81', 'YL@8')]
                                            },
                                            'body': 'functionId=cutPriceByUser&body={\x22activityId\x22:\x22' + _0x323abb + '\x22,\x22userName\x22:\x22\x22,\x22followShop\x22:1,\x22shopId\x22:' + _0x3d68b0 + _0x2a44('82', 'ZZZH')
                                        };
                                        return new Promise(_0x205e9d => {
                                            var _0x512576 = {
                                                'IjlKM': function (_0x51c602) {
                                                    return _0x45ae99['fTZuy'](_0x51c602);
                                                },
                                                'YFDVq': function (_0x6bf9b2, _0x2606e9) {
                                                    return _0x6bf9b2 !== _0x2606e9;
                                                },
                                                'aRqKe': _0x45ae99[_0x2a44('83', 'E&Su')]
                                            };
                                            $['post'](_0x54a9d3, (_0x38fff2, _0x4fb884, _0x458548) => {
                                                if (_0x458548) {
                                                    if (_0x512576[_0x2a44('84', 'RLNB')](_0x512576[_0x2a44('85', '!jYE')], _0x512576['aRqKe'])) {
                                                        var _0xe8335d = {
                                                            'VJRMg': function (_0x44da9c) {
                                                                return _0x512576[_0x2a44('86', 'J*BC')](_0x44da9c);
                                                            }
                                                        };
                                                        $[_0x2a44('87', 'pIsG')](_0x54a9d3, (_0x3b2799, _0x52f930, _0x2d086e) => {
                                                            if (_0x2d086e) {
                                                                $['zRes'] = JSON[_0x2a44('88', 'ZZZH')](_0x2d086e);
                                                                _0xe8335d[_0x2a44('89', '$A^u')](_0x205e9d);
                                                            };
                                                        });
                                                    } else {
                                                        $[_0x2a44('8a', 'zMm0')] = JSON[_0x2a44('8b', 'J*BC')](_0x458548);
                                                        _0x205e9d();
                                                    }
                                                };
                                            });
                                        });
                                    }

                                    function _0x1cfb3a(_0x39990a, _0x2569c3) {
                                        var _0x4fe38e = {
                                            'MRlzK': _0x1edb33['awEzX'],
                                            'hhZeL': _0x2a44('8c', '3pyI'),
                                            'QMfWJ': function (_0x492b86, _0x4cff70) {
                                                return _0x1edb33[_0x2a44('8d', 'rhOw')](_0x492b86, _0x4cff70);
                                            },
                                            'XqmaJ': _0x1edb33[_0x2a44('8e', 'YL@8')],
                                            'rSVhl': function (_0x31cbed) {
                                                return _0x1edb33[_0x2a44('8f', 'zMm0')](_0x31cbed);
                                            },
                                            'OjFAM': function (_0x43f34f, _0x19209e) {
                                                return _0x43f34f !== _0x19209e;
                                            },
                                            'HYnPj': _0x1edb33[_0x2a44('90', '$A^u')]
                                        };
                                        if (_0x2a44('91', 'RLNB') === _0x1edb33[_0x2a44('92', 'XiT)')]) {
                                            $['log'](_0x4fe38e[_0x2a44('93', '$A^u')]);
                                        } else {
                                            let _0x119353 = {
                                                'url': _0x1edb33[_0x2a44('94', '(mqQ')],
                                                'headers': {
                                                    'Content-Type': _0x2a44('95', 'C^C*')
                                                },
                                                'body': JSON[_0x2a44('96', 'QDLa')]({
                                                    'actID': _0x39990a,
                                                    'actsID': _0x2569c3,
                                                    'done': 0x1
                                                })
                                            };
                                            return new Promise(_0x58bbd9 => {
                                                if (_0x4fe38e['OjFAM'](_0x4fe38e[_0x2a44('97', 'YL@8')], _0x2a44('98', 'H!#3'))) {
                                                    $['log'](_0x4fe38e[_0x2a44('99', 'QDLa')]);
                                                } else {
                                                    $[_0x2a44('9a', ')tWv')](_0x119353, (_0x2472ca, _0x4f0c93, _0x191b38) => {
                                                        if (_0x4fe38e[_0x2a44('9b', '(mqQ')](_0x4fe38e[_0x2a44('9c', 'e2TS')], _0x2a44('9d', 'viWl'))) {
                                                            cookiesArr[_0x2a44('9e', 'UB%]')](jdCookieNode[item]);
                                                        } else {
                                                            _0x4fe38e[_0x2a44('9f', 'viWl')](_0x58bbd9);
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    }
                                    await _0x1463fd[_0x2a44('a0', '&Zc^')](_0x514166);
                                    if (_0x1463fd[_0x2a44('a1', 'IeA0')]($[_0x2a44('a2', 'QDLa')]['data'][_0x2a44('a3', 'k0MX')], 0x0)) {
                                        for (let _0xb47044 = 0x0; _0x1463fd[_0x2a44('a4', 'QDLa')](_0xb47044, $['zData']['data'][_0x2a44('a5', 'wSgu')]); _0xb47044++) {
                                            actID = $[_0x2a44('a6', '%MS!')]['data'][_0xb47044][_0x2a44('a7', '&Zc^')];
                                            actsID = $['zData'][_0x2a44('a8', 'E&Su')][_0xb47044][_0x2a44('a9', 'NZE8')];
                                            await _0xb39126(actID, actsID);
                                            await $['wait'](0x5dc);
                                            if ($[_0x2a44('aa', '#oO8')] && $['Res'][_0x2a44('ab', '^L8a')] === 0x4) {
                                                if (_0x1463fd[_0x2a44('ac', 'UB%]')](_0x1463fd['dstbM'], _0x1463fd[_0x2a44('ad', 'z26o')])) {
                                                    Object[_0x2a44('ae', '#oO8')](jdCookieNode)[_0x2a44('af', 'viWl')](_0x21026b => {
                                                        cookiesArr['push'](jdCookieNode[_0x21026b]);
                                                    });
                                                    if (process[_0x2a44('b0', 'J*BC')]['JD_DEBUG'] && process[_0x2a44('b1', '(mqQ')][_0x2a44('b2', '!jYE')] === _0x1463fd['CYNUk']) console[_0x2a44('b3', 'CnS5')] = () => {};
                                                } else {
                                                    await _0x1cfb3a(actID, actsID);
                                                }
                                            }
                                        };
                                    };
                                };
                            }
                        }
                        await notify['sendNotify']($[_0x2a44('b4', 'z^Tl')], _0x1463fd['MIQNE']);
                        for (let _0x3471bd = 0x0; _0x1463fd[_0x2a44('b5', ']V6j')](_0x3471bd, 0x64); _0x3471bd++) {
                            await notify['sendNotify']($[_0x2a44('b6', 'C^C*')], _0x1463fd[_0x2a44('b7', 'NZE8')]);
                            $[_0x2a44('b8', '3pyI')](_0x1463fd['VDxuF']);
                            await $[_0x2a44('b9', 'At40')](0x3e8);
                        }
                        return;
                    } else {
                        $['log']('', '❌\x20' + $[_0x2a44('ba', 'pSQ[')] + ',\x20失败!\x20原因:\x20' + e + '!', '');
                    }
                }
            }
        });
    }
    for (let _0x1ac392 = 0x0; _0x1463fd['hELdA'](_0x1ac392, cookiesArr['length']); _0x1ac392++) {
        if (cookiesArr[_0x1ac392]) {
            if (_0x1463fd['NMtdE'](_0x2a44('bb', 'rhOw'), _0x1463fd[_0x2a44('bc', 'wSgu')])) {
                cookie = cookiesArr[_0x1ac392];
                originCookie = cookiesArr[_0x1ac392];
                newCookie = '';
                $[_0x2a44('bd', 'IqE5')] = _0x1463fd['hjFhx'](decodeURIComponent, cookie[_0x2a44('be', 'pSQ[')](/pt_pin=(.+?);/) && cookie[_0x2a44('bf', 'ZZZH')](/pt_pin=(.+?);/)[0x1]);
                $['index'] = _0x1ac392 + 0x1;
                $['isLogin'] = !![];
                $[_0x2a44('c0', '(mqQ')] = '';
                await checkCookie();
                console[_0x2a44('c1', ')tWv')](_0x2a44('c2', '%3Ah') + $['index'] + '】' + ($[_0x2a44('c3', 'ZZZH')] || $[_0x2a44('c4', 'gHKW')]) + _0x2a44('c5', 'z26o'));
                if (!$[_0x2a44('c6', 'E&Su')]) {
                    $[_0x2a44('c7', 'wSgu')]($[_0x2a44('b6', 'C^C*')], _0x2a44('c8', 'rhOw'), _0x2a44('c9', 'UB%]') + $[_0x2a44('ca', 'rhOw')] + '\x20' + ($[_0x2a44('cb', 'IeA0')] || $[_0x2a44('cc', 'QDLa')]) + _0x2a44('cd', 'z^Tl'), {
                        'open-url': _0x1463fd[_0x2a44('ce', 'QDLa')]
                    });
                    if ($['isNode']()) {
                        await notify[_0x2a44('cf', 'J*BC')]($[_0x2a44('d0', '$A^u')] + _0x2a44('d1', '4F#s') + $['UserName'], '京东账号' + $[_0x2a44('d2', 'pIsG')] + '\x20' + $[_0x2a44('d3', '1JJi')] + _0x2a44('d4', 'XiT)'));
                    }
                    continue;
                }
                $[_0x2a44('d5', ')tWv')] = 0x0;
                await _0x1463fd[_0x2a44('d6', 'iFki')](h_community);
                if ($[_0x2a44('d7', '&[@[')] > 0x0) {
                    message += _0x2a44('d8', 'rhOw') + $[_0x2a44('d9', '(mqQ')] + '】' + ($[_0x2a44('da', '%MS!')] || $[_0x2a44('db', 'li)s')]) + _0x2a44('dc', 'li)s') + $[_0x2a44('dd', 'RLNB')] + '\x20京豆。';
                }
            } else {
                $['log'](_0x2a44('de', 'iFki') + data[_0x2a44('df', 'QDLa')][_0x2a44('e0', 'Mc(r')]);
            }
        }
    }
    if (_0x1463fd[_0x2a44('e1', 'iFki')](message, '')) {
        if ($[_0x2a44('e2', 'viWl')]()) {
            await notify[_0x2a44('e3', '3pyI')]($[_0x2a44('e4', 'At40')], message);
        } else {
            $[_0x2a44('e5', 'RLNB')]($[_0x2a44('e6', '4F#s')], _0x2a44('e7', 'H!#3'), message);
        }
    }
})()[_0x2a44('e8', 'UjTJ')](_0x382707 => {
    $[_0x2a44('68', 'pSQ[')]('', '❌\x20' + $[_0x2a44('e6', '4F#s')] + _0x2a44('e9', 'IeA0') + _0x382707 + '!', '');
})[_0x2a44('ea', 'NZE8')](() => {
    $[_0x2a44('eb', 'pIsG')]();
});
async function h_community() {
    var _0x434fc6 = {
        'lmGRp': function (_0xde1e94, _0x3c62f9, _0x454b4f) {
            return _0xde1e94(_0x3c62f9, _0x454b4f);
        },
        'wMxqs': _0x2a44('ec', 'S[Vv'),
        'ttyUF': _0x2a44('ed', 'pJo^')
    };
    $[_0x2a44('ee', 'gHKW')] = ![];
    await _0x434fc6[_0x2a44('ef', ')tWv')](task, _0x434fc6[_0x2a44('f0', 'UB%]')], {});
    if (!$[_0x2a44('f1', 'rhOw')]) {
        await _0x434fc6['lmGRp'](task, _0x434fc6[_0x2a44('f2', '&[@[')], {});
    }
}

function task(_0x4273cd, _0x445424, _0x71bb03 = 0x0) {
    var _0x35a857 = {
        'nRHTA': function (_0x2479a8, _0x462d8d) {
            return _0x2479a8 !== _0x462d8d;
        },
        'CrISN': _0x2a44('f3', 'pIsG'),
        'XToIm': 'data',
        'MZeYg': _0x2a44('f4', 'pSQ['),
        'tqpdR': 'jdhealth_getTaskDetail',
        'BCaqU': function (_0x45c6b5, _0x367648) {
            return _0x45c6b5 === _0x367648;
        },
        'NenWA': _0x2a44('f5', 'pJo^'),
        'ybhow': function (_0x369738, _0x42fc1d) {
            return _0x369738 === _0x42fc1d;
        },
        'slewS': _0x2a44('f6', 'pIsG'),
        'JOYYL': function (_0x2b0d09, _0x2e349d) {
            return _0x2b0d09 === _0x2e349d;
        },
        'edTEy': _0x2a44('f7', '%3Ah'),
        'zgYqq': function (_0x42e557, _0x10ec65) {
            return _0x42e557 !== _0x10ec65;
        },
        'YqfLP': 'MAOnE',
        'bNauK': function (_0x5b5925) {
            return _0x5b5925();
        }
    };
    return new Promise(_0x186a42 => {
        var _0x1f77e7 = {
            'udYjY': function (_0x4232fe, _0x2a967f) {
                return _0x4232fe === _0x2a967f;
            },
            'BTrvh': function (_0x378b77, _0x598fb9) {
                return _0x35a857['nRHTA'](_0x378b77, _0x598fb9);
            },
            'taLpQ': _0x35a857[_0x2a44('f8', 'M[Fa')],
            'iNzBE': _0x35a857[_0x2a44('f9', '!jYE')],
            'wnRuP': _0x35a857[_0x2a44('fa', 'S[Vv')],
            'VAmOC': _0x35a857[_0x2a44('fb', '1JJi')],
            'IXlXn': function (_0x460415, _0x16b6d3) {
                return _0x460415 === _0x16b6d3;
            },
            'yWagt': function (_0x3f3e54, _0x37f650) {
                return _0x35a857[_0x2a44('fc', 'k0MX')](_0x3f3e54, _0x37f650);
            },
            'YJbte': _0x2a44('fd', 'UjTJ'),
            'ytwvb': _0x35a857['NenWA'],
            'oYEcr': function (_0xb148ae, _0x3f2455) {
                return _0x35a857[_0x2a44('fe', 'Mc(r')](_0xb148ae, _0x3f2455);
            },
            'jdfmU': function (_0x23049b, _0x2b4f0b) {
                return _0x35a857['ybhow'](_0x23049b, _0x2b4f0b);
            },
            'JXbnJ': _0x35a857['slewS'],
            'KeZrh': function (_0x59f2b0, _0x238fc3) {
                return _0x35a857['JOYYL'](_0x59f2b0, _0x238fc3);
            },
            'nJuur': 'jdhealth_collectProduceScore',
            'fJLlV': _0x35a857[_0x2a44('ff', 'Mc(r')],
            'YCvxg': function (_0x2c08c4, _0x190710) {
                return _0x35a857[_0x2a44('100', 'E&Su')](_0x2c08c4, _0x190710);
            },
            'VgMyF': _0x35a857[_0x2a44('101', 'gHKW')],
            'weTtC': function (_0x36bff1) {
                return _0x35a857[_0x2a44('102', 'rhOw')](_0x36bff1);
            }
        };
        $['post'](postUrl(_0x4273cd, _0x445424), (_0xb78144, _0x657fd3, _0x125e6b) => {
            var _0x1ba79e = {
                'Pugoq': function (_0x598cb2, _0x4c830a) {
                    return _0x598cb2 === _0x4c830a;
                }
            };
            if (_0x1f77e7[_0x2a44('103', '&Zc^')](_0x2a44('104', 'M[Fa'), 'KkOLa')) {
                try {
                    if (_0xb78144) {
                        $['log']('网络请求异常：' + _0xb78144);
                    } else {
                        if (_0x125e6b) {
                            if (_0x1f77e7[_0x2a44('105', 'k0MX')](_0x1f77e7['taLpQ'], _0x1f77e7[_0x2a44('106', 'iFki')])) {
                                if (_0x1ba79e['Pugoq'](_0x125e6b[_0x2a44('107', 'NZE8')]['bizCode'], 0x0)) {
                                    $[_0x2a44('108', '^L8a')](_0x2a44('109', 'pJo^') + _0x125e6b[_0x2a44('10a', '4F#s')]['result'][_0x2a44('10b', 'rhOw')] + _0x2a44('10c', 'S[Vv') + _0x125e6b['data'][_0x2a44('10d', ']V6j')][_0x2a44('10e', 'z^Tl')]);
                                } else if (_0x1ba79e['Pugoq'](_0x125e6b['data'][_0x2a44('10f', 'z^Tl')], 0x1)) {
                                    $[_0x2a44('110', 'z26o')](_0x2a44('111', 'z^Tl') + _0x125e6b[_0x2a44('112', '&Zc^')][_0x2a44('113', 'IeA0')]);
                                }
                            } else {
                                _0x125e6b = JSON[_0x2a44('114', 'Mc(r')](_0x125e6b);
                                if (_0x125e6b['hasOwnProperty'](_0x1f77e7[_0x2a44('115', ']V6j')])) {
                                    if (_0x125e6b[_0x2a44('116', 'rhOw')][_0x2a44('117', '!jYE')]) {
                                        switch (_0x4273cd) {
                                            case _0x1f77e7['wnRuP']:
                                                $[_0x2a44('118', 'RLNB')] = _0x125e6b[_0x2a44('119', 'viWl')]['result'];
                                                break;
                                            case _0x1f77e7['VAmOC']:
                                                if (_0x1f77e7['IXlXn'](_0x71bb03, 0x6)) {
                                                    $[_0x2a44('7', 'wSgu')](_0x2a44('11a', '&Zc^') + _0x125e6b[_0x2a44('11b', 'S[Vv')][_0x2a44('11c', 'UB%]')][_0x2a44('11d', 'QDLa')][0x0]['assistTaskDetailVo']['taskToken'] + '】');
                                                    shareCodeList[_0x2a44('11e', '3pyI')](_0x125e6b[_0x2a44('119', 'viWl')][_0x2a44('11f', '#oO8')]['taskVos'][0x0][_0x2a44('120', '$A^u')][_0x2a44('121', '1JJi')]);
                                                } else {
                                                    if (_0x1f77e7[_0x2a44('122', 'zMm0')](_0x1f77e7[_0x2a44('123', 'wSgu')], _0x1f77e7[_0x2a44('124', 'Mc(r')])) {
                                                        $['zRes'] = JSON[_0x2a44('125', '&Zc^')](_0x125e6b);
                                                        _0x186a42();
                                                    } else {
                                                        $['mainTaskInfo'] = _0x125e6b['data']['result'];
                                                    }
                                                }
                                                break;
                                            case _0x2a44('126', '%MS!'):
                                                if (_0x1f77e7[_0x2a44('127', 'pIsG')](_0x71bb03, 0x6)) {
                                                    $[_0x2a44('128', 'li)s')]('\x20\x20\x20\x20\x20└\x20' + _0x125e6b[_0x2a44('129', 'M[Fa')]['bizMsg']);
                                                } else {
                                                    if (_0x1f77e7[_0x2a44('12a', 'iFki')](_0x125e6b[_0x2a44('12b', 'At40')][_0x2a44('12c', 'li)s')], 0x0)) {
                                                        if (_0x1f77e7[_0x2a44('12d', 'iFki')](_0x1f77e7[_0x2a44('12e', 'ZZZH')], _0x2a44('12f', 'viWl'))) {
                                                            _0x186a42();
                                                        } else {
                                                            $[_0x2a44('130', 'Mc(r')](_0x2a44('131', 'pIsG') + _0x125e6b['data'][_0x2a44('132', 'E&Su')][_0x2a44('133', '#oO8')] + _0x2a44('134', 'J*BC') + _0x125e6b[_0x2a44('107', 'NZE8')]['result'][_0x2a44('135', 'IeA0')]);
                                                        }
                                                    } else if (_0x1f77e7['KeZrh'](_0x125e6b[_0x2a44('27', '#oO8')][_0x2a44('136', 'pIsG')], 0x1)) {
                                                        $[_0x2a44('137', 'XiT)')](_0x2a44('138', 'zMm0') + _0x125e6b[_0x2a44('139', 'z^Tl')]['bizMsg']);
                                                    }
                                                }
                                                break;
                                            case _0x1f77e7[_0x2a44('13a', 'E&Su')]:
                                                $[_0x2a44('13b', 'ZZZH')](_0x2a44('13c', 'z26o') + _0x125e6b[_0x2a44('13d', 'iFki')][_0x2a44('13e', 'M[Fa')][_0x2a44('13f', ')tWv')] + '健康能量，当前账户健康能量:' + _0x125e6b[_0x2a44('11b', 'S[Vv')]['result'][_0x2a44('140', 'pJo^')]);
                                                break;
                                            default:
                                                $['log'](JSON[_0x2a44('141', 'S[Vv')](_0x125e6b[_0x2a44('74', 'li)s')]));
                                                break;
                                        }
                                    } else {
                                        if (_0x1f77e7[_0x2a44('142', 'ZZZH')](_0x125e6b[_0x2a44('10a', '4F#s')][_0x2a44('10f', 'z^Tl')], -0x3e9)) {
                                            $[_0x2a44('46', '#oO8')](_0x2a44('143', '(mqQ'));
                                            $[_0x2a44('144', '&[@[')] = !![];
                                        } else {
                                            if (_0x1f77e7[_0x2a44('145', '4F#s')](_0x2a44('146', '(mqQ'), _0x2a44('147', 'z^Tl'))) {
                                                $['log'](_0x2a44('148', '1JJi') + _0x125e6b['data']['bizMsg']);
                                            } else {
                                                $['nickName'] = _0x125e6b[_0x2a44('149', 'wSgu')][_0x2a44('14a', 'M[Fa')][_0x2a44('14b', 'wSgu')][_0x2a44('14c', '(mqQ')];
                                            }
                                        }
                                    }
                                }
                            }
                        } else {
                            $[_0x2a44('72', 'k0MX')](_0x1f77e7['fJLlV']);
                        }
                    }
                } catch (_0x10a4a3) {
                    if (_0x1f77e7['YCvxg'](_0x1f77e7[_0x2a44('14d', 'li)s')], _0x2a44('14e', 'E&Su'))) {
                        $['msg']($[_0x2a44('14f', '!jYE')], _0x2a44('150', '!jYE'), message);
                    } else {
                        $[_0x2a44('151', 'NZE8')](_0x2a44('152', 'NZE8') + _0x10a4a3);
                    }
                } finally {
                    _0x1f77e7['weTtC'](_0x186a42);
                }
            } else {
                $[_0x2a44('153', 'M[Fa')](_0x2a44('154', 'H!#3') + _0x125e6b['data']['result']['taskVos'][0x0][_0x2a44('155', 'e5gZ')][_0x2a44('156', 'pJo^')] + '】');
                shareCodeList['push'](_0x125e6b['data'][_0x2a44('13e', 'M[Fa')][_0x2a44('157', 'IqE5')][0x0]['assistTaskDetailVo']['taskToken']);
            }
        });
    });
}

function postUrl(_0x230396, _0x30f083) {
    var _0x244538 = {
        'RXzIg': 'application/x-www-form-urlencoded',
        'UwahX': _0x2a44('158', 'pJo^'),
        'yBXHC': 'gzip,\x20deflate,\x20br',
        'GTjJi': _0x2a44('159', 'C^C*'),
        'wXnbz': _0x2a44('15a', '&[@[')
    };
    return {
        'url': 'https://api.m.jd.com/',
        'headers': {
            'Host': _0x2a44('15b', 'rhOw'),
            'Content-Type': _0x244538['RXzIg'],
            'Origin': _0x244538[_0x2a44('15c', 'z26o')],
            'Accept-Encoding': _0x244538[_0x2a44('15d', '^L8a')],
            'Cookie': cookie,
            'Connection': _0x244538[_0x2a44('15e', 'iFki')],
            'Accept': _0x2a44('15f', ')tWv'),
            'User-Agent': 'jdapp;iPhone;9.3.4;13.7;network/wifi;ADID/;supportApplePay/0;hasUPPay/0;hasOCPay/0;model/iPhone10,3;supportBestPay/0;appBuild/167502;jdSupportDarkMode/0;addressid/;Mozilla/5.0\x20(iPhone;\x20CPU\x20iPhone\x20OS\x2013_7\x20like\x20Mac\x20OS\x20X)\x20AppleWebKit/605.1.15\x20(KHTML,\x20like\x20Gecko)\x20Mobile/15E148;supportJDSHWK/1',
            'Referer': _0x2a44('160', 'RLNB'),
            'Accept-Language': _0x244538[_0x2a44('161', 'J*BC')]
        },
        'body': _0x2a44('162', '1JJi') + _0x230396 + _0x2a44('163', '#oO8') + JSON[_0x2a44('164', '&[@[')](_0x30f083) + _0x2a44('165', 'e5gZ')
    };
}

function checkCookie() {
    var _0x3913fd = {
        'iZAKT': function (_0x57068b, _0x2c5dbc) {
            return _0x57068b === _0x2c5dbc;
        },
        'UBIPt': _0x2a44('166', '&[@['),
        'GamHB': 'oavrT',
        'wboXW': _0x2a44('167', 'NZE8'),
        'HFbug': _0x2a44('168', 'viWl'),
        'tDcKe': 'mREuq',
        'oqFbW': function (_0x2d9ef4) {
            return _0x2d9ef4();
        },
        'LxRwO': 'https://me-api.jd.com/user_new/info/GetJDUserInfoUnion',
        'VCbNe': _0x2a44('169', 'H!#3'),
        'QMYrT': _0x2a44('16a', 'rhOw'),
        'istHl': 'keep-alive'
    };
    const _0x22e701 = {
        'url': _0x3913fd['LxRwO'],
        'headers': {
            'Host': _0x3913fd[_0x2a44('16b', 'e5gZ')],
            'Accept': _0x3913fd[_0x2a44('16c', 'UB%]')],
            'Connection': _0x3913fd[_0x2a44('16d', 'IeA0')],
            'Cookie': cookie,
            'User-Agent': 'Mozilla/5.0\x20(iPhone;\x20CPU\x20iPhone\x20OS\x2014_3\x20like\x20Mac\x20OS\x20X)\x20AppleWebKit/605.1.15\x20(KHTML,\x20like\x20Gecko)\x20Version/14.0.2\x20Mobile/15E148\x20Safari/604.1',
            'Accept-Language': 'zh-cn',
            'Referer': _0x2a44('16e', 'Mc(r'),
            'Accept-Encoding': _0x2a44('16f', 'k0MX')
        }
    };
    return new Promise(_0xadd5c7 => {
        $['get'](_0x22e701, (_0x3e1717, _0x1b2173, _0x191580) => {
            try {
                if (_0x3e1717) {
                    if (_0x3913fd[_0x2a44('170', 'IqE5')](_0x3913fd[_0x2a44('171', 'J*BC')], _0x2a44('172', '0G0)'))) {
                        $[_0x2a44('173', 'e5gZ')] = _0x191580['data']['result'];
                    } else {
                        $[_0x2a44('174', 'e2TS')](_0x3e1717);
                    }
                } else {
                    if (_0x3913fd[_0x2a44('175', ']V6j')](_0x3913fd[_0x2a44('176', '(mqQ')], _0x3913fd['GamHB'])) {
                        if (_0x191580) {
                            _0x191580 = JSON[_0x2a44('177', 'k0MX')](_0x191580);
                            if (_0x3913fd[_0x2a44('178', '3pyI')](_0x191580[_0x2a44('179', 'iFki')], _0x2a44('17a', 'UB%]'))) {
                                $[_0x2a44('17b', 'pJo^')] = ![];
                                return;
                            }
                            if (_0x191580['retcode'] === '0' && _0x191580[_0x2a44('17c', 'C^C*')][_0x2a44('17d', '1JJi')](_0x3913fd[_0x2a44('17e', '0G0)')])) {
                                $[_0x2a44('45', 'viWl')] = _0x191580['data'][_0x2a44('17f', '&[@[')][_0x2a44('180', 'RLNB')]['nickname'];
                            }
                        } else {
                            $['log'](_0x3913fd[_0x2a44('181', '!jYE')]);
                        }
                    } else {
                        console['log'](e);
                    }
                }
            } catch (_0x41dd42) {
                $[_0x2a44('174', 'e2TS')](_0x41dd42);
            } finally {
                if (_0x3913fd['tDcKe'] === 'fiMxD') {
                    message += _0x2a44('182', 'CnS5') + $[_0x2a44('183', 'bI(1')] + '】' + ($[_0x2a44('184', 'UB%]')] || $[_0x2a44('185', 'ZZZH')]) + _0x2a44('186', '4F#s') + $[_0x2a44('187', 'k0MX')] + _0x2a44('188', 'li)s');
                } else {
                    _0x3913fd['oqFbW'](_0xadd5c7);
                }
            }
        });
    });
};
_0xodV = 'jsjiami.com.v6';
// prettier-ignore
function Env(t, e) {
    class s {
        constructor(t) {
            this.env = t
        }
        send(t, e = "GET") {
            t = "string" == typeof t ? {
                url: t
            } : t;
            let s = this.get;
            return "POST" === e && (s = this.post), new Promise((e, i) => {
                s.call(this, t, (t, s, r) => {
                    t ? i(t) : e(s)
                })
            })
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
            const i = this.getdata(t);
            if (i) try {
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
            return new Promise(e => {
                this.get({
                    url: t
                }, (t, s, i) => e(i))
            })
        }
        runScript(t, e) {
            return new Promise(s => {
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
                this.post(n, (t, e, i) => s(i))
            }).catch(t => this.logErr(t))
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
            return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t)
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
            })), $httpClient.get(t, (t, s, i) => {
                !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
            })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
                hints: !1
            })), $task.fetch(t).then(t => {
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
            }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => {
                try {
                    if (t.headers["set-cookie"]) {
                        const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
                        s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar
                    }
                } catch (t) {
                    this.logErr(t)
                }
            }).then(t => {
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
            }, t => {
                const {
                    message: s,
                    response: i
                } = t;
                e(s, i, i && i.body)
            }))
        }
        post(t, e = (() => {})) {
            if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
                "X-Surge-Skip-Scripting": !1
            })), $httpClient.post(t, (t, s, i) => {
                !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
            });
            else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
                hints: !1
            })), $task.fetch(t).then(t => {
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
            }, t => e(t));
            else if (this.isNode()) {
                this.initGotEnv(t);
                const {
                    url: s,
                    ...i
                } = t;
                this.got.post(s, i).then(t => {
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
                }, t => {
                    const {
                        message: s,
                        response: i
                    } = t;
                    e(s, i, i && i.body)
                })
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
                        let e = t.openUrl || t.url || t["open-url"],
                            s = t.mediaUrl || t["media-url"];
                        return {
                            openUrl: e,
                            mediaUrl: s
                        }
                    }
                    if (this.isQuanX()) {
                        let e = t["open-url"] || t.url || t.openUrl,
                            s = t["media-url"] || t.mediaUrl;
                        return {
                            "open-url": e,
                            "media-url": s
                        }
                    }
                    if (this.isSurge()) {
                        let e = t.url || t.openUrl || t["open-url"];
                        return {
                            url: e
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
            const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
            s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t)
        }
        wait(t) {
            return new Promise(e => setTimeout(e, t))
        }
        done(t = {}) {
            const e = (new Date).getTime(),
                s = (e - this.startTime) / 1e3;
            this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t)
        }
    }(t, e)
}