<template>
    <div class="login_container">
        <div class="form_container">
            <!-- 头像区域 -->
            <div class="avatar">
                <img src="../assets/logo.png" alt="头像">
            </div>
            <!-- 登录表单区域 -->
            <el-form ref="loginFormRef" class="login_form" :rules="rules" :model="loginForm">
                <!-- 用户名 -->
                <el-form-item prop="username">
                    <el-input 
                        v-model="loginForm.username" 
                        prefix-icon="el-icon-user-solid">
                    </el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item prop="password">
                    <el-input 
                        v-model="loginForm.password" 
                        prefix-icon="el-icon-key"
                        type="password">
                    </el-input>
                </el-form-item>
                <!-- 登录按钮 -->
                <el-form-item class="btns">
                    <el-button type="primary" @click="login">登录</el-button>
                    <el-button type="info" @click="resetForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'login',
    data() {
        return {
            loginForm: {
                username: 'xiaoqie',
                password: '123456',
            },
            // 表单验证规则
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        // 重置表单
        resetForm(){
            this.$refs.loginFormRef.resetFields()
        },
        // 登录
        login() {
            this.$refs.loginFormRef.validate(async valid => {
                if (valid) {
                    const {data: res} = await this.$http.post('/public/login', this.loginForm)
                    console.log(res)
                    if (res.meta.status !== 200) {
                        this.$message.error('登录失败：' + res.meta.msg)
                        return
                    }
                    this.$message.success('登录成功！')
                    
                    // 登录成功时保存服务端下发的token
                    window.sessionStorage.setItem('token', res.data.token)
                    this.$router.push(`/blogAdmin/${res.data.user.id}/manage`)
                }
            })
        }
    },
}
</script>

<style lang="less" scoped>
    .login_container{
        background-color: #2b4b6b;
        height: 100vh;
    }

    .form_container{
        width: 450px;
        height: 300px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #fff;
        border: 1px solid aliceblue;
        border-radius: 10px;
    }

    .avatar{
        width: 130px;
        height: 130px;
        border: 1px solid #eee;
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 0 10px #ddd;
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #fff;
        img{
            height: 100%;
            width: 100%;
            border-radius: 50%;
            background-color: #eee;
        }
    }

    .login_form{
        width: 100%;
        position: absolute;
        bottom: 0;
        padding: 0 20px;
        // 使width包含padding
        box-sizing: border-box;
    }

    .btns{
        display: flex;
        justify-content: flex-end;
    }
</style>