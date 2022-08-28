<template>
  <div class="NavBar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>

export default {
  name: 'NavBar',
  components: {
    
  }
}
</script>

<style>
.NavBar{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 44px;
    line-height: 44px;
}
.left,
.right{
  width: 80px;
} 
.center{
  flex:1;
}
</style>