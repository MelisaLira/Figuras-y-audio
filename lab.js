let mic;
let audioContext;
let analyser;
const startAudioButton = document.getElementById('start-audio');
const figureSelector = document.getElementById('figure-selector');
let selectedFigure = 'original';

startAudioButton.addEventListener('click', async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    startAudio(stream);
  } catch (error) {
    console.error('Error al acceder al micrófono:', error);
  }
});

figureSelector.addEventListener('change', (event) => {
  selectedFigure = event.target.value;
});

function startAudio(stream) {
  audioContext = new AudioContext();
  mic = audioContext.createMediaStreamSource(stream);
  analyser = audioContext.createAnalyser();
  mic.connect(analyser);

  // Resumir el contexto de audio
  audioContext.resume().catch((error) => {
    console.error('Error al resumir el contexto de audio:', error);
  });
}

function setup() {
  createCanvas(700, 700, WEBGL);
  angleMode(DEGREES);
}

function draw() {
  background(30);
  rotateX(60);
  noFill();
  stroke(255);

  if (analyser) {
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(dataArray);

    switch (selectedFigure) {
      case 'original':
        drawOriginalFigure(dataArray);
        break;
      case 'cube':
        drawCube(dataArray);
        break;
      case 'sphere':
        drawSphere(dataArray);
        break;
      case 'torus':
        drawTorus(dataArray);
        break;
      case 'pyramid':
        drawPyramid(dataArray);
        break;
      case 'cone':
        drawCone(dataArray);
        break;
      case 'cylinder':
        drawCylinder(dataArray);
        break;
      case 'ellipsoid':
        drawEllipsoid(dataArray);
        break;
      case 'tetrahedron':
        drawTetrahedron(dataArray);
        break;
      case 'dodecahedron':
        drawDodecahedron(dataArray);
        break;
      case 'icosahedron':
        drawIcosahedron(dataArray);
        break;
      case 'octahedron':
        drawOctahedron(dataArray);
        break;
      case 'torusknot':
        drawTorusKnot(dataArray);
        break;
      case 'helix':
        drawHelix(dataArray);
        break;
      case 'plane':
        drawPlane(dataArray);
        break;
    }
  }
}

function drawOriginalFigure(dataArray) {
  for (let i = 0; i < 50; i++) {
    const r = map(sin(frameCount / 2), -1, 1, 100, 200);
    const g = map(i, 0, 50, 100, 200);
    const b = map(cos(frameCount), -1, 1, 200, 100);
    stroke(r, g, b);
    rotate(5);
    beginShape();
    for (let j = 0; j < 360; j += 60) {
      const rad = (i + dataArray[j]) * 3;
      const x = rad * cos(j);
      const y = rad * sin(j);
      const z = sin(frameCount * 2 + i * 5) * 50;
      vertex(x, y, z);
    }
    endShape(CLOSE);
  }
}

function drawCube(dataArray) {
  stroke(255);
  fill(100, 150, 255, 50);

  const size = 200;
  const halfSize = size / 2;

  // Define los vértices del cubo
  let vertices = [
    [-halfSize, -halfSize, -halfSize],
    [halfSize, -halfSize, -halfSize],
    [halfSize, halfSize, -halfSize],
    [-halfSize, halfSize, -halfSize],
    [-halfSize, -halfSize, halfSize],
    [halfSize, -halfSize, halfSize],
    [halfSize, halfSize, halfSize],
    [-halfSize, halfSize, halfSize]
  ];

  // Expande los vértices según los datos de audio
  for (let i = 0; i < vertices.length; i++) {
    const index = Math.floor((i / vertices.length) * dataArray.length);
    const expansion = map(dataArray[index], 0, 255, 0, width / 1.5);
    vertices[i] = vertices[i].map(v => v + expansion);
  }

  // Dibuja las caras del cubo
  beginShape();
  vertex(...vertices[0]);
  vertex(...vertices[1]);
  vertex(...vertices[2]);
  vertex(...vertices[3]);
  endShape(CLOSE);

  beginShape();
  vertex(...vertices[4]);
  vertex(...vertices[5]);
  vertex(...vertices[6]);
  vertex(...vertices[7]);
  endShape(CLOSE);

  beginShape();
  vertex(...vertices[0]);
  vertex(...vertices[1]);
  vertex(...vertices[5]);
  vertex(...vertices[4]);
  endShape(CLOSE);

  beginShape();
  vertex(...vertices[1]);
  vertex(...vertices[2]);
  vertex(...vertices[6]);
  vertex(...vertices[5]);
  endShape(CLOSE);

  beginShape();
  vertex(...vertices[2]);
  vertex(...vertices[3]);
  vertex(...vertices[7]);
  vertex(...vertices[6]);
  endShape(CLOSE);

  beginShape();
  vertex(...vertices[3]);
  vertex(...vertices[0]);
  vertex(...vertices[4]);
  vertex(...vertices[7]);
  endShape(CLOSE);
}

