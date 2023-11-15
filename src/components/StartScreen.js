
import React from 'react'

export default function StartScreen({ numOfQuiestions, dispatch }) {
    return (
        <div className="start">
            <h2>Wellcom to Quiz</h2>
            <h3>{numOfQuiestions} questions to test your skills.</h3>
            <button
                className="btn btn-ui"
                onClick={() => dispatch({ type: "start" })}
            >Start
            </button>
        </div>
    )
}
