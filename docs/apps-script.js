/**
 * Confirmación de asistencia — Invitación XV de Eluney Sofía
 *
 * Este archivo NO se ejecuta desde el sitio: se copia y se pega en el editor
 * de Apps Script de la planilla de Google.
 *
 * Pasos completos en docs/confirmacion.md
 */

// ---------------------------------------------------------------------------
// Configuración
// ---------------------------------------------------------------------------

/** Debe ser idéntico a APPS_SCRIPT_SECRET en Vercel. Cambialo por algo largo. */
const SECRETO = "CAMBIAR-ESTE-SECRETO";

const HOJA_RESPUESTAS = "Respuestas";
const HOJA_CAMBIOS = "Cambios";
const HOJA_RESUMEN = "Resumen";

const COLUMNAS = [
  "id",
  "nombre",
  "asiste",
  "cantidad",
  "asistentes",
  "restricciones",
  "mesa",
  "actualizado",
  "modo",
  "extra",
];

// ---------------------------------------------------------------------------
// Endpoints
// ---------------------------------------------------------------------------

function doPost(e) {
  return responder(function () {
    const datos = JSON.parse(e.postData.contents);

    if (SECRETO && datos.token !== SECRETO) {
      throw new Error("No autorizado");
    }

    const bloqueo = LockService.getScriptLock();
    bloqueo.waitLock(20000);

    try {
      const hoja = hojaRespuestas_();
      const filas = hoja.getDataRange().getValues();
      const ahora = fecha_();

      let indice = -1;
      for (let i = 1; i < filas.length; i++) {
        if (String(filas[i][0]) === String(datos.id)) {
          indice = i + 1;
          break;
        }
      }

      const mesa = indice > 0 ? filas[indice - 1][6] : "";
      const fila = [
        Number(datos.id),
        String(datos.nombre || ""),
        String(datos.asiste || (Number(datos.cantidad) > 0 ? "Sí" : "No")),
        Number(datos.cantidad) || 0,
        Array.isArray(datos.asistentes) ? datos.asistentes.join(", ") : "",
        String(datos.restricciones || ""),
        mesa,
        ahora,
        String(datos.modo || ""),
        Number(datos.extra) || 0,
      ];

      if (indice > 0) {
        registrarCambio_(filas[indice - 1], fila, ahora);
        hoja.getRange(indice, 1, 1, fila.length).setValues([fila]);
      } else {
        hoja.appendRow(fila);
      }

      return { ok: true };
    } finally {
      bloqueo.releaseLock();
    }
  });
}

function doGet(e) {
  return responder(function () {
    if (SECRETO && e.parameter.token !== SECRETO) {
      throw new Error("No autorizado");
    }

    const id = e.parameter.id;
    const filas = hojaRespuestas_().getDataRange().getValues();

    for (let i = 1; i < filas.length; i++) {
      if (String(filas[i][0]) === String(id)) {
        const fila = filas[i];
        return {
          ok: true,
          respuesta: {
            id: Number(fila[0]),
            asiste: String(fila[2] || ""),
            cantidad: Number(fila[3]) || 0,
            asistentes: String(fila[4] || "")
              .split(",")
              .map(function (nombre) {
                return nombre.trim();
              })
              .filter(Boolean),
            restricciones: String(fila[5] || ""),
            actualizado: String(fila[7] || ""),
            modo: String(fila[8] || ""),
          },
        };
      }
    }

    return { ok: true, respuesta: null };
  });
}

// ---------------------------------------------------------------------------
// Utilidades
// ---------------------------------------------------------------------------

function responder(fn) {
  try {
    return json_(fn());
  } catch (error) {
    return json_({
      ok: false,
      error: String((error && error.message) || error),
    });
  }
}

function json_(objeto) {
  return ContentService.createTextOutput(JSON.stringify(objeto)).setMimeType(
    ContentService.MimeType.JSON,
  );
}

