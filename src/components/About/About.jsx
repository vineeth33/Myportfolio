import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { FaCode, FaMobileAlt, FaServer } from 'react-icons/fa';
import styles from "./About.module.css";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const skillItemsRef = useRef([]);
  const titleUnderlineRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const title = titleRef.current;
    const description = descriptionRef.current;
    const skillItems = skillItemsRef.current;
    const titleUnderline = titleUnderlineRef.current;

    // Set initial states
    gsap.set([title, description], { opacity: 0, y: 50 });
    gsap.set(skillItems, { opacity: 0, y: 80, scale: 0.8 });
    gsap.set(titleUnderline, { scaleX: 0 });

    // Create main timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    // Title animation with glowing effect
    tl.to(title, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out"
    })
    .to(title, {
      textShadow: "0 0 20px rgba(32, 201, 151, 0.6), 0 0 40px rgba(32, 201, 151, 0.4)",
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.5")
    .to(titleUnderline, {
      scaleX: 1,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.3")

    // Description animation
    .to(description, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.4")

    // Skill items staggered animation
    .to(skillItems, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      stagger: 0.2,
      ease: "back.out(1.7)"
    }, "-=0.2");

    // Individual skill item animations
    skillItems.forEach((item, index) => {
      if (item) {
        const icon = item.querySelector('.skill-icon');
        const text = item.querySelector('.skill-text');
        
        // Continuous floating animation for icons
        gsap.to(icon, {
          y: -8,
          duration: 2.5,
          ease: "power1.inOut",
          yoyo: true,
          repeat: -1,
          delay: index * 0.4
        });

        // Subtle glow pulse for icons
        gsap.to(icon, {
          textShadow: "0 0 15px rgba(32, 201, 151, 0.8), 0 0 25px rgba(32, 201, 151, 0.5)",
          duration: 3,
          ease: "power1.inOut",
          yoyo: true,
          repeat: -1,
          delay: index * 0.6
        });

        // Hover effects
        const hoverTl = gsap.timeline({ paused: true });
        hoverTl
          .to(item, {
            y: -15,
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(32, 201, 151, 0.2)",
            background: "rgba(32, 201, 151, 0.15)",
            duration: 0.3,
            ease: "power2.out"
          })
          .to(icon, {
            scale: 1.3,
            rotation: 10,
            textShadow: "0 0 25px rgba(32, 201, 151, 1), 0 0 35px rgba(32, 201, 151, 0.7)",
            duration: 0.4,
            ease: "back.out(1.7)"
          }, 0)
          .to(text, {
            x: 5,
            duration: 0.3,
            ease: "power2.out"
          }, 0);

        item.addEventListener('mouseenter', () => hoverTl.play());
        item.addEventListener('mouseleave', () => hoverTl.reverse());
      }
    });

    // Parallax effect for the entire section
    gsap.to(container, {
      y: -30,
      scrollTrigger: {
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      }
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !skillItemsRef.current.includes(el)) {
      skillItemsRef.current.push(el);
    }
  };

  return (
    <section className={styles.container} id="about" ref={containerRef}>
      <div className={styles.content}>
        <div className={styles.aboutInfo}>
          <h2 className={styles.title} ref={titleRef}>
            About Me
            <span className={styles.titleUnderline} ref={titleUnderlineRef}></span>
          </h2>
          <p className={styles.description} ref={descriptionRef}>
            I'm a passionate Computer Science student with a keen interest in software development,
            problem-solving, and exploring cutting-edge technologies. My journey in tech has equipped
            me with a diverse skill set, allowing me to tackle complex challenges and create innovative solutions.
          </p>
        </div>
        <div className={styles.skills}>
          <div className={styles.skillItem} ref={addToRefs}>
            <div className={`${styles.skillIcon} skill-icon`}>
              <FaServer />
            </div>
            <div className={`${styles.skillText} skill-text`}>
              <h3>Full Stack Developer</h3>
              <p>Experienced in building secure and efficient full-stack applications with integrated frontend and backend systems, including database management.</p>
            </div>
          </div>
          <div className={styles.skillItem} ref={addToRefs}>
            <div className={`${styles.skillIcon} skill-icon`}>
              <FaMobileAlt />
            </div>
            <div className={`${styles.skillText} skill-text`}>
              <h3>Mobile App Developer</h3>
              <p>Expertise in creating intuitive, data-driven mobile apps with Flutter.</p>
            </div>
          </div>
          <div className={styles.skillItem} ref={addToRefs}>
            <div className={`${styles.skillIcon} skill-icon`}>
              <FaCode />
            </div>
            <div className={`${styles.skillText} skill-text`}>
              <h3>Software Engineer</h3>
              <p>Proficient in software design, development, and optimization across multiple languages.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};