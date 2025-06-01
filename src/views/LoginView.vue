<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
      <form @submit.prevent="login" class="space-y-4">
        <div>
          <input
            v-model="credentials.username"
            type="text"
            placeholder="Username"
            required
            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <input
            v-model="credentials.password"
            type="password"
            placeholder="Password"
            required
            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          class="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Login
        </button>
      </form>
      <p class="text-center mt-4 text-gray-600">
        Don't have an account?
        <router-link to="/register" class="text-blue-600 hover:underline"
          >Register</router-link
        >
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

interface Credentials {
  username: string;
  password: string;
}

export default defineComponent({
  name: "LoginView",
  data(): { credentials: Credentials } {
    return {
      credentials: { username: "", password: "" },
    };
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post(
          "http://localhost:3000/auth/login",
          this.credentials
        );
        localStorage.setItem("token", response.data.access_token);
        this.router.push("/expenses");
      } catch (error) {
        alert("Invalid credentials");
      }
    },
  },
});
</script>
