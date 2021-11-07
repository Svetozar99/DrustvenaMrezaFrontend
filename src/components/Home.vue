<template>
  <div class="container" v-for="p in posts" :key="p.id">
    <header class="jumbotron">
      <h5>{{p.userDTO.userName}}</h5>
      <h6>{{p.userDTO.lastName }} {{p.userDTO.firstName}}</h6>
      <h3>{{ p.body }}</h3>

      <button class="btn btn-danger btn-block" @click="getComments()">Show comments</button>
      
        <div v-if="showComments">
          <div v-for="c in p.comments" :key="c.bodyComment">
            <ul>
              <li>
                {{c.bodyComment}}
                <div v-for="co in c.commentDTOS" :key="co.id">
                  <ul id="commm">
                    <li>
                      {{co.bodyComment}}
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
      </div>

      <button class="btn btn-success btn-block" v-if="!show" @click="buttonAdd(p.id)">Add comment</button>
      <div v-if="show">
      <Form @submit="addComment" :validation-schema="schema">
        <div v-if="!successful">
            <div class="form-group">
            <Field name="bodyComment" type="text" class="form-control" />
            <ErrorMessage name="bodyComment" class="error-feedback" />
          </div>

          <div class="form-group">
            <button class="btn btn-success btn-block" :disabled="loading">
              <span
                v-show="loading"
                class="spinner-border spinner-border-sm"
              ></span>
              Add comment
            </button>
          </div>
        </div>
      </Form>
    </div>
    </header>
    
  </div>
</template>

<script>
import PostService from "../services/post.service";
import CommentService from "../services/comment.service";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "Home",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
        bodyComment: yup.string(),
        postId: this.idPosta,

    });
    return {
      successful: false,
      loading: false,
      message: "",
      schema,
      posts: [],
      comments: [],
      idPosta:0,
      idComment:0,
      show: false,
      showComments: false
    };
  },
  mounted() {
    PostService.getHomePage().then(
      (response) => {
        console.log(response.data)
        this.posts = response.data;
      },
      (error) => {
        alert(error)
        this.posts =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  },
  methods:{
    buttonAdd(id){
      this.idPosta = id;
      this.show = !this.show;
    },
    addComment(comment){
      this.message = "";
      this.successful = false;
      this.loading = true;
      CommentService.addComment(comment, this.idPosta, this.idComment).then(
        (data) => {
          this.message = data.message;
          this.successful = true;
          this.loading = false;
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
    getComments(){
      this.showComments = !this.showComments;
    }
  }
};
</script>

<style scoped>
  #commm{
    background-color: blueviolet;
  }
</style>