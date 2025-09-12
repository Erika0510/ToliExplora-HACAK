import { supabase } from "./supabaseClient";

function LoginWithGoogle() {
  const handleGoogleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      console.error("Error en login con Google:", error.message);
    } else {
      console.log("Login con Google exitoso:", data);
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="bg-red-500 text-white p-2 rounded w-full"
    >
      Iniciar sesión con Google
    </button>
  );
}

export default LoginWithGoogle;
