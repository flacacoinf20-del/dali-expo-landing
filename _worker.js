export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/registro") {
      if (request.method !== "POST") {
        return new Response(
          JSON.stringify({ ok: false, error: "Method Not Allowed" }),
          {
            status: 405,
            headers: { "Content-Type": "application/json" }
          }
        );
      }

      try {
        const data = await request.json();

        const nombre = data.nombre?.trim() || null;
        const institucion = data.institucion?.trim() || null;
        const pais = data.pais?.trim() || null;
        const email = data.email?.trim() || null;

        const result = await env.DB
          .prepare(
            "INSERT INTO visitantes (nombre, institucion, pais, email) VALUES (?, ?, ?, ?)"
          )
          .bind(nombre, institucion, pais, email)
          .run();

        return new Response(
          JSON.stringify({
            ok: true,
            id: result?.meta?.last_row_id ?? null
          }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" }
          }
        );
      } catch (error) {
        return new Response(
          JSON.stringify({
            ok: false,
            error: String(error?.message || error)
          }),
          {
            status: 500,
            headers: { "Content-Type": "application/json" }
          }
        );
      }
    }

    return env.ASSETS.fetch(request);
  }
};
