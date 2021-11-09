
class DrumKit {
    constructor() {
        this.pads = document.querySelectorAll(".pad");
        this.playBtn = document.querySelector(".play");
        this.currentKick = "./sounds/kick-classic.wav";
        this.currentSnare = "./sounds/snare-acoustic01.wav";
        this.currentHihat = "./sounds/hihat-acoustic01.wav";
        this.kickAudio = document.querySelector(".kick-sound");
        this.snareAudio = document.querySelector(".snare-sound");
        this.hihatAudio = document.querySelector(".hihat-sound");
        this.index = 0;
        this.bpm = 150;
        this.isPlaying = null;
        this.selects = document.querySelectorAll("select");
        this.muteBtns = document.querySelectorAll(".mute");
        this.tempoSlider = document.querySelector(".tempo-slider");
      }
    // console.log("adsas");
  
    activePad(){
        // console.log(this);
        this.classList.toggle("active");
    }
    repeat(){
        let step = this.index % 8;
        const activeBars = document.querySelectorAll(`.b${step}`);
        // console.log(step);
                    //check if over the pads
  
        activeBars.forEach(bar => {
            bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
            //if pads are active 
            if(bar.classList.contains("active")){
                //check each sound
                if(bar.classList.contains("kick-pad")){
                    this.kickAudio.currentTime = 0;
                    this.kickAudio.play();
                }
                if(bar.classList.contains("snare-pad")){
                    this.snareAudio.currentTime = 0;
                    this.snareAudio.play();
                }
                if(bar.classList.contains("hihat-pad")){
                    this.hihatAudio.currentTime = 0;
                    this.hihatAudio.play();
                }
            }
             
        });
  
        this.index++;
    }
    
    start() {
        const interval = (60/this.bpm) * 1000;
        // console.log(this.bpm);
        if(!this.isPlaying){
        this.isPlaying = setInterval(() => {
            this.repeat();
        }, interval);
    }else{
        clearInterval(this.isPlaying);
        this.isPlaying = null;
    }
    }
    updateButton(){
        //null default- is playing
        console.log(this.playBtn);
        this.playBtn.classList.toggle("active");
        // e.target.classList.toggle("active");
        if(!this.isPlaying){
            this.playBtn.innerText = "Stop";
            

        }
        else{
            this.playBtn.innerHTML = "Play";
        }
    }
  
  changeSound(e){
    const selectionName = e.target.name;    
    const selectionValue = e.target.value;
  // console.log(selectionName);
  switch(selectionName){
    case "kick-select":
        this.kickAudio.src = selectionValue;
        break;
    case "snare-select":
        this.snareAudio.src = selectionValue;
        break;
    case "hihat-select":
        this.hihatAudio.src = selectionValue;
        break;
  }
  };
  
  mute(e){
    const muteIndex = e.target.getAttribute("data-track");
        // console.log(muteIndex);
        e.target.classList.toggle("active");
        if(e.target.classList.contains("active")){
            switch(muteIndex){
                case "0":
                    this.kickAudio.volume = 0;
                    break;
                case "1":
                    this.snareAudio.volume = 0;
                    break;
                case "2":
                    this.hihatA,
                    udio.volume = 0;
                    break;
            }
        }
        else{
            switch(muteIndex){
                case "0":
                    this.kickAudio.volume = 1;
                    break;
                case "1":
                    this.snareAudio.volume = 1;
                    break;
                case "2":
                    this.hihataudio.volume = 1;
                    break;
            }
        
        }
  
  }
  
  changeTempo(e){
    // console.log(e);
    const tempoText = document.querySelector(".tempo-nr")
    tempoText.innerText = e.target.value;
  }
  
  updateTempo(e){
    this.bpm = e.target.value;
    clearInterval(this.isPlaying);
    this.isPlaying = null;
    const playBtn = document.querySelector(".play");
    console.log(document.querySelector(".play"));
    if(!playBtn.classList.contains("active")){
        this.start();
    }
  }
  
  
  }
  const drumKit = new DrumKit();
  
  drumKit.pads.forEach(pad => {
    pad.addEventListener('click', drumKit.activePad);
    pad.addEventListener('animationend', function(){
        this.style.animation = "";
    })
  });
  
  drumKit.playBtn.addEventListener("click", function() {
    drumKit.updateButton();
    drumKit.start();
  });
  // console.log(playBtn);
  
  drumKit.selects.forEach(select => {
    select.addEventListener('change', function(e){
        drumKit.changeSound(e);
    })
  });
  
  drumKit.muteBtns.forEach(btn => {
    btn.addEventListener("click", function(e){
        drumKit.mute(e);
    })
  });
  
  drumKit.tempoSlider.addEventListener("input", function(e){
    drumKit.changeTempo(e);
  });
  
  drumKit.tempoSlider.addEventListener("change", function(e) {
    drumKit.updateTempo(e);
  });