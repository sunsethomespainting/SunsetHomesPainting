// Sunset Homes Painting - Main JavaScript

// Gallery Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize gallery modals
    initGalleryModals();

    // Contact / estimate forms (FormSubmit)
    initSunsetForms();

    // Homepage hero image slideshow
    initHomeHeroSlideshow();

    // Site-wide sticky CTA (opens estimate modal with copyable phone)
    initStickyEstimateModal();
});

// Homepage hero slideshow (22/23 + 24/25 before/after first)
function initHomeHeroSlideshow() {
    const root = document.querySelector('.home-hero-slideshow');
    if (!root) return;

    const track = root.querySelector('.home-hero-slideshow-track');
    const slides = root.querySelectorAll('.home-hero-slide');
    const prevBtn = root.querySelector('[data-slide-dir="prev"]');
    const nextBtn = root.querySelector('[data-slide-dir="next"]');
    if (!track || slides.length === 0) return;

    let index = 0;
    let timer = null;
    const intervalMs = parseInt(root.getAttribute('data-autoplay-ms'), 10) || 3000;
    const hoverZone = root.closest('.home-image-section') || root;

    function isHoverPaused() {
        return hoverZone.matches(':hover');
    }

    function goTo(nextIndex) {
        index = ((nextIndex % slides.length) + slides.length) % slides.length;
        track.style.transform = 'translateX(-' + (index * 100) + '%)';
        slides.forEach(function(slide, i) {
            slide.setAttribute('aria-hidden', i === index ? 'false' : 'true');
        });
    }

    function next() {
        goTo(index + 1);
    }

    function prev() {
        goTo(index - 1);
    }

    function startAutoplay() {
        stopAutoplay();
        timer = setInterval(next, intervalMs);
    }

    function stopAutoplay() {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
    }

    function restartAutoplay() {
        stopAutoplay();
        if (!isHoverPaused()) {
            startAutoplay();
        }
    }

    function pauseForHover() {
        stopAutoplay();
    }

    function resumeAfterHover() {
        if (!isHoverPaused()) {
            startAutoplay();
        }
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            prev();
            restartAutoplay();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            next();
            restartAutoplay();
        });
    }

    hoverZone.addEventListener('mouseenter', pauseForHover);
    hoverZone.addEventListener('mouseleave', resumeAfterHover);
    root.addEventListener('focusin', pauseForHover);
    root.addEventListener('focusout', function(e) {
        if (!root.contains(e.relatedTarget) && !isHoverPaused()) {
            startAutoplay();
        }
    });

    goTo(0);
    startAutoplay();
}

function imagePathPrefix() {
    var path = window.location.pathname || '';
    if (path.indexOf('/blog/') !== -1 || path.endsWith('/blog')) {
        return '../images/';
    }
    return 'images/';
}

function initStickyEstimateModal() {
    const btn = document.querySelector('.sticky-cta-button');
    if (!btn) return;

    btn.setAttribute('href', '#');
    btn.setAttribute('role', 'button');
    btn.setAttribute('aria-haspopup', 'dialog');
    btn.setAttribute('aria-label', 'Call for free estimate — view photos and copy office phone number');

    const span = btn.querySelector('span');
    if (span) {
        span.textContent = 'Call for Free Estimate Now';
    }

    const icon = btn.querySelector('i');
    if (icon) {
        icon.className = 'fas fa-phone';
    }

    btn.addEventListener('click', function (e) {
        e.preventDefault();
        openEstimateCallModal();
    });
}

