<template>
    <el-row class="container" :gutter="10">
        <el-col :lg="18" :xs="24">
            <blogSummary v-for="blogInfo in blogList" :key="blogInfo.id" :blogInfo="blogInfo" />
            <!-- 分页栏 -->
            <el-card class="page">
                <!-- 分页 -->
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="blogQuery.pageNum"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="blogQuery.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalBlogs">
                </el-pagination>
            </el-card>
        </el-col>
        <el-col :lg="6" :xs="0" class='side-info'>
            <!-- 右侧第一个卡片，显示网站基本信息 -->
            <generInfo />
            <!-- 右侧第二个卡片，显示推荐文章 -->
            <el-card class="recommend">
                <div class="right-header">
                    <i class="iconfont icon-idea"></i> 推荐阅读
                </div>
                <div class="recommend-content">
                    <router-link :to="`/detail/${blog.id}`" class="recommend-item" v-for="blog in recommendBlogList" :key="blog.id">
                        <div class="recommend-title">{{ blog.title }}</div>
                        <div class="recommend-tag">
                            <el-tag v-for="tag in blog.tags" :key="tag.id" type="success" size="mini">{{ tag.name }}</el-tag>
                        </div>
                        <div class="recommend-footer">
                            <div class="recommend-info">
                                {{ blog.createTime | dateFormat }}
                            </div>
                        </div>
                    </router-link>
                </div>
            </el-card>
            <!-- 右侧第三个卡片， 标签墙-->
            <el-card>
                <div class="right-header">
                    <i class="iconfont icon-tags"></i> 标签墙
                </div>
                <div class="tag-content" ref="tagRef">
                    <wordCloud :height="tagWallWidth" :width="tagWallWidth" :RADIUS="tagWallWidth/2"/>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
import generInfo from '../components/generInfo.vue'
import blogSummary from '../components/blogSummary.vue'
import wordCloud from '../components/wordCloud.vue'
export default {
    name: "home",
    created() {
        this.getAllBlogs()
        this.getRecommendBlogList()
    },
    components: {
        generInfo,
        blogSummary,
        wordCloud,
    },
    data() {
        return {
            blogQuery: {
                pageNum: 1,
                pageSize: 5,
            },
            totalBlogs: 0,
            pageSize: 10,
            // 全部博客列表
            blogList: [],
            // 推荐的博客列表
            recommendBlogList: [],
            tagWallWidth: 300,
        }
    },
    methods: {
        // 获取所有博客
        async getAllBlogs() {
            const {data: res} = await this.$http.get('public/blog', {
                params: this.blogQuery,
            })
            console.log(res)
            if (res.meta.status === 200) {
                this.blogList = res.data.blogList
                this.totalBlogs = res.data.total
            } else {
                this.$message.error('获取博客数据失败:', res.meta.msg)
            }
        },
        // 获取所有推荐的博客
        async getRecommendBlogList() {
            const {data: res} = await this.$http.get('public/blog/recommend')
            console.log(res)
            if (res.meta.status === 200) {
                this.recommendBlogList = res.data
            } else {
                this.$message.error('获取推荐博客数据失败:', res.meta.msg)
            }
        },

        // 分页页面大小变化后重新获取数据
        handleSizeChange(newSize) {
            this.blogQuery.pageSize = newSize
            this.getAllBlogs()
        },
        // 当前选择页面变化后重新获取数据
        handleCurrentChange(newPage) {
            this.blogQuery.pageNum = newPage
            this.getAllBlogs()
        },
    },
    mounted() {
        const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                this.tagWallWidth = entry.target.clientWidth
                console.log(entry.target.clientWidth)
            }
        });
        resizeObserver.observe(document.querySelector('.tag-content'));
        },
}
</script>

<style lang="less" scoped>
    .container{
        margin-top: 20px;
    }
    .el-card{
        margin-bottom: 20px;
    }
    .page{
        display: flex;
        justify-content: center;
    }
    .right-header{
        padding-left: 6px;
        border-left: 4px solid #409eff;
        margin-bottom: 5px;
    }
    .recommend-item{
        display: inline-block;
        margin: 5px;
        width: 100%;
        font-size: 14px;
        line-height: 1.8;
        .el-tag{
            margin-right: 5px;
        }
        .recommend-info{
            font-size: 12px;
            color: #888;
        }
    }
    .recommend-item:hover{
        background-color: #eee;
    }

    
</style>