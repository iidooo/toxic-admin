/**
 * Created by Ethan on 16/6/19.
 */
var t;
function timebegin() {
    t = setTimeout(function() {
        api.hideProgress();
        api.toast({
            msg : "请上传合适的图片(10MB以下)",
            duration : 2000,
            location : 'middle'
        });
    }, 10000);
}

function timeend() {
    clearTimeout(t);
}

apiready = function() {
    if ( typeof ($api.getStorage('sclassification')) == 'undefined') {
        $api.setStorage('sclassification', "");
    }
    if ( typeof ($api.getStorage('sgender')) == 'undefined') {
        $api.setStorage('sgender', "");
    }
    if ( typeof ($api.getStorage('snickname')) == 'undefined') {
        $api.setStorage('snickname', "");
    }
    if ( typeof ($api.getStorage('skeyword')) == 'undefined') {
        $api.setStorage('skeyword', "");
    }
    api.setWinAttr({
        bounces : false
    });
    api.setStatusBarStyle({
        style : 'light'
    });
    //var header = $api.byId('header');
    //适配iOS 7+，Android 4.4+状态栏
    //$api.fixStatusBar(header);
    //var headerPos = $api.offset(header);
    $('#picfile').fileupload({
        dataType : 'json',
        autoUpload : true,
        acceptFileTypes : /(\.|\/)(jpe?g|png)$/i,
        maxNumberOfFiles : 1,
        maxFileSize : 10000000,
        done : function(e, data) {
            timeend();
            api.hideProgress();
            if (data.result.tempPictureUrl == "") {
                api.toast({
                    msg : "请上传合适的图片(10MB以下)",
                    duration : 2000,
                    location : 'middle'
                });
            } else {
                timeend();
                api.openWin({
                    name : 'push',
                    url : 'html/push.html',
                    bounces : false,
                    animation : {
                        type : "movein",
                        subType : "from_bottom",
                        duration : 300
                    },
                    pageParam : {
                        tempPictureUrl : data.result.tempPictureUrl
                    }
                });
            }
        },
        progressall : function(e, data) {
            timeend();
            timebegin();
            var progress = parseInt(data.loaded / data.total * 100, 10);
            api.showProgress({
                style : 'default',
                animationType : 'fade',
                title : '',
                text : progress + '%',
                modal : false
            });
        },
        error : function(e, data) {
            timeend();
            api.hideProgress();
            api.toast({
                msg : "请上传合适的图片(10MB以下)",
                duration : 2000,
                location : 'middle'
            });
        }
    });
    var main = $api.byId('main');
    var mainPos = $api.offset(main);
    api.openFrameGroup({
        name : 'group1',
        background : '#19334c',
        scrollEnabled : false,
        preload : 0,
        rect : {
            x : 0,
            y : 0,
            w : 'auto',
            h : mainPos.h - 40,
            marginLeft : 0,
            marginTop : 0
        },
        index : 0,
        frames : [{
            name : 'frame1',
            url : 'html/main1.html',
            bgColor : '#19334c'
        }, {
            name : 'frame2',
            url : 'html/main2.html',
            bgColor : '#19334c'
        }, {
            name : 'frame4',
            url : 'html/main4.html',
            bgColor : '#19334c'
        }, {
            name : 'frame5',
            url : 'html/main5.html',
            bgColor : '#19334c'
        }]
    }, function(ret, err) {
        var name = ret.name;
        var index = ret.index;
    });
    var obj = api.require('tuberBar');
    $api.setStorage('successindex', 0);
    obj.open({
        selectedIndex : 0,
        h : getTuberBarH(),
        buttons : [{
            frame : {
                w : 40,
                h : 40
            },
            titleSize : 0,
            normal : 'widget://image/letshow/icon/tab1_1.png',
            selected : 'widget://image/letshow/icon/tab1_2.png'
        }, {
            frame : {
                w : 40,
                h : 40
            },
            titleSize : 0,
            normal : 'widget://image/letshow/icon/tab2_1.png',
            selected : 'widget://image/letshow/icon/tab2_2.png'
        }, {
            frame : {
                w : 50,
                h : 50,
                y : 10
            },
            titleSize : 0,
            normal : 'widget://image/letshow/icon/tianjia_icon.png',
            selected : 'widget://image/letshow/icon/tianjia_icon.png'
        }, {
            frame : {
                w : 40,
                h : 40
            },
            titleSize : 0,
            normal : 'widget://image/letshow/icon/tab3_1.png',
            selected : 'widget://image/letshow/icon/tab3_2.png'
        }, {
            frame : {
                w : 40,
                h : 40
            },
            titleSize : 0,
            normal : 'widget://image/letshow/icon/tab4_1.png',
            selected : 'widget://image/letshow/icon/tab4_2.png'
        }],
        bg : "widget://image/letshow/bg/fenlan_img.png"
    }, function(ret, err) {
        var index = ret.index;
        var index2 = index;
        if (index != 2) {
            if (index > 2) {
                if (index == 3) {
                    var loggedin = $api.getStorage('uid');
                    if ( typeof (loggedin) == 'undefined') {
                        obj.setSelected({
                            index : $api.getStorage('successindex')
                        });
                        api.openWin({
                            name : 'login',
                            url : 'html/login.html',
                            animation : {
                                type : "movein",
                                subType : "from_bottom",
                                duration : 300
                            }
                        });
                        return false;
                    }
                }
                index2 = index - 1;
            }
            if (index2 == 2) {
                api.setFrameGroupIndex({
                    name : 'group1',
                    index : index2,
                    scroll : true,
                    reload : true
                });
            } else {
                api.setFrameGroupIndex({
                    name : 'group1',
                    index : index2,
                    scroll : true
                });
            }
            if (index == 0 && $api.getStorage('successindex') == 0) {
                $api.setStorage('sclassification', "");
                $api.setStorage('sgender', "");
                $api.setStorage('snickname', "");
                $api.setStorage('skeyword', "");
                api.execScript({
                    name : 'root',
                    frameName : 'frame1',
                    script : 'api.refreshHeaderLoading()'
                });
            }
        } else {
            var loggedin = $api.getStorage('uid');
            if ( typeof (loggedin) == 'undefined') {
                api.openWin({
                    name : 'login',
                    url : 'html/login.html',
                    animation : {
                        type : "movein",
                        subType : "from_bottom",
                        duration : 300
                    }
                });
            } else {
                $api.byId("picfile").click();
            }
            obj.setSelected({
                index : $api.getStorage('successindex')
            });
        }
        $api.setStorage('successindex', index);
        api.execScript({
            name : 'root',
            frameName : 'frame1',
            script : 'f8()'
        });
        if (index != 4) {
            api.execScript({
                name : 'root',
                frameName : 'frame5',
                script : 'f5()'
            });
        }
    });
};
function drawreddot(pram) {
    var obj = api.require('tuberBar');
    obj.setBadge({
        index : 3,
        badge : pram
    });
}

function blur123() {
    //		var obj = api.require('tuberBar');
    //		obj.setSelected({index : 2});
}

function getTuberBarH() {
    if (browser.versions.ios) {
        return 80;
    } else {
        return 60;
    }
}