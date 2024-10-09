import React, { useEffect, useRef } from "react";
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { getImageUrl } from "../../utils";
import styles from "./Hero.module.css";

export const Hero = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const particles = [];
    const particleCount = 100;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
      });
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(32, 201, 151, 0.5)';

      particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();

        particle.x += particle.dx;
        particle.y += particle.dy;

        if (particle.x < 0 || particle.x > canvas.width) particle.dx = -particle.dx;
        if (particle.y < 0 || particle.y > canvas.height) particle.dy = -particle.dy;
      });

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    drawParticles();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section id="hero" className={styles.container}> {/* Added id="hero" */}
      <canvas ref={canvasRef} className={styles.backgroundCanvas} />
      <div className={styles.content}>
        <h1 className={styles.title}>Hey, I'm Vineeth</h1>
        <p className={styles.description}>
          Passionate 3rd-year Computer Science student skilled in software development, problem-solving, and exploring cutting-edge technologies.
        </p>

        <div className={styles.socialIcons}>
          <a href="https://x.com/Vineeth0101" target="_blank" rel="noopener noreferrer">
            <FaTwitter className={styles.icon} />
          </a>
          <a href="https://instagram.com/_vineethsai_" target="_blank" rel="noopener noreferrer">
            <FaInstagram className={styles.icon} />
          </a>
          <a href="https://www.linkedin.com/in/vineeth-ummadisetty-4933511a6/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className={styles.icon} />
          </a>
          <a href="https://github.com/vineeth33" target="_blank" rel="noopener noreferrer">
            <FaGithub className={styles.icon} />
          </a>
        </div>

        <div className={styles.buttons}>
          <a href="mailto:vinnu593358@gmail.com" className={styles.contactBtn}>Contact Me</a>
          <a href="/vineeth-resume.pdf" download className={styles.downloadCVBtn}>Download CV</a>
        </div>
      </div>
      
      <img src={getImageUrl("hero/picc.png")} alt="Hero image" className={styles.heroImg} />
    </section>
  );
};
