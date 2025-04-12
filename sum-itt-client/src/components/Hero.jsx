import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-white text-center bg-cover bg-center bg-[url('./assets/bg-hero.jpg')]">

      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      <motion.div
        className="z-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl md:text-6xl font-bold">📚 Sum-itt</h1>
        <p className="mt-4 text-xl md:text-2xl font-light">
          Smarter Study. Smarter You.
        </p>
      </motion.div>

      <motion.div
        className="absolute bottom-12 z-10 animate-bounce text-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        ⬇️
      </motion.div>
    </section>
  );
};

export default Hero;
