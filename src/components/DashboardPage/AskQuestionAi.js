import { useState } from "react";
import { useSelector } from "react-redux";
import { AskQuestionFromAIApi } from "../../@core/services/Ai";

const AskQuestionFromAI = () => {
  const { courses } = useSelector((state) => state.appDashboard);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAskAi = async () => {
    if (!question.trim()) return;
    setLoading(true);
    try {
      const res = await AskQuestionFromAIApi(question, courses);
      setAnswer(res);
    } catch (err) {
      setAnswer("خطا در دریافت پاسخ از هوش مصنوعی.");
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        background: "#fff",
        padding: "2rem",
        borderRadius: "1rem",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        width: "100%",
        margin: "2rem auto",
        direction: "rtl",
        fontFamily: "Vazir, sans-serif",
      }}
    >
      <h2 style={{ marginBottom: "1rem", color: "#5E5873" }}>
        سوال خود را از هوش مصنوعی بپرسید
      </h2>
      <textarea
        required
        rows="4"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="مثلاً: چرا دوره‌های پیشرفته رزرو کمتری دارند؟"
        style={{
          width: "100%",
          padding: "1rem",
          borderRadius: "0.5rem",
          border: "1px solid #ccc",
          fontSize: "1rem",
          marginBottom: "1rem",
        }}
      ></textarea>
      <button
        onClick={handleAskAi}
        disabled={loading}
        style={{
          padding: "0.7rem 1.5rem",
          backgroundColor: "#7367F0",
          color: "#fff",
          border: "none",
          borderRadius: "0.5rem",
          fontSize: "1rem",
          cursor: "pointer",
        }}
      >
        {loading ? "در حال پاسخگویی..." : "ارسال سوال"}
      </button>

      {answer && (
        <div
          style={{
            marginTop: "2rem",
            backgroundColor: "#F8F8F8",
            padding: "1rem",
            borderRadius: "0.5rem",
            border: "1px solid #ddd",
            whiteSpace: "pre-wrap",
            lineHeight: "1.8",
            fontSize: "1rem",
            color: "#333",
          }}
        >
          <strong style={{ color: "#28C76F" }}>پاسخ هوش مصنوعی:</strong>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default AskQuestionFromAI;
