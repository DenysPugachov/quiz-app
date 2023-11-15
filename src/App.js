import { useEffect } from "react";
import { useState } from "react";

function App() {
  const [quizData, setQuizData] = useState()

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetch("./data/questions.json") // path from index.html
        if (!data.ok) throw new Error("Response is not ok!")
        const res = await data.json()
        setQuizData(res)
      } catch (err) {
        console.log('err', err)
      }
    }
    fetchData()
  }, [])

  return (
    <div>
      Quiz:
      {quizData?.questions.map((q, i) => <div key={q.question}>{i}. {q.question}</div>)}
    </div>
  );
}

export default App;
