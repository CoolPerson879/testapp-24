// pages/index.js
import Quiz from "./components/Quiz";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Quiz App</h1>
      <Quiz />
    </div>
  );
}
