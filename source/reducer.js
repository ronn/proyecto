import { combineReducers } from 'redux'

const SET_POST = 'SET_POST'
const SET_COMMENTS = 'SET_COMMENTS'
const SET_USER = 'SET_USER'

const initialState = {
    posts: {
        page: 1,
        entities: []
    },
    comments: [],
    users: {}
}

const postsPageReducer = (state = initialState.posts.page, action = {}) => {
    switch (action.type){
    case SET_POST:
        return state + 1
    default:
        return state
    }
}

const postEntitiesReducer = (state = initialState.posts.entities, action = {}) => {
    switch (action.type){
    case SET_POST:
        return state.concat(action.payload)
    default:
        return state
    }
}

const postReducer = combineReducers({
    page: postsPageReducer,
    entities: postEntitiesReducer
})

const commentsReducer = (state = initialState.comments, action = {}) => {
    switch (action.type){
    case SET_COMMENTS:
        return state.concat(action.payload)
    default:
        return state
    }
}

const userReducer = (state = initialState.users, action = {}) => {
    switch (action.type){
    case SET_USER:
        return Object.assign({}, state, {
            [action.payload.id]: action.payload
        })
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