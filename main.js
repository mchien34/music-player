const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const playlist = $(".playlist");
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const cd = $(".cd");
const playBtn = $(".btn-toggle-play");
const player = $(".player");
const progress = $('#progress')
const next = $('.btn-next')
const prev = $('.btn-prev')
const random = $('.btn-random')
const repeat = $('.btn-repeat')

console.log(next,prev);

const app = {
  currentIndex: 0,
  isPlay: false,
  isRandom:false,
  isLoop:false,
  songs: [
    {
      name: "Click Pow Get Down",
      singer: "Raftaar x Fortnite",
      path: "./assets/Click Pow Get Down-Raftaar -VlcMusic.CoM.mp3",
      image: "https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg",
    },
    {
      name: "Tu Phir Se Aana",
      singer: "Raftaar x Salim Merchant x Karma",
      path: "./assets/Tu Phir Se Aana - Raftaar.mp3",
      image:
        "https://1.bp.blogspot.com/-kX21dGUuTdM/X85ij1SBeEI/AAAAAAAAKK4/feboCtDKkls19cZw3glZWRdJ6J8alCm-gCNcBGAsYHQ/s16000/Tu%2BAana%2BPhir%2BSe%2BRap%2BSong%2BLyrics%2BBy%2BRaftaar.jpg",
    },
    {
      name: "Hãy Trao Cho Anh",
      singer: "Sơn Tùng MTP",
      path: "./assets/HayTraoChoAnh.mp3",
      image: "https://avatar-ex-swe.nixcdn.com/playlist/2019/07/02/d/3/7/7/1562051254964.jpg",
    },
    {
      name: "Chúng Ta Không Thuộc Về Nhau",
      singer: "Sơn Tùng MTP",
      path: "./assets/ChungTaKhongThuocVeNhau.mp3",
      image:
        "https://avatar-ex-swe.nixcdn.com/song/2018/05/12/e/8/6/f/1526059033533.jpg",
    },
    {
      name: "Em Của Ngày Hôm Qua",
      singer: "Sơn Tùng MTP",
      path: "./assets/EmCuaNgayHomQua-SonTungMTP-2882720.mp3",
      image:
        "https://avatar-ex-swe.nixcdn.com/song/2017/11/19/e/6/c/1/1511029438465.jpg",
    },
    {
      name: "Một Năm Mới Bình An",
      singer: "Sơn Tùng MTP",
      path: "./assets/MotNamMoiBinhAn-SonTungMTP-4315569.mp3",
      image:
        "https://avatar-ex-swe.nixcdn.com/song/2018/02/26/f/8/3/d/1519612532813.jpg",
    },
    {
      name: "Không Phải Dạng Vừa Đâu",
      singer: "Sơn Tùng MTP",
      path: "./assets/KhongPhaiDangVuaDau-SonTungMTP-3753840.mp3",
      image:
        "https://avatar-ex-swe.nixcdn.com/song/2018/05/11/6/9/1/0/1526046409297.jpg",
    },
    {
      name: "Bình Yên Những Phút Giây",
      singer: "Sơn Tùng MTP",
      path: "./assets/BinhYenNhungPhutGiay-SonTungMTP-4915711.mp3",
      image:
        "https://avatar-ex-swe.nixcdn.com/song/2017/05/19/0/4/d/e/1495163689762.jpg",
    },
  ],

  render: function () {
    const htmls = this.songs.map((song,index) => {
      return `
          <div class="song ${index === this.currentIndex?'active':''}" data-index="${index}">
              <div class="thumb" 
                  style="background-image: url('${song.image}')">
              </div>
              <div class="body">
                  <h3 class="title">${song.name}</h3>
                  <p class="author">${song.singer}</p>
              </div>
              <div class="option">
                  <i class="fas fa-ellipsis-h"></i>
              </div>
          </div>
        `;
    });
    console.log("hello");
    playlist.innerHTML = htmls.join("");
  },
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },
  handleEvent: function () {
    const _this = this;
    const cdWidth = cd.offsetWidth;
    document.onscroll = function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const newWidth = cdWidth - scrollTop;
      console.log(newWidth);
      cd.style.width = newWidth > 0 ? newWidth + "px" : 0;
      cd.style.opacity = newWidth / cdWidth;
    };
    //Xu li CD quay/dung
    const cdRotateAnimation = cdThumb.animate([
      { transform: 'rotate(360deg)'}
    ],{
      duration : 10000,
      iterations : Infinity
    })
    cdRotateAnimation.pause()
    // Xu li khi click play
    playBtn.onclick = function () {
      if (_this.isPlay) {
        audio.pause();
      } else {
        audio.play();      
      }
    };
    audio.onplay = function() {
      _this.isPlay = true;
      player.classList.add("playing");
      cdRotateAnimation.play()
    }
    audio.onpause = function() {
      _this.isPlay = false;
      player.classList.remove("playing");
      cdRotateAnimation.pause()
    }
    // Xu li khi thanh phan tram
    audio.ontimeupdate = function() {
      if (audio.duration){
        const progressPercentage = Math.floor(audio.currentTime /audio.duration *100)
        progress.value = progressPercentage
        console.log(progressPercentage);
      }
    }
    //tua nhanh
    progress.onchange = function(e){
      let seekTime =e.target.value * audio.duration /100;
      audio.currentTime = seekTime;
    }
    //next,prev
    next.onclick = function() {
      if(_this.isRandom){
        _this.randomSong()
      }else{
        _this.nextSong()
      }
      audio.play()
      _this.render()
    }
    prev.onclick = function() {
      if(_this.isRandom){
        _this.randomSong()
      }else{
        _this.prevSong()
      }
      audio.play()
      _this.render()

    }
    random.onclick = function(e) {
      _this.isRandom = !_this.isRandom
      random.classList.toggle('active',_this.isRandom)
    }
    repeat.onclick = function(e) {
      _this.isLoop = !_this.isLoop
      repeat.classList.toggle('active',_this.isLoop)
    }
    // Xử li next song khi audio ended
    audio.onended = function() {
      if(_this.isLoop){
        audio.load()
      }else{
        next.click()  
      }
      audio.play()
    }

    playlist.onclick = function (e) {
      const songNode = e.target.closest(".song:not(.active)");

      if (songNode || e.target.closest(".option")) {
        // Xử lý khi click vào song
        // Handle when clicking on the song
        if (songNode) {
          _this.currentIndex = Number(songNode.dataset.index);
          _this.loadCurrentSong();
          _this.render();
          audio.play();
        }

        // Xử lý khi click vào song option
        // Handle when clicking on the song option
        if (e.target.closest(".option")) {
        }
      }
    };
    
  },
  scrollToActiveSong: function () {
    setTimeout(() => {
      $(".song.active").scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }, 300);
  },
  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
    console.log(heading, cdThumb, audio);
  },
  nextSong: function(){
    this.currentIndex++
    if(this.currentIndex > this.songs.length){
      this.currentIndex = 0
    }
    this.loadCurrentSong()
  },
  prevSong: function(){
    this.currentIndex--
    if(this.currentIndex < 0){
      this.currentIndex = this.songs.length -1
    }
    this.loadCurrentSong()
  },
  randomSong: function() {
    let newIndex
    do{
      newIndex = Math.floor(Math.random() * this.songs.length);
    }while(newIndex === this.currentIndex)
    this.currentIndex = newIndex
    this.loadCurrentSong()

  },
  start: function () {
    //Dinh nghia cac thuoc tinh cho object
    this.defineProperties();
    //Lang nghe cac su kien
    this.handleEvent();
    //
    this.loadCurrentSong();
    //Render playlist
    this.render();
  },
};
app.start();
