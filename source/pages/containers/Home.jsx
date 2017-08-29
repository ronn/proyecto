import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

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
        await this.props.actions.postNextPage()

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
                await this.props.actions.postNextPage()

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

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)