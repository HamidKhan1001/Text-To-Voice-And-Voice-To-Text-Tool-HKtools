let synth = window.speechSynthesis;

window.onload = () => {
  loadVoices();
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = loadVoices;
  }
};

function loadVoices() {
  const voices = synth.getVoices();
  const voiceSelect = document.getElementById('voice');
  voiceSelect.innerHTML = '';
  voices.forEach((voice, index) => {
    const option = document.createElement('option');
    option.textContent = `${voice.name} (${voice.lang})`;
    option.value = index;
    voiceSelect.appendChild(option);
  });
}

function speak() {
  const text = document.getElementById('text').value;
  const pitch = parseFloat(document.getElementById('pitch').value);
  const rate = parseFloat(document.getElementById('rate').value);
  const volume = parseFloat(document.getElementById('volume').value);
  const voiceIndex = document.getElementById('voice').value;
  const voices = synth.getVoices();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.pitch = pitch;
  utterance.rate = rate;
  utterance.volume = volume;
  utterance.voice = voices[voiceIndex];
  synth.speak(utterance);
}

function listen() {
  const recognition = new webkitSpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = function (event) {
    const transcript = event.results[0][0].transcript;
    document.getElementById('text').value = transcript;
    document.getElementById('output').textContent = "You said: " + transcript;
  };

  recognition.onerror = function (event) {
    alert("Error: " + event.error);
  };

  recognition.start();
}

function clearText() {
  document.getElementById('text').value = '';
  document.getElementById('output').textContent = '';
}
document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("navMenu");

  toggle.addEventListener("click", () => {
    menu.classList.toggle("nav-menu-active");
  });
});