function drawSphere(dataArray) {
  stroke(255);
  fill(100, 150, 255, 50);

  const radius = 150;

  beginShape(POINTS);
  for (let i = 0; i < 360; i += 10) {
    for (let j = 0; j < 360; j += 10) {
      const index = Math.floor((i * j) % dataArray.length);
      const expansion = map(dataArray[index], 0, 255, 0, 100);
      const x = (radius + expansion) * sin(i) * cos(j);
      const y = (radius + expansion) * sin(i) * sin(j);
      const z = (radius + expansion) * cos(i);
      vertex(x, y, z);
    }
  }
  endShape();
}

function drawTorus(dataArray) {
  stroke(255);
  fill(100, 150, 255, 50);

  const radius = 150;
  const tubeRadius = 50;

  beginShape(POINTS);
  for (let i = 0; i < 360; i += 10) {
    for (let j = 0; j < 360; j += 10) {
      const index = Math.floor((i * j) % dataArray.length);
      const expansion = map(dataArray[index], 0, 255, 0, 50);
      const x = (radius + expansion + tubeRadius * cos(j)) * cos(i);
      const y = (radius + expansion + tubeRadius * cos(j)) * sin(i);
      const z = tubeRadius * sin(j);
      vertex(x, y, z);
    }
  }
  endShape();
}

function drawPyramid(dataArray) {
  stroke(255);
  fill(100, 150, 255, 50);

  const size = 200;
  const halfSize = size / 2;

  // Define los vértices de la pirámide
  let vertices = [
    [0, -halfSize, 0],
    [-halfSize, halfSize, -halfSize],
    [halfSize, halfSize, -halfSize],
    [halfSize, halfSize, halfSize],
    [-halfSize, halfSize, halfSize]
  ];

  // Expande los vértices según los datos de audio
  for (let i = 0; i < vertices.length; i++) {
    const index = Math.floor((i / vertices.length) * dataArray.length);
    const expansion = map(dataArray[index], 0, 255, 0, width / 1.5);
    vertices[i] = vertices[i].map(v => v + expansion);
  }

  // Dibuja las caras de la pirámide
  beginShape();
  vertex(...vertices[0]);
  vertex(...vertices[1]);
  vertex(...vertices[2]);
  endShape(CLOSE);

  beginShape();
  vertex(...vertices[0]);
  vertex(...vertices[2]);
  vertex(...vertices[3]);
  endShape(CLOSE);

  beginShape();
  vertex(...vertices[0]);
  vertex(...vertices[3]);
  vertex(...vertices[4]);
  endShape(CLOSE);

  beginShape();
  vertex(...vertices[0]);
  vertex(...vertices[4]);
  vertex(...vertices[1]);
  endShape(CLOSE);

  beginShape();
  vertex(...vertices[1]);
  vertex(...vertices[2]);
  vertex(...vertices[3]);
  vertex(...vertices[4]);
  endShape(CLOSE);
}

function drawCone(dataArray) {
  stroke(255);
  fill(100, 150, 255, 50);

  const radius = 100;
  const height = 200;

  let baseVertices = [];
  for (let i = 0; i < 360; i += 36) {
    const x = radius * cos(i);
    const y = radius * sin(i);
    const index = Math.floor((i / 360) * dataArray.length);
    const expansion = map(dataArray[index], 0, 255, 0, width / 1.5);
    baseVertices.push([x + expansion, y + expansion, 0]);
  }

  // Dibuja la base del cono
  beginShape();
  baseVertices.forEach(v => vertex(...v));
  endShape(CLOSE);

  // Dibuja la superficie del cono
  baseVertices.forEach(v => {
    beginShape();
    vertex(...v);
    vertex(0, 0, -height);
    endShape();
  });
}

