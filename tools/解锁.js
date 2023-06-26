auto.waitFor();
var opendevice = {}
opendevice.解锁 = function () {
    if (!device.isScreenOn()) {
        device.wakeUp();
        sleep(1500);
        swipe(device.width / 2, device.height / 4 * 3, device.width / 2, device.height / 4, 600);
        sleep(1500);
        //可根据自己实际情况设置解锁密码
        //gesture(2000, [x1, y1], [x2, y2], ...);
        sleep(2000);
        return true;
    }else{
        var task = confirm("是否现在执行定时任务?");
        if(task){
            toast("执行成功!");
            return true;
        }
        return false;
    }
}

module.exports = opendevice;
