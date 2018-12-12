<template>
  <div class="register">
    <div class="home-img">
      <img src="../assets/bg.png">
    </div>
     <div class="register-box">
        <yd-cell-group>
            <yd-cell-item>
                <span class="register-box-span" slot="left">手机号 </span>
                <yd-input slot="right" v-model="phone" ref="phone" regex="mobile" placeholder="请输入手机号"></yd-input>
            </yd-cell-item>
               <yd-cell-item>
                <span class="register-box-span" slot="left">验证码 </span>
                <yd-input slot="right" v-model="code" required :show-success-icon="false" :show-error-icon="false" regex="mobile" placeholder="请输入短信验证码"></yd-input>
                    <!-- ↓↓关键代码是这里↓↓ -->
                <yd-sendcode class="sendcode" slot="right"
                            v-model="start1"
                            init-str="点击获取"
                            @click.native="sendCode1"
                            run-str="{%s}秒"
                            reset-str="重新获取"
                ></yd-sendcode>
                <!-- ↑↑关键代码是这里↑↑ -->
         </yd-cell-item>
          <yd-cell-item>
                <span class="register-box-span" slot="left">密码 </span>
                <yd-input slot="right" type="password" v-model="passWord" placeholder="请输入密码"></yd-input>
            </yd-cell-item>
            <yd-cell-item style="opacity: 0">
                <span class="register-box-span" slot="left">邀请码 </span>
                <yd-input slot="right" :disabled="true" v-model="input4" required :show-success-icon="false" :show-error-icon="false" regex="mobile" placeholder="请输入邀请码（选填）"></yd-input>
         </yd-cell-item>
        </yd-cell-group>
    </div>
    <div class="go-register" @click="register">注册</div>
  </div>
</template>
<script>
export default {
  name: "RegisterFriend",
  data() {
    return {
      phone: "",
      code: "",
      passWord: "",
      input4: "",
      start1: false,
    };
  },
  methods: {
    GetQueryString(name)
    {

      let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");

      let r = window.location.search.substr(1).match(reg);

      if(r!=null)return  unescape(r[2]); return null;

    },
    sendCode1() {
      if(!this.phone){
        this.$dialog.toast({
          mes: "手机号不能为空",
          timeout: 1500
        })
        return
      }
      this.$dialog.loading.open("发送中...");
      setTimeout(() => {
        this.start1 = true
        this.$dialog.loading.close()
        this.getcode()
        this.$dialog.toast({
          mes: "已发送",
          icon: "success",
          timeout: 1500
        });
      }, 1000)

    },
    getcode(){
      this.$http
        .post(
          "/fsdmvc/setsms",
          { phone: this.phone },
          { emulateJSON: true }
        )
        .then(
          function(res) {
            console.log(res)
            if(res.body.status==true){

            }else{
              alert(res.body.msg)
            }
          },
          function(res) {
            console.log(res);
            // 处理失败的结果
          }
        )
    },
    register() {
      this.$http
        .post(
          "/fsdmvc/register_fsd",
          { phone: this.phone, password: this.passWord,code: this.code,invite_code:this.input4 },
          { emulateJSON: true }
        )
        .then(
          function(res) {
            console.log(res)
            if(res.body.status==true){
              localStorage.setItem("token", res.body.data.token)
              localStorage.setItem("data", JSON.stringify(res.body.data))
              localStorage.setItem("avatar_url", res.body.data.avatar_url)
              localStorage.setItem("display_name", res.body.data.display_name)
              this.$router.replace({path: '/About'})
            }else{
              alert(res.body.msg)
            }
          },
          function(res) {
            console.log(res);
            // 处理失败的结果
          }
        )
    }
  },
  mounted:function () {
    this.input4 = this.$route.query.ycode
  }

}
</script>
<style scoped>
.register {
  width: 100%;
}

.home-img {
  width: 100%;
  height: 16rem;
  background-color: #ffffff;
}
.home-img img{
  width: 100%;
  height: 16rem;
}
.register-box {
  margin-top: 25px;
  width: 100%;
  margin: 0 auto;
  height: 244px;
  background: rgba(255, 255, 255, 1);
  overflow: hidden;
}
.yd-cell-item {
  height: 61.5px;
  border-bottom: 1px solid #f0f0f0;
}
.yd-cell-item:not(:last-child):after {
  border: none;
}
.register-box-span {
  color: #333333;
  font-size: 14px;
  font-family: PingFang-SC-Medium;
  min-width: 65px;
}
input::-webkit-input-placeholder {
  color: #999999;

  font-size: 12px;
}
input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
  color: #999999;

  font-size: 12px;
}
input:-moz-placeholder,
textarea:-moz-placeholder {
  color: #999999;

  font-size: 12px;
}
input::-moz-placeholder,
textarea::-moz-placeholder {
  color: #999999;

  font-size: 12px;
}
input:-ms-input-placeholder,
textarea:-ms-input-placeholder {
  color: #999999;

  font-size: 12px;
}
.sendcode {
  width: 88px;
  height: 28px;
  background: rgba(4, 157, 252, 1);
  border-radius: 14px;
  font-size: 12px;
}
.register-box-div {
  width: 90%;
  margin: 0 auto;
  text-align: right;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  color: rgba(240, 178, 12, 1);
  margin-top: 40px;
  margin-bottom: 40px;
}
.go-register {
  width: 90%;
  margin: 0 auto;
  height: 44px;
  background: rgba(4, 157, 252, 1);
  border-radius: 6px;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  color: rgba(255, 255, 255, 1);
  line-height: 44px;
  text-align: center;
  margin-bottom: 25px;
}
</style>



