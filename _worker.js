// Clave para descargar el CSV. Cámbiala por una que solo tú conozcas.
const EXPORT_KEY = "520519@Secures$€$";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // ——— POST /api/registro ———
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

    // ——— GET /export-visitantes?key=... → descarga CSV ———
    if (url.pathname === "/export-visitantes") {
      if (request.method !== "GET") {
        return new Response(
          JSON.stringify({ ok: false, error: "Method Not Allowed" }),
          { status: 405, headers: { "Content-Type": "application/json" } }
        );
      }

      const key = url.searchParams.get("key");
      if (key !== EXPORT_KEY) {
        return new Response(
          JSON.stringify({ ok: false, error: "Unauthorized" }),
          { status: 401, headers: { "Content-Type": "application/json" } }
        );
      }

      try {
        const { results } = await env.DB
          .prepare(
            "SELECT id, nombre, institucion, pais, email, fecha FROM visitantes ORDER BY id"
          )
          .all();

        const header = "id,nombre,institucion,pais,email,fecha";
        const escape = (v) => {
          if (v == null) return "";
          const s = String(v);
          return s.includes(",") || s.includes('"') || s.includes("\n")
            ? '"' + s.replace(/"/g, '""') + '"'
            : s;
        };
        const rows = (results || []).map(
          (r) =>
            [r.id, r.nombre, r.institucion, r.pais, r.email, r.fecha]
              .map(escape)
              .join(",")
        );
        const csv = [header, ...rows].join("\n");

        return new Response(csv, {
          status: 200,
          headers: {
            "Content-Type": "text/csv; charset=utf-8",
            "Content-Disposition": 'attachment; filename="visitantes.csv"'
          }
        });
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