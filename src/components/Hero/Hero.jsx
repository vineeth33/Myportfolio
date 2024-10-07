import React from "react";
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { getImageUrl } from "../../utils";
import styles from "./Hero.module.css";

export const Hero = () => {
  return (
    <section className={styles.container}>
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
      <div className={styles.topBlur} />
      <div className={styles.bottomBlur} />
    </section>
  );
};
