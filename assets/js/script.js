(function () {
  var throttle = function (type, name, obj) {
    var obj = obj || window;
    var running = false;
    var func = function () {
      if (running) {
        return;
      }
      running = true;
      requestAnimationFrame(function () {
        obj.dispatchEvent(new CustomEvent(name));
        running = false;
      });
    };
    obj.addEventListener(type, func);
  };
  throttle("scroll", "optimizedScroll");
})();

var tl = document.getElementById("tl"),
  tr = document.getElementById("tr"),
  bl = document.getElementById("bl"),
  br = document.getElementById("br");

// to use the script *without* anti-jank, set the event to "scroll" and remove the anonymous function.

window.addEventListener("optimizedScroll", function () {
  tl.style.transform = "rotate(" + window.pageYOffset / 10 + "deg)";
  tr.style.transform = "rotate(" + window.pageYOffset / 10 + "deg)";
  bl.style.transform = "rotate(" + window.pageYOffset / 10 + "deg)";
  br.style.transform = "rotate(-" + window.pageYOffset / 10 + "deg)";
});

$(document).ready(function () {
  function changeDot() {
    var scrollTop = $("html, body").scrollTop(),
      section = $(".main-sec");

    section.each(function (i, elem) {
      var that = $(elem),
        sectionScroll = that.offset().top,
        sectionHeigth = that.outerHeight(),
        distance = sectionScroll - scrollTop,
        procent = (-distance * 100) / sectionHeigth;

      if (procent >= -10 && procent <= 90) {
        var dots = $(".dot");
        var dotsEq = dots.eq(i);

        dotsEq.prev().removeClass("active");
        dotsEq.next().removeClass("active");
        dotsEq.addClass("active");
      }
    }); //.each
  } //.fn

  $(document).on("scroll", changeDot);
});
