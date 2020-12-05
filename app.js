// Creating a loop going throuh pad //

class DrumKit {
    constructor() {
      this.pads = document.querySelectorAll(".pad");
      this.playBtn = document.querySelector(".play");
      this.kickAudio = document.querySelector(".kick-sound");
      this.snareAudio = document.querySelector(".snare-sound");
      this.hihatAudio = document.querySelector(".hihat-sound");
      this.clapAudio = document.querySelector(".clap-sound");
      this.index = 0;
      this.bpm = 150;
      this.isPlaying = null;
      this.selects = document.querySelectorAll("select");
      this.muteBtns = document.querySelectorAll(".mute");
      this.tempoSlider = document.querySelector(".tempo-slider");
    }
    activePad() {
      this.classList.toggle("active");
    }
     // loop through each //
    repeat() { //Method //
      let step = this.index % 8;
      const activeBars = document.querySelectorAll(`.b${step}`); //Selects all three b's from HTML //
      // Loop over the pads with animation//
      activeBars.forEach(bar => {
        bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;// 2 allows to return to previous position, smooth //
        // Check if pads active //
        if (bar.classList.contains("active")) {
          // Check each sound //
          if (bar.classList.contains("kick-pad")) {
            this.kickAudio.currentTime = 0; // Allows to play pads after each other //
            this.kickAudio.play();
          }
          if (bar.classList.contains("snare-pad")) {
            this.snareAudio.currentTime = 0;
            this.snareAudio.play();
          }
          if (bar.classList.contains("hihat-pad")) {
            this.hihatAudio.currentTime = 0;
            this.hihatAudio.play();
          }
          if (bar.classList.contains("clap-pad")) {
            this.clapAudio.currentTime = 0;
            this.clapAudio.play();
          }
        }
      });
      this.index++;
    }
    start() { //Another method invoking repeat multiple times//
      const interval = (60 / this.bpm) * 1000;
      //Check if it's playing
  
      if (this.isPlaying) { //this.isPlaying returns value from setInterval, clear interval -2-; null is not equal to value so it is false//
        //Clear the interval
        clearInterval(this.isPlaying);
        this.isPlaying = null; //Setting back to null //
      } else {
        this.isPlaying = setInterval(() => { //set interval retuns value, that can be used to clear interval -1- // 
          this.repeat();
        }, interval); //Arrow function allows to refer to repeat method's keyword, not window object. 1000 ads time ms*, interval controls the looping speed // 
      }
    }
    updateBtn() {
      //NULL
  
      if (!this.isPlaying) {
        this.playBtn.innerText = "Stop";
        this.playBtn.classList.add("active");
        this.playBtn.style.backgroundColor = "#CC2936";
      } else {
        this.playBtn.innerText = "Play";
        this.playBtn.classList.remove("active");
        this.playBtn.style.backgroundColor = "#2A7221";
      }
    }
    changeSound(e) {
      const selectionName = e.target.name; // Returns selection name //
      const selectionValue = e.target.value; // returns selection value //
      switch (selectionName) {
        case "kick-select":
          this.kickAudio.src = selectionValue; // selection name refers to kickaudio src and selection options //
          break;
        case "snare-select":
          this.snareAudio.src = selectionValue;
          break;
        case "hihat-select":
          this.hihatAudio.src = selectionValue;
          break;
        case "clap-select":
          this.clapAudio.src = selectionValue;
          break;
      }
    }
    mute(e) {
      const muteIndex = e.target.getAttribute("data-track"); // button attribute with value 0,1,2//
      e.target.classList.toggle("active"); //asign class
      if (e.target.classList.contains("active")) {
        switch (muteIndex) {
          case "0":
            this.kickAudio.volume = 0;
            break;
          case "1":
            this.snareAudio.volume = 0;
            break;
          case "2":
            this.hihatAudio.volume = 0;
            break;
          case "3":
            this.clapAudio.volume = 0;
            break;
        }
      } else {
        switch (muteIndex) {
          case "0":
            this.kickAudio.volume = 1;
            break;
          case "1":
            this.snareAudio.volume = 1;
            break;
          case "2":
            this.hihatAudio.volume = 1;
            break;
          case "3":
            this.clapAudio.volume = 1;
            break;
        }
      }
    }
    changeTempo(e) {
      const tempoText = document.querySelector(".tempo-nr");
  
      tempoText.innerText = e.target.value;
    }
    updateTempo(e) {
      this.bpm = e.target.value;
      clearInterval(this.isPlaying); // clear interval //
      this.isPlaying = null;
      const playBtn = document.querySelector(".play"); //restart the event in order to update bpm //
      if (playBtn.classList.contains("active")) {
        this.start();
      }
    }
  }
  
  const drumKit = new DrumKit();
  
  //Event Listeners
  
  drumKit.pads.forEach(pad => { //Add a class active, .this does not matter in this case //
    pad.addEventListener("click", drumKit.activePad);
    pad.addEventListener("animationend", function() { //Stops animation for pads and allows them to start again //
      this.style.animation = "";
    });
  });
  
  drumKit.playBtn.addEventListener("click", function() { // Function allows to refer to inside object this, runs callback //
    drumKit.updateBtn();
    drumKit.start();
  });
  
  drumKit.selects.forEach(select => { // e allows to invoke on the event on the callback function //
    select.addEventListener("change", function(e) {
      drumKit.changeSound(e);
    });
  });
  drumKit.muteBtns.forEach(btn => {
    btn.addEventListener("click", function(e) {
      drumKit.mute(e);
    });
  });
  
  drumKit.tempoSlider.addEventListener("input", function(e) {
    drumKit.changeTempo(e);
  });
  drumKit.tempoSlider.addEventListener("change", function(e) {
    drumKit.updateTempo(e);
  });
  
  /* ------------ Piano ----------------- */

const WHITE_KEYS = ['z', 'x', 'c', 'v', 'b', 'n', 'm'] //array assigned to each key
const BLACK_KEYS = ['s', 'd', 'g', 'h', 'j']

const keys = document.querySelectorAll('.key');
const whiteKeys = document.querySelectorAll('.key.white');
const blackKeys = document.querySelectorAll('.key.black');

keys.forEach(key => {
  key.addEventListener('click', () => playNote(key))
});

document.addEventListener('keydown', e => { //allows to play key on keyboard
  if (e.repeat) return;
  const key = e.key;
  const whiteKeyIndex = WHITE_KEYS.indexOf(key);
  const blackKeyIndex = BLACK_KEYS.indexOf(key);

  if (whiteKeyIndex > -1) playNote(whiteKeys[whiteKeyIndex]) // whiteKeyIndex could not be less than -1, run the playnote function with index
  if (blackKeyIndex > -1) playNote(blackKeys[blackKeyIndex])
});

function playNote(key) {
  const noteAudio = document.getElementById(key.dataset.note) // dataset allows to retrieve class key.data.note
  noteAudio.currentTime = 0 // allows notes to play after each other 
  noteAudio.play()
  key.classList.add('active') // classlist add and remove
  noteAudio.addEventListener('ended', () => {
    key.classList.remove('active')
  })
};