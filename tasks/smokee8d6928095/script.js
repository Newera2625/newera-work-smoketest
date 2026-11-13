(function () {
  'use strict';

  var button = document.getElementById('ctaButton');
  var label = document.getElementById('btnLabel');
  var notice = document.getElementById('notice');

  if (!button || !label || !notice) {
    return;
  }

  var LOADING_MS = 400;
  var IDLE_TEXT = '开始探索';
  var DONE_TEXT = '重新开始';
  var timer = null;
  var state = 'idle';

  function setState(next) {
    state = next;
    button.classList.toggle('is-loading', next === 'loading');
    button.classList.toggle('is-done', next === 'done');
    button.disabled = next === 'loading';

    if (next === 'idle') {
      label.textContent = IDLE_TEXT;
      button.setAttribute('aria-label', '开始探索');
    } else if (next === 'loading') {
      label.textContent = '正在进入…';
      button.setAttribute('aria-label', '正在加载');
    } else {
      label.textContent = DONE_TEXT;
      button.setAttribute('aria-label', '重新开始');
    }
  }

  function showNotice() {
    notice.hidden = false;
    notice.classList.remove('is-visible');
    // 强制回流以重放入场动画
    void notice.offsetWidth;
    notice.classList.add('is-visible');
  }

  function hideNotice() {
    notice.classList.remove('is-visible');
    notice.hidden = true;
  }

  function handleClick() {
    if (state === 'loading') {
      return;
    }

    if (state === 'idle') {
      setState('loading');
      timer = window.setTimeout(function () {
        timer = null;
        setState('done');
        showNotice();
      }, LOADING_MS);
      return;
    }

    if (timer !== null) {
      window.clearTimeout(timer);
      timer = null;
    }
    hideNotice();
    setState('idle');
  }

  button.addEventListener('click', handleClick);
})();
