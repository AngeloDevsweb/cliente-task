/* eslint-disable no-unused-vars */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TaskPage from "./pages/TasksPage";
import TaskformPage from "./pages/TaskFormPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";

import ProtectedRoute from "./ProtectedRoute";
import { TaskProvider } from "./context/TasksContext";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <main className="container mx-auto px-10">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/tasks" element={<TaskPage />} />
              <Route path="/tasks/new" element={<TaskformPage />} />
              <Route path="/tasks/:id" element={<TaskformPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
          </Routes>
          </main>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  );
};

export default App;
