<template>
    <div class="container">
    <header v-if="user != null" class="jumbotron">
      <h3>
        <strong>{{user.userName}}</strong> Profile
      </h3>

      <div>
        <!-- v-for="r in isend" :key="r.id" -->
        <div>
          <!-- v-if="r.receiver.id != user.id" -->
          <button class="btn btn-success btn-block" @click="sendRequest(user.userName)">Send Request</button>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import axios from 'axios'
import UserService from '../services/user.service';
import RequstFollowService from '../services/follow-request.service';
export default {
    name: 'OneUser',
    created(){
        let user = JSON.parse(localStorage.getItem('user'));
        axios.defaults.headers['X-Auth-Token'] = `${user.value}`
        this.requestISender();
    },
    data(){
        return {
            user: null,
            isSend:false,
            requests:[],
            isend: []
        }
    },
    mounted(){
        UserService.getOne(this.$route.params.id).then(
                (response) => {
                    console.log(response.data)
                    this.user = response.data;
                },
                (error) => {
                    this.user = 
                    (error.response && 
                        error.response.data && 
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                }
            );
    },
    methods:{
      sendRequest(uname){
        RequstFollowService.sendRequest(uname).then(
          (response) => {
                    console.log(response.data)
                    this.requests = response.data;
                },
                (error) => {
                    this.requests = 
                    (error.response && 
                        error.response.data && 
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                }
            );
      },
      requestISender(){
        RequstFollowService.requestISend().then(
          (response) => {
            console.log(response.data);
            this.isend = response.data;
          },
          (error) => {
            this.isend = 
            (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
          }
        )
      }
    }
}
</script>

<style scoped>

</style>