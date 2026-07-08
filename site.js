/* ==========================================================================
   Lagniappe Provisions — shared site behavior
   Nav toggle, smooth in-page scrolling (with sticky-nav offset), email
   signup, qty stepper + add-to-cart. No dependencies, no build step.
   ========================================================================== */
(function () {
  'use strict';

  var CONFIG = window.LP_CONFIG || {};
  var FORM_ENDPOINT = CONFIG.formEndpoint || '';
  var CONTACT_EMAIL = CONFIG.contactEmail || 'hello@lagniappeprovisions.co';
  var NAV_OFFSET = 70; // sticky nav height

  /* ---- Current year in footer ---- */
  var yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---- Announcement bar (config flag, default shown) ---- */
  if (CONFIG.showAnnouncement === false) {
    var ann = document.querySelector('.announce');
    if (ann) ann.hidden = true;
  }

  /* ---- Mobile nav toggle ---- */
  var toggle = document.querySelector('.nav-toggle');
  var navLinks = document.getElementById('nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      var open = navLinks.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
    });
    navLinks.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        navLinks.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---- Smooth scroll to a section with sticky-nav offset ---- */
  function scrollToId(id) {
    var el = document.getElementById(id);
    if (!el) return false;
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var y = el.getBoundingClientRect().top + window.pageYOffset - NAV_OFFSET;
    window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' });
    return true;
  }

  /* Intercept in-page anchors ("#story", "/#signup"). If the target exists on
     this page, smooth-scroll; otherwise let the browser navigate to the other
     page (which then handles the hash on load, below). */
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href]');
    if (!a) return;
    var m = (a.getAttribute('href') || '').match(/^\/?#(.+)$/);
    if (!m) return;
    if (document.getElementById(m[1])) {
      e.preventDefault();
      scrollToId(m[1]);
      if (history.replaceState) history.replaceState(null, '', '#' + m[1]);
    }
  });

  /* On arrival with a hash (e.g. navigated here from the product page), scroll
     to the target section with the correct offset. */
  if (location.hash.length > 1) {
    var hashId = location.hash.slice(1);
    setTimeout(function () { scrollToId(hashId); }, 60);
  }

  /* ---- Email signup ---- */
  var form = document.getElementById('signup-form');
  if (form) {
    var done = document.getElementById('signup-done');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = form.querySelector('input[type="email"]');
      var email = (input && input.value || '').trim();
      if (!email) return; // ignore empty/whitespace

      function confirmJoin() {
        form.hidden = true;
        if (done) done.hidden = false;
      }

      if (FORM_ENDPOINT) {
        fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ email: email })
        }).then(confirmJoin).catch(function () {
          // Fall back to mail client so the signup is never lost.
          window.location.href = 'mailto:' + CONTACT_EMAIL +
            '?subject=' + encodeURIComponent('Add me to the Lagniappe Provisions list') +
            '&body=' + encodeURIComponent('Please add ' + email + ' to the launch list.');
          confirmJoin();
        });
      } else {
        confirmJoin();
      }
    });
  }

  /* ---- Product: qty stepper + add to cart ---- */
  var cart = document.getElementById('add-to-cart');
  if (cart) {
    var unit = parseFloat(cart.getAttribute('data-unit-price')) || 0;
    var valEl = document.getElementById('qty-value');
    var minus = document.getElementById('qty-minus');
    var plus = document.getElementById('qty-plus');
    var qty = 1;
    var addedTimer = null;

    function baseLabel() { return 'Add to Cart — $' + (unit * qty); }

    function render() {
      if (valEl) valEl.textContent = String(qty);
      if (!addedTimer) cart.textContent = baseLabel();
    }

    function setQty(next) {
      qty = Math.max(1, Math.min(24, next)); // clamp 1–24
      if (addedTimer) { clearTimeout(addedTimer); addedTimer = null; } // reset "added"
      render();
    }

    if (minus) minus.addEventListener('click', function () { setQty(qty - 1); });
    if (plus) plus.addEventListener('click', function () { setQty(qty + 1); });

    cart.addEventListener('click', function () {
      // No real cart in the prototype — wire to the store's actual cart here.
      cart.textContent = '✦ Added to Cart';
      if (addedTimer) clearTimeout(addedTimer);
      addedTimer = setTimeout(function () { addedTimer = null; render(); }, 1600);
    });

    render();
  }
})();
