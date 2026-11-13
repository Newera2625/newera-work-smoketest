```text
file=index.html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="Hello NewEra — 欢迎来到 NewEra，这里是你的下一个开始。">
<title>Hello NewEra</title>
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Crect width='24' height='24' rx='7' fill='%231B2A4A'/%3E%3Cpath d='M8.5 15.5 12 8l3.5 7.5' fill='none' stroke='%23FFFFFF' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M10 13h4' fill='none' stroke='%23FFFFFF' stroke-width='1.8' stroke-linecap='round'/%3E%3C/svg%3E">
<link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="page">
    <header class="topbar">
      <a class="brand" href="#top">
        <span class="brand__mark" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="9"></circle>
            <path d="M8.5 15.5 12 8l3.5 7.5"></path>
            <path d="M10 13h4"></path>
          </svg>
        </span>
        <span class="brand__text">NewEra</span>
      </a>
    </header>

    <main class="hero" id="top">
      <section class="hero__content">
        <p class="hero__eyebrow">NewEra Studio</p>
        <h1 class="hero__title">Hello NewEra</h1>
        <p class="hero__subtitle">欢迎来到 NewEra，这里是你的下一个开始。</p>

        <div class="notice" id="notice" role="status" aria-live="polite" hidden>
          <span class="notice__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 6 9 17l-5-5"></path>
            </svg>
          </span>
          <span class="notice__text">欢迎！很高兴在这里见到你，准备好就开始探索吧。</span>
        </div>
      </section>

      <div class="action">
        <button class="btn" id="ctaButton" type="button">
          <span class="btn__label" id="btnLabel">开始探索</span>
          <span class="btn__spinner" aria-hidden="true"></span>
          <svg class="btn__arrow" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M5 12h13"></path>
            <path d="m13 6 6 6-6 6"></path>
          </svg>
        </button>
      </div>
    </main>

    <footer class="footer">
      <p class="footer__text">© 2025 NewEra · Made with care</p>
    </footer>
  </div>

  <script src="script.js"></script>
</body>
</html>

```

```text
file=script.js
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

```

