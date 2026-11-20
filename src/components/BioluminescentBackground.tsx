import React, { useEffect, useRef } from 'react';

/**
 * Real-time WebGL Fluid Canvas Background Shader Engine
 * Procedural simplex noise fluid animation tuned for Bioluminescent Cyan (#00F3FF),
 * Bioluminescent Blue (#0D6EFD), Neon Magenta (#D946EF) & Void Darkness (#030712).
 * Completely headless: NO adjustment UI, NO sliders, NO drawer.
 */

// Vertex Shader Source
const vsSource = `
  attribute vec2 a_position;
  varying vec2 v_uv;
  void main() {
    v_uv = a_position * 0.5 + 0.5;
    v_uv.y = 1.0 - v_uv.y;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

// Fragment Shader Source (Bioluminescent Cyan & Blue Fluid Flow)
const fsSource = `
  precision highp float;

  varying vec2 v_uv;

  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  uniform float u_speed;
  uniform float u_freq;
  uniform float u_noise;
  uniform float u_ripple;
  uniform float u_colorBlend;
  
  uniform vec3 u_color1;
  uniform vec3 u_color2;
  uniform vec3 u_color3;
  uniform vec3 u_color4;

  // Simplex Noise Helper Functions
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                     -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    float aspect = u_resolution.x / u_resolution.y;
    st.x *= aspect;

    vec2 mouse = u_mouse;
    mouse.x *= aspect;

    // Mouse Distance Dynamic Displacement
    float dist = distance(st, mouse);
    float mouseEffect = smoothstep(0.45, 0.0, dist) * u_ripple;

    // Time velocity calculation
    float t = u_time * 0.35 * u_speed;

    // Fluid layer distortion math
    vec2 q = vec2(0.0);
    q.x = snoise(st * u_freq + vec2(t * 0.25, t * 0.35));
    q.y = snoise(st * u_freq + vec2(t * 0.15, t * 0.45));

    vec2 r = vec2(0.0);
    r.x = snoise(st * u_freq + 1.2 * q + vec2(t * 0.45, t * 0.25) + mouseEffect);
    r.y = snoise(st * u_freq + 1.2 * q + vec2(t * 0.35, t * 0.55) + mouseEffect);

    float f = snoise(st * u_freq * u_noise + r);

    // Mix Deep Void, Bioluminescent Blue, and Electric Cyan
    vec3 cyanGlow = u_color3 * u_colorBlend;
    vec3 color = mix(u_color1, u_color2, clamp(f * f * 3.5, 0.0, 1.0));
    color = mix(color, cyanGlow, clamp(length(q) * 0.85, 0.0, 1.0));
    
    // Add Magenta accents & crisp white peaks
    float magentaAccent = clamp(pow(length(r.x), 2.2) * 0.85 + mouseEffect * 0.4, 0.0, 1.0);
    color = mix(color, u_color4, magentaAccent * 0.55);

    // Add dynamic crisp white crest glow
    float whiteCrest = clamp(pow(length(r.y), 3.0), 0.0, 1.0);
    color = mix(color, vec3(1.0, 1.0, 1.0), whiteCrest * 0.4);

    // Brightness ripple boost
    color += vec3(mouseEffect * 0.25 * u_color3);
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

function createShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export const BioluminescentBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cursorDotRef = useRef<HTMLDivElement | null>(null);
  const cursorRingRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
    if (!gl) {
      console.warn('WebGL not supported');
      return;
    }

    const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }

    // Full screen quad geometry
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1.0, -1.0,
         1.0, -1.0,
        -1.0,  1.0,
        -1.0,  1.0,
         1.0, -1.0,
         1.0,  1.0,
      ]),
      gl.STATIC_DRAW
    );

    const locations = {
      position: gl.getAttribLocation(program, 'a_position'),
      time: gl.getUniformLocation(program, 'u_time'),
      resolution: gl.getUniformLocation(program, 'u_resolution'),
      mouse: gl.getUniformLocation(program, 'u_mouse'),
      speed: gl.getUniformLocation(program, 'u_speed'),
      freq: gl.getUniformLocation(program, 'u_freq'),
      noise: gl.getUniformLocation(program, 'u_noise'),
      ripple: gl.getUniformLocation(program, 'u_ripple'),
      colorBlend: gl.getUniformLocation(program, 'u_colorBlend'),
      color1: gl.getUniformLocation(program, 'u_color1'),
      color2: gl.getUniformLocation(program, 'u_color2'),
      color3: gl.getUniformLocation(program, 'u_color3'),
      color4: gl.getUniformLocation(program, 'u_color4'),
    };

    // Fine-tuned state: Bioluminescent Abyss Palette
    // Deep Void (#030712), Bioluminescent Blue (#0D6EFD), Electric Cyan (#00F3FF), Magenta (#D946EF)
    const engineState = {
      speed: 1.0,
      frequency: 1.6,
      noiseDensity: 0.9,
      cursorInfluence: 1.4,
      colorBlend: 1.2,
      targetMouse: [0.5, 0.5],
      currentMouse: [0.5, 0.5],
      rippleForce: 0.0,
      colors: {
        c1: [0.01, 0.03, 0.07], // Deep Void Darkness (#030712)
        c2: [0.05, 0.28, 0.75], // Bioluminescent Blue (#0D6EFD)
        c3: [0.00, 0.95, 1.00], // Electric Cyan (#00F3FF)
        c4: [0.85, 0.27, 0.94], // Neon Magenta Accent (#D946EF)
      },
    };

    function handleResize() {
      if (!canvas || !gl) return;
      const width = window.innerWidth;
      const height = window.innerHeight;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    let animationFrameId: number;
    const startTime = performance.now();

    function render() {
      if (!gl || !canvas) return;

      const currentTime = (performance.now() - startTime) * 0.001;

      // Smooth pointer inertia
      engineState.currentMouse[0] += (engineState.targetMouse[0] - engineState.currentMouse[0]) * 0.05;
      engineState.currentMouse[1] += (engineState.targetMouse[1] - engineState.currentMouse[1]) * 0.05;

      // Decay ripple shockwave force
      engineState.rippleForce *= 0.95;

      gl.useProgram(program);

      gl.enableVertexAttribArray(locations.position);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(locations.position, 2, gl.FLOAT, false, 0, 0);

      gl.uniform1f(locations.time, currentTime);
      gl.uniform2f(locations.resolution, canvas.width, canvas.height);
      gl.uniform2f(locations.mouse, engineState.currentMouse[0], engineState.currentMouse[1]);
      gl.uniform1f(locations.speed, engineState.speed);
      gl.uniform1f(locations.freq, engineState.frequency);
      gl.uniform1f(locations.noise, engineState.noiseDensity);
      gl.uniform1f(locations.ripple, engineState.cursorInfluence + engineState.rippleForce);
      gl.uniform1f(locations.colorBlend, engineState.colorBlend);

      gl.uniform3fv(locations.color1, engineState.colors.c1);
      gl.uniform3fv(locations.color2, engineState.colors.c2);
      gl.uniform3fv(locations.color3, engineState.colors.c3);
      gl.uniform3fv(locations.color4, engineState.colors.c4);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationFrameId = requestAnimationFrame(render);
    }

    render();

    // Mouse movement interaction
    const handleMouseMove = (e: MouseEvent) => {
      const uX = e.clientX / window.innerWidth;
      const uY = e.clientY / window.innerHeight;
      engineState.targetMouse = [uX, uY];

      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = `${e.clientX}px`;
        cursorDotRef.current.style.top = `${e.clientY}px`;
      }

      if (cursorRingRef.current) {
        cursorRingRef.current.animate(
          {
            left: `${e.clientX}px`,
            top: `${e.clientY}px`,
          },
          { duration: 240, fill: 'forwards' }
        );
      }
    };

    // Pointer down ripple shockwave
    const handlePointerDown = () => {
      engineState.rippleForce = 3.2;
      if (cursorRingRef.current) {
        cursorRingRef.current.style.width = '64px';
        cursorRingRef.current.style.height = '64px';
        cursorRingRef.current.style.borderColor = 'rgba(0, 243, 255, 0.95)';
      }
    };

    const handlePointerUp = () => {
      if (cursorRingRef.current) {
        cursorRingRef.current.style.width = '48px';
        cursorRingRef.current.style.height = '48px';
        cursorRingRef.current.style.borderColor = 'rgba(0, 243, 255, 0.7)';
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      if (gl && program) {
        gl.deleteProgram(program);
        if (vs) gl.deleteShader(vs);
        if (fs) gl.deleteShader(fs);
        if (positionBuffer) gl.deleteBuffer(positionBuffer);
      }
    };
  }, []);

  return (
    <>
      {/* Real-time WebGL Background Canvas (Completely behind all content) */}
      <canvas
        ref={canvasRef}
        id="webgl-canvas"
        className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none opacity-100"
      />

      {/* Bioluminescent Fluid Cursor Ring & Dot (Hidden on mobile touch screens, zero interference with UI) */}
      <div
        ref={cursorDotRef}
        id="cursor-dot"
        className="hidden lg:block pointer-events-none fixed top-0 left-0 z-50 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_16px_#00f3ff,0_0_30px_#d946ef] -translate-x-1/2 -translate-y-1/2"
      />
      <div
        ref={cursorRingRef}
        id="cursor-ring"
        className="hidden lg:block pointer-events-none fixed top-0 left-0 z-40 w-12 h-12 rounded-full border-[1.5px] border-cyan-400/70 -translate-x-1/2 -translate-y-1/2 shadow-[inset_0_0_15px_rgba(0,243,255,0.2),0_0_20px_rgba(0,243,255,0.25)] transition-[width,height,border-color] duration-150"
      />
    </>
  );
};
