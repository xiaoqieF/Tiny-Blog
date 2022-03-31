<template>
    <el-row class="container" :gutter="20">
        <el-col :span="18">
            <el-card>
                <!-- 文章标题 -->
                <div class="title">
                    Spring框架(三):动态代理和AOP
                </div>
                <!-- 文章内容 -->
                <div class="content">
                    <p>这是内容！</p>
                    <p>这是内容！</p>
                    <p>这是内容！</p>
                    <p>这是内容！</p>
                    <p>这是内容！</p>
                </div>
            </el-card>
        </el-col>
        <el-col :span="6">
            <generInfo moto="松花酿酒，春水煎茶" 
            :archivesNum="10" 
            :categoriesNum="12" 
            :tagsNum="5">
            </generInfo>
        </el-col>
    </el-row>
</template>

<script>
import generInfo from '../components/generInfo.vue'
export default {
    name: 'about',
    components: {
        generInfo,
    }
}
</script>

<style lang='less' scoped>
    .container{
        margin-top: 20px;
    }
    .title{
        text-align: center;
        line-height: 2;
        font-size: 28px;
        color: #444950;
        font-weight: bold;
    }
</style>