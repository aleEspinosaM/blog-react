import {
  ARTICLE_PAGE_UNLOADED,
  ARTICLE_PAGE_LOADED,
  ADD_COMMENT,
  DELETE_COMMENT
} from '../constants/article';


export default (state = {}, action) => {
  switch (action.type) {
    case ARTICLE_PAGE_LOADED:
      // console.log("ARTICLEPAGELOADED:", action.payload)
      return {
        ...state,
        article: action.payload[0].article,
        comments: action.payload[1].comments
      }
    case ARTICLE_PAGE_UNLOADED:
      return {}
    case ADD_COMMENT:
      return {
        ...state,
        commentErrors: action.error ? action.payload.errors : null,
        comments: action.error ?
          null :
          (state.comments || []).concat([action.payload.comment])
      }
    case DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(comment => comment.id !== action.commentId)
      }
    default:
      return state;
  }
}