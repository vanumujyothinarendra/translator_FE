// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Send, Loader2, LogOut, Languages } from "lucide-react";
// import ThemeToggle from "@/components/ThemeToggle";
// import VoiceInputButton from "@/components/VoiceInputButton";
// import LanguageSelector from "@/components/LanguageSelector";
// import TranslationOutput from "@/components/TranslationOutput";
// import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
// import { translateText } from "@/lib/translate";

// interface TranslationMessage {
//   id: string;
//   original: string;
//   translated: string;
//   language: string;
//   timestamp: Date;
// }

// // Demo translations for showcase
// const DEMO_TRANSLATIONS: Record<string, Record<string, string>> = {
//   hi: { "Hello, how are you?": "नमस्ते, आप कैसे हैं?", "Good morning": "सुप्रभात", "Thank you": "धन्यवाद" },
//   es: { "Hello, how are you?": "Hola, ¿cómo estás?", "Good morning": "Buenos días", "Thank you": "Gracias" },
//   fr: { "Hello, how are you?": "Bonjour, comment allez-vous?", "Good morning": "Bonjour", "Thank you": "Merci" },
//   de: { "Hello, how are you?": "Hallo, wie geht es Ihnen?", "Good morning": "Guten Morgen", "Thank you": "Danke" },
//   zh: { "Hello, how are you?": "你好，你好吗？", "Good morning": "早上好", "Thank you": "谢谢" },
//   ar: { "Hello, how are you?": "مرحبا، كيف حالك؟", "Good morning": "صباح الخير", "Thank you": "شكراً" },
//   ja: { "Hello, how are you?": "こんにちは、お元気ですか？", "Good morning": "おはようございます", "Thank you": "ありがとう" },
//   ko: { "Hello, how are you?": "안녕하세요, 어떻게 지내세요?", "Good morning": "좋은 아침", "Thank you": "감사합니다" },
//   te: { "Hello, how are you?": "హలో, మీరు ఎలా ఉన్నారు?", "Good morning": "శుభోదయం", "Thank you": "ధన్యవాదాలు" },
//   ta: { "Hello, how are you?": "வணக்கம், நீங்கள் எப்படி இருக்கிறீர்கள்?", "Good morning": "காலை வணக்கம்", "Thank you": "நன்றி" },
//   pt: { "Hello, how are you?": "Olá, como você está?", "Good morning": "Bom dia", "Thank you": "Obrigado" },
//   ru: { "Hello, how are you?": "Привет, как дела?", "Good morning": "Доброе утро", "Thank you": "Спасибо" },
// };

// interface TranslationPageProps {
//   theme: "light" | "dark";
//   onToggleTheme: () => void;
//   username: string;
//   onLogout: () => void;
// }

// const TranslationPage = ({ theme, onToggleTheme, username, onLogout }: TranslationPageProps) => {
//   const [text, setText] = useState("");
//   const [language, setLanguage] = useState("es");
//   const [messages, setMessages] = useState<TranslationMessage[]>([]);
//   const [loading, setLoading] = useState(false);
//   const { isListening, transcript, startListening, stopListening, setTranscript } = useSpeechRecognition();

//   useEffect(() => {
//     if (transcript) {
//       setText(transcript);
//       setTranscript("");
//     }
//   }, [transcript, setTranscript]);

//   const handleTranslate = async () => {
//     if (!text.trim()) return;

//     setLoading(true);

//     try {
//       const res = await translateText(text.trim(), language);

//       const translated = res.data.translated_text;

//       setMessages((prev) => [
//         {
//           id: Date.now().toString(),
//           original: text.trim(),
//           translated,
//           language,
//           timestamp: new Date(),
//         },
//         ...prev,
//       ]);

//       setText("");
//     } catch (error) {
//       console.error("Translation failed", error);
//     }

//     setLoading(false);
//   };

//   const handleKeyDown = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleTranslate();
//     }
//   };

