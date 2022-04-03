<template>
    <div class="container">
        <el-row class="header">
            <el-col :span="4" class="admin-logo">
                <div class="logo-content">
                    博客后台管理系统
                </div>
            </el-col>
            <!-- 导航栏 -->
            <el-col :span="12">
                <el-menu
                :default-active="activeIndex"
                mode="horizontal"
                background-color= "#333"
                text-color="#fff"
                active-text-color="#fff"
                router>
                    <!-- 这里使用了路由路径参数，其值为用户的id -->
                    <el-menu-item :index="`/blogAdmin/${this.$route.params.id}/publish`">
                        <i class="el-icon-s-home"></i>
                        <span slot="title">发布</span>
                    </el-menu-item>
                    <el-menu-item :index="`/blogAdmin/${this.$route.params.id}/manage`">
                        <i class="el-icon-folder-opened"></i>
                        <span slot="title">管理</span>
                    </el-menu-item>
                
                </el-menu>
            </el-col>
            <!-- 头像 -->
            <el-col :span="4" :offset="2">
                <!-- <el-avatar style="float:right" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar> -->
                <div class="header-right">
                    <el-dropdown @command="handleCommand">
                    <span>
                        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="home">首页</el-dropdown-item>
                        <el-dropdown-item command="modify">修改个人信息</el-dropdown-item>
                        <el-dropdown-item command="logOut">注销</el-dropdown-item>
                    </el-dropdown-menu>
                    </el-dropdown>
                    <div class="welcome-user">欢迎你：{{ this.userInfo.nickname }}</div>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <!-- 中央区域 -->
            <el-col :span="18" :offset="3" :xl="{span:14, offset:5}">
                <router-view></router-view>
            </el-col>
        </el-row>
        <!-- 底部信息 -->
        <div class="footer">
            <el-row class="footer-info">
                <el-col :span="6" :offset="3" class="contact">
                    <div class="small-title">联系我</div>
                    <div>邮箱：17374527@buaa.edu.cn</div>
                    <div>QQ：910568227</div>
                </el-col>
                <el-col :span="12" class="about">
                    <div class="small-title">Blog</div>
                    <div>这是 <el-link href="#">小切</el-link> 的个人博客，用于分享学习笔记和个人心得。内容主要关于前后端开发、编程基础知识等。希望阅读的朋友能有所收获。</div>
                </el-col>
            </el-row>
            <div class="copyright">
                <span>Copyright © 2021~2022 | </span> <el-link target="_blank" href="https://beian.miit.gov.cn/#/Integrated/index">京ICP备2021039158号-1</el-link>
            </div>
            <div>
                <span>Designed by 小切</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'blogAdmin',
    created() {
        this.getUserInfo()
    },
    data() {
        return {
            activeIndex: '/manage',
            userInfo: {},
        }
    },
    methods: {
        // 头像下拉菜单回调
        handleCommand(command) {
            console.log(command)
            if (command === 'home') {
                this.$router.push('/home')
            } else if (command === 'logOut') {
                window.sessionStorage.removeItem('token')
                this.$router.push('/admin')
            } else if (command === 'modify') {

            }
        },
        // 获取用户信息
        async getUserInfo() {
            const {data: res} = await this.$http.get(`private/user/${this.$route.params.id}`)
            if (res.meta.status !== 200) {
                this.$message.error("获取用户信息失败：" + res.meta.msg)
                return
            }
            console.log(res.data)
            this.userInfo = res.data
        }
    },
}
</script>

<style lang='less', scoped>
    .container{
        height: 100%;
    }
    .header, .footer{
        background-color: #333;
    }
    .el-menu{
        border-bottom: 0;
    }
    .global_search{
        margin-top: 10px;
    }
    .el-avatar{
        float: right;
        margin-right: 20px;
        margin-top: 10px;
        
    }
    .footer{
        height: 200px;
        width: 100%;
        margin-top: 100px;
        text-align: center;
        color: #aaa;
        font-size: 16px;
        .el-link{
            font-size: 16px;
            color: rgb(243, 75, 75);
        }
        .footer-info{
            padding-top: 20px;
            font-size: 14px;
            .contact{
                border-right: 1px solid #555;
            }
            .about{
                padding: 0 20px;
            }
        }
        .copyright{
            padding-top: 20px;
            margin-top: 20px;
        }
        .small-title{
            color: #eee;
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 5px;
        }
    }
    .logo-content{
        text-align: center;
        color: #409eff;
        font-size: 20px;
        font-weight: bold;
        padding: 15px 0;
        height: 100%;
    }
    .header-right{
        display: flex;
        justify-content: center;
        align-items: center;
        .welcome-user{
            font-size: 18px;
            padding-top: 5px;
            color: #eee;
        }   
    }
</style>