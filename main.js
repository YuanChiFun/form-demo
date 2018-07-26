var Pname = document.getElementById("pName");
var Ipwd = document.getElementById("Ipwd");
var Rpwd = document.getElementById("Rpwd");
var name_msg = document.getElementById("Name");
var Ipwd_msg = document.getElementById("ipwd");
var Rpwd_msg = document.getElementById("rpwd");
var complex = document.getElementsByClassName("complex");
var re = /[^\w\u4e00-\u9fa5]/g;
var count = 0;
var num = 0;

function getNameLength(str) {
    return str.replace(/[^\x00-\xff]/g, "xx").length;
};

function isAllNum(str, n) {
    for (var i = 0; i < str.length; i++) {
        if (str.charAt(i) == n) {
            num++;
        }
    }
    return num;
}
console.log(typeof(Pname));
Pname.onfocus = function() {
    name_msg.innerHTML = '<img src="light.png">5-25个字符，推荐使用中文名';
}
Pname.onblur = function() {
    var len = getNameLength(Pname.value);
    if (len > 25) {
        name_msg.innerHTML = "<img src='error.png'>超过25字符"
    } else if (len < 6 && len > 0) {
        name_msg.innerHTML = "<img src = 'error.png'>少于6字符"
    } else if (re.test(this.value)) {
        name_msg.innerHTML = "<img src = 'error.png'>含有非法字符"
    } else if (len == 0) {
        name_msg.innerHTML = "<img src = 'light.png'>5-25个字符，推荐使用中文名"
    } else {
        name_msg.innerHTML = "<img src = 'ok.png'>"
    }
}
Ipwd.onfocus = function() {
    if (getNameLength(Pname.value) == 0) {
        name_msg.innerHTML = "<img src = 'error.png'>请输入用户名"
    }
    Ipwd_msg.innerHTML = "<img src='light.png'>6-16位字符，可以使用数字，字母，符号"

}
Ipwd.onkeyup = function() {
    if (this.value.length > 5 && this.value.length < 10) {
        complex[1].style.opacity = 0.5;
        complex[2].style.opacity = 0.5;
    }
    if (this.value.length > 10 && this.value.length < 14) {
        complex[2].style.opacity = 0.5;
    }
    if (this.value.length > 5) {
        complex[0].style.opacity = 1;
        Rpwd.removeAttribute("disabled");
    }
    if (this.value.length > 10) {
        complex[1].style.opacity = 1;
    }
    if (this.value.length > 14) {
        complex[2].style.opacity = 1;
    }
    if (this.value.length < 6 && count > 6) {
        complex[0].style.opacity = 0.5;
        complex[1].style.opacity = 0.5;
        complex[2].style.opacity = 0.5;
        Rpwd.setAttribute("disabled", "true");
    }
    count++;
}
Ipwd.onblur = function() {
    var tmp = isAllNum(Ipwd.value, Ipwd.value[0]);
    if (this.value.length > 16) {
        Ipwd_msg.innerHTML = "<img src='error.png'>密码太长";
        Rpwd.setAttribute("disabled", "true");
    } else if (this.value.length == 0) {
        Ipwd_msg.innerHTML = "<img src='error.png'>密码不能为空";
        Rpwd.setAttribute("disabled", "true");
    } else if (tmp == this.value.length) {
        Ipwd_msg.innerHTML = "<img src='error.png'>密码过于简单";
        Rpwd.setAttribute("disabled", "true");
    } else if (/[^\d]/g.test(Rpwd.value)) {
        Ipwd_msg.innerHTML = "<img src='error.png'>密码过于简单";
        Rpwd.setAttribute("disabled", "true");
    } else if (/[^a-zA-Z]/g.test(Rpwd.value)) {
        Ipwd_msg.innerHTML = "<img src='error.png'>密码过于简单";
        Rpwd.setAttribute("disabled", "true");
    } else {
        Ipwd_msg.innerHTML = "<img src='ok.png'>";
    }
}

Rpwd.onblur = function() {
    if (Rpwd.value != Ipwd.value) {
        Rpwd_msg.innerHTML = "<img src='error.png'>两次输入的密码不一致";
    } else {
        Rpwd_msg.innerHTML = "<img src='ok.png'>";
    }
}