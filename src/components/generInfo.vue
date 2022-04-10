// 网站基本信息组件
<template>
    <!-- 右侧第一个卡片，显示网站基本信息 -->
    <el-card class="general-info">
        <div class="avatar">
            <img :src="userInfo.avatar" alt="">
        </div>
        <div class="moto">
            {{ userInfo.moto }}
        </div>
        <div class="social">
            <a href="https://github.com/xiaoqieF" target="_blank" class="social-item"><i class="iconfont icon-github"></i></a>
            <a href="mailto:17374527@buaa.edu.cn" target="_blank" class="social-item"><i class="iconfont icon-youxiang"></i></a>
        </div>
        <!-- 统计信息 -->
        <div class="state">
            <router-link class="state-item" to="/archives">
                <div>{{siteInfo.archivesNum}}</div>
                <div>归档</div>
            </router-link>
            <router-link class="state-item" to="/categories">
                <div>{{siteInfo.categoriesNum}}</div>
                <div>分类</div>
            </router-link>
            <router-link class="state-item" to="/tags">
                <div>{{siteInfo.tagsNum}}</div>
                <div>标签</div>
            </router-link>
        </div>
    </el-card>
</template>

<script>
export default {
    name: "generInfo",
    created() {  
        this.getUserInfo()
        this.getSiteInfo()
    },
    data() {
        return {
            userInfo: {},
            siteInfo: {
                archivesNum: 0,
                categoriesNum: 0,
                tagsNum: 0,
            }
        }
    },
    methods: {
        // 获取用户信息
        async getUserInfo() {
            const {data: res} = await this.$http.get(`public/user/default`)
            if (res.meta.status !== 200) {
                this.$message.error("获取用户信息失败：" + res.meta.msg)
                return
            }
            console.log(res.data)
            this.userInfo = res.data
        },
        // 获取网站基本信息
        async getSiteInfo() {
            const {data: res} = await this.$http.get(`public/statistics`)
            if (res.meta.status !== 200) {
                this.$message.error("获取网站信息失败：" + res.meta.msg)
                return
            }
            console.log(res.data)
            this.siteInfo = res.data
        },
    }
}
</script>

<style lang='less' scoped>
    .general-info{
        .avatar{
            text-align: center;
            width: 100px;
            height: 100px;
            border-radius: 50%;
            border: 1px solid #eee;
            box-shadow: 0 0 10px #ddd;
            margin: auto;
            overflow: hidden;
            img{
                width: 100%;
            }
        }
        .avatar:hover{
            animation: bounce; /* referring directly to the animation's @keyframe declaration */
            animation-duration: 1s; /* don't forget to set a duration! */
        }
        .moto{
            text-align: center;
            font-weight: 800;
            padding: 20px;
        }
        .social{
            text-align: center;
            .iconfont{
                color: #444;
                font-size: 30px !important;
            }
            .iconfont:hover{
                color: #409eff;
            }
        }
    }
    .state{
        display: flex;
        justify-content: space-around;
        margin-top: 20px;
        .state-item{
            display: inline-block;
            width: 33%;
            text-align: center;
            div:first-child{
                color: #444950;
                font-weight: bold;
                font-size: 20px;
            }
            div:nth-child(2){
                color: #409eff;
                margin-top: 5px;
                font-size: 18px;
            }
        }
        // 选择前两个元素添加边框
        .state-item:nth-child(-n+2){
            border-right: 1px dashed #444;
        }
        
    }
    .iconfont{
        margin-right: 5px;
    }
</style>