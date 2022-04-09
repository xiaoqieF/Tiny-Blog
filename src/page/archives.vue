<template>
    <el-row class="container" :gutter="20">
        <el-col :span="18">
            <el-card>
                <div class="archives-title">
                    目前共 {{ totalBlogs }} 篇文章，继续努力！
                </div>
                <el-timeline reverse>
                    <el-timeline-item
                    v-for="blog in blogList"
                    :key="blog.id"
                    type="primary"
                    size="large"
                    :timestamp="blog.createTime | dateFormat"
                    placement="top">
                    <router-link :to="`/detail/${blog.id}`">
                        {{ blog.title }}
                    </router-link>
                    </el-timeline-item>
                </el-timeline>
            </el-card>
        </el-col>
        <el-col :span="6">
            <generInfo/>
        </el-col>
    </el-row>
</template>

<script>
import generInfo from '../components/generInfo.vue'
export default {
    name: 'archives',
    components: {
        generInfo,
    },
    created() {
        this.getAllBlogs()
    },
    data() {
        return {
            blogList: [],
            totalBlogs: 0,
        }
    },
    methods: {
        // 获取所有博客
        async getAllBlogs() {
            const {data: res} = await this.$http.get('public/blog')
            console.log(res)
            if (res.meta.status === 200) {
                this.blogList = res.data.blogList
                this.totalBlogs = res.data.total
            } else {
                this.$message.error('获取博客数据失败:', res.meta.msg)
            }
        },
    },

}
</script>

<style lang='less' scoped>
    .container{
        margin-top: 20px;
        .archives-title{
            font-weight: bold;
            font-size: 20px;
            padding-left: 30px;
            margin-top: 20px;
        }
    }
    .el-timeline{
        margin-top: 40px;
        font-size: 16px;
    }
</style>