import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";

const initialState = {
  questions: [],
  status: "loading", // loading, error, ready, finished
  currQuestionIndex: 0,
  userAnswer: null,
  userPointCounter: 0,
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
    case "start":
      return { ...state, status: "active" }
    case "getUserAnswer":
      const currQuestion = state.questions.at(state.currQuestionIndex)
      return {
        ...state,
        userAnswer: action.payload,
        userPointCounter: action.payload === currQuestion.correctOption
          ? state.userPointCounter + currQuestion.points
          : state.userPointCounter
      }
    default:
      throw new Error("Unknown action. ")
  }
}

function App() {
  const [{ questions, status, currQuestionIndex, userAnswer }, dispatch] = useReducer(reducer, initialState)

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
          {status === "loading" && <Loader />}
          {status === "error" && <Error />}
          {status === "ready" &&
            <StartScreen
              numOfQuiestions={numOfQuiestions}
              dispatch={dispatch}
            />}
        {status === "active" &&
          <Question question={questions[currQuestionIndex]}
            dispatch={dispatch}
            userAnswer={userAnswer} />}
      </Main>
    </div>
  );
}

export default App;