//   return (
//     <div className="gradient-bg flex min-h-screen flex-col">
//       {/* Header */}
//       <motion.header
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="glass-card mx-4 mt-4 flex items-center justify-between rounded-2xl px-6 py-4 md:mx-8"
//       >
//         <div className="flex items-center gap-3">
//           <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
//             <Languages className="h-5 w-5" />
//           </div>
//           <div>
//             <h1 className="text-lg font-bold text-foreground">TranslateHub</h1>
//             <p className="text-xs text-muted-foreground">Hi, {username}</p>
//           </div>
//         </div>
//         <div className="flex items-center gap-2">
//           <ThemeToggle theme={theme} onToggle={onToggleTheme} />
//           <motion.button
//             whileTap={{ scale: 0.9 }}
//             onClick={onLogout}
//             className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-secondary text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
//           >
//             <LogOut className="h-5 w-5" />
//           </motion.button>
//         </div>
//       </motion.header>

//       {/* Main Content */}
//       <div className="mx-4 mt-4 flex flex-1 flex-col gap-4 pb-4 md:mx-8">
//         {/* Messages */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.2 }}
//           className="glass-card flex flex-1 flex-col overflow-hidden p-4 md:p-6"
//         >
//           <TranslationOutput messages={messages} />
//         </motion.div>

//         {/* Input Area */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.3 }}
//           className="glass-card p-4 md:p-6"
//         >
//           <div className="mb-4 flex flex-wrap items-center gap-3">
//             <LanguageSelector selected={language} onSelect={setLanguage} />
//             <span className="text-sm text-muted-foreground">Translate English →</span>
//           </div>
//           <div className="flex gap-3">
//             <VoiceInputButton
//               isListening={isListening}
//               onStart={startListening}
//               onStop={stopListening}
//             />
//             <textarea
//               value={text}
//               onChange={(e) => setText(e.target.value)}
//               onKeyDown={handleKeyDown}
//               placeholder="Type your message in English..."
//               rows={2}
//               className="input-glass flex-1 resize-none text-foreground placeholder:text-muted-foreground"
//             />
//             <motion.button
//               whileTap={{ scale: 0.9 }}
//               onClick={handleTranslate}
//               disabled={loading || !text.trim()}
//               className="btn-gradient flex h-12 w-12 shrink-0 items-center justify-center self-end disabled:opacity-50"
//             >
//               {loading ? (
//                 <Loader2 className="h-5 w-5 animate-spin" />
//               ) : (
//                 <Send className="h-5 w-5" />
//               )}
//             </motion.button>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default TranslationPage;


// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Send, Loader2, LogOut, Languages } from "lucide-react";
// import ThemeToggle from "@/components/ThemeToggle";
// import VoiceInputButton from "@/components/VoiceInputButton";
// import LanguageSelector from "@/components/LanguageSelector";
// import TranslationOutput from "@/components/TranslationOutput";
// import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
// import { translateText } from "@/lib/translate";

// interface TranslationMessage {
//   id: string;
//   original: string;
//   translated: string;
//   language: string;
//   timestamp: Date;
// }

// interface TranslationPageProps {
//   theme: "light" | "dark";
//   onToggleTheme: () => void;
//   username: string;
//   onLogout: () => void;
// }

// const TranslationPage = ({
//   theme,
//   onToggleTheme,
//   username,
//   onLogout,
// }: TranslationPageProps) => {
//   const [text, setText] = useState("");
//   const [language, setLanguage] = useState("es");
//   const [messages, setMessages] = useState<TranslationMessage[]>([]);
//   const [loading, setLoading] = useState(false);

//   const {
//     isListening,
//     transcript,
//     startListening,
//     stopListening,
//     setTranscript,
//   } = useSpeechRecognition();

//   useEffect(() => {
//     if (transcript) {
//       setText(transcript);
//       setTranscript("");
//     }
//   }, [transcript, setTranscript]);

//   const handleTranslate = async () => {
//     if (!text.trim() || loading) return;

//     const token = localStorage.getItem("token");

//     if (!token) {
//       alert("Please login first.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await translateText(text.trim(), language);

//       const translatedText =
//         response?.data?.translated_text || "Translation failed";

