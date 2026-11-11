import type { APIRoute } from "astro";
import { invitados } from "../../data/invitados.js";
import {
  validarRespuesta,
  type Invitado,
  type RespuestaConfirmacion,
} from "../../lib/confirmacion";

export const prerender = false;

const SCRIPT_URL = process.env.APPS_SCRIPT_URL;
const SCRIPT_SECRET = process.env.APPS_SCRIPT_SECRET ?? "";

function json(cuerpo: unknown, status = 200): Response {
  return new Response(JSON.stringify(cuerpo), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

function buscarInvitado(id: number): Invitado | undefined {
  return (invitados as Invitado[]).find((invitado) => invitado.id === id);
}

function errorDeConfiguracion(): Response {
  console.error(
    "[confirmar] Falta APPS_SCRIPT_URL. Configurala en Vercel antes de usar el formulario.",
  );
  return json({ ok: false, error: "El formulario no está disponible." }, 500);
}

export const GET: APIRoute = async ({ url }) => {
  const id = Number(url.searchParams.get("id"));
  const invitado = buscarInvitado(id);

  if (!invitado) {
    return json({ ok: false, error: "Invitación no encontrada." }, 404);
  }

  if (!SCRIPT_URL) return errorDeConfiguracion();

  try {
    const destino = new URL(SCRIPT_URL);
    destino.searchParams.set("id", String(id));
    destino.searchParams.set("token", SCRIPT_SECRET);

    const respuesta = await fetch(destino, {
      signal: AbortSignal.timeout(8000),
    });

    if (!respuesta.ok) throw new Error(`Apps Script respondió ${respuesta.status}`);

    const datos = (await respuesta.json()) as {
      ok?: boolean;
      respuesta?: RespuestaConfirmacion | null;
    };

    if (!datos?.ok) throw new Error("Apps Script devolvió un error");

    return json({ ok: true, respuesta: datos.respuesta ?? null });
  } catch (error) {
    console.error("[confirmar] Error leyendo la respuesta previa:", error);
    return json({ ok: false, error: "No pudimos leer tu respuesta." }, 502);
  }
};

export const POST: APIRoute = async ({ request }) => {
  let cuerpo: unknown;

  try {
    cuerpo = await request.json();
  } catch {
    return json({ ok: false, error: "Datos inválidos." }, 400);
  }

  const id = Number((cuerpo as { id?: unknown })?.id);
  const invitado = buscarInvitado(id);

  if (!invitado) {
    return json({ ok: false, error: "Invitación no encontrada." }, 404);
  }

  const validacion = validarRespuesta(invitado, cuerpo);

  if (!validacion.ok) {
    return json({ ok: false, error: validacion.error }, 400);
  }

  if (!SCRIPT_URL) return errorDeConfiguracion();

  try {
    const respuesta = await fetch(SCRIPT_URL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      signal: AbortSignal.timeout(10000),
      body: JSON.stringify({
        ...validacion.respuesta,
        nombre: invitado.nombre,
        extra: validacion.extra,
        token: SCRIPT_SECRET,
      }),
    });

    const datos = (await respuesta.json().catch(() => null)) as {
      ok?: boolean;
    } | null;

    if (!respuesta.ok || !datos?.ok) throw new Error("Apps Script rechazó el guardado");

    return json({ ok: true, respuesta: validacion.respuesta });
  } catch (error) {
    console.error("[confirmar] Error guardando la confirmación:", error);
    return json(
      { ok: false, error: "No pudimos guardar tu confirmación." },
      502,
    );
  }
};
