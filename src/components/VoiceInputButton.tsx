import { Mic, MicOff } from "lucide-react";
import { motion } from "framer-motion";

interface VoiceInputButtonProps {
  isListening: boolean;
  onStart: () => void;
  onStop: () => void;
}

const VoiceInputButton = ({ isListening, onStart, onStop }: VoiceInputButtonProps) => {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.9 }}
      onClick={isListening ? onStop : onStart}
      className={`flex h-12 w-12 items-center justify-center rounded-xl border transition-all duration-300 ${
        isListening
          ? "animate-recording border-destructive bg-destructive/10 text-destructive"
          : "border-border bg-secondary text-muted-foreground hover:bg-muted hover:text-foreground"
      }`}
      aria-label={isListening ? "Stop recording" : "Start recording"}
    >
      {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
    </motion.button>
  );
};

export default VoiceInputButton;
