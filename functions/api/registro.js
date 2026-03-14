export async function onRequestPost(context) {

  const { request, env } = context;
  const data = await request.json();

  const nombre = data.nombre || null;
  const institucion = data.institucion || null;
  const pais = data.pais || null;
  const email = data.email || null;

  await env.DB.prepare(`
    INSERT INTO visitantes (nombre, institucion, pais, email)
    VALUES (?, ?, ?, ?)
  `)
  .bind(nombre, institucion, pais, email)
  .run();

  return new Response(
    JSON.stringify({ status: "ok" }),
    { headers: { "Content-Type": "application/json" } }
  );
}