<template>
  <div id="player">
    <add-music v-if="isShowAdd" :musicId="this.musicList[this,currentIndex].musicId" @toggleShow="falseShow"></add-music>
    <div id="player-main">
      <!-- 左部播放设置 -->
      <div class="left-control">
        <!-- 上一首 -->
        <i class="icon-prev prev-next-icon" @click="previousMusic()"></i>
        <!-- 播放按钮 -->
        <i
          class="icon-play playIcon"
          v-show="this.$store.state.isPause"
          @click="togglePause,onPlay()"
        ></i>
        <!-- 暂停按钮 -->
        <i class="icon-pause playIcon" v-show="!this.$store.state.isPause" @click="togglePause()"></i>
        <!-- 下一首 -->
        <i class="icon-next prev-next-icon" @click="nextMusic()"></i>
      </div>

      <!-- 中间音乐条 -->
      <div class="music-control">
        <!-- 音乐信息 -->
        <div class="musicInfo">
          <!-- <span class="musicName">{{this.$store.getters.getMusicName}}</span>
          <span class="author">{{this.$store.getters.getMusicSinger}}</span>-->
          <span
            class="musicName"
          >{{this.currentMusic.musicName===undefined?this.currentMusic.music.musicName:this.currentMusic.musicName}}</span>
          <span
            class="author"
          >{{this.currentMusic.musicSinger===undefined?this.currentMusic.music.musicSinger:this.currentMusic.musicSinger}}</span>
        </div>
        <!-- 进度条 + 时间 -->
        <div
          class="progress-time"
          @click="onProcessClick"
          @mousemove="onProcessItemMouseMove"
          @mouseup="onProcessItemMouseUp"
          @mousedown="onProcessItemMouseDown"
        >
          <!-- 进度条 -->
          <div class="progress">
            <div class="progress-played">
              <div class="progress-item">
                <div class="progress-item-inside"></div>
              </div>
            </div>
          </div>

          <!-- 时间 -->
          <div class="time">
            <span class="time-played">{{currentTime}}</span>/
            <span class="time-totle">{{totalTime}}</span>
          </div>
        </div>

        <audio></audio>
      </div>

      <!-- 右部其他按钮 -->
      <div class="right-control">
        <!-- 收藏到歌单 -->
        <span class="icon-folder folder" @click="showDialog"></span>
        
        <!-- 列表循环 -->
        <span
          class="icon-circulation-list circulation"
          v-show="playCircle===0"
          @click="playCircleEvent"
        ></span>
        <!-- 随机播放 -->
        <span
          class="icon-circulation-random circulation"
          v-show="playCircle===1"
          @click="playCircleEvent"
        ></span>
        <!-- 单曲循环 -->
        <span
          class="icon-circulation-single circulation"
          v-show="playCircle===2"
          @click="playCircleEvent"
        ></span>
      </div>

      <div class="volumeDiv">
        <!-- 音量控制条 -->
        <div class="volume-control" v-show="volumeShow">
          <div
            class="volume-progress"
            @click="onVolumeProcessSet"
            @mousedown="onVolumeProcessItemMouseDown"
            @mouseup="onVolumeProcessItemMouseUp"
            @mousemove="onVolumeProcessItemMove"
          >
            <div class="volume-current">
              <div class="volume-item">
                <div class="volume-item-inside"></div>
              </div>
            </div>
          </div>
        </div>
        <!-- 音量 -->
        <span class="icon-volume volume" @click="volumeShowEvent"></span>
      </div>
    </div>
  </div>
</template>

