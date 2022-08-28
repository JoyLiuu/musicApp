<template>
    <img :src="store.state.playList[store.state.playListIndex].al.picUrl" alt="" class="bgimg">
    <div class="detail_top">
        <span class="iconfont icon-a-Frame19 arrow_l" @click="back"></span>
        <div class="namer">
            <Vue3Marquee>{{ store.state.playList[store.state.playListIndex].al.name }}</Vue3Marquee>
            <span>{{ store.state.playList[store.state.playListIndex].ar[0].name }}<i
                    class="iconfont icon-a-Frame18"></i></span>
        </div>
        <span class="iconfont icon-fenxiang arrow_r"></span>
    </div>

    <div class="content" v-if="obj.isLyricShow" @click="LyricShow">
        <img src="@/assets/needle-ab.png" alt="" class="img_needle" :class="{ img_needle_active: !store.state.isPlay }">
        <img src="@/assets/cd.png" alt="" class="img_cd">
        <RotateImg></RotateImg>
    </div>
    <div v-else class="musicLyric" @click="LyricShow" ref="currentLyric">
        <p v-for="item in lyrics" :key="item"
            :class="{ p_active: (store.state.currentTime <= item.next && store.state.currentTime > item.time) }">
            {{ item.lyrics }}
        </p>
    </div>

    <div class="detail_foot">
        <div class="footer_top">
            <span class="iconfont icon-aixin"></span>
            <span class="iconfont icon-xiazai"></span>
            <span class="iconfont icon-banzou"></span>
            <span class="iconfont icon-xiaoxi"></span>
            <span class="iconfont icon-xunhuanbofang"></span>
        </div>
        <div class="footer_mid">
            <!-- 进度条表单，step可控制移动间隔距离  max是进度条最长时长 v-model绑定圆点当前的播放进度位置-->
            <input type="range" class="range" step="1" min="0" :max="store.state.duration"
                v-model="store.state.currentTime" @click="changeRange">
        </div>
        <div class="footer_bottom">
            <span class="iconfont icon-liebiaoxunhuan1"></span>
            <span class="iconfont icon-shangyishoushangyige" @click="switchMusic(-1)"></span>
            <span class="iconfont icon-play3" @click="props.play" v-if="store.state.isPlay"></span>
            <span class="iconfont icon-stop1" @click="props.play" v-else></span>
            <span class="iconfont icon-xiayigexiayishou" @click="switchMusic(1)"></span>
            <span class="iconfont icon-liebiao1"></span>
        </div>
    </div>
</template>

<script setup>
import RotateImg from '../common/RotateImg.vue';
import { onMounted, reactive, computed, ref, watch, onUpdated } from 'vue';
import { Vue3Marquee } from 'vue3-marquee'
import 'vue3-marquee/dist/style.css'
import { useStore } from 'vuex';

// 接收父组件（navFooter）传过来的方法
const props = defineProps(['play'])

// 获取vuex的值
const store = useStore()
function back() {
    store.commit('changeShowPopup', false)
}
console.log(store.state.playList);

// 歌词与磁盘的切换
const obj = reactive({
    isLyricShow: true
})
function LyricShow() {
    obj.isLyricShow = !obj.isLyricShow
}

// 计算整理歌词部分信息
const lyrics = computed(() => {
    let arr;
    //   return author.books.length > 0 ? 'Yes' : 'No'
    if (store.state.lyricsList) {  //当取得歌词后再进行计算操作 \r空格 \n换行
        arr = store.state.lyricsList.split(/[(\r\n)\r\n]/).map(item => {
            // console.log(item);//item是每行歌词（字符串）
            // arr.slice([begin[, end]]) 包头不包尾
            let min = item.slice(1, 3)
            let sec = item.slice(4, 6)
            let mill = item.slice(7, 10)
            let lyrics = item.slice(11, item.length)
            let time = parseInt(min) * 60 + parseInt(sec) + parseInt(mill) / 1000
            let next = 0 //初始化下一句歌词开始播放的时间
            // 当时间毫秒只有两位时
            if (isNaN(Number(mill))) {
                mill = item.slice(7, 9)
                lyrics = item.slice(10, item.length)
                time = parseInt(min) * 60 + parseInt(sec) + parseInt(mill) / 1000
            }
            // console.log(min,sec,mill,lyrics);
            return { min, sec, mill, lyrics, next, time }
        })
        // 过滤掉歌词中带- 和 '' 的部分
        arr = arr.filter(item => {
            if (item.lyrics.trim() === '-' || item.lyrics.trim() === '') {
                return false
            } else {
                return true
            }
            // console.log(item);
        })
        arr.forEach((item, i) => {
            // if(item.lyrics.trim() === '-' || item.lyrics.trim() === '' ){
            //     arr.splice(i,1)
            // }
            // 循环arr，当最后一句歌词即i与长度-1一致时，将item.next的值初始化
            if (i === arr.length - 1) {
                item.next = 0
            } else {
                item.next = arr[i + 1].time
            }
        });

    }
    // console.log(arr);
    return arr
})

