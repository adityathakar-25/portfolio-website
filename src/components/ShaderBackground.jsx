import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

// ─── Vertex Shader ────────────────────────────────────────────────────────
const vertexShader = /* glsl */`
  varying vec2 vUv;
  void main(){
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
  }
`

// ─── Fragment Shader ──────────────────────────────────────────────────────
const fragmentShader = /* glsl */`
  precision highp float;

  uniform float u_time;
  uniform vec2  u_resolution;

  varying vec2 vUv;

  // Helper to rotate a 2D vector
  vec2 rotate(vec2 v, float a) {
    float s = sin(a);
    float c = cos(a);
    return vec2(v.x * c - v.y * s, v.x * s + v.y * c);
  }

  // Function to draw a single premium, highly dim, diffuse ribbon
  // p: aspect-ratio corrected UV coordinate centered at (0,0)
  // angle: rotation angle of the ribbon plane
  // time: scaled time for slow movement
  // offset_y: base vertical offset of the ribbon
  // color_base: steel blue or warm orange base color
  // color_center: very dim blue-white or warm highlight color
  // width: thickness scaling of the ribbon
  // speed: time factor
  // wave_freq: wave spatial frequency
  // wave_amp: wave vertical height
  // max_opacity: multiplier for base color (max steel-blue opacity)
  // center_opacity: multiplier for center highlight color
  vec3 get_ribbon(vec2 p, float angle, float time, float offset_y, vec3 color_base, vec3 color_center, float width, float speed, float wave_freq, float wave_amp, float max_opacity, float center_opacity) {
    // Rotate coordinate to align ribbon along a tilted axis
    vec2 pr = rotate(p, angle);

    // Time component
    float t = time * speed;

    // Composite organic sine/cosine wave for slow, premium zero-gravity silk behavior
    float wave = sin(pr.x * wave_freq + t) * wave_amp;
    wave += cos(pr.x * (wave_freq * 2.3) - t * 0.7) * (wave_amp * 0.35);
    wave += sin(pr.x * (wave_freq * 0.5) + t * 0.4) * (wave_amp * 0.50);

    // Calculate vertical distance to the ribbon wave
    float dist = abs(pr.y - offset_y - wave);

    // Ribbon profile: wider center, fast smooth falloff to transparent
    float x = dist / (width * 0.38); // Control the overall thickness of the glow
    float profile = smoothstep(1.0, 0.0, x);
    profile = pow(profile, 2.5); // Fast, clean drop-off to transparent at the edges

    // Silk shimmering thickness pulse
    float shimmer = 0.85 + 0.15 * sin(pr.x * 1.5 - t * 0.5);

    // Blend base and center colors with our custom low opacities
    vec3 ribbon_color = color_base * max_opacity * profile + color_center * center_opacity * pow(profile, 4.0);

    return ribbon_color * shimmer;
  }

  // Draw all ribbons in a combined coordinate
  vec3 draw_scene(vec2 p, float t) {
    vec3 scene_col = vec3(0.0);

    // Colors: Shifted to a gorgeous, premium middle-ground level
    // Base Steel Blue: #1e3a8a
    vec3 steel_blue = vec3(0.118, 0.227, 0.541);
    // Soft Electric Icy Blue for soft glowing centers: #a5f3fc
    vec3 icy_blue = vec3(0.647, 0.953, 0.988);
    // Beautiful subtle warm orange/amber: #fb923c
    vec3 warm_orange = vec3(0.984, 0.573, 0.235);

    // Ribbon 1: Main Blue Ribbon (Slightly downward tilted)
    vec3 r1 = get_ribbon(
      p, 
      -0.12,                     // angle (radians)
      t,                         // time
      0.22,                      // offset_y
      steel_blue,                // base color
      icy_blue,                  // center color
      0.90,                      // width scale
      0.80,                      // speed scale
      1.10,                      // wave freq
      0.18,                      // wave amp
      0.45,                      // max_opacity (steel blue, 0.45)
      0.22                       // center_opacity (icy blue, 0.22)
    );

    // Ribbon 2: Secondary Blue Ribbon (Slightly thinner, crosses Ribbon 1)
    vec3 r2 = get_ribbon(
      p, 
      0.08,                      // angle
      t, 
      0.38,                      // offset_y
      steel_blue,                // base color
      icy_blue,                  // center color
      0.75,                      // width (thinner)
      0.65,                      // speed scale
      1.40,                      // wave freq
      0.14,                      // wave amp
      0.35,                      // max_opacity (steel blue, 0.35)
      0.16                       // center_opacity (icy blue, 0.16)
    );

    // Ribbon 3: Warm Accent Ribbon (Crossing behind, subtle warm golden touch)
    vec3 r3 = get_ribbon(
      p, 
      -0.22,                     // angle
      t, 
      0.28,                      // offset_y
      warm_orange,               // base color
      warm_orange,               // center color
      0.60,                      // width (thinner)
      1.10,                      // speed scale
      0.85,                      // wave freq
      0.22,                      // wave amp
      0.18,                      // max_opacity (subtle golden glow, 0.18)
      0.06                       // center_opacity (even lower center)
    );

    // Layering: Additive blending
    // Place orange accent ribbon (r3) "behind" the blue-white ribbons
    scene_col += r3;
    scene_col += r1;
    scene_col += r2;

    return scene_col;
  }

  void main() {
    vec2 uv = vUv;

    // Aspect-corrected coordinate centered at (0, 0)
    vec2 p = (uv - 0.5) * 2.0;
    p.x *= u_resolution.x / u_resolution.y;

    // Extremely slow morphing time - full cycle roughly 15-20 seconds
    float t = u_time * 0.33;

    // Direct scene rendering in the entire viewport (no ground reflection)
    vec3 col = draw_scene(p, t);

    // Ensure absolute black background and clamp outputs
    col = clamp(col, 0.0, 1.0);

    gl_FragColor = vec4(col, 1.0);
  }
`

