<template>

  <div class="apply-herder">
    <div class="apply-herder-title">step2 贷款资料上传</div>
    <yd-step :current="step" current-color="#049DFC">
      <yd-step-item>
        <span class="min-t" slot="bottom" >{{titles}}</span>
      </yd-step-item>
      <yd-step-item>
        <span class="min-t" slot="bottom">身份证</span>
      </yd-step-item>
      <yd-step-item>
        <span class="min-t" slot="bottom">户口本</span>
      </yd-step-item>
      <yd-step-item>
        <span class="min-t" slot="bottom">收入证明</span>
      </yd-step-item>
      <yd-step-item>
        <span class="min-t" slot="bottom">学历</span>
      </yd-step-item>
      <yd-step-item>
        <span class="min-t" slot="bottom">买卖合同</span>
      </yd-step-item>
      <yd-step-item>
        <span class="min-t" slot="bottom">首付小票</span>
      </yd-step-item>
    </yd-step>
  </div>
</template>

<script type="text/babel">
import Vue from "vue";
export default {
    name: 'Step',
  props: ['titles','step'],
    data:function (){
        return {

        }
    },
    created:function(){
        console.log(this.pageTag);
    },
  methods:{}
};
</script>
<style >
  .min-t{
    font-size: 10px;
  }
  .apply-herder{
    background-color: #ffffff;
    padding-bottom: 25px;
  }
  .apply-herder-title{
    text-align: center;
    font-size:16px;
    font-family:PingFangSC-Regular;
    color:rgba(51,51,51,1);
    line-height: 80px;
    padding-top: 20px
  }
  .yd-step-theme1 .yd-step-item>em>i {
    display: none !important;
  }
</style>


