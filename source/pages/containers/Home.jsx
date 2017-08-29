import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'

import api from '../../api'

import Post from '../../posts/containers/Post'
import Loading from '../../shared/components/Loading'

import styles from './Page.css'

import actions from '../../actions'

class Home extends Component{

    constructor(props){
        super(props)

        this.state = {
            loading: true
        }

        this.handleScroll = this.handleScroll.bind(this)
    }

    componentDidMount(){
        this.initialFetch()

        window.addEventListener('scroll', this.handleScroll)
    }

    componentwillunmount(){
        window.removeEventListener('scroll', this.handleScroll)
    }

    async initialFetch(){
        const posts = await api.posts.getList(this.props.page)

        this.props.dispatch(
            actions.setPost(posts)
        )

        this.setState({ loading: false })
    }

    handleScroll(){
        if (this.state.loading) return null

        const scrolled = window.scrollY
        const viewportHeight = window.innerHeight
        const fullHeight = document.body.clientHeight

        if (!(scrolled + viewportHeight + 30 >= fullHeight))
            return null

        return this.setState({ loading: true }, async () => {
            try {
                const posts = await api.posts.getList(this.props.page)

                this.props.dispatch(
                    actions.setPost(posts)
                )

                this.setState({
                    loading: false
                })
            }catch (error){
                console.error(error)
                this.setState({ loading: false })
            }
        })
    }

    render(){
        return(
            <section name="Home" className={styles.section}>
                <h3>
                    <FormattedMessage id="title.home" />
                </h3>
                <section className={styles.list}>
                    {this.props.posts
                        .map(post => <Post key={post.id} {...post} />)
                    }
                    {this.state.loading && (
                        <Loading />
                    )}
                </section>
            </section>
        )
    }
}

const mapStateToProps = state => ({
    posts: state.posts.entities,
    page: state.posts.page
})

/* function mapDispatchToProps(dispatch, props) {
    return {
        dispatch
    }
} */

export default connect(mapStateToProps)(Home)