<script>
import addMusic from "./addToList"
export default {
  props: ["musiclist", "title", "singer", "playingIndex", "path"],
  data() {
    return {
      // 是否暂停状态
      //isPause: true,
      isShowAdd: false,
      // 当前音乐列表
      currentIndex: this.playingIndex,
      musicList: this.$store.state.currentList,
      // //测试样例
      // musicList: ["../assets/LAKEY INSPIRED - Chill Day.mp3","../assets/Queen - We Are the Champions.mp3","../assets/MT1990 - 小步的舞曲（The Minuet）.mp3"],
      // 当前音乐
      currentMusic: {
        musicName:"",
        musicSinger: "",
        music:{
          musicName:"",
          musicSinger: "",
        }
      },
      // 总时间
      totalTime: "00:00",
      // 当前播放时间
      currentTime: "00:00",
      // 进度条item是否可拖动
      processItemMove: false,
      // 进度条item是否可拖动
      volumeProcessItemMove: false,
      // 音量控制显示
      volumeControl: false,
      // 当前的播放模式 1列表循环 2随机 3单曲
      playMode: 1,
      // 歌单显示控制
      isMusicListShow: false,
      // 音量控制显示
      volumeShow: false,
      playCircle: 0 //0顺序播放 1随机播放 2单曲循环
    };
  },
  methods: {
    showDialog(){
            this.isShowAdd = !this.isShowAdd;
        },
        
        falseShow(){
            console.log("hahahhahaah")
            this.isShowAdd = false;
        },
    togglePause() {
      const audio = document.querySelector("audio");
      if (this.$store.getters.getIsPause) {
        this.$store.commit("setIsPause", false);
      } else {
        this.$store.commit("setIsPause", true);
      }

      if (!this.$store.state.isPause) {
        audio.play();
      } else audio.pause();
    },
    playCircleEvent() {
      this.playCircle = (this.playCircle + 1) % 3;
    },
    volumeShowEvent() {
      this.volumeShow = !this.volumeShow;
    },
    getTime(time) {
      if (time) {
        const minute = parseInt((time / 60) % 60);
        const second = parseInt(time % 60);
        let minuteText = `${minute}`;
        let secondText = `${second}`;
        if (minute < 10) {
          minuteText = `0${minute}`;
        }
        if (second < 10) {
          secondText = `0${second}`;
        }
        return `${minuteText}:${secondText}`;
      } else {
        return "00:00";
      }
    },

    // 播放
    onPlay() {
      console.log("heool");
      const audio = document.querySelector("audio");
      this.$store.commit("setIsPause", false);
      if (this.currentMusic.music === undefined) {
        audio.src = this.currentMusic.musicPath;
      } else {
        console.log("AllList");
        audio.src = this.currentMusic.music.musicPath;
      }
      console.log(audio.src);
      audio.play();
    },

    // 暂停
    onPause() {
      const audio = this.audio;
      this.$store.commit("setIsPause", true);
      audio.pause();
    },

    // 点击进度条
    onProcessClick(e) {
      this.setProcess(e, "click");
    },
    setProcess(e, key) {
      // 获取当前点击偏移宽度
      console.log(key);
      const audio = document.querySelector("audio");
      const processPlayed = document.querySelector(".progress-played");
      const process = document.querySelector(".progress");
      const processItem = document.querySelector(".progress-item");
      let offsetWidth = e.pageX - processPlayed.getBoundingClientRect().left;
      // 需要限制拖动范围，不能超出左右边界
      if (offsetWidth < 0) {
        offsetWidth = 0;
      }
      if (offsetWidth > process.offsetWidth) {
        offsetWidth = process.offsetWidth;
        console.log(process);
      }
      // 计算偏移比例
      const offsetPercentage = offsetWidth / process.offsetWidth;
      // 计算当前时间
      let currentTime = audio.duration * offsetPercentage;
      if (key === "click" || key === "dragMove") {
        // 设置当前进度条偏移位置
        console.log(key);
        processPlayed.style.width = `${offsetWidth}px`;
        processItem.style.left = `${offsetWidth - 4}px`;
        this.currentTime = this.getTime(currentTime);
      }
      // 设置当前音乐进度 拖拽不需要及时计算播放进度，会导致音乐像快进一样的效果，体验很差，点击进度条是需要及时设置当前播放进度的
      if (key === "dragEnd" || key === "click") {
        console.log(key);
        audio.currentTime = currentTime;
      }
    },
    //  进度条item MouseDown
    onProcessItemMouseDown(e) {
      // 阻止事件冒泡
      e.stopPropagation();
      // 按下后置item为可拖动状态
      this.processItemMove = true;
    },
    //  进度条item MouseMove
    onProcessItemMouseMove(e) {
      // 阻止事件冒泡
      e.stopPropagation();
      if (this.processItemMove) {
        this.setProcess(e, "dragMove");
      }
    },
    //  进度条item MouseUp
    onProcessItemMouseUp(e) {
      // 阻止事件冒泡
      e.stopPropagation();
      // 这里的判断是关键，一定要判断是处于processItemMove=true的状态，表示当前正在拖动进度条，不然会导致mouseUp和onClick事件的传播问题
      if (this.processItemMove) {
        this.processItemMove = false;
        // 松开后置item为禁止拖动的状态
        this.setProcess(e, "dragEnd");
      }
    },
    // 当前音乐播放结束后下一首音乐处理 根据当前的播放模式决定下一首音乐是什么
    endedPlayMusic() {
      if (this.musicList.length > 0 && this.currentMusic) {
        //  this.currentIndex = this.musicList.findIndex(item => {
        //   return item.id === this.currentMusic.id;
        // });
        // 列表循环
        if (this.playCircle === 0) {
          console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
          console.log(this.currentIndex)
          if (this.musicList[this.currentIndex + 1]) {
            this.currentMusic = this.musicList[this.currentIndex + 1];
            this.currentIndex++;
            this.onSwitchAction();
          } else {
            this.currentMusic = this.musicList[0];
            this.onSwitchAction();
          }
        }
        // 列表随机
        else if (this.playCircle === 1) {
          const len = this.musicList.length;
          const randomIndex = Math.floor(Math.random() * len + 1);
          if (this.musicList[randomIndex + 1]) {
            this.currentMusic = this.musicList[randomIndex + 1];
            this.onSwitchAction();
          } else {
            this.currentMusic = this.musicList[0];
            this.onSwitchAction();
          }
        }
        // 单曲循环
        else if (this.playCircle === 2) {
          this.onSwitchAction();
        }
      } else {
        // 当前播放列表已经空了，则不自动切歌，播放完毕后，直接重置当前的播放的音乐
        this.onSwitchAction();
      }
    },
    // 下一首歌
    //TODO绑定正确的音乐Index值 如下会有index值定死
    nextMusic() {
      const audio = document.querySelector("audio");
      console.log("next");
      if (this.musicList.length > 1 && this.currentMusic) {
        // const this.currentIndex = this.musicList.findIndex(item => {

        //   return item.musicId === this.currentMusic.musicId;
        // });
        console.log(this.currentMusic);
        console.log("当前歌单");
        console.log(this.musicList);
        //this.currentIndex = this.playingIndex;
        //console.log(this.currentIndex);
        if (this.currentIndex + 1 <= this.musicList.length - 1) {
          this.currentMusic = this.musicList[this.currentIndex + 1];
          this.currentIndex++;
          console.log(this.currentIndex);
          this.onSwitchAction();
        } else {
          this.currentMusic = this.musicList[0];
          this.currentIndex = 0;
          this.onSwitchAction();
        }
        console.log(this.currentIndex);
        this.$store.commit(
          "setMusicName",
          this.currentMusic.musicName === undefined
            ? this.currentMusic.music.musicName
            : this.currentMusic.musicName
        );
        this.$store.commit(
          "setMusicSinger",
          this.currentMusic.musicSinger === undefined
            ? this.currentMusic.music.musicSinger
            : this.currentMusic.musicSinger
        );
      } else {
        audio.currentTime = 0;
        this.onSwitchAction();
      }
    },
    // 上一首歌
    previousMusic() {
      // if (this.musicList.length > 1 && this.currentMusic) {
      //   this.currentIndex = this.musicList.findIndex(item => {
      //     return item.musicId === this.currentMusic.musicId;
      //   });
      //   if (this.musicList[this.currentIndex - 1]) {
      //     this.currentMusic = this.musicList[this.currentIndex - 1];
      //     this.onSwitchAction();
      //   } else {
      //     this.currentMusic = this.musicList[this.musicList.length - 1];

      //     this.onSwitchAction();
      //   }
      // } else {
      //   console.log(this.audio);
      //   this.audio.currentTime = 0;
      //   this.onSwitchAction();
      // }
      const audio = document.querySelector("audio");
      console.log("next");
      if (this.musicList.length > 1 && this.currentMusic) {
        // const this.currentIndex = this.musicList.findIndex(item => {

        //   return item.musicId === this.currentMusic.musicId;
        // });
        console.log(this.currentMusic);
        console.log("当前歌单");
        console.log(this.musicList);
        //this.currentIndex = this.playingIndex;
        //console.log(this.currentIndex);
        if (this.currentIndex - 1 >= 0) {
          this.currentMusic = this.musicList[this.currentIndex - 1];
          this.currentIndex--;
          console.log(this.currentIndex);
          this.onSwitchAction();
        } else {
          this.currentMusic = this.musicList[this.musicList.length - 1];
          this.currentIndex = this.musicList.length - 1;
          this.onSwitchAction();
        }
        console.log(this.currentIndex);
        this.$store.commit(
          "setMusicName",
          this.currentMusic.musicName === undefined
            ? this.currentMusic.music.musicName
            : this.currentMusic.musicName
        );
        this.$store.commit(
          "setMusicSinger",
          this.currentMusic.musicSinger === undefined
            ? this.currentMusic.music.musicSinger
            : this.currentMusic.musicSinger
        );
      } else {
        audio.currentTime = 0;
        this.onSwitchAction();
      }
    },
    // 切歌后相关操作，如果正在播放中，则切歌后还是会直接播放，如果处于暂停，则切歌后会直接播放
    onSwitchAction() {
      // 处于暂停标志，则表示正在播放中，则重置进度条后，直接调用播放，否则就只重置进度条，不调用播放
      this.resetProcess();
      // if (this.$store.state.isPause) {
      //   this.onPlay();
      // }
      this.onPlay();
      this.$store.commit("setIsPause", false);
    },
    // 重新设置当前缓存和播放进度状态，用于切歌后的进度条显示
    resetProcess() {
      const processPlayed = document.querySelector(".progress-played");
      const processItem = document.querySelector(".progress-item");
      // console.log(processPlayed)
      processPlayed.style.width = "0px";
      processItem.style.left = "-4px";
    },
    // // 音量控制条显示隐藏
    // onVolumeControl() {
    //   const { volumeControl } = this.state;
    //   this.setState({ volumeControl: !volumeControl });
    // },
    // // 隐藏音量设置条
    // onVolumeControlHide() {
    //   const { volumeControl } = this.state;
    //   if (volumeControl) {
    //     this.setState({ volumeControl: false });
    //   }
    // },
    // 初始化音量
    initVolumeProcess() {
      const audio = document.querySelector("audio");
      const volumeProcess = document.querySelector(".volume-progress");
      const volumeProcessCurrent = document.querySelector(".volume-current");
      const volumeProcessItem = document.querySelector(".volume-item");
      console.log(volumeProcess);
      // 获取当前音量条高度
      const processLength = 100;
      console.log(processLength);
      // 设置进度条
      volumeProcessCurrent.style.height = `${processLength / 2}px`;
      // 设置进度条item
      volumeProcessItem.style.bottom = `${processLength / 2 - 6}px`;
      // 设置音量
      audio.volume = 0.5;
    },
    // 音量控制条点击
    onVolumeProcessSet(e) {
      const audio = document.querySelector("audio");
      const volumeProcess = document.querySelector(".volume-progress");
      const volumeProcessCurrent = document.querySelector(".volume-current");
      const volumeProcessItem = document.querySelector(".volume-item");
      // 获取当前音量条高度
      const processLength = volumeProcess.offsetHeight;

      // 获取当前点击偏移量
      let volumeOffsetHeight =
        processLength - (e.pageY - volumeProcess.getBoundingClientRect().top);
      // 当前音量进度比例
      let volumepercentage = 0;
      if (volumeOffsetHeight < 0) {
        volumeOffsetHeight = 0;
      }
      if (volumeOffsetHeight > processLength) {
        volumeOffsetHeight = processLength;
      }
      volumepercentage = volumeOffsetHeight / processLength;
      // 设置进度条
      volumeProcessCurrent.style.height = `${volumeOffsetHeight}px`;
      // 设置进度条item
      volumeProcessItem.style.bottom = `${volumeOffsetHeight - 6}px`;
      // 设置音量
      audio.volume = volumepercentage;
    },
    // 音量item鼠标按下方法监听
    onVolumeProcessItemMouseDown() {
      // 设置当前进入可拖动状态
      this.volumeProcessItemMove = true;
    },
    // 音量item鼠标抬起方法监听
    onVolumeProcessItemMouseUp() {
      if (this.volumeProcessItemMove) {
        this.volumeProcessItemMove = false;
      }
    },
    // 音量item鼠标拖拽方法监听
    onVolumeProcessItemMove(e) {
      if (this.volumeProcessItemMove) {
        this.onVolumeProcessSet(e);
      }
    }
    // // 设置音乐播放模式
    // onPlayModeChange() {
    //   const { playMode } = this.state;
    //   if (playMode === 3) {
    //     this.setState({ playMode: 1 });
    //   } else {
    //     this.setState({ playMode: playMode + 1 });
    //   }
    // },

    // // 删除指定歌曲
    // onDeleteMusic(e, item) {
    //   e.stopPropagation();
    //   const { onDeleteMusic } = this.props;
    //   if (onDeleteMusic) {
    //     onDeleteMusic(item.id);
    //   }
    // },

    // // 删除当前全部歌曲
    // onDeleteAllMusic() {
    //   const { onDeleteAllMusic } = this.props;
    //   if (onDeleteAllMusic) {
    //     onDeleteAllMusic();
    //   }
    // },

    // // 歌单切歌
    // onMusicListItemClick(id) {
    //   const { musicList } = this.state;
    //   const { currentMusic } = this.state;
    //   const index = musicList.findIndex(item => {
    //     return item.id === id;
    //   });
    //   if (index !== -1) {
    //     // 当前播放的音乐和点击的音乐相同，则重置播放时间
    //     if (currentMusic.id === id) {
    //       this.resetProcess();
    //       this.audio.currentTime = 0;
    //       this.onPlay();
    //     } else {
    //       this.setState({ currentMusic: musicList[index] }, () => {
    //         this.resetProcess();
    //         this.onPlay();
    //       });
    //     }
    //   }
    // }
  },
  created() {
    //  const audio = document.querySelector('audio');
    // if (this.currentMusic.musicName != undefined) {
    //   this.$store.commit("setMusicName", this.currentMusic.musicName);
    //   this.$store.commit("setMusicSinger", this.currentMusic.musicSinger);
    // } else {
    //   this.$store.commit("setMusicName", this.currentMusic.music.musicName);
    //   this.$store.commit("setMusicSinger", this.currentMusic.music.musicSinger);
    // }
  },
  computed: {
    getStoreItem() {
      return this.$store.state.currentList;
    },
    getPlayingIndex() {
      return this.playingIndex;
    }
  },
  watch: {
    getStoreItem() {
      this.musicList = this.$store.state.currentList;
      console.log(this.playingIndex);
      this.currentMusic = this.$store.state.currentList[this.playingIndex];
      console.log("store");
      console.log(this.$store.state.currentList);
      console.log("currentMusic");
      console.log(this.currentMusic);
    },
    getPlayingIndex() {
      this.currentMusic = this.$store.state.currentList[this.playingIndex];
      this.currentIndex = this.playingIndex;
    }
  },
  mounted() {
    const audio = document.querySelector("audio"); //获取播放器 this.audio
    //console.log(audio)
    const processPlayed = document.querySelector(".progress-played");
    const processItem = document.querySelector(".progress-item");
    //console.log(audio)
    audio.addEventListener("canplay", () => {
      this.totalTime = this.getTime(parseInt(audio.duration));
    });
    audio.addEventListener("timeupdate", () => {
      //获取当前播放时间
      const currentTime = parseInt(audio.currentTime);
      // 缓存对象
      //const buffered = audio.buffered;
      // 当前缓存时间
      // let bufferTime = 0;
      // if (buffered.length !== 0) {
      //   bufferTime = buffered.end(buffered.length - 1);
      //   console.log(bufferTime)
      // }
      // 当前缓存缓存宽度计算 5rem是进度条宽度
      //const bufferWidth = 500 * (bufferTime / audio.duration);
      // 当前播放宽度计算 5rem是进度条宽度
      const playWidth = 492 * (audio.currentTime / audio.duration);
      // 如果正在拖动进度条的时候，不监听播放进度
      if (!this.processItemMove) {
        processPlayed.style.width = `${playWidth}px`;
        processItem.style.left = `${playWidth - 4}px`;
        // 未拖动时根据时间变化设置当前时间

        this.currentTime = this.getTime(currentTime);
      }
      //this.processBuffered.style.width = `${bufferWidth}px`;
    });

    // 当前音乐播放完毕监听
    audio.addEventListener("ended", () => {
      this.endedPlayMusic();
    });

    // this.resetProcess();

    // 初始化音量
    this.initVolumeProcess();
  },
  components:{
    addMusic
  }
};
</script>

<style>
@import "../assets/css/style.css";
.v-modal{
  display: none;
}
</style>