//       const newMessage: TranslationMessage = {
//         id: Date.now().toString(),
//         original: text.trim(),
//         translated: translatedText,
//         language,
//         timestamp: new Date(),
//       };

//       setMessages((prev) => [newMessage, ...prev]);

//       setText("");
//     } catch (error) {
//       console.error("Translation error:", error);
//       alert("Translation failed. Please check the server.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleKeyDown = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleTranslate();
//     }
//   };

//   return (
//     <div className="gradient-bg flex min-h-screen flex-col">
//       {/* Header */}
//       <motion.header
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="glass-card mx-4 mt-4 flex items-center justify-between rounded-2xl px-6 py-4 md:mx-8"
//       >
//         <div className="flex items-center gap-3">
//           <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
//             <Languages className="h-5 w-5" />
//           </div>

//           <div>
//             <h1 className="text-lg font-bold text-foreground">
//               TranslateHub
//             </h1>
//             <p className="text-xs text-muted-foreground">
//               Hi, {username}
//             </p>
//           </div>
//         </div>

//         <div className="flex items-center gap-2">
//           <ThemeToggle theme={theme} onToggle={onToggleTheme} />

//           <motion.button
//             whileTap={{ scale: 0.9 }}
//             onClick={onLogout}
//             className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-secondary text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
//           >
//             <LogOut className="h-5 w-5" />
//           </motion.button>
//         </div>
//       </motion.header>

//       {/* Main */}
//       <div className="mx-4 mt-4 flex flex-1 flex-col gap-4 pb-4 md:mx-8">

//         {/* Messages */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.2 }}
//           className="glass-card flex flex-1 flex-col overflow-hidden p-4 md:p-6"
//         >
//           <TranslationOutput messages={messages} />
//         </motion.div>

//         {/* Input */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.3 }}
//           className="glass-card p-4 md:p-6"
//         >
//           <div className="mb-4 flex flex-wrap items-center gap-3">
//             <LanguageSelector selected={language} onSelect={setLanguage} />
//             <span className="text-sm text-muted-foreground">
//               Translate English →
//             </span>
//           </div>

//           <div className="flex gap-3">
//             <VoiceInputButton
//               isListening={isListening}
//               onStart={startListening}
//               onStop={stopListening}
//             />

//             <textarea
//               value={text}
//               onChange={(e) => setText(e.target.value)}
//               onKeyDown={handleKeyDown}
//               placeholder="Type your message in English..."
//               rows={2}
//               className="input-glass flex-1 resize-none text-foreground placeholder:text-muted-foreground"
//             />

//             <motion.button
//               whileTap={{ scale: 0.9 }}
//               onClick={handleTranslate}
//               disabled={loading || !text.trim()}
//               className="btn-gradient flex h-12 w-12 shrink-0 items-center justify-center self-end disabled:opacity-50"
//             >
//               {loading ? (
//                 <Loader2 className="h-5 w-5 animate-spin" />
//               ) : (
//                 <Send className="h-5 w-5" />
//               )}
//             </motion.button>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default TranslationPage;


import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Loader2, LogOut, Languages } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import VoiceInputButton from "@/components/VoiceInputButton";
import LanguageSelector from "@/components/LanguageSelector";
import TranslationOutput from "@/components/TranslationOutput";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { translateText } from "@/lib/translate";

interface TranslationMessage {
  id: string;
  original: string;
  translated: string;
  language: string;
  timestamp: Date;
}

interface TranslationPageProps {
  theme: "light" | "dark";
  onToggleTheme: () => void;
  username: string;
  onLogout: () => void;
}

