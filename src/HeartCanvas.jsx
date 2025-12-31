import { useRef, useEffect } from "react";

export default function HeartCanvas() {
  const canvasRef = useRef(null);
  let t = 0;

  const sparkles = Array.from({ length: 70 }, () => ({
    x: Math.random(),
    y: Math.random(),
    r: Math.random() * 1.4,
    s: Math.random() * 0.3 + 0.1
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    ctx.font = "12px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const heartX = a => 16 * Math.pow(Math.sin(a), 3);
    const heartY = a =>
      13 * Math.cos(a) -
      5 * Math.cos(2 * a) -
      2 * Math.cos(3 * a) -
      Math.cos(4 * a);

    const draw = () => {
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#ffb6c9";
      ctx.shadowColor = "#ff9bbf";
      ctx.shadowBlur = 28;

      const scale = 13 + Math.sin(t * 2) * 0.6;
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      for (let i = 0; i < 50; i++) {
        const a = (i / 50) * Math.PI * 2 + t;
        const x = heartX(a) * scale + cx;
        const y = -heartY(a) * scale + cy;
        ctx.fillText("i love you", x, y);
      }

      // sparkles
      ctx.shadowBlur = 0;
      sparkles.forEach(s => {
        s.y += s.s;
        if (s.y > 1) s.y = 0;
        ctx.beginPath();
        ctx.arc(
          s.x * canvas.width,
          s.y * canvas.height,
          s.r,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = "rgba(255,182,201,0.25)";
        ctx.fill();
      });

      t += 0.005;
      requestAnimationFrame(draw);
    };

    draw();
    return () => window.removeEventListener("resize", resize);
  }, []);

  return <canvas ref={canvasRef} />;
}
