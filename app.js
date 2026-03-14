const visitorForm = document.getElementById("visitorForm");

if (visitorForm) {
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

      const result = await response.json();

      if (!response.ok || !result.ok) {
        throw new Error(result.error || "No se pudo guardar el registro.");
      }

      alert(`Registro guardado. ID: ${result.last_row_id}`);
      visitorForm.reset();
    } catch (error) {
      alert(`Error al guardar: ${error.message}`);
      console.error(error);
    }
  });
}