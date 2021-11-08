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
import UserService from './services/user.service';
export default {
  name: 'App',
  data(){
    return{
      users:[],
      show: false,
      searchV:''
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
