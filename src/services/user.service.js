import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/user/';

class UserService {
    getProfileUser(){
        return axios.get(API_URL + 'profile', { headers: authHeader() });
    }

    search(value){
        return axios.get(API_URL + 'search/' + value, { headers: authHeader() })
    }

    getOne(id){
        return axios.get(API_URL + id, { headers: authHeader() })
    }
}

export default new UserService();