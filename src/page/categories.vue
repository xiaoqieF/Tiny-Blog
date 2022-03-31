<template>
    <el-row class="container" :gutter="20">
        <el-col :span="18">
            <el-card>
                <div class="title">
                    分类-- 12
                </div>
                <!-- 分类表格 -->
                <el-card class="cate-directory" shadow="never">
                    <div class="cate-dir">
                        <el-radio v-model="currentCate" :label="1" border>后端(5)</el-radio>
                        <el-radio v-model="currentCate" :label="2" border>前端(7)</el-radio> 
                        <el-radio v-model="currentCate" :label="3" border>学习(2)</el-radio> 
                        <el-radio v-model="currentCate" :label="4" border>生活(1)</el-radio> 
                    </div>
                </el-card>
                <!-- 文章列表 -->
                <el-card class="cate-content" shadow="never">
                    <!-- 博客摘要列表 -->
                    <blogSummary shadow="never" class="blog-item"/>
                    <blogSummary shadow="never" class="blog-item"/>
                    <!-- 底部分页 -->
                    <el-pagination
                        background
                        layout="prev, pager, next"
                        :page-size="pageSize"
                        :total="total">
                    </el-pagination>
                </el-card>
            </el-card>
        </el-col>
        <el-col :span="6">
            <generInfo moto="松花酿酒，春水煎茶" 
            :archivesNum="10" 
            :categoriesNum="12" 
            :tagsNum="5">
            </generInfo>
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
    data() {
        return {
            currentCate: 1,
            pageSize: 4,
            total: 10,
        }
    },
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
    .cate-content{
        .blog-item{
            margin: 10px auto;
        }
        .el-pagination{
            text-align: center;
        }
    }
</style>