"use client";

import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import styles from "./Slider.module.scss";

interface Slide {
  logo: string;
  logoLink?: string;
  description: string;
}

const Slider = ({ slides }: { slides: Slide[] }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: false, align: "start" },
    [Autoplay({ delay: 5000 })]
  );

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (emblaApi) {
      const checkButtons = () => {
        setCanScrollPrev(emblaApi.canScrollPrev());
        setCanScrollNext(emblaApi.canScrollNext());
      };

      checkButtons();
      emblaApi.on("select", checkButtons);
      emblaApi.on("reInit", checkButtons);
    }
  }, [emblaApi]);

  return (
    <div className={styles.sliderWrapper}>
      <div className={styles.sliderContainer} ref={emblaRef}>
        <div className={styles.emblaContainer}>
          {slides.map((slide, index) => (
            <div key={index} className={styles.emblaSlide}>
              <div className={styles.logoContainer}>
                {slide.logoLink ? (
                  <a href={slide.logoLink} target="_blank" rel="noopener noreferrer">
                    <Image src={slide.logo} alt="Logo" width={200} height={80} className={styles.logo} />
                  </a>
                ) : (
                  <Image src={slide.logo} alt="Logo" width={200} height={80} className={styles.logo} />
                )}
              </div>
              <div className={styles.descriptionContainer}>
                <p>{slide.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Circular Navigation Buttons Below the Slider */}
      <div className={styles.navButtons}>
        <button
          className={`${styles.navButton} ${!canScrollPrev ? styles.disabled : ""}`}
          onClick={() => emblaApi && emblaApi.scrollPrev()}
          disabled={!canScrollPrev}
        >
          ←
        </button>

        <button
          className={`${styles.navButton} ${!canScrollNext ? styles.disabled : ""}`}
          onClick={() => emblaApi && emblaApi.scrollNext()}
          disabled={!canScrollNext}
        >
          →
        </button>
      </div>
    </div>
  );
};

export default Slider;
