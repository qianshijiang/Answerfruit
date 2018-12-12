<template>

    <yd-tabbar fixed active-color="#049DFC" >
        <yd-tabbar-item title="首页" link="/" :active="this.pageTag==0" style="font-size: 10px;">
            <yd-icon name="home" slot="icon" size="1.8rem"></yd-icon>
        </yd-tabbar-item>
        <yd-tabbar-item title="订单" link="/MyApply" :active="this.pageTag==1" style="font-size: 10px;">
          <yd-icon name="feedback" slot="icon" size="1.8rem"></yd-icon>
        </yd-tabbar-item>
        <yd-tabbar-item title="我的" link="/about" :active="this.pageTag==2" style="font-size: 10px;">
            <yd-icon name="ucenter-outline" slot="icon" size="1.8rem"></yd-icon>
        </yd-tabbar-item>
    </yd-tabbar>
</template>

<script type="text/babel">
import Vue from "vue";
import { TabBar, TabBarItem } from "vue-ydui/dist/lib.rem/tabbar";
Vue.component(TabBar.name, TabBar);
Vue.component(TabBarItem.name, TabBarItem);
export default {
    name: 'footerBar',
    props: ['pageTag'],
    data:function (){
        return {

        }
    },
    created:function(){
        console.log(this.pageTag);
    },
  methods:{
    steps(){
      this.$router.replace({path: '/MyApply'})
  },}
};
</script>
<style >
.yd-tabbar-item{
    height: 3rem;
    padding-top: 1rem;
}
.yd-tabbar-txt{
     padding-top: .5rem;
}
</style>


