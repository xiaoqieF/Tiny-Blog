<template>
    <el-row class="container" :gutter="20">
        <el-col :xs="24" :md="18" :lg="18">
            <el-card>
                <!-- 文章标题 -->
                <div class="title">
                    {{ blog.title }}
                </div>
                <!-- 文章信息（发表时间、阅读次数等） -->
                <div class="subtitle">
                    <div><i class="el-icon-edit-outline"></i><span> 发表于 {{ blog.createTime | dateFormat }}</span></div>
                    <div><i class="el-icon-edit-outline"></i><span> 更新于 {{ blog.updateTime | dateFormat }}</span></div>
                    <div><i class="el-icon-view"></i><span> 阅读次数 {{ blog.views }}</span></div>
                </div>
                <!-- 文章内容 -->
                <div ref="contentRef" id="content" class="content markdown-body" v-html="blog.content"></div>
                <div class="thanks">
                    ----- 本文结束，感谢您的阅读 -----
                </div>
                <!-- 底部声明栏 -->
                <el-card shadow="never" class="footer">
                    <div class="author">
                        <span>本文作者：</span><a href="https://github.com/xiaoqieF">{{ blog.user.nickname }}</a>
                    </div>
                    <div class="copyright">
                        <span>版权声明：</span>本博客所有文章除特别声明外，均采用 <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.en">BY-NC-SA</a> 许可协议。转载请注明出处！
                    </div>
                </el-card>
                <!-- 底部标签区 -->
                <div class="foot-tag">
                    <router-link to="/tags" class="foot-tag-item" v-for="tag in blog.tags" :key="tag.id">
                        <i class="iconfont icon-tags">{{ tag.name }}</i>
                    </router-link>
                </div>
            </el-card>
            <!-- 评论区 -->
            <el-card class="comment">
                <el-input v-model="commentForm.name" placeholder="请输入昵称" prefix-icon="iconfont icon-person"></el-input>
                <el-input v-model="commentForm.email" placeholder="请输入邮箱" prefix-icon="iconfont icon-youxiang"></el-input>
                <el-input 
                type="textarea" 
                placeholder="请输入内容" 
                :rows="6"
                v-model="commentForm.content"></el-input>
                <el-button type="primary" size="mini">发布</el-button>
                <div class="comment-tips">来评论吧~~~</div>
            </el-card>
        </el-col>
        <el-col :xs="0" :md="6" :lg="6">
            <generInfo/>
        </el-col>
    </el-row>
</template>

<script>
import generInfo from '../components/generInfo.vue'
import Prism from 'prismjs'
export default {
    name: 'detail',
    components: {
        generInfo,
    },
    async created() {
        await this.getBlog()
        // 这里使公式和代码格式化并不放在mounted中，因为created和mounted钩子使异步执行的
        // 可能会存在数据还未获取就渲染页面的情况
        Prism.highlightAll()
        this.$formula(this.$refs.contentRef)
    },
    mounted() {
    },
    data() {
        return {
            commentForm:{
                name: '',
                email: '',
                content: '',
            },
            blog:{},
        }
    },
    methods: {
        async getBlog() {
            const {data: res} = await this.$http.get(`public/blog/${this.$route.params.blogId}`)
            console.log(res)
            if (res.meta.status === 200) {
                this.blog = res.data
            } else {
                this.$message.error('获取博客数据失败:', res.meta.msg)
            }
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
        line-height: 2;
        font-size: 28px;
        color: #444950;
        font-weight: bold;
    }
    .subtitle{
        text-align: center;
        font-size: 16px;
        div{
            display: inline-block;
            margin-right: 15px;
        }
        div:nth-child(2){
            color: #409eff;
        }
    }
    .thanks{
        text-align: center;
        color: #ccd0d5;
        font-size: 16px;
        padding: 20px;
    }
    .footer{
        line-height: 2;
        span{
            font-weight: bold;
        }
        a{
            color: #409eff;
        }
    }
    .foot-tag{
        .foot-tag-item{
            display: inline-block;
            padding: 10px;
            color: #409eff;
            font-size: 28px;
            margin-top: 10px;
        }
        .foot-tag-item:hover{
            color: rgb(240, 62, 38);
        }
    }
    .comment{
        margin-top: 20px;
        .el-input{
            margin: 10px 10px 10px 0;
        }
        .el-input:first-child{
            width: 30%;
        }
        .el-input:nth-child(2){
            width: 30%;
        }
        .el-button{
            margin: 10px 10px 20px auto;
            float: right;
        }
        .comment-tips{
            text-align: center;
            color: #ccd0d5;
            font-size: 16px;
            padding: 20px;
        }
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