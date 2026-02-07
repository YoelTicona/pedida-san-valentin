import { useState } from "react";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";

export default function ValentinePage() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ top: "50%", left: "50%" });

  const phrases = [
    "", 
    "¿No mientes?",
    "¿Ahhhh?",
    "¡Piénsalo bien!",
    "Hazlo por las wawas",
    "Pero si somos el uno para el otro...",
    "Hare la lloración...",
    "¡Pipipiii!",
    "Buenooooooo, si no quieres...",
    "¡Bromitaaa, di que siiii ",
  ];

  const images = [
    "https://media.tenor.com/_F868yNBTPEAAAAi/kiss-kissing.gif",
    "https://media.tenor.com/P285-2vH5FYAAAAi/alone-lonely.gif",
    "https://media.tenor.com/B07WYmzMgQwAAAAi/angry-%D0%B7%D0%B2%D0%BE%D0%B9-%D1%85%D0%BE%D0%BC%D1%8F%D0%BA.gif",
    "https://media1.tenor.com/m/Ww2rTFH4VwIAAAAd/sad-hamster-sadhamster.gif",
    "../../public/images/wawas.jpeg",
    "https://media.tenor.com/OIW8NZ9QsBgAAAAi/att.gif",
    "https://media.tenor.com/usAx4sFHmRwAAAAi/chibi-yhad.gif",
    "https://media.tenor.com/pLDe0NLTTQgAAAAi/sad.gif",
    "https://media.tenor.com/dSxM6TwBNN8AAAAi/love-anime.gif",
    "https://media.tenor.com/LUj4NZAZf_MAAAAi/chibi-anime-boy.gif",
  ];

  const yesButtonSize = noCount * 20 + 16;
  const isEscaping = noCount >= phrases.length - 1;

  function handleNoClick() {
    if (isEscaping) {
      moveButton();
    } else {
      setNoCount(noCount + 1);
    }
  }

  function handleYesClick() {
    setYesPressed(true);
    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.6 },
    });
  }

  function moveButton() {
    const x = Math.random() * 70 + 10;
    const y = Math.random() * 70 + 10;
    setButtonPosition({ top: `${y}%`, left: `${x}%` });
  }

  function getPhraseText() {
    return phrases[Math.min(noCount, phrases.length - 1)];
  }

  function getImage() {
    return images[Math.min(noCount, images.length - 1)] || images[0];
  }

  // --- DEFINICIÓN DE FONDOS (PATRONES) ---
  const backgrounds = {
    // Fondo Rojo con patrón de corazones sutiles
    hearts: {
        backgroundColor: "#c05f5f",
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 3.22l-.61-.6a5.5 5.5 0 0 0-7.78 7.77L10 18.78l8.39-8.4a5.5 5.5 0 0 0-7.78-7.77l-.61.61z' fill='%23964949' fill-opacity='0.4'/%3E%3C/svg%3E")`
    },
    // Fondo Oscuro con patrón de puntos (Grid) blanco suave
    grid: {
        backgroundColor: "#2e2315",
        backgroundImage: "radial-gradient(#ffffff22 1px, transparent 1px)",
        backgroundSize: "20px 20px"
    }
  };

  if (yesPressed) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center font-hand p-4 text-center"
        style={backgrounds.grid} // Usamos el fondo de puntos para el final también
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 text-[#c05f5f]/20 text-8xl animate-pulse">❤️</div>
          <div className="absolute bottom-10 right-10 text-[#c05f5f]/20 text-8xl animate-pulse delay-700">❤️</div>
        </div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="relative bg-[#c05f5f] p-2 rounded-3xl shadow-2xl rotate-2"
          style={backgrounds.hearts} // Fondo de corazones en el borde de la foto
        >
          <img
            src="https://media1.tenor.com/m/ThWFu50NldAAAAAC/funny-cute.gif"
            alt="Bears kissing"
            className="w-full max-w-xs md:max-w-md rounded-2xl border-4 border-white/20"
          />
        </motion.div>
        <div className="mt-8 relative z-10">
          <h1 className="text-6xl md:text-8xl font-bold text-[#c05f5f] drop-shadow-lg mb-4">¡Siii!</h1>
          <p className="text-2xl md:text-4xl text-white font-bold">Yeeee, ahora tenemos que casarnos</p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-[100dvh] w-full font-hand overflow-hidden relative">
      
      {/* 1. SECCIÓN IMAGEN (Fondo Rojo + Corazones) */}
      <div 
        className="w-full h-[45%] md:w-1/2 md:h-full flex items-center justify-center relative shadow-lg shrink-0"
        style={backgrounds.hearts}
      >
        <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>
        <div className="absolute top-4 right-6 text-white/20 text-5xl rotate-12 animate-bounce">✨</div>
        <AnimatePresence mode="wait">
          <motion.img
            key={noCount}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4 }}
            src={getImage()}
            alt="Pregunta"
            className="w-48 h-48 md:w-80 md:h-80 object-cover"
            style={{ transform: `scale(${Math.max(0.7, 1 - noCount * 0.02)})` }}
          />
        </AnimatePresence>
      </div>

      {/* 2. SECCIÓN CONTROLES (Fondo Oscuro + Puntos) */}
      <div 
        className="w-full h-[55%] md:w-1/2 md:h-full flex flex-col items-center justify-center p-4 text-center relative z-0"
        style={backgrounds.grid}
      >
        <div className="w-full max-w-lg flex flex-col items-center gap-4 md:gap-8">
          
          <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-md">Para Liz</h1>
          
          <h2 className="text-3xl md:text-5xl text-white leading-tight">
            ¿Puedo ser tu<br />
            <span className="text-[#c05f5f] font-bold">san valentin?</span>
          </h2>

          <div className="h-8 md:h-10 flex items-center justify-center w-full">
             <AnimatePresence mode="wait">
                <motion.h3 
                  key={noCount} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-xl md:text-2xl text-[#c05f5f] font-bold italic"
                >
                  {getPhraseText()}
                </motion.h3>
             </AnimatePresence>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 w-full mt-2 relative">
            <button
              onClick={handleYesClick}
              style={{ fontSize: Math.min(yesButtonSize, 500) }}
              className="bg-[#0f3b1e] border-2 border-white text-white font-bold py-3 px-6 rounded-xl hover:bg-[#16552b] transition-all duration-200 shadow-xl whitespace-nowrap z-20"
            >
              Si
            </button>

            {!isEscaping && (
              <button
                onClick={handleNoClick}
                className="bg-[#2e2315] border-2 border-[#c05f5f] text-[#c05f5f] font-bold py-3 px-6 rounded-xl hover:bg-[#c05f5f] hover:text-white transition-all duration-300 shadow-lg text-lg whitespace-nowrap"
              >
                No
              </button>
            )}
          </div>
        </div>
      </div>

      {isEscaping && (
        <button
          onClick={moveButton} 
          onMouseEnter={moveButton}
          style={{
            position: 'fixed',
            top: buttonPosition.top,
            left: buttonPosition.left,
            zIndex: 9999,
            transition: 'all 0.2s ease-out',
          }}
          className="bg-[#2e2315] border-2 border-[#c05f5f] text-[#c05f5f] font-bold py-3 px-6 rounded-xl hover:bg-[#c05f5f] hover:text-white shadow-2xl text-lg whitespace-nowrap cursor-pointer"
        >
          No
        </button>
      )}

    </div>
  );
}