function drawCylinder(dataArray) {
  stroke(255);
  fill(100, 150, 255, 50);

  const radius = 100;
  const height = 200;

  let topVertices = [];
  let bottomVertices = [];
  for (let i = 0; i < 360; i += 36) {
    const x = radius * cos(i);
    const y = radius * sin(i);
    const index = Math.floor((i / 360) * dataArray.length);
    const expansion = map(dataArray[index], 0, 255, 0, width / 1.5);
    topVertices.push([x + expansion, y + expansion, -height / 2]);
    bottomVertices.push([x + expansion, y + expansion, height / 2]);
  }

  // Dibuja la parte superior del cilindro
  beginShape();
  topVertices.forEach(v => vertex(...v));
  endShape(CLOSE);

  // Dibuja la parte inferior del cilindro
  beginShape();
  bottomVertices.forEach(v => vertex(...v));
  endShape(CLOSE);

  // Dibuja la superficie lateral del cilindro
  for (let i = 0; i < topVertices.length; i++) {
    beginShape();
    vertex(...topVertices[i]);
    vertex(...bottomVertices[i]);
    vertex(...bottomVertices[(i + 1) % bottomVertices.length]);
    vertex(...topVertices[(i + 1) % topVertices.length]);
    endShape(CLOSE);
  }
}

function drawEllipsoid(dataArray) {
  stroke(255);
  fill(100, 150, 255, 50);

  const radiusX = 100;
  const radiusY = 150;
  const radiusZ = 200;

  beginShape(POINTS);
  for (let i = 0; i < 360; i += 10) {
    for (let j = 0; j < 360; j += 10) {
      const index = Math.floor((i * j) % dataArray.length);
      const expansion = map(dataArray[index], 0, 255, 0, 100);
      const x = (radiusX + expansion) * sin(i) * cos(j);
      const y = (radiusY + expansion) * sin(i) * sin(j);
      const z = (radiusZ + expansion) * cos(i);
      vertex(x, y, z);
    }
  }
  endShape();
}

function drawTetrahedron(dataArray) {
  stroke(255);
  fill(100, 150, 255, 50);

  const size = 200;
  const height = sqrt(2/3) * size;

  let vertices = [
    [0, -height / 2, 0],
    [-size / 2, height / 2, -size / sqrt(3)],
    [size / 2, height / 2, -size / sqrt(3)],
    [0, height / 2, 2 * size / sqrt(3)]
  ];

  for (let i = 0; i < vertices.length; i++) {
    const index = Math.floor((i / vertices.length) * dataArray.length);
    const expansion = map(dataArray[index], 0, 255, 0, width / 1.5);
    vertices[i] = vertices[i].map(v => v + expansion);
  }

  beginShape();
  vertex(...vertices[0]);
  vertex(...vertices[1]);
  vertex(...vertices[2]);
  endShape(CLOSE);

  beginShape();
  vertex(...vertices[0]);
  vertex(...vertices[2]);
  vertex(...vertices[3]);
  endShape(CLOSE);

  beginShape();
  vertex(...vertices[0]);
  vertex(...vertices[3]);
  vertex(...vertices[1]);
  endShape(CLOSE);

  beginShape();
  vertex(...vertices[1]);
  vertex(...vertices[2]);
  vertex(...vertices[3]);
  endShape(CLOSE);
}

