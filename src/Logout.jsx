import { supabase } from "./supabaseClient";

function Logout() {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    alert("Sesión cerrada 🚪");
  };

  return (
    <button onClick={handleLogout} className="bg-red-600 text-white p-2 rounded">
      Cerrar sesión
    </button>
  );
}

export default Logout;
