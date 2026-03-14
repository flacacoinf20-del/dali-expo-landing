document.addEventListener("DOMContentLoaded", () => {
  const heroSection = document.getElementById("heroSection");
  const formSection = document.getElementById("formSection");
  const daliFace = document.getElementById("daliFace");
  const titleBlock = document.getElementById("titleBlock");
  const openFormBtn = document.getElementById("openFormBtn");
  const visitorForm = document.getElementById("visitorForm");

  // Intro simple
  setTimeout(() => {
    daliFace?.classList.remove("intro-hidden");
    daliFace?.classList.add("intro-visible");
    titleBlock?.classList.add("visible");
  }, 300);

  setTimeout(() => {
    openFormBtn?.classList.remove("hidden");
    openFormBtn?.classList.add("revealed");
  }, 1800);

  openFormBtn?.addEventListener("click", () => {
    heroSection?.classList.add("hidden");
    formSection?.classList.remove("hidden");
  });

  if (!visitorForm) return;

  visitorForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const data = {
      nombre: document.getElementById("nombre")?.value.trim() || "",
      institucion: document.getElementById("institucion")?.value.trim() || "",
      pais: document.getElementById("pais")?.value.trim() || "",
      email: document.getElementById("email")?.value.trim() || null
    };

    try {
      const response = await fetch("/api/registro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const raw = await response.text();
      let result;

      try {
        result = JSON.parse(raw);
      } catch {
        throw new Error(`Respuesta no JSON. HTTP ${response.status}`);
      }

      if (!response.ok || !result.ok) {
        throw new Error(result.error || `HTTP ${response.status}`);
      }

      alert(`✅ Registro guardado. ID: ${result.id}`);
      visitorForm.reset();
    } catch (error) {
      alert(`❌ Error: ${error.message}`);
      console.error(error);
    }
  });
});
