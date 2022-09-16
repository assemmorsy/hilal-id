<template>
  <div class="">
    <div class="row justify-content-center align-items-center text-center">
      <h1 class="display-5 mb-4 bg-primary text-light pt-3 pb-4">Login</h1>
      <div class="col col-12 col-lg-6">
        <form @submit.prevent="handleSubmit" class="mx-5">
          <div class="mb-3 text-start">
            <label for="email" class="form-label">Email </label>
            <input
              type="email"
              class="form-control"
              id="email"
              v-model="user.email"
              required
              autocomplete="off"
            />
          </div>

          <div class="mb-3 text-start">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              id="exampleFormControlInput1"
              v-model="user.password"
              required
              autocomplete="off"
            />
          </div>

          <div class="text-danger fs-5" v-if="loginError && !loading">
            {{ loginError }}
          </div>
          <button
            v-if="!loading"
            class="btn btn-primary mb-3 fs-5 mt-3 px-5"
            type="submit"
          >
            Login
            <i class="bi bi-door-open"></i>
          </button>
          <button
            v-if="loading && !loginError"
            class="btn btn-primary mb-3 fs-5 mt-3 px-5"
            disabled
          >
            <div class="spinner-border text-secondary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import useLogin from "@/composables/useLogin";
import { useRouter } from "vue-router";
export default {
  setup() {
    const user = ref({
      email: "",
      password: "",
    });
    const router = useRouter();
    const { error: loginError, loading, login } = useLogin();
    const handleSubmit = async () => {
      await login(user.value);
      if (!loginError.value) {
        router.push({ name: "admin" });
      }
    };
    return { user, handleSubmit, loginError, loading };
  },
};
</script>

<style scoped></style>
