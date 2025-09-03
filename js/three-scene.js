// Three.js Scene Setup for 3D Portfolio
class ThreeScene {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.particles = null;
        this.geometricShapes = [];
        this.mouse = { x: 0, y: 0 };
        this.windowHalf = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        
        this.init();
        this.createParticles();
        this.createGeometricShapes();
        this.setupEventListeners();
        this.animate();
    }
    
    init() {
        // Create scene
        this.scene = new THREE.Scene();
        
        // Create camera
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.z = 5;
        
        // Create renderer
        this.renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
        // Add to DOM
        const container = document.getElementById('three-container');
        if (container) {
            container.appendChild(this.renderer.domElement);
        }
    }
    
    createParticles() {
        const particleCount = 1000;
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);
        
        const color = new THREE.Color();
        
        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            
            // Positions
            positions[i3] = (Math.random() - 0.5) * 20;
            positions[i3 + 1] = (Math.random() - 0.5) * 20;
            positions[i3 + 2] = (Math.random() - 0.5) * 20;
            
            // Colors (purple to blue gradient)
            color.setHSL(0.7 + Math.random() * 0.1, 0.8, 0.5 + Math.random() * 0.3);
            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;
            
            // Sizes
            sizes[i] = Math.random() * 2 + 0.5;
        }
        
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        
        const material = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                mouse: { value: new THREE.Vector2() }
            },
            vertexShader: `
                attribute float size;
                attribute vec3 color;
                varying vec3 vColor;
                uniform float time;
                uniform vec2 mouse;
                
                void main() {
                    vColor = color;
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    
                    // Add wave motion
                    mvPosition.x += sin(time * 0.5 + position.y * 0.1) * 0.1;
                    mvPosition.y += cos(time * 0.3 + position.x * 0.1) * 0.1;
                    
                    // Mouse interaction
                    vec2 mouseEffect = mouse * 0.0001;
                    mvPosition.xy += mouseEffect;
                    
                    gl_PointSize = size * (300.0 / -mvPosition.z);
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                varying vec3 vColor;
                
                void main() {
                    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
                    float alpha = 1.0 - smoothstep(0.0, 0.5, distanceToCenter);
                    gl_FragColor = vec4(vColor, alpha * 0.8);
                }
            `,
            transparent: true,
            vertexColors: true,
            blending: THREE.AdditiveBlending
        });
        
        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }
    
    createGeometricShapes() {
        // Create floating geometric shapes
        const shapes = [
            new THREE.TetrahedronGeometry(0.5),
            new THREE.OctahedronGeometry(0.4),
            new THREE.IcosahedronGeometry(0.3),
            new THREE.DodecahedronGeometry(0.3)
        ];
        
        for (let i = 0; i < 8; i++) {
            const geometry = shapes[Math.floor(Math.random() * shapes.length)];
            const material = new THREE.MeshBasicMaterial({
                color: new THREE.Color().setHSL(0.7 + Math.random() * 0.1, 0.8, 0.6),
                wireframe: true,
                transparent: true,
                opacity: 0.3
            });
            
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 5
            );
            mesh.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            );
            
            // Store initial position and rotation for animation
            mesh.userData = {
                initialPosition: mesh.position.clone(),
                rotationSpeed: {
                    x: (Math.random() - 0.5) * 0.02,
                    y: (Math.random() - 0.5) * 0.02,
                    z: (Math.random() - 0.5) * 0.02
                }
            };
            
            this.geometricShapes.push(mesh);
            this.scene.add(mesh);
        }
    }
    
    setupEventListeners() {
        // Mouse movement
        document.addEventListener('mousemove', (event) => {
            this.mouse.x = (event.clientX - this.windowHalf.x) * 0.001;
            this.mouse.y = (event.clientY - this.windowHalf.y) * 0.001;
        });
        
        // Window resize
        window.addEventListener('resize', () => {
            this.windowHalf.x = window.innerWidth / 2;
            this.windowHalf.y = window.innerHeight / 2;
            
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
        
        // Scroll interaction
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const scrollPercent = scrollY / (document.body.scrollHeight - window.innerHeight);
            
            // Move camera based on scroll
            this.camera.position.y = scrollPercent * 2;
            this.camera.rotation.x = scrollPercent * 0.1;
        });
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        const time = Date.now() * 0.001;
        
        // Update particles
        if (this.particles && this.particles.material.uniforms) {
            this.particles.material.uniforms.time.value = time;
            this.particles.material.uniforms.mouse.value.set(this.mouse.x, this.mouse.y);
            this.particles.rotation.y += 0.001;
        }
        
        // Update geometric shapes
        this.geometricShapes.forEach(shape => {
            shape.rotation.x += shape.userData.rotationSpeed.x;
            shape.rotation.y += shape.userData.rotationSpeed.y;
            shape.rotation.z += shape.userData.rotationSpeed.z;
            
            // Float animation
            shape.position.y = shape.userData.initialPosition.y + Math.sin(time + shape.position.x) * 0.2;
            shape.position.x = shape.userData.initialPosition.x + Math.cos(time + shape.position.z) * 0.1;
        });
        
        // Camera movement based on mouse
        this.camera.position.x += (this.mouse.x - this.camera.position.x) * 0.05;
        this.camera.position.y += (-this.mouse.y - this.camera.position.y) * 0.05;
        this.camera.lookAt(this.scene.position);
        
        this.renderer.render(this.scene, this.camera);
    }
    
    destroy() {
        if (this.renderer) {
            this.renderer.dispose();
            const container = document.getElementById('three-container');
            if (container && this.renderer.domElement) {
                container.removeChild(this.renderer.domElement);
            }
        }
    }
}

// Initialize Three.js scene when DOM is loaded
let threeScene;

function initThreeScene() {
    // Create container for Three.js canvas
    const container = document.createElement('div');
    container.id = 'three-container';
    document.body.appendChild(container);
    
    // Initialize scene
    threeScene = new ThreeScene();
}

// Clean up on page unload
window.addEventListener('beforeunload', () => {
    if (threeScene) {
        threeScene.destroy();
    }
});