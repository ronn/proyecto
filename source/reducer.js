import { combineReducers } from 'redux-immutable'
import { fromJS, Map as map } from 'immutable'

const SET_POST = 'SET_POST'
const SET_COMMENTS = 'SET_COMMENTS'
const SET_USER = 'SET_USER'

const initialState = fromJS({
    posts: {
        page: 1,
        entities: {}
    },
    comments: {},
    users: {}
})

const postsPageReducer = (state = initialState.get('posts').get('page'), action = {}) => {
    switch (action.type){
    case SET_POST:
        return state + 1
    default:
        return state
    }
}

const postEntitiesReducer = (state = initialState.get('posts').get('entities'), action = {}) => {
    switch (action.type){
    case SET_POST:
        return action.payload
            .reduce(
                (posts, post) => posts.set(post.id, map(post)),
                state
            )
    default:
        return state
    }
}

const postReducer = combineReducers({
    page: postsPageReducer,
    entities: postEntitiesReducer
})

const commentsReducer = (state = initialState.get('comments'), action = {}) => {
    switch (action.type){
    case SET_COMMENTS:
        return action.payload !== undefined
            ? action.payload.reduce(
                (comments, comment) => comment.set(comment.id, map(comment)),
                state
            )
            : state
    default:
        return state
    }
}

const userReducer = (state = initialState.get('users'), action = {}) => {
    switch (action.type){
    case SET_USER:
        return state.set(action.payload.id, map(action.payload))
    default:
        return state
    }
}

const reducer = combineReducers({
    posts: postReducer,
    commets: commentsReducer,
    users: userReducer
})

export default reducer