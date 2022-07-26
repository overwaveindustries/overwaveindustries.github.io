/********
RUN PROJECT USING:
$> parcel ./src/index.html

********/
console.log("script entered");

// IMPORT modules
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import * as TWEEN from '@tweenjs/tween.js';

// IMPORT sprites, objects, etc..
import logoIND from '../sprites/industries-sprite.png';
import import_Mannypeace from '../sprites/manny-peace-sprite.png';

// IMPORT video objects
let animOVERWAVE = document.createElement('video');
animOVERWAVE.src = new URL('../sprites/overwave-scroll-anim.mp4', import.meta.url);

//// SET THREE.JS ELEMENTS
// new WebGL object
const RENDERER = new THREE.WebGLRenderer({ antialias: true });
// create our main SCENE 
const scene = new THREE.Scene();
// create our main camera
const camera = new THREE.PerspectiveCamera(
	100,
	window.innerWidth / window.innerHeight,
	1,
	1000
);
camera.updateProjectionMatrix();
// create our control methods
const controls = new OrbitControls(camera, RENDERER.domElement);

//// SET GLOBAL FLAGS
var scrollLOCK = false;
const coord_HOME = new THREE.Vector3(0, 0, 1);


function ThreeStart() {

	// set RENDERER to the same size as browser window
	RENDERER.setPixelRatio( window.devicePixelRatio );
	RENDERER.setSize(window.innerWidth, window.innerHeight);
	// RENDERER.shadowMap.enabled = true; // to enable shadows

	// inject RENDERER into the HTML doc as our main element
	document.body.appendChild(RENDERER.domElement); 

	// SET control methods
	controls.enableRotate = false;
	controls.enableZoom = true;
	controls.minDistance = 1;
	controls.maxDistance = 100;
	controls.keys = { // NOT WORKING FOR SOME REASON
		LEFT: "KeyA", //left arrow
		UP: "KeyW", // up arrow
		RIGHT: "KeyD", // right arrow
		BOTTOM: "KeyS" // down arrow
	}
	controls.mouseButtons = {
		LEFT: THREE.MOUSE.PAN,
		MIDDLE: THREE.MOUSE.DOLLY,
		RIGHT: null
	}
	controls.touches = {
		ONE: THREE.TOUCH.PAN,
		TWO: THREE.TOUCH.DOLLY_PAN
	}
	// controls.enableDamping = true;
	// controls.dampingFactor = .4;
	controls.panSpeed = 1;

	// create the CANVAS (white background plane)
	const planeGeometry = new THREE.PlaneGeometry(100, 100);
	const planeMaterial = new THREE.MeshBasicMaterial({color: 0xffffff})
	const CANVAS = new THREE.Mesh(planeGeometry, planeMaterial);
	CANVAS.receiveShadow = false; // can shadows be cast on the Canvas? (ensure RENDERER shadows are enabled)
	scene.add(CANVAS);

	// create an ambient light source
	const godlight = new THREE.AmbientLight(0xffffff);
	scene.add(godlight);

	// set camera position (x,y,z) in scene
	controls.target.set(0, 0, 0);
	camera.position.set(0, 0, 1);
	controls.update();

	// calculate the visible height and width of the camera
	var vFOV = THREE.MathUtils.degToRad( camera.fov ); // convert vertical fov to radians
	var vheight = 2 * Math.tan( vFOV / 2 ) * camera.position.z; // visible height
	var vwidth = vheight * camera.aspect; // visible width


	// ADD HELPERS to show grid and coordinate system
	const axesHelper = new THREE.AxesHelper(5);
	// scene.add(axesHelper);
	const gridHelper = new THREE.GridHelper(1000, 1000, "rgb(255, 0, 0)", "rgb(200, 200, 200)");
	gridHelper.rotation.x = Math.PI/2; // rotate gride to be on Y-axis
	// scene.add(gridHelper);
	const boxGeometry = new THREE.BoxGeometry();
	const boxMaterial = new THREE.MeshStandardMaterial({color: 0x00FF00})
	const box = new THREE.Mesh(boxGeometry, boxMaterial);
	// scene.add(box);


	// ADD industries logo
	const mapIND = new THREE.TextureLoader().load(logoIND);
	const matrIND = new THREE.SpriteMaterial( { map: mapIND, color: 0xffffff } );
	const spriteIND = new THREE.Sprite( matrIND );

	// ADD overwave video
	animOVERWAVE.loop = true;
	animOVERWAVE.muted = true;
	animOVERWAVE.play();

	let textureOVWE = new THREE.VideoTexture(animOVERWAVE);
	textureOVWE.format = THREE.RGBAFormat;
	textureOVWE.minFilter = THREE.NearestFilter;
	textureOVWE.maxFilter = THREE.NearestFilter;
	textureOVWE.generateMipmaps = true;

	var vmatrOVWE = new THREE.MeshBasicMaterial( { map: textureOVWE, color: 0xffffff } );
	const meshOVERWAVE = new THREE.Mesh(new THREE.PlaneGeometry(), vmatrOVWE );

	//SET scales of the logos based on screen size
	if (vwidth > vheight) { //DESKTOP - view is in landscape orientation
		meshOVERWAVE.scale.set(vwidth, vheight / meshOVERWAVE.scale.y);

		let spriteIND_yPos = vheight/3; // a third of the initial screen height
		spriteIND.position.set(0,-spriteIND_yPos,0);
		spriteIND.scale.set(vFOV*0.5, vFOV*0.5);

	} else { // MOBILE - view is in 1:1 or portrait orientation
		meshOVERWAVE.scale.setX(vwidth); //using default Y scale

		let spriteIND_yPos = vheight/5; // a quarter of the initial screen height
		spriteIND.position.set(0,-spriteIND_yPos,0);
		spriteIND.scale.set(vFOV*0.3, vFOV*0.3);
	}

	//ADD logo sprites to the scene
	scene.add( spriteIND );
	scene.add( meshOVERWAVE );

	// ADD manny
	const texture_Mannypeace = new THREE.TextureLoader().load(import_Mannypeace);
	// texture_Mannypeace.anisotropy = RENDERER.capabilities.getMaxAnisotropy();       
	// texture_Mannypeace.minFilter = texture_Mannypeace.magFilter = THREE.LinearFilter;
	// texture_Mannypeace.minFilter = texture_Mannypeace.magFilter = THREE.NearestFilter;

	const matr_Mannypeace = new THREE.SpriteMaterial({ map: texture_Mannypeace, color: 0xffffff });
	const sprite_Mannypeace = new THREE.Sprite( matr_Mannypeace );

	sprite_Mannypeace.name = 'Mannypeace';
	sprite_Mannypeace.scale.set(2,2);
	sprite_Mannypeace.position.set(0,-3,0);
	// scene.add( sprite_Mannypeace );




	// INIT "Home" button
	var buttonsLIST = document.getElementsByTagName("button");
	for (let i = 0; i < buttonsLIST.length; i++) {
		buttonsLIST[i].addEventListener('click', onButtonClick, false);
	};

	// Mouse Raycasting
	// const mousepointer = new THREE.Vector2();
	// const raycaster = new THREE.Raycaster();

	// window.addEventListener('mousemove', onMouseMove);

	window.addEventListener( 'resize', onWindowResize );

	document.addEventListener( 'keydown', onKeyPress);
	document.addEventListener( 'wheel', onScroll);

	// SET ANIMATION LOOP
	RENDERER.setAnimationLoop(ANIMATE);
}