// 控制歌词滚动样式
const currentLyric = ref(null)
watch(
    () => store.state.currentTime,
    () => {
        const p = document.querySelector('.p_active')
        // 设置当前播放歌词的固定高度
        if (p !== null && currentLyric.value !== null) {
            if (p.offsetTop > 280) {
                currentLyric.value.scrollTop = p.offsetTop - 280
            }
        }
        // 监听当前播放时间currentTime === duration ，自动播放下一曲
        if(store.state.duration === store.state.currentTime){
            switchMusic(1)
        }
    }
)

// 歌曲上一首下一首的切换
function switchMusic(num) {
    if (store.state.playList) {
        let index = store.state.playListIndex + num
        if (index < 0) {
            index = store.state.playList.length - 1
        } else if (index > store.state.playList.length - 1) {
            index = 0
        }
        store.commit('updatePlayListIndex', index)
        // store.commit('changePlayList',store.state.playList[index])
    }
}


// 点击进度条时跳转对应的音乐currentTime
function changeRange(){
    // 获取点击的位置
}


// onMounted(() => {
//     addDuration()
// })
// onUpdated(() => {
//     addDuration()
// })

</script>

<style lang="less" scoped>
.van-popup {
    position: relative;
}

.bgimg {
    z-index: -1;
    display: flex;
    filter: blur(70px);
    position: absolute;
    width: 100%;
    height: 100%;
}

.detail_top {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    color: #fff;

    .arrow_l {
        flex: 1;
        font-size: 28px;
    }

    .namer {
        flex: 2;
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        .vue3-marquee {
            width: 50%;
            margin: 8px 0 2px 0;
        }

        span {
            color: #888;
        }
    }

    .arrow_r {
        flex: 1;
        font-size: 24px;

    }
}

.content {
    width: 100%;
    height: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .img_needle {
        //磁针暂停状态样式
        width: 20%;
        position: absolute;
        left: 46%;
        top: 11%;
        z-index: 9;
        transform: rotate(-22deg);
        transform-origin: 0 0;
        transition: all .5s;
    }

    .img_needle_active {
        //磁针播放状态样式
        width: 20%;
        position: absolute;
        left: 46%;
        transform: rotate(-9deg);
        transform-origin: 0 0;
        transition: all .5s;
        z-index: 9;
    }

    .img_disk {
        position: absolute;
        top: 25%;
        left: 35%;
        width: 130px;
    }

    .img_cd {
        // margin-top: -35px;
        position: absolute;
        left: 25%;
        top: 20%;
        z-index: 2;
    }


}

// 歌词部分
.musicLyric {
    margin: 30px 0;
    width: 100%;
    height: 66%;
    overflow: scroll;

    p {
        color: rgb(60, 60, 60);
        margin: 0 0 10px 0;
        font-size: 14px;
        transition: all .5s;
    }

    .p_active {
        color: #fff;
        font-size: 20px;
        transition: all .5s;
    }
}

.detail_foot {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 30px;
    color: #fff;

    .footer_top {
        display: flex;
        justify-content: center;
        align-items: center;

        span {
            flex: 1;
            font-size: 22px;
            top: 70%;
        }
    }

    .footer_mid {
        margin: 30px 0;

        .range {
            width: 100%;
        }
    }

    .footer_bottom {
        display: flex;
        justify-content: center;
        align-items: center;

        span {
            flex: 1;
            font-size: 25px;
            top: 70%;
        }
    }

}
</style>