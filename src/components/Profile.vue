<template>
  <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/followees" class="nav-link">
            <font-awesome-icon icon="home" /> Followees {{this.followees.length}}
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/followers" class="nav-link">
            <font-awesome-icon icon="home" /> Followers {{this.followers.length}}
          </router-link>
        </li>
      </div>

  <div class="container">
    <header v-if="user != null" class="jumbotron">
      <h3>
        <strong>{{user.userName}}</strong> Profile
      </h3>
    </header>
    <p>
      <strong>Id:</strong>
      {{currentUser.idUser}}
    </p>
    <!-- <p>
      <strong>Email:</strong>
      {{currentUser.email}}
    </p>
    <strong>Authorities:</strong>
    <ul>
      <li v-for="role in currentUser.roles" :key="role">{{role}}</li>
    </ul> -->
  </div>
</template>

<script>
import UserService from "../services/user.service";
import FollowingService from '../services/following.service';


export default {
  name: 'Profile',
  data(){
    return {
      user: null,
      followees:[],
      followers:[]
    }
  },
  computed: {
    currentUser() {
        console.log(this.$store.state.auth.user);
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
    UserService.getProfileUser().then(
      (response) => {
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
    FollowingService.getFollowees().then(
      (response) => {
        this.followees = response.data;
        console.log(this.followees.length + ' followees')
      },
      (error) => {
        this.followees =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
    FollowingService.getFollowers().then(
      (response) => {
        this.followers = response.data;
      },
      (error) => {
        this.followers =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  }
};
</script>