import React from 'react'

const Comment = props => (
    <article id={`comment-${props.id}`}>
        <div>
            By: <a href={`mailto:${props.email}`}>{props.name}</a>
        </div>

        <p>
            {props.body}
        </p>
    </article>
)

export default Comment