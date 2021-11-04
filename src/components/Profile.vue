<template>
  <div class="container">
    <header class="jumbotron">
      <h3>
        <strong>{{currentUser.userName}}</strong> Profile
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
export default {
  name: 'Profile',
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
  }
};
</script>