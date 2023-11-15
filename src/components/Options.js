import React from 'react'

export default function Options({ question }) {
    return (
        <ul className="options">
            {question.options.map(opt =>
                <button
                    className="btn btn-option"
                    key={opt}
                >
                    {opt}
                </button>
            )}
        </ul>
    )
}
