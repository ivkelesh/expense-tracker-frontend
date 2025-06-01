import { mount } from "@vue/test-utils";
import Expenses from "../../src/views/Expenses.vue";
import axios from "axios";

jest.mock("axios");

describe("Expenses.vue", () => {
  beforeEach(() => {
    localStorage.setItem("token", "mock-token");
  });

  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("fetches expenses on mount", async () => {
    const expenses = {
      data: [
        {
          id: 1,
          amount: 100,
          category: "Groceries",
          date: new Date("2025-06-01"),
          userId: 1,
        },
      ],
      meta: { total: 1, page: 1, totalPages: 1 },
    };
    axios.get.mockResolvedValue({ data: expenses });

    const wrapper = mount(Expenses, {
      global: {
        mocks: { $axios: axios },
      },
    });

    await wrapper.vm.$nextTick();
    expect(axios.get).toHaveBeenCalledWith(
      "http://localhost:3000/expenses",
      expect.objectContaining({
        params: { page: 1, limit: 10, sortBy: "date", sortOrder: "desc" },
      })
    );
    expect(wrapper.vm.expenses).toEqual(expenses);
  });

  it("adds a new expense", async () => {
    axios.post.mockResolvedValue({});
    axios.get.mockResolvedValue({
      data: { data: [], meta: { total: 0, page: 1, totalPages: 1 } },
    });

    const wrapper = mount(Expenses, {
      global: {
        mocks: { $axios: axios },
      },
    });

    await wrapper.vm.addExpense();
    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:3000/expenses",
      expect.objectContaining({
        amount: 0,
        category: "",
        date: expect.any(Date),
      }),
      expect.objectContaining({
        headers: { Authorization: "Bearer mock-token" },
      })
    );
  });
});
