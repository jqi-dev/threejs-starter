// Declare variables

var container;
var camera;
var cameraControls;
var scene;
var renderer;
var mesh;
var clock = new THREE.Clock();

var jsonObject = "./objects/suzanne.json"

// Initialize functions

init();
animate();

function init() {
  
  // init() adds a renderer, camera, scene, and any mesh objects

  // Set up renderer

  renderer = new THREE.WebGLRenderer({antialias: true, alpha: true, transparent: true});
  container = document.getElementById('container'); 
  renderer.setSize(container.offsetWidth, container.offsetHeight);
  container.appendChild(renderer.domElement);
  
  // Add a camera

  camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 10000);
  camera.position.set(-3, 3, 4);
  
  // Set up camera controls
  // To adjust the size of all objects in the scene, modify camera distance
  // To allow a greater range of rotation, modify minPolarAngle and maxPolarAngle
  
  cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
  cameraControls.target.set(0, 0, 0);
  var distance = 3.3; // sets camera distance from object
  cameraControls.minDistance = distance; 
  cameraControls.maxDistance = distance; // setting these equal disables scroll button behavior
  cameraControls.enableZoom = false; // disables zoom
  cameraControls.enablePan = false; // Disables panning laterally, which can move objects out of view
  cameraControls.minPolarAngle = Math.PI / 8; // Limits range of camera rotation ->
  cameraControls.maxPolarAngle = 7 * Math.PI / 8; // to ensure object won't invert

  // Add a new scene (container for all the objects)
  
  scene = new THREE.Scene();
  
  //-----------------------------------
  // Here the loadMesh() function is called - see below
  //-----------------------------------
  
  loadMesh();

  // Add lights

  var pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.set(-3, 3, 4);
  scene.add(pointLight);
  
  var ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight)

}

// Loads in a .json file as a mesh with a material applied

function loadMesh() {
  console.log(jsonObject);
  var loader = new THREE.JSONLoader();
  loader.load(jsonObject, function(geometry, material) {
      mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(material));
      scene.add(mesh);
      console.log("Mesh loaded!")
  });
}

// Add window event listener to call resizing function

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
  
  // When the window is resized, adjust the renderer size and camera parameters
  
  renderer.setSize(container.offsetWidth, container.offsetHeight);
  camera.aspect = container.offsetWidth / container.offsetHeight;
  camera.updateProjectionMatrix();

}

function animate() {
  
  var delta = clock.getDelta(); // sets the frame rate
  requestAnimationFrame(animate);
  
  // Update the camera and render the scene
  cameraControls.update(delta);
  renderer.render(scene, camera);

}
