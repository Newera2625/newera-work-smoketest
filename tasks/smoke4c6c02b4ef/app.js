(function () {
  'use strict';

  var button = document.getElementById('cta');
  var feedback = document.getElementById('cta-feedback');

  if (button && feedback) {
    var shown = false;

    button.addEventListener('click', function () {
      shown = !shown;

      if (shown) {
        feedback.hidden = false;
        // 强制回流，保证从 display:none 切换后过渡动画生效
        void feedback.offsetWidth;
        feedback.classList.add('is-visible');
      } else {
        feedback.classList.remove('is-visible');
        window.setTimeout(function () {
          if (!shown) {
            feedback.hidden = true;
          }
        }, 260);
      }

      button.setAttribute('aria-expanded', shown ? 'true' : 'false');
    });
  }

  // 锚点导航平滑滚动：尊重用户偏好，并保证焦点跟随目标区块
  var anchors = document.querySelectorAll('a[href^="#"]');

  Array.prototype.forEach.call(anchors, function (anchor) {
    anchor.addEventListener('click', function (event) {
      var id = anchor.getAttribute('href');

      if (!id || id === '#') {
        return;
      }

      var target = document.querySelector(id);

      if (!target) {
        return;
      }

      event.preventDefault();
      target.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        block: 'start'
      });

      if (!target.hasAttribute('tabindex')) {
        target.setAttribute('tabindex', '-1');
      }

      target.focus({ preventScroll: true });
      window.history.replaceState(null, '', id);
    });
  });

  var header = document.querySelector('.site-header');

  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
})();
