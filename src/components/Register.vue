<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
      <Form @submit="handleRegister" :validation-schema="schema">
        <div v-if="!successful">
            <div class="form-group">
            <label for="firstName">Firstname</label>
            <Field name="firstName" type="text" class="form-control" />
            <ErrorMessage name="firstName" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="lastName">Lastname</label>
            <Field name="lastName" type="text" class="form-control" />
            <ErrorMessage name="lastName" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="userName">Username</label>
            <Field name="userName" type="text" class="form-control" />
            <ErrorMessage name="userName" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <Field name="password" type="password" class="form-control" />
            <ErrorMessage name="password" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="repeatedPassword">Repeated Password</label>
            <Field name="repeatedPassword" type="password" class="form-control" />
            <ErrorMessage name="repeatedPassword" class="error-feedback" />
          </div>

          <div class="form-group">
            <button class="btn btn-primary btn-block" :disabled="loading">
              <span
                v-show="loading"
                class="spinner-border spinner-border-sm"
              ></span>
              Sign Up
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
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "Register",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
        firstName: yup
            .string()
            .required("Firstname is required!")
            .min(3, "Must be at least 3 characters!")
            .max(20, "Must be maximum 20 characters!"),
        lastName: yup
            .string()
            .required("Lastname is required!")
            .min(3, "Must be at least 3 characters!")
            .max(20, "Must be maximum 20 characters!"),
        userName: yup
            .string()
            .required("Username is required!")
            .min(3, "Must be at least 3 characters!")
            .max(20, "Must be maximum 20 characters!"),
        password: yup
            .string()
            .required("Password is required!")
            .min(5, "Must be at least 5 characters!")
            .max(40, "Must be maximum 40 characters!"),
        repeatedPassword: yup
            .string()
            .required("Password is required!")
            .min(5, "Must be at least 5 characters!")
            .max(40, "Must be maximum 40 characters!"),
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
      this.$router.push("/profile");
    }
  },
  methods: {
    handleRegister(user) {
      this.message = "";
      this.successful = false;
      this.loading = true;
      console.log(this.$store.dispatch("auth/register", user) + ' dispatch');
      this.$store.dispatch("auth/register", user).then(
        (data) => {
          this.message = data.message;
          this.successful = true;
          this.loading = false;
          this.$router.push("/login");
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
        }
      );
    },
  },
};
</script>

<style scoped>

</style>