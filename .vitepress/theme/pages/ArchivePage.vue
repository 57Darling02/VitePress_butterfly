<template>
    <div class="archive-container">
        <el-row :gutter="20">
            <!-- 允许列表区块 -->
            <el-col :span="12" :xs="24">
                <div class="a-card filter-section">
                    <h3>包含以下标签之一 🎯</h3>
                    <el-checkbox-group v-model="AllowList" size="small" :max="4">
                        <el-space wrap>
                            <el-checkbox-button v-for="tag in Tags" :key="tag" :value="tag" :label="tag" />
                        </el-space>
                    </el-checkbox-group>
                    <el-select-v2 v-model="AllowList" filterable :options="tagOptions" placeholder="选择可以包含的标签" multiple
                        class="mb-2" />
                </div>
            </el-col>

            <!-- 排除列表区块 -->
            <el-col :span="12" :xs="24">
                <div class="a-card filter-section">
                    <h3>排除任意标签 🚫</h3>
                    <el-checkbox-group v-model="ExclusionList" size="small" :max="4">
                        <el-space wrap>
                            <el-checkbox-button v-for="tag in Tags" :key="tag" :value="tag" :label="tag" />
                        </el-space>
                    </el-checkbox-group>
                    <el-select-v2 v-model="ExclusionList" filterable :options="tagOptions" placeholder="选择排除的标签"
                        multiple class="mb-2" />
                </div>
            </el-col>
        </el-row>

        <!-- 文章列表 -->
        <div class="result-section">
            <h3>匹配文章（{{ filteredPosts.length }}篇）📚</h3>
            <el-divider />
            <div style="gap: 12px;display: flex;flex-direction: column;">
                <div v-for="post in filteredPosts" :key="post.link">
                    <ArticleCard :post="post" />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import { data as posts } from '../data/posts.data.ts'
import ArticleCard from '../components/cards/ArticleCard.vue'

const Tags = ref([])
const ExclusionList = ref([])
const AllowList = ref([])

// 初始化时提取所有文章的标签（去重）
posts.forEach(post => {
    post.tags.forEach(tag => {
        if (!Tags.value.includes(tag)) {
            Tags.value.push(tag)
        }
    })
})
// 在Tags定义后添加options格式转换
const tagOptions = computed(() => {
    return Tags.value.map(tag => ({
        value: tag,
        label: tag
    }))
})
//标签过滤逻辑
const filteredPosts = computed(() => {
    return posts.filter(post => {
        // 满足允许列表条件：至少有一个标签在允许列表中
        const hasAllowedTag = AllowList.value.length === 0 ||
            post.tags.some(tag => AllowList.value.includes(tag))
        // 满足排除列表条件：没有标签在排除列表中
        const noExcludedTag = !post.tags.some(tag => ExclusionList.value.includes(tag))
        return hasAllowedTag && noExcludedTag
    })
})
</script>

<style lang="css" scoped>
.archive-container {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
}

.filter-section {
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;
}

.result-section {
    margin-top: 30px;
    display: block;
    gap: 20px;
}

.mb-2 {
    margin-bottom: 1rem;
    margin-top: 1rem;
}

h3 {
    margin-bottom: 15px;
    font-size: 1.2em;
}
</style>
