<template>
  <div class="col-md-12">
      <Form @submit="addPost" :validation-schema="schema">
        <div v-if="!successful">
            <div class="form-group">
            <label for="body">Body</label>
            <Field name="body" type="text" class="form-control" />
            <ErrorMessage name="body" class="error-feedback" />
          </div>
          
          <div class="form-group">
            <button class="btn btn-primary btn-block" :disabled="loading">
              <span
                v-show="loading"
                class="spinner-border spinner-border-sm"
              ></span>
              Add
            </button>
          </div>
        </div>
      </Form>

      <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >
        {{ message }}
      </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import PostService from "../services/post.service";

export default {
  name: "AddPost",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
        body: yup.string()
    });

    return {
      successful: false,
      loading: false,
      message: "",
      schema,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/add-post");
    }
  },
  methods: {
    addPost(post) {
      this.loading = true;
      this.message = "";
      this.successful = false;
      PostService.addPost(post).then(
        (data) => {
          console.log(data);
          this.message = data.message;
          this.successful = true;
          this.loading = false;
          this.$router.push("/home");
        },
        (error) => {
          this.loading = false;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
            this.successful = false;
            this.loading = false;
        }
      );
      // this.$store.dispatch("post", post).then(
      //   (data) => {
      //     console.log(data);
      //     this.message = data.message;
      //     this.successful = true;
      //     this.loading = false;
      //     this.$router.push("/home");
      //   },
      //   (error) => {
      //     this.loading = false;
      //     this.message =
      //       (error.response &&
      //         error.response.data &&
      //         error.response.data.message) ||
      //       error.message ||
      //       error.toString();
      //       this.successful = false;
      //       this.loading = false;
      //   }
      // );
    },
  },
};
</script>

<style scoped>

</style>