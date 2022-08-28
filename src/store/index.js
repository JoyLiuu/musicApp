import { createStore } from "vuex";
import { getMusicLyrics } from "../request/api/home";
export default createStore({
  state: {
    playList:[ //默认播放列表
      // {
      //   al: {
      //     // id: 138330691,
      //     // name: "孤独面店",
      //     // pic: 109951166954003280,
      //     // picUrl:
      //     //   "http://p3.music.126.net/olQdP1ZV-BbX-Q9_OCWKVA==/109951166954003273.jpg",
      //   },
      //   // ar:[{name:"姜云升"}],
      //   // ar:[],
      //   // id:Number
      //   // id: 1909021556,
      // },
    ],
    playListIndex: {
      type:Number,
      default:0
    },//歌曲下标索引
    isPlay:true,//播放暂停图标的切换
    showPopup:false,//底部点击音乐弹出层
    lyricsList:String,//歌词
    duration:0 //每首歌时长
  },
  mutations: {
    switchIsPlay(state,value){
      state.isPlay = value
      // console.log(state.isPlay);
    },
    changePlayList(state,val){
      state.playList = val
    },
    updatePlayListIndex(state,val){
      state.playListIndex = val
    },
    changeShowPopup(state,val){
      state.showPopup = val
    },
    updateLyricsList(state,val){
      state.lyricsList = val.data.lrc.lyric
      // console.log(state.lyricsList);
    },
    updateCurrentTime(state,val){
      state.currentTime = val
      // console.log(state.currentTime);
    },
    updateDuration(state,val){
      console.log('最开始的duration'+state.duration);
      state.duration = val
      console.log('调用后的duration'+state.duration);
    }
  },
  actions: {
    getLyrics:async function(context,val){
      let res = await getMusicLyrics(val)
      // console.log(res);
      context.commit('updateLyricsList',res)
    }
  },
  modules: {},
});
