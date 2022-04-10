<template>
    <el-row class="container" :gutter="20">
        <el-col :span="18">
            <el-card>
                <!-- 文章内容 -->
                <div ref="contentRef" id="content" class="content markdown-body line-numbers" v-html="userInfo.description"></div>
            </el-card>
        </el-col>
        <el-col :span="6">
            <generInfo/>
        </el-col>
    </el-row>
</template>

<script>
import generInfo from '../components/generInfo.vue'
import Prism from 'prismjs'
export default {
    name: 'about',
    components: {
        generInfo,
    },
    async created() {
        await this.getUserInfo()
        Prism.highlightAll()
        this.$formula(this.$refs.contentRef)
    },
    data() {
        return {
            userInfo: {},
        }
    },
    methods: {
        // 获取用户信息
        async getUserInfo() {
            const {data: res} = await this.$http.get('/public/user/default')
            if (res.meta.status !== 200) {
                this.$message.error("获取用户信息失败：" + res.meta.msg)
                return
            }
            console.log(res.data)
            this.userInfo = res.data
        },
    },
}
</script>

<style lang='less' scoped>
    .container{
        margin-top: 20px;
    }
    .title{
        text-align: center;
        line-height: 2;
        font-size: 28px;
        color: #444950;
        font-weight: bold;
    }
    .markdown-body {
        box-sizing: border-box;
        min-width: 200px;
        max-width: 980px;
        margin: 0 auto;
        padding: 45px;
    }
    
    @media (max-width: 767px) {
        .markdown-body {
            padding: 15px;
        }
    }
</style>