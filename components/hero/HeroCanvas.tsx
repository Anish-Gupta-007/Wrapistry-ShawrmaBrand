"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const TOTAL_FRAMES = 382;

interface HeroCanvasProps {
  onScrollProgress?: (progress: number) => void;
}

export const HeroCanvas: React.FC<HeroCanvasProps> = ({ onScrollProgress }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const [framesLoaded, setFramesLoaded] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Preload frames array
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const paddedIndex = String(i).padStart(3, "0");
      img.src = `/frames/hero/frame_${paddedIndex}.jpg`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === 1) {
          // Immediately render first frame as soon as frame 1 arrives
          renderFrame(0);
        }
        if (loadedCount === TOTAL_FRAMES) {
          setFramesLoaded(true);
        }
      };
      loadedImages.push(img);
    }
    imagesRef.current = loadedImages;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function renderFrame(index: number) {
      if (!canvas || !ctx) return;
      const img = imagesRef.current[index];
      if (!img || !img.complete) return;

      // Aspect ratio fit (cover mode)
      const width = canvas.width;
      const height = canvas.height;
      const imgWidth = img.naturalWidth || img.width;
      const imgHeight = img.naturalHeight || img.height;

      if (!imgWidth || !imgHeight) return;

      const imgAspect = imgWidth / imgHeight;
      const canvasAspect = width / height;

      let drawWidth = width;
      let drawHeight = height;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasAspect > imgAspect) {
        drawHeight = width / imgAspect;
        offsetY = (height - drawHeight) / 2;
      } else {
        drawWidth = height * imgAspect;
        offsetX = (width - drawWidth) / 2;
      }

      ctx.fillStyle = "#121212";
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    }

    const resizeCanvas = () => {
      if (!canvas || !canvas.parentElement) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width * (window.devicePixelRatio || 1);
      canvas.height = rect.height * (window.devicePixelRatio || 1);
      renderFrame(currentFrameRef.current);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // ScrollTrigger Pinned Frame scrub setup
    const frameObj = { frame: 0 };
    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "+=300%",
      pin: true,
      scrub: 0.4,
      onUpdate: (self) => {
        const targetFrame = Math.min(
          TOTAL_FRAMES - 1,
          Math.max(0, Math.floor(self.progress * (TOTAL_FRAMES - 1)))
        );
        currentFrameRef.current = targetFrame;
        renderFrame(targetFrame);
        if (onScrollProgress) {
          onScrollProgress(self.progress);
        }
      },
    });

    return () => {
      st.kill();
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [onScrollProgress]);

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-background">
      {/* Canvas container aligned right ~60% on desktop, full-width on mobile */}
      <div className="absolute top-0 right-0 w-full lg:w-[62%] h-full">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover transition-opacity duration-500"
        />
        {/* Subtle radial gradient overlay for seamless blending into #121212 */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_40%,#121212_95%)]" />
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent hidden lg:block pointer-events-none" />
      </div>
    </div>
  );
};
