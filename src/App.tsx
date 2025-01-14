import { Routes, Route } from "react-router-dom"
import DashBoard from './pages/Admin/DashBoard'
import Blog from './pages/Admin/Blog'
import User from './pages/Admin/Users'
import { ThemeProvider } from "@/AppComponent/theme-provider"
import './App.css'

const App: React.FC = () => {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {
        <Routes>
          <Route path="admin" element={<DashBoard />} />
          <Route path="admin/blog" element={<Blog />} />
          <Route path="admin/users" element={<User />} />
        </Routes>
      }
    </ThemeProvider>
  )
}
export default App
