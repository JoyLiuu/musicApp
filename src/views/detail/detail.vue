<template>
  <detailTop v-if="Object.keys(state.playList).length > 0" :playlist="state.playList"></detailTop>
  
  <detailList v-if='state.trackResult.length > 0' :trackResult="state.trackResult"></detailList>
</template>

<script>
import { onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { getMusicItem ,getMusicListDetail} from '@/request/api/home.js'
import detailTop from '../detail/detailChild/detailTop.vue'
import detailList from '@/views/detail/detailChild/detailList.vue'
export default {
  components: {
    detailTop,
    detailList
  },
  setup() {
    const state = reactive({
      playList: {},
      trackResult:[]
    })
    onMounted(async () => {
      // console.log(useRoute());//proxy对象
      let id = useRoute().query.id
      // console.log(id);
      let res = await getMusicItem(id)
      state.playList = res.data.playlist
      // console.log(state.playList);
      let trackIds = state.playList.trackIds
        .map(item => Number(item.id))
      trackIds = trackIds.slice(0,10)
      let ids = trackIds.toString()
      let result = await getMusicListDetail(ids)
      state.trackResult = result.data.songs
      // console.log(result.data.songs);
      // console.log(state.trackResult);



      // 防止页面刷新数据丢失，将数据保存到sessionStorage中
      sessionStorage.setItem('itemDetail', JSON.stringify(state))
    })
    return { state }
  }

}
</script>

<style>
</style>