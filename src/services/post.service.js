import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/post/';

class PostService {
    getHomePage(){
        return axios.get(API_URL + 'home-page', { headers: authHeader() });
    }

    addPost(post){
        return axios
            .post(API_URL, {
                body: post.body
            } , { headers: authHeader() })
    }
}

export default new PostService();