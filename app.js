const heroSection = document.getElementById("heroSection");
const formSection = document.getElementById("formSection");
const openFormBtn = document.getElementById("openFormBtn");
const visitorForm = document.getElementById("visitorForm");
const daliFace = document.getElementById("daliFace");
const titleBlock = document.getElementById("titleBlock");

const daliAudio = new Audio("assets/dali-bienvenida.mp3");
daliAudio.preload = "auto";

let introFinished = false;
let audioStarted = false;

function revealPortrait() {
  daliFace.classList.remove("intro-hidden");
  daliFace.classList.add("intro-visible");
  titleBlock.classList.add("visible");
}

function revealButton() {
  openFormBtn.classList.remove("hidden");
  openFormBtn.classList.add("revealed");
  introFinished = true;
}

async function playIntroAudio() {
  if (audioStarted) return;
  audioStarted = true;

  try {
    await daliAudio.play();
  } catch {
    audioStarted = false;
  }
}

function blink() {
  if (heroSection.classList.contains("hidden")) return;

  daliFace.style.opacity = "0.95";

  setTimeout(() => {
    daliFace.style.opacity = "1";
  }, 110);
}

function pulseFace() {
  if (heroSection.classList.contains("hidden")) return;

  daliFace.style.transform = "scale(1.018)";

  setTimeout(() => {
    daliFace.style.transform = "";
  }, 700);
}

function startIntro() {
  setTimeout(revealPortrait, 250);
  setTimeout(() => {
    playIntroAudio();
  }, 900);
  setTimeout(revealButton, 6200);
}

window.addEventListener("load", () => {
  startIntro();
});

document.addEventListener(
  "click",
  () => {
 const visitorForm = document.getElementById("visitorForm");

visitorForm.addEventListener("submit", async (event) => {

  event.preventDefault();

  const data = {
    nombre: document.getElementById("nombre").value.trim(),
    institucion: document.getElementById("institucion").value.trim(),
    pais: document.getElementById("pais").value.trim(),
    email: document.getElementById("email").value.trim() || null
  };

  await fetch("/api/registro", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  visitorForm.reset();
  alert("Registro guardado");
});