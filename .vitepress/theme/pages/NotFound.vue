<template>
    <div class="not-found">
        <div class="container">
            <div class="glitch" data-text="404">404</div>
            <p class="subtitle">页面消失在数字深渊</p>
            <a href="/" class="home-btn">
                返回安全地带
                <div class="icon">
                    <svg viewBox="0 0 16 16" fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M8 0a8 8 0 100 16A8 8 0 008 0zm3.354 8.354l-3 3a.5.5 0 01-.708 0l-3-3a.5.5 0 11.708-.708L8 10.293l2.646-2.647a.5.5 0 01.708.708z" />
                    </svg>
                </div>
            </a>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.not-found {
  height: 100vh; /* 添加固定高度 */
  overflow: hidden; /* 隐藏溢出内容 */
  display: grid;
  place-items: center;
  color: white;
}

/* 在容器中添加最大宽度限制 */
.not-found .container {
  text-align: center;
  position: relative;
  padding: 2rem;
  max-width: 90vw;
}

.not-found .glitch {
    font-size: 8rem;
    font-weight: 700;
    position: relative;
    animation: glitch 3s infinite;

    &::before,
    &::after {
        content: attr(data-text);
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        clip: rect(0, 900px, 0, 0);
    }

    &::before {
        left: 2px;
        text-shadow: -2px 0 #ff00c1;
        animation: glitch-1 2s infinite linear;
    }

    &::after {
        left: -2px;
        text-shadow: 2px 0 #00fff9;
        animation: glitch-2 2s infinite linear;
    }
}

.not-found .subtitle {
    font-size: 1.25rem;
    color: #a0a0c0;
    margin: 3.8rem 0 0rem;
    
}

.not-found .home-btn {
    display: inline-flex;
    align-items: center;
    padding: 1rem 2rem;
    background: linear-gradient(45deg, #6a11cb, #2575fc);
    border-radius: 50px;
    color: white;
    text-decoration: none;
    transition: transform 0.3s ease;

    &:hover {
        transform: translateY(-3px);

        .icon {
            transform: translateX(3px);
        }
    }
}

.not-found .icon {
    width: 1.2rem;
    height: 1.2rem;
    margin-left: 0.8rem;
    transition: transform 0.3s ease;
}
@keyframes glitch-1 {
  0% { clip: rect(8px, 9999px, 98px, 0) }
  5% { clip: rect(32px, 9999px, 78px, 0) }
  /* 生成20组关键帧... */
  100% { clip: rect(88px, 9999px, 12px, 0) }
}

@keyframes glitch-2 {
  0% { clip: rect(16px, 9999px, 42px, 0) }
  15% { clip: rect(64px, 9999px, 36px, 0) }
  /* 生成20组关键帧... */
  100% { clip: rect(5px, 9999px, 89px, 0) }
}

/* 调整按钮悬停效果 */
.not-found .home-btn:hover .icon {
  transform: translateX(3px);
}


</style>