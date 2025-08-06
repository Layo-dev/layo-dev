import React, { useEffect, useRef } from 'react';

interface SquaresProps {
  speed?: number;
  squareSize?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'diagonal';
  borderColor?: string;
  hoverFillColor?: string;
  className?: string;
}

const Squares: React.FC<SquaresProps> = ({
  speed = 0.5,
  squareSize = 40,
  direction = 'diagonal',
  borderColor = '#fff',
  hoverFillColor = '#222',
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Square class
    class Square {
      x: number;
      y: number;
      size: number;
      dx: number;
      dy: number;
      opacity: number;
      hovered: boolean;

      constructor() {
        this.size = squareSize;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.hovered = false;

        // Set direction based on prop
        switch (direction) {
          case 'up':
            this.dx = 0;
            this.dy = -speed;
            break;
          case 'down':
            this.dx = 0;
            this.dy = speed;
            break;
          case 'left':
            this.dx = -speed;
            this.dy = 0;
            break;
          case 'right':
            this.dx = speed;
            this.dy = 0;
            break;
          case 'diagonal':
          default:
            this.dx = speed;
            this.dy = speed;
            break;
        }
      }

      update() {
        this.x += this.dx;
        this.y += this.dy;

        // Wrap around screen
        if (this.x > canvas.width + this.size) this.x = -this.size;
        if (this.x < -this.size) this.x = canvas.width + this.size;
        if (this.y > canvas.height + this.size) this.y = -this.size;
        if (this.y < -this.size) this.y = canvas.height + this.size;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        
        // Draw border
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = 1;
        ctx.strokeRect(this.x, this.y, this.size, this.size);

        // Fill if hovered
        if (this.hovered) {
          ctx.fillStyle = hoverFillColor;
          ctx.fillRect(this.x, this.y, this.size, this.size);
        }

        ctx.restore();
      }

      checkHover(mouseX: number, mouseY: number) {
        this.hovered = 
          mouseX >= this.x && 
          mouseX <= this.x + this.size && 
          mouseY >= this.y && 
          mouseY <= this.y + this.size;
      }
    }

    // Create squares
    const squares: Square[] = [];
    const numSquares = Math.floor((canvas.width * canvas.height) / (squareSize * squareSize * 4));

    for (let i = 0; i < numSquares; i++) {
      squares.push(new Square());
    }

    // Mouse tracking
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      squares.forEach(square => {
        square.update();
        square.checkHover(mouseX, mouseY);
        square.draw();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [speed, squareSize, direction, borderColor, hoverFillColor]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
    />
  );
};

export default Squares;
