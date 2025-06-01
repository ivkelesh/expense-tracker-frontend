<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">
        Register
      </h2>
      <form @submit.prevent="register" class="space-y-4">
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
          class="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition duration-200"
        >
          Register
        </button>
      </form>
      <p class="text-center mt-4 text-gray-600">
        Already have an account?
        <router-link to="/login" class="text-blue-600 hover:underline"
          >Login</router-link
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
  name: "RegisterView",
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
    async register() {
      try {
        await axios.post(
          "http://localhost:3000/auth/register",
          this.credentials
        );
        this.router.push("/login");
      } catch (error) {
        alert("Registration failed");
      }
    },
  },
});
</script>
