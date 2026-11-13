```text
file=app.js
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

```

```text
file=index.html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Hello NewEra</title>
<meta name="description" content="Hello NewEra — 欢迎来到新的起点。">
<link rel="stylesheet" href="style.css">
</head>
<body>
  <header class="site-header">
    <div class="shell header-inner">
      <a class="brand" href="#home" aria-label="NewEra 首页">
        <svg class="brand-mark" viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" focusable="false">
          <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.5"/>
          <circle cx="12" cy="12" r="3.2" fill="currentColor"/>
        </svg>
        <span class="brand-name">NewEra</span>
      </a>
      <nav class="site-nav" aria-label="主导航">
        <a href="#home">首页</a>
        <a href="#about">关于</a>
        <a href="#contact">联系</a>
      </nav>
    </div>
  </header>

  <main id="home">
    <section class="hero" aria-labelledby="hero-title" id="hero">
      <div class="shell hero-inner">
        <p class="eyebrow">全新起点</p>
        <h1 id="hero-title">Hello NewEra</h1>
        <p class="welcome">欢迎来到新的起点，这里是开始你下一段旅程的地方。</p>
        <div class="cta-wrap">
          <button id="cta" class="btn-primary" type="button" aria-expanded="false" aria-controls="cta-feedback">开始探索</button>
          <p id="cta-feedback" class="feedback" role="status" aria-live="polite" hidden>已为你准备好接下来的内容。</p>
        </div>
      </div>
    </section>

    <section id="about" class="features" aria-labelledby="features-title">
      <div class="shell">
        <h2 id="features-title" class="section-title">我们提供的</h2>
        <div class="card-grid">
          <article class="card">
            <svg class="card-icon" viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" focusable="false">
              <path d="M13 2 4.5 13.5H11l-1 8.5 8.5-11.5H12l1-8.5Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
            </svg>
            <h3>快速上手</h3>
            <p>无需复杂配置，打开即可使用，三步之内进入状态。</p>
          </article>
          <article class="card">
            <svg class="card-icon" viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" focusable="false">
              <path d="M4 7h16M4 12h16M4 17h10" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            <h3>简洁专注</h3>
            <p>只保留必要的信息与操作，让注意力回到内容本身。</p>
          </article>
          <article class="card">
            <svg class="card-icon" viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" focusable="false">
              <rect x="3" y="4" width="18" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/>
              <path d="M8 20h8" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            <h3>响应式</h3>
            <p>从手机到宽屏都能顺畅浏览，布局随视口自然调整。</p>
          </article>
        </div>
      </div>
    </section>
  </main>

  <footer id="contact" class="site-footer">
    <div class="shell footer-inner">
      <p class="copyright">&copy; 2025 NewEra</p>
      <p class="contact-text">联系我们：hello@newera.example</p>
    </div>
  </footer>

  <script src="app.js"></script>
</body>
</html>

```

