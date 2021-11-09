<template>
    <h3>Followers: {{this.followers.length}}</h3>
    <div v-for="f in followers" :key="f.id" class="grid">
        <div class="g-col-6">{{f.sender.userName}}</div>
        <div class="g-col-6">{{f.sender.firstName }} {{ f.sender.lastName}}</div>
        <p>----------------------------------------------------------</p>
    </div>
</template>

<script>
import FollowingService from '../services/following.service';
export default {
    name:'Followers',
    data(){
        return{
            followers:[]
        }
    },
    mounted(){
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
}
</script>

<style scoped>

</style>