<template>
  <div>
    <div id ='app' class="home">
      <div     v-show="errorpage == true">
        <img :src="imgurl" id="apps" style="position: fixed;top:0;width: 100%;z-index:-1"  >
        <div id="hh" >
          <div v-if="anflag == true">
            <!--<p style="text-align: center;color: #fff;font-size: 18px;">-->
              <!--答案二维码-->
            <!--</p>-->
            <p style="text-align: center;margin-top: 10px;line-height: 32px;color: #fff;font-size: 24px;padding: 10px 20px;">
             {{answer.content}}
            </p>

          </div>
          <div v-if="anflag == false" style="display: flex;flex-direction: column;justify-content: center;align-items: center">
            <p style="text-align: left;color: #fff;font-size: 22px;line-height: 36px;">
              答案二维码
              <!--店铺：{{shorp.name}}-->
            </p>
            <p style="text-align: left;color: #fff;font-size: 22px;line-height: 36px;">
            二维码已失效
            </p>
            <p style="text-align: left;color: #fff;font-size: 22px;line-height: 36px;">
              订购热线：{{shorp.orderPhone}}
            </p>
          </div>
        </div>
        <p style="text-align: center;color: #fff;font-size: 12px;position: absolute;bottom: 15px;width: 30%;text-align: center;left: 35%;">本答案仅供娱乐</p>
      </div>
      <div style="display: flex;flex-direction: column;align-items: center;margin-top: 60px;" v-show="errorpage == false" >
        <img style="height: 160px;width: 160px;" src="../assets/sb.png"/>
        <p style="text-align: center;margin-top: 10px;font-size: 18px;color:#999;">
          数据加载失败
        </p>
        <p style="text-align: center;margin-top: 10px;font-size: 18px;color:#999;">
          网络或服务器延迟，请稍后再试
        </p>
      </div>
    </div>
    <div>
      <div @click="changeOn" :class="isOff?'isOff':'isOn'">

      </div>
      <audio id="audio" :src="require('/../../static/img/1.mp3')"></audio>
    </div>
      <!--<audio id="audio"   controls="controls" autoplay="autoplay" preload="auto">
      <source src="/../../static/img/1.mp3" type="audio/ogg">
      <source src="../../static/img/1.mp3" type="audio/mpeg">
      Your browser does not support the audio element.
    </audio>-->
  </div>

</template>

