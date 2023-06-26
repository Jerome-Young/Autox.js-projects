auto.waitFor();
require("./解锁.js");
let Robot = require("../lib/Robot.js");
let WidgetAutomator = require("../lib/WidgetAutomator.js");
let robot = new Robot();
let widget = new WidgetAutomator(robot);
var alipay = {}

alipay.会员签到 = function(){
    // 关闭更新弹窗
    if (id("update_cancel_tv").exists()) {
        widget.clickCenterId("update_cancel_tv");
        sleep(1000);
    }

    // 切换到我的
    widget.clickCenterText("我的");
    sleep(2000);

    // 进入支付宝会员
    let viprect = className("android.view.ViewGroup").findOnce().bounds()
    click(viprect.centerX(),viprect.top+viprect.height()/3);
    sleep(5000);

    // 请求截图并点击开始
    threads.start(function () {
        let sel = packageName('com.android.systemui').text('允许');
        sel.waitFor();
        sel.click();
    });

    if (!requestScreenCapture(false)) {
        throw new Error("请求截图失败");
    }
    sleep(500);

    // 使用OCR识别文字
    let img = images.captureScreen();
    let img2 = images.clip(img, 0, 0, 1080, 1200);
    toastLog("OCR开始");
    let list = paddle.ocr(img2);
    toastLog("OCR结束");
    let sign = [];
    let get_all = [];
    for (let obj of list) {
        if (obj.text.indexOf("每日签到") !== -1) {
            sign = [obj.bounds.left, obj.bounds.top];
        }
        if (obj.text.indexOf("全部领取") !== -1) {
            get_all = [obj.bounds.left, obj.bounds.top];
        }
    }
    if (get_all.length > 0) {
        robot.click(get_all[0], get_all[1]);
        toastLog("全部领取");
        sleep(1000);
    }
    if (sign.length > 0) {
        robot.click(sign[0], sign[1]);
        toastLog("签到成功");
        sleep(3000);
    }

    // 关闭应用
    robot.close();
    sleep(500);

    // 锁定
    if (text("屏幕锁定").exists()) {
        widget.clickText("屏幕锁定");
    }
}

module.exports = alipay;
