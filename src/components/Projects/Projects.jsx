import { useRef } from "react";
import projects from "../../data/projects.json";
import { ProjectCard } from "./ProjectCard";
import styles from "./Projects.module.css";

export const Projects = () => {
  const scrollRef = useRef();

  const scroll = (direction) => {
    const scrollAmount = 1000;
    if (direction === "left") {
      scrollRef.current.scrollLeft -= scrollAmount;
    } else {
      scrollRef.current.scrollLeft += scrollAmount;
    }
  };

  return (
    <section className={styles.container} id="projects">
      <h2 className={styles.title}>Projects</h2>
      <div className={styles.carousel} ref={scrollRef}>
        {projects.map((project, id) => (
          <div key={id} className={styles.cardWrapper}>
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
      <div className={styles.controls}>
        <button onClick={() => scroll("left")}>&larr;</button>
        <button onClick={() => scroll("right")}>&rarr;</button>
      </div>
    </section>
  );
};
