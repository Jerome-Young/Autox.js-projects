auto.waitFor();
let Robot = require("../lib/Robot.js");
let WidgetAutomator = require("../lib/WidgetAutomator.js");
let robot = new Robot();
let widget = new WidgetAutomator(robot);
var pandareader = {}

pandareader.每日签到 = function(){
    app.launch('com.nd.android.pandareader');
    sleep(5000);
    widget.clickCenterText("福利");
    sleep(1000);
    // 右上角小宝箱
    widget.clickCenterId("com.nd.android.pandareader:id/a0m")
    sleep(1820);
    while(id("com.nd.android.pandareader:id/iy").exists()){
        log("领取小宝箱");
        widget.clickCenterId("com.nd.android.pandareader:id/iy");
        id("com.byted.pangle:id/tt_video_ad_close_layout").waitFor();
        sleep(1733);
        widget.clickCenterId("com.byted.pangle:id/tt_video_ad_close_layout");
        sleep(1487);
        click(996, 263);
    }
    sleep(3055);
    // 签到
    if(id("com.nd.android.pandareader:id/a2y").exists()){
        log("正在签到");
        widget.clickCenterId("com.nd.android.pandareader:id/a2y");
        sleep(1945);
        if(id("com.nd.android.pandareader:id/a5s").exists())widget.clickCenterId("com.nd.android.pandareader:id/a5s");
        id("com.byted.pangle:id/tt_video_ad_close_layout").waitFor();
        sleep(888);
        widget.clickCenterId("com.byted.pangle:id/tt_video_ad_close_layout");
        sleep(780);
        click(1038, 559);
        sleep(2066);
    }

    // 去观看
    while(true){
        if(text("领取").exists()){
            widget.clickCenterText("领取");
            sleep(2864);
            widget.clickCenterId("com.nd.android.pandareader:id/oo");
            sleep(2343);
        }
        if(text("(8/8)").exists())break;
        log("去观看");
        widget.clickCenterId("com.nd.android.pandareader:id/b5m");
        id("com.byted.pangle:id/tt_video_ad_close_layout").waitFor();
        sleep(1198);
        widget.clickCenterId("com.byted.pangle:id/tt_video_ad_close_layout");
        sleep(2000);
    }



}


module.exports = pandareader;
//定时器
// var timesetter = setInterval(function(){
//     每日签到()
//     }, 10000);
// setTimeout(function(){
//     log("结束");
//     clearInterval(timesetter);
// }, 12000);