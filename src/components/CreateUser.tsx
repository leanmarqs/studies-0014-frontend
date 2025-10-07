import { useState } from "react";

const API = import.meta.env.VITE_API_URL || "https://studies-0014-backend.onrender.com";

// Tipo para capturar os erros enviados pelo Zod
interface ZodIssue {
  path?: (string | number)[]; // pode ser indefinido
  message: string;
  code?: string;
}

export default function CreateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMsg(null);

    try {
      const res = await fetch(`${API}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, confirmPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        // 🔹 Trata erros de validação do Zod
        if (data.errors && Array.isArray(data.errors)) {
          const msgs = (data.errors as ZodIssue[])
            .map((err) => {
              // const field = err.path && err.path.length > 0 ? err.path[0] : "campo";
              // return `${field}: ${err.message}`;
              return `${err.message}`;
            })
            .join("\n");
          throw new Error(msgs);
        } else {
          throw new Error(data.error || data.message || "Erro ao criar usuário");
        }
      }

      // 🔹 Se deu certo
      setMsg("Usuário criado com sucesso!");
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      if (err instanceof Error) {
        setMsg(err.message);
      } else {
        setMsg("Erro desconhecido ao criar usuário.");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto bg-zinc-800 p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Criar Usuário</h2>

      {msg && <div className="mb-4 whitespace-pre-wrap text-red-400">{msg}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome"
          required
          className="w-full p-2 rounded bg-zinc-700"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
          required
          className="w-full p-2 rounded bg-zinc-700"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
          type="password"
          required
          className="w-full p-2 rounded bg-zinc-700"
        />
        <input
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirme a senha"
          type="password"
          required
          className="w-full p-2 rounded bg-zinc-700"
        />
        <button className="px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-500">
          Criar
        </button>
      </form>
    </div>
  );
}
