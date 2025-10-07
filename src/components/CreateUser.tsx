import { useState } from "react";

const API =
  import.meta.env.VITE_API_URL ||
  "https://studies-0014-backend.onrender.com";

interface ZodIssue {
  path?: (string | number)[];
  message: string;
  code?: string;
}

export default function CreateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // ← estado de carregamento

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMsg(null);
    setLoading(true); // ← ativa o carregamento

    try {
      const res = await fetch(`${API}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, confirmPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors && Array.isArray(data.errors)) {
          const msgs = (data.errors as ZodIssue[])
            .map((err) => `${err.message}`)
            .join("\n");
          throw new Error(msgs);
        } else {
          throw new Error(data.error || data.message || "Erro ao criar usuário");
        }
      }

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
    } finally {
      setLoading(false); // ← desativa o carregamento ao final
    }
  };

  return (
    <div className="max-w-md mx-auto bg-zinc-800 p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Criar Usuário</h2>

      {msg && (
        <div
          className={`mb-4 whitespace-pre-wrap text-center ${
            msg.includes("sucesso") ? "text-green-400" : "text-red-400"
          }`}
        >
          {msg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Campo Nome */}
        <div>
          <label htmlFor="name" className="block mb-1 text-sm text-gray-300">
            Nome
          </label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Digite seu nome"
            required
            className="w-full p-2 rounded bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Campo Email */}
        <div>
          <label htmlFor="email" className="block mb-1 text-sm text-gray-300">
            E-mail
          </label>
          <input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu e-mail"
            type="email"
            required
            className="w-full p-2 rounded bg-zinc-700 text-white autofill:bg-zinc-700 focus:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Campo Senha */}
        <div>
          <label
            htmlFor="password"
            className="block mb-1 text-sm text-gray-300"
          >
            Senha
          </label>
          <input
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
            type="password"
            required
            className="w-full p-2 rounded bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Campo Confirmar Senha */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="block mb-1 text-sm text-gray-300"
          >
            Confirmar Senha
          </label>
          <input
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirme sua senha"
            type="password"
            required
            className="w-full p-2 rounded bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Botão de envio */}
        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 rounded w-full transition-colors flex items-center justify-center ${
            loading
              ? "bg-indigo-500 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-500"
          }`}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                ></path>
              </svg>
              Criando...
            </>
          ) : (
            "Criar"
          )}
        </button>
      </form>
    </div>
  );
}
