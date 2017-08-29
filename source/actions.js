import api from './api'

const setPost = post => ({
    type: 'SET_POST',
    payload: post
})

const setComments = comments => ({
    type: 'SET_COMMENTS',
    payload: comments
})

const setUser = user => ({
    type: 'SET_USER',
    payload: user
})

const postNextPage = () =>
    async (dispatch, getState) => {
        const state = getState()
        const currentPage = state.posts.page
        const posts = await api.posts.getList(currentPage)

        dispatch(setPost(posts))

        return posts
    }

const loadUser = userId =>
    async (dispatch) => {
        const user = await api.users.getSingle(userId)

        dispatch(setUser(user))

        return user
    }

const loadComments = postId =>
    async (dispatch) => {
        const comments = await api.posts.getCommments(postId)

        dispatch(setComments())

        return comments
    }

export default {
    setPost,
    setComments,
    setUser,
    postNextPage,
    loadUser,
    loadComments
}