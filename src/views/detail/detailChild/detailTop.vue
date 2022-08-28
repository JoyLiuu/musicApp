<template>
    <div class="header">
        <img :src="props.playlist.coverImgUrl" alt="" class="bgimg">

        <NavBar>
            <template v-slot:left>
                <span class="iconfont icon-a-Frame19" @click="$router.go(-1)"></span>
                <span>歌单</span>
            </template>
            <template v-slot:right>
                <span class="iconfont icon-search"></span>
                <span class="iconfont icon-31liebiao"></span>
            </template>
        </NavBar>

        <div class="profile">
            <div class="pro_left">
                <img :src="props.playlist.coverImgUrl" alt="">
                <div class="playcount"><i class="iconfont icon-caret-right"></i><span>{{getCount(props.playlist.playCount)}}</span></div>
            </div>
            <div class="pro_right">
                <span class="name">{{ props.playlist.name }}</span>
                <div class="identity">
                    <img :src="props.playlist.creator.avatarUrl" alt="">
                    <span>{{ props.playlist.creator.nickname }}</span>
                    <span class="iconfont icon-a-Frame18"></span>
                </div>
                <span class="description">{{ props.playlist.description }}</span>
            </div>
        </div>

        <div class="info">
            <div class="info_item">
                <span class="iconfont icon-xiaoxi"></span>
                <i>{{props.playlist.commentCount}}</i>
            </div>
            <div class="info_item">
                <span class="iconfont icon-fenxiang"></span>
                <i>{{ props.playlist.shareCount }}</i>
            </div>
            <div class="info_item">
                <span class="iconfont icon-yunxiazai_o"></span>
                <i>下载</i>
            </div>
            <div class="info_item">
                <span class="iconfont icon-duoxuan"></span>
                <i>多选</i>
            </div>

        </div>
    </div>
</template>

<script setup>
import NavBar from '@/components/common/NavBar.vue'

const props = defineProps(['playlist'])
// ❌ 警告！prop 是只读的！props.foo = 'bar'
// console.log(props.playlist);

// 通过props进行传值，判断数据如果拿不到就获取sessionStorage中的
// if ((props.playlist.creator = "")) {
//     props.playlist.creator = JSON.parse(sessionStorage.getItem().playlist).creator
// }

function getCount(num) {
                if (num >= 100000000) {
                    return (num / 100000000).toFixed(1) + '亿'
                } else if (num > 1000) {
                    return (num / 10000).toFixed(2) + '万'
                }
            }



</script>

<style lang="less" scoped>
.header {
    width: 100%;
    height: 250px;

    // background-color: rgb(213, 164, 164);
    // color: #fff;
    // filter: blur(20px);
    .bgimg {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        z-index: -1;
        width: 100%;
        height: 300px;
        filter: blur(20px);
    }

    .NavBar {
        // position: fixed;
        font-size: 16px;

        .left {
            span:nth-child(1) {
                margin-right: 10px;
            }
        }

        .right {
            span:nth-child(1) {
                margin-right: 15px;
            }
        }
    }

    .iconfont {
        font-size: 20px;
        margin-right: 5px;
    }
}

.profile {
    display: flex;
    align-items: center;
    margin: 20px 10px 10px;

    .pro_left {
        width: 30%;
        position: relative;

        img {
            width: 100%;
            border-radius: 10%;
        }
        .playcount{
            position: absolute;
            top: 0;
            right: 3px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
            .iconfont{
                margin: 0;
            }
        }
    }

    .pro_right {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-left: 15px;
        width: 70%;
        height: 100px;

        .name {
            font-size: 12px;
            font-weight: 600;
            color: #fff;
            margin-bottom: 8px;
            text-align: left;
        }

        .identity {
            display: flex;
            align-items: center;
            margin-bottom: 5px;
            color: aliceblue;

            img {
                width: 28px;
                border-radius: 50%;
                margin-right: 10px;
            }
        }

        .description {
            color: aliceblue;
            text-align: left;
            word-break: break-all;
            /*属性规定自动换行的处理方法。normal(使用浏览器默认的换行规则。),break-all(允许在单词内换行。),keep-all(只能在半角空格或连字符处换行。)*/
            text-overflow: ellipsis;
            display: -webkit-box;
            /** 对象作为伸缩盒子模型显示 **/
            -webkit-box-orient: vertical;
            /** 设置或检索伸缩盒对象的子元素的排列方式 **/
            -webkit-line-clamp: 2;
            /** 显示的行数 **/
            overflow: hidden;
            /** 隐藏超出的内容 **/
        }
    }
}

.info {
    display: flex;
    margin-top: 20px;

    .info_item {
        flex: 1;
        color: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        i{
            font-style: normal;
            margin-right: 5px;
        }
    }

    .iconfont {
        font-size: 24px;
    }
}
</style>