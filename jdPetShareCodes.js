let PetShareCodes = ["MTAxODcxOTI2NTAwMDAwMDAyNTUxNzEwMw==@MTE1NDQ5OTIwMDAwMDAwNDQwMzIxNDc=", "MTAxODcxOTI2NTAwMDAwMDAyNTUxNzEwMw==@MTE1NDQ5OTIwMDAwMDAwNDQwMzIxNDc="];
process.env.PETSHARECODES ? process.env.PETSHARECODES.indexOf("&") > -1 ? (console.log("您的东东萌宠互助码选择的是用&隔开\n"), PetShareCodes = process.env.PETSHARECODES.split("&")) : process.env.PETSHARECODES.indexOf("\n") > -1 ? (console.log("您的东东萌宠互助码选择的是用换行隔开\n"), PetShareCodes = process.env.PETSHARECODES.split("\n")) : PetShareCodes = process.env.PETSHARECODES.split() : process.env.JD_COOKIE && console.log("由于您secret里面未提供助力码，故此处运行将会给脚本内置的码进行助力，请知晓！");
for (let i = 0; i < PetShareCodes.length; i++) {
    exports["PetShareCode" + (i + 1 === 1 ? "" : i + 1)] = PetShareCodes[i]
}