(function () {
  'use strict';

  // ============ Mobile hamburger menu ============
  const toggle = document.getElementById('mobileToggle');
  const gnb = document.querySelector('.gnb');

  if (toggle && gnb) {
    toggle.addEventListener('click', () => {
      const isOpen = gnb.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute('aria-label', isOpen ? '메뉴 닫기' : '메뉴 열기');
    });

    gnb.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        if (gnb.classList.contains('is-open')) {
          gnb.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
          toggle.setAttribute('aria-label', '메뉴 열기');
        }
      });
    });
  }

  // ============ Mobile sticky CTA bar (자동 삽입) ============
  // 모든 페이지 모바일 하단에 전화·카카오톡 고정 바 표시
  if (!document.querySelector('.mobile-cta-bar')) {
    const bar = document.createElement('nav');
    bar.className = 'mobile-cta-bar';
    bar.setAttribute('aria-label', '예약 빠른 메뉴');
    bar.innerHTML = ''
      + '<a href="tel:01020110321" class="cta-phone" aria-label="전화로 예약하기">'
      +   '<span class="cta-icon" aria-hidden="true">📞</span>'
      +   '<span class="cta-label">'
      +     '<strong>전화 예약</strong>'
      +     '<small>010-2011-0321</small>'
      +   '</span>'
      + '</a>'
      + '<a href="https://pf.kakao.com/_xxxxxx" class="cta-kakao" rel="noopener" aria-label="카카오톡으로 예약하기">'
      +   '<span class="cta-icon" aria-hidden="true">💬</span>'
      +   '<span class="cta-label">'
      +     '<strong>카톡 예약</strong>'
      +     '<small>가장 빠른 응답</small>'
      +   '</span>'
      + '</a>';
    document.body.appendChild(bar);
  }
})();
