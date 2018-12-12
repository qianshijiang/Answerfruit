<template>
  <div class="register">

     <div class="register-box">
        <yd-cell-group>
            <yd-cell-item>
                <span class="register-box-span" slot="left">手机号 </span>
                <yd-input slot="right" v-model="input1" regex="mobile" placeholder="请输入手机号"></yd-input>
            </yd-cell-item>

          <yd-cell-item>
                <span class="register-box-span" slot="left">密码 </span>
                <yd-input slot="right" type="password" v-model="input2" placeholder="请输入密码"></yd-input>
            </yd-cell-item>

        </yd-cell-group>
    </div>
    <router-link to="/FindPassword"><div  class="register-box-div">  <span >找回密码>></span></div></router-link>
    <div class="go-register" @click="doPost">登陆</div>
    <router-link to="/Register"><div class="go-register" style="background-color: rgba(240, 178, 12, 1);margin-top:25px;">注册</div></router-link>
    <!--<router-link to="/Register"><div  class="register-box-div1">  <span >还没有账号，去注册>>>></span></div></router-link>-->

  </div>



</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      input1: "",
      input2: "",
      input3: "",
      input4: "",
      start1: false
    };
  },
  methods: {
    sendCode1() {
      this.$dialog.loading.open("发送中...");
      setTimeout(() => {
        this.start1 = true;
        this.$dialog.loading.close();
        this.$dialog.toast({
          mes: "已发送",
          icon: "success",
          timeout: 1500
        });
      }, 1000);
    },
    doPost() {
      this.$http
        .post(
          "/fsdmvc/login_fsd",
          { phone: this.input1, password: this.input2 },
          { emulateJSON: true }
        )
        .then(
          function(res) {
           if(res.body.status==true){
              localStorage.setItem("token", res.body.data.token)
             localStorage.setItem("data", JSON.stringify(res.body.data))
             localStorage.setItem("avatar_url", res.body.data.avatar_url)
             localStorage.setItem("display_name", res.body.data.display_name)
             this.$router.replace({path: '/About'})
           }else{
              alert(res.body.msg);
           }
          },
          function(res) {
            console.log(res);
            // 处理失败的结果
          }
        );
    }
  }
};
</script>
<style scoped>
.register {
  position: absolute;
  top: 25%;
  width: 100%;
}
.register-box {
  width: 90%;
  margin: 0 auto;
  height: 120px;
  background: rgba(255, 255, 255, 1);
  border-radius: 8px;
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
.register-box-div1 {
  width: 90%;
  margin: 0 auto;
  text-align: center;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  color: rgba(240, 178, 12, 1);
  margin-top: 20px;
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
}
</style>



