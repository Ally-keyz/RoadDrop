import { useRef, useState, useEffect,  } from 'react';
import type {ReactNode}  from 'react';
import { motion } from 'framer-motion';

interface ZoomOnScrollProps {
  children: ReactNode;
  zoomIntensity?: number;
  threshold?: number;
}

const ZoomOnScroll: React.FC<ZoomOnScrollProps> = ({ children, zoomIntensity = 0.1, threshold = 0.5 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [scale, setScale] = useState(0.9);
  const [opacity, setOpacity] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const visibleRatio = Math.min(1, Math.max(0, entry.intersectionRatio));
        const newScale = 0.9 + (visibleRatio * zoomIntensity);
        const newOpacity = 0.3 + (visibleRatio * 0.7);

        setScale(newScale);
        setOpacity(newOpacity);
        setIsVisible(visibleRatio > threshold);
      },
      {
        threshold: Array.from({ length: 100 }, (_, i) => i * 0.01),
        rootMargin: '-100px 0px -100px 0px'
      }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [zoomIntensity, threshold]);

  return (
    <motion.div
      ref={ref}
      className="w-full h-full"
      style={{
        scale,
        opacity,
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
      animate={{
        scale: isVisible ? 1 : scale,
        opacity: isVisible ? 1 : opacity
      }}
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 20,
        mass: 0.5
      }}
    >
      {children}
    </motion.div>
  );
};

export default ZoomOnScroll;
