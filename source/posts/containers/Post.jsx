import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import styles from './Post.css'

import actions from '../../actions'

class Post extends Component{
    constructor(props){
        super(props)

        this.state = {
            loading: true,
        }
    }

    componentDidMount(){
        this.initialFetch()
    }

    async initialFetch(){
        if (this.props.user && !!this.props.comments.size > 0)
            return this.setState({ loading: false })

        await Promise.all([
            this.props.actions.loadUser(this.props.iserId),
            this.props.actions.loadComments(this.props.id)
        ])

        return this.setState({ loading: false })
    }

    render() {
        return(
            <article id={`post-${this.props.id}`} className={styles.post}>
                <h2 className={styles.title}>
                    <Link to={`/post/${this.props.id}`}>
                        {this.props.title}
                    </Link>
                </h2>
                <p>
                    {this.props.body}
                </p>
                {!this.state.loading && (
                    <div className={styles.meta}>
                        <Link to={`/user/${this.props.user != null ? this.props.user.id : 0}`} className={styles.user}>
                            {this.props.user != null ? this.props.user.get('name') : ''}
                        </Link>

                        <span className={styles.comments}>
                            <FormattedMessage
                                id="post.meta.comments"
                                values={{
                                    amount: this.props.comments.size
                                }}
                            />
                        </span>
                        <Link to={`/post/${this.props.id}`}>
                            <FormattedMessage id="post.meta.readMore" />
                        </Link>
                    </div>
                )}
            </article>
        )
    }
}

const mapStateToProps = (state, props) => ({
    comments: state.get('comments') !== undefined
        ? state.get('comments').filter(comment => comment.get('postId') === props.id) : [],
    user: state.get('users').get(props.userId)
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Post)