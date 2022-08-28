<template>
    <div class="nav_footer">
        <!-- <img :src="playList[playListIndex].al.picUrl" alt="" :class="[isPlay?'img_pause':'img_active']">  已封装到rotateimg.vue-->
        <div class="rotate">
            <img src="@/assets/cd.png" alt="" class="img_cd">
            <rotate-img></rotate-img>
        </div>
        <div class="info" @click="isShowPopup">
            <span>{{ playList[playListIndex].al.name }}</span>
            <span>横滑切换上下首哦~</span>
        </div>
        <div class="right">
            <span class="iconfont icon-play3" @click="play" v-if="isPlay"></span>
            <span class="iconfont icon-stop1" @click="play" v-else></span>
            <span class="iconfont icon-liebiao1"></span>
            <audio ref="audio"
                :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}`"></audio>
        </div>
        <van-popup v-model:show="showPopup" position="right" :style="{ height: '100%', width: '100%' }">
            <detail-music :play="play"></detail-music>
        </van-popup>
    </div>

</template>

<script>
import detailMusic from '@/components/content/detailMusic.vue'
import RotateImg from '../common/RotateImg.vue'
import { mapMutations, mapState } from 'vuex'
export default {
    data() {
        return {
            interval: 0
        }
    },
    components: {
        detailMusic,
        RotateImg
    },
    computed: {
        ...mapState(['playList', 'playListIndex', 'isPlay', 'showPopup','duration'])
    },
    mounted() {
        console.log(this.$refs)  //Proxy {audio: audio}
        console.log("+++++++++++++"+this.$refs.audio.currentTime);
        // 当底部播放器获取音乐时就取得歌词信息
        this.$store.dispatch('getLyrics', this.playList[this.playListIndex].id)
        // 刷新后第一次进入歌单，点击音乐无法自动播放（因为此时没有监听到索引变化无法执行方法）

        // 当组件挂载后，初始化状态也要实现自动播放
        this.autoplayMusic()
        this.addDuration()
    },
    updated() {
        // 当底部播放器音乐发生改变时就取得更新后的歌词信息
        this.$store.dispatch('getLyrics', this.playList[this.playListIndex].id)
        
        // console.log(this.$refs.audio.duration);
    },
    methods: {
        ...mapMutations(['switchIsPlay', 'changeShowPopup', 'updateCurrentTime','updateDuration']),
        // 音乐播放时
        play() {
            if (this.$refs.audio.paused) {
                this.$store.commit('switchIsPlay', false)
                this.$refs.audio.play()
                this.updateTime()

            } else {
                this.$refs.audio.pause()
                this.$store.commit('switchIsPlay', true)
                clearInterval(this.interval)
            }

        },
        // 歌曲播放变化时改变进度条进度
        addDuration() {
            this.$store.commit('updateDuration', this.$refs.audio.duration)
        },
        // 每隔500ms获取一次音乐的当前播放的时间位置
        updateTime() {
            this.interval = setInterval(() => {
                this.$store.commit('updateCurrentTime', this.$refs.audio.currentTime)
            }, 500)
        },
        // 歌曲弹窗（磁盘与歌词）
        isShowPopup() {
            this.$store.commit('changeShowPopup', true)
            // if (this.$refs.audio.paused) {
            //     this.$store.commit('switchIsPlay', false)
            //     this.$refs.audio.play()
            // }

        },
        // 点击音乐时自动播放该音乐
        autoplayMusic() {
            // 1.播放音乐
            this.$refs.audio.autoplay = true;
            // 2.切换图标
            if (this.$refs.audio.paused) {
                this.$store.commit('switchIsPlay', false)
                clearInterval(this.interval)
            }
            this.updateTime()
        }
    },
    watch: {
        //监听下标发生改变 自动播放
        playListIndex: function () {
            // 调用该组件方法要指明this
            this.autoplayMusic()
        }
    }
}
</script>

<style lang="less" scoped>
.nav_footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 49px;
    background-color: #fff;
    border-top: 1px solid rgb(209, 209, 209);
    display: flex;
    justify-content: center;
    align-items: center;

    .rotate {
        width: 60px;
        position: relative;

        .img_cd {
            width: 45px;
            z-index: 22;
        }

        .img_disk {
            position: absolute;
            top: 7px;
            left: 15px;
            width: 30px;
            overflow: hidden;
        }
    }


    .info {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    .right {
        width: 30%;

        .iconfont {
            font-size: 20px;
            margin-left: 15px;
        }
    }
}
</style>