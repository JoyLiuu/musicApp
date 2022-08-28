<template>
        <img :src="store.state.playList[store.state.playListIndex].al.picUrl" alt="" class="img_disk"
            :class="[store.state.isPlay ? 'img_pause' : 'img_active']">

</template>

<script setup>
import { useStore } from 'vuex';
const store = useStore()

</script>

<style lang="less" scoped>

    .img_disk {
        width: 100%;
        border-radius: 50%;
        animation: rotateImg 10s linear infinite;
        transform-origin: center 50%;
    }

    .img_active {
        animation-play-state: running;
    }

    .img_pause {
        animation-play-state: paused;
    }

    @keyframes rotateImg {
        0% {
            transform: rotateZ(0deg);
        }

        100% {
            transform: rotateZ(360deg);
        }
    }

</style>