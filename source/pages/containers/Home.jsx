import React, {Component} from "react";

import api from "../../api.js";

import Post from "../../posts/containers/Post.jsx";
import Loading from "../../shared/components/Loading.jsx";
import Header from "../../shared/components/Header.jsx"

class Home extends Component{

    constructor(props){
        super(props)

        this.state = {
            page: 1,
            posts: [],
            loading: true
        }

        this.handleScroll = this.handleScroll.bind(this)
    }

    async componentDidMount(){
        const posts = await api.posts.getList(this.state.page)

        this.setState({
            posts,
            page: this.state.page + 1,
            loading: false
        })

        window.addEventListener('scroll', this.handleScroll)
    }

    componentwillunmount(){
        window.removeEventListener('scroll', this.handleScroll)
    }

    handleScroll(event){
        if (this.state.loading) return null

        const scrolled = window.scrollY
        const viewportHeight = window.innerHeight
        const fullHeight = document.body.clientHeight

        if (!(scrolled + viewportHeight + 30 >= fullHeight))
            return null

        this.setState({ loading: true }, async () => {
            try {
                const posts = await api.posts.getList(this.state.page)

                this.setState({
                    posts: this.state.posts.concat(posts),
                    page: this.state.page + 1,
                    loading: false
                })
            }catch (error){
                console.error(error)
                this.setState({ loading:false })
            }
        })
    }

    render(){
        return(
            <section name="Home">
                <Header/>

                <section>
                    {this.state.posts
                        .map(post => <Post key={post.id} {...post}/>)
                    }
                    {this.state.loading && (
                        <Loading/>
                    )}
                </section>
            </section>
        )
    }
}

export default Home