function fecha_() {
  return Utilities.formatDate(
    new Date(),
    "America/Argentina/Buenos_Aires",
    "dd/MM/yyyy HH:mm",
  );
}

function hojaRespuestas_() {
  const libro = SpreadsheetApp.getActiveSpreadsheet();
  let hoja = libro.getSheetByName(HOJA_RESPUESTAS);
  if (!hoja) {
    setup();
    hoja = libro.getSheetByName(HOJA_RESPUESTAS);
  }
  asegurarEncabezados_(hoja);
  return hoja;
}

/**
 * Deja la fila 1 igual a COLUMNAS. Se llama en cada guardado, así que no hace
 * falta correr setup() ni acordarse de hacerlo después de cambiar el código.
 */
function asegurarEncabezados_(hoja) {
  const rango = hoja.getRange(1, 1, 1, COLUMNAS.length);
  let actuales = [];

  try {
    actuales = rango.getValues()[0].map(function (valor) {
      return String(valor);
    });
  } catch (error) {
    actuales = [];
  }

  const coincide =
    actuales.length === COLUMNAS.length &&
    COLUMNAS.every(function (columna, indice) {
      return actuales[indice] === columna;
    });

  if (coincide) return;

  rango.setValues([COLUMNAS]);
  rango.setFontWeight("bold").setBackground("#FCE7E9");
  hoja.setFrozenRows(1);
  hoja.setColumnWidth(4, 220);
  hoja.setColumnWidth(5, 220);
}

function registrarCambio_(antes, despues, ahora) {
  const libro = SpreadsheetApp.getActiveSpreadsheet();
  let hoja = libro.getSheetByName(HOJA_CAMBIOS);
  if (!hoja) {
    setup();
    hoja = libro.getSheetByName(HOJA_CAMBIOS);
  }

  hoja.appendRow([
    ahora,
    despues[0],
    despues[1],
    "cantidad " + antes[3] + " / extra " + antes[9],
    "cantidad " + despues[3] + " / extra " + despues[9],
  ]);
}

// ---------------------------------------------------------------------------
// Setup: ejecutar una sola vez desde el editor
// ---------------------------------------------------------------------------

function setup() {
  const libro = SpreadsheetApp.getActiveSpreadsheet();

  let respuestas = libro.getSheetByName(HOJA_RESPUESTAS);
  if (!respuestas) respuestas = libro.insertSheet(HOJA_RESPUESTAS);
  if (respuestas.getLastRow() === 0) {
    respuestas.appendRow(COLUMNAS);
  }
  asegurarEncabezados_(respuestas);

  let cambios = libro.getSheetByName(HOJA_CAMBIOS);
  if (!cambios) cambios = libro.insertSheet(HOJA_CAMBIOS);
  if (cambios.getLastRow() === 0) {
    cambios.appendRow(["cuándo", "id", "nombre", "antes", "después"]);
    cambios.setFrozenRows(1);
    cambios.getRange(1, 1, 1, 5).setFontWeight("bold");
  }

  let resumen = libro.getSheetByName(HOJA_RESUMEN);
  if (!resumen) resumen = libro.insertSheet(HOJA_RESUMEN);
  if (resumen.getLastRow() === 0) {
    resumen.getRange("A1:B1").setValues([["Métrica", "Valor"]]);
    resumen.getRange("A1:B1").setFontWeight("bold");
    resumen.getRange("A2:B6").setValues([
      ["Invitaciones confirmadas", null],
      ["Personas confirmadas", null],
      ["No asisten", null],
      ["Respondieron", null],
      ["Extras fuera de cupo", null],
    ]);
    resumen.getRange("B2:B6").setFormulas([
      ['=COUNTIF(Respuestas!D:D,">0")'],
      ["=SUM(Respuestas!D:D)"],
      ['=COUNTIF(Respuestas!D:D,0)'],
      ["=COUNTA(Respuestas!A2:A)"],
      ["=SUM(Respuestas!J:J)"],
    ]);
    resumen.setColumnWidth(1, 240);
  }
}