// ─── Component ────────────────────────────────────────────────────────────
export default function ShaderBackground() {
  const mountRef  = useRef(null)
  const stateRef  = useRef({})   // holds all Three.js objects
  const [webglOk, setWebglOk] = useState(true)

  useEffect(() => {
    const el = mountRef.current
    if (!el) return

    // ── WebGL support detection ──────────────────────────────────
    const testCanvas = document.createElement('canvas')
    const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl')
    if (!gl) {
      setWebglOk(false)
      return
    }

    // ── Scene setup ──────────────────────────────────────────────
    const W = window.innerWidth
    const H = window.innerHeight

    const renderer = new THREE.WebGLRenderer({ canvas: el, antialias: false, alpha: false })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setSize(W, H)

    const scene    = new THREE.Scene()
    const camera   = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

    const geometry = new THREE.PlaneGeometry(2, 2)
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        u_time:       { value: 0.0 },
        u_resolution: { value: new THREE.Vector2(W, H) },
      },
      depthWrite: false,
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    // ── Animation loop ───────────────────────────────────────────
    let rafId   = null
    let paused  = false
    let lastTime = performance.now()
    let elapsed  = 0

    function tick(now) {
      if (!paused) {
        const delta = (now - lastTime) / 1000
        elapsed += delta
        material.uniforms.u_time.value = elapsed
        renderer.render(scene, camera)
      }
      lastTime = now
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    // ── Page Visibility API — pause when tab hidden ──────────────
    function onVisibilityChange() {
      paused = document.hidden
      if (!paused) lastTime = performance.now()
    }
    document.addEventListener('visibilitychange', onVisibilityChange)

    // ── Resize handler ───────────────────────────────────────────
    function onResize() {
      const w = window.innerWidth
      const h = window.innerHeight
      renderer.setSize(w, h)
      material.uniforms.u_resolution.value.set(w, h)
    }
    window.addEventListener('resize', onResize)

    // Store refs for cleanup
    stateRef.current = { renderer, scene, geometry, material, mesh, rafId }

    return () => {
      // ── Dispose on unmount ───────────────────────────────────
      cancelAnimationFrame(stateRef.current.rafId)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      window.removeEventListener('resize', onResize)

      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  // ── WebGL fallback ───────────────────────────────────────────────────────
  if (!webglOk) {
    return (
      <div
        className="shader-fallback"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
    )
  }

  return (
    <canvas
      ref={mountRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  )
}
