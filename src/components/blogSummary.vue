<template>
    <!-- 博客列表：标题，信息，摘要 -->
    <el-card :shadow="shadow">
        <!-- 标题 -->
        <div class="title"><a href="#">Spring框架(三):动态代理和AOP</a></div>
        <!-- 文章信息（发表时间、阅读次数等） -->
        <div class="subtitle">
            <div><i class="el-icon-edit-outline"></i><span> 发表于 2022-03-26</span></div>
            <div><i class="el-icon-edit-outline"></i><span> 更新于 2022-03-26</span></div>
            <div><i class="el-icon-view"></i><span> 阅读次数 11</span></div>
        </div>
        
        <p class="content">本文介绍了Spring AOP相关的原理和使用方法。包括Java中动态代理的两种实现方式：原生JDK动态代理和CGLIB动态代理，还介绍了基于注解和配置两种方式来使用Spring AOP。</p>
        <div class="btn">
            <el-button type="primary">阅读原文<i class="el-icon-right"></i></el-button>
        </div>
    </el-card>
</template>

<script>
export default {
    props:['shadow', ],
    name: 'blogSummary',
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