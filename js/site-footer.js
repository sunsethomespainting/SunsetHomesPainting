/**
 * Shared site footer — consistent NAP, links, dual CTAs.
 */
(function () {
    function linkPrefix() {
        var path = window.location.pathname || '';
        if (path.indexOf('/blog/') !== -1 || path.endsWith('/blog')) return '../';
        return '';
    }

    function buildFooter() {
        var p = linkPrefix();
        return (
            '<footer class="site-footer" role="contentinfo">' +
            '<div class="container">' +
            '<div class="site-footer__cta-bar">' +
            '<a class="btn-footer-call" href="tel:3864053015"><i class="fas fa-phone" aria-hidden="true"></i> Call (386) 405-3015</a>' +
            '<a class="btn-footer-book" href="' + p + 'schedule-appointment.html"><i class="fas fa-calendar-check" aria-hidden="true"></i> Book estimate</a>' +
            '</div>' +
            '<div class="footer-content">' +
            '<div class="footer-section">' +
            '<h4>Sunset Home Painting</h4>' +
            '<p>Family-owned interior and exterior painters based in Saint Augustine, FL 32084, serving homeowners throughout Northeast Florida.</p>' +
            '</div>' +
            '<div class="footer-section">' +
            '<h4>Services</h4>' +
            '<a href="' + p + 'painting-st-augustine.html">Painting St Augustine</a>' +
            '<a href="' + p + 'interior-painting-st-augustine.html">Interior Painting</a>' +
            '<a href="' + p + 'exterior-painting-st-augustine.html">Exterior Painting</a>' +
            '<a href="' + p + 'painting-jacksonville.html">Jacksonville</a>' +
            '<a href="' + p + 'service-areas.html">Service Areas</a>' +
            '<a href="' + p + 'faq.html">FAQ</a>' +
            '<a href="' + p + 'blog/index.html">Blog</a>' +
            '</div>' +
            '<div class="footer-section">' +
            '<h4>Contact</h4>' +
            '<p><i class="fas fa-phone" aria-hidden="true"></i> <a href="tel:3864053015">(386) 405-3015</a></p>' +
            '<p><i class="fas fa-envelope" aria-hidden="true"></i> <a href="mailto:Office@teamnlwealthbuilders.com">Office@teamnlwealthbuilders.com</a></p>' +
            '<p><i class="fas fa-map-marker-alt" aria-hidden="true"></i> Saint Augustine, FL 32084</p>' +
            '</div>' +
            '<div class="footer-section">' +
            '<h4>Follow Us</h4>' +
            '<div class="social-links">' +
            '<a href="https://www.facebook.com/share/19x4X4LCrX/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i class="fab fa-facebook"></i></a>' +
            '</div></div></div>' +
            '<div class="footer-bottom"><p>&copy; 2026 Sunset Home Painting. All rights reserved.</p></div>' +
            '</div></footer>'
        );
    }

    function mount() {
        var el = document.getElementById('site-footer-mount');
        if (!el) return;
        el.outerHTML = buildFooter();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', mount);
    } else {
        mount();
    }
})();
