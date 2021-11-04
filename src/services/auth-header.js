export default function authHeader(){
    let user = JSON.parse(localStorage.getItem('user'));
    if(user && user.value){
        return { 'X-Auth-Token': user.value };
    }else {
        return {};
    }
}