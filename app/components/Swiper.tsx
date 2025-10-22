"use client";
import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";

gsap.registerPlugin(Observer);

interface InfiniteScrollItem {
  content: React.ReactNode;
}

interface InfiniteScrollProps {
  width?: string;
  maxHeight?: string;
  negativeMargin?: string;
  items?: InfiniteScrollItem[];
  itemMinWidth?: number;
  isTilted?: boolean;
  autoplay?: boolean;
  autoplaySpeed?: number;
  autoplayDirection?: "left" | "right";
  pauseOnHover?: boolean;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  width = "30rem",
  maxHeight = "100%",
  negativeMargin = "-0.5em",
  items = [],
  itemMinWidth = 150,
  isTilted = false,
  autoplay = false,
  autoplaySpeed = 0.5,
  autoplayDirection = "left",
  pauseOnHover = false,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [responsiveItemWidth, setResponsiveItemWidth] = useState(itemMinWidth);
  const [responsiveSpeed, setResponsiveSpeed] = useState(autoplaySpeed);

  const getTiltTransform = (): string => "none";

  // Ajuster les valeurs selon la taille de l'écran
  useEffect(() => {
    const updateResponsiveValues = () => {
      const screenWidth = window.innerWidth;

      // Ajuster la largeur des items
      if (screenWidth < 640) {
        // Mobile
        setResponsiveItemWidth(itemMinWidth * 0.6); // 60% de la taille
        setResponsiveSpeed(autoplaySpeed * 0.7); // Vitesse réduite
      } else if (screenWidth < 1024) {
        // Tablette
        setResponsiveItemWidth(itemMinWidth * 0.8); // 80% de la taille
        setResponsiveSpeed(autoplaySpeed * 0.85); // Vitesse moyenne
      } else {
        // Desktop
        setResponsiveItemWidth(itemMinWidth);
        setResponsiveSpeed(autoplaySpeed);
      }
    };

    updateResponsiveValues();
    window.addEventListener("resize", updateResponsiveValues);

    return () => {
      window.removeEventListener("resize", updateResponsiveValues);
    };
  }, [itemMinWidth, autoplaySpeed]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (items.length === 0) return;

    const divItems = gsap.utils.toArray<HTMLDivElement>(container.children);
    if (!divItems.length) return;

    const firstItem = divItems[0];
    const itemStyle = getComputedStyle(firstItem);
    const itemWidth = firstItem.offsetWidth;
    const itemMarginLeft = parseFloat(itemStyle.marginLeft) || 0;
    const totalItemWidth = itemWidth + itemMarginLeft;
    const totalWidth =
      itemWidth * items.length + itemMarginLeft * (items.length - 1);

    const wrapFn = gsap.utils.wrap(-totalWidth, totalWidth);

    divItems.forEach((child, i) => {
      const x = i * totalItemWidth;
      gsap.set(child, { x });
    });

    const observer = Observer.create({
      target: container,
      type: "wheel,touch,pointer",
      preventDefault: true,
      onPress: ({ target }) => {
        (target as HTMLElement).style.cursor = "grabbing";
      },
      onRelease: ({ target }) => {
        (target as HTMLElement).style.cursor = "grab";
      },
      onChange: ({ deltaX, isDragging, event }) => {
        const d = event.type === "wheel" ? -deltaX : deltaX;
        const distance = isDragging ? d * 5 : d * 10;
        divItems.forEach((child) => {
          gsap.to(child, {
            duration: 0.5,
            ease: "expo.out",
            x: `+=${distance}`,
            modifiers: {
              x: gsap.utils.unitize(wrapFn),
            },
          });
        });
      },
    });

    let rafId: number;
    if (autoplay) {
      const directionFactor = autoplayDirection === "right" ? 1 : -1;
      const speedPerFrame = responsiveSpeed * directionFactor;

      const tick = () => {
        divItems.forEach((child) => {
          gsap.set(child, {
            x: `+=${speedPerFrame}`,
            modifiers: {
              x: gsap.utils.unitize(wrapFn),
            },
          });
        });
        rafId = requestAnimationFrame(tick);
      };

      rafId = requestAnimationFrame(tick);

      if (pauseOnHover) {
        const stopTicker = () => rafId && cancelAnimationFrame(rafId);
        const startTicker = () => {
          rafId = requestAnimationFrame(tick);
        };

        container.addEventListener("mouseenter", stopTicker);
        container.addEventListener("mouseleave", startTicker);

        return () => {
          observer.kill();
          stopTicker();
          container.removeEventListener("mouseenter", stopTicker);
          container.removeEventListener("mouseleave", startTicker);
        };
      } else {
        return () => {
          observer.kill();
          rafId && cancelAnimationFrame(rafId);
        };
      }
    }

    return () => {
      observer.kill();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [
    items.length,
    autoplay,
    responsiveSpeed,
    autoplayDirection,
    pauseOnHover,
    negativeMargin,
  ]);

  return (
    <>
      <style>
        {`
          .infinite-scroll-wrapper {
            max-height: ${maxHeight};
            overflow: hidden;
          }

          .infinite-scroll-container {
            width: ${width};
            display: flex;
            flex-wrap: nowrap;
          }

          .infinite-scroll-item {
            min-width: ${responsiveItemWidth}px;
            margin-left: ${negativeMargin};
            flex-shrink: 0;
            font-size: 0.875rem; /* Base pour mobile */
          }

          /* Responsive font sizes */
          @media (min-width: 640px) {
            .infinite-scroll-item {
              font-size: 1rem;
            }
          }

          @media (min-width: 1024px) {
            .infinite-scroll-item {
              font-size: 1.125rem;
            }
          }
        `}
      </style>

      <div className="infinite-scroll-wrapper" ref={wrapperRef}>
        <div
          className="infinite-scroll-container"
          ref={containerRef}
          style={{
            transform: getTiltTransform(),
          }}
        >
          {items.map((item, i) => (
            <div className="infinite-scroll-item" key={i}>
              {item.content}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default InfiniteScroll;