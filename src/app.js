class SoundGenerator {
  constructor() {
    this.isPlaying = false;
    this.audioContext = null;
    this.intervalId = null;

    this.toggleButton = document.getElementById("toggleButton");
    this.toggleButton.addEventListener("click", () => this.togglePlay());

    this.initAudioContext();
  }

  initAudioContext() {
    this.audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
  }

  getFrequency() {
    return Math.random() * (2000 - 200) + 200;
  }

  playTone(frequency) {
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = "sine";

    gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);

    oscillator.start();
    oscillator.stop(this.audioContext.currentTime + 0.1);
  }

  start() {
    this.isPlaying = true;
    this.toggleButton.textContent = "Pysäytä";
    this.toggleButton.classList.add("playing");

    this.intervalId = setInterval(() => {
      const frequency = this.getFrequency();
      this.playTone(frequency);
    }, 100);
  }

  stop() {
    this.isPlaying = false;
    this.toggleButton.textContent = "Aloita";
    this.toggleButton.classList.remove("playing");

    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  togglePlay() {
    if (this.isPlaying) {
      this.stop();
    } else {
      this.start();
    }
  }
}

// Käynnistä sovellus kun sivu on ladattu
document.addEventListener("DOMContentLoaded", () => {
  new SoundGenerator();
});
