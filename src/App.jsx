import { useRef, useState, useEffect } from "react";
import HeartCanvas from "./HeartCanvas";

export default function App() {
  const musicRef = useRef(null);

  const [started, setStarted] = useState(false);
  const [currentText, setCurrentText] = useState("");
  const [ended, setEnded] = useState(false);
  const [msgIndex, setMsgIndex] = useState(0);

 const timedMessages = [
  { time: 2,  text: "🧸 hey…" },
  { time: 4,  text: "this song has been on my mind lately" },
  { time: 7,  text: "because somehow, it reminds me of you" },
  { time: 10, text: "the little things" },
  { time: 13, text: "the way you make things feel lighter" },
  { time: 16, text: "the way you exist without trying" },
  { time: 19, text: "I don’t say this enough…" },
  { time: 22, text: "but you really matter to me" },
  { time: 25, text: "and I wanted you to feel that" },
  { time: 28, text: "even if it’s just for a moment ♡" }
];

  const startExperience = () => {
    if (started) return;
    setStarted(true);

    const music = musicRef.current;
    music.volume = 0;
    music.play();

    let v = 0;
    const fade = setInterval(() => {
      if (v < 0.6) {
        v += 0.02;
        music.volume = v;
      } else clearInterval(fade);
    }, 200);
  };

  useEffect(() => {
    if (!started) return;
    const music = musicRef.current;

    const onTimeUpdate = () => {
      if (msgIndex < timedMessages.length &&
          music.currentTime >= timedMessages[msgIndex].time) {
        setCurrentText(timedMessages[msgIndex].text);
        setMsgIndex(i => i + 1);
      }
    };

    const onEnded = () => {
      setEnded(true);
      setCurrentText("");
    };

    music.addEventListener("timeupdate", onTimeUpdate);
    music.addEventListener("ended", onEnded);

    return () => {
      music.removeEventListener("timeupdate", onTimeUpdate);
      music.removeEventListener("ended", onEnded);
    };
  }, [started, msgIndex]);

  return (
    <div
      onClick={startExperience}
      style={{
        width: "100vw",
        height: "100vh",
        background: "black",
        position: "relative"
      }}
    >
      {!ended && <HeartCanvas />}

      {!started && (
        <div style={centerStyle}>
          tap to feel the love ♡
        </div>
      )}

      {started && currentText && (
        <div style={messageStyle}>
          {currentText}
        </div>
      )}

      {ended && (
        <div style={cardStyle}>
          <div style={{ fontSize: "42px" }}>🧸💗</div>
          <h2>Hey Mehakk</h2>
          <p>
            I don’t know how to say this perfectly,
            but you truly mean a lot to me.
          </p>
          <p>
            You make things warmer.
            You make things softer.
          </p>
          <p>
            And I’m really grateful you exist 💕
          </p>
          <p style={{ marginTop: "20px", opacity: 0.7 }}>
            — always, with love ♡
          </p>
        </div>
      )}

      <audio ref={musicRef} src="/music.mp3" />
    </div>
  );
}

const centerStyle = {
  position: "absolute",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#ffb6c9",
  fontSize: "18px",
  letterSpacing: "2px",
  opacity: 0.85
};

const messageStyle = {
  animation: "fadeMessage 4s, float 6s ease-in-out infinite",
  backdropFilter: "blur(2px)",
  position: "absolute",
  top: "55%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  color: "rgba(255,255,255,0.9)",   // soft white
  fontSize: "18px",                 // smaller
  textAlign: "center",
  fontFamily: "'Pacifico', cursive",
  padding: "8px 16px",
  lineHeight: "1.4",
  letterSpacing: "0.5px",
  animation: "fadeMessage 4s",
  pointerEvents: "none"
};


const cardStyle = {
  position: "absolute",
  inset: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  color: "#ffb6c9",
  background: "rgba(0,0,0,0.88)",
  padding: "40px",
  textAlign: "center",
  maxWidth: "520px",
  margin: "auto",
  borderRadius: "22px",
  fontFamily: "'Poppins', sans-serif",
  lineHeight: "1.6"
};
