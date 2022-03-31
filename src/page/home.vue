<template>
    <el-row class="container" :gutter="10">
        <el-col :span="18">
            <blogSummary/>
            <blogSummary/>
            <!-- 分页栏 -->
            <el-card class="page">
                <el-pagination
                background
                layout="prev, pager, next"
                :page-size="pageSize"
                :total="total">
                </el-pagination>
            </el-card>
        </el-col>
        <el-col :span="6">
            <!-- 右侧第一个卡片，显示网站基本信息 -->
            <generInfo moto="松花酿酒，春水煎茶" 
            :archivesNum="10" 
            :categoriesNum="12" 
            :tagsNum="5">
            </generInfo>
            <!-- 右侧第二个卡片，显示推荐文章 -->
            <el-card class="recommend">
                <div class="recommend-title">
                    <i class="iconfont icon-idea"></i> 推荐阅读
                </div>
                <div class="recommend-content">
                    <a href="#" class="recommend-item">
                        <div class="recommend-title">Spring框架(三):动态代理和AOP</div>
                        <div class="recommend-tag">
                            <el-tag type="success" size="small">Spring</el-tag>
                            <el-tag type="success" size="small">Spring</el-tag>
                        </div>
                        <div class="recommend-footer">
                            <div class="recommend-info">
                                2022-03-26 13:05
                            </div>
                        </div>
                    </a>
                    <a href="#" class="recommend-item">
                        <div class="recommend-title">Spring框架(三):动态代理和AOP</div>
                        <div class="recommend-tag">
                            <el-tag type="success" size="small">Spring</el-tag>
                            <el-tag type="success" size="small">Spring</el-tag>
                        </div>
                        <div class="recommend-footer">
                            <div class="recommend-info">
                                2022-03-26 13:05
                            </div>
                        </div>
                    </a>
                </div>
            </el-card>
            <!-- 右侧第三个卡片， 标签墙-->
            <el-card>
                <div>
                    <i class="iconfont icon-tags"></i>标签墙
                </div>
                <div class="tag-content">
                    <a href="#" class="tag-item">
                        Spring(10)
                    </a>
                    <a href="#" class="tag-item">
                        Spring(10)
                    </a>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
import generInfo from '../components/generInfo.vue'
import blogSummary from '../components/blogSummary.vue'
export default {
    name: "home",
    components: {
        generInfo,
        blogSummary,
    },
    data() {
        return {
            total: 10,
            pageSize: 10,

        }
    },
}
</script>

<style lang="less" scoped>
    .container{
        margin-top: 20px;
    }
    .el-card{
        margin-bottom: 20px;
    }
    .page{
        display: flex;
        justify-content: center;
    }
    .recommend-item{
        display: inline-block;
        margin: 10px auto;
        line-height: 1.8;
        width: 100%;
        .recommend-title{
            font-weight: bold;
        }
        .el-tag{
            margin-right: 5px;
        }
        .recommend-info{
            font-size: 14px;
            color: #444;
        }
    }
    .recommend-item:hover{
        color: #409eff;
    }

    .tag-item{
        display: block;
        width: 100%;
        margin: 5px auto;
        
    }
    .tag-item:hover{
        color: #409eff;
    }
    
</style>