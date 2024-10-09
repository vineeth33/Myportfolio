import React from "react";
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';
import styles from "./Contact.module.css";

export const Contact = () => {
  return (
    <footer id="contact" className={styles.container}>
      <div className={styles.content}>
        <div className={styles.text}>
          <h2>Contact</h2>
          <p>Feel free to reach out!</p>
        </div>
        <ul className={styles.links}>
          <li className={styles.link}>
            <FaEnvelope className={styles.icon} />
            <a href="mailto:vineeth2210369@ssn.edu.in">vineeth2210369@ssn.edu.in</a>
          </li>
          <li className={styles.link}>
            <FaLinkedin className={styles.icon} />
            <a href="https://www.linkedin.com/in/vineeth-ummadisetty-4933511a6/">linkedin.com/in/vineethu</a>
          </li>
          <li className={styles.link}>
            <FaGithub className={styles.icon} />
            <a href="https://github.com/vineeth33">github.com/vineeth33</a>
          </li>
        </ul>
        <div className={styles.copyright}>
          <p>© 2024 Vineeth Ummadisetty. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
