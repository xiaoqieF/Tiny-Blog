<template>
    <el-row class="container" :gutter="20">
        <el-col :span="18">
            <el-card>
                <div class="title">
                    分类-- {{ cateList.length }}
                </div>
                <!-- 分类表格 -->
                <el-card class="cate-directory" shadow="never">
                    <div class="cate-dir">
                        <!-- 这里使用index作为label -->
                        <el-radio 
                        v-for="(cate,index) in cateList" 
                        :key="cate.id" 
                        v-model="currentCate" 
                        :label="index" 
                        border>{{ cate.name }}（{{cate.blogInfos.length}}）</el-radio>
                    </div>
                </el-card>
                <!-- 文章列表 -->
                <!-- 博客摘要列表 -->
                <blogSummary v-for="blogInfo in currentBlogInfos" 
                :key="blogInfo.id" 
                :blogInfo="blogInfo" 
                shadow="never" 
                class="blog-item"/>
                <!-- 底部分页 -->
                <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    layout="total, sizes, prev, pager, next "
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size="pageSize"
                    :total="currentBlogInfosLength">
                </el-pagination>
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
    name: 'categories',
    components: {
        generInfo,
        blogSummary
    },
    created() {
        this.getAllCates()
    },
    data() {
        return {
            currentCate: 0,
            pageSize: 4,
            currentPage: 1,
            total: 10,
            // 全部分类列表
            cateList: [],
        }
    },
    methods: {
        // 获取所有分类
        async getAllCates() {
            const {data: res} = await this.$http.get('public/categories')
            console.log(res)
            if (res.meta.status === 200) {
                this.cateList = res.data
            } else {
                this.$message.error('获取分类数据失败！')
            }
        },
        handleSizeChange(newSize) {
            this.pageSize = newSize
        },
        handleCurrentChange(newPage) {
            this.currentPage = newPage
        }
    },
    computed: {
        // 这里在前端实现一个数据分页的效果
        currentBlogInfos() {
            // 加判断的原因是等后台数据到达
            if (this.cateList.length !== 0){
                return this.cateList[this.currentCate].blogInfos
                .slice(this.currentPage - 1, this.pageSize + this.currentPage - 1)
            }
        },
        currentBlogInfosLength() {
            // 加判断的原因是等后台数据到达
            if (this.cateList.length !== 0) {
                return this.cateList[this.currentCate].blogInfos.length
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
    .blog-item{
        margin: 10px auto;
    }
    .el-pagination{
        text-align: center;
    }
</style>