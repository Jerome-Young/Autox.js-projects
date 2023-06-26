auto.waitFor();
let Robot = require("../lib/Robot.js");
let WidgetAutomator = require("../lib/WidgetAutomator.js");
let robot = new Robot();
let widget = new WidgetAutomator(robot);
var mt = {}

// 滑动屏幕
function my_swipe(down) {
    if (undefined == down)
        swipe(device.width / 2, device.height * 0.8, device.width / 2, device.height * 0.3, 500);
    else
        swipe(device.width / 2, device.height * 0.4, device.width / 2, device.height * 0.9, 500);
}

// 多次返回
function reback(){
    if(text("明天再来").exists()){
        widget.clickCenterText("明天再来");
        console.log("明天再来");
    }
    if(text("0636b0d3cec2fd64eb0624f8e9a8f1783163").exists())
        widget.clickCenterText("0636b0d3cec2fd64eb0624f8e9a8f1783163");
    if(id("capsule_quit_icon").exists()){
        widget.clickCenterId("capsule_quit_icon");
        console.log("游戏返回");
    }
    if(text("笔笔返").exists()){
        console.log("笔笔返");
        var cancel = className("android.view.View").depth("17").drawingOrder("0").findOnce(0)
        if(cancel)cancel.click();
        sleep(1500);
        if(id("yf-slide").exists())id("yf-slide").child(0).click();
        sleep(1500);
        back();
    }
    if(text("我知道了").exists()){
        widget.clickCenterText("我知道了");
        console.log("我知道了");
    }
    if(desc("返回").exists()){
        widget.clickCenterDesc("返回");
        console.log("desc返回");
    }
    if(id("com.sankuai.meituan:id/iv_close").exists()){
        console.log("小说");
        widget.clickCenterId("com.sankuai.meituan:id/iv_close");
        sleep(1305);
        if(text("放弃提现").exists()){
            widget.clickCenterText("放弃提现");
            sleep(1550);
        }
        if(text("下次再说").exists()){
            widget.clickCenterText("下次再说");
            sleep(2050);
        }
        back();
        sleep(1000);
        if(text("我知道了").exists())widget.clickCenterText("我知道了");
    }
    if(id("com.sankuai.meituan:id/msc_title_container").exists())
        widget.clickCenterId("com.sankuai.meituan:id/msc_title_container");
}

// 检查是否存在
function view_exist(title){
    if (desc(title).exists()){
        widget.clickCenterDesc(title);
    }else{
        log("请添加%s小程序", title);
        exit();
    }
    sleep(10000);
}
// 请求截屏
function capture_screen(){
    threads.start(function(){
        while(true){
            if(text("允许").findOnce()){
                text("允许").findOnce().click();
                break
            }else{
                sleep(1000);
            }
        }
    })
    if (!requestScreenCapture()) {
        toast("请求截图失败");
        exit();
    }
}
// 查找颜色
function get_color(img, x, y){
    var color = images.pixel(img, x, y);
    var strcolor = colors.toString(color);
    console.log("%s", strcolor);
}

// 每日赚钱
mt.每日赚钱 = function(){
    view_exist("每日赚钱");
    // 签到
    if(text("立即领现金").exists()){
        widget.clickCenterText("立即领现金");
        sleep(4945);
    }
    // 领红包
    click(1000, 1449);
    sleep(5086);
    while(true){
        if(text("领奖").exists()){
            widget.clickCenterText("领奖");
            sleep(904);
        }
        if(text("去浏览").indexInParent("2").exists()){
            widget.clickCenterText("去浏览");
            sleep(25000);
            my_swipe("up");
            my_swipe("up");
            sleep(1000);
            click(1000, 1449);
            sleep(1000);
        }else
            if(text("去浏览").indexInParent("11").exists()){
                widget.clickCenterText("去浏览");
                sleep(20000);
                if(text("笔笔返").exists()){
                    reback();
                }else{
                    back();
                    sleep(1000);
                    reback();
                }
                sleep(3000);
                click(1000, 1449);
                sleep(1000);                        
            }else{
                click(1099,888);
                sleep(953);
                break;
            }
        sleep(2000);
    }
    console.log("红包已全部领取");
    while(true){
        if(text("剩余红包：0个").exists())break;
        if(text("抽奖").exists()){
            widget.clickCenterText("抽奖");
            console.log("抽奖");
        }else{
            widget.clickCenterText("翻红包领现金");
            console.log("翻红包");
        }
        sleep(5000);
        if(text("立即抽奖").exists()){
            console.log("开始抽奖");
            widget.clickCenterText("立即抽奖");
            sleep(8000);
            if (text("继续抽奖").exists()){
                widget.clickCenterText("继续抽奖");
                sleep(2000);
            }
            click(1070,385); //关闭
            console.log("关闭抽奖页面");
        }else{
            if(text("下1单返9个红包限活动页下单有效").exists()){
                back();
                break;
            }else{
                var contin = text("收下继续翻").findOne(5000);
                if(contin){
                    contin.click();
                    console.log("继续翻");
                }else{
                    exit();
                }
            }
        }
        sleep(3000);
    }
    console.log("每日赚钱任务完成");
    back();
}

mt.免费水果 = function(){
//function 免费水果(){
    capture_screen();
    home();
    sleep(1000);
    className("android.widget.LinearLayout").descStartsWith("工具").findOne(5000).click();
    className("android.widget.TextView").text("美团").findOne(5000).click();
    sleep(2000);
    view_exist("免费水果");
    // sleep(5000);
    // var screen = null;
    // var point = null;
    click(133, 2114);
    sleep(3000);
    // 基于颜色操作
    while(true){
        var screen = images.captureScreen()
        sleep(1000);
        // 领取水滴
        var point = findMultiColors(screen, "#ffffff", [[-75, 11, "#fd6600"], [33, 14, "#fe6800"]], 
            {region: [882, 889], threshold: 1});
        if(point){
            press(point.x, point.y, 66);
            press(point.x, point.y, 100);
            sleep(8000);
            console.log("领取成功");
        }else{
            console.log("没有可领取的水滴");
        }
        // 去浏览
        // get_color(screen, 999, 1648);
        point = findMultiColors(screen, "#a3e4bf", [[81, 36, "#3bca72"], [-50, 36, "#3bca74"]], 
            {region: [882, 889], threshold: 1});
        if(point){
            press(point.x, point.y, 70);
            press(point.x, point.y, 96);
            sleep(20000);
            if(id("mmp-div-container").exists()){
                robot.clickCenter(id("mmp-div-container").child(2).child(0).child(0).findOnce());
                sleep(1500);
            }
            back();
            sleep(2000);
            reback();
            console.log("浏览完成");
        }else{
            console.log("已全部浏览完成");
            break;
        }
        // 继续浏览
        point = findMultiColors(screen, "#ffffff", [[35, 117, "#fcd300"], [148, -8, "#33c56f"]], 
            {region: [751, 1560, 248, 105]});
        if(point){
            press(point.x, point.y, 87);
            press(point.x, point.y, 99);
            sleep(10000);
            back();
        }else{
            console.log("继续浏览完成");
        }
        
    }
}

//免费水果();
module.exports = mt;

// // 关闭应用
// robot.close();
// sleep(500);

// // 锁定
// if (text("屏幕锁定").exists()) {
//     widget.clickText("屏幕锁定");
// }