function openEstimateCallModal() {
    const pre = imagePathPrefix();
    const phoneFormatted = '(386) 405-3015';
    const email = 'goode434@gmail.com';

    const modalHTML =
        '<div class="modal fade estimate-call-modal" id="estimateCallModal" tabindex="-1" aria-labelledby="estimateCallModalLabel" aria-hidden="true">' +
        '  <div class="modal-dialog modal-dialog-centered modal-lg">' +
        '    <div class="modal-content">' +
        '      <div class="modal-header">' +
        '        <h5 class="modal-title" id="estimateCallModalLabel">Free Exterior Painting Estimate</h5>' +
        '        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>' +
        '      </div>' +
        '      <div class="modal-body">' +
        '        <div class="blog-before-after" role="group" aria-label="Before and after exterior painting in St Augustine">' +
        '          <figure><img src="' + pre + '22.jpeg" alt="Before exterior painting St Augustine FL" width="600" height="800" loading="lazy"><figcaption>Before</figcaption></figure>' +
        '          <figure><img src="' + pre + '23.jpeg" alt="After exterior painting St Augustine FL" width="600" height="800" loading="lazy"><figcaption>After</figcaption></figure>' +
        '        </div>' +
        '        <p class="estimate-call-modal-lead">Ready for results like this? Copy our number and call Alex, our office manager, for a free estimate.</p>' +
        '        <p class="estimate-call-modal-number" id="estimateCallPhoneDisplay">' + phoneFormatted + '</p>' +
        '        <div class="estimate-call-modal-actions">' +
        '          <button type="button" class="estimate-call-copy-btn estimate-call-copy-btn--block" data-copy="' + phoneFormatted + '">Call Alex, our office manager now!</button>' +
        '        </div>' +
        '        <p class="estimate-call-modal-divider" aria-hidden="true">or</p>' +
        '        <p class="estimate-call-modal-lead">Would you rather email us? Send us details about your project to <strong>' + email + '</strong> and we\'ll reply with a free estimate!</p>' +
        '        <div class="estimate-call-contact-row">' +
        '          <p class="estimate-call-modal-number estimate-call-modal-email" id="estimateCallEmailDisplay">' + email + '</p>' +
        '          <button type="button" class="estimate-call-copy-btn estimate-call-copy-btn--inline" data-copy="' + email + '" aria-label="Copy email address">Copy</button>' +
        '        </div>' +
        '        <p class="estimate-call-copy-feedback" id="estimateCallCopyFeedback" role="status" aria-live="polite"></p>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>';

    const existingModal = document.getElementById('estimateCallModal');
    if (existingModal) {
        existingModal.remove();
    }

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const modalElement = document.getElementById('estimateCallModal');
    const feedback = document.getElementById('estimateCallCopyFeedback');

    modalElement.querySelectorAll('.estimate-call-copy-btn').forEach(function (copyBtn) {
        copyBtn.addEventListener('click', function () {
            const fallbackId = copyBtn.classList.contains('estimate-call-copy-btn--inline')
                ? 'estimateCallEmailDisplay'
                : 'estimateCallPhoneDisplay';
            copyToClipboard(copyBtn.getAttribute('data-copy'), feedback, fallbackId);
        });
    });

    const modal = new bootstrap.Modal(modalElement);
    modal.show();

    modalElement.addEventListener('hidden.bs.modal', function () {
        modalElement.remove();
    });
}

function copyToClipboard(text, feedbackEl, fallbackDisplayId) {
    function showSuccess() {
        if (feedbackEl) {
            feedbackEl.textContent = 'Copied to clipboard!';
        }
    }

    function showError() {
        if (feedbackEl) {
            feedbackEl.textContent = 'Select and copy the text above.';
        }
        const display = fallbackDisplayId ? document.getElementById(fallbackDisplayId) : null;
        if (display) {
            const range = document.createRange();
            range.selectNodeContents(display);
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(showSuccess).catch(showError);
        return;
    }

    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    try {
        document.execCommand('copy');
        showSuccess();
    } catch (err) {
        showError();
    }
    document.body.removeChild(textarea);
}

// Gallery Modal Functions
function initGalleryModals() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        // Click handler
        item.addEventListener('click', function() {
            openGalleryModal(this);
        });
        
        // Keyboard handler for accessibility (Enter and Space keys)
        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openGalleryModal(this);
            }
        });
    });
}

function openGalleryModal(item) {
    const img = item.querySelector('img');
    const caption = item.querySelector('.gallery-caption');
    
    if (img && caption) {
        openImageModal(img.src, img.alt, caption.textContent);
    }
}

