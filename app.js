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
    if (!audioStarted) {
      playIntroAudio();
    }
  },
  { once: true }
);

setInterval(blink, 4800);
setInterval(pulseFace, 7200);

openFormBtn.addEventListener("click", () => {
  heroSection.classList.add("hidden");
  formSection.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
});

visitorForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const institucion = document.getElementById("institucion").value.trim();
  const pais = document.getElementById("pais").value.trim();
  const email = document.getElementById("email").value.trim();
  const consent = document.getElementById("consent").checked;

  if (!nombre || !institucion || !pais) {
    alert("Complete nombre, institución y país.");
    return;
  }

  console.log({
    nombre,
    institucion,
    pais,
    email: email || null,
    consentimiento_eventos: consent,
    evento: "goya-dali-del-capricho-al-disparate",
    fecha_iso: new Date().toISOString(),
    intro_finished: introFinished
  });

  alert("Registro enviado correctamente.");
  visitorForm.reset();
});