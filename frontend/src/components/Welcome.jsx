import { useEffect, useState } from "react";
import "./Welcome.css";

const slides = [
  {
    image:
      "https://img.freepik.com/free-vector/business-people-planning-tasks_23-2148565097.jpg",
    title: "Organize Your Tasks",
    text: "Create, update and manage your daily tasks easily",
  },
  {
    image:
      "https://img.freepik.com/free-vector/flat-game-streamer-elements-collection_23-2148921942.jpg?semt=ais_hybrid&w=740&q=80",
    title: "Track Your Progress",
    text: "Mark completed tasks and stay productive",
  },
  {
    image:
      "https://img.freepik.com/free-vector/goal-achievement-concept_23-2148545507.jpg",
    title: "Achieve Your Goals",
    text: "Plan smartly and reach your goals faster",
  },
];

function Welcome({ onContinue }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="welcome-container"
      style={{ backgroundImage: `url(${slides[index].image})` }}
    >
      <div className="overlay">
        <h1>{slides[index].title}</h1>
        <p>{slides[index].text}</p>

        <button className="btn-primary" onClick={onContinue}>
          Go to Task Manager →
        </button>
      </div>
    </div>
  );
}

export default Welcome;
