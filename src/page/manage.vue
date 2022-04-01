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
                <el-card shadow="never" class="cate">
                    <div class="cate-tag-title">
                        分类
                    </div>
                    <div class="cate-content">
                        <el-tag closable>前端</el-tag>
                        <el-tag closable>后端</el-tag>
                        <el-tag closable>生活</el-tag>
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
                <el-card shadow="never" class="tag">
                    <div class="cate-tag-title">
                        标签
                    </div>
                    <div class="tag-content">
                        <el-tag closable type="success">Spring</el-tag>
                        <el-tag closable type="success">Servlet</el-tag>
                        <el-tag closable type="success">SpringBoot</el-tag>
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
    data() {
        return {
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
        // 添加分类框确认回调
        handleCateInputConfirm(){
            this.cateInputVisible = false
            this.cateInputValue = ''
        },
        showCateInput() {
            this.cateInputVisible = true
            this.$nextTick(_ => {
                this.$refs.saveCateInput.$refs.input.focus();
            })
        },
        handleTagInputConfirm(){
            this.tagInputVisible = false
            this.tagInputValue = ''
        },
        showTagInput() {
            this.tagInputVisible = true
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
            })
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
        }
        .tag{
            margin-top: 20px;
        }
        .input-new-tag{
            width: 90px;
        }
    }
    
</style>