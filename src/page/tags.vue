<template>
    <el-row class="container" :gutter="20">
        <el-col :span="18">
            <el-card>
                <div class="title">
                    标签-- {{tagList.length}}
                </div>
                <!-- 分类表格 -->
                <el-card class="tag-directory" shadow="never">
                    <div class="tag-dir">
                        <div 
                        ref="tagItemRef"
                        class="tag-item" 
                        v-for="(tag, index) in this.tagList" 
                        :key="tag.id"
                        @click="tagClick($event, index)">
                            <i class="iconfont icon-tags">{{ tag.name }}({{ tag.blogInfos.length }})</i>
                        </div>
                    </div>
                </el-card>
                <!-- 文章列表 -->
                <!-- 博客摘要列表 -->
                <blogSummary v-for="blogInfo in currentBlogInfos" 
                :key="blogInfo.id" 
                :blogInfo="blogInfo" 
                shadow="never" 
                class="blog-item"/>
            </el-card>
        </el-col>
        <el-col :span="6">
            <generInfo/>
        </el-col>
    </el-row>
</template>

<script>
import generInfo from '../components/generInfo.vue'
import blogSummary from '../components/blogSummary.vue'

export default {
    name: 'tags',
    components: {
        generInfo,
        blogSummary
    },
    created() {
        this.getAllTags()
    },
    data() {
        return {
            currentTag: 0,
            // 全部标签列表
            tagList:[],
            lastClickTagIndex: 0,
        }
    },
    methods: {
        // 获取所有标签
        async getAllTags() {
            const {data: res} = await this.$http.get('public/tags')
            console.log(res)
            if (res.meta.status === 200) {
                this.tagList = res.data.filter( tag => {
                    return tag.blogInfos.length !== 0
                })
            } else {
                this.$message.error('获取标签数据失败！')
            }
        },
        tagClick(event, index) {
            console.log(this.$refs.tagItemRef)
            // 给上一个被点击的元素恢复颜色
            this.$refs.tagItemRef[this.lastClickTagIndex].style.color = "#77c5f8"
            // 被点击的标签赋橙色
            event.currentTarget.style.color = "#fc6423"
            this.lastClickTagIndex = index
            this.currentTag = index
        }
    },
    computed: {
        // 这里在前端实现一个数据分页的效果
        currentBlogInfos() {
            // 加判断的原因是等后台数据到达
            if (this.tagList.length !== 0){
                return this.tagList[this.currentTag].blogInfos
            }
        },
        currentBlogInfosLength() {
            // 加判断的原因是等后台数据到达
            if (this.tagList.length !== 0) {
                return this.tagList[this.currentTag].blogInfos.length
            }
        }
    }
}
</script>

<style lang='less' scoped>
    .container{
        margin-top: 20px;
    }
    .title{
        text-align: center;
        font-weight: bold;
        font-size: 28px;
        color: #444950;
        margin-bottom: 20px;
    }
    .tag-item{
        color: #77c5f8;
        display: inline-block;
        margin: 15px;
        cursor: pointer;
        i{
            font-size: 18px;
        }
    }
    .tag-item:first-child{
        color: #fc6423
    }
    .tag-item:hover{
        color: #fc6423 !important;
    }
    .blog-item{
        margin: 10px auto;
    }
    .el-pagination{
        text-align: center;
    }
</style>