import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { HiHome } from "react-icons/hi";
import Lottie from "lottie-react";
import logo from "/logo.png";
import box from "../assets/box.json"; // <-- your Lottie file path

const BottomNavbar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1000);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 200 }}
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 sm:w-[950px] w-full rounded-lg p-2 backdrop-blur-sm bg-slate-100/40 shadow-lg z-50"
        >
          <div className="flex justify-evenly items-center">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <div className="w-12 h-10 rounded bg-white/90">
                <img src={logo} className="w-[50px] h-[40px]" />
              </div>
            </motion.div>
            <div className="flex mt-1">
                <p className="text-orange-600 font-sans mr-2 text-[15px]">Courier <span className="text-blue-700">/</span></p>
                
                <HiHome className="text-blue-700 w-5 h-5 " />
            </div>
            {/* Lottie animation next to nav links */}
            <div className="w-12 h-12">
            <Lottie
             animationData={box}
             loop
              autoplay
             className="w-12 h-12"
             />
            </div>

            {/* Navigation Links */}
            <div className="flex space-x-2 sm:space-x-2">
              {["About Us", "Our Mission", "Contact Us"].map((item) => (
                <motion.a
                  key={item}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  className="text-orange-600 hover:text-orange-200 font-sans text-[14px] sm:text-[15px] px-2 py-1 rounded-md transition-colors"
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default BottomNavbar;
