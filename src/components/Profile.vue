<template>
  <div class="container">
    <header v-if="user != null" class="jumbotron">
      <h3>
        <strong>{{user.userName}}</strong> Profile
      </h3>
    </header>
    <p>
      <strong>Token:</strong>
      {{currentUser.value.substring(0, 20)}} ... {{currentUser.value.substr(currentUser.value.length - 20)}}
    </p>
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


export default {
  name: 'Profile',
  data(){
    return {
      user: null
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
  }
};
</script>