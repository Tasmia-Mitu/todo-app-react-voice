import { useState, useEffect } from "react";
import styles from "./VoiceInput.module.css";
import { MdKeyboardVoice } from "react-icons/md";

const VoiceInput = ({ onVoiceResult }) => {
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    if (
      !("webkitSpeechRecognition" in window) &&
      !("SpeechRecognition" in window)
    ) {
      setSpeechSupported(false);
    }
  }, []);

  const startListening = () => {
    if (!speechSupported) {
      setStatusMessage("Voice input not supported in your browser");
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    // setStatusMessage("Listening... Speak now");
    setIsListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onVoiceResult(transcript);
      // setStatusMessage(`Added: "${transcript}"`);
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      setStatusMessage(`Error: ${event.error}`);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <div className={styles.voiceInputContainer}>
      <button
        onClick={startListening}
        disabled={isListening}
        className={`${styles.voiceButton} ${
          isListening ? styles.listening : ""
        }`}
      >
        {isListening ? "🛑 Stop Listening" : <MdKeyboardVoice />}
      </button>
      {/* {statusMessage && <div className={styles.status}>{statusMessage}</div>} */}
      {!speechSupported && (
        <div className={styles.warning}>
          Voice input not supported in your browser (try Chrome or Edge)
        </div>
      )}
    </div>
  );
};

export default VoiceInput;
