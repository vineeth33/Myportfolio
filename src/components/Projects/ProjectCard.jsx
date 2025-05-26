import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";
import { getImageUrl } from "../../utils";
import styles from "./ProjectCard.module.css";

export const ProjectCard = ({
  project: { title, imageSrc, description, skills, demo, source },
}) => {
  const cardRef = useRef();
  const tl = useRef();

  useGSAP(() => {
    const [img, h3, p, ul, links] = cardRef.current.children;

    gsap.set(cardRef.current, { transformPerspective: 1000 });

    tl.current = gsap.timeline({
      defaults: { ease: "power3.out", duration: 0.8 },
    });

    tl.current
      .from(cardRef.current, {
        opacity: 0,
        rotateX: -10,
        y: 50,
        duration: 1,
      })
      .from(img, {
        scale: 0.9,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      }, "-=0.6")
      .from([h3, p], {
        x: -30,
        opacity: 0,
        stagger: 0.15,
      }, "-=0.6")
      .from(ul.children, {
        y: 20,
        opacity: 0,
        stagger: 0.1,
      }, "-=0.5")
      .from(links.children[0], {
        x: -50,
        opacity: 0,
      }, "-=0.4")
      .from(links.children[1], {
        x: 50,
        opacity: 0,
      }, "-=0.5");
  }, []);

  return (
    <div className={styles.container} ref={cardRef}>
      <img
        src={getImageUrl(imageSrc)}
        alt={`Image of ${title}`}
        className={styles.image}
      />
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <ul className={styles.skills}>
        {skills.map((skill, id) => (
          <li key={id} className={styles.skill}>
            {skill}
          </li>
        ))}
      </ul>
      <div className={styles.links}>
        <a href={demo} className={styles.link} target="_blank" rel="noreferrer">
          Demo
        </a>
        <a href={source} className={styles.link} target="_blank" rel="noreferrer">
          Source
        </a>
      </div>
    </div>
  );
};