function openImageModal(imageSrc, imageAlt, caption) {
    // Create modal HTML
    const modalHTML = `
        <div class="modal fade" id="imageModal" tabindex="-1" aria-labelledby="imageModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="imageModalLabel">${caption}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <img src="${imageSrc}" alt="${imageAlt}" class="img-fluid">
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal if any
    const existingModal = document.getElementById('imageModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Initialize and show Bootstrap modal
    const modalElement = document.getElementById('imageModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
    
    // Clean up modal when hidden
    modalElement.addEventListener('hidden.bs.modal', function() {
        modalElement.remove();
    });
}

// Form Validation + FormSubmit submit
function initSunsetForms() {
    document.querySelectorAll('form.js-sunset-form').forEach(function (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            submitSunsetForm(form);
        });

        form.querySelectorAll('input, textarea, select').forEach(function (field) {
            field.addEventListener('blur', function () {
                validateField(field);
            });
            field.addEventListener('input', function () {
                if (field.classList.contains('is-invalid')) {
                    clearFieldError(field);
                }
            });
            field.addEventListener('change', function () {
                if (field.classList.contains('is-invalid')) {
                    clearFieldError(field);
                }
            });
        });
    });
}

function getFormConfig() {
    return {
        endpoint: window.SUNSET_FORMSUBMIT_ENDPOINT || 'https://formsubmit.co/ajax/goode434@gmail.com',
        toEmail: window.SUNSET_FORM_TO_EMAIL || 'goode434@gmail.com'
    };
}

function validateSunsetForm(form) {
    var isValid = true;
    form.querySelectorAll('[required]').forEach(function (field) {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    return isValid;
}

function validateField(field) {
    if (!field) return true;
    var value = (field.value || '').trim();
    var isValid = true;
    var errorMessage = '';

    if (field.hasAttribute('required') && value === '') {
        isValid = false;
        errorMessage = 'This field is required.';
    }

    if (field.type === 'email' && value !== '') {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address.';
        }
    }

    if (field.type === 'tel' && value !== '') {
        var phoneRegex = /^[\d\s\-\(\)\+]+$/;
        if (!phoneRegex.test(value) || value.replace(/\D/g, '').length < 10) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number.';
        }
    }

    if (field.tagName === 'TEXTAREA' && value !== '' && value.length < 10) {
        isValid = false;
        errorMessage = 'Please enter a message with at least 10 characters.';
    }

    if (!isValid) {
        showFieldError(field, errorMessage);
    } else {
        clearFieldError(field);
    }
    return isValid;
}

function showFieldError(field, message) {
    field.classList.add('is-invalid');
    field.classList.remove('is-valid');
    var existingError = field.parentElement.querySelector('.invalid-feedback');
    if (existingError) {
        existingError.textContent = message;
        return;
    }
    var errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback';
    errorDiv.textContent = message;
    field.parentElement.appendChild(errorDiv);
}

function clearFieldError(field) {
    field.classList.remove('is-invalid');
    if ((field.value || '').trim() !== '') {
        field.classList.add('is-valid');
    } else {
        field.classList.remove('is-valid');
    }
    var errorDiv = field.parentElement.querySelector('.invalid-feedback');
    if (errorDiv && !errorDiv.id) {
        errorDiv.remove();
    } else if (errorDiv) {
        errorDiv.textContent = '';
    }
}

function setFormStatus(form, type, html) {
    var status = form.querySelector('.js-form-status');
    if (!status) {
        status = document.createElement('div');
        status.className = 'js-form-status mt-3';
        status.setAttribute('role', 'status');
        status.setAttribute('aria-live', 'polite');
        form.appendChild(status);
    }
    status.className = 'js-form-status alert mt-3 alert-' + (type === 'success' ? 'success' : type === 'info' ? 'info' : 'danger');
    status.innerHTML = html;
    status.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function submitSunsetForm(form) {
    clearFormAlerts(form);

    var honeypot = form.querySelector('[name="botcheck"]');
    if (honeypot && honeypot.value) {
        setFormStatus(form, 'success', '<strong>Thank you!</strong> Your message has been sent.');
        form.reset();
        return;
    }

    if (!validateSunsetForm(form)) {
        setFormStatus(form, 'error', 'Please fix the highlighted fields and try again.');
        return;
    }

    var cfg = getFormConfig();
    var submitBtn = form.querySelector('[type="submit"]');
    var prevHtml = submitBtn ? submitBtn.innerHTML : '';
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending…';
    }

    var formData = new FormData(form);
    if (!formData.get('_subject')) {
        formData.set('_subject', formData.get('subject') || 'Sunset Home Painting — Book estimate lead');
    }
    formData.delete('subject');
    formData.set('_template', 'table');
    formData.set('_captcha', 'false');
    // Lead-only flag for inbox sorting
    formData.set('lead_type', 'estimate_request');
    formData.set('quote_status', 'visit_required_no_online_quote');

    fetch(cfg.endpoint, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' }
    })
        .then(function (res) {
            return res.json().then(function (data) {
                return { ok: res.ok, data: data };
            }).catch(function () {
                return { ok: res.ok, data: {} };
            });
        })
        .then(function (result) {
            var data = result.data || {};
            var success = result.ok && (data.success === true || data.success === 'true');
            if (success) {
                setFormStatus(
                    form,
                    'success',
                    '<strong>Thank you — your estimate request is in.</strong> This is a lead only (not an online quote). We will confirm a visit window, then we follow up with a free estimate after we see the job. Need us sooner? Call <a href="tel:3864053015">(386) 405-3015</a>.'
                );
                form.reset();
                form.querySelectorAll('.is-valid, .is-invalid').forEach(function (field) {
                    field.classList.remove('is-valid', 'is-invalid');
                });
            } else {
                var msg = data.message || data.error || 'Something went wrong. Please try again or call us.';
                setFormStatus(form, 'error', '<strong>Could not send.</strong> ' + msg);
            }
        })
        .catch(function () {
            setFormStatus(
                form,
                'error',
                '<strong>Network error.</strong> Please check your connection, call <a href="tel:3864053015">(386) 405-3015</a>, or email us.'
            );
        })
        .finally(function () {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = prevHtml;
            }
        });
}

function clearFormAlerts(form) {
    form.querySelectorAll('.js-form-status, .alert-success, .alert-danger, .alert-info').forEach(function (el) {
        if (el.classList.contains('js-form-status') || el.parentElement === form) {
            el.remove();
        }
    });
}

// Smooth scroll for anchor links (if needed)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});