const TranslationPage = ({
  theme,
  onToggleTheme,
  username,
  onLogout,
}: TranslationPageProps) => {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("es");
  const [messages, setMessages] = useState<TranslationMessage[]>([]);
  const [loading, setLoading] = useState(false);

  // log voices so we can see which languages are supported by the browser
  useEffect(() => {
    const logVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      console.debug("available TTS voices:", voices.map((v) => `${v.name} (${v.lang})`));
    };

    logVoices();
    window.speechSynthesis.onvoiceschanged = logVoices;
  }, []);

  const {
    isListening,
    transcript,
    startListening,
    stopListening,
    setTranscript,
  } = useSpeechRecognition();

  /* -----------------------------
     TEXT TO SPEECH FUNCTION
  ------------------------------*/
  const speakText = (text: string, lang: string) => {
    // pick a voice whose language starts with the requested code
    const voices = window.speechSynthesis.getVoices();
    let voice: SpeechSynthesisVoice | undefined;

    // try to match exact locale first, then prefix
    if (voices.length > 0) {
      voice = voices.find((v) => v.lang.toLowerCase().startsWith(lang.toLowerCase()));
      if (!voice) {
        voice = voices.find((v) => v.lang.toLowerCase().includes(lang.toLowerCase()));
      }
    }

    const utterance = new SpeechSynthesisUtterance(text);
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    } else {
      // if we didn't find a matching voice, log available ones and fallback
      console.warn(
        `no speech synthesis voice found for "${lang}"; available voices:`,
        voices.map((v) => `${v.name} (${v.lang})`)
      );
      utterance.lang = "en-US"; // fallback
    }

    // cancel any previous utterances and speak
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  /* -----------------------------
     AUTO TRANSLATE AFTER VOICE
  ------------------------------*/
  useEffect(() => {
    if (transcript) {
      setText(transcript);
      handleTranslate(transcript);
      setTranscript("");
    }
  }, [transcript]);

  /* -----------------------------
     TRANSLATE FUNCTION
  ------------------------------*/
const handleTranslate = async (voiceInput?: string) => {

  const messageText = voiceInput || text;

  if (!messageText.trim() || loading) return;

  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login first.");
    return;
  }

  setLoading(true);

  try {

    const response = await translateText(messageText.trim(), language);

    console.log("Translation API response:", response);

    if (!response || !response.data) {
      console.error("Invalid response from server");
      return;
    }

    const translatedText = response.data.translated_text;

    const newMessage: TranslationMessage = {
      id: Date.now().toString(),
      original: messageText.trim(),
      translated: translatedText,
      language,
      timestamp: new Date(),
    };

    setMessages((prev) => [newMessage, ...prev]);

    speakText(translatedText, language);

    setText("");

  } catch (error: any) {

    console.error("Translation error details:", error);

    if (error.response) {
      console.error("Server response:", error.response.data);
    }

  } finally {
    setLoading(false);
  }
};

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleTranslate();
    }
  };

  return (
    <div className="gradient-bg flex min-h-screen flex-col">

      {/* HEADER */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card mx-4 mt-4 flex items-center justify-between rounded-2xl px-6 py-4 md:mx-8"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Languages className="h-5 w-5" />
          </div>

          <div>
            <h1 className="text-lg font-bold text-foreground">
              TranslateHub
            </h1>
            <p className="text-xs text-muted-foreground">
              Hi, {username}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onLogout}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-secondary text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut className="h-5 w-5" />
          </motion.button>
        </div>
      </motion.header>

      {/* MAIN */}
      <div className="mx-4 mt-4 flex flex-1 flex-col gap-4 pb-4 md:mx-8">

        {/* MESSAGES */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-card flex flex-1 flex-col overflow-hidden p-4 md:p-6"
        >
          <TranslationOutput messages={messages} />
        </motion.div>

        {/* INPUT AREA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-4 md:p-6"
        >
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <LanguageSelector selected={language} onSelect={setLanguage} />
            <span className="text-sm text-muted-foreground">
              Translate English →
            </span>
          </div>

          <div className="flex gap-3">

            {/* VOICE BUTTON */}
            <VoiceInputButton
              isListening={isListening}
              onStart={startListening}
              onStop={stopListening}
            />

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type or speak your message..."
              rows={2}
              className="input-glass flex-1 resize-none text-foreground placeholder:text-muted-foreground"
            />

            {/* SEND BUTTON */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => handleTranslate()}
              disabled={loading || !text.trim()}
              className="btn-gradient flex h-12 w-12 shrink-0 items-center justify-center self-end disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </motion.button>

          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TranslationPage;