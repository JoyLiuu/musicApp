import instance from "..";

export function getBanner(){
    return instance({
        method:'get',
        url:'/banner?type=2'
    })
}

export function getMusicList(){
    return instance({
        method:'get',
        url:'/personalized?limit=10'
    })
}
export function getMusicItem(id){
    return instance({
        method:'get',
        url:`/playlist/detail?id=${id}`
    })
}
// 获取歌单的所有歌曲 ids：歌单id
export function getMusicListDetail(ids){
    return instance({
        method:'get',
        url:`/song/detail?ids=${ids}`
    })
}
// 获取歌曲歌词 id：歌曲id
export function getMusicLyrics(id){
    return instance({
        method:'get',
        url:`/lyric?id=${id}`
    })
}