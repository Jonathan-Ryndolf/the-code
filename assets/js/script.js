window.onscroll = function () {
  var theta = (document.documentElement.scrollTop / 50) % Math.PI;

  document.getElementById("js-logo").style.transform =
    "rotate(" + theta + "rad)";
};
