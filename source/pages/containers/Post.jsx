import React, { Component } from 'react';

import PostBody from '../../posts/containers/Post'
import Loading from '../../shared/components/Loading'
import Comment from '../../comments/components/Comment'

import api from '../../api';

class Post extends Component{

    constructor(props){
        super(props)

        this.state = {
            loading: true,
            user: {},
            post: {},
            comments: []
        }
    }

    componentDidMount(){
        this.initialFetch()
    }

    async initialFetch(){
        const [
            post,
            comments
        ] = await Promise.all([
            api.posts.getSingle(this.props.match.params.id),
            api.posts.getCommments(this.props.match.params.id)
        ])

        const user = await api.users.getSingle(post.userId)

        return this.setState({
            loading: false,
            post,
            user,
            comments
        })
    }

    render(){
        if(this.state.loading){
            return <Loading />
        }

        return(
            <section name="post">
                <PostBody
                    {...this.state.post}
                    user={this.state.user}
                    comments={this.state.comments}
                />

                <section>
                    {this.state.comments
                        .map(comment => (
                            <Comment key={comment.id} {...comment} />
                        ))
                    }
                </section>
            </section>
        )
    }
}

export default Post