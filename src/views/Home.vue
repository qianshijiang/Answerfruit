<template>
  <div style="background: rgb(238,238,238)">
    <div id ='app' class="home">
      <div id="apps" style="width: 100%">
        <div id="hh">
          <p style="text-align: center;color: #fff;font-size: 24px;">
            水果之王
          </p>
          <p style="text-align: center;margin-top: 15px;line-height: 18px;color: #fff;font-size: 16px;padding: 10px 20px;">
            我往也不能忘哈哈哈都好都好都好就将计就计
          </p>
        </div>

      </div>
    </div>
    <div id="app1" style="display: none" class="home">
      <yd-slider autoplay="3000"  class="home-img">
        <yd-slider-item >
          <a>
            <img src="https://f12.baidu.com/it/u=1243293019,1807664460&fm=72">
          </a>
        </yd-slider-item>
        <yd-slider-item >
          <a>
            <img src="http://img0.imgtn.bdimg.com/it/u=2870661452,3778953104&fm=26&gp=0.jpg">
          </a>
        </yd-slider-item>
        <yd-slider-item >
          <a>
            <img src="http://img2.imgtn.bdimg.com/it/u=3799029851,2113947919&fm=26&gp=0.jpg">
          </a>
        </yd-slider-item>
      </yd-slider>
      <!--<div class="home-img">-->
        <!--<img src="../assets/bg.png"/>-->
      <!--</div>-->
      <div style="width: 96%;margin: auto;margin-top: 15px;background: #fff;border-radius: 4px;border: 1px solid #e0e0e0;">
        <div style="width: 96%;margin: auto;display: flex;flex-direction: row;padding: 15px 0;border-bottom: 1px solid #e0e0e0;">
          <img style="height: 80px;width: 60px;" src="http://img2.imgtn.bdimg.com/it/u=3799029851,2113947919&fm=26&gp=0.jpg">
          <div style="display: flex;flex-direction: column;margin-left: 15px;">
            <p style="font-size: 16px;">水果之王</p>
            <p style="font-size: 14px;color: #999;line-height: 24px;">你大爷</p>
            <p style="font-size: 14px;color: #999;line-height: 24px;">你大爷</p>
          </div>
        </div>
        <div style="width: 96%;margin: auto">
          <p style="font-size: 14px;color: #999;">
            <span style="font-size: 32px;">“</span>
            网络小说阅读器，实现追书推荐收藏、书籍/标签检索、模拟翻书的翻页效果、缓存书籍、日夜间模式、本地txt/pdf/epub书籍阅读、字体/主题/亮度设置、Wifi传书等功能！
            此项目停止维护，由于当时做的比较着急，分页、翻页、性能这些都做的相当不好，在 言士创作 中，对这方面做了很多的优化，不过没有开源。 有相关问题欢迎发我邮箱交流！
            <span style="font-size: 32px;">”</span>
          </p>
        </div>
      </div>
      <!--<yd-popup v-model="show1" position="center" width="90%">-->
        <!--<div style="background-color:#fff;padding: 25px;border-radius: 4px;">-->
          <!--<p style="text-align: center ">-->
            <!--您现有订单未完成，请先完成当前订单。-->
          <!--</p>-->
          <!--<p style="text-align: center;">-->
            <!--<yd-button @click.native="gostate" style="margin-top:40px;">确定</yd-button>-->
          <!--</p>-->
        <!--</div>-->
      <!--</yd-popup>-->
    </div>
    <!--<FooterBar pageTag="0"/>-->
  </div>

</template>

<script>
import FooterBar from "@/components/FooterBar.vue";
export default {
  name: "home",
  data(){
    return{
      banner:[],
      topbottom:[],
      horns:[],
      middbuttons:[],
      bottombuttons:[],
      show1:false,
      heights:660
    }
  },
  components: {
    FooterBar
  },
  methods:{
    golink(item){
      this.$router.push({path: item.htmlurl})

    },
    steps(){
      if(!localStorage.getItem("token")){
        this.$router.replace({path: '/login'})
      }else{
        if(this.middbuttons[0].state === 0){
            this.show1 = true
        }else{
          this.$router.push({path: '/Instructions'})
        }
      }
    },
    gostate(){
      this.$router.push({path: '/MyApply'})
    },
    getData() {
      let self = this
      this.$dialog.loading.open("获取中...")
      let params = {
        'orderno': localStorage.getItem("orderno"),
        'page': 1,
        'pagemax': 30
      }
      this.$http
        .get(
          "/fsdmvc/top",
          { emulateJSON: true , headers: { "Content-Type": "multipart/form-data","token":localStorage.getItem("token")}}
        )
        .then(
          function(res) {
            this.$dialog.loading.close()
            console.log(res.body)
            if(res.body.status==true){
              this.banner = res.body.data.topads
              this.topbottom = res.body.data.upbuttons
              this.horns = res.body.data.horns
              this.middbuttons = res.body.data.middbuttons
              this.bottombuttons = res.body.data.bottombuttons
              localStorage.setItem("bottombuttons", this.bottombuttons)
            }else{
              alert(res.body.msg);
            }

          },
          function(res) {
            console.log(res)
          }
        );
    },
  },
  mounted: function () {
    this.heights = screen.height
    document.getElementById('apps').style.height = screen.height+'px'
    document.getElementById('hh').style.paddingTop = screen.height/2-100+'px'
    // document.getElementById('apps').style.width = screen.width+'px'
    // alert(screen.height)
    // this.getData()
  }
};
</script>
<style scoped>

.home {
  width: 100%;
  background-color: #ffffff;
  background-image: url(https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2258569100,4281188072&fm=26&gp=0.jpg);
  background-repeat:no-repeat;
  background-position:top;
  background-attachment:fixed;
}

.home-img img{
 width: 100%;
 height: 16rem;
}
.home-box {
  z-index: 100;
  width: 92%;
  margin: 0 auto;
  background: rgba(255, 255, 255, 1);
  border-radius: 0.8rem;
  overflow: hidden;
  position: relative;
  bottom: 3.5rem;
}
.home-box-column {
  display: flex;
  justify-content: space-around;
  padding: 2rem 0;
  flex-wrap: wrap;
}
.home-box-column-img {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}
.home-box-column-img img {
  width: 2.1rem;
  height: 2.1rem;
}
.column-corlor1 {
  background: rgba(146, 232, 120, 1);
}
.column-corlor2 {
  background: rgba(241, 180, 139, 1);
}
.column-corlor3 {
  background: rgba(149, 194, 246, 1);
}
.home-box-column-text {
  text-align: center;
  font-size: 0.8rem;
  font-family: PingFang-SC-Medium;
  color: #666666;
  padding-top: 0.5rem;
}
.home-notice {
  display: flex;
  padding: 0px 2rem;
}
.home-notice img {
  width: 24px;
  height: 24px;
  margin-right: 0.8rem;
  margin-top: 3px;
}
.center-content {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  background: linear-gradient(
    180deg,
    rgba(188, 242, 246, 1),
    rgba(49, 192, 254, 1),
    rgba(139, 210, 241, 1)
  );
}
.center-content img{
   width: 2.1rem;
  height: 2.1rem;
}
.center-margin {
  margin: 0 auto;
}
.home-centent{
  display: flex;
  width: auto;
  justify-content: center;
  margin: 2.3rem auto;
}
</style>

