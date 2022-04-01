<template>
    <el-card shadow="never" class="container">
        <div class="title">
            博客管理
        </div>
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
</style>