import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import CreateNewPassword from "./pages/CreateNewPassword";
import ConfirmAccount from "./pages/ConfirmAccount";
import AuthProvider from "./context/AuthContext";
import ProtectedRoutes from "./layout/ProtectedRoutes";
import Projects from "./pages/Projects";
import NewProject from "./pages/NewProject";
import ProjectsProvider from "./context/ProjectsContext";
import Project from "./pages/Project";
import EditProject from "./pages/EditProject";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProjectsProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="registrar" element={<Register />} />
              <Route path="reset-password" element={<ResetPassword />} />
              <Route
                path="reset-password/:token"
                element={<CreateNewPassword />}
              />
              <Route path="confirmar/:id" element={<ConfirmAccount />} />
            </Route>

            <Route path="/proyectos" element={<ProtectedRoutes />}>
              <Route index element={<Projects />} />
              <Route path="nuevo" element={<NewProject />} />
              <Route path=":id" element={<Project />} />
              <Route path="editar/:id" element={<EditProject />} />
              {/* <Route path="reset-password" element={<ResetPassword />} />
            <Route
              path="reset-password/:token"
              element={<CreateNewPassword />}
            />
            <Route path="confirmar/:id" element={<ConfirmAccount />} /> */}
            </Route>
          </Routes>
        </ProjectsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

