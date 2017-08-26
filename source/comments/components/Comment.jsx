import React from 'react'
import { FormattedHTMLMessage } from 'react-intl'

const Comment = props => (
    <article id={`comment-${props.id}`}>
        <div>
            <FormattedHTMLMessage
                id="comment.meta.author"
                values={{
                    email: props.email,
                    name: props.name
                }}
            />
        </div>

        <p>
            {props.body}
        </p>
    </article>
)

export default Comment