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
                    <el-menu-item 
                    :index="`/blogAdmin/${this.$route.params.id}/publish`">
                        <i class="el-icon-s-home"></i>
                        <span slot="title">发布</span>
                    </el-menu-item>
                    <el-menu-item 
                    :index="`/blogAdmin/${this.$route.params.id}/manage`">
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
                        <el-avatar v-if="userInfo.avatar" :src="userInfo.avatar"></el-avatar>
                        <el-avatar v-else src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="home">首页</el-dropdown-item>
                        <el-dropdown-item command="modify">修改个人信息</el-dropdown-item>
                        <el-dropdown-item command="upload">上传头像</el-dropdown-item>
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

        <!-- 修改用户信息对话框 -->
        <el-dialog
        title="修改个人信息"
        :visible.sync="modifyDialogVisible"
        width="50%"
        @close="handleModifyDialogClose">
            
            <el-form :model="userInfo" :rules="userFormRules" ref="userFormRef" label-width="130px">
                <el-form-item label="用户名" prop="username">
                    <el-input disabled v-model="userInfo.username"></el-input>
                </el-form-item>
                <el-form-item label="昵称" prop="nickname">
                    <el-input v-model="userInfo.nickname"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="userInfo.password"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="userInfo.email"></el-input>
                </el-form-item>
                <el-form-item label="座右铭" prop="moto">
                    <el-input v-model="userInfo.moto"></el-input>
                </el-form-item>
                <el-form-item label="个人信息(请使用markdown格式)" prop="description">
                    <el-input type="textarea" :rows="6" v-model="userInfo.description"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="modifyDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="modifyUserInfo">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 上传头像对话框 -->
        <el-dialog
        title="上传头像"
        :visible.sync="uploadDialogVisible"
        width="50%">
            <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :headers="uploadHeader">
                <img v-if="userInfo.avatar" :src="userInfo.avatar" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-dialog>

    </div>
</template>

<script>
export default {
    name: 'blogAdmin',
    created() {
        this.getUserInfo()
        this.activeIndex = this.$route.path
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
            activeIndex: "",
            userInfo: {},
            // 修改用户信息对话框
            modifyDialogVisible: false,
            userFormRules: {
                nickname: [
                    { required: true, message: '请输入昵称', trigger: 'blur' },
                    { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                    {validator: checkEmail, trigger: 'blur'},
                ],
                moto: [
                    { required: true, message: '请输入座右铭', trigger: 'blur' },
                ],
                description: [
                    { required: true, message: '请输入个人描述', trigger: 'blur' },
                ],
            },
            // 上传用户头像对话框
            uploadDialogVisible: false,
            // 头像上传地址
            uploadUrl: 'http://localhost:8082/private/user/upload',
            // 头像上传时添加token头部
            uploadHeader: {
                Authorization: window.sessionStorage.getItem('token')
            }
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
                this.modifyDialogVisible = true
            } else if (command === 'upload') {
                this.uploadDialogVisible = true
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
        },
        // 取消修改个人信息
        handleModifyDialogClose() {
            this.getUserInfo()
            this.$refs.userFormRef.resetFields()
        },
        // 确定修改个人信息
        modifyUserInfo() {
            this.$refs.userFormRef.validate(async valid => {
                if (!valid) {
                    return
                }
                // 注意，这里要使用await，不然可能更新请求还未上传就触发了对话框关闭事件
                await this.uploadUserInfo()
                this.modifyDialogVisible = false
            })
        },
        handleAvatarSuccess(res, file) {
            console.log(res)
            this.userInfo.avatar = res.path
            this.uploadUserInfo()
        },
        // 更新用户全部信息
        async uploadUserInfo() {
            const {data: res} = await this.$http.put(`private/user/${this.$route.params.id}`, this.userInfo)
            if (res.meta.status !== 200) {
                return this.$message.error('更新个人信息失败：' + res.meta.msg)
            }
            this.$message.success('更新个人信息成功！')
        },
        // 头像文件上传前验证
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg'
            const isLt2M = file.size / 1024 / 1024 < 2

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!')
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!')
            }
            return isJPG && isLt2M
        },

    },
    // 监听路由路径变化，改变当前导航栏激活项
    watch: {
        '$route.path': function(val) {
            console.log("current router path:", val)
            this.activeIndex = val
        }
    }
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
            font-size: 16px;
            padding-top: 5px;
            color: #eee;
        }   
    }
    .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
    
</style>