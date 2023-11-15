import React from 'react'

export default function Options({ question, dispatch, userAnswer }) {
	const isQuestionAnswered = userAnswer !== null


	return (
		<ul className="options">
			{question.options.map((opt, idx) =>
				<button
					//FIXME: create separate function to manage classes
					className={`btn btn-option
						${idx === userAnswer ? "answer" : ""}
						${isQuestionAnswered
							? idx === question.correctOption ? "correct" : "wrong"
							: ""
						}`}
					key={opt}
					onClick={() => dispatch({ type: "getUserAnswer", payload: idx })}
					disabled={isQuestionAnswered}
				>
					{opt}
				</button>
			)}
		</ul>
	)
}
