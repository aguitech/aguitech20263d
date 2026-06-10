/* ===================================================================
   AGUITECH 2026 3D — app.js
   - Three.js hero 3D (Lancer.glb con fallback procedural)
   - GSAP ScrollTrigger para animaciones scroll-driven
   - Carrusel de servicios
   - Showcase grid con tilt 3D
   - Logo wall con iniciales
   - Marquee infinito
   - Form de contacto
   =================================================================== */

(() => {
  'use strict';

  // ============== DATA ==============
  const servicios = [
    {
      num: '01',
      icon: 'web',
      title: 'Web & Sistemas',
      desc: 'Sitios web corporativos, landing pages de alta conversión y sistemas web a medida con backend robusto.',
      tags: ['REACT', 'NEXT', 'NODE'],
    },
    {
      num: '02',
      icon: 'apps',
      title: 'Apps móviles',
      desc: 'Apps nativas iOS/Android y multiplataforma. UX premium, performance nativa, push notifications.',
      tags: ['REACT NATIVE', 'FLUTTER', 'SWIFT'],
    },
    {
      num: '03',
      icon: 'shop',
      title: 'E-commerce',
      desc: 'Tiendas online con checkout optimizado, integración de pagos, inventario y logística en tiempo real.',
      tags: ['SHOPIFY', 'WOOCOMMERCE', 'STRIPE'],
    },
    {
      num: '04',
      icon: 'marketing',
      title: 'Marketing & IA',
      desc: 'Estrategias de marketing digital, ads, SEO, contenido y agentes de IA para automatizar tu negocio.',
      tags: ['META ADS', 'SEO', 'LLM'],
    },
    {
      num: '05',
      icon: 'ai',
      title: 'Inteligencia Artificial',
      desc: 'Chatbots, agentes autónomos, integración de LLMs, visión computacional y pipelines ML a medida.',
      tags: ['GPT', 'CLAUDE', 'VECTOR DB'],
    },
    {
      num: '06',
      icon: 'cube',
      title: '3D & WebGL',
      desc: 'Experiencias 3D interactivas en el navegador, configuradores de producto, visualizaciones inmersivas.',
      tags: ['THREE.JS', 'WEBGL', 'BLENDER'],
    },
    {
      num: '07',
      icon: 'vr',
      title: 'Realidad Virtual',
      desc: 'Showrooms VR, training inmersivo, tours virtuales 360° y experiencias XR para eventos.',
      tags: ['UNITY', 'WEBXR', 'OCULUS'],
    },
    {
      num: '08',
      icon: 'shield',
      title: 'Ciberseguridad',
      desc: 'Auditorías de seguridad, pentesting, hardening, monitoreo 24/7 y respuesta a incidentes.',
      tags: ['OWASP', 'SIEM', 'ZERO TRUST'],
    },
  ];

  const iconos = {
    web:      '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>',
    apps:     '<svg viewBox="0 0 24 24"><rect x="6" y="2" width="12" height="20" rx="2"/><path d="M11 18h2"/></svg>',
    shop:     '<svg viewBox="0 0 24 24"><path d="M3 7h18l-2 13H5L3 7z"/><path d="M8 7V5a4 4 0 0 1 8 0v2"/></svg>',
    marketing:'<svg viewBox="0 0 24 24"><path d="M3 11l18-7v16L3 13z"/><path d="M11 13v6"/></svg>',
    ai:       '<svg viewBox="0 0 24 24"><rect x="4" y="6" width="16" height="14" rx="2"/><path d="M9 2v4M15 2v4M9 14h6M12 11v6"/></svg>',
    cube:     '<svg viewBox="0 0 24 24"><path d="M12 2l10 6v8l-10 6L2 16V8l10-6z"/><path d="M2 8l10 6 10-6M12 14v10"/></svg>',
    vr:       '<svg viewBox="0 0 24 24"><rect x="2" y="8" width="20" height="12" rx="2"/><circle cx="8" cy="14" r="1.5"/><circle cx="16" cy="14" r="1.5"/></svg>',
    shield:   '<svg viewBox="0 0 24 24"><path d="M12 2l8 4v7c0 5-4 8-8 9-4-1-8-4-8-9V6l8-4z"/></svg>',
  };

  const showcase = [
    { cat: 'ECOMMERCE', title: 'Luxe Boutique Online', meta: 'Shopify Plus · 2025', hue: 200 },
    { cat: 'WEB 3D',    title: 'Configurator Auto',    meta: 'Three.js · 2026',    hue: 320 },
    { cat: 'SISTEMA',   title: 'CRM a Medida',         meta: 'Node · React · 2025', hue: 280 },
    { cat: 'APPS',      title: 'Fitness Tracker Pro',  meta: 'Flutter · 2025',     hue: 180 },
    { cat: 'IA',        title: 'Asistente WhatsApp',   meta: 'GPT-4 · 2026',       hue: 30  },
    { cat: 'VR',        title: 'Showroom Inmersivo',   meta: 'WebXR · Unity · 2026',hue: 240 },
  ];

  const clientes = [
    { name: 'Boutique MX',    init: 'B', color: '#00f0ff' },
    { name: 'Logística Norte',init: 'LN', color: '#ff0080' },
    { name: 'Cafeína Studio', init: 'CS', color: '#7000ff' },
    { name: 'Bienes Raíces Plus', init: 'BR', color: '#ffb800' },
    { name: 'Auto Sport MX',  init: 'AS', color: '#00ff88' },
    { name: 'Grupo Reforma',  init: 'GR', color: '#ff5500' },
    { name: 'Clínica Vital',  init: 'CV', color: '#00ddff' },
    { name: 'Estudio Tribal', init: 'ET', color: '#ff00aa' },
  ];

  // ============== INIT ==============
  document.addEventListener('DOMContentLoaded', () => {
    hideLoader();
    buildCarrusel();
    buildShowcase();
    buildClientes();
    buildMarquee();
    initStats();
    initReveals();
    initNav();
    initContactForm();
    initShowcaseTilt();
    init3DScene();
    initScrollAnimations();
  });

  // ============== LOADER ==============
  function hideLoader() {
    const loader = document.getElementById('loader');
    if (!loader) return;
    setTimeout(() => loader.classList.add('is-hidden'), 600);
  }

  // ============== CARRUSEL ==============
  function buildCarrusel() {
    const track = document.getElementById('carrusel-track');
    const dotsContainer = document.getElementById('carrusel-dots');
    if (!track) return;

    track.innerHTML = servicios.map(s => `
      <article class="servicio-card" data-num="${s.num}">
        <div class="servicio-card__num">// ${s.num}</div>
        <div class="servicio-card__icon">${iconos[s.icon] || ''}</div>
        <h3 class="servicio-card__title">${s.title}</h3>
        <p class="servicio-card__desc">${s.desc}</p>
        <div class="servicio-card__tags">
          ${s.tags.map(t => `<span class="servicio-card__tag">${t}</span>`).join('')}
        </div>
      </article>
    `).join('');

    // Dots
    dotsContainer.innerHTML = servicios.map((_, i) =>
      `<button class="carrusel__dot ${i === 0 ? 'is-active' : ''}" data-idx="${i}" aria-label="Slide ${i + 1}"></button>`
    ).join('');

    // Buttons
    const prev = document.getElementById('carrusel-prev');
    const next = document.getElementById('carrusel-next');
    const cardWidth = 320 + 24;

    prev?.addEventListener('click', () => track.scrollBy({ left: -cardWidth, behavior: 'smooth' }));
    next?.addEventListener('click', () => track.scrollBy({ left:  cardWidth, behavior: 'smooth' }));

    // Dots click
    dotsContainer.querySelectorAll('.carrusel__dot').forEach(dot => {
      dot.addEventListener('click', () => {
        const idx = parseInt(dot.dataset.idx);
        track.scrollTo({ left: idx * cardWidth, behavior: 'smooth' });
      });
    });

    // Sync dots on scroll
    track.addEventListener('scroll', () => {
      const idx = Math.round(track.scrollLeft / cardWidth);
      dotsContainer.querySelectorAll('.carrusel__dot').forEach((d, i) => {
        d.classList.toggle('is-active', i === idx);
      });
    });
  }

  // ============== SHOWCASE ==============
  function buildShowcase() {
    const grid = document.getElementById('showcase-grid');
    if (!grid) return;

    grid.innerHTML = showcase.map((s, i) => {
      const c1 = `hsl(${s.hue}, 80%, 18%)`;
      const c2 = `hsl(${(s.hue + 40) % 360}, 80%, 30%)`;
      const big = s.title.charAt(0);
      return `
        <article class="showcase-card" data-idx="${i}">
          <div class="showcase-card__bg" style="background: linear-gradient(135deg, ${c1}, ${c2});">
            <span style="font-size: 120px; opacity: .25; color: white;">${big}</span>
          </div>
          <div class="showcase-card__overlay"></div>
          <div class="showcase-card__info">
            <div class="showcase-card__cat">${s.cat}</div>
            <h3 class="showcase-card__title">${s.title}</h3>
            <div class="showcase-card__meta">${s.meta}</div>
          </div>
        </article>
      `;
    }).join('');
  }

  // ============== CLIENTES ==============
  function buildClientes() {
    const grid = document.getElementById('clientes-grid');
    if (!grid) return;
    grid.innerHTML = clientes.map(c => `
      <article class="cliente-card" style="--c: ${c.color}">
        <div class="cliente-card__glow"></div>
        <div class="cliente-card__init" style="background: linear-gradient(135deg, ${c.color}, #fff); -webkit-background-clip: text; background-clip: text;">${c.init}</div>
        <div class="cliente-card__name">${c.name}</div>
      </article>
    `).join('');
  }

  function buildMarquee() {
    const track = document.getElementById('marquee-track');
    if (!track) return;
    const items = [...clientes, ...clientes]; // duplicar para loop
    track.innerHTML = items.map(c =>
      `<div class="marquee__item">${c.name}</div>`
    ).join('');
  }

  // ============== STATS COUNTER ==============
  function initStats() {
    const nums = document.querySelectorAll('.hero__stat-num');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        const duration = 1500;
        const start = performance.now();
        const animate = (now) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(target * eased);
          if (progress < 1) requestAnimationFrame(animate);
          else el.textContent = target;
        };
        requestAnimationFrame(animate);
        observer.unobserve(el);
      });
    }, { threshold: 0.5 });

    nums.forEach(n => observer.observe(n));
  }

  // ============== REVEAL ON SCROLL ==============
  function initReveals() {
    const els = document.querySelectorAll('[data-reveal]');
    const obs = new IntersectionObserver(entries => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('is-in'), i * 80);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    els.forEach(el => obs.observe(el));
  }

  // ============== NAV SCROLL ==============
  function initNav() {
    const nav = document.getElementById('nav');
    if (!nav) return;
    const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ============== SHOWCASE TILT ==============
  function initShowcaseTilt() {
    const cards = document.querySelectorAll('.showcase-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const rx = (0.5 - y) * 8;
        const ry = (x - 0.5) * 8;
        card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
      });
    });
  }

  // ============== CONTACT FORM ==============
  function initContactForm() {
    const form = document.getElementById('contacto-form');
    if (!form) return;
    const status = document.getElementById('contacto-status');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = data.get('name');
      status.textContent = `¡Gracias ${name}! Te contactamos en menos de 24h.`;
      status.style.color = 'var(--accent)';
      form.reset();
      setTimeout(() => status.textContent = '', 5000);
    });
  }

  // ============== 3D SCENE (Three.js) ==============
  function init3DScene() {
    const canvas = document.getElementById('hero-canvas');
    const fallback = document.getElementById('hero-fallback');
    if (!canvas || !fallback) return;

    // Si Three.js no cargó, deja el fallback
    if (typeof THREE === 'undefined') {
      console.warn('Three.js no cargó, fallback activo');
      return;
    }

    let scene, camera, renderer, model = null, particles = null;
    let mouseX = 0, mouseY = 0;
    let targetRotY = 0, targetRotX = 0;
    let scrollProgress = 0;
    const clock = new THREE.Clock();

    try {
      // Scene
      scene = new THREE.Scene();

      // Camera
      const rect = canvas.parentElement.getBoundingClientRect();
      camera = new THREE.PerspectiveCamera(45, rect.width / rect.height, 0.1, 1000);
      camera.position.set(4, 2, 6);
      camera.lookAt(0, 0, 0);

      // Renderer
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setSize(rect.width, rect.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;

      // Lights
      const ambient = new THREE.AmbientLight(0xffffff, 0.4);
      scene.add(ambient);

      const key = new THREE.DirectionalLight(0x00f0ff, 1.5);
      key.position.set(5, 5, 3);
      scene.add(key);

      const fill = new THREE.PointLight(0xff0080, 1.5, 10);
      fill.position.set(-3, 1, 2);
      scene.add(fill);

      const rim = new THREE.PointLight(0x7000ff, 1.0, 10);
      rim.position.set(0, 2, -3);
      scene.add(rim);

      // Modelo procedural: "Lancer-like" low-poly
      model = createProceduralLancer();
      scene.add(model);

      // Particles (estrellas/atmosfera)
      particles = createParticles();
      scene.add(particles);

      // Mostrar canvas, ocultar fallback
      canvas.style.opacity = '1';
      fallback.style.opacity = '0';

      // Mouse interaction
      canvas.parentElement.addEventListener('mousemove', (e) => {
        const r = canvas.parentElement.getBoundingClientRect();
        mouseX = ((e.clientX - r.left) / r.width) * 2 - 1;
        mouseY = ((e.clientY - r.top) / r.height) * 2 - 1;
      });

      // Scroll-driven rotation
      window.addEventListener('scroll', () => {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        scrollProgress = Math.min(window.scrollY / maxScroll, 1);
      }, { passive: true });

      // Resize
      const onResize = () => {
        const r = canvas.parentElement.getBoundingClientRect();
        camera.aspect = r.width / r.height;
        camera.updateProjectionMatrix();
        renderer.setSize(r.width, r.height);
      };
      window.addEventListener('resize', onResize);

      // Animate
      function animate() {
        requestAnimationFrame(animate);
        const dt = clock.getDelta();
        const elapsed = clock.elapsedTime;

        if (model) {
          // Rotación por mouse (suavizada)
          targetRotY = mouseX * 0.5 + scrollProgress * Math.PI * 2;
          targetRotX = -mouseY * 0.2 + scrollProgress * 0.3;
          model.rotation.y += (targetRotY - model.rotation.y) * 0.08;
          model.rotation.x += (targetRotX - model.rotation.x) * 0.08;
          // Float
          model.position.y = Math.sin(elapsed * 0.6) * 0.1;
        }
        if (particles) {
          particles.rotation.y += dt * 0.05;
        }
        renderer.render(scene, camera);
      }
      animate();

      // Intentar cargar .glb real (si existe)
      tryLoadGLB(model, () => {
        // GLB cargado, oculta fallback definitivamente
        fallback.style.display = 'none';
      });

    } catch (err) {
      console.error('3D scene error:', err);
      canvas.style.display = 'none';
    }
  }

  // Modelo procedural estilo auto (low-poly, sin assets externos)
  function createProceduralLancer() {
    const group = new THREE.Group();

    // Cuerpo principal
    const bodyGeo = new THREE.BoxGeometry(2, 0.5, 4);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x0a0a16,
      metalness: 0.8,
      roughness: 0.3,
    });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 0.3;
    group.add(body);

    // Cabina
    const cabinGeo = new THREE.BoxGeometry(1.5, 0.5, 2);
    const cabinMat = new THREE.MeshStandardMaterial({
      color: 0x111122,
      metalness: 0.9,
      roughness: 0.2,
    });
    const cabin = new THREE.Mesh(cabinGeo, cabinMat);
    cabin.position.set(0, 0.7, -0.2);
    group.add(cabin);

    // Capó
    const hoodGeo = new THREE.BoxGeometry(1.8, 0.3, 1.2);
    const hood = new THREE.Mesh(hoodGeo, bodyMat);
    hood.position.set(0, 0.65, 1.2);
    group.add(hood);

    // Parachoques
    const bumperGeo = new THREE.BoxGeometry(1.9, 0.2, 0.2);
    const bumper = new THREE.Mesh(bumperGeo, new THREE.MeshStandardMaterial({ color: 0x00f0ff, metalness: 1, roughness: 0.2 }));
    bumper.position.set(0, 0.3, 2.1);
    group.add(bumper);

    // Faros delanteros (neón)
    const headlightGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const headlightMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      emissive: 0x00f0ff,
      emissiveIntensity: 2,
    });
    const hl1 = new THREE.Mesh(headlightGeo, headlightMat);
    hl1.position.set(-0.6, 0.6, 2.1);
    group.add(hl1);
    const hl2 = new THREE.Mesh(headlightGeo, headlightMat);
    hl2.position.set(0.6, 0.6, 2.1);
    group.add(hl2);

    // Pilotos traseros (magenta)
    const tailMat = new THREE.MeshStandardMaterial({
      color: 0xff0080,
      emissive: 0xff0080,
      emissiveIntensity: 1.5,
    });
    const tl1 = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.15, 0.05), tailMat);
    tl1.position.set(-0.6, 0.6, -2.05);
    group.add(tl1);
    const tl2 = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.15, 0.05), tailMat);
    tl2.position.set(0.6, 0.6, -2.05);
    group.add(tl2);

    // Ruedas (cilindros acostados)
    const wheelGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.3, 24);
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x000000, metalness: 0.5, roughness: 0.7 });
    const wheelPositions = [
      [-1, -0.1,  1.2], [1, -0.1,  1.2],
      [-1, -0.1, -1.2], [1, -0.1, -1.2],
    ];
    wheelPositions.forEach(([x, y, z]) => {
      const w = new THREE.Mesh(wheelGeo, wheelMat);
      w.position.set(x, y, z);
      w.rotation.z = Math.PI / 2;
      group.add(w);

      // Llanta
      const rimGeo = new THREE.CylinderGeometry(0.25, 0.25, 0.31, 8);
      const rimMat = new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 1, roughness: 0.2 });
      const rim = new THREE.Mesh(rimGeo, rimMat);
      rim.position.set(x, y, z);
      rim.rotation.z = Math.PI / 2;
      group.add(rim);
    });

    // Alerón trasero
    const wingGeo = new THREE.BoxGeometry(1.8, 0.05, 0.4);
    const wingMat = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.8, roughness: 0.4 });
    const wing = new THREE.Mesh(wingGeo, wingMat);
    wing.position.set(0, 1, -1.8);
    group.add(wing);
    const wingSupport1 = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.3, 0.05), wingMat);
    wingSupport1.position.set(-0.5, 0.85, -1.8);
    group.add(wingSupport1);
    const wingSupport2 = wingSupport1.clone();
    wingSupport2.position.x = 0.5;
    group.add(wingSupport2);

    // Sombra / disco
    const shadowGeo = new THREE.CircleGeometry(1.5, 32);
    const shadowMat = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.4 });
    const shadow = new THREE.Mesh(shadowGeo, shadowMat);
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = -0.5;
    group.add(shadow);

    return group;
  }

  function createParticles() {
    const count = 600;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({
      color: 0x00f0ff,
      size: 0.02,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    });
    return new THREE.Points(geo, mat);
  }

  function tryLoadGLB(placeholderGroup, onSuccess) {
    if (typeof THREE.GLTFLoader === 'undefined') return;
    const loader = new THREE.GLTFLoader();
    loader.load(
      'models/lancer.glb',
      (gltf) => {
        const real = gltf.scene;
        real.scale.set(1.5, 1.5, 1.5);
        real.position.copy(placeholderGroup.position);
        const parent = placeholderGroup.parent;
        parent.remove(placeholderGroup);
        parent.add(real);
        onSuccess();
      },
      undefined,
      (err) => {
        console.warn('GLB no se pudo cargar, usando procedural:', err.message);
      }
    );
  }

  // ============== SCROLL ANIMATIONS (GSAP) ==============
  function initScrollAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      console.warn('GSAP no cargó, scroll anims deshabilitadas');
      return;
    }
    gsap.registerPlugin(ScrollTrigger);

    // Reveal títulos de sección
    gsap.utils.toArray('.section__title').forEach((el) => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: 'top 85%' },
        y: 40, opacity: 0, duration: 1, ease: 'power3.out',
      });
    });

    // Cards servicio entran una por una
    gsap.from('.servicio-card', {
      scrollTrigger: { trigger: '.carrusel', start: 'top 80%' },
      y: 60, opacity: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out',
    });

    // Cards showcase
    gsap.from('.showcase-card', {
      scrollTrigger: { trigger: '.showcase__grid', start: 'top 80%' },
      y: 80, opacity: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out',
    });

    // Cliente cards
    gsap.from('.cliente-card', {
      scrollTrigger: { trigger: '.clientes__grid', start: 'top 80%' },
      scale: 0.8, opacity: 0, duration: 0.7, stagger: 0.06, ease: 'back.out(1.4)',
    });

    // Parallax del video bg
    gsap.to('#bg-video', {
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
      y: 200, ease: 'none',
    });

    // Hero parallax out
    gsap.to('.hero__content', {
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.8,
      },
      y: 100, opacity: 0, ease: 'none',
    });
  }

})();
