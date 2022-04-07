<template>
    <div class="container">
        <el-row class="header-nav" :class="navClass">
            <!-- 导航栏 -->
            <el-col :span="12" :offset="2">
                <el-menu
                :default-active="activeIndex"
                mode="horizontal"
                background-color= "transparent"
                text-color="#fff"
                active-text-color="#fff"
                router>
                <el-menu-item index="/home">
                    <i class="el-icon-s-home"></i>
                    <span slot="title">首页</span>
                </el-menu-item>
                <el-menu-item index="/archives">
                    <i class="el-icon-folder-opened"></i>
                    <span slot="title">归档</span>
                </el-menu-item>
                <el-menu-item index="categories">
                    <i class="el-icon-paperclip"></i>
                    <span slot="title">分类</span>
                </el-menu-item>
                <el-menu-item index="tags">
                    <i class="el-icon-price-tag"></i>
                    <span slot="title">标签</span>
                </el-menu-item>
                <el-menu-item index="about">
                    <i class="el-icon-user-solid"></i>
                    <span slot="title">关于</span>
                </el-menu-item>
                </el-menu>
            </el-col>
            <!-- 全局搜索 -->
            <el-col :span="4" class="global_search">
                 <el-input placeholder="请输入内容" v-model="serachInfo" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </el-col>
        </el-row>
        <!-- 背景图片 -->
        <el-row>
            <div class="back-img">
                <div class="site-name">
                    <div class="site-title">
                        小切的博客
                    </div>
                    <div class="site-sub-moto">
                        所念皆星河
                    </div>
                </div>
            </div>
        </el-row>
        <el-row>
            <!-- 中央区域 -->
            <el-col :span="20" :offset="2" :xl="{span:14, offset:5}">
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
    name: 'index',
    mounted() {
        window.addEventListener('scroll', this.scrollHandler)
        this.lastHeight = window.scrollY
    },
    data() {
        return {
            activeIndex: '/home',
            // 全局搜索框内容
            serachInfo: '',
            // 滚动页面所处高度
            lastHeight: 0,
            navClass: 'header-nav-top',
        }
    },
    methods: {
        scrollHandler(event) {
            let height = event.srcElement.scrollingElement.scrollTop
            if (height > this.lastHeight) {
                // console.log('下滚')
                this.navClass = 'header-nav-down'
            } else if (height < this.lastHeight) {
                // console.log('上滚')
                this.navClass = 'header-nav-up'
            }
            if (height === 0) {
                this.navClass = 'header-nav-top'
            }
            this.lastHeight = height
        }
    }
}
</script>

<style lang="less" scoped>
    .container{
        height: 100%;
    }
    .header-nav{
        position: fixed;
        width: 100%;
        z-index: 3;
        transition: transform 0.2s linear;
    }
    .header-nav-down{
        background-color: #333;
        transform: translateY(-100%);
    }
    .header-nav-up{
        transform: translateY(0);
        background-color: #333;
    }
    .back-img{
        height: 80vh;
        background: url("../assets/background.jpg") no-repeat center/cover;
        z-index: -1;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #eee;
        .site-title{
            font-size: 4rem;
            font-weight: bold;
        }
        .site-sub-moto{
            font-size: 1.5rem;
            text-align: center;
        }
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
        background-color: #333;
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
    
    
</style>