// ANIMATE SCENE - RENDER EVERY FRAME
function ANIMATE(time) {
    

    // box.rotation.x += time / 1000;

    


    // FINAL: render the scene
	// controls.update(); //**required if controls.enableDamping or controls.autoRotate are set to true
	RENDERER.render( scene, camera );
	TWEEN.update(time);
}

function onButtonClick(event) {
	// WITHOUT TWEENING:
	// camera.position.set(0, 0, 1);
	// controls.target.set(0,0,0);
	// controls.update();

	// WITH TWEENING
	var coords = { x: camera.position.x, y: camera.position.y, z: camera.position.z };

	new TWEEN.Tween(coords)
      .to({ x: coord_HOME.x, y: coord_HOME.y, z: coord_HOME.z })
      .onUpdate(() => {
		
		camera.position.set(coords.x, coords.y, coords.z);
		controls.target.set(0,0,0);
		
	  })
      .start();

	  controls.update();
	  
}

function onKeyPress(e) {

	if (e.ctrlKey) {

		if (scrollLOCK) { //if scrollLOCK is currently ON
			alert("LOCK OFF");
			scrollLOCK = false;
			controls.enableZoom = true;
			controls.update();
		} else {
			alert("LOCK ON");
			scrollLOCK = true;
			controls.enableZoom = false;
			controls.update();
		}
		
	}
}

function onScroll(e) {
	if (scrollLOCK) {
		camera.position.add((0, e.deltaY * -0.01, 0));
	}
}

function onMouseMove(e) {
	// mousepointer.x = (e.clientX / this.window.innerWidth) * 2 - 1;
	// mousepointer.y = - (e.clientY / this.window.innerWidth) * 2 + 1;

	// raycaster.setFromCamera( mousepointer, camera );
	
	// const intersects = raycaster.intersectObjects(scene.children);
	// // console.log(intersects);

	// for (let i=0; i < intersects.length; i++) {
	// 	let currentOBJ = intersects[i].object;
	// 	// if (currentOBJ.name === "Mannypeace") {
	// 	// 	currentOBJ.material.color.set(0x000000);}
	// }
}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	RENDERER.setSize( window.innerWidth, window.innerHeight );

}


// WEBSITE START - OVERWAVE INTRO VIDEO
function WebsiteStart() {
	console.log("WebsiteStart entered");
	// START Three.js after intro OVERWAVE splash
	var introvideo = document.getElementById('introvideo');
	console.log("getting introvideo element", introvideo);
	
	introvideo.onended = function(e) {
		console.log("startThree FIRED");
		// What you want to do after the event
		document.getElementById('introvideo').style.display = "none";
		console.log("video HIDDEN");
		ThreeStart();
	}
}
WebsiteStart();