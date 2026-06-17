import { useState } from "react";
import "./App.css";

function App() {
  const [screen, setScreen] = useState("login");
  const [name, setName] = useState("");
  const [topic, setTopic] = useState("");
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [emotion, setEmotion] = useState("Engaged");
  const [confidence, setConfidence] = useState(95);
  const [attention, setAttention] = useState(97);
  const [learningState, setLearningState] = useState("Highly Focused");
  const [tutorMode, setTutorMode] = useState("Advanced Learning");
  const [emotionHistory, setEmotionHistory] = useState(["Engaged"]);
  const [questionCount, setQuestionCount] = useState(0);
const [emotionChanges, setEmotionChanges] = useState(0);

const handleEmotionChange = (value) => {
  setEmotion(value);
  setEmotionHistory((prev) => [...prev, value]);
  setEmotionChanges((prev) => prev + 1);

  if (value === "Engaged") {
    setConfidence(95);
    setAttention(97);
    setLearningState("Highly Focused");
    setTutorMode("Advanced Learning");
  }

  if (value === "Confused") {
    setConfidence(55);
    setAttention(70);
    setLearningState("Needs Guidance");
    setTutorMode("Step-by-Step Guidance");
  }

  if (value === "Frustrated") {
    setConfidence(40);
    setAttention(60);
    setLearningState("Struggling");
    setTutorMode("Supportive Coaching");
  }

  if (value === "Bored") {
    setConfidence(65);
    setAttention(45);
    setLearningState("Disengaged");
    setTutorMode("Example-Based Learning");
  }
};

  const sendMessage = () => {
    if (question.trim() === "") return;

    const studentMessage = {
      sender: "student",
      text: question,
    };

 let response = "";

if (emotion === "Engaged") {
  response =
    `Great! Since you're engaged, let's explore "${question}" in more depth.`;
}

if (emotion === "Confused") {
  response =
    `No worries. Let's understand "${question}" step by step.`;
}

if (emotion === "Frustrated") {
  response =
    `Don't worry. Many learners struggle with "${question}" initially. Let's simplify it.`;
}

if (emotion === "Bored") {
  response =
    `Let's make "${question}" interesting with a real-world example.`;
}

const tutorMessage = {
  sender: "tutor",
  text: response,
};
    setQuestionCount((prev) => prev + 1);
    setMessages([...messages, studentMessage, tutorMessage]);
    setQuestion("");
  };

  if (screen === "tutor") {
    return (
      <div className="app">
        <div className="tutor-layout">
          <div className="chat-section">
            <h1>LearnSense AI</h1>
            <p>Your emotion-aware AI tutor session</p>

            <div className="chat-window">
              <div className="message tutor-message">
                <strong>AI Tutor:</strong>
                <p>
                  Hello {name || "Student"}, what would you like to learn about{" "}
                  {topic || "today"}?
                </p>
              </div>

              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={
                    msg.sender === "student"
                      ? "message student-message"
                      : "message tutor-message"
                  }
                >
                  <strong>{msg.sender === "student" ? "You:" : "AI Tutor:"}</strong>
                  <p>{msg.text}</p>
                </div>
              ))}
            </div>

            <div className="chat-input">
              <input
                type="text"
                placeholder="Type your question..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </div>

          <div className="emotion-section">
            <h2>Emotion Insights</h2>

            <div className="emotion-card">
              <h3>Current Emotion</h3>
              <select
              value={emotion}
              onChange={(e) => handleEmotionChange(e.target.value)}              >
              <option>Engaged</option>
              <option>Confused</option>
              <option>Frustrated</option>
              <option>Bored</option>
              </select>
            </div>

            <div className="emotion-card">
              <h3>Confidence</h3>
              <p>{confidence}%</p>            
            </div>

            <div className="emotion-card">
              <h3>Tutor Mode</h3>
              <p>{tutorMode}</p>
            </div>

            <div className="emotion-card">
              <h3>Attention Score</h3>
              <p>{attention}%</p>
            </div>

            <div className="emotion-card">
              <h3>Learning State</h3>
              <p>{learningState}</p>
            </div>

            <div className="emotion-card">
              <h3>Emotion History</h3>
              {emotionHistory.slice(-5).map((item, index) => (
              <p key={index}>{item}</p>
              ))}
            </div>
            <div className="emotion-card">
              <h3>Session Analytics</h3>
              <p>Questions: {questionCount}</p>
              <p>Emotion Changes: {emotionChanges}</p>
              <p>Current Emotion: {emotion}</p>
              <p>Confidence: {confidence}%</p>
            </div>

            <button onClick={() => setScreen("dashboard")}>
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (screen === "dashboard") {
    return (
      <div className="app">
        <div className="dashboard-card">
          <h1>Welcome, {name || "Student"} 👋</h1>
          <p>Your AI learning space is ready.</p>

          <div className="stats-grid">
            <div className="stat-box">
              <h3>Topic</h3>
              <p>{topic || "Not selected"}</p>
            </div>

            <div className="stat-box">
              <h3>Progress</h3>
              <p>0%</p>
            </div>

            <div className="stat-box">
              <h3>Sessions</h3>
              <p>0</p>
            </div>

            <div className="stat-box">
              <h3>Emotion Tracking</h3>
              <p>Enabled</p>
            </div>
          </div>

          <button onClick={() => setScreen("tutor")}>
            Start Tutor Session
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="card">
        <h1>LearnSense AI</h1>
        <p>Emotion-aware learning support powered by AI</p>

        <label>Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
        />

        <label>Email</label>
        <input type="email" placeholder="Enter your email" />

        <label>Learning Topic</label>
        <input
          type="text"
          placeholder="Example: Java, Python, SQL"
          onChange={(e) => setTopic(e.target.value)}
        />

        <button onClick={() => setScreen("dashboard")}>
          Start Learning
        </button>
      </div>
    </div>
  );
}

export default App;