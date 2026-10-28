# Confirmación de asistencia

Formulario dentro de la invitación que guarda las respuestas en una planilla de
Google. El sitio sigue siendo estático; solo `/api/confirmar` corre como función
en Vercel.

```
Navegador  →  /api/confirmar (Vercel)  →  Apps Script  →  Google Sheet
```

El navegador nunca habla con Google: así se evita el problema de CORS de Apps
Script, la URL del script no queda expuesta y el `id` se valida del lado del
servidor.

## Archivos

| Archivo | Rol |
| --- | --- |
| `src/components/Confirmacion.astro` | UI y lógica del formulario |
| `src/lib/confirmacion.ts` | Reglas compartidas (modos, cupo, tope, validación) |
| `src/pages/api/confirmar.ts` | `GET` (respuesta previa) y `POST` (guardar) |
| `docs/apps-script.js` | Código que se pega en Google Apps Script |

## Configuración de Google (una sola vez)

1. Creá una planilla nueva en <https://sheets.new>.
2. Menú **Extensiones → Apps Script**.
3. Borrá el contenido de `Código.gs` y pegá todo `docs/apps-script.js`.
4. En la constante `SECRETO` poné un texto largo y aleatorio (por ejemplo el
   resultado de `openssl rand -hex 24`). Anotá ese valor.
5. Ejecutá la función `setup` una vez (botón ▶). La primera vez Google pide
   autorización: aceptá con la misma cuenta dueña de la planilla.
6. **Implementar → Nueva implementación → Tipo: Aplicación web**:
   - Descripción: `confirmaciones`
   - Ejecutar como: **Yo**
   - Quién tiene acceso: **Cualquier persona**
7. Copiá la URL que termina en `/exec`.

> Cada vez que edites el script hay que crear una **nueva implementación** (o
> editar la existente) para que los cambios tomen efecto.

## Configuración de Vercel

Project → Settings → Environment Variables (Production y Preview):

```
APPS_SCRIPT_URL = https://script.google.com/macros/s/XXXX/exec
APPS_SCRIPT_SECRET = el mismo valor de SECRETO en apps-script.js
```

Después de cargarlas, redeployá. Sin estas variables el formulario muestra
"No pudimos guardar" pero el resto de la invitación funciona igual.

## Desarrollo local

Creá un archivo `.env` en la raíz (está en `.gitignore`) con las mismas dos
variables y corré:

```sh
astro dev --background
```

Sin `.env` el formulario se ve, pero no guarda.

## Cómo funciona por dentro

- La invitación se identifica con `?invitado=<id>` (los links ya compartidos).
- El formulario elige una de cuatro variantes según los datos del invitado:
  - `nombres`: familia con todos los nombres cargados → Sí/No por persona.
  - `contador`: familia con integrantes sin nombre → contador, sin pedir nombres.
  - `individual-solo`: una persona → "Sí, voy a ir" / "No puedo ir".
  - `individual-acompanante`: una persona + acompañante sin nombre.
- Las respuestas se pueden modificar en cualquier momento: no hay fecha límite.
- Al volver a entrar se prellena con la respuesta guardada (`GET`, o
  `localStorage` si no hay red).
- El guardado es un *upsert* por `id`: nunca duplica filas.
- Tope: **10 personas totales** por invitación, validado en el cliente y en el
  servidor.

## Planilla

Hoja **Respuestas**:

`id | nombre | asiste | cantidad | asistentes | restricciones | mesa | actualizado | modo | extra`

- `asiste`: **"Sí"** o **"No"**. Es la columna para mirar de un vistazo.
- `cantidad`: cuántas personas van (`0` = no asiste nadie). Es el número para las mesas.
- `asistentes`: nombres de quienes van. En los modos sin nombres se completa con
  el nombre del invitado o "Acompañante"; en familias sin nombres queda vacío.
- `restricciones`: lo que escribió el invitado.
- `mesa`: la completás vos cuando armes las mesas.
- `modo` y `extra`: técnicos (variante del formulario y cuántos superan el cupo).

> Si ya habías ejecutado `setup()` con el orden anterior de columnas, borrá las
> filas de datos (dejá solo la fila 1) y volvé a ejecutar `setup()` desde el
> editor: los encabezados se reescriben solos.

Hoja **Cambios**: historial de cada modificación (cantidad antes/después).

Hoja **Resumen**: totales automáticos (confirmaciones, personas, no asisten, sin
responder, extras).

## Ajustes frecuentes

| Qué | Dónde |
| --- | --- |
| Fecha sugerida en el texto | `src/components/Confirmacion.astro` |
| Tope de personas | `MAX_TOTAL` en `src/lib/confirmacion.ts` |
| Número de WhatsApp de respaldo | constante `WHATSAPP` en `Confirmacion.astro` (formato `5491122334455`, sin `+` ni espacios) |
| Cantidad de invitaciones del resumen | `TOTAL_INVITADOS` en `docs/apps-script.js` |

## Prueba manual

| Caso | Link |
| --- | --- |
| Familia con nombres | `?invitado=1` |
| Familia sin nombres (6) | `?invitado=67` |
| Individual con acompañante | `?invitado=12` |
| Individual sola | `?invitado=73` |
| Sin link | `/` |
| Id inexistente | `?invitado=999` |

Verificá también: confirmar dos veces el mismo id (tiene que actualizar la fila,
no duplicarla), que el contador no pase de 10 y que en 320 px de ancho no
aparezca scroll horizontal.
