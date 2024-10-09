import React from "react";
import history from "../../data/history.json";
import skills from "../../data/skills.json";
import { getImageUrl } from "../../utils";
import styles from "./Experience.module.css";

export const Experience = () => {
  return (
    <section className={styles.container} id="experience">
      <div className={styles.content}>
        <h2 className={styles.title}>Experience</h2>
        <div className={styles.sections}>
          <div className={styles.skillsSection}>
            <h3 className={styles.sectionTitle}>Skills</h3>
            <div className={styles.skills}>
              {skills.map((skill, id) => (
                <div key={id} className={styles.skill}>
                  <div className={styles.skillImageContainer}>
                    <img src={getImageUrl(skill.imageSrc)} alt={skill.title} />
                  </div>
                  <p>{skill.title}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.historySection}>
            <h3 className={styles.sectionTitle}>Work History</h3>
            <ul className={styles.history}>
              {history.map((historyItem, id) => (
                <li key={id} className={styles.historyItem}>
                  <img
                    src={getImageUrl(historyItem.imageSrc)}
                    alt={`${historyItem.organisation} Logo`}
                    className={styles.historyItemImage}
                  />
                  <div className={styles.historyItemDetails}>
                    <h4>{historyItem.role}</h4>
                    <p className={styles.organisation}>{historyItem.organisation}</p>
                    <p className={styles.date}>{`${historyItem.startDate} - ${historyItem.endDate}`}</p>
                    <ul className={styles.experiences}>
                      {historyItem.experiences.map((experience, id) => (
                        <li key={id}>{experience}</li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};