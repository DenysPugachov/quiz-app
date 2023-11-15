import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";

const initialState = {
  questions: [],
  status: "loading", // loading, error, ready, finished
}

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload.questions,
        status: "ready",
      }
    case "dataFailed":
      return {
        ...state,
        status: "error",
      }
    default:
      throw new Error("Unknown action. ")
  }
}

function App() {
  const [{ questions, status }, dispatch] = useReducer(reducer, initialState)

  const numOfQuiestions = questions.length

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetch("./data/questions.json") // path from index.html
        if (!data.ok) throw new Error("Response is not ok!")
        const res = await data.json()
        dispatch({ type: "dataReceived", payload: res })
      } catch (err) {
        dispatch({ type: "dataFailed" })
        console.log('err', err)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="app">
      <Header />
      <Main>
        <h4>
          {status === "loading" && <Loader />}
          {status === "error" && <Error />}
          {status === "ready" && <StartScreen numOfQuiestions={numOfQuiestions} />}

        </h4>
        {/* {questions?.map((q, i) => <div key={q.question}>{i}. {q.question}</div>)} */}
      </Main>
    </div>
  );
}

export default App;
