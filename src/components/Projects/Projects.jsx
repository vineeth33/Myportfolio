import React, { useEffect, useRef, useState } from "react"
import projects from "../../data/projects.json"
import { ProjectCard } from "./ProjectCard"
import styles from "./Projects.module.css"

export const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const carouselRef = useRef(null)

  const visibleProjects = 3 // Number of visible projects on desktop
  const maxIndex = Math.max(0, projects.length - visibleProjects)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex <= 0 ? maxIndex : prevIndex - 1))
  }

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [currentIndex])

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 100) {
      nextSlide()
    }

    if (touchStart - touchEnd < -100) {
      prevSlide()
    }
  }

  return (
    <section className={styles.container} id="projects">
      <div className={styles.content}>
        <h2 className={styles.title}>Projects</h2>

        <div className={styles.carouselContainer}>
          <button
            className={`${styles.navButton} ${styles.prevButton}`}
            onClick={prevSlide}
            aria-label="Previous projects"
          >
            &#10094;
          </button>

          <div
            className={styles.carousel}
            ref={carouselRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className={styles.carouselTrack}
              style={{
                transform: `translateX(-${currentIndex * (100 / visibleProjects)}%)`,
                width: `${(projects.length / visibleProjects) * 100}%`,
              }}
            >
              {projects.map((project, id) => (
                <div key={id} className={styles.carouselItem} style={{ width: `${100 / projects.length}%` }}>
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </div>

          <button className={`${styles.navButton} ${styles.nextButton}`} onClick={nextSlide} aria-label="Next projects">
            &#10095;
          </button>
        </div>

        <div className={styles.indicators}>
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              className={`${styles.indicator} ${currentIndex === index ? styles.activeIndicator : ""}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to project set ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
