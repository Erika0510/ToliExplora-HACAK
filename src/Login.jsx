import { useState } from "react";
import { supabase } from "./supabaseClient";
import LoginWithGoogle from "./LoginWithGoogle"; // 👈 aquí importamos

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Bienvenido 👋");
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto">
      <form onSubmit={handleLogin}>
        <h2 className="text-xl mb-2 font-bold">Iniciar Sesión</h2>
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <button type="submit" className="bg-green-600 text-white p-2 w-full rounded">
          Iniciar Sesión
        </button>
        <p className="mt-2 text-sm">{message}</p>
      </form>

      {/* 👇 Aquí añadimos Google */}
      <div className="mt-4">
        <p className="text-center text-sm text-gray-500 mb-2">o continúa con</p>
        <LoginWithGoogle />
      </div>
    </div>
  );
}

export default Login;
