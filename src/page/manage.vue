<template>
    <el-card shadow="never" class="container">
        <div class="title">
            博客管理
        </div>
        <!-- 博客清单 -->
        <el-table
        :data="blogList"
        stripe
        style="width: 100%">
            <el-table-column
            type="index"
            width="50">
            </el-table-column>
            <el-table-column
            prop="date"
            label="日期"
            width="180">
            </el-table-column>
        </el-table>
        <!-- 分类和标签 -->
        <div class="cate-tag">
            <div class="title">
                分类 &amp; 标签管理
            </div>
            <div class="content">
                <!-- 分类管理 -->
                <el-card shadow="never" class="cate">
                    <div class="cate-tag-title">
                        分类
                    </div>
                    <div class="cate-content">
                        <el-tag 
                        v-for="item in cateList" 
                        :key="item.id" 
                        closable 
                        @close="handleCateClose(item.id)">
                            {{ item.name }}
                        </el-tag>
                        <el-input
                        class="input-new-tag"
                        v-if="cateInputVisible"
                        v-model="cateInputValue"
                        ref="saveCateInput"
                        size="small"
                        @keyup.enter.native="handleCateInputConfirm"
                        @blur="handleCateInputConfirm">
                        </el-input>
                        <el-button v-else size="small" @click="showCateInput">+ 添加分类</el-button>
                    </div>
                </el-card>
                <!-- 标签管理 -->
                <el-card shadow="never" class="tag">
                    <div class="cate-tag-title">
                        标签
                    </div>
                    <div class="tag-content">
                        <el-tag v-for="item in tagList" 
                        :key="item.id" 
                        closable 
                        @close="handleTagClose(item.id)"
                        type="success">
                            {{ item.name }}
                        </el-tag>
                        <el-input
                        class="input-new-tag"
                        v-if="tagInputVisible"
                        v-model="tagInputValue"
                        ref="saveTagInput"
                        size="small"
                        @keyup.enter.native="handleTagInputConfirm"
                        @blur="handleTagInputConfirm">
                        </el-input>
                        <el-button v-else size="small" @click="showTagInput">+ 添加标签</el-button>
                    </div>
                </el-card>
            </div>
        </div>
    </el-card>
</template>

<script>
export default {
    name: 'manage',
    created(){
        this.getAllCates()
        this.getAllTags()
    },
    data() {
        return {
            // 全部分类列表
            cateList: [],
            // 全部标签列表
            tagList:[],
            blogList: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
                }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
                }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }],
            // 分类添加tag框
            cateInputVisible: false,
            cateInputValue: '',
            // 标签添加tag框
            tagInputVisible: false,
            tagInputValue: '',
        }
    },
    methods: {
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
        // 添加分类框确认回调
        async handleCateInputConfirm(){
            if (this.cateInputValue.trim() === '') {
                this.cateInputValue = ''
                this.cateInputVisible = false
                return
            }
            const {data: res} = await this.$http.post('private/categories', {
                name: this.cateInputValue
            })
            console.log(res)
            if (res.meta.status !== 200) {
                this.$message.error('添加分类失败：' + res.meta.msg)
                this.cateInputVisible = false
                this.cateInputValue = ''
                return
            }
            this.getAllCates()
            this.$message.success('添加分类成功！')
            this.cateInputVisible = false
            this.cateInputValue = ''
        },
        // 显示输入分类输入框
        showCateInput() {
            this.cateInputVisible = true
            this.$nextTick(_ => {
                this.$refs.saveCateInput.$refs.input.focus()
            })
        },
        // 删除分类时回调
        async handleCateClose(cateId) {
            console.log("cateId:", cateId)
            const {data: res} = await this.$http.delete(`private/categories/${cateId}`)
            console.log(res)
            if (res.meta.status !== 200) {
                this.$message.error('删除分类失败：' + res.meta.msg)
                return
            }
            this.$message.success('删除分类成功！')
            this.getAllCates()
        },
        // 添加标签框确认回调
        async handleTagInputConfirm(){
            if (this.tagInputValue.trim() === '') {
                this.tagInputValue = ''
                this.tagInputVisible = false
                return
            }
            const {data: res} = await this.$http.post('private/tags', {
                name: this.tagInputValue
            })
            console.log(res)
            if (res.meta.status !== 200) {
                this.$message.error('添加标签失败：' + res.meta.msg)
                this.tagInputVisible = false
                this.tagInputValue = ''
                return
            }
            this.getAllTags()
            this.$message.success('添加标签成功！')
            
            this.tagInputVisible = false
            this.tagInputValue = ''
        },
        showTagInput() {
            this.tagInputVisible = true
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus()
            })
        },
        // 删除标签回调
        async handleTagClose(tagId) {
            console.log("cateId:", tagId)
            const {data: res} = await this.$http.delete(`private/tags/${tagId}`)
            if (res.meta.status !== 200) {
                this.$message.error('删除标签失败：' + res.meta.msg)
                return
            }
            this.$message.success('删除标签成功！')
            this.getAllTags()
        }
    },
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
    .cate-tag{
        margin-top: 20px;
        .cate-tag-title{
            font-weight: bold;
            font-size: 20px;
            padding-bottom: 10px;
            margin-bottom: 10px;
            border-bottom: 1px solid #ccc;
        }
        .el-tag{
            margin-right: 10px;
            margin-bottom: 10px;
        }
        .tag{
            margin-top: 20px;
        }
        .input-new-tag{
            width: 90px;
        }
    }
    
</style>