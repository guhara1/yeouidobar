(function () {
  'use strict';

  // ============ Mobile hamburger menu ============
  var toggle = document.getElementById('mobileToggle');
  var gnb = document.querySelector('.gnb');

  if (toggle && gnb) {
    toggle.addEventListener('click', function () {
      var isOpen = gnb.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute('aria-label', isOpen ? '메뉴 닫기' : '메뉴 열기');
    });

    gnb.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        if (gnb.classList.contains('is-open')) {
          gnb.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
          toggle.setAttribute('aria-label', '메뉴 열기');
        }
      });
    });
  }
})();
