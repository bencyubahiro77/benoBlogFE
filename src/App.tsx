import { Routes, Route } from "react-router-dom"
import DashBoard from './pages/Admin/DashBoard'
import Blog from './pages/Admin/Blog'
import User from './pages/Admin/Users'
import LoginForm from './pages/Admin/Login'
import CreateBlog from "./pages/Admin/createBlog"
import CreateUser from "./pages/Admin/createUser"
import { ThemeProvider } from "@/AppComponent/theme-provider"
import '@fontsource/nunito-sans/400.css';
import '@fontsource/nunito-sans/600.css'; 
import '@fontsource/nunito-sans/700.css'; 
import './App.css'

const App: React.FC = () => {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {
        <Routes>
          <Route path="admin" element={<DashBoard />} />
          <Route path="admin/blog" element={<Blog />} />
          <Route path="admin/users" element={<User />} />
          <Route path="authorized/login" element={<LoginForm />} />
          <Route path="authorized/createUser" element={<CreateUser />} />
          <Route path="authorized/createBlog" element={<CreateBlog />} />
        </Routes>
      }
    </ThemeProvider>
  )
}
export default App
