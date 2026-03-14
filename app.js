const visitorForm = document.getElementById("visitorForm");

if (visitorForm) {
  visitorForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const data = {
      nombre:      document.getElementById("nombre")?.value.trim()      || "",
      institucion: document.getElementById("institucion")?.value.trim() || "",
      pais:        document.getElementById("pais")?.value.trim()        || "",
      email:       document.getElementById("email")?.value.trim()       || null
    };

    try {
      const response = await fetch("/api/registro", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(data)
      });

      const raw = await response.text();
      console.log("Raw response:", raw);

      let result;
      try {
        result = JSON.parse(raw);
      } catch {
        throw new Error("Respuesta no es JSON: " + raw);
      }

      if (!response.ok || !result.ok) {
        throw new Error(result.error || `HTTP ${response.status}`);
      }

      alert(`✅ Registro guardado. ID: ${result.last_row_id}`);
      visitorForm.reset();

    } catch (err) {
      alert(`❌ Error: ${err.message}`);
      console.error(err);
    }
  });
}