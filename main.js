auto.waitFor();
var opendevice = require('./tools/解锁.js')

/*
// 熊猫看书
var pandareader = require('./tools/熊猫看书.js');
var timesetter = setInterval(function () {
    if(opendevice.解锁()){
        pandareader.每日签到()
    }else{
        exit();
    }
}, 3600000);
setTimeout(function () {
    log("结束");
    clearInterval(timesetter);
}, 12000);
*/

/*
// 美团
var mt = require('./tools/美团.js');
console.show();
home();
sleep(1000);
text("美团").click();
sleep(2000);
mt.每日赚钱();
*/

/*
// 支付宝
var alipay = require('./tools/支付宝.js');
sleep(700);
home();
sleep(2000);
className("android.widget.TextView").text("支付宝").findOnce().click()
alipay.会员签到();
*/
