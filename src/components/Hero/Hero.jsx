import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { useEffect, useRef } from "react";
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { getImageUrl } from "../../utils";
import styles from "./Hero.module.css";

// Register GSAP plugins
gsap.registerPlugin(TextPlugin);

export const Hero = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const socialIconsRef = useRef(null);
  const buttonsRef = useRef(null);
  const heroImgRef = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    // Canvas particle animation
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
    const particleCount = 120;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        dx: (Math.random() - 0.5) * 0.8,
        dy: (Math.random() - 0.5) * 0.8,
        opacity: Math.random() * 0.5 + 0.2,
        pulse: Math.random() * 0.02 + 0.01,
      });
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        // Pulsing effect
        particle.opacity += particle.pulse;
        if (particle.opacity >= 0.7 || particle.opacity <= 0.1) {
          particle.pulse = -particle.pulse;
        }

        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = '#20c997';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby particles
        particles.forEach((otherParticle) => {
          const distance = Math.sqrt(
            Math.pow(particle.x - otherParticle.x, 2) + Math.pow(particle.y - otherParticle.y, 2)
          );
          if (distance < 100) {
            ctx.globalAlpha = (100 - distance) / 100 * 0.1;
            ctx.strokeStyle = '#20c997';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });

        particle.x += particle.dx;
        particle.y += particle.dy;

        if (particle.x < 0 || particle.x > canvas.width) particle.dx = -particle.dx;
        if (particle.y < 0 || particle.y > canvas.height) particle.dy = -particle.dy;
      });

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    drawParticles();

    // GSAP Animations
    const tl = gsap.timeline();

    // Set initial states
    gsap.set([titleRef.current, descriptionRef.current, socialIconsRef.current, buttonsRef.current], {
      opacity: 0,
      y: 100
    });
    gsap.set(heroImgRef.current, { opacity: 0, scale: 0.5, rotation: 15 });
    gsap.set(cursorRef.current, { opacity: 0 });

    // Main entrance animation
    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power3.out"
    })
    .to(titleRef.current, {
      backgroundImage: "linear-gradient(45deg, #ffffff, #20c997, #17a589, #ffffff)",
      backgroundSize: "300% 300%",
      duration: 0.1,
      ease: "none"
    }, "-=0.5")
    .to(descriptionRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out"
    }, "-=0.8")
    .to(socialIconsRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "back.out(1.7)"
    }, "-=0.6")
    .to(buttonsRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.4")
    .to(heroImgRef.current, {
      opacity: 1,
      scale: 1,
      rotation: 0,
      duration: 1.2,
      ease: "elastic.out(1, 0.8)"
    }, "-=1");

    // Typewriter effect for title
    setTimeout(() => {
      gsap.to(titleRef.current, {
        text: "Hey, I'm Vineeth",
        duration: 2,
        ease: "none",
        delay: 0.5
      });
    }, 1000);

    // Continuous animations
    gsap.to(titleRef.current, {
      backgroundPosition: "300% 0",
      duration: 4,
      ease: "none",
      repeat: -1,
      delay: 2
    });

    gsap.to(heroImgRef.current, {
      y: -20,
      duration: 3,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1
    });

    // Social icons individual animations
    const socialIcons = socialIconsRef.current.children;
    Array.from(socialIcons).forEach((icon, index) => {
      gsap.to(icon, {
        y: -10,
        duration: 2 + index * 0.2,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
        delay: index * 0.3
      });

      // Enhanced hover effect
      icon.addEventListener('mouseenter', () => {
        gsap.to(icon, {
          scale: 1.2,
          rotation: 15,
          textShadow: "0 0 20px #20c997",
          duration: 0.3,
          ease: "back.out(1.7)"
        });
      });

      icon.addEventListener('mouseleave', () => {
        gsap.to(icon, {
          scale: 1,
          rotation: 0,
          textShadow: "none",
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });

    // Button hover animations
    const buttons = buttonsRef.current.children;
    Array.from(buttons).forEach((button) => {
      button.addEventListener('mouseenter', () => {
        gsap.to(button, {
          scale: 1.1,
          boxShadow: "0 10px 30px rgba(32, 201, 151, 0.4)",
          duration: 0.3,
          ease: "power2.out"
        });
      });

      button.addEventListener('mouseleave', () => {
        gsap.to(button, {
          scale: 1,
          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });

    // Custom cursor effect
    const moveCursor = (e) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "none"
      });
    };

    document.addEventListener('mousemove', moveCursor);

    gsap.to(cursorRef.current, {
      opacity: 1,
      duration: 0.5,
      delay: 2
    });

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  return (
    <section id="hero" className={styles.container} ref={containerRef}>
      <canvas ref={canvasRef} className={styles.backgroundCanvas} />
      
      {/* Custom Cursor */}
      <div ref={cursorRef} className={styles.customCursor}></div>
      
      <div className={styles.content}>
        <h1 className={styles.title} ref={titleRef}>
          {/* Text will be animated via GSAP */}
        </h1>
        
        <p className={styles.description} ref={descriptionRef}>
          Passionate Computer Science student skilled in software development, problem-solving, and exploring cutting-edge technologies.
        </p>

        <div className={styles.socialIcons} ref={socialIconsRef}>
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

        <div className={styles.buttons} ref={buttonsRef}>
          <a href="mailto:vinnu593358@gmail.com" className={styles.contactBtn}>
            <span>Contact Me</span>
            <div className={styles.buttonEffect}></div>
          </a>
          <a href="/vineeth-resume.pdf" download className={styles.downloadCVBtn}>
            <span>Download CV</span>
            <div className={styles.buttonEffect}></div>
          </a>
        </div>
      </div>

      <img 
        src={getImageUrl("hero/picc.png")} 
        alt="Hero image" 
        className={styles.heroImg} 
        ref={heroImgRef}
      />
    </section>
  );
};