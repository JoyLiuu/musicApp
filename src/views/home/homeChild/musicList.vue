<template>
    <div class="list-top">
        <span>发现好歌单</span>
        <span class="more"><a href="#">查看更多</a></span>
    </div>

    <van-swipe :loop="false" :width="100" :show-indicators="state.indicators">

        <van-swipe-item v-for="item in state.musicList" :key="item">
            <router-link :to="{ path: '/detail', query: { id: item.id } }">
                <img :src="item.picUrl" alt="">
                <span>{{ item.name }}</span>
                <span class="count">
                    <i class="iconfont icon-caret-right"></i>{{ getCount(item.playCount) }}</span>
            </router-link>
        </van-swipe-item>

    </van-swipe>
</template>

<script>
import { getMusicList } from '@/request/api/home.js'
import { reactive, onMounted } from 'vue'
export default {
    setup() {
        const state = reactive({
            musicList: [],
            indicators: false,
        })
        const methods = {
            getCount(num) {
                if (num >= 100000000) {
                    return (num / 100000000).toFixed(1) + '亿'
                } else if (num > 1000) {
                    return (num / 10000).toFixed(2) + '万'
                }
            }
        }
        onMounted(async () => {
            let res = await getMusicList()
            // console.log(res);
            state.musicList = res.data.result
            // console.log(state.musicList);
        })

        return { state, ...methods }
    }
}
</script>

<style lang="less" scoped>
.list-top {
    display: flex;
    justify-content: space-between;
    padding: 0 15px;

    span:nth-child(1) {
        font-weight: 700;
        font-size: 14px;
    }

    span:nth-child(2) {
        border: 1px solid #666;
        border-radius: 15px;
        font-size: 12px;
        padding: 2px;
    }
}

.van-swipe-item {
    padding: 5px;
    position: relative;
    margin-top: 6px;

    img {
        border-radius: 15px;
    }

    .count {
        position: absolute;
        top: 10px;
        right: 10px;
        color: #fff;
    }
}
</style>