function drawDodecahedron(dataArray) {
  stroke(255);
  fill(100, 150, 255, 50);

  const phi = (1 + sqrt(5)) / 2;
  const a = 100 / phi;
  const b = 100 * phi;

  let vertices = [
    [-a, 0, b], [a, 0, b], [-a, 0, -b], [a, 0, -b],
    [0, b, a], [0, b, -a], [0, -b, a], [0, -b, -a],
    [b, a, 0], [-b, a, 0], [b, -a, 0], [-b, -a, 0]
  ];

  for (let i = 0; i < vertices.length; i++) {
    const index = Math.floor((i / vertices.length) * dataArray.length);
    const expansion = map(dataArray[index], 0, 255, 0, width / 1.5);
    vertices[i] = vertices[i].map(v => v + expansion);
  }

  beginShape();
  vertex(...vertices[0]);
  vertex(...vertices[1]);
  vertex(...vertices[8]);
  vertex(...vertices[4]);
  vertex(...vertices[9]);
  endShape(CLOSE);

  beginShape();
  vertex(...vertices[1]);
  vertex(...vertices[0]);
  vertex(...vertices[6]);
  vertex(...vertices[10]);
  vertex(...vertices[7]);
  endShape(CLOSE);

  beginShape();
  vertex(...vertices[3]);
  vertex(...vertices[2]);
  vertex(...vertices[11]);
  vertex(...vertices[5]);
  vertex(...vertices[10]);
  endShape(CLOSE);

  beginShape();
  vertex(...vertices[2]);
  vertex(...vertices[3]);
  vertex(...vertices[7]);
  vertex(...vertices[8]);
  vertex(...vertices[6]);
  endShape(CLOSE);

  beginShape();
  vertex(...vertices[3]);
  vertex(...vertices[10]);
  vertex(...vertices[7]);
  endShape(CLOSE);

  beginShape();
  vertex(...vertices[2]);
  vertex(...vertices[6]);
  vertex(...vertices[11]);
  endShape(CLOSE);

  beginShape();
  vertex(...vertices[4]);
  vertex(...vertices[5]);
  vertex(...vertices[11]);
  vertex(...vertices[9]);
  endShape(CLOSE);

  beginShape();
  vertex(...vertices[4]);
  vertex(...vertices[8]);
  vertex(...vertices[5]);
  endShape(CLOSE);

  beginShape();
  vertex(...vertices[0]);
  vertex(...vertices
    [9]);
    endShape(CLOSE);
  
    beginShape();
    vertex(...vertices[1]);
    vertex(...vertices[9]);
    vertex(...vertices[8]);
    endShape(CLOSE);
  
    beginShape();
    vertex(...vertices[0]);
    vertex(...vertices[4]);
    vertex(...vertices[9]);
    endShape(CLOSE);
  
    beginShape();
    vertex(...vertices[5]);
    vertex(...vertices[4]);
    vertex(...vertices[0]);
    vertex(...vertices[1]);
    vertex(...vertices[7]);
    endShape(CLOSE);
  }
  
  function drawIcosahedron(dataArray) {
    stroke(255);
    fill(100, 150, 255, 50);
  
    const phi = (1 + sqrt(5)) / 2;
    const a = 100;
    const b = 100 * phi;
  
    let vertices = [
      [0, -a, b], [b, 0, a], [-b, 0, a], [0, a, b],
      [-a, b, 0], [a, b, 0], [a, -b, 0], [-a, -b, 0],
      [0, -a, -b], [b, 0, -a], [-b, 0, -a], [0, a, -b]
    ];
  
    for (let i = 0; i < vertices.length; i++) {
      const index = Math.floor((i / vertices.length) * dataArray.length);
      const expansion = map(dataArray[index], 0, 255, 0, width / 1.5);
      vertices[i] = vertices[i].map(v => v + expansion);
    }
  
    beginShape();
    vertex(...vertices[0]);
    vertex(...vertices[1]);
    vertex(...vertices[5]);
    endShape(CLOSE);
  
    beginShape();
    vertex(...vertices[0]);
    vertex(...vertices[5]);
    vertex(...vertices[4]);
    endShape(CLOSE);
  
    beginShape();
    vertex(...vertices[0]);
    vertex(...vertices[4]);
    vertex(...vertices[8]);
    endShape(CLOSE);
  
    beginShape();
    vertex(...vertices[0]);
    vertex(...vertices[8]);
    vertex(...vertices[9]);
    endShape(CLOSE);
  
    beginShape();
    vertex(...vertices[0]);
    vertex(...vertices[9]);
    vertex(...vertices[1]);
    endShape(CLOSE);
  
    beginShape();
    vertex(...vertices[1]);
    vertex(...vertices[5]);
    vertex(...vertices[11]);
    endShape(CLOSE);
  
    beginShape();
    vertex(...vertices[5]);
    vertex(...vertices[4]);
    vertex(...vertices[10]);
    endShape(CLOSE);
  
    beginShape();
    vertex(...vertices[4]);
    vertex(...vertices[8]);
    vertex(...vertices[6]);
    endShape(CLOSE);
  
    beginShape();
    vertex(...vertices[8]);
    vertex(...vertices[9]);
    vertex(...vertices[2]);
    endShape(CLOSE);
  
    beginShape();
    vertex(...vertices[9]);
    vertex(...vertices[1]);
    vertex(...vertices[7]);
    endShape(CLOSE);
  
    beginShape();
    vertex(...vertices[3]);
    vertex(...vertices[11]);
    vertex(...vertices[6]);
    endShape(CLOSE);
  
    beginShape();
    vertex(...vertices[7]);
    vertex(...vertices[3]);
    vertex(...vertices[10]);
    endShape(CLOSE);
  
    beginShape();
    vertex(...vertices[2]);
    vertex(...vertices[7]);
    vertex(...vertices[10]);
    endShape(CLOSE);
  
    beginShape();
    vertex(...vertices[3]);
    vertex(...vertices[11]);
    vertex(...vertices[6]);
    endShape(CLOSE);
  
    beginShape();
    vertex(...vertices[3]);
    vertex(...vertices[6]);
    vertex(...vertices[2]);
    endShape(CLOSE);
  
    beginShape();
    vertex(...vertices[2]);
    vertex(...vertices[6]);
    vertex(...vertices[8]);
    endShape(CLOSE);
  
    beginShape();
    vertex(...vertices[2]);
    vertex(...vertices[8]);
    vertex(...vertices[7]);
    endShape(CLOSE);
  
    beginShape();
    vertex(...vertices[3]);
    vertex(...vertices[10]);
    vertex(...vertices[11]);
    endShape(CLOSE);
  }
  
  function drawOctahedron(dataArray) {
    stroke(255);
    fill(100, 150, 255, 50);
  
    const a = 100;
  
    let vertices = [
      [0, 0, a], [0, 0, -a], [a, 0, 0], [-a, 0, 0],
      [0, a, 0], [0, -a, 0]
    ];
  
    for (let i = 0; i < vertices.length; i++) {
      const index = Math.floor((i / vertices.length) * dataArray.length);
      const expansion = map(dataArray[index], 0, 255, 0, width / 1.5);
      vertices[i] = vertices[i].map(v => v + expansion);
    }
  
    beginShape();
    vertex(...vertices[0]);
    vertex(...vertices[2]);
    vertex(...vertices[4]);
    endShape(CLOSE);
  
    beginShape();
    vertex(...vertices[0]);
    vertex(...vertices[4]);
    vertex(...vertices[3]);
    endShape(CLOSE);
  
    beginShape();
    vertex(...vertices[0]);
    vertex(...vertices[3]);
    vertex(...vertices[5]);
    endShape(CLOSE);
  
    beginShape();
    vertex(...vertices[0]);
    vertex(...vertices[5]);
    vertex(...vertices[2]);
    endShape(CLOSE);
  
    beginShape();
    vertex(...vertices[1]);
    vertex(...vertices[2]);
    vertex(...vertices[4]);
    endShape(CLOSE);
  
    beginShape();
    vertex(...vertices[1]);
    vertex(...vertices[4]);
    vertex(...vertices[3]);
    endShape(CLOSE);
  
    beginShape();
    vertex(...vertices[1]);
    vertex(...vertices[3]);
    vertex(...vertices[5]);
    endShape(CLOSE);
  
    beginShape();
    vertex(...vertices[1]);
    vertex(...vertices[5]);
    vertex(...vertices[2]);
    endShape(CLOSE);
  }
  
  function drawTorusKnot(dataArray) {
    stroke(255);
    fill(100, 150, 255, 50);
  
    const p = 3;
    const q = 7;
    const r1 = 100;
    const r2 = 50;
  
    beginShape(POINTS);
    for (let theta = 0; theta < TWO_PI; theta += PI / 36) {
      for (let phi = 0; phi < TWO_PI; phi += PI / 36) {
        const x = (r1 + r2 * cos(q * theta)) * cos(p * theta);
        const y = (r1 + r2 * cos(q * theta)) * sin(p * theta);
        const z = r2 * sin(q * theta);
        const index = Math.floor
        ((theta * phi) % dataArray.length);
        const expansion = map(dataArray[index], 0, 255, 0, 100);
        vertex(x + expansion, y + expansion, z + expansion);
      }
    }
    endShape(CLOSE);
  }
  
  function drawHelix(dataArray) {
    stroke(255);
    fill(100, 150, 255, 50);
  
    const radius = 100;
    const height = 500;
  
    beginShape();
    for (let theta = 0; theta < TWO_PI * 5; theta += PI / 36) {
      const index = Math.floor((theta * 180 / PI) % dataArray.length);
      const expansion = map(dataArray[index], 0, 255, 0, 100);
      const x = radius * cos(theta);
      const y = radius * sin(theta);
      const z = (height / (TWO_PI * 5)) * theta;
      vertex(x + expansion, y + expansion, z + expansion);
    }
    endShape();
  }
  
  function drawPlane(dataArray) {
    stroke(255);
    fill(100, 150, 255, 50);
  
    const size = 400;
  
    const vertices = [
      [-size / 2, -size / 2, 0],
      [size / 2, -size / 2, 0],
      [size / 2, size / 2, 0],
      [-size / 2, size / 2, 0]
    ];
  
    for (let i = 0; i < vertices.length; i++) {
      const index = Math.floor((i / vertices.length) * dataArray.length);
      const expansion = map(dataArray[index], 0, 255, 0, width / 1.5);
      vertices[i] = vertices[i].map(v => v + expansion);
    }
  
    beginShape();
    vertex(...vertices[0]);
    vertex(...vertices[1]);
    vertex(...vertices[2]);
    vertex(...vertices[3]);
    endShape(CLOSE);
  }
    
