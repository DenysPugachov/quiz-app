import React from 'react'
import Options from './Options'

export default function Question({ question, dispatch, userAnswer }) {
	return (
		<div>
			<h3>{question.question}</h3>
			<Options question={question}
				dispatch={dispatch}
				userAnswer={userAnswer} />
		</div>
	)
}
