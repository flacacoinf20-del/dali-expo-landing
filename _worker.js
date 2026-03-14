export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // API
    if (url.pathname === "/api/registro") {

      if (request.method !== "POST") {
        return new Response("Method Not Allowed", { status: 405 });
      }

      const data = await request.json();

      const nombre = data.nombre || null;
      const institucion = data.institucion || null;
      const pais = data.pais || null;
      const email = data.email || null;

      const result = await env.DB.prepare(
        "INSERT INTO visitantes (nombre, institucion, pais, email) VALUES (?, ?, ?, ?)"
      )
      .bind(nombre, institucion, pais, email)
      .run();

      return new Response(
        JSON.stringify({ ok: true, id: result.meta.last_row_id }),
        { headers: { "Content-Type": "application/json" } }
      );
    }

    // STATIC FILES
    return env.ASSETS.fetch(request);
  }
};