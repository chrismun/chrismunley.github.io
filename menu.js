function getPosition(el) {
    var yPos = 0;
    while (el) {
        if (el.tagName == "BODY") {
            var yScroll = el.scrollTop || document.documentElement.scrollTop;
            yPos += (el.offsetTop - yScroll + el.clientTop);
        } else {
            yPos += (el.offsetTop - el.scrollTop + el.clientTop);
        }
        el = el.offsetParent;
    }
    return yPos;
}

window.addEventListener("load", updatePosition, false);
window.addEventListener("scroll", updatePosition, false);
window.addEventListener("resize", updatePosition, false);

var selected_menu_el = null;

function updatePosition() {
    var closest = 99999;
    var closest_menu_el = null;

    var mi = document.getElementsByClassName("mi");
    for (var i = 0; i < mi.length; i++) {
        var onclick = String(mi[i].onclick);
        var pos = onclick.indexOf("#");
        if (pos === -1)
            continue;

        var sub = onclick.substring(pos, onclick.length);
        var pos2 = sub.indexOf('\'');
        if (pos2 === -1)
            continue;

        var id = sub.substring(1, pos2);
        var element = document.getElementById(id);
        if (element == null)
            continue;

        var element_pos = getPosition(element);
        if (element_pos > mi[i].clientHeight * -1 && element_pos < closest) {
            closest = element_pos;
            closest_menu_el = mi[i];
        }
    }
    if (closest_menu_el != null && closest_menu_el != selected_menu_el) {
        for (var i = 0; i < mi.length; i++) {
            mi[i].className = "mi";
        }
        closest_menu_el.className = "mi selected";
        selected_menu_el = closest_menu_el;
    }
}
