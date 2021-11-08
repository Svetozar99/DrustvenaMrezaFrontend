<template>
    <div class="container">
    <header v-if="user != null" class="jumbotron">
      <h3>
        <strong>{{user.userName}}</strong> Profile
      </h3>
    </header>
    <!-- <p>
      <strong>Token:</strong>
      {{currentUser.value.substring(0, 20)}} ... {{currentUser.value.substr(currentUser.value.length - 20)}}
    </p> -->
    <!-- <p>
      <strong>Id:</strong>
      {{user.id}}
    </p> -->
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
import UserService from '../services/user.service';
export default {
    name: 'OneUser',
    // props: ['id'],
    data(){
        return {
            user: null,
            isSend:false,
            requests:[]
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
    }
}
</script>

<style scoped>

</style>