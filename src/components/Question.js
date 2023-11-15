import React from 'react'
import Options from './Options'

export default function Question({ question, dispatch, usersAnswer }) {
	return (
		<div>
			<h3>{question.question}</h3>
			<Options question={question}
				dispatch={dispatch}
				usersAnswer={usersAnswer} />
		</div>
	)
}
