import { Routes, Route } from "react-router-dom"
import DashBoard from './pages/Admin/DashBoard'
import Blog from './pages/Admin/Blog'
import User from './pages/Admin/Users'
import LoginForm from './pages/Admin/Login'
import CreateAndUpdateBlog from "./pages/Admin/createandUpdateBlog"
import CreateAndUpdateUser from "./pages/Admin/createandUpdateUser"
import { ThemeProvider } from "@/AppComponent/theme-provider"
import ProtectedRoute from "./utils/protectedRoute"
import '@fontsource/nunito-sans/400.css';
import '@fontsource/nunito-sans/600.css';
import '@fontsource/nunito-sans/700.css';
import './App.css'

const App: React.FC = () => {

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      {
        <Routes>
          <Route path="authorized/login" element={<LoginForm />} />

          {/* Protected routes only by admin */}
          <Route element={<ProtectedRoute allowedRoles={['admin']}/>}>
            <Route path="admin" element={<DashBoard />} />
            <Route path="admin/users" element={<User />} />
            <Route path="authorized/createUser" element={<CreateAndUpdateUser />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={['admin', 'author']}/>}>
            <Route path="authorized/createBlog" element={<CreateAndUpdateBlog />} />
            <Route path="admin/blog" element={<Blog />} />
          </Route>
        </Routes>
      }
    </ThemeProvider>
  )
}
export default App
