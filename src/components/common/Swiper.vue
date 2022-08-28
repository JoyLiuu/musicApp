<template>
  <van-swipe :autoplay="3000" lazy-render>
    <van-swipe-item v-for="image in state.images" :key="image">
      <img :src="image.pic" />
    </van-swipe-item>
  </van-swipe>
</template>

<script>
import {getBanner} from '@/request/api/home.js'
import { onMounted, reactive } from 'vue'
export default {
  setup() {
    const state = reactive({
      images : []
    })
    onMounted(async () => {
      // axios.get('http://localhost:3000/banner?type=2').then(res => {
      //   // console.log(res);
      //   state.images = res.data.banners
      // })
      let res = await getBanner()
      state.images = res.data.banners
    })
    return { state };
  }
}
</script>

<style lang="less">
.van-swipe {
  width: 100%;

  .van-swipe-item {
    img {
      width: 100%;
    }
  }
}
</style>