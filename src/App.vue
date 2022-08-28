<template>
  <router-view/>
  <!-- 该组件初始状态为空（store内未设初始值），当点击列表某一首歌时才获取播放信息（以及播放列表信息） -->
  <!-- 此处v-if是判断当获取播放的歌曲信息后再对该组件进行渲染 -->
  <NavFooter v-if="store.state.playList.length > 0"></NavFooter>
</template>

<script setup>
import NavFooter from '@/components/content/NavFooter.vue'
import { useStore } from 'vuex';
const store = useStore()

</script>

<style lang="less">
body{
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#app {

  a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;
    font-size: 12px;
    font-weight: lighter;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
  ul,
  li{
    padding: 0;
    margin: 0;
    list-style: none;
  }

}
</style>
