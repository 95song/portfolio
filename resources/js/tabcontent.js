(function() {
    var g = function(a) {
        if (a && a.stopPropagation) a.stopPropagation();
        else window.event.cancelBubble = true;
        var b = a ? a : window.event;
        b.preventDefault && b.preventDefault();
    };
    var d = function(a, c, b) {
        if (a.addEventListener) a.addEventListener(c, b, false);
        else a.attachEvent && a.attachEvent("on" + c, b);
    };
    var a = function(c, a) {
        var b = new RegExp("(^| )" + a + "( |$)");
        return b.test(c.className) ? true : false;
    };
    var j = function(b, c) {
        if (!a(b, c))
            if (b.className == "") b.className = c;
            else b.className += " " + c;
    };
    var h = function(a, b) {
        var c = new RegExp("(^| )" + b + "( |$)");
        a.className = a.className.replace(c, "$1");
        a.className = a.className.replace(/ $/, "");
    };

    var b = function(b, a) {
        this.g(b, a);
    };
    b.prototype = {
        j: function(b) {
            var c = document.getElementById(b.TargetId);
            if (!c) return;
            this.l(c);
            for (var a = 0; a < this.b.length; a++) {
                if (this.b[a] == b) j(b.parentNode, "selected");
                else h(this.b[a].parentNode, "selected");
            }
        },
        l: function(b) {
            for (var a = 0; a < this.c.length; a++) this.c[a].style.display = this.c[a].id == b.id ? "block" : "none";
        },
        m: function() {
            this.c = [];
            for (var c = this, a = 0; a < this.b.length; a++) {
                var b = document.getElementById(this.b[a].TargetId);
                if (b) {
                    this.c.push(b);
                    d(this.b[a], "click", function(b) {
                        var a = this;
                        if (a === window) a = window.event.srcElement;
                        c.j(a);
                        g(b);
                        return false;
                    });
                }
            }
        },
        g: function(f) {
            this.b = [];
            for (var e = f.getElementsByTagName("a"), i = /#([^?]+)/, a, b, c = 0; c < e.length; c++) {
                b = e[c];
                a = b.getAttribute("href");
                if (a.indexOf("#") == -1) continue;
                var d = a.match(i);
                if (d) {
                    a = d[1];
                    b.TargetId = a;
                    this.b.push(b);
                }
            }
            this.m();
            this.j(this.b[0]); // 첫 번째 탭을 항상 선택하도록 설정
        }
    };

    var k = [],
        i = function(e) {
            var b = false;
            function a() {
                if (b) return;
                b = true;
                setTimeout(e, 4);
            }
            if (document.addEventListener) document.addEventListener("DOMContentLoaded", a, false);
            else if (document.attachEvent) {
                try {
                    var f = window.frameElement != null;
                } catch (g) {}
                if (document.documentElement.doScroll && !f) {
                    function c() {
                        if (b) return;
                        try {
                            document.documentElement.doScroll("left");
                            a();
                        } catch (d) {
                            setTimeout(c, 10);
                        }
                    }
                    c();
                }
                document.attachEvent("onreadystatechange", function() {
                    document.readyState === "complete" && a();
                });
            }
            d(window, "load", a);
        };

    var f = function() {
        for (var d = document.getElementsByTagName("ul"), c = 0, e = d.length; c < e; c++) {
            if (a(d[c], "tabs2")) k.push(new b(d[c], c));
        }
    };
    i(f);
})();