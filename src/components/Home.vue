<template>
  <div class="container" v-for="p in posts" :key="p.id">
    <header class="jumbotron">
      <h5>{{p.userDTO.userName}}</h5>
      <h6>{{p.userDTO.lastName }} {{p.userDTO.firstName}}</h6>
      <h3>{{ p.body }}</h3>
    </header>
  </div>
</template>

<script>
import PostService from "../services/post.service";
export default {
  name: "Home",
  data() {
    return {
      posts: [],
    };
  },
  mounted() {
    PostService.getHomePage().then(
      (response) => {
        this.posts = response.data;
      },
      (error) => {
        this.posts =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  },
};
</script>