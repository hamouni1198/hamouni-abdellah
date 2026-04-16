import * as THREE from 'three';

if (window.innerWidth < 768) {
  const c = document.getElementById('bg-canvas');
  if (c) c.style.display = 'none';
} else {
  initScene();
}

function initScene() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  let W = window.innerWidth;
  let H = window.innerHeight;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(W, H);
  renderer.setClearColor(0xffffff, 1);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, W / H, 1, 3000);
  camera.position.z = 600;

  const N = 110;
  const positions = new Float32Array(N * 3);
  const velocities = new Float32Array(N * 3);

  for (let i = 0; i < N; i++) {
    const b = i * 3;
    positions[b]     = (Math.random() - 0.5) * W;
    positions[b + 1] = (Math.random() - 0.5) * H;
    positions[b + 2] = (Math.random() - 0.5) * 200;
    velocities[b]     = (Math.random() - 0.5) * 0.45;
    velocities[b + 1] = (Math.random() - 0.5) * 0.45;
  }

  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  scene.add(new THREE.Points(pGeo, new THREE.PointsMaterial({
    color: 0x000000, size: 3.5, transparent: true, opacity: 0.28
  })));

  const MAX_LINES = 320;
  const linePos = new Float32Array(MAX_LINES * 6);
  const lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute('position', new THREE.BufferAttribute(linePos, 3));
  lineGeo.setDrawRange(0, 0);
  scene.add(new THREE.LineSegments(lineGeo, new THREE.LineBasicMaterial({
    color: 0x000000, transparent: true, opacity: 0.07
  })));

  let tx = 0, ty = 0, cx = 0, cy = 0;

  window.addEventListener('mousemove', e => {
    tx = (e.clientX / W - 0.5) * 45;
    ty = -(e.clientY / H - 0.5) * 30;
  });

  window.addEventListener('resize', () => {
    W = window.innerWidth;
    H = window.innerHeight;
    renderer.setSize(W, H);
    camera.aspect = W / H;
    camera.updateProjectionMatrix();
  });

  const pos = pGeo.attributes.position.array;
  const lp  = lineGeo.attributes.position.array;
  const DIST2 = 155 * 155;

  (function loop() {
    requestAnimationFrame(loop);

    cx += (tx - cx) * 0.035;
    cy += (ty - cy) * 0.035;
    camera.position.x = cx;
    camera.position.y = cy;
    camera.lookAt(0, 0, 0);

    for (let i = 0; i < N; i++) {
      const b = i * 3;
      pos[b]     += velocities[b];
      pos[b + 1] += velocities[b + 1];
      if (pos[b]     >  W / 2) pos[b]     = -W / 2;
      if (pos[b]     < -W / 2) pos[b]     =  W / 2;
      if (pos[b + 1] >  H / 2) pos[b + 1] = -H / 2;
      if (pos[b + 1] < -H / 2) pos[b + 1] =  H / 2;
    }
    pGeo.attributes.position.needsUpdate = true;

    let li = 0;
    for (let i = 0; i < N && li < MAX_LINES; i++) {
      for (let j = i + 1; j < N && li < MAX_LINES; j++) {
        const dx = pos[i*3] - pos[j*3];
        const dy = pos[i*3+1] - pos[j*3+1];
        if (dx*dx + dy*dy < DIST2) {
          const lb = li * 6;
          lp[lb]   = pos[i*3];   lp[lb+1] = pos[i*3+1]; lp[lb+2] = pos[i*3+2];
          lp[lb+3] = pos[j*3];   lp[lb+4] = pos[j*3+1]; lp[lb+5] = pos[j*3+2];
          li++;
        }
      }
    }
    lineGeo.setDrawRange(0, li * 2);
    lineGeo.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
  })();
}
