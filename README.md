# Expense Tracker Frontend

![Vue.js](https://img.shields.io/badge/Vue.js-3.x-4FC08D?logo=vue.js) ![TypeScript](https://img.shields.io/badge/TypeScript-4.x-3178C6?logo=typescript) ![Vitest](https://img.shields.io/badge/Vitest-Unit%20Testing-6E9F18?logo=vitest) ![License](https://img.shields.io/badge/License-MIT-blue)

## Overview

This repository contains the frontend implementation of the **Expense Tracker App**, a web application designed to help users manage their expenses. The app allows users to register, log in, add, edit, delete, and filter expenses based on various time periods (last week, last month, last 3 months, or custom dates). The frontend is built with **Vue.js 3**, uses **TypeScript** for strict typing, and integrates with a backend API for data persistence.

---

## Features

- **User Authentication**: Register and log in with JWT-based authentication.
- **Expense Management**:
  - Add, edit, and delete expenses.
  - Filter expenses by period (week, month, 3 months) or custom date range.
  - Paginate and sort expenses by date or amount.
- **Categories**: Predefined expense categories (Groceries, Leisure, Electronics, Utilities, Clothing, Health, Others).
- **Type Safety**: Full TypeScript support for better maintainability.
- **Unit Tests**: Covered with Vitest for key components.
- **Modern UI**: Clean and responsive design with Vue Router for navigation.

---

## Tech Stack

- **Vue.js 3**: Frontend framework.
- **TypeScript**: For strict typing and maintainability.
- **Vue Router**: For client-side routing.
- **Axios**: For HTTP requests to the backend API.
- **Vitest**: For unit testing.
- **ESLint & Prettier**: For code linting and formatting.

---

## Prerequisites

- **Node.js**: Version 18.x or higher.
- **npm**: Version 9.x or higher.
- **Backend API**: Ensure the [Expense Tracker Backend](https://github.com/ivkelesh/expense-tracker-backend) is running on `http://localhost:3000`.

---

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/ivkelesh/expense-tracker-backend.git
   cd expense-tracker-frontend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   - The frontend assumes the backend API is running at `http://localhost:3000`. If the backend is hosted elsewhere, update the API URLs in the components (`src/views/*.vue`).

4. **Run the development server**:
   ```bash
   npm run serve
   ```
   The app will be available at `http://localhost:8080`.

---

## Usage

1. **Register**:

   - Navigate to `http://localhost:8080/register`.
   - Enter a username and password to create an account.

2. **Log In**:

   - Navigate to `http://localhost:8080/login`.
   - Log in with your credentials to receive a JWT token.

3. **Manage Expenses**:
   - After logging in, you will be redirected to `http://localhost:8080/expenses`.
   - Add new expenses, edit or delete existing ones, and filter them by date range or period.

---

## Running Tests

The frontend includes unit tests written with Vitest.

1. **Run unit tests**:

   ```bash
   npm run test:unit
   ```

2. **Example test**:
   - The `Expenses.vue` component is tested to ensure it fetches expenses on mount and handles adding new expenses (`tests/unit/Expenses.spec.ts`).

---

## Deployment

To deploy the frontend to a hosting platform like Vercel or Netlify:

1. **Build the project**:

   ```bash
   npm run build
   ```

   This generates a `dist` folder with the production-ready files.

2. **Deploy to Vercel**:

   - Install the Vercel CLI:
     ```bash
     npm install -g vercel
     ```
   - Deploy:
     ```bash
     vercel deploy
     ```
   - Follow the prompts to deploy the app.

3. **Ensure backend connectivity**:
   - Update the API URL in the components to point to the deployed backend (e.g., `https://your-backend-url`).

---

## Project Structure

```
expense-tracker-frontend/
├── src/
│   ├── views/
│   │   ├── Login.vue        # Login page
│   │   ├── Register.vue     # Registration page
│   │   └── Expenses.vue     # Expenses management page
│   ├── router/
│   │   └── index.ts         # Vue Router configuration
│   ├── App.vue              # Root component
│   └── main.ts              # Entry point
├── tests/
│   └── unit/
│       └── Expenses.spec.ts # Unit tests for Expenses.vue
├── public/
├── tsconfig.json            # TypeScript configuration
├── package.json             # Dependencies and scripts
└── README.md                # Project documentation
```

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit (`git commit -m "Add your feature"`).
4. Push to your branch (`git push origin feature/your-feature`).
5. Create a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact

For questions or feedback, please contact [ivan.keles@gmail.com](mailto:ivan.keles@gmail.com).
