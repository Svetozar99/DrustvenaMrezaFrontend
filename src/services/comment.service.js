import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/comment/';

class CommentService{

    getCommentByPost(id){
        return axios.get(API_URL + id,  { headers: authHeader() })
    }

    addComment(comment, idPosta, idComment){
        return axios
            .post(API_URL, {
                postId: idPosta,
                parentComment: idComment,
                bodyComment: comment.bodyComment
            }, { headers: authHeader() })
    }
}

export default new CommentService();