```text
file=style.css
:root {
  --bg: #0f1220;
  --bg-elev: #161a2c;
  --primary: #4f46e5;
  --primary-dark: #4338ca;
  --primary-light: #818cf8;
  --text: #e7e9f3;
  --text-muted: #9aa1b8;

  --shell: 1120px;
  --space-1: 8px;
  --space-2: 16px;
  --space-3: 24px;
  --space-4: 40px;
  --space-5: 64px;
  --space-6: 96px;

  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 20px;
  --radius-pill: 999px;

  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.35);
  --shadow-md: 0 8px 24px rgba(0, 0, 0, 0.28);
  --shadow-lg: 0 14px 40px rgba(79, 70, 229, 0.28);

  --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue",
    "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  scroll-padding-top: 84px;
}

section,
main,
footer {
  scroll-margin-top: 84px;
}

section:focus,
main:focus,
footer:focus {
  outline: none;
}

body {
  margin: 0;
  background-color: var(--bg);
  color: var(--text);
  font-family: var(--font-sans);
  font-size: 16px;
  line-height: 1.65;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
  overflow-wrap: break-word;
}

img,
svg {
  max-width: 100%;
}

.shell {
  width: 100%;
  max-width: var(--shell);
  margin: 0 auto;
  padding: 0 var(--space-3);
}

/* Header */
.site-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: rgba(15, 18, 32, 0.86);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(231, 233, 243, 0.08);
}

.site-header.is-scrolled {
  background-color: rgba(15, 18, 32, 0.96);
  box-shadow: var(--shadow-sm);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  min-height: 68px;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  color: var(--text);
  text-decoration: none;
  font-weight: 600;
  letter-spacing: 0.01em;
}

.brand-mark {
  color: var(--primary-light);
}

.brand:hover .brand-mark {
  color: var(--primary);
}

.site-nav {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.site-nav a {
  color: var(--text-muted);
  text-decoration: none;
  font-size: 14px;
  padding: 6px 2px;
  border-radius: var(--radius-sm);
  transition: color 0.2s ease;
}

.site-nav a:hover {
  color: var(--text);
}

.site-nav a:focus-visible {
  outline: 2px solid var(--primary-light);
  outline-offset: 3px;
}

/* Hero */
.hero {
  display: flex;
  align-items: center;
  min-height: calc(100vh - 68px);
  padding: var(--space-6) 0;
  text-align: center;
}

.hero-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
}

.eyebrow {
  margin: 0;
  font-size: 13px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--primary-light);
}

h1 {
  margin: 0;
  font-size: clamp(2.5rem, 8vw, 4rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.08;
}

.welcome {
  margin: 0;
  max-width: 34rem;
  color: var(--text-muted);
  font-size: clamp(1rem, 2.4vw, 1.125rem);
}

.cta-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  margin-top: var(--space-2);
  width: 100%;
}

.btn-primary {
  appearance: none;
  border: 1px solid transparent;
  background-color: var(--primary);
  color: #ffffff;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  padding: 14px 34px;
  border-radius: var(--radius-pill);
  cursor: pointer;
  box-shadow: var(--shadow-md);
  transition: background-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
}

.btn-primary:hover {
  background-color: var(--primary-dark);
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.btn-primary:active {
  transform: translateY(0);
  background-color: #3b32b8;
  box-shadow: var(--shadow-sm);
}

.btn-primary:focus-visible {
  outline: 3px solid var(--primary-light);
  outline-offset: 3px;
}

.feedback {
  margin: 0;
  color: var(--text-muted);
  font-size: 0.9375rem;
  opacity: 0;
  transform: translateY(-4px);
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.feedback[hidden] {
  display: none;
}

.feedback.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Features */
.features {
  padding: var(--space-6) 0;
  border-top: 1px solid rgba(231, 233, 243, 0.08);
  background-color: var(--bg-elev);
}

.section-title {
  margin: 0 0 var(--space-5);
  text-align: center;
  font-size: clamp(1.5rem, 3.5vw, 2rem);
  font-weight: 650;
  letter-spacing: -0.02em;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space-3);
}

.card {
  background-color: var(--bg);
  border: 1px solid rgba(231, 233, 243, 0.09);
  border-radius: var(--radius-md);
  padding: var(--space-4);
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
  border-color: rgba(79, 70, 229, 0.55);
}

.card-icon {
  color: var(--primary-light);
  margin-bottom: var(--space-2);
}

.card h3 {
  margin: 0 0 var(--space-1);
  font-size: 1.125rem;
  font-weight: 600;
}

.card p {
  margin: 0;
  color: var(--text-muted);
  font-size: 0.9375rem;
}

/* Footer */
.site-footer {
  padding: var(--space-4) 0;
  border-top: 1px solid rgba(231, 233, 243, 0.08);
}

.footer-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-2);
  flex-wrap: wrap;
  color: var(--text-muted);
  font-size: 0.875rem;
}

.footer-inner p {
  margin: 0;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

@media (max-width: 720px) {
  .card-grid {
    grid-template-columns: 1fr;
  }

  .hero {
    min-height: auto;
    padding: var(--space-5) 0;
  }

  .footer-inner {
    justify-content: center;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .shell {
    padding: 0 var(--space-2);
  }

  .header-inner {
    min-height: 60px;
    gap: var(--space-2);
  }

  .site-nav {
    gap: var(--space-2);
  }

  .site-nav a {
    font-size: 13px;
  }

  .btn-primary {
    width: 100%;
    max-width: 100%;
    padding: 13px 24px;
  }
}

```