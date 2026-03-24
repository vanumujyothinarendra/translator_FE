// import { useState, useCallback, useRef } from "react";

// interface SpeechRecognitionEvent {
//   results: SpeechRecognitionResultList;
// }

// export function useSpeechRecognition() {
//   const [isListening, setIsListening] = useState(false);
//   const [transcript, setTranscript] = useState("");
//   const recognitionRef = useRef<any>(null);

//   const startListening = useCallback(() => {
//     const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
//     if (!SpeechRecognition) {
//       alert("Speech recognition is not supported in this browser.");
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognition.lang = "en-US";
//     recognition.interimResults = false;
//     recognition.continuous = false;

//     recognition.onresult = (event: SpeechRecognitionEvent) => {
//       const result = event.results[0][0].transcript;
//       setTranscript(result);
//     };

//     recognition.onend = () => setIsListening(false);
//     recognition.onerror = () => setIsListening(false);

//     recognitionRef.current = recognition;
//     recognition.start();
//     setIsListening(true);
//   }, []);

//   const stopListening = useCallback(() => {
//     recognitionRef.current?.stop();
//     setIsListening(false);
//   }, []);

//   return { isListening, transcript, startListening, stopListening, setTranscript };
// }

import { useState, useRef, useEffect, useCallback } from "react";

export function useSpeechRecognition() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  const recognitionRef = useRef<any>(null);

  /* Initialize speech recognition once */
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.warn("Speech recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onresult = (event: any) => {
      const speechResult = event.results[0][0].transcript;

      console.log("Voice captured:", speechResult);

      setTranscript(speechResult);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
  }, []);

  const startListening = useCallback(() => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    setTranscript("");
    setIsListening(true);

    try {
      recognitionRef.current.start();
    } catch (error) {
      console.warn("Recognition already started.");
    }
  }, []);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    setIsListening(false);
  }, []);

  return {
    isListening,
    transcript,
    startListening,
    stopListening,
    setTranscript,
  };
}