import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL || "https://studies-0014-backend.onrender.com";

type User = {
  id: number;
  name: string;
  email: string;
};


export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/users`)
      .then(r => r.json())
      .then(data => {  
        setUsers(data.users || []); 
        setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  }, []);

 
  if (loading) return <div>Carregando...</div>;

  return (
    <div className="max-w-2xl mx-auto bg-zinc-800 p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Usuários</h2>
      {users.length === 0 ? (
        <p>Nenhum usuário encontrado.</p>
      ) : (
        <ul className="space-y-2">
          {users.map(u => (
            <li key={u.id} className="p-3 bg-zinc-700 rounded">
              <div className="font-medium">{u.name}</div>
              <div className="text-sm text-zinc-300">{u.email}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
