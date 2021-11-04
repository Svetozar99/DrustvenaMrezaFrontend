import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth/';

class AuthService {
    login(user){
        return axios
            .post(API_URL + 'login', {
                userName: user.userName,
                password: user.password
            })
            .then(response => {
                if(response.data.value){
                    localStorage.setItem('user', JSON.stringify(response.data))
                }

                return response.data;
            })
    }

    logout(){
        localStorage.removeItem('user');
    }

    register(user){
        return axios.post(API_URL + 'register', {
            firstName: user.firstName,
            lastName: user.lastName,
            userName: user.userName,
            password: user.password,
            repeatedPassword: user.repeatedPassword
        })
    }
}

export default new AuthService();