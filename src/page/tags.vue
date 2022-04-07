<template>
    <el-row class="container" :gutter="20">
        <el-col :span="18">
            <el-card>
                <div class="title">
                    标签-- 30
                </div>
                <!-- 分类表格 -->
                <el-card class="tag-directory" shadow="never">
                    <div class="tag-dir">
                        <el-radio v-model="currentTag" :label="1" border>
                            <i class="iconfont icon-tags">Spring(12)</i>
                        </el-radio>
                        <el-radio v-model="currentTag" :label="2" border>
                            <i class="iconfont icon-tags">AOP(3)</i>
                        </el-radio> 
                    </div>
                    
                </el-card>
                <!-- 文章列表 -->
                <el-card class="tag-content" shadow="never">
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
    data() {
        return {
            pageSize: 4,
            total: 10,
            currentTag: 1,
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
    .tag-content{
        .blog-item{
            margin: 10px auto;
        }
        .el-pagination{
            text-align: center;
        }
    }
</style>