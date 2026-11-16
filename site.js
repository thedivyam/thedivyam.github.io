(function () {
  var header = document.querySelector(".nav");
  var clock = document.querySelector("[data-clock]");
  var links = Array.prototype.slice.call(
    document.querySelectorAll('.nav nav a[href^="#"]')
  );

  function paintClock() {
    if (!clock) return;
    var now = new Date();
    var time = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    }).format(now);
    clock.textContent = time;
    clock.setAttribute("datetime", now.toISOString());
  }

  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }

  paintClock();
  onScroll();
  window.setInterval(paintClock, 30000);
  window.addEventListener("scroll", onScroll, { passive: true });

  if (!("IntersectionObserver" in window) || links.length === 0) return;

  var sections = links
    .map(function (link) {
      return document.querySelector(link.getAttribute("href"));
    })
    .filter(Boolean);

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.id;
        links.forEach(function (link) {
          if (link.getAttribute("href") === "#" + id) {
            link.setAttribute("aria-current", "true");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      });
    },
    { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
  );

  sections.forEach(function (section) {
    observer.observe(section);
  });
})();
