//The background  Animation
const backgroundAnimation = () => {
  particlesJS("particles-js", {
    particles: {
      number: { value: 150, density: { enable: true, value_area: 800 } },
      color: { value: "#000000" },
      shape: {
        type: "circle",
        stroke: { width: 0, color: "#000000" },
        polygon: { nb_sides: 5 },
        image: { src: "img/github.svg", width: 100, height: 100 },
      },
      opacity: {
        value: 0.5,
        random: false,
        anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false },
      },
      size: {
        value: 3,
        random: true,
        anim: { enable: false, speed: 40, size_min: 0.1, sync: false },
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#000000",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 6,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: { enable: false, rotateX: 600, rotateY: 1200 },
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "repulse" },
        onclick: { enable: true, mode: "push" },
        resize: true,
      },
      modes: {
        grab: { distance: 400, line_linked: { opacity: 1 } },
        bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
        repulse: { distance: 100, duration: 0.4 }, // Adjust this distance for onhover radius
        push: { particles_nb: 4 },
        remove: { particles_nb: 2 },
      },
    },
    retina_detect: true,
  });
  console.log("Working...");
};
backgroundAnimation();

// // Dotted Transparent Sphere inside the wavy animation
// const createTransparentSphere = () => {
//   // Initialize scene, camera, and renderer
//   const scene = new THREE.Scene();
//   const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
//   const renderer = new THREE.WebGLRenderer({ alpha: true });
//   renderer.setSize(
//     document.getElementById("Globe").offsetWidth,
//     document.getElementById("Globe").offsetHeight
//   ); // Match the size of the #Globe section
//   document.getElementById("Globe").appendChild(renderer.domElement);

//   // Set camera position
//   camera.position.z = 50;

//   document.getElementById("Globe").appendChild(renderer.domElement);

//   const numParticles = 5000; // Number of particles
//   const radius = 20; // Radius of the sphere

//   // Create geometry and material for particles
//   const geometry = new THREE.BufferGeometry();
//   const positions = new Float32Array(numParticles * 3); // x, y, z for each particle
//   const colors = new Float32Array(numParticles * 3); // RGB for each particle

//   // Populate positions and colors
//   for (let i = 0; i < numParticles; i++) {
//     const theta = Math.random() * 10 * Math.PI;
//     const phi = Math.acos(5 * Math.random() - 1);

//     const x = radius * Math.sin(phi) * Math.cos(theta);
//     const y = radius * Math.sin(phi) * Math.sin(theta);
//     const z = radius * Math.cos(phi);

//     positions[i * 3] = x;
//     positions[i * 3 + 1] = y;
//     positions[i * 3 + 2] = z;

//     colors[i * 3] = 0x000000;
//     colors[i * 3 + 1] = 0x000000;
//     colors[i * 3 + 2] = 0x000000;
//   }

//   geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
//   geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

//   const material = new THREE.PointsMaterial({ size: 1, vertexColors: true });

//   const particles = new THREE.Points(geometry, material);
//   scene.add(particles);

//   // Animation function (rotate the sphere)
//   const animate = function () {
//     requestAnimationFrame(animate);

//     // Update particle positions
//     const positions = particles.geometry.attributes.position.array;
//     for (let i = 0; i < numParticles; i++) {
//       positions[i * 3] += (Math.random() - 0.5) * 0.1; // x
//       positions[i * 3 + 1] += (Math.random() - 0.5) * 0.1; // y
//       positions[i * 3 + 2] += (Math.random() - 0.5) * 0.1; // z

//       // Ensure particles stay within the sphere
//       const dist = Math.sqrt(
//         positions[i * 3] ** 2 +
//           positions[i * 3 + 1] ** 2 +
//           positions[i * 3 + 2] ** 2
//       );
//       if (dist > radius) {
//         positions[i * 3] *= radius / dist;
//         positions[i * 3 + 1] *= radius / dist;
//         positions[i * 3 + 2] *= radius / dist;
//       }
//     }

//     particles.geometry.attributes.position.needsUpdate = true;

//     renderer.render(scene, camera);
//   };

//   animate();
// };
// // Call the function to create the sphere
// createTransparentSphere();

// Function to create a rounded dot texture
const createRoundedDotTexture = () => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const size = 10; // Size of the texture

  canvas.width = size;
  canvas.height = size;

  context.beginPath();
  context.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2, false);
  context.closePath();
  context.fillStyle = "#212121"; // Dot color
  context.fill();

  return new THREE.CanvasTexture(canvas);
};