```text
file=style.css
:root {
  --color-primary: #1B2A4A;
  --color-primary-dark: #132037;
  --color-primary-light: #2C4370;
  --color-white: #FFFFFF;
  --color-paper: #F5F6F8;
  --color-text: #6B7280;
  --color-line: #E5E7EB;
  --color-ink: #111827;

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 16px;
  --space-4: 24px;
  --space-5: 40px;
  --space-6: 64px;

  --radius-card: 14px;
  --radius-pill: 999px;

  --shadow-card: 0 1px 2px rgba(17, 24, 39, 0.04), 0 8px 24px rgba(27, 42, 74, 0.08);
  --shadow-button: 0 8px 20px rgba(27, 42, 74, 0.22);

  --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;

  --ease: cubic-bezier(0.22, 0.61, 0.36, 1);
}

* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
}

body {
  min-height: 100vh;
  font-family: var(--font-sans);
  color: var(--color-ink);
  background-color: var(--color-paper);
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  overflow-x: hidden;
}

.page {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: var(--space-4) var(--space-4) var(--space-3);
  isolation: isolate;
}

.page::before {
  content: "";
  position: fixed;
  inset: -20%;
  z-index: -2;
  background:
    radial-gradient(38% 38% at 18% 12%, rgba(44, 67, 112, 0.20) 0%, rgba(44, 67, 112, 0) 68%),
    radial-gradient(42% 42% at 82% 20%, rgba(27, 42, 74, 0.16) 0%, rgba(27, 42, 74, 0) 70%),
    radial-gradient(46% 46% at 50% 92%, rgba(27, 42, 74, 0.12) 0%, rgba(27, 42, 74, 0) 72%),
    linear-gradient(180deg, var(--color-white) 0%, var(--color-paper) 55%, var(--color-white) 100%);
  animation: breathe 14s var(--ease) infinite alternate;
}

.page::after {
  content: "";
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background-image: radial-gradient(rgba(27, 42, 74, 0.10) 1px, transparent 1px);
  background-size: 26px 26px;
  mask-image: radial-gradient(60% 60% at 50% 40%, #000 0%, transparent 100%);
  -webkit-mask-image: radial-gradient(60% 60% at 50% 40%, #000 0%, transparent 100%);
  opacity: 0.5;
}

@keyframes breathe {
  from {
    transform: scale(1) translate3d(0, 0, 0);
  }
  to {
    transform: scale(1.08) translate3d(0, -1.5%, 0);
  }
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--color-primary);
  text-decoration: none;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.brand__mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: var(--radius-pill);
  background: var(--color-primary);
  color: var(--color-white);
}

.brand:hover .brand__mark {
  background: var(--color-primary-light);
}

.brand:focus-visible {
  outline: 2px solid var(--color-primary-light);
  outline-offset: 4px;
  border-radius: var(--radius-card);
}

.hero {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-6);
  text-align: center;
  padding: var(--space-6) 0;
  max-width: 760px;
  width: 100%;
  margin: 0 auto;
}

.hero__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
  animation: rise-in 0.7s var(--ease) both;
}

.hero__eyebrow {
  margin: 0;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--color-text);
}

.hero__title {
  margin: 0;
  font-size: clamp(44px, 11vw, 96px);
  line-height: 1.05;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--color-primary);
}

.hero__subtitle {
  margin: 0;
  max-width: 30ch;
  font-size: clamp(15px, 3.6vw, 18px);
  line-height: 1.7;
  color: var(--color-text);
  animation: rise-in 0.7s var(--ease) 0.12s both;
}

.notice {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  max-width: 100%;
  margin-top: var(--space-2);
  padding: 12px var(--space-4);
  border: 1px solid var(--color-line);
  border-radius: var(--radius-card);
  background: var(--color-white);
  box-shadow: var(--shadow-card);
  color: var(--color-primary);
  font-size: 14px;
  line-height: 1.6;
  text-align: left;
}

.notice[hidden] {
  display: none;
}

.notice__icon {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: var(--radius-pill);
  background: var(--color-primary);
  color: var(--color-white);
}

.notice__text {
  min-width: 0;
}

.action {
  animation: rise-in 0.7s var(--ease) 0.24s both;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  width: auto;
  max-width: 100%;
  min-height: 52px;
  padding: 14px var(--space-5);
  border: 0;
  border-radius: var(--radius-pill);
  background: var(--color-primary);
  color: var(--color-white);
  font-family: inherit;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.01em;
  cursor: pointer;
  box-shadow: var(--shadow-button);
  transition: background-color 0.2s var(--ease), box-shadow 0.2s var(--ease), transform 0.15s var(--ease), opacity 0.2s var(--ease);
}

.btn:hover:not(:disabled) {
  background: var(--color-primary-dark);
  box-shadow: 0 10px 24px rgba(19, 32, 55, 0.28);
}

.btn:focus-visible {
  outline: 3px solid var(--color-primary-light);
  outline-offset: 3px;
}

.btn:active:not(:disabled) {
  transform: translateY(1px) scale(0.99);
  box-shadow: 0 4px 12px rgba(19, 32, 55, 0.24);
}

.btn:disabled {
  opacity: 0.65;
  cursor: not-allowed;
  box-shadow: none;
}

.btn__arrow {
  flex: 0 0 auto;
  transition: transform 0.2s var(--ease);
}

.btn:hover:not(:disabled) .btn__arrow {
  transform: translateX(3px);
}

.btn__spinner {
  display: none;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.45);
  border-top-color: var(--color-white);
  border-radius: var(--radius-pill);
  animation: spin 0.7s linear infinite;
}

.btn.is-loading .btn__spinner {
  display: inline-block;
}

.btn.is-loading .btn__arrow {
  display: none;
}

.btn.is-done .btn__arrow {
  display: none;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes rise-in {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.notice.is-visible {
  animation: notice-in 0.4s var(--ease) both;
}

@keyframes notice-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.footer {
  display: flex;
  justify-content: center;
  border-top: 1px solid var(--color-line);
  padding-top: var(--space-3);
}

.footer__text {
  margin: 0;
  font-size: 13px;
  color: var(--color-text);
  letter-spacing: 0.01em;
}

@media (max-width: 640px) {
  .page {
    padding: var(--space-3) var(--space-3) var(--space-2);
  }

  .hero {
    gap: var(--space-5);
    padding: var(--space-5) 0;
  }

  .hero__subtitle {
    max-width: 22ch;
  }

  .notice {
    padding: 12px var(--space-3);
    font-size: 13px;
  }

  .btn {
    width: 100%;
    max-width: 320px;
  }

  .footer__text {
    font-size: 12px;
    text-align: center;
  }
}

@media (prefers-reduced-motion: reduce) {
  .page::before,
  .hero__content,
  .hero__subtitle,
  .action,
  .notice.is-visible,
  .btn__spinner {
    animation: none;
  }

  .btn,
  .btn__arrow {
    transition: none;
  }
}

```