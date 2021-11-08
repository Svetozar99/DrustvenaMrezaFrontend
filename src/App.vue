<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <a href="/home" class="navbar-brand">Instagram</a>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/home" class="nav-link">
            <font-awesome-icon icon="home" /> Home
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/add-post" class="nav-link">
            Add Post
          </router-link>
        </li>
        <li v-if="token" class="nav-item">
            <a @click="showRequests()" class="nav-link"><font-awesome-icon icon="user-friends" /> Requests {{this.myRequests.length}}</a>
        </li>
      </div>

      

    <form>
        <input type="text" v-model="searchV" @keyup="search(this.searchV)" class="form-control">
    </form>

       <div v-if="currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/profile" class="nav-link">
            <font-awesome-icon icon="user" />
            {{ currentUser.userName }}
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt" /> LogOut
          </a>
        </li>
      </div>

      <div v-if="!currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/register" class="nav-link">
            <font-awesome-icon icon="user-plus" /> Sign Up
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">
            <font-awesome-icon icon="sign-in-alt" /> Login
          </router-link>
        </li>
      </div>

     
    </nav>

    <div v-if="showRequest">
        <div style="display:inline-block" v-for="re in myRequests" :key="re.id">
          <h2>{{re.sender.userName}}</h2>
          <button class="btn btn-success" @click="acceptRequest(re.sender.userName)">Accept</button>
          <button class="btn btn-danger" @click="rejectRequest(re.id)">Reject</button>

        </div>
      </div>

      <div>
      <div v-for="u in users" :key="u.id">
        <router-link :to="{ name: 'OneUser', params: { id: u.id }}">
          <h2>{{u.firstName}} {{u.lastName}}</h2>
        </router-link>
      </div>
    </div>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import UserService from './services/user.service';
import RequstFollowService from './services/follow-request.service';
export default {
  name: 'App',
  created(){
    let user = JSON.parse(localStorage.getItem('user'));
    if(user){
      axios.defaults.headers['X-Auth-Token'] = `${user.value}`
      this.token = true;
    }
    this.requestForMe();
  },
  data(){
    return{
      users:[],
      show: false,
      searchV:'',
      myRequests:[],
      token: false,
      showRequest: false
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    },
    search(value){
      this.searchV = value;
      console.log(JSON.stringify(this.searchV) + " value")
      UserService.search(this.searchV).then(
        (response) => {
          console.log(response.data)
          this.users = response.data;
          this.show = true
        },
        (error) => {
          this.users = 
            (error.response &&
            error.response.data && 
            error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
    requestForMe(){
      RequstFollowService.requestForMe().then(
        (response) => {
          console.log(response.data);
          
          this.myRequests = response.data;
          console.log(this.myRequests.length + ' broj yahtjeva');

        },
        (error) => {
          this.myRequests =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        }
      );
    },
    showRequests(){
      this.showRequest = !this.showRequest
    },
    acceptRequest(sender){
      RequstFollowService.acceptRequest(sender).then(
        (data) => {
          this.message = data.message;
          this.$router.push("/home");
        },
        (error) => {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.successful = false;
          this.loading = false;
          this.$router.push("/home");
        }
      )
    },
    rejectRequest(id){
      RequstFollowService.rejectRequest(id).then(
        (data) => {
          this.message = data.message;
          this.$router.push("/home");
        },
        (error) => {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.successful = false;
          this.loading = false;
          this.$router.push("/home");
        }
      )
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
h2{
  color: red;
}
</style>
