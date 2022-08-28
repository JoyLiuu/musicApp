<template>
  <nav-bar>
    <template v-slot:left>
      <span class="iconfont icon-31liebiao"></span>
    </template>
    <div class="nav-bar">
      <ul>
        <li><a href="#">我的</a></li>
        <li><a href="#">发现</a></li>
        <li><a href="#">云村</a></li>
        <li><a href="#">视频</a></li>
      </ul>
    </div>
    <template v-slot:right>
      <span class="iconfont icon-search"></span>
    </template>
  </nav-bar>

  <swiper></swiper>

  <classify></classify>

  <music-list></music-list>
</template>

<script>
import navBar from '@/components/common/NavBar'
import swiper from '@/components/common/Swiper'
import classify from './homeChild/classify.vue'
import musicList from './homeChild/musicList.vue'

export default {
  name: 'App',
  components: {
    navBar,
    swiper,
    classify,
    musicList
  }
}
</script>

<style lang="less">
.nav-bar {

  ul {
    display: flex;
    justify-content: center;
    vertical-align: middle;

    li {
      flex: 1;
    }
  }
}

</style>