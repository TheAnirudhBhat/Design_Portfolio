"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function NoiseBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio, 2);

    // === RENDERER ===
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(dpr);
    renderer.setClearColor(0x010820);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    container.appendChild(renderer.domElement);

    // === SCENE ===
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x010820, 0.006);

    // === CAMERA ===
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.set(0, 12, 30);
    camera.lookAt(0, 0, -10);

    // === OCEAN ===
    const oceanGeo = new THREE.PlaneGeometry(400, 400, 512, 512);
    oceanGeo.rotateX(-Math.PI / 2);

    const oceanMat = new THREE.ShaderMaterial({
      uniforms: {
        u_time: { value: 0 },
        u_mouse: { value: new THREE.Vector2(0, 0) },
      },
      vertexShader: `
        uniform float u_time;
        uniform vec2 u_mouse;
        varying float vElevation;
        varying vec3 vWorldPos;
        varying vec3 vNormal;

        vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
        vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
        float snoise(vec3 v){
          const vec2 C = vec2(1.0/6.0, 1.0/3.0);
          const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
          vec3 i = floor(v + dot(v, C.yyy));
          vec3 x0 = v - i + dot(i, C.xxx);
          vec3 g = step(x0.yzx, x0.xyz);
          vec3 l = 1.0 - g;
          vec3 i1 = min(g.xyz, l.zxy);
          vec3 i2 = max(g.xyz, l.zxy);
          vec3 x1 = x0 - i1 + C.xxx;
          vec3 x2 = x0 - i2 + C.yyy;
          vec3 x3 = x0 - D.yyy;
          i = mod(i, 289.0);
          vec4 p = permute(permute(permute(
            i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
          float n_ = 1.0/7.0;
          vec3 ns = n_ * D.wyz - D.xzx;
          vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
          vec4 x_ = floor(j * ns.z);
          vec4 y_ = floor(j - 7.0 * x_);
          vec4 x = x_ * ns.x + ns.yyyy;
          vec4 y = y_ * ns.x + ns.yyyy;
          vec4 h = 1.0 - abs(x) - abs(y);
          vec4 b0 = vec4(x.xy, y.xy);
          vec4 b1 = vec4(x.zw, y.zw);
          vec4 s0 = floor(b0)*2.0 + 1.0;
          vec4 s1 = floor(b1)*2.0 + 1.0;
          vec4 sh = -step(h, vec4(0.0));
          vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
          vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
          vec3 p0 = vec3(a0.xy,h.x);
          vec3 p1 = vec3(a0.zw,h.y);
          vec3 p2 = vec3(a1.xy,h.z);
          vec3 p3 = vec3(a1.zw,h.w);
          vec4 norm = taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
          p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
          vec4 m = max(0.6 - vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)), 0.0);
          m = m * m;
          return 42.0 * dot(m*m, vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
        }

        void main() {
          vec3 pos = position;
          float t = u_time * 0.35;

          // Gerstner-like waves — directional ocean swells
          // Wave 1: large slow swell
          float k1 = 0.04;
          float w1 = 0.6;
          vec2 d1 = normalize(vec2(1.0, 0.3));
          float phase1 = dot(d1, pos.xz) * k1 - t * w1;
          pos.y += sin(phase1) * 2.5;
          pos.x += cos(phase1) * d1.x * 0.8;
          pos.z += cos(phase1) * d1.y * 0.8;

          // Wave 2: medium cross-swell
          float k2 = 0.08;
          float w2 = 0.9;
          vec2 d2 = normalize(vec2(-0.5, 1.0));
          float phase2 = dot(d2, pos.xz) * k2 - t * w2;
          pos.y += sin(phase2) * 1.5;
          pos.x += cos(phase2) * d2.x * 0.4;
          pos.z += cos(phase2) * d2.y * 0.4;

          // Wave 3: smaller chop
          float k3 = 0.15;
          float w3 = 1.4;
          vec2 d3 = normalize(vec2(0.7, -0.7));
          float phase3 = dot(d3, pos.xz) * k3 - t * w3;
          pos.y += sin(phase3) * 0.8;

          // Wave 4: fine detail
          float k4 = 0.3;
          float w4 = 2.0;
          vec2 d4 = normalize(vec2(-0.3, -1.0));
          float phase4 = dot(d4, pos.xz) * k4 - t * w4;
          pos.y += sin(phase4) * 0.35;

          // Noise for organic surface texture
          float n1 = snoise(vec3(position.xz * 0.03, t * 0.12)) * 1.0;
          float n2 = snoise(vec3(position.xz * 0.08, t * 0.2)) * 0.4;
          float n3 = snoise(vec3(position.xz * 0.2, t * 0.3)) * 0.15;
          pos.y += n1 + n2 + n3;

          // Mouse ripple
          float mouseDist = length(position.xz - u_mouse * 40.0);
          pos.y += sin(mouseDist * 0.4 - u_time * 2.5) * smoothstep(20.0, 0.0, mouseDist) * 1.2;

          vElevation = pos.y;
          vWorldPos = pos;

          // Compute normal from neighbors (approximate)
          float eps = 0.5;
          float hL = sin(dot(d1, (position.xz + vec2(-eps, 0.0))) * k1 - t * w1) * 2.5;
          float hR = sin(dot(d1, (position.xz + vec2(eps, 0.0))) * k1 - t * w1) * 2.5;
          float hD = sin(dot(d1, (position.xz + vec2(0.0, -eps))) * k1 - t * w1) * 2.5;
          float hU = sin(dot(d1, (position.xz + vec2(0.0, eps))) * k1 - t * w1) * 2.5;
          vNormal = normalize(vec3(hL - hR, 2.0 * eps, hD - hU));

          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float u_time;
        varying float vElevation;
        varying vec3 vWorldPos;
        varying vec3 vNormal;

        void main() {
          float h = vElevation * 0.1 + 0.5;
          h = clamp(h, 0.0, 1.0);

          // Fresh bright water colors
          vec3 deepOcean  = vec3(0.01, 0.05, 0.15);    // deep blue
          vec3 midOcean   = vec3(0.02, 0.10, 0.30);    // rich blue
          vec3 bodyColor  = vec3(0.04, 0.18, 0.45);    // vibrant blue
          vec3 surfaceCol = vec3(0.06, 0.28, 0.60);    // bright surface
          vec3 crestCol   = vec3(0.10, 0.38, 0.72);    // bright crest
          vec3 foamCol    = vec3(0.20, 0.50, 0.82);    // bright foam

          vec3 color = mix(deepOcean, midOcean, smoothstep(0.15, 0.3, h));
          color = mix(color, bodyColor, smoothstep(0.25, 0.45, h));
          color = mix(color, surfaceCol, smoothstep(0.4, 0.55, h));
          color = mix(color, crestCol, smoothstep(0.55, 0.7, h));
          color = mix(color, foamCol, smoothstep(0.7, 0.9, h));

          // Specular highlight — bright sun reflection
          vec3 lightDir = normalize(vec3(0.3, 0.8, 0.5));
          vec3 viewDir = normalize(vec3(0.0, 1.0, 0.3));
          vec3 halfDir = normalize(lightDir + viewDir);
          float spec = pow(max(dot(vNormal, halfDir), 0.0), 80.0);
          color += vec3(0.5, 0.6, 0.8) * spec * 0.8;

          // Broader soft specular
          float softSpec = pow(max(dot(vNormal, halfDir), 0.0), 15.0);
          color += vec3(0.08, 0.14, 0.25) * softSpec * 0.5;

          // Fresnel — bright edges
          float fresnel = pow(1.0 - max(dot(vNormal, viewDir), 0.0), 3.0);
          color += vec3(0.04, 0.10, 0.22) * fresnel * 0.6;

          // White foam on peaks
          float foam = smoothstep(0.7, 0.9, h);
          color = mix(color, vec3(0.45, 0.55, 0.70), foam * 0.3);

          // Distance fog — blue tinted
          float dist = length(vWorldPos.xz);
          float fogFactor = 1.0 - exp(-dist * 0.005);
          color = mix(color, vec3(0.01, 0.04, 0.14), fogFactor);

          gl_FragColor = vec4(color, 1.0);
        }
      `,
      side: THREE.DoubleSide,
    });

    const ocean = new THREE.Mesh(oceanGeo, oceanMat);
    scene.add(ocean);

    // === SKY GRADIENT (subtle) ===
    const skyGeo = new THREE.PlaneGeometry(600, 200);
    const skyMat = new THREE.ShaderMaterial({
      uniforms: {},
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        void main() {
          vec3 horizon = vec3(0.03, 0.08, 0.20);
          vec3 sky = vec3(0.01, 0.03, 0.08);
          vec3 color = mix(horizon, sky, smoothstep(0.0, 0.6, vUv.y));
          gl_FragColor = vec4(color, 1.0);
        }
      `,
      side: THREE.FrontSide,
      depthWrite: false,
    });
    const sky = new THREE.Mesh(skyGeo, skyMat);
    sky.position.set(0, 30, -180);
    scene.add(sky);

    // === SUBTLE MOON LIGHT ===
    const moonLight = new THREE.DirectionalLight(0x4488ff, 0.6);
    moonLight.position.set(50, 80, -30);
    scene.add(moonLight);

    const ambientLight = new THREE.AmbientLight(0x0a2050, 0.8);
    scene.add(ambientLight);

    // === EVENTS ===
    const lerpMouse = { x: 0, y: 0 };

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const onScroll = () => {
      scrollRef.current = window.scrollY;
    };

    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    // === ANIMATE ===
    const clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Fade out as user scrolls past hero (1 viewport height)
      const scrollY = scrollRef.current;
      const vh = window.innerHeight;
      const opacity = Math.max(0, 1 - scrollY / (vh * 0.8));
      container.style.opacity = String(opacity);

      // Skip rendering when fully invisible (saves GPU)
      if (opacity <= 0) return;

      const t = clock.getElapsedTime();

      lerpMouse.x += (mouseRef.current.x - lerpMouse.x) * 0.03;
      lerpMouse.y += (mouseRef.current.y - lerpMouse.y) * 0.03;

      oceanMat.uniforms.u_time.value = t;
      oceanMat.uniforms.u_mouse.value.set(lerpMouse.x, lerpMouse.y);

      // Camera follows scroll
      const scrollFactor = scrollY * 0.008;
      camera.position.y = 12 - scrollFactor * 2;
      camera.position.z = 30 - scrollFactor * 4;
      camera.lookAt(0, 0, -10 - scrollFactor * 5);

      // Gentle camera breathing
      camera.position.x = Math.sin(t * 0.12) * 0.8 + lerpMouse.x * 1.5;
      camera.position.y += Math.sin(t * 0.18) * 0.15;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      oceanGeo.dispose();
      oceanMat.dispose();
      skyGeo.dispose();
      skyMat.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  );
}
