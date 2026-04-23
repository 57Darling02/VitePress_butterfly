<template>
  <div class="a-card profile-card" :class="{ 'has-border': border }" id="profile-card">
    <div class="avatar-wrapper">
      <img :src="avatarSrc" :alt="name" class="avatar" @error="handleAvatarError" />
    </div>

    <div class="profile-content">
      
      <template v-if="hasBeforeSocialSlot">
        <slot name="before-social" />
      </template>
      <template v-else>
        <h4 class="name">{{ name }}</h4>
        <div class="position">{{ position }}</div>
        <p class="bio">{{ bio }}</p>
      </template>

      <div class="social-links">
        <a
          v-for="(link, index) in socialLinks"
          :key="index"
          :href="link.url"
          target="_blank"
          class="social-item"
          :title="link.name"
        >
          <i :class="link.icon"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, useSlots } from 'vue'
import { useData } from 'vitepress'

const { theme } = useData()
const slots = useSlots()

const {
  avatar = '',
  name = 'Unnamed',
  position = 'Developer',
  bio = 'Loves building and sharing.',
  socialLinks = [],
  border = true,
} = theme.value

const hasBeforeSocialSlot = computed(() => !!slots['before-social'])

const normalizeAvatarSrc = (value) => typeof value === 'string' ? value.trim() : ''

const createInlineAvatar = (displayName) => {
  const label = (displayName || 'U').trim().slice(0, 2).toUpperCase() || 'U'
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" role="img" aria-label="${label}">
      <defs>
        <linearGradient id="avatar-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#4f46e5" />
          <stop offset="100%" stop-color="#0ea5e9" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" rx="50" fill="url(#avatar-gradient)" />
      <text x="50" y="54" text-anchor="middle" dominant-baseline="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="36" font-weight="700">${label}</text>
    </svg>
  `

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

const inlineFallbackAvatar = computed(() => createInlineAvatar(name))
const avatarSrc = ref(normalizeAvatarSrc(avatar) || inlineFallbackAvatar.value)

const handleAvatarError = (event) => {
  avatarSrc.value = inlineFallbackAvatar.value

  if (event?.target) {
    event.target.onerror = null
    event.target.src = avatarSrc.value
  }
}
</script>

<style lang="scss">
#profile-card {
  padding: 10px 10px 10px;
}

.avatar-wrapper {
  width: 100px;
  height: 100px;
  margin: 0 auto 20px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid var(--vp-c-brand);
  transition: transform 0.3s ease;
}

.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-content {
  text-align: center;
}

.name {
  margin: 0 0 8px;
  font-size: 1.2rem;
  color: var(--vp-c-text-1);
}

.position {
  color: var(--vp-c-brand);
  font-size: 0.9rem;
  margin-bottom: 12px;
  font-weight: 500;
}

.bio {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0 auto 20px;
  max-width: 240px;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.social-item {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-bg-alt);
  transition: all 0.3s ease;
  color: var(--vp-c-text-2);
}

.social-item:hover {
  background: var(--vp-c-brand);
  color: white;
  transform: scale(1.1);
}

.social-icon {
  font-size: 1.1rem;
}

</style>
