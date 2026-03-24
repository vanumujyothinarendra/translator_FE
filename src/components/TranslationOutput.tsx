 import { motion } from "framer-motion";
import { Copy, Check, Volume2 } from "lucide-react";
import { useState } from "react";

interface TranslationMessage {
  id: string;
  original: string;
  translated: string;
  language: string;
  timestamp: Date;
}

interface TranslationOutputProps {
  messages: TranslationMessage[];
}

const TranslationOutput = ({ messages }: TranslationOutputProps) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const speak = (text: string, lang: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    speechSynthesis.speak(utterance);
  };

  if (messages.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center py-20 text-center">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="mb-6 text-6xl"
        >
          🌍
        </motion.div>
        <h3 className="text-xl font-semibold text-foreground">Start Translating</h3>
        <p className="mt-2 max-w-sm text-muted-foreground">
          Type or speak a message in English, select a language, and hit translate.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-1">
      {messages.map((msg, i) => (
        <motion.div
          key={msg.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="glass-card p-5"
        >
          <div className="mb-3 flex items-start justify-between">
            <p className="text-lg font-medium leading-relaxed text-foreground">
              {msg.translated}
            </p>
            <div className="ml-3 flex shrink-0 gap-1">
              <button
                onClick={() => speak(msg.translated, msg.language)}
                className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <Volume2 className="h-4 w-4" />
              </button>
              <button
                onClick={() => copyToClipboard(msg.translated, msg.id)}
                className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {copiedId === msg.id ? (
                  <Check className="h-4 w-4 text-primary" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            original: {msg.original}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default TranslationOutput;
