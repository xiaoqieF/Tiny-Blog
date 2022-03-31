<template>
    <el-card shadow="never" class="container">
        <div class="title">
            发布博客
        </div>
        <el-form ref="form" :model="blog">
            <el-form-item>
                <el-input placeholder="请输入标题" v-model="blog.title">
                    <el-select v-model="blog.flag" slot="prepend" placeholder="请选择">
                        <el-option label="原创" value="1"></el-option>
                        <el-option label="转载" value="2"></el-option>
                        <el-option label="翻译" value="3"></el-option>
                    </el-select>
                </el-input>
            </el-form-item>
            <!-- 博客摘要 -->
            <el-form-item>
                <el-input
                type="textarea"
                autosize
                placeholder="请输入博客摘要"
                v-model="blog.description">
                </el-input>
            </el-form-item>
            <!-- markdown编辑器 -->
            <el-form-item>
                <mavon-editor v-model="blog.content"/>
            </el-form-item>
            <el-form-item>
                <el-checkbox label="开启赞赏" v-model="blog.appreciation"></el-checkbox>
                <el-checkbox label="开启评论" v-model="blog.commentEnable"></el-checkbox>
                <el-checkbox label="推荐本文" v-model="blog.recommend"></el-checkbox>
                <el-checkbox label="转载声明" v-model="blog.shareStatement"></el-checkbox>
            </el-form-item>
            <!-- 分类和标签 -->
            <el-form-item class="inline-item">
                <el-select 
                v-model="blog.cateId" 
                clearable 
                placeholder="请选择分类" 
                style="width:260px">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="inline-item">
                <el-select 
                v-model="blog.tagId" 
                multiple 
                placeholder="请选择标签"
                style="width:260px">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <el-upload
        class="upload-first-picture"
        :action="uploadUrl"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        list-type="picture">
            <el-button size="small" type="primary">点击上传文章首图</el-button>
        </el-upload>
        <div class="form-confirm">
            <el-button type="primary" size="small">保存</el-button>
            <el-button type="primary" size="small">发布</el-button>
        </div>
    </el-card>
</template>

<script>
export default {
    name: 'publish',
    data() {
        return {
            blog: {
                title: '',
                flag: '',
                content: '',
                description: '',
                appreciation: false,
                commentEnable: false,
                recommend: false,
                shareStatement: false,
                cateId: '',
                tagId:[],
            },
            fileList:[],
            // 文件上传地址
            uploadUrl: '#',
            options: [{
                value: '选项1',
                label: '黄金糕'
                }, {
                value: '选项2',
                label: '双皮奶'
                }, {
                value: '选项3',
                label: '蚵仔煎'
                }, {
                value: '选项4',
                label: '龙须面'
                }, {
                value: '选项5',
                label: '北京烤鸭'
            }],
        }
    },
    methods: {
        handleRemove(file, fileList){
            console.log(file, fileList)
        },
        handlePreview(file) {
            console.log(file)
        }
    }
}
</script>

<style lang='less', scoped>
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
    }
    .inline-item{
        display: inline-block;
        margin-right: 10px;
    }
</style>