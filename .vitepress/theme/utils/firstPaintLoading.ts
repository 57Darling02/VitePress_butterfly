const firstPaintLoadingStyle = `
  #first-paint-loading {
    --first-paint-loading-bg: radial-gradient(circle at center, rgba(255,255,255,.96), rgba(247,250,252,.92));
    --first-paint-loading-text: #475569;
    --first-paint-loading-track: rgba(148,163,184,.34);
    --first-paint-loading-accent: #111827;
    position: fixed;
    inset: 0;
    z-index: 9999;
    display: grid;
    place-items: center;
    background: var(--first-paint-loading-bg);
    color: var(--first-paint-loading-text);
    transition: opacity .18s ease;
  }
  html.dark #first-paint-loading,
  body.dark #first-paint-loading {
    --first-paint-loading-bg: radial-gradient(circle at center, rgba(15,23,42,.96), rgba(2,6,23,.94));
    --first-paint-loading-text: #cbd5e1;
    --first-paint-loading-track: rgba(100,116,139,.42);
    --first-paint-loading-accent: #e5e7eb;
  }
  #first-paint-loading.is-leaving {
    opacity: 0;
    pointer-events: none;
  }
  #first-paint-loading .first-paint-loading-panel {
    display: grid;
    justify-items: center;
    gap: 14px;
  }
  #first-paint-loading .first-paint-loading-mark {
    position: relative;
    width: 54px;
    height: 54px;
    border-radius: 50%;
    border: 4px solid var(--first-paint-loading-track);
    border-top-color: var(--first-paint-loading-accent);
    animation: first-paint-loading-spin .9s linear infinite;
    box-sizing: border-box;
  }
  #first-paint-loading .first-paint-loading-text {
    font-size: 14px;
    line-height: 1;
    letter-spacing: 0;
  }
  @keyframes first-paint-loading-spin {
    to { transform: rotate(1turn); }
  }
  @media (prefers-color-scheme: dark) {
    #first-paint-loading {
      --first-paint-loading-bg: radial-gradient(circle at center, rgba(15,23,42,.96), rgba(2,6,23,.94));
      --first-paint-loading-text: #cbd5e1;
      --first-paint-loading-track: rgba(100,116,139,.42);
      --first-paint-loading-accent: #e5e7eb;
    }
  }
`;

const firstPaintLoadingHtml = `
    <div id="first-paint-loading" role="status" aria-live="polite" aria-label="页面加载中">
      <div class="first-paint-loading-panel">
        <span class="first-paint-loading-mark" aria-hidden="true"></span>
        <span class="first-paint-loading-text">加载中</span>
      </div>
    </div>`;

export const injectFirstPaintLoading = (code: string) => {
  if (code.includes('id="first-paint-loading"')) return code;

  return code
    .replace('</head>', `<style>${firstPaintLoadingStyle}</style>\n  </head>`)
    .replace('<body>', `<body>${firstPaintLoadingHtml}`);
};
