import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FeatureCard = ({ icon, title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div
        className="bg-gray-800 aspect-[3/4] w-72 rounded-2xl shadow-lg hover:shadow-2xl p-6 cursor-pointer transition-all hover:scale-105 flex flex-col justify-center items-center text-center"
        whileHover={{ scale: 1.05 }}
        onClick={() => setIsOpen(true)}
      >
        <div className="text-4xl mb-2">{icon}</div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gray-900 text-white p-6 rounded-2xl w-[80%] h-[80%] overflow-y-auto relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-xl text-white hover:text-red-500"
              >
                ✖
              </button>

              <h2 className="text-2xl font-bold mb-4 text-center">{icon} {title}</h2>
              <div className="w-full max-w-4xl mx-auto space-y-4">
                {children}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FeatureCard;
