import { Routes, Route, Link } from "react-router-dom";
import CreateUser from "./components/CreateUser";
import UserList from "./components/UserList";

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-50">
      {/* Navbar */}
      <nav className="bg-zinc-800 py-4 px-6 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold">User Manager</h1>
        <div className="space-x-4">
          <Link to="/" className="hover:text-indigo-400 transition-colors font-medium">
            Criar Usuário
          </Link>
          <Link to="/users" className="hover:text-indigo-400 transition-colors font-medium">
            Ver Usuários
          </Link>
        </div>
      </nav>

      {/* Rotas */}
      <div className="p-6">
        <Routes>
          <Route path="/" element={<CreateUser />} />
          <Route path="/users" element={<UserList />} />
        </Routes>
      </div>
    </div>
  );
}
