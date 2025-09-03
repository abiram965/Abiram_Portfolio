/**
 * 3D Background with Particle System
 * Creates an interactive particle background using Three.js
 */

class ThreeDBackground {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.particles = null;
        this.particleCount = 1000;
        this.mouse = { x: 0, y: 0 };
        this.windowHalf = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        
        this.init();
        this.animate();
        this.addEventListeners();
    }

    init() {
        // Create scene
        this.scene = new THREE.Scene();

        // Create camera
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            1,
            1000
        );
        this.camera.position.z = 400;

        // Create renderer
        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x000000, 0);
        
        // Add to DOM
        const container = document.createElement('div');
        container.id = 'three-background';
        container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            pointer-events: none;
        `;
        container.appendChild(this.renderer.domElement);
        document.body.appendChild(container);

        this.createParticles();
        this.createGeometry();
    }

    createParticles() {
        const geometry = new THREE.BufferGeometry();
        const positions = [];
        const colors = [];

        for (let i = 0; i < this.particleCount; i++) {
            positions.push(
                Math.random() * 2000 - 1000,
                Math.random() * 2000 - 1000,
                Math.random() * 2000 - 1000
            );

            // Color gradient from primary to secondary
            const color = new THREE.Color();
            color.setHSL(
                (Math.random() * 0.2) + 0.7, // Hue: purple to blue
                0.8,
                0.6
            );
            colors.push(color.r, color.g, color.b);
        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 2,
            transparent: true,
            opacity: 0.8,
            vertexColors: true,
            blending: THREE.AdditiveBlending
        });

        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }

    createGeometry() {
        // Add floating geometric shapes
        const geometries = [
            new THREE.TetrahedronGeometry(20, 0),
            new THREE.OctahedronGeometry(15, 0),
            new THREE.IcosahedronGeometry(18, 0)
        ];

        for (let i = 0; i < 5; i++) {
            const geometry = geometries[Math.floor(Math.random() * geometries.length)];
            const material = new THREE.MeshBasicMaterial({
                color: 0x6244C5,
                wireframe: true,
                transparent: true,
                opacity: 0.3
            });

            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(
                Math.random() * 400 - 200,
                Math.random() * 400 - 200,
                Math.random() * 400 - 200
            );
            mesh.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            );
            
            this.scene.add(mesh);
        }
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        // Rotate particles
        this.particles.rotation.x += 0.0005;
        this.particles.rotation.y += 0.001;

        // Mouse interaction
        this.camera.position.x += (this.mouse.x - this.camera.position.x) * 0.05;
        this.camera.position.y += (-this.mouse.y - this.camera.position.y) * 0.05;
        this.camera.lookAt(this.scene.position);

        // Animate geometric shapes
        this.scene.children.forEach((child, index) => {
            if (child.type === 'Mesh') {
                child.rotation.x += 0.01;
                child.rotation.y += 0.01;
                child.position.y += Math.sin(Date.now() * 0.001 + index) * 0.1;
            }
        });

        this.renderer.render(this.scene, this.camera);
    }

    addEventListeners() {
        // Mouse movement
        document.addEventListener('mousemove', (event) => {
            this.mouse.x = (event.clientX - this.windowHalf.x) * 0.1;
            this.mouse.y = (event.clientY - this.windowHalf.y) * 0.1;
        });

        // Window resize
        window.addEventListener('resize', () => {
            this.windowHalf.x = window.innerWidth / 2;
            this.windowHalf.y = window.innerHeight / 2;

            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThreeDBackground();
});