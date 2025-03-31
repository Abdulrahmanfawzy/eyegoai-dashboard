# Employee Attendance - Intern Project

A simple React application built as an intern project to display employee attendance with filtering and pagination features.

## Features

- Fetch employee and attendance data from a mock API
- Filter employees by status: All, Present, Absent
- Paginate through records (10 employees per page)

## Prerequisites

- **Node.js**: Version 16 or higher
- **npm**: Version 8 or higher
- **JSON Server**: For mock API (installed globally)

## Tools and technologies

- ReactJs with vite
- Redux toolkit
- Tailwindcss
- Framer-motion
- Formik
- Yup
- Axios
- JSON Server
- chart.js
- react-toastify
- react-chartjs-2

## Setup Instructions

### 1. Clone the Repository

<!-- ```bash
git clone https://github.com/your-username/employee-attendance-intern.git
cd employee-attendance-intern ``` -->


## 2. Install Dependencies
Install the required npm packages:
npm install

## 3. Set Up JSON Server
This project uses JSON Server to simulate a backend API.
Install JSON Server globally (if not already installed):
npm install -g json-server
The db.json file is included in the repo with sample data. Start the server:
json-server --watch db.json --port 3000
The API will be available at http://localhost:3000.

## 4. Run the Application
npm start


## How to Use
Filter Employees: Use the dropdown to switch between "All", "Present", or "Absent" employees.
Navigate Pages: Use the "Previous" and "Next" buttons to move through the employee list.
Implementation Approach
This project was designed to be simple and educational for interns. Here's how it was built:

Data Fetching: Used useEffect to fetch attendance and employee data from a JSON Server API on component mount. The data is merged by matching employeeId from attendance records with employee details, creating a single array of objects.
State Management: Two states are used with useState: originalEmployees (unchanging source data) and filteredEmployees (dynamic data for display). This keeps the original data safe while allowing filtering.
Filtering: A dropdown triggers handleStatusFilter, which updates filteredEmployees based on the selected status ("all", "present", or "absent"). The status is normalized with toLowerCase() to avoid case sensitivity issues.
Pagination: Calculated page indices dynamically based on filteredEmployees.length and a fixed employeesPerPage (5). The slice method extracts the current page's items, and buttons handle navigation with basic logic to prevent out-of-bounds pages.
Simplicity: Avoided Redux or complex libraries to focus on core React concepts (hooks, state, and props), making it easier to understand and extend.

Submitted By
[Abdulrahman Fawzy taha] - Intern

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


```
