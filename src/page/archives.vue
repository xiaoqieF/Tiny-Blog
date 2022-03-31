<template>
    <el-row class="container" :gutter="20">
        <el-col :span="18">
            <el-card>
                <div class="archives-title">
                    目前共20篇文章，继续努力！
                </div>
                <el-timeline>
                    <el-timeline-item
                    v-for="(activity, index) in activities"
                    :key="index"
                    :icon="activity.icon"
                    :type="activity.type"
                    :color="activity.color"
                    :size="activity.size"
                    :timestamp="activity.timestamp">
                    {{activity.content}}
                    </el-timeline-item>
                </el-timeline>
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
    name: 'archives',
    components: {
        generInfo,
    },
    data() {
        return {
            activities: [{
            content: '支持使用图标',
            timestamp: '2018-04-12 20:46',
            size: 'large',
            type: 'primary',
            icon: 'el-icon-more'
            }, {
            content: '支持自定义颜色',
            timestamp: '2018-04-03 20:46',
            color: '#0bbd87'
            }, {
            content: '支持自定义尺寸',
            timestamp: '2018-04-03 20:46',
            size: 'large'
            }, {
            content: '默认样式的节点',
            timestamp: '2018-04-03 20:46'
            }],
        }
    },

}
</script>

<style lang='less' scoped>
    .container{
        margin-top: 20px;
        .archives-title{
            font-weight: bold;
            font-size: 20px;
            padding-left: 20px;
        }
    }
    .el-timeline{
        margin-top: 20px;
    }
</style>