/**
 * Shared site header — call bar + navigation (v20). Dual CTAs.
 * Tabs: Home, About, Services, Gallery, Blog, Schedule, Contact
 */
(function () {
    var NAV_ITEMS = [
        { href: 'index.html', label: 'Home', id: 'home' },
        { href: 'about.html', label: 'About', id: 'about' },
        { href: 'services.html', label: 'Services', id: 'services' },
        { href: 'gallery.html', label: 'Gallery', id: 'gallery' },
        { href: 'blog/index.html', label: 'Blog', id: 'blog' },
        { href: 'schedule-appointment.html', label: 'Schedule', id: 'schedule' },
        { href: 'contact.html', label: 'Contact', id: 'contact' }
    ];

    var PAGE_MAP = {
        'index.html': 'home',
        '': 'home',
        'about.html': 'about',
        'services.html': 'services',
        'painting-st-augustine.html': 'services',
        'interior-painting-st-augustine.html': 'services',
        'exterior-painting-st-augustine.html': 'services',
        'painting-jacksonville.html': 'services',
        'service-areas.html': 'services',
        'faq.html': 'services',
        'gallery.html': 'gallery',
        'schedule-appointment.html': 'schedule',
        'contact.html': 'contact'
    };

    function linkPrefix() {
        var path = window.location.pathname || '';
        if (path.indexOf('/blog/') !== -1 || path.endsWith('/blog')) {
            return '../';
        }
        return '';
    }

    function currentPageId() {
        var path = window.location.pathname || '';
        if (path.indexOf('/blog/') !== -1 || path.endsWith('/blog')) {
            return 'blog';
        }
        var file = path.split('/').pop() || 'index.html';
        return PAGE_MAP[file] || 'home';
    }

    function buildNav() {
        var pre = linkPrefix();
        var activeId = currentPageId();
        var links = NAV_ITEMS.map(function (item) {
            var isActive = item.id === activeId;
            var cls = 'nav-link' + (isActive ? ' active' : '');
            var cur = isActive ? ' aria-current="page"' : '';
            return '<li class="nav-item"><a class="' + cls + '" href="' + pre + item.href + '"' + cur + '>' + item.label + '</a></li>';
        }).join('\n                    ');

        return (
            '<header class="site-header fixed-top" id="site-header">' +
            '<div class="site-call-banner" aria-label="Call us now for a free estimate">' +
            '<div class="container site-call-banner__inner">' +
            '<span class="site-call-banner__label">Call Us Now for a Free Estimate</span>' +
            '<div class="site-call-banner__phones">' +
            '<a href="tel:3864053015" class="site-call-banner__link">(386) 405-3015</a>' +
            '</div></div></div>' +
            '<nav class="navbar navbar-expand-lg navbar-dark" id="site-navbar">' +
            '<div class="container">' +
            '<a class="navbar-brand" href="' + pre + 'index.html" aria-label="Sunset Home Painting Home">' +
            '<img src="' + pre + 'images/logo.png" alt="Sunset Home Painting" class="logo-img">' +
            '<span>Sunset Home Painting</span></a>' +
            '<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#siteNavbarCollapse" ' +
            'aria-controls="siteNavbarCollapse" aria-expanded="false" aria-label="Toggle navigation">' +
            '<span class="navbar-toggler-icon"></span></button>' +
            '<div class="collapse navbar-collapse" id="siteNavbarCollapse">' +
            '<ul class="navbar-nav ms-auto site-nav-list">' + links + '</ul>' +
            '<div class="nav-cta-cluster">' +
            '<a class="nav-cta nav-cta--call" href="tel:3864053015"><i class="fas fa-phone" aria-hidden="true"></i><span>Call</span></a>' +
            '<a class="nav-cta nav-cta--book" href="' + pre + 'schedule-appointment.html"><i class="fas fa-calendar-check" aria-hidden="true"></i><span>Book estimate</span></a>' +
            '</div>' +
            '</div></div></nav></header>'
        );
    }

    function syncHeaderOffset() {
        var header = document.getElementById('site-header');
        if (!header) {
            return;
        }
        document.documentElement.style.setProperty(
            '--site-header-height',
            header.offsetHeight + 'px'
        );
    }

    function mount() {
        var mountEl = document.getElementById('site-nav-mount');
        if (!mountEl) {
            return;
        }
        mountEl.outerHTML = buildNav();
        document.body.classList.add('has-site-header');
        // Close menu on navigate (mobile)
        document.querySelectorAll('#siteNavbarCollapse .nav-link, #siteNavbarCollapse .nav-cta').forEach(function (a) {
            a.addEventListener('click', function () {
                var col = document.getElementById('siteNavbarCollapse');
                if (col && col.classList.contains('show') && window.bootstrap) {
                    var inst = bootstrap.Collapse.getInstance(col);
                    if (inst) inst.hide();
                }
            });
        });
        // Mobile action bar
        if (!document.querySelector('.mobile-action-bar') && window.matchMedia('(max-width: 991.98px)').matches) {
            var pre = (function(){ var path = window.location.pathname||''; return (path.indexOf('/blog/')!==-1||path.endsWith('/blog'))?'../':''; })();
            var bar = document.createElement('div');
            bar.className = 'mobile-action-bar';
            bar.innerHTML = '<a class="mobile-action-bar__call" href="tel:3864053015"><i class="fas fa-phone" aria-hidden="true"></i> Call</a>'
                + '<a class="mobile-action-bar__book" href="' + pre + 'schedule-appointment.html"><i class="fas fa-calendar-check" aria-hidden="true"></i> Free estimate</a>';
            document.body.appendChild(bar);
            document.body.classList.add('has-mobile-action-bar');
            document.querySelectorAll('input, textarea, select').forEach(function (el) {
                el.addEventListener('focus', function () { document.body.classList.add('form-focus'); });
                el.addEventListener('blur', function () { document.body.classList.remove('form-focus'); });
            });
        }

        syncHeaderOffset();
        window.addEventListener('resize', syncHeaderOffset);
        window.addEventListener('load', syncHeaderOffset);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', mount);
    } else {
        mount();
    }
})();
