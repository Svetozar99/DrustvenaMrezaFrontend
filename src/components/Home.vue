<template>
  <div class="container" v-for="p in posts" :key="p.id">
    <header class="jumbotron">
      <h5>{{p.userDTO.userName}}</h5>
      <h6>{{p.userDTO.lastName }} {{p.userDTO.firstName}}</h6>
      <h3>{{ p.body }}</h3>

      <div>
        <button class="btn btn-danger btn-block" @click="getComments()">Show comments</button>
        <button class="btn btn-success btn-block" v-if="!show" @click="buttonAdd(p.id)">Add comment</button>
      </div>
      
        <div v-if="showComments">
          <div class="d-block p-2 bg-primary text-white" v-for="c in p.comments" :key="c.bodyComment">
            <ul id="co">
              <li>
                {{c.bodyComment}}
                <div class="d-block p-2 bg-dark text-white" v-for="co in c.commentDTOS" :key="co.id">
                  <ul id="commm">
                    <li class="d-inline-flex p-2 bd-highlight">
                      {{co.bodyComment}}
                    </li>
                  </ul>
                </div>
              </li>
              <button style="height:40px; width:50%;" class="btn btn-warning btn-block" v-if="!show" @click="buttonAdd2(c.id)">Reply</button>
            </ul>
          </div>
      </div>

      
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

    <div v-if="show2">
      <Form @submit="replyOnComm" :validation-schema="schema">
        <div v-if="!successful">
            <div class="form-group">
            <Field name="bodyComment" type="text" class="form-control" />
            <ErrorMessage name="bodyComment" class="error-feedback" />
          </div>

          <div class="form-group">
            <button class="btn btn-warning btn-block" :disabled="loading">
              <span
                v-show="loading"
                class="spinner-border spinner-border-sm"
              ></span>
              Reply
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
        commentId: this.idComment,

    });
    return {
      successful: false,
      loading: false,
      message: "",
      schema,
      posts: [],
      comments: [],
      idPosta:0,
      commentId:0,
      show: false,
      show2:false,
      showComments: false
    };
  },
  mounted() {
    PostService.getHomePage().then(
      (response) => {
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
    buttonAdd2(id){
      console.log(id + " id komentara")
      this.commentId = id;
      this.show2 = !this.show2;
    },
    addComment(comment){
      this.message = "";
      this.successful = false;
      this.loading = true;
      CommentService.addComment(comment, this.idPosta).then(
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
    },
    replyOnComm(comment){
      this.message = "";
      this.successful = false;
      this.loading = true;
      CommentService.replyOnComment(comment, this.commentId).then(
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
  }
};
</script>

<style scoped>
</style>