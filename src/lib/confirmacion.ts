/**
 * Reglas del formulario de confirmación de asistencia.
 * Se usan tanto en el cliente (componente) como en el servidor (API route),
 * así el tope y la validación son los mismos en los dos lados.
 */

export const MAX_TOTAL = 10;
export const MAX_RESTRICCIONES = 300;
export const MAX_NOMBRE = 60;
export const NOMBRE_INVITADO = "Invitado";

export type Modo =
  | "nombres"
  | "contador"
  | "individual-solo"
  | "individual-acompanante";

export type Integrante = { nombre: string };

export type Invitado = {
  id: number;
  nombre: string;
  tipo: "familia" | "individual";
  invitado?: boolean;
  integrantes: Integrante[];
};

export type RespuestaConfirmacion = {
  id: number;
  modo: Modo;
  asistentes: string[];
  cantidad: number;
  restricciones: string;
};

export type Validacion =
  | { ok: true; respuesta: RespuestaConfirmacion; extra: number }
  | { ok: false; error: string };

/** Cantidad de personas que cubre la invitación según los datos. */
export function getCupo(invitado: Invitado): number {
  return invitado.integrantes.length;
}

/** true si algún integrante todavía no tiene nombre cargado. */
export function tienePlaceholders(invitado: Invitado): boolean {
  return invitado.integrantes.some(
    (integrante) => integrante.nombre.trim() === NOMBRE_INVITADO,
  );
}

/**
 * Elige la variante de formulario:
 * - nombres: familia con todos los nombres cargados
 * - contador: familia con nombres desconocidos (no se piden nombres)
 * - individual-solo: una sola persona
 * - individual-acompanante: una persona + un acompañante sin nombre
 */
export function getModo(invitado: Invitado): Modo {
  const cupo = getCupo(invitado);
  const conPlaceholders = tienePlaceholders(invitado);

  if (invitado.tipo === "individual" && cupo === 1) return "individual-solo";

  if (invitado.tipo === "individual" && cupo === 2 && conPlaceholders) {
    return "individual-acompanante";
  }

  if (conPlaceholders) return "contador";

  return "nombres";
}

/** Tope real de personas: nunca menos que el cupo ya cargado. */
export function getTope(invitado: Invitado): number {
  return Math.max(MAX_TOTAL, getCupo(invitado));
}

function limpiarTexto(valor: unknown, maximo: number): string {
  if (typeof valor !== "string") return "";
  return valor.trim().slice(0, maximo);
}

/**
 * Valida y normaliza lo que llega del navegador.
 * Nunca confía en el cliente: recalcula modo, cupo y extra.
 */
export function validarRespuesta(
  invitado: Invitado,
  cuerpo: unknown,
): Validacion {
  if (!cuerpo || typeof cuerpo !== "object") {
    return { ok: false, error: "Datos inválidos." };
  }

  const datos = cuerpo as Record<string, unknown>;
  const cantidad = Number(datos.cantidad);

  if (!Number.isInteger(cantidad) || cantidad < 0) {
    return { ok: false, error: "Cantidad inválida." };
  }

  if (cantidad > getTope(invitado)) {
    return { ok: false, error: "La cantidad supera el máximo permitido." };
  }

  const asistentes = Array.isArray(datos.asistentes)
    ? datos.asistentes
        .map((nombre) => limpiarTexto(nombre, MAX_NOMBRE))
        .filter((nombre) => nombre.length > 0)
        .slice(0, cantidad)
    : [];

  const restricciones = limpiarTexto(datos.restricciones, MAX_RESTRICCIONES);
  const cupo = getCupo(invitado);

  return {
    ok: true,
    respuesta: {
      id: invitado.id,
      modo: getModo(invitado),
      asistentes,
      cantidad,
      restricciones,
    },
    extra: Math.max(0, cantidad - cupo),
  };
}
