<template>
    <!-- 博客列表：标题，信息，摘要 -->
    <el-card :shadow="shadow">
        <!-- 标题 -->
        <div class="title">
            <router-link :to="`/detail/${blogInfo.id}`">{{ blogInfo.title }}</router-link>
        </div>
        <!-- 文章信息（发表时间、阅读次数等） -->
        <div class="subtitle">
            <div><i class="el-icon-edit-outline"></i><span> 发表于 {{blogInfo.createTime | dateFormat}}</span></div>
            <div><i class="el-icon-edit-outline"></i><span> 更新于 {{blogInfo.updateTime | dateFormat}}</span></div>
            <div><i class="el-icon-view"></i><span> 阅读次数 {{ blogInfo.views }}</span></div>
        </div>
        
        <p class="content">{{ blogInfo.description }}</p>
        <div class="btn">
            <el-button type="primary" @click="toDetail">阅读原文<i class="el-icon-right"></i></el-button>
        </div>
    </el-card>
</template>

<script>
export default {
    props:['shadow', 'blogInfo'],
    name: 'blogSummary',
    methods: {
        toDetail() {
            this.$router.push(`/detail/${this.blogInfo.id}`)
        }
    },
}
</script>

<style lang='less' scoped>
    .title{
        text-align: center;
        line-height: 2;
        a{
            font-size: 28px;
            color: #444950;
            font-weight: bold;
        }
        a:hover{
            color: #409eff;
        }
    }
    .subtitle{
        text-align: center;
        font-size: 16px;
        div{
            display: inline-block;
            margin-right: 15px;
        }
        div:nth-child(2){
            color: #409eff;
        }
    }
    
    .content{
        line-height: 2;
        font-size: 16px;
    }
    .btn{
        display: flex;
        justify-content: center;
    }
</style>