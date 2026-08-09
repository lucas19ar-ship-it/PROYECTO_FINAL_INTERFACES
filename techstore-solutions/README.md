# TechStore Solutions

Aplicación web desarrollada con **React + Vite** para la gestión de pedidos de productos: registro, carrito de compras, cálculo automático de subtotal/IGV/total, validaciones de formulario y persistencia en `localStorage`.

## Tecnologías

- React 18
- Vite
- Vitest + React Testing Library (pruebas unitarias)

## Cómo ejecutar el proyecto en desarrollo

```bash
npm install
npm run dev
```

La app estará disponible en `http://localhost:5173`.

## Cómo ejecutar las pruebas unitarias

```bash
npm run test
```

## Build de producción

### ¿Qué es "producción"?

Es la versión final y optimizada de la aplicación, lista para ser usada por usuarios reales (no para seguir desarrollando). El código se minifica, se optimiza y se empaqueta en archivos estáticos (HTML, CSS, JS) que no requieren un servidor Node corriendo, solo un servidor web básico.

### ¿Cómo se genera?

```bash
npm run build
```

Este comando genera la carpeta **`dist/`**, que contiene:
- `index.html` — el punto de entrada de la aplicación
- `assets/` — archivos CSS y JS ya minificados y optimizados

### ¿Cómo se despliega?

La carpeta `dist/` se puede subir a cualquier servicio de hosting de sitios estáticos, por ejemplo:

- **Vercel** o **Netlify**: conectando el repositorio de GitHub, detectan automáticamente que es un proyecto Vite y ejecutan `npm run build`, sirviendo la carpeta `dist/`.
- **GitHub Pages**: subiendo el contenido de `dist/` a una rama `gh-pages`.
- **Servidor propio**: copiando el contenido de `dist/` a la carpeta pública de un servidor Apache/Nginx.

Para probar el build localmente antes de desplegar:

```bash
npm run preview
```

## Estructura del proyecto
src/
├── components/ # Componentes de UI (formulario, listado, carrito)
├── hooks/ # Custom hooks (useLocalStorage)
├── utils/ # Funciones puras (validaciones, cálculos)
├── App.jsx # Componente raíz
└── main.jsx # Punto de entrada de React

## Autor
Lucas Salomón Amasifuen Rivera 
