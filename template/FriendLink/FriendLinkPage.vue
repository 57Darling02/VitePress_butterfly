<template>
  <section class="friend-links" aria-label="友情链接">
    <ul v-if="friendlinks.length" class="friend-links__grid">
      <li v-for="(link, index) in friendlinks" :key="`${link.Url}-${index}`" class="friend-links__item">
        <a
          class="friend-links__link"
          :class="{ 'has-description': link.Desc }"
          :href="link.Url"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span class="friend-links__avatar" aria-hidden="true">
            <span class="friend-links__initial">{{ getInitial(link.Name) }}</span>
            <img
              v-if="link.Avatar && !failedAvatars.has(link.Url)"
              :src="link.Avatar"
              alt=""
              @error="markAvatarFailed(link.Url)"
            />
          </span>

          <span class="friend-links__copy">
            <span class="friend-links__name">{{ link.Name }}</span>
            <span v-if="link.Desc" class="friend-links__description">{{ link.Desc }}</span>
          </span>
        </a>
      </li>
    </ul>

    <p v-else class="friend-links__empty" role="status">暂无友链。</p>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useData } from 'vitepress'

interface FriendLink {
  Name: string
  Url: string
  Avatar?: string
  Desc?: string
}

interface FriendLinkTheme {
  friendlink?: FriendLink[]
}

const { theme } = useData<FriendLinkTheme>()
const failedAvatars = ref(new Set<string>())

const friendlinks = computed(() => theme.value.friendlink ?? [])

const getInitial = (name: string) => [...name.trim()][0]?.toUpperCase() ?? '?'

const markAvatarFailed = (url: FriendLink['Url']) => {
  failedAvatars.value = new Set(failedAvatars.value).add(url)
}
</script>

<style scoped>
.friend-links {
  --friend-link-avatar-size: 3.25rem;

  margin-block: 0 3rem;
}

.friend-links__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr));
  gap: 0.875rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.friend-links__item {
  min-width: 0;
}

.friend-links__link {
  display: grid;
  grid-template-columns: var(--friend-link-avatar-size) minmax(0, 1fr);
  gap: 0.875rem;
  align-items: center;
  min-height: 5rem;
  padding: 0.875rem;
  color: inherit;
  text-decoration: none;
  background: color-mix(in srgb, var(--vp-c-content-surface) 82%, transparent);
  border: 1px solid var(--vp-c-content-surface-border);
  border-radius: 8px;
  transition:
    background-color 180ms ease,
    border-color 180ms ease;
}

.friend-links__link:hover {
  background: color-mix(in srgb, var(--vp-c-content-surface) 90%, var(--vp-c-brand) 10%);
  border-color: color-mix(in srgb, var(--vp-c-content-surface-border) 58%, var(--vp-c-brand));
}

.friend-links__link:focus-visible {
  outline: 2px solid var(--vp-c-brand);
  outline-offset: 2px;
}

.friend-links__avatar {
  position: relative;
  display: grid;
  width: var(--friend-link-avatar-size);
  height: var(--friend-link-avatar-size);
  overflow: hidden;
  color: var(--vp-c-bg);
  background: color-mix(in srgb, var(--vp-c-brand) 72%, var(--vp-c-bg));
  border: 1px solid color-mix(in srgb, var(--vp-c-brand) 42%, var(--vp-c-divider));
  border-radius: 50%;
  place-items: center;
}

.friend-links__avatar img {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  max-width: none;
  margin: 0;
  border: 0;
  object-fit: cover;
}

.friend-links__initial {
  font-size: 1rem;
  font-weight: 600;
  line-height: 1;
}

.friend-links__copy {
  position: relative;
  display: block;
  height: var(--friend-link-avatar-size);
  min-width: 0;
  overflow: hidden;
}

.friend-links__name {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition:
    opacity 140ms ease,
    transform 180ms ease;
}

.friend-links__name {
  color: var(--vp-c-text-1);
  font-size: 0.975rem;
  font-weight: 600;
}

.friend-links__description {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  display: -webkit-box;
  overflow: hidden;
  color: var(--vp-c-text-2);
  font-size: 0.78rem;
  line-height: 1.35;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  transform: translateY(calc(var(--friend-link-avatar-size) - 1.35em));
  transition: transform 220ms cubic-bezier(0.22, 1, 0.36, 1);
}

.friend-links__empty {
  margin: 0;
  padding: 1.25rem 0;
  color: var(--vp-c-text-2);
  text-align: center;
}

@media (hover: hover) and (pointer: fine) {
  .friend-links__link.has-description:is(:hover, :focus-visible) .friend-links__name {
    opacity: 0;
    transform: translateY(-0.25rem);
  }

  .friend-links__link.has-description:is(:hover, :focus-visible) .friend-links__description {
    -webkit-line-clamp: 3;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .friend-links__link,
  .friend-links__name,
  .friend-links__description {
    transition: none;
  }
}
</style>
