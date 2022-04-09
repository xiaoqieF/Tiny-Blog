<template>
    <el-row class="container" :gutter="20">
        <el-col :xs="24" :md="18" :lg="18">
            <el-card>
                <!-- 文章首图 -->
                <img v-if="blog.firstPicture" :src="blog.firstPicture" alt="" style="width:100%">
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
            <el-card v-if="blog.commentEnable" class="comment">
                <el-card shadow='never'>
                    <div class="comment-title">
                        评论区
                    </div>
                    <div class="comment-item" v-for="comment in comments" :key="comment.id">
                        <div class="parent-comment">
                            <el-avatar v-if="comment.avatar" :src='comment.avatar'></el-avatar>
                            <el-avatar v-else src='https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'></el-avatar>
                            <div class="comment-main">
                                <div class="comment-info">
                                    <div class="nickname">{{ comment.nickname }}</div>
                                    <div class="create-time">{{ comment.createTime | dateFormat }}</div>
                                </div>
                                <div class="comment-content">
                                    {{ comment.content }}
                                </div>
                            </div>
                            <div class="reply" @click="onReply(comment.id, comment.nickname)">
                                回复
                            </div>
                            
                        </div>
                        <div class="child-comment" v-for="childComment in comment.replyComments" :key="childComment.id">
                            <el-avatar src='https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'></el-avatar>
                            <div class="comment-main">
                                <div class="comment-info">
                                    <div class="nickname">{{ childComment.nickname }}</div>
                                    <div class="create-time">{{ childComment.createTime | dateFormat }}</div>
                                </div>
                                <div class="comment-content">
                                    {{ childComment.content }}
                                </div>
                            </div>
                            <div class="reply" @click="onReply(childComment.id, childComment.nickname)">
                                回复
                            </div>
                        </div>
                    </div>
                </el-card>
                <el-card shadow='never'>
                    <el-form 
                    :model="commentForm" 
                    :rules="commentFormRules" 
                    ref="commentFormRef">
                        <el-form-item prop="nickname" class="comment-name">
                            <el-input 
                            v-model="commentForm.nickname" 
                            placeholder="请输入昵称" 
                            prefix-icon="iconfont icon-person"></el-input>
                        </el-form-item>
                        <el-form-item prop="email" class="comment-email">
                            <el-input 
                            v-model="commentForm.email" 
                            placeholder="请输入邮箱" 
                            prefix-icon="iconfont icon-youxiang"></el-input>
                        </el-form-item>
                        <el-form-item prop="content">
                            <el-input 
                            ref="commentContentRef"
                            type="textarea" 
                            :placeholder="commentPlaceholder" 
                            :rows="6"
                            v-model="commentForm.content"></el-input>
                        </el-form-item>
                    </el-form>
                    <el-button type="primary" size="mini" @click="publishComment">发布</el-button>
                    <el-button type="info" size="mini" @click="clearComment">重置</el-button>
                    <div class="comment-tips">来评论吧~~~</div>
                </el-card>
            </el-card>
        </el-col>
        <el-col ref="sideRef" :xs="0" :md="6" :lg="6">
            <generInfo/>
            <!-- 目录区域 -->
            <el-card :class="dirClass" ref="dirRef">
                <div class="dir-title">
                    目录
                </div>
                <!-- 目录内容，由tocbot生成 -->
                <div class="dir-content">
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
import generInfo from '../components/generInfo.vue'
import Prism from 'prismjs'
import * as tocbot from 'tocbot'
export default {
    name: 'detail',
    components: {
        generInfo,
    },
    async created() {
        await this.getBlog()
        this.getComment()
        // 这里使公式和代码格式化并不放在mounted中，因为created和mounted钩子使异步执行的
        // 可能会存在数据还未获取就渲染页面的情况
        Prism.highlightAll()
        this.$formula(this.$refs.contentRef)
        tocbot.init({
            // Where to render the table of contents.
            tocSelector: '.dir-content',
            // Where to grab the headings to build the table of contents.
            contentSelector: '.content',
            // Which headings to grab inside of the contentSelector element.
            headingSelector: 'h1, h2, h3',
            // For headings inside relative or absolute positioned containers within content.
            hasInnerContainers: true,
        });
        this.increaseViews()
    },
    mounted() {
        window.addEventListener('scroll', this.scrollHandler)
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.scrollHandler)
    },
    data() {
        // 自定义邮箱验证规则
        var checkEmail = (rule, value, callback) => {
            var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
            if (reg.test(value)){
                callback();
            }
            callback(new Error('邮箱格式错误'));
        };
        return {
            commentForm:{
                nickname: '',
                email: '',
                content: '',
                parentCommentId: -1,
                blogId: this.$route.params.blogId,
            },
            commentFormRules: {
                nickname: [
                    { required: true, message: '请输入昵称', trigger: 'change'},
                ],
                content: [
                    { required: true, message: '请输入评论内容', trigger: 'change'},
                ],
                email: [
                    { required: true, message: '请输入邮箱', trigger: 'change'},
                    {validator: checkEmail, message:'请输入正确的邮箱', trigger: 'change'},
                ],
            },
            commentPlaceholder: "请输入内容",
            // 博客信息
            blog:{},
            // 目录标签的所属类，用于改变样式
            dirClass: '',
            comments:[],
        }
    },
    methods: {
        // 获取当前页的博客信息
        async getBlog() {
            const {data: res} = await this.$http.get(`public/blog/${this.$route.params.blogId}`)
            console.log(res)
            if (res.meta.status === 200) {
                this.blog = res.data
            } else {
                this.$message.error('获取博客数据失败:', res.meta.msg)
            }
        },
        // 获取当前页的评论信息
        async getComment() {
            const {data: res} = await this.$http.get(`public/comment/${this.$route.params.blogId}`)
            console.log(res)
            if (res.meta.status === 200) {
                this.comments = res.data
            } else {
                this.$message.error('获取评论数据失败:', res.meta.msg)
            }
            this.comments.forEach(comment => {
                // 对每个一级评论的子评论进行扁平化处理
                // 处理之后，评论只有两级
                comment.replyComments = this.traverse(comment.nickname, comment.replyComments)
            });
            console.log(this.comments)
        },

        /**
         * 将多级评论转化为数组评论，并在评论内容前加上对应的 @fatherName
         * @param comments 需要扁平化处理的评论数组(多级评论)
         * @param fatherName 当前评论数组的父亲名称
         * @return 一级的评论数组
         */
        traverse(fatherName, comments) {
            if (comments.length === 0) {
                return []
            }
            let results = []
            comments.forEach( comment => {
                comment.content = `@${fatherName}：${comment.content}`
                results.push(comment)
                results = [...results, ...this.traverse(comment.nickname, comment.replyComments)]
                // 遍历完孩子之后，将孩子置为空
                comment.replyComments = []
            })
            return results
        },
        scrollHandler(event) {
            // console.log(this.$refs.sideRef)
            // 根据目录标签距离顶部距离来实现贴合效果
            if (this.$refs.sideRef.$el.getBoundingClientRect().top < -250) {
                this.dirClass = 'dir-sticky'
            } else {
                this.dirClass = ''
            }
        },
        // 发布评论
        publishComment() {
            this.$refs.commentFormRef.validate(async valid => {
                if (!valid) {
                    return
                }
                const {data: res} = await this.$http.post('/public/comment', this.commentForm)
                console.log(res)
                if (res.meta.status !== 200) {
                    this.$message.error('发布评论失败！', res.meta.msg)
                }
                this.$message.success('发布成功！')
                this.getComment()
            })
        },
        // 重置评论
        clearComment() {
            this.commentForm.content = ''
            this.commentForm.parentCommentId = -1
            this.commentPlaceholder = "请输入内容"
        },
        // 点击回复时触发的回调
        onReply(parentId, parentNickName) {
            console.log(parentId, parentNickName)
            this.commentForm.parentCommentId = parentId
            this.commentPlaceholder = `@${parentNickName}`
            this.$refs.commentFormRef.$el.scrollIntoView({behavior:'smooth'})
        },
        // 增加一个阅读量
        async increaseViews() {
            const {data: res} = await this.$http.post(`/public/blog/view/${this.$route.params.blogId}`)
                console.log(res)
        }
    },
}
</script>

<style lang='less' scoped>
    @import '../style/tocbot.css';
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
        .comment-item{
            margin-bottom: 40px;
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
        .comment-name, .comment-email{
            display: inline-block;
            margin-right: 10px;
        }
    }

    .reply{
        font-size: 14px;
        color: #ff8956;
        cursor: pointer;
    }

    .comment-title{
        font-size: 24px;
        font-weight: 600;
        color: #444950;
        margin-bottom: 20px;
        padding-left: 20px;
        border-left: 4px solid #ff8956;
    }

    .parent-comment{
        display: flex;
    }

    .comment-main{
        display: inline-block;
        margin-left: 20px;
        color: #409eff;
        .create-time{
            font-size: 14px;
            color: #ccd0d5;
            margin-top: 10px;
        }
    }
    .comment-content{
        color: #444950;
        margin-top: 10px;
    }

    .child-comment{
        display: flex;
        margin-top: 20px;
        padding-left: 60px;
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
    .dir-sticky{
        position: fixed;
        top: 60px;
    }
    .dir-title{
        padding-left: 10px;
        font-size: 18px;
        border-left: 4px solid #409eff;
    }
</style>