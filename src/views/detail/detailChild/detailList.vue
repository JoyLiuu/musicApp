<template>
    <div class="list">
        <div class="list_top">
            <div class="play">
                <span class="iconfont icon-play3"></span>
                <h4>播放全部<span class="count">(共{{}}首)</span></h4>
            </div>
            <div class="collect">
                <span class="iconfont icon-jiahao"></span>
                <span>收藏({{}})</span>
            </div>
        </div>

        <div class="content" v-for="(item, index) in arr" :key="item">
            <div class="num">
                <span>{{ index + 1 }}</span>
                <!-- <span v-else class="iconfont icon-changpian"></span> -->
            </div>
            <div class="music" @click="playMusic(index)" :id="`index-${index}`">
                <span>{{ item.al.name }}</span>
                <span>{{ item.ar[0].name }}</span>
            </div>
            <div class="menu">
                <span class="iconfont icon-31liebiao"></span>
            </div>
        </div>
        <div class="empty"></div>
    </div>

</template>

<script setup>
import { useStore } from 'vuex';
import { watch } from 'vue'
const props = defineProps(['trackResult'])

let obj = props.trackResult
let arr = []
for (let i in obj) {
    arr.push(obj[i])
}

// 点击音乐播放时传值给mutation更新列表数据
const store = useStore()
function playMusic(index) {
    store.commit('changePlayList', arr)
    store.commit('updatePlayListIndex', index)
    // store.commit('changePlaying',index)
    Col(index)
}

// 改变当前正在播放歌曲的样式
function Col(index) {
    arr.forEach((val, i) => {
        document.querySelector('#index-' + i).previousElementSibling.innerHTML = i + 1
        document.querySelector('#index-' + i).style.color = '#2c3e50'
        document.querySelector('#index-' + i).previousElementSibling.style.color = '#2c3e50'
    });
    document.querySelector('#index-' + index).previousElementSibling.innerHTML = '♫'
    document.querySelector('#index-' + index).style.color = 'lightgreen'
    document.querySelector('#index-' + index).previousElementSibling.style.color = 'lightgreen'
}
watch(
    () => store.state.playListIndex,
    () => {
        Col(store.state.playListIndex)
    }
)
</script>

<style lang="less" scoped>
.list {
    background-color: #fff;
    border-radius: 10px;
    height: 200px;
    padding: 0 6px;

    .list_top {
        display: flex;
        justify-content: space-between;
        padding: 10px;

        .play {
            display: flex;
            align-items: center;

            .iconfont {
                margin-right: 10px;
            }

            .count {
                color: #666;
            }
        }

        .collect {
            background-color: rgb(233, 48, 48);
            border-radius: 20px;
            padding: 5px 10px;
            color: #fff;
            display: flex;
            align-items: center;
        }
    }

    .content {
        display: flex;
        height: 60px;
        justify-content: center;
        align-items: center;

        .num {
            width: 20px;
            font-weight: 600;
        }

        .music {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            padding-left: 20px;

            span:nth-child(1) {
                font-weight: 600;
            }
        }

        .menu {
            width: 60px;

            .iconfont {
                font-size: 20px;
                margin-right: 15px;
            }
        }
    }

    .empty {
        width: 100%;
        height: 49px;
        background-color: #fff;
    }
}
</style>