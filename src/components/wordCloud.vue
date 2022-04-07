<template>
  <div class="container">
    <svg class="svg" :width="width" :height='height'>
      <router-link class="fontA" to="tags" v-for='(tag,index) in tags' :key="index">
        <text :x='tag.x' :y='tag.y' :font-size='20 * (600/(600-tag.z))' :fill-opacity='((400+tag.z)/600)'>{{tag.text}}</text>
      </router-link>
    </svg>
  </div>
</template>

<script>
  export default {
    name: "wordCloud",
    props: ['width','height','RADIUS'],
    async created(){ //初始化标签位置
        // 需要await等待异步任务执行完成之后才能使用数据
        await this.getAllTags()
        this.tagsNum = this.tagList.length
        for(let i =0;i<this.tagList.length;i++){
            let tag = {};
            let k = -1 + (2 * (i + 1) - 1) / this.tagsNum;
            let a = Math.acos(k);
            let b = a * Math.sqrt(this.tagsNum * Math.PI)//计算标签相对于球心的角度
            tag.text = this.tagList[i].name;
            tag.x = this.CX +  this.RADIUS * Math.sin(a) * Math.cos(b);//根据标签角度求出标签的x,y,z坐标
            tag.y = this.CY +  this.RADIUS * Math.sin(a) * Math.sin(b);
            tag.z = this.RADIUS * Math.cos(a);
            this.tags.push(tag);
        }
    },
    data() {
      return {
            tagsNum:0,//标签数量
            speedX:Math.PI/360/1.5,//球一帧绕x轴旋转的角度
            speedY:Math.PI/360/1.5,//球-帧绕y轴旋转的角度
            tags: [],
            // 全部标签列表
            tagList:[],
        }
    },
    computed:{
      CX(){//球心x坐标
        return this.width/2 - 20;
      },
      CY(){//球心y坐标
        return this.height/2;
      }
    },
    methods:{
        // 获取所有标签
        async getAllTags() {
            const {data: res} = await this.$http.get('public/tags')
            console.log(res)
            if (res.meta.status === 200) {
                this.tagList = res.data
            } else {
                this.$message.error('获取标签数据失败！')
            }
        },
      rotateX(angleX){
        // var cos = Math.cos(angleX);
        // var sin = Math.sin(angleX);
        // for(let tag of this.tags){
        //     var y1 = (tag.y- this.CY) * cos - tag.z * sin  + this.CY;
        //     var z1 = tag.z * cos + (tag.y- this.CY) * sin;
        //     tag.y = y1;
        //     tag.z = z1;
        // }
      },
      rotateY(angleY){
        var cos = Math.cos(angleY);
        var sin = Math.sin(angleY);
        for(let tag of this.tags){
            var x1 = (tag.x - this.CX) * cos - tag.z * sin + this.CX;
            var z1 = tag.z * cos + (tag.x - this.CX) * sin;
            tag.x = x1;
            tag.z = z1;
        }
      },
    },
    mounted() {
        this.timer = setInterval(() => {
        this.rotateX(this.speedX);
        this.rotateY(this.speedY);
        }, 17)
    },
    beforeDestroy() {
        clearInterval(this.timer)
    },
  };
</script>


<style lang='less' scoped>
    .fontA{
        fill: teal;
        font-weight: bold;
        font-family: Apple LiGothic Medium;
    }
    .fontA:hover{
        fill: red;
    }
    .svg{
        background-color: white;
    }
</style>