<template>
  <div class="min-h-screen bg-gray-100 p-4">
    <div class="max-w-4xl mx-auto">
      <h2 class="text-3xl font-bold text-gray-800 mb-6 text-center">
        Expenses
      </h2>
      <div class="bg-white p-6 rounded-lg shadow-lg mb-6">
        <form @submit.prevent="addExpense" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                v-model.number="newExpense.amount"
                type="number"
                step="0.01"
                placeholder="Amount"
                required
                class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <select
                v-model="newExpense.category"
                required
                class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option
                  v-for="category in categories"
                  :key="category"
                  :value="category"
                >
                  {{ category }}
                </option>
              </select>
            </div>
            <div>
              <input
                v-model="newExpense.date"
                type="date"
                required
                class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <input
                v-model="newExpense.description"
                type="text"
                placeholder="Description"
                class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <button
            type="submit"
            class="w-full md:w-auto bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Add Expense
          </button>
        </form>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <div class="flex flex-col md:flex-row gap-4 mb-6 flex-wrap">
          <select
            v-model="filters.period"
            @change="fetchExpenses"
            class="w-full md:w-40 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All</option>
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="3months">Last 3 Months</option>
          </select>
          <input
            v-model="filters.startDate"
            type="date"
            @change="fetchExpenses"
            class="w-full md:w-40 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            v-model="filters.endDate"
            type="date"
            @change="fetchExpenses"
            class="w-full md:w-40 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            v-model.number="filters.page"
            type="number"
            min="1"
            placeholder="Page"
            @change="fetchExpenses"
            class="w-full md:w-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            v-model.number="filters.limit"
            type="number"
            min="1"
            placeholder="Limit"
            @change="fetchExpenses"
            class="w-full md:w-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            v-model="filters.sortBy"
            @change="fetchExpenses"
            class="w-full md:w-40 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="date">Date</option>
            <option value="amount">Amount</option>
          </select>
          <select
            v-model="filters.sortOrder"
            @change="fetchExpenses"
            class="w-full md:w-40 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
        <ul class="space-y-4">
          <li
            v-for="expense in expenses.data"
            :key="expense.id"
            class="p-4 bg-gray-50 rounded-lg shadow-sm flex flex-col md:flex-row justify-between items-center"
          >
            <div>
              <p class="text-gray-700">
                {{ expense.amount.toFixed(2) }} - {{ expense.category }}
              </p>
              <p class="text-sm text-gray-500">
                {{ expense.date.toLocaleDateString() }}
              </p>
              <p v-if="expense.description" class="text-sm text-gray-500">
                {{ expense.description }}
              </p>
            </div>
            <div class="flex gap-2 mt-2 md:mt-0">
              <button
                @click="editExpense(expense)"
                class="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 transition duration-200"
              >
                Edit
              </button>
              <button
                @click="deleteExpense(expense.id)"
                class="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition duration-200"
              >
                Delete
              </button>
            </div>
          </li>
        </ul>
        <div class="flex justify-center mt-6 gap-4">
          <button
            @click="changePage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="bg-gray-300 text-gray-800 p-2 rounded-lg hover:bg-gray-400 transition duration-200 disabled:opacity-50"
            :class="{ 'cursor-not-allowed': currentPage === 1 }"
          >
            Previous
          </button>
          <span class="text-gray-700"
            >Page {{ currentPage }} of {{ expenses.meta.totalPages }}</span
          >
          <button
            @click="changePage(currentPage + 1)"
            :disabled="currentPage === expenses.meta.totalPages"
            class="bg-gray-300 text-gray-800 p-2 rounded-lg hover:bg-gray-400 transition duration-200 disabled:opacity-50"
            :class="{
              'cursor-not-allowed': currentPage === expenses.meta.totalPages,
            }"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

interface Expense {
  id: number;
  amount: number;
  category: string;
  date: Date;
  description?: string;
  userId: number;
}

interface Filters {
  period?: "week" | "month" | "3months";
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
  sortBy?: "date" | "amount";
  sortOrder?: "asc" | "desc";
}

interface ExpensesResponse {
  data: Expense[];
  meta: {
    total: number;
    page: number;
    totalPages: number;
  };
}

export default defineComponent({
  name: "ExpensesView",
  setup() {
    const router = useRouter();
    const expenses = ref<ExpensesResponse>({
      data: [],
      meta: { total: 0, page: 1, totalPages: 1 },
    });
    const filters = ref<Filters>({
      page: 1,
      limit: 10,
      sortBy: "date",
      sortOrder: "desc",
    });
    const newExpense = ref<Partial<Expense>>({
      amount: 0,
      category: "",
      date: new Date(),
    });
    const currentPage = ref(1);
    const categories = [
      "Groceries",
      "Leisure",
      "Electronics",
      "Utilities",
      "Clothing",
      "Health",
      "Others",
    ] as const;

    const fetchExpenses = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }
      try {
        const response = await axios.get("http://localhost:3000/expenses", {
          params: filters.value,
          headers: { Authorization: `Bearer ${token}` },
        });
        expenses.value = response.data;
        currentPage.value = filters.value.page || 1;
      } catch (error) {
        console.error("Failed to fetch expenses:", error);
      }
    };

    const addExpense = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        await axios.post("http://localhost:3000/expenses", newExpense.value, {
          headers: { Authorization: `Bearer ${token}` },
        });
        newExpense.value = { amount: 0, category: "", date: new Date() };
        await fetchExpenses();
      } catch (error) {
        console.error("Failed to add expense:", error);
      }
    };

    const editExpense = async (expense: Expense) => {
      const updated = { ...expense };
      updated.amount = parseFloat(
        prompt("New amount:", expense.amount.toString()) || "0"
      );
      updated.category =
        prompt("New category:", expense.category) || expense.category;
      updated.date = new Date(
        prompt(
          "New date (YYYY-MM-DD):",
          expense.date.toISOString().split("T")[0]
        ) || ""
      );
      updated.description =
        prompt("New description:", expense.description || "") || undefined;
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        await axios.put(
          `http://localhost:3000/expenses/${expense.id}`,
          updated,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        await fetchExpenses();
      } catch (error) {
        console.error("Failed to update expense:", error);
      }
    };

    const deleteExpense = async (id: number) => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        await axios.delete(`http://localhost:3000/expenses/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        await fetchExpenses();
      } catch (error) {
        console.error("Failed to delete expense:", error);
      }
    };

    const changePage = (page: number) => {
      if (page > 0 && page <= expenses.value.meta.totalPages) {
        filters.value.page = page;
        fetchExpenses();
      }
    };

    fetchExpenses();

    return {
      expenses,
      filters,
      newExpense,
      categories,
      fetchExpenses,
      addExpense,
      editExpense,
      deleteExpense,
      changePage,
      currentPage,
    };
  },
});
</script>
