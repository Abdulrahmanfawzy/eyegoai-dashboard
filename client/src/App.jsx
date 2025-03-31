import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Employees from "./pages/dashboard/Employees";
import Overview from "./pages/dashboard";
import Dashboard from "./pages/dashboard/Dashboard/Dashboard";
import EditEmployee from "./components/EditEmployee";
import Layout from "./components/Layout";
import Account from "./pages/dashboard/Account";
import Setting from "./pages/dashboard/Setting";
import Attendance from "./pages/dashboard/Attendance";
import ProtectedRoute from "./components/ProtectedRoute";
import { AnimatePresence, motion } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0, y: 150 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  exit: { opacity: 0, x: 50, transition: { duration: 0.3 } },
};

const PageWrapper = ({ children }) => (
  <motion.div
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
  >
    {children}
  </motion.div>
);

export default function App() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route index path="/auth/login" element={<Login />} />
        <Route path="/dashboard" element={<Overview />}>
          <Route
            path=""
            element={
              <ProtectedRoute>
                <PageWrapper>
                  <Dashboard />
                </PageWrapper>
              </ProtectedRoute>
            }
          />
          <Route
            path="account"
            element={
              <ProtectedRoute>
                <PageWrapper>
                  <Account />
                </PageWrapper>
              </ProtectedRoute>
            }
          />
          <Route
            path="settings"
            element={
              <ProtectedRoute>
                <PageWrapper>
                  <Setting />
                </PageWrapper>
              </ProtectedRoute>
            }
          />
          <Route
            path="attendance"
            element={
              <ProtectedRoute>
                <PageWrapper>
                  <Attendance />
                </PageWrapper>
              </ProtectedRoute>
            }
          />
          <Route path="employees" element={<Layout />}>
            <Route
              path=""
              element={
                <ProtectedRoute>
                  <PageWrapper>
                    <Employees />
                  </PageWrapper>
                </ProtectedRoute>
              }
            />
            <Route
              path="edit/:id"
              element={
                <ProtectedRoute>
                  <PageWrapper>
                    <EditEmployee />
                  </PageWrapper>
                </ProtectedRoute>
              }
            />
            <Route
              path="edit"
              element={
                <ProtectedRoute>
                  <PageWrapper>
                    <EditEmployee />
                  </PageWrapper>
                </ProtectedRoute>
              }
            />
          </Route>
        </Route>
      </Routes>
    </AnimatePresence>
  );
}
