
import React from 'react'

export default function StartScreen({ numOfQuiestions }) {
    return (
        <div className="start">
            <h2>Wellcom to Quiz</h2>
            <h3>{numOfQuiestions} questions to test your skills.</h3>
            <button className="btn btn-ui">Start</button>
        </div>
    )
}
