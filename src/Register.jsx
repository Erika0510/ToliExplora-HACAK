import { useState } from "react";
import { supabase } from "./supabaseClient";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("tourist");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    // Crear usuario en Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    // Guardar rol en tabla profiles
    const { error: profileError } = await supabase.from("profiles").insert([
      { id: data.user.id, full_name: email.split("@")[0], role }
    ]);

    if (profileError) {
      setMessage(profileError.message);
    } else {
      setMessage("Registro exitoso 🎉");
    }
  };

  return (
    <form onSubmit={handleRegister} className="p-4 max-w-sm mx-auto">
      <h2 className="text-xl mb-2 font-bold">Registrarse</h2>
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
      <select value={role} onChange={(e) => setRole(e.target.value)} className="border p-2 w-full mb-2">
        <option value="tourist">Turista</option>
        <option value="business">Empresario</option>
      </select>
      <button type="submit" className="bg-green-600 text-white p-2 w-full rounded">
        Registrarse
      </button>
      <p className="mt-2 text-sm">{message}</p>
    </form>
  );
}

export default Register;
    