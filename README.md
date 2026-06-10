# AGUITECH 2026 3D

Sitio web corporativo interactivo de Aguitech Studio para 2026.
Experiencia scroll-driven con modelo 3D, carrusel de servicios, video
de fondo y animaciones fluidas.

## Stack

- HTML5 semántico
- CSS3 puro (custom properties, grid, flex, glassmorphism, animaciones)
- JavaScript vanilla
- [Three.js r128](https://threejs.org/) — escena 3D del hero
- [GSAP 3.12](https://gsap.com/) + ScrollTrigger — animaciones scroll-driven
- Sin build step. Se deploya directo.

## Estructura

```
aguitech20263d/
├── index.html          # Sitio principal
├── css/
│   └── style.css       # Estilos (dark + neon + glass)
├── js/
│   └── app.js          # Three.js, GSAP, carrusel, form
├── models/
│   └── lancer.glb      # Modelo 3D (placeholder Khronos)
├── videos/
│   └── bg.webm         # Video de fondo (autoplay loop)
├── img/                # Imágenes auxiliares
└── README.md
```

## Desarrollo local

```bash
python3 -m http.server 8000
# Abre http://localhost:8000
```

## Deploy

GitHub Pages está habilitado en `main` branch / root.
URL: https://aguitech.github.io/aguitech20263d/

## Servicios destacados

- Web & Sistemas · Apps móviles · E-commerce
- Marketing & IA · IA · 3D & WebGL
- Realidad Virtual · Ciberseguridad

## Créditos

- Video de fondo: [archive.org](https://archive.org/details/youtube-4WF41bAfvfE)
- Modelo 3D: [Khronos glTF-Sample-Assets](https://github.com/KhronosGroup/glTF-Sample-Assets)
- Tipografías: Orbitron + Inter (Google Fonts)

---

© 2026 Aguitech Studio
