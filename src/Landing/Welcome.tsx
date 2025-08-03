import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import BottomNavbar from "./NavBar";
import { useState, useEffect } from "react";
import type { ReactElement } from "react";
import truck from "/truck.png";
import packageImage from "/package.jpg"; // Add your other images
import deliveryBike from "/delivery-bike.jpg"; // Add your other images
import tracking from "/tracking.jpg"; // Add your other images

function Welcome(): ReactElement {
  const { scrollYProgress } = useScroll();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Scroll-based animations
  const titleY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const subtitleY = useTransform(scrollYProgress, [0, 0.5], [0, -80]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);

  

  // Image rotation angles (each rotated 3 degrees from previous)
  const rotationAngles = [0, 4, -6, 6];
  
  // Images array
  const images = [
    { src: truck, alt: "Delivery truck" },
    { src: packageImage, alt: "Package" },
    { src: deliveryBike, alt: "Delivery bike" },
    { src: tracking, alt: "Tracking system" }
  ];

  // Auto-rotate images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Text animation variants
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

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 }
  }
} as const;

const letterAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
} as const;


  // Split text into letters for animation
  const text = "RoadDrop";
  const letters = text.split("");

  return (
    <div className="relative w-full h-screen overflow-hidden">
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
        className="absolute inset-0 bg-gradient-to-r from-white to-slate-500/80 opacity-80"
        style={{ opacity }}
      />
      
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
              className="text-[80px] font-sans mb-4 flex"
              style={{ y: titleY }}
            >
              {letters.map((letter, index) => (
                <motion.span
                  key={index}
                  variants={letterAnimation}
                  className={letter === "D" ? "text-blue-600" : "text-orange-500"}
                  whileHover={{ scale: 1.2, y: -10 }}
                  transition={{ type: "spring", stiffness: 400 }}
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
                className="inline-block"
                whileHover={{ scale: 1.05, color: "#ea580c" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Send,
              </motion.span>{" "}
              <motion.span 
                className="inline-block"
                whileHover={{ scale: 1.05, color: "#ea580c" }}
                transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
              >
                Track
              </motion.span>{" "}
              <motion.span 
                className="inline-block"
                whileHover={{ scale: 1.05, color: "#ea580c" }}
                transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
              >
                and
              </motion.span>{" "}
              <motion.span 
                className="inline-block"
                whileHover={{ scale: 1.05, color: "#ea580c" }}
                transition={{ type: "spring", stiffness: 300, delay: 0.3 }}
              >
                get
              </motion.span>{" "}
              <motion.span 
                className="inline-block"
                whileHover={{ scale: 1.05, color: "#ea580c" }}
                transition={{ type: "spring", stiffness: 300, delay: 0.4 }}
              >
                notified
              </motion.span>{" "}
              <br />
              <motion.span 
                className="inline-block"
                whileHover={{ scale: 1.05, color: "#ea580c" }}
                transition={{ type: "spring", stiffness: 300, delay: 0.5 }}
              >
                on
              </motion.span>{" "}
              <motion.span 
                className="inline-block"
                whileHover={{ scale: 1.05, color: "#ea580c" }}
                transition={{ type: "spring", stiffness: 300, delay: 0.6 }}
              >
                your
              </motion.span>{" "}
              <motion.span 
                className="inline-block"
                whileHover={{ scale: 1.05, color: "#ea580c" }}
                transition={{ type: "spring", stiffness: 300, delay: 0.7 }}
              >
                packages
              </motion.span>{" "}
              <motion.span 
                className="inline-block"
                whileHover={{ scale: 1.05, color: "#ea580c" }}
                transition={{ type: "spring", stiffness: 300, delay: 0.8 }}
              >
                sent
              </motion.span>{" "}
              <motion.span 
                className="inline-block"
                whileHover={{ scale: 1.05, color: "#ea580c" }}
                transition={{ type: "spring", stiffness: 300, delay: 0.9 }}
              >
                on
              </motion.span>{" "}
              <motion.span 
                className="inline-block"
                whileHover={{ scale: 1.05, color: "#ea580c" }}
                transition={{ type: "spring", stiffness: 300, delay: 1.0 }}
              >
                courier.
              </motion.span>
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
        
        <BottomNavbar />
      </div>
    </div>
  );
}

export default Welcome;