// Dotted Transparent Sphere inside the wavy animation
const createTransparentSphere = () => {
  // Initialize scene, camera, and renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(
    document.getElementById("Globe").offsetWidth,
    document.getElementById("Globe").offsetHeight
  ); // Match the size of the #Globe section
  document.getElementById("Globe").appendChild(renderer.domElement);

  // Set camera position
  camera.position.z = 50;

  const numParticles = 2000; // Number of particles
  const radius = 20; // Radius of the sphere

  // Create texture for rounded dots
  const dotTexture = createRoundedDotTexture();

  // Create geometry and material for particles
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(numParticles * 3); // x, y, z for each particle
  const initialPositions = new Float32Array(numParticles * 3); // Initial positions for smooth movement

  // Populate positions
  for (let i = 0; i < numParticles; i++) {
    const theta = Math.random() * 10 * Math.PI;
    const phi = Math.acos(5 * Math.random() - 1);

    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    initialPositions[i * 3] = x;
    initialPositions[i * 3 + 1] = y;
    initialPositions[i * 3 + 2] = z;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  // Apply the texture to the material for rounded dots
  const material = new THREE.PointsMaterial({
    size: 1, // Adjust the size of the dots
    map: dotTexture, // Apply the texture
    transparent: true, // Ensure dots are visible with transparency
    alphaTest: 0.5, // Adjust transparency threshold
  });

  const particles = new THREE.Points(geometry, material);
  scene.add(particles);

  // Animation function (rotate the sphere)
  const animate = function () {
    requestAnimationFrame(animate);

    // Update particle positions
    const positions = particles.geometry.attributes.position.array;
    const smoothFactor = 0.2; // Smoothness factor

    for (let i = 0; i < numParticles; i++) {
      positions[i * 3] += (Math.random() - 0.5) * smoothFactor; // x
      positions[i * 3 + 1] += (Math.random() - 0.5) * smoothFactor; // y
      positions[i * 3 + 2] += (Math.random() - 0.5) * smoothFactor; // z

      // Ensure particles stay within the sphere
      const dist = Math.sqrt(
        positions[i * 3] ** 2 +
          positions[i * 3 + 1] ** 2 +
          positions[i * 3 + 2] ** 2
      );
      if (dist > radius) {
        positions[i * 3] *= radius / dist;
        positions[i * 3 + 1] *= radius / dist;
        positions[i * 3 + 2] *= radius / dist;
      }
    }

    particles.geometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
  };

  animate();
};
// Call the function to create the sphere
createTransparentSphere();
var siriWave = new SiriWave({
  container: document.getElementById("siri-container"),
  width: 500,
  height: 100,
  style: "ios9",
  color: "#000000",
  speed: 0.1,
  amplitude: 5,
  rippleSpeed: 0.03,
  rippleWidth: 0.02,
  ease: "cubicInOut",
});
const micclickAnimation = () => {
  const siriContainer = document.getElementById("siri-container");
  document.getElementById("MicBtn-off").addEventListener("click", function () {
    eel.audio_input()();
    siriContainer.removeAttribute("hidden"); // Show the siri-container
    document.getElementById("MicBtn-off").setAttribute("hidden", "");
    document.getElementById("MicBtn-on").removeAttribute("hidden");
  });
};
micclickAnimation();

const StartUI = () => {
  document.querySelector(".START-UI").addEventListener("click", () => {
    document.querySelector(".START-UI").setAttribute("hidden", "");
    gsap.to(".AI-UI", {
      opacity: 1,
      duration: 0.5,
    });

    eel.start_up()();
  });
};
StartUI();

const menubarAnimation = () => {
  let menu = document.querySelector("#SettingsBtn");
  let cross = document.querySelector("#CrossBtn");

  let tl = gsap.timeline();

  tl.to("#menu", {
    top: "80vh",
    duration: 0.7,
  });
  tl.from("#menu h4", {
    x: 150,
    duration: 1,
    opacity: 0,
    stagger: 0.3,
  });
  // tl.from("#menu i", {
  //   opacity: 0,
  // });
  tl.pause();

  menu.addEventListener("click", () => {
    tl.play();
    document.querySelector("#SettingsBtn").setAttribute("hidden", "");
    document.querySelector("#CrossBtn").removeAttribute("hidden");
  });
  cross.addEventListener("click", () => {
    tl.reverse();
    document.querySelector("#CrossBtn").setAttribute("hidden", "");
    document.querySelector("#SettingsBtn").removeAttribute("hidden");
  });
};
menubarAnimation();

const chatHistory = () => {
  let menu = document.querySelector("#ChatBtn-off ");
  let cross = document.querySelector("#ChatBtn-on");

  let tl = gsap.timeline();

  tl.to("#history-section", {
    scale: 1,
    duration: 0.5,
  });

  tl.pause();

  menu.addEventListener("click", () => {
    tl.play();
    menu.setAttribute("hidden", "");
    cross.removeAttribute("hidden");
    document.querySelector("#changleableText").setAttribute("hidden", "");
  });
  cross.addEventListener("click", () => {
    tl.reverse();
    cross.setAttribute("hidden", "");
    menu.removeAttribute("hidden");
    document.querySelector("#changleableText").removeAttribute("hidden");
  });
};
chatHistory();

const sendPrompt = () => {
  var Prompt = document.getElementById("chatbox").value;
  console.log(Prompt);

  eel.text_input(Prompt)();
  document.getElementById("chatbox").value = ""; // Clear the input field
};
