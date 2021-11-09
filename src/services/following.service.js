import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/following/';

class FollowingService{

    getFollowees(){
        return axios.get(API_URL + 'followees', { headers: authHeader() });
    }

    getFollowers(){
        return axios.get(API_URL + 'followers', { headers: authHeader() });
    }
}

export default new FollowingService();