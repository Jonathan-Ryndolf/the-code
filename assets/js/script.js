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

!(function ($) {
  "use strict";

  // Smooth scroll for the navigation menu and links with .scrollto classes
  var scrolltoOffset = $("#header").outerHeight() - 17;
  $(document).on(
    "click",
    ".nav-menu a, .mobile-nav a, .scrollto",
    function (e) {
      if (
        location.pathname.replace(/^\//, "") ==
          this.pathname.replace(/^\//, "") &&
        location.hostname == this.hostname
      ) {
        var target = $(this.hash);
        if (target.length) {
          e.preventDefault();

          var scrollto = target.offset().top - scrolltoOffset;

          if ($(this).attr("href") == "#header") {
            scrollto = 0;
          }

          $("html, body").animate(
            {
              scrollTop: scrollto,
            },
            1500,
            "easeInOutExpo"
          );

          if ($(this).parents(".nav-menu, .mobile-nav").length) {
            $(".nav-menu .active, .mobile-nav .active").removeClass("active");
            $(this).closest("li").addClass("active");
          }

          if ($("body").hasClass("mobile-nav-active")) {
            $("body").removeClass("mobile-nav-active");
            $(".mobile-nav-toggle i").toggleClass(
              "icofont-navigation-menu icofont-close"
            );
            $(".mobile-nav-overly").fadeOut();
          }
          return false;
        }
      }
    }
  );

  // Activate smooth scroll on page load with hash links in the url
  $(document).ready(function () {
    if (window.location.hash) {
      var initial_nav = window.location.hash;
      if ($(initial_nav).length) {
        var scrollto = $(initial_nav).offset().top - scrolltoOffset;
        $("html, body").animate(
          {
            scrollTop: scrollto,
          },
          1500,
          "easeInOutExpo"
        );
      }
    }
  });

  // Navigation active state on scroll
  var nav_sections = $("section");
  var main_nav = $(".nav-menu, #mobile-nav");

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
})(jQuery);
