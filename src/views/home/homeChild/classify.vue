<template>
  <div class="classify">
    <div class="classify-item">
        <span class="iconfont icon-huodong recommend"></span>
        <span>每日推荐</span>
    </div>
    <div class="classify-item">
        <span class="iconfont icon-diantai fm"></span>
        <span>私人FM</span>
    </div>
    <div class="classify-item">
        <span class="iconfont icon-gedan play-list"></span>
        <span>歌单</span>
    </div>
    <div class="classify-item">
        <span class="iconfont icon-paihang charts"></span>
        <span>排行榜</span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'classify',
  components: {
    
  }
}
</script>

<style lang="less" scroped>
.classify{
    display: flex;
    justify-content: center;
    align-items: center;
    .classify-item{
        flex: 1;
        display: flex;
        flex-direction: column;
        margin: 3rem 0;
        span:nth-child(1){
            color: lightblue;
            font-size: 3rem;
            margin-bottom: 1.5rem;
        }
        span:nth-child(2){
            font-weight: lighter;
        }
    }
}
</style>