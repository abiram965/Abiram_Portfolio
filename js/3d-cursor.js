/**
 * 3D Cursor Following Effects
 * Creates an interactive cursor that follows mouse movement
 */

class ThreeDCursor {
    constructor() {
        this.cursor = null;
        this.cursorFollower = null;
        this.mouse = { x: 0, y: 0 };
        this.currentPos = { x: 0, y: 0 };
        this.followerPos = { x: 0, y: 0 };
        
        this.init();
        this.addEventListeners();
        this.animate();
    }

    init() {
        // Create cursor elements
        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';
        this.cursor.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: linear-gradient(45deg, #6244C5, #FFC448);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: difference;
            transition: transform 0.1s ease;
        `;

        this.cursorFollower = document.createElement('div');
        this.cursorFollower.className = 'cursor-follower';
        this.cursorFollower.style.cssText = `
            position: fixed;
            width: 40px;
            height: 40px;
            border: 2px solid rgba(98, 68, 197, 0.3);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            transition: all 0.3s ease;
        `;

        document.body.appendChild(this.cursor);
        document.body.appendChild(this.cursorFollower);

        // Hide default cursor
        document.body.style.cursor = 'none';
    }

    animate() {
        // Smooth cursor movement
        this.currentPos.x += (this.mouse.x - this.currentPos.x) * 0.2;
        this.currentPos.y += (this.mouse.y - this.currentPos.y) * 0.2;

        this.followerPos.x += (this.mouse.x - this.followerPos.x) * 0.1;
        this.followerPos.y += (this.mouse.y - this.followerPos.y) * 0.1;

        // Update cursor positions
        this.cursor.style.transform = `translate(${this.currentPos.x - 5}px, ${this.currentPos.y - 5}px)`;
        this.cursorFollower.style.transform = `translate(${this.followerPos.x - 20}px, ${this.followerPos.y - 20}px)`;

        requestAnimationFrame(() => this.animate());
    }

    addEventListeners() {
        // Mouse movement
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        // Hover effects for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .btn, [data-hover]');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.cursor.style.transform += ' scale(2)';
                this.cursorFollower.style.transform += ' scale(1.5)';
                this.cursorFollower.style.borderColor = 'rgba(255, 196, 72, 0.6)';
            });

            element.addEventListener('mouseleave', () => {
                this.cursor.style.transform = this.cursor.style.transform.replace(' scale(2)', '');
                this.cursorFollower.style.transform = this.cursorFollower.style.transform.replace(' scale(1.5)', '');
                this.cursorFollower.style.borderColor = 'rgba(98, 68, 197, 0.3)';
            });
        });

        // Click effect
        document.addEventListener('mousedown', () => {
            this.cursor.style.transform += ' scale(0.8)';
            this.cursorFollower.style.transform += ' scale(0.9)';
        });

        document.addEventListener('mouseup', () => {
            this.cursor.style.transform = this.cursor.style.transform.replace(' scale(0.8)', '');
            this.cursorFollower.style.transform = this.cursorFollower.style.transform.replace(' scale(0.9)', '');
        });

        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => {
            this.cursor.style.opacity = '0';
            this.cursorFollower.style.opacity = '0';
        });

        document.addEventListener('mouseenter', () => {
            this.cursor.style.opacity = '1';
            this.cursorFollower.style.opacity = '1';
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize on desktop devices
    if (window.innerWidth > 768) {
        new ThreeDCursor();
    }
});