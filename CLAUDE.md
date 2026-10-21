# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Qué es esto

Landing page estática en español de FILO (software para experiencias gastronómicas). Es una exportación (v7, 20-oct-2026, ver `LEEME.txt`) y **no incluye el software FILO**. No hay build, Node.js, gestor de paquetes, linter ni tests: se edita directamente `index.html`, `style.css` y `app.js`.

## Ejecutar / publicar

- Abrir `index.html` en el navegador (o servir la carpeta con cualquier servidor estático). `index.html`, `style.css`, `app.js` y `assets/` deben permanecer juntos.
- Publicar = subir la carpeta a cualquier hosting estático.
- La fuente Manrope viene de Google Fonts (con fallback del sistema sin conexión).

## Arquitectura

- **`index.html` y `style.css` están minificados** (index.html son ~3 líneas; el CSS tiene reglas y media queries compactadas en pocas líneas). Usa `Grep` con `-o` o lee rangos acotados en lugar de abrir el archivo completo.
- **Secciones** (en orden): hero, `#problema`, `#claridad`, `#solucion`, `#operacion` (menú de módulos), tipos de experiencia, CRM, `#distribuidores`, `#empezar`, `#precio`, `#por-que`, `#preguntas` (FAQ). Cada sección usa una clase de color de fondo (`teal`, `pink`, `peach`, `cream`, `navy`).
- **Datos del menú de módulos**: viven en `<script id="module-data" type="application/json">` dentro de `index.html`. `app.js` los lee con `JSON.parse` y, al seleccionar una pestaña, rellena titular, descripción e imagen (`assets/${item.image}`). Cada módulo tiene `name`, `headline`, `description`, `image`, `alt` y `kind`. `kind` también se aplica como clase CSS al botón de imagen y al visor ampliado, y controla el recorte/escala de cada captura (`wide`, `quote`, `catalog`, en los media queries de `style.css`). Un módulo nuevo requiere entrada en el JSON, un `[role="tab"]` en el HTML y, si la captura tiene proporciones distintas, un `kind` con estilos.
- **`app.js`** (vanilla JS, sin dependencias) hace cuatro cosas: pestañas accesibles (flechas/Home/End), diálogo `<dialog id="image-dialog">` para ampliar capturas, FAQ tipo acordeón exclusivo (`.accordion details`) y animaciones de entrada con `IntersectionObserver` sobre `.reveal` (desactivadas con `prefers-reduced-motion`).
- **Responsive**: breakpoints principales en 1100px y 760px (más reglas específicas del hero en 1000px/1600px); el bloque de 760px contiene casi todos los ajustes móviles, incluido el visor ampliado.

## Pendiente conocido

Los botones de registro solo navegan entre `#precio` y `#empezar`; hay que reemplazarlos por la URL real de registro cuando exista. Las tarjetas de demostración y fotos son ilustrativas.
