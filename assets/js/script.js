// Corners

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
  tl.style.transform = "rotate(-" + window.pageYOffset / 10 + "deg)";
  tr.style.transform = "rotate(" + window.pageYOffset / 10 + "deg)";
  bl.style.transform = "rotate(" + window.pageYOffset / 10 + "deg)";
  br.style.transform = "rotate(-" + window.pageYOffset / 10 + "deg)";
});

// Flipbook

TweenLite.set(".pageBg", { xPercent: -50, yPercent: -50 });
TweenLite.set(".pageWrapper", { left: "50%", perspective: 1500 });
TweenLite.set(".page", { transformStyle: "preserve-3d" });
TweenLite.set(".back", { rotationY: -180 });
TweenLite.set([".back", ".front"], { backfaceVisibility: "hidden" });

$(".page").click(function () {
  if (pageLocation[this.id] === undefined || pageLocation[this.id] == "right") {
    zi = $(".left").length + 1;
    TweenMax.to($(this), 1, {
      force3D: true,
      rotationY: -180,
      transformOrigin: "0 top",
      className: "+=left",
      z: zi,
      zIndex: zi,
    });
    TweenLite.set($(this), { className: "-=right" });
    pageLocation[this.id] = "left";
  } else {
    zi = $(".right").length + 1;
    TweenMax.to($(this), 1, {
      force3D: true,
      rotationY: 0,
      transformOrigin: "left top",
      className: "+=right",
      z: zi,
      zIndex: zi,
    });
    TweenLite.set($(this), { className: "-=left" });
    pageLocation[this.id] = "right";
  }
});

var pageLocation = [],
  lastPage = null;
zi = 0;

// Scroll

var nav_sections = $("section");
var main_nav = $(".nav-menu");

$(window).on("scroll", function () {
  var cur_pos = $(this).scrollTop() + 200;

  nav_sections.each(function () {
    var top = $(this).offset().top,
      bottom = top + $(this).outerHeight();

    if (cur_pos >= top && cur_pos <= bottom) {
      if (cur_pos <= bottom) {
        main_nav.find("li").removeClass("active");
      }
      main_nav
        .find('a[href="#' + $(this).attr("id") + '"]')
        .parent("li")
        .addClass("active");
    }
    if (cur_pos < 300) {
      $(".nav-menu ul:first li:first").addClass("active");
    }
  });
});

// Golden Ratio

const imgNum = [0, 1, 2, 3, 4, 5, 6, 7];
const imgName = [
  "img_one",
  "img_two",
  "img_three",
  "img_four",
  "img_five",
  "img_six",
  "img_seven",
  "img_eight",
];

imgName.map((data, index) => {
  const value = document.getElementById(data);
  value.setAttribute("src", `assets/media/golden/${imgNum[index]}.jpg`);
});

// change total here

total = 11;
count = 1;

function loopImages() {
  const increase = imgNum.length + count;
  if (increase < total) {
    count = count + 1;
  }

  imgNum.splice(0, 1);
  imgNum.push(increase);

  imgName.map((data, index) => {
    const value = document.getElementById(data);
    value.setAttribute("src", `assets/media/golden/${imgNum[index]}.jpg`);
  });
}

function loopImagesback() {
  if (imgNum[0] !== 0) {
    const appenValue = imgNum[0] - 1;

    imgNum.splice(imgNum.length - 1, 1);
    imgNum.unshift(appenValue);

    imgName.map((data, index) => {
      const value = document.getElementById(data);
      value.setAttribute("src", `assets/media/golden/${imgNum[index]}.jpg`);
    });
  }
}

// Tab Change Message

document.addEventListener("visibilitychange", (event) => {
  if (document.visibilityState === "visible") {
    document.title = "Ryndolf's Portfolio";
  } else {
    document.title = "Wait! There's more";
  }
});
