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
  tl.style.transform = "rotate(" + window.pageYOffset + "deg)";
  tr.style.transform = "rotate(" + window.pageYOffset + "deg)";
  bl.style.transform = "rotate(" + window.pageYOffset + "deg)";
  br.style.transform = "rotate(" + window.pageYOffset + "deg)";
});
