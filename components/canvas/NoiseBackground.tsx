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
    renderer.setClearColor(0x020818);
    container.appendChild(renderer.domElement);

    // === SCENE ===
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020818, 0.015);

    // === CAMERA ===
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 8, 20);
    camera.lookAt(0, 0, 0);

    // === OCEAN PLANE ===
    const oceanGeo = new THREE.PlaneGeometry(200, 200, 256, 256);
    oceanGeo.rotateX(-Math.PI / 2);

    const oceanMat = new THREE.ShaderMaterial({
      uniforms: {
        u_time: { value: 0 },
        u_mouse: { value: new THREE.Vector2(0, 0) },
        u_deepColor: { value: new THREE.Color(0x010510) },
        u_shallowColor: { value: new THREE.Color(0x0a2a6e) },
        u_foamColor: { value: new THREE.Color(0x1a4aaa) },
        u_highlightColor: { value: new THREE.Color(0x3070dd) },
      },
      vertexShader: `
        uniform float u_time;
        uniform vec2 u_mouse;
        varying float vElevation;
        varying vec2 vUv;
        varying vec3 vWorldPos;

        // Simplex noise
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
          vUv = uv;
          vec3 pos = position;

          float t = u_time * 0.4;

          // Large ocean swells
          float wave1 = sin(pos.x * 0.08 + t * 0.6) * sin(pos.z * 0.06 + t * 0.4) * 2.0;
          float wave2 = sin(pos.x * 0.15 - t * 0.8 + pos.z * 0.1) * 1.2;
          float wave3 = sin(pos.x * 0.3 + t * 1.2) * cos(pos.z * 0.25 + t * 0.7) * 0.6;

          // Noise for organic feel
          float n1 = snoise(vec3(pos.xz * 0.05, t * 0.15)) * 1.5;
          float n2 = snoise(vec3(pos.xz * 0.12, t * 0.25)) * 0.6;
          float n3 = snoise(vec3(pos.xz * 0.25, t * 0.35)) * 0.3;

          float elevation = wave1 + wave2 + wave3 + n1 + n2 + n3;

          // Mouse ripple
          float mouseDist = length(pos.xz - u_mouse * 30.0);
          elevation += sin(mouseDist * 0.5 - u_time * 3.0) * smoothstep(15.0, 0.0, mouseDist) * 1.5;

          pos.y += elevation;

          vElevation = elevation;
          vWorldPos = pos;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float u_time;
        uniform vec3 u_deepColor;
        uniform vec3 u_shallowColor;
        uniform vec3 u_foamColor;
        uniform vec3 u_highlightColor;
        varying float vElevation;
        varying vec2 vUv;
        varying vec3 vWorldPos;

        void main() {
          float h = vElevation * 0.15 + 0.5;
          h = clamp(h, 0.0, 1.0);

          // Color by wave height
          vec3 color = mix(u_deepColor, u_shallowColor, smoothstep(0.2, 0.5, h));
          color = mix(color, u_foamColor, smoothstep(0.45, 0.65, h));
          color = mix(color, u_highlightColor, smoothstep(0.6, 0.85, h));

          // Foam on peaks
          float foam = smoothstep(0.7, 0.9, h) * 0.3;
          color += vec3(foam * 0.5, foam * 0.7, foam);

          // Distance fade to fog
          float dist = length(vWorldPos.xz);
          float fogFactor = 1.0 - exp(-dist * 0.012);
          color = mix(color, vec3(0.008, 0.03, 0.094), fogFactor);

          gl_FragColor = vec4(color, 1.0);
        }
      `,
      side: THREE.DoubleSide,
    });

    const ocean = new THREE.Mesh(oceanGeo, oceanMat);
    scene.add(ocean);

    // === BEACON LIGHT (DaW4ve island) ===
    // Glowing point light
    const beaconLight = new THREE.PointLight(0xFFD60A, 3, 50);
    beaconLight.position.set(0, 5, 0);
    scene.add(beaconLight);

    // Beacon glow sprite
    const glowTexture = (() => {
      const canvas = document.createElement("canvas");
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext("2d")!;
      const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
      gradient.addColorStop(0, "rgba(255, 214, 10, 0.6)");
      gradient.addColorStop(0.2, "rgba(255, 214, 10, 0.2)");
      gradient.addColorStop(0.5, "rgba(255, 200, 50, 0.05)");
      gradient.addColorStop(1, "rgba(255, 200, 50, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 256, 256);
      return new THREE.CanvasTexture(canvas);
    })();

    const beaconGlow = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: glowTexture,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    beaconGlow.position.set(0, 4, 0);
    beaconGlow.scale.set(20, 20, 1);
    scene.add(beaconGlow);

    // Smaller inner glow
    const innerGlow = beaconGlow.clone();
    innerGlow.scale.set(8, 8, 1);
    innerGlow.position.set(0, 4.5, 0);
    scene.add(innerGlow);

    // === LIGHT RAYS ===
    const rayGeo = new THREE.PlaneGeometry(0.3, 25);
    const rayMat = new THREE.MeshBasicMaterial({
      color: 0xFFD60A,
      transparent: true,
      opacity: 0.04,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    const rays: THREE.Mesh[] = [];
    for (let i = 0; i < 8; i++) {
      const ray = new THREE.Mesh(rayGeo, rayMat);
      ray.position.set(0, 10, 0);
      ray.rotation.z = (i / 8) * Math.PI;
      ray.rotation.y = (i / 8) * Math.PI * 0.5;
      scene.add(ray);
      rays.push(ray);
    }

    // === AMBIENT LIGHT ===
    scene.add(new THREE.AmbientLight(0x0a1a3a, 0.5));
    const dirLight = new THREE.DirectionalLight(0x1a3a7a, 0.3);
    dirLight.position.set(10, 20, 10);
    scene.add(dirLight);

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

      const t = clock.getElapsedTime();

      // Lerp mouse
      lerpMouse.x += (mouseRef.current.x - lerpMouse.x) * 0.03;
      lerpMouse.y += (mouseRef.current.y - lerpMouse.y) * 0.03;

      // Update ocean uniforms
      oceanMat.uniforms.u_time.value = t;
      oceanMat.uniforms.u_mouse.value.set(lerpMouse.x, lerpMouse.y);

      // Camera follows scroll — dolly forward
      const scrollFactor = scrollRef.current * 0.01;
      camera.position.y = 8 - scrollFactor * 0.5;
      camera.position.z = 20 - scrollFactor * 2;
      camera.lookAt(0, 0, -scrollFactor * 3);

      // Beacon pulse
      const pulse = 1 + Math.sin(t * 1.5) * 0.15;
      beaconGlow.scale.set(20 * pulse, 20 * pulse, 1);
      innerGlow.scale.set(8 * pulse * 1.1, 8 * pulse * 1.1, 1);
      beaconLight.intensity = 3 + Math.sin(t * 2) * 0.8;

      // Rotate rays slowly
      rays.forEach((ray, i) => {
        ray.rotation.z = (i / 8) * Math.PI + t * 0.1;
        (ray.material as THREE.MeshBasicMaterial).opacity = 0.03 + Math.sin(t * 0.5 + i) * 0.015;
      });

      // Subtle camera sway
      camera.position.x = Math.sin(t * 0.15) * 0.5 + lerpMouse.x * 2;

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
      rayGeo.dispose();
      rayMat.dispose();
      glowTexture.dispose();
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
