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
      className="flex items-center justify-center gap-2 border border-gray-300 bg-white text-gray-700 p-2 rounded w-full shadow-sm hover:bg-gray-100 transition"
    >
      {/* Logo oficial de Google */}
      <img
        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
        alt="Google"
        className="w-5 h-5"
      />
      <span>Continuar con Google</span>
    </button>
  );
}

export default LoginWithGoogle;
  