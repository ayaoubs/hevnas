// Heavna — interactions légères

document.addEventListener("DOMContentLoaded", function () {
    var navLinks = Array.prototype.slice.call(document.querySelectorAll("nav.links a"));
    var sections = navLinks
        .map(function (link) {
            var id = link.getAttribute("href").replace("#", "");
            return document.getElementById(id);
        })
        .filter(Boolean);

    if (!sections.length || !("IntersectionObserver" in window)) return;

    var setActive = function (id) {
        navLinks.forEach(function (link) {
            var isActive = link.getAttribute("href") === "#" + id;
            link.style.color = isActive ? "var(--copper-glow)" : "";
            link.style.borderBottomColor = isActive ? "var(--copper-bright)" : "";
        });
    };

    var observer = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    setActive(entry.target.id);
                }
            });
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach(function (section) {
        observer.observe(section);
    });
});