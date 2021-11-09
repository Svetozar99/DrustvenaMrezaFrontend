<template>
    <h3>Followees: {{this.followees.length}}</h3>
    <div v-for="f in followees" :key="f.id" class="grid">
        <div class="g-col-6">{{f.receiver.userName}}</div>
        <div class="g-col-6">{{f.receiver.firstName }} {{ f.receiver.lastName}}</div>
        <p>----------------------------------------------------------</p>
    </div>
</template>

<script>
import FollowingService from '../services/following.service';
export default {
    name:'Followees',
    data(){
        return{
            followees:[]
        }
    },
    mounted(){
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
    }
}
</script>

<style scoped>

</style>