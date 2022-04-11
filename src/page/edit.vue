<template>
    <el-card shadow="never" class="container">
        <div class="title">
            编辑博客 -- {{ blog.title }}
        </div>
        <el-form ref="blogFormRef" :model="blog" :rules="blogFormRules">
            <el-form-item prop="title">
                <el-input placeholder="请输入标题" v-model="blog.title">
                    <el-select v-model="blog.flag" slot="prepend" placeholder="请选择">
                        <el-option label="原创" value="原创"></el-option>
                        <el-option label="转载" value="转载"></el-option>
                        <el-option label="翻译" value="翻译"></el-option>
                    </el-select>
                </el-input>
            </el-form-item>
            <!-- 博客摘要 -->
            <el-form-item prop="description">
                <el-input
                type="textarea"
                autosize
                placeholder="请输入博客摘要"
                v-model="blog.description">
                </el-input>
            </el-form-item>
            <!-- markdown编辑器 -->
            <el-form-item prop="content">
                <mavon-editor v-model="blog.content" ref="mdEditor" @imgAdd="mdImgAdd"/>
            </el-form-item>
            <el-form-item>
                <el-checkbox label="开启赞赏" v-model="blog.appreciation"></el-checkbox>
                <el-checkbox label="开启评论" v-model="blog.commentEnable"></el-checkbox>
                <el-checkbox label="推荐本文" v-model="blog.recommend"></el-checkbox>
                <el-checkbox label="转载声明" v-model="blog.shareStatement"></el-checkbox>
            </el-form-item>
            <!-- 分类和标签 -->
            <el-form-item class="inline-item" prop="typeId">
                <el-select 
                v-model="blog.typeId" 
                clearable 
                placeholder="请选择分类" 
                style="width:260px">
                    <el-option
                    v-for="item in cateList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="inline-item" prop="tagId">
                <el-select 
                v-model="blog.tagId" 
                multiple 
                placeholder="请选择标签"
                style="width:460px">
                    <el-option
                    v-for="item in tagList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <!-- 上传文章首页图 -->
        <el-upload
        class="upload-first-picture"
        :action="uploadUrl"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :file-list="fileList"
        :headers="uploadHeader"
        list-type="picture">
            <el-button size="small" type="primary">点击上传文章首图</el-button>
        </el-upload>
        <div class="form-confirm">
            <el-button type="primary" size="small" @click="saveBlog">保存</el-button>
            <el-button type="primary" size="small" @click="publishBlog">发布</el-button>
        </div>

        <!-- 预览图片对话框 -->
        <el-dialog
        title="预览文章首图"
        :visible.sync="previewDialogVisible"
        width="50%">
            <img :src="blog.firstPicture" alt="首图" style="width:100%">
        </el-dialog>
    </el-card>
</template>

<script>
export default {
    name: 'name',
    created() {
        this.getAllCates()
        this.getAllTags()
        this.getBlog()
    },
    data() {
        return {
            // 记录博客的全部信息
            blog: {},
            fileList:[],
            // 文件上传地址
            uploadUrl: this.$http.defaults.baseURL + 'private/blog/upload',
            // uploadUrl: "http://localhost:8082/private/blog/upload",
            // 上传文件时的头部
            uploadHeader: {
                Authorization: window.sessionStorage.getItem('token')
            },
            // 分类列表数据
            cateList: [],
            // 标签列表数据
            tagList: [],
            // 博客验证规则
            blogFormRules: {
                title: [
                    { required: true, message: '请输入标题', trigger: 'blur' },
                ],
                description: [
                    { required: true, message: '请输入博客摘要', trigger: 'blur' },
                ],
                content: [
                    { required: true, message: '博客内容不能为空' },
                ],
                typeId: [
                    { required: true, message: '必须选择分类', trigger: 'blur' },
                ],
                tagId: [
                    { required: true, message: '必须选择标签', trigger: 'blur' },
                ],
            },
            previewDialogVisible: false,

        }
    },
    methods: {
        handleRemove(file, fileList){
            console.log(file, fileList)
            this.blog.firstPicture = ''
        },
        handleSuccess(response, file) {
            console.log(response)
            this.blog.firstPicture = response.path
        },
        handlePreview(file) {
            console.log(file)
            this.previewDialogVisible = true;
        },
        // 获取所有分类
        async getAllCates() {
            const {data: res} = await this.$http.get('public/categories')
            console.log(res)
            if (res.meta.status === 200) {
                this.cateList = res.data
            }
        },
        // 获取所有标签
        async getAllTags() {
            const {data: res} = await this.$http.get('public/tags')
            console.log(res)
            if (res.meta.status === 200) {
                this.tagList = res.data
            }
        },
        // 获取当前编辑的博客信息
        async getBlog() {
            console.log(this.$route.params)
            const {data: res} = await this.$http.get(`/public/blog/raw/${this.$route.params.blogId}`)
            console.log(res)
            if (res.meta.status !== 200) {
                return this.$message.error('获取博客信息失败：', res.meta.msg)
            }
            this.blog = res.data
        },
        async saveBlog() {
            this.blog.published = false
            this.uploadBlog()
        },
        publishBlog() {
            this.blog.published = true
            this.uploadBlog()
        },
        uploadBlog() {
            this.$refs.blogFormRef.validate(async valid => {
                if (!valid) {
                    this.$message.error("请填写必要字段！")
                    return
                }
                const {data: res} = await this.$http.put('/private/blog', this.blog)
                console.log(res)
                if (res.meta.status !== 200) {
                    this.$message.error("上传失败：", res.meta.msg)
                    return
                }
                this.$message.success("上传成功！")
                this.$router.push(`/blogAdmin/${this.$route.params.id}/manage`)
            })
        },
        // markdown编辑器添加图片时的回调
        async mdImgAdd(pos, file) {
            const formdata = new FormData()
            formdata.append('file', file)
            const {data: res} = await this.$http({
                url: 'http://localhost:8082/private/blog/upload',
                method: 'post',
                data: formdata,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': window.sessionStorage.getItem('token')
                }
            })
            console.log(res)
            if (res.meta.status !== 200) {
                this.$message.error('图片上传失败：', res.meta.msg)
                return
            }
            this.$refs.mdEditor.$img2Url(pos, res.path)
        }
    }
}
</script>

<style lang='less' scoped>
    .container{
        margin-top: 20px;
        .title{
            text-align: center;
            line-height: 2;
            font-size: 28px;
            color: #444950;
            font-weight: bold;
        }
    }
    .el-select{
        width: 100px;
    }
    .form-confirm{
        display: flex;
        justify-content: flex-end;
        margin-top: 20px;
    }
    .inline-item{
        display: inline-block;
        margin-right: 10px;
    }
</style>