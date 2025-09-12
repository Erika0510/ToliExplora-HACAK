const { data, error } = await supabase.auth.signUp({
  email,
  password,
});

if (error) {
  setMessage(error.message);
  return;
}

// ⚠️ Asegúrate de que data.user exista
const user = data.user;
if (!user) {
  setMessage("Revisa tu correo para confirmar la cuenta 📧");
  return;
}

// Guardar rol en tabla profiles
const { error: profileError } = await supabase.from("profiles").insert([
  { id: user.id, full_name: email.split("@")[0], role }
]);

if (profileError) {
  setMessage(profileError.message);
} else {
  setMessage("Registro exitoso 🎉");
}