<script>
import FooterBar from "@/components/FooterBar.vue";
export default {
  name: "home",
  data(){
    return{
      bookpage:true,
      errorpage:true,
      heights:660,
      codeparamts:[],
      answer:{},
      shorp:{},
      anflag:true,
      imgs:0,
      imgurl:'',
      isOff:true //控制是否自动播放
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
      let url = document.location.toString()
      // alert(url)
      url = 'https://www.xunhuai.net/Index/Indexpage?QrcodrId=0089E3A98C89D07FD2FC2ABE6A6A94C2&ShopId=B141ED0F02742108A6DA5F1606587092&AnsBookNum=53#/'
      console.log(url)
      let arrUrl = url.split('?')
      let paramt = []
      let paramts = {}
      paramts = arrUrl[1]
      paramts = paramts.split('&')
      paramt = paramts
      paramt.forEach(item => {
        this.codeparamts.push(item.split('='))
      })
      // console.error(this.codeparamts[0][1])
      // alert(this.codeparamts[2][1])
      // let ansnum = this.codeparamts[2][1]
      // ansnum = ansnum.substr(0,ansnum.length-2)
      // alert(ansnum)
      this.getData1()

    },
    getData1() {
      let self = this
      this.$dialog.loading.open("获取中...")
      let param = {id:this.codeparamts[0][1]}

      this.$http
        .post(
          "/Qrcode/selectByPrimaryKey",
          { emulateJSON: true ,param, headers: { "Content-Type": "multipart/form-data"}}
        )
        .then(
          function(res) {
            this.$dialog.loading.close()
            console.log(res)


            if(res.body.code == '00000'){
              if(res.body.data.scanTimes > 100){
                this.anflag = false
                this.getData2()
              }else {
                this.getData3()
              }
              this.errorpage = true
              let url = document.location.toString()
            }else{
              this.errorpage = false
              // alert(res.body.msg);
            }

          },
          function(res) {
            console.log(res)
          }
        );
    },
    getData2() {
      let self = this
      this.$dialog.loading.open("获取中...")
      let id = this.codeparamts[1][1]
      // id = JSON.parse(id)
      let param = {id:id}
      this.$http
        .post(
          "/Qrcode/Shop/selectByKey",
          { emulateJSON: true ,param,headers:{"Content-Type":"multipart/form-data"}}
        )
        .then(
          function(res) {
            this.$dialog.loading.close()
            console.log(res)
            if(res.body.code == '00000'){
              this.shorp = res.body.data
              this.errorpage = true
              let url = document.location.toString()
            }else{
              this.errorpage = false
              // alert(res.body.msg);
            }

          },
          function(res) {
            console.log(res)
          }
        );
    },
    getData3() {
      let self = this
      this.$dialog.loading.open("获取中...")
      let ansnum = this.codeparamts[2][1]
      if(this.codeparamts.length == 3){
        ansnum = ansnum.substr(0,ansnum.length-2)
      }
      let param = {
        ansNum: ansnum,
      }
      this.$http
        .post(
          "/Qrcode/Answerbook/findByAnsNum",
          { emulateJSON: true ,param, headers: { "Content-Type": "multipart/form-data"}}
        )
        .then(
          function(res) {
            this.getData2()
            this.$dialog.loading.close()
            console.log(res)
            if(res.body.code == '00000'){
              this.errorpage = true
              this.anflag = true
              this.answer = res.body.data

              // let url = document.location.toString()
            }else{
              this.errorpage = false
              // alert(res.body.msg);
            }

          },
          function(res) {
            console.log(res)
          }
        );
    },
    getData() {
      let self = this
      this.$dialog.loading.open("获取中...")
      let params = {
        'page': 1,
        'pagemax': 30
      }
      this.$http
        .post(
          "/Qrcode/insertManual",
          { emulateJSON: true , headers: { "Content-Type": "multipart/form-data"}}
        )
        .then(
          function(res) {
            this.$dialog.loading.close()
            if(res.body.code == '00000'){
              this.errorpage = true
              let url = document.location.toString()
              // url = '140.143.97.150:8889/Qrcode/Index?QrcodrId=13229B273E22E5E426B8DC9917030929&ShopId=B141ED0F02742108A6DA5F1606587092&AnsBookNum=1'
              let arrUrl = url.split('?')
              let paramt= []
              let paramts = arrUrl[1]
              params = paramts.split('&')
              paramt = params
              paramt.forEach(item => {
                this.codeparamts.push(item.split('='))
              })
              this.getData1()
              // console.error(this.codeparamts)
              // this.banner = res.body.data.topads
              // this.topbottom = res.body.data.upbuttons
              // this.horns = res.body.data.horns
              // this.middbuttons = res.body.data.middbuttons
              // this.bottombuttons = res.body.data.bottombuttons
              // localStorage.setItem("bottombuttons", this.bottombuttons)
            }else{
              this.errorpage = false
              // alert(res.body.msg);
            }

          },
          function(res) {
            console.log(res)
          }
        );
    },
    changeOn(){
      let oAudio = document.querySelector("#audio");
      if(this.isOff){
        oAudio.play();//让音频文件开始播放
      }else{
        oAudio.pause();//让音频文件暂停播放
      }
      this.isOff = !this.isOff;
    },
    audioAutoPlay() {
      let audio = document.getElementById('audio');
      this.isOff = false;
      audio.play();
      document.removeEventListener('touchstart',this.audioAutoPlay);
    },
  },
  mounted: function () {
    // 自动播放音乐效果，解决微信自动播放问题
    document.addEventListener('touchstart',this.audioAutoPlay,false);
    document.addEventListener('WeixinJSBridgeReady', this.audioAutoPlay,false);
    let oAudio = document.querySelector("#audio");
    oAudio.onended = function () {//播放完毕，重新循环播放
      oAudio.load();
      oAudio.play();
    }

    this.heights = screen.height
    document.getElementById('apps').style.height = screen.height+'px'
    document.getElementById('hh').style.paddingTop = screen.height/2-140+'px'
    this.imgs = parseInt(9*Math.random())
    this.imgurl = '../../static/img/'+this.imgs+'.jpg'
    // this.getData()
    this.gostate()
  }
};
</script>
<style scoped>

.home {
  width: 100%;

}
.home1{
  width: 100%;
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
.isOn{
  width: 28px;
  height: 28px;
  position: fixed;
  z-index: 2000;
  top: 20px;
  left: 20px;
  -webkit-animation: rotating 1.2s linear infinite;
  animation: rotating 1.2s linear infinite;
  background: url("../../static/img/1.jpg") 0 0 no-repeat;
  background-size:100%;
}
@keyframes rotating {
  from { -webkit-transform: rotate(0) }
  to { -webkit-transform: rotate(360deg) }
}
@-webkit-keyframes rotating {
  from { -webkit-transform: rotate(0) }
  to { -webkit-transform: rotate(360deg) }
}
.isOff{
  width: 28px;
  height: 28px;
  position: fixed;
  z-index: 2000;
  top: 20px;
  left: 20px;
  background: url("../../static/img/2.jpg") 0 -28px no-repeat;
  background-size:100%;
}
</style>

