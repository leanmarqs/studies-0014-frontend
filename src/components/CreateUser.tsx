import { useState } from "react";

const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function CreateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
const [msg, setMsg] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMsg(null);
    try {
      const res = await fetch(`${API}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro");
      setMsg("Usuário criado com sucesso!");
      setName(""); setEmail("");
    } catch (err) {
        if (err instanceof Error) {
            setMsg("Erro: " + err.message);
        } else {
            setMsg("Erro desconhecido ao criar usuário.");
        }
    }
  };

  return (
    <div className="max-w-md mx-auto bg-zinc-800 p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Criar Usuário</h2>
      {msg && <div className="mb-4">{msg}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Nome" required
          className="w-full p-2 rounded bg-zinc-700" />
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" required
          className="w-full p-2 rounded bg-zinc-700" />
        <button className="px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-500">Criar</button>
      </form>
    </div>
  );
}
