import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import BottomNavbar from "./NavBar";
import { useState, useEffect, useRef } from "react";
import type { ReactElement } from "react";
import truck from "/truck.png";
import tracking from "/tracking.jpg"; 
import TopNav from "./components/topNav";
import ZoomOnScroll from "./components/ZoomScroll";


function Welcome(): ReactElement {
  const { scrollYProgress } = useScroll();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  // Scroll-based animations
  const [keyCycle, setKeyCycle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setKeyCycle(prev => prev + 1); // trigger re-mount
    }, 3000);
    return () => clearInterval(interval);
  }, []);

    // Scroll transforms
  const titleY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const subtitleY = useTransform(scrollYProgress, [0, 0.5], [0, -80]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);

  // Image rotation angles (each rotated 3 degrees from previous)
  const rotationAngles = [6, 6, -6, 6];
  
  // Images array
  const images = [
    { src: truck, alt: "Delivery truck" },
    { src: tracking, alt: "Tracking system" },
  ];

  // Auto-rotate images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 }
  }
} as const;

  const text = "RoadDrop";
  const letters = text.split("");

  const letterAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  } as const;

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  return (
    
    <div className="relative w-full h-screen overflow-hidden overflow-y-auto snap-y snap-mandatory">
      
      <div className="snap-start">
        <ZoomOnScroll>
      {/* Background image with parallax effect */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: 'url("/background.jpg")',
          scale: imageScale,
          opacity
        }}
      />
      
      {/* Color overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r backdrop-blur-sm from-white to-white "
        style={{ opacity }}
      />
       <TopNav />
      {/* Content */}
      <div className="relative z-10 h-full">
        <div className="p-10 flex justify-evenly items-center h-full">
          <motion.div 
            className="max-w-2xl"
            initial="hidden"
            animate="visible"
            variants={container}
          >
            {/* Animated title with letter-by-letter animation */}
    <motion.h1
      key={keyCycle} // 🟢 This makes the animation re-run
      className="text-[80px] font-sans mb-4 flex"
      initial="hidden"
      animate="visible"
      variants={container}
      style={{ y: titleY }}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={letterAnimation}
          className={letter === "D" ? "text-slate-200 font-semibold" : "text-orange-500"}
        >
          {letter}
        </motion.span>
      ))}
    </motion.h1>
            
            {/* Animated subtitle */}
            <motion.p 
              className="text-orange-500 text-[30px] font-sans leading-tight"
              style={{ y: subtitleY }}
              variants={item}
            >
           <motion.span 
                className="inline-block text-blue-600"
                whileHover={{ scale: 1.05, color: "#ea580c" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Send. 
              </motion.span>{" "}
              <motion.span 
                className="inline-block text-blue-600"
                whileHover={{ scale: 1.05, color: "#ea580c" }}
                transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
              >
                Track. Get Notified.
              </motion.span>{" "}
              <motion.span 
                className="inline-block text-blue-600"
                whileHover={{ scale: 1.05, color: "#ea580c" }}
                transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
              >
                Experience    
              </motion.span>{" "}
              <motion.span 
                className="inline-block"
                whileHover={{ scale: 1.05, color: "#ea580c" }}
                transition={{ type: "spring", stiffness: 300, delay: 0.3 }}
              >
                a faster, smarter way
              </motion.span>{" "}
              <motion.span 
                className="inline-block"
                whileHover={{ scale: 1.05, color: "#ea580c" }}
                transition={{ type: "spring", stiffness: 300, delay: 0.4 }}
              >
                to send and receive packages
              </motion.span>{" "}
              <br />
              <motion.span 
                className="inline-block"
                whileHover={{ scale: 1.05, color: "#ea580c" }}
                transition={{ type: "spring", stiffness: 300, delay: 0.5 }}
              >
               with real-time tracking and
              </motion.span>{" "}
              <motion.span 
                className="inline-block"
                whileHover={{ scale: 1.05, color: "#ea580c" }}
                transition={{ type: "spring", stiffness: 300, delay: 0.6 }}
              >
                instant delivery updates.
              </motion.span>{" "}
            </motion.p>
          </motion.div>
          
          {/* Image carousel with rotation */}
          <motion.div
            className="hidden lg:block relative w-[400px] h-[400px]"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, type: "spring" }}
          >
            <AnimatePresence mode="wait">
              {images.map((image, index) => (
                currentImageIndex === index && (
                  <motion.div
                    key={index}
                    className="absolute inset-0"
                    initial={{ 
                      rotate: rotationAngles[index],
                      scale: 0.8,
                      opacity: 0 
                    }}
                    animate={{ 
                      rotate: rotationAngles[index],
                      scale: 1,
                      opacity: 1,
                      transition: { type: "spring", stiffness: 100 }
                    }}
                    exit={{ 
                      rotate: rotationAngles[index] + 10,
                      scale: 0.8,
                      opacity: 0,
                      transition: { duration: 0.5 } 
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      rotate: rotationAngles[index] + 2,
                      transition: { type: "spring" }
                    }}
                  >
                    <motion.img
                      src={image.src}
                      alt={image.alt}
                      className="w-[400px] h-[400px] object-fill  rounded-tr-4xl shadow-2xl"
                      whileHover={{ 
                        scale: 1.1,
                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                      }}
                    />
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
        
        
        
        </div>
        </ZoomOnScroll>
        <BottomNavbar />
      </div>
      <ZoomOnScroll>
      <div className="h-screen w-full flex items-center justify-center bg-slate-200 snap-start">
        <h1 className="text-4xl font-bold text-white">Section 1</h1>
      </div>
      </ZoomOnScroll>
      <ZoomOnScroll>
      <div className="h-screen w-full flex items-center justify-center bg-orange-500 snap-start">
        <h1 className="text-4xl font-bold text-white">Section 2</h1>
      </div>
      </ZoomOnScroll>
    </div>
  );
}

export default Welcome;