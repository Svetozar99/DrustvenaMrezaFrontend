import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/request/';

class RequstFollowService {

    sendRequest(userName){
        return axios.post(API_URL + userName, { headers: authHeader() });
    }

    requestISend(){
        return axios.get(API_URL + 'isend', { headers: authHeader() });
    }

    requestForMe(){
        return axios.get(API_URL, { headers: authHeader() });
    }

    acceptRequest(sender){
        return axios.post(API_URL +'accept/' + sender, { headers: authHeader()})
    }

    rejectRequest(id){
        return axios.delete(API_URL + 'reject/' +id, { headers: authHeader()} )
    }
}

export default new RequstFollowService();