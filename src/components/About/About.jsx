import React from "react";
import { FaCode, FaMobileAlt, FaServer } from 'react-icons/fa';
import styles from "./About.module.css";

export const About = () => {
  return (
    <section className={styles.container} id="about">
      <div className={styles.content}>
        <div className={styles.aboutInfo}>
          <h2 className={styles.title}>About Me</h2>
          <p className={styles.description}>
            I'm a passionate Computer Science student with a keen interest in software development, 
            problem-solving, and exploring cutting-edge technologies. My journey in tech has equipped 
            me with a diverse skill set, allowing me to tackle complex challenges and create innovative solutions.
          </p>
        </div>
        <div className={styles.skills}>
          <div className={styles.skillItem}>
            <div className={styles.skillIcon}>
              <FaServer />
            </div>
            <div className={styles.skillText}>
              <h3>Backend Developer</h3>
              <p>Experienced in building secure and efficient server-side applications with databases.</p>
            </div>
          </div>
          <div className={styles.skillItem}>
            <div className={styles.skillIcon}>
              <FaMobileAlt />
            </div>
            <div className={styles.skillText}>
              <h3>Mobile App Developer</h3>
              <p>Expertise in creating intuitive, data-driven mobile apps with Flutter.</p>
            </div>
          </div>
          <div className={styles.skillItem}>
            <div className={styles.skillIcon}>
              <FaCode />
            </div>
            <div className={styles.skillText}>
              <h3>Software Engineer</h3>
              <p>Proficient in software design, development, and optimization across multiple languages.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};