import React, { useState } from "react";
import { loginUser } from "../../services/auth-services/authService"; 
import { Input, Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";


export function SignIn() {
  const [cin, setCin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();  


const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setSuccess("");
  try {
    const res = await loginUser(cin, password);
    setSuccess(`Bienvenue ${res.user.nom} (${res.user.role})`);
    localStorage.setItem("user", JSON.stringify(res.user));
    if (res.user.role === "manager") {
      navigate("/managerDashboard");
    }
  } catch (err) {
    setError(err.message || "Une erreur est survenue, veuillez réessayer.");
  }
};

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left: Form Section */}
      <div className="flex items-center justify-center bg-gray-50 px-8 py-12">
        <div className="w-full max-w-md">
          <div className="mb-10 text-center">
            <Typography variant="h2" className="font-bold text-blue-700 mb-2">
              Se connecter
            </Typography>
            <Typography
              variant="paragraph"
              color="blue-gray"
              className="text-base font-normal"
            >
              Accédez à votre compte avec votre cin et mot de passe
            </Typography>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-1 font-medium"
              >
                CIN
              </Typography>
              <Input
                size="lg"
                placeholder="********"
                value={cin}
                onChange={(e) => setCin(e.target.value)}
                className="!border-t-blue-200 focus:!border-t-blue-700"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                required
              />
            </div>

            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-1 font-medium"
              >
                Mot de passe
              </Typography>
              <Input
                type="password"
                size="lg"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="!border-t-blue-200 focus:!border-t-blue-700"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                required
              />
            </div>

            <Button
              type="submit"
              className="mt-4 bg-blue-700 hover:bg-blue-800 transition duration-300"
              fullWidth
            >
              Se connecter
            </Button>

            {error && (
              <p className="text-red-600 mt-4 text-center font-medium">{error}</p>
            )}
            {success && (
              <p className="text-green-600 mt-4 text-center font-medium">
                {success}
              </p>
            )}

            {/* Forgot Password */}
            <div className="text-center mt-4">
              <a href="#" className="text-sm text-blue-700 hover:underline">
                Mot de passe oublié?
              </a>
            </div>
          </form>
        </div>
      </div>

      {/* Right: Image Section */}
      <div className="hidden lg:block relative">
        <img
          src="/img/Peaugoet-Pannel.png"
          alt="Sign-in Visual"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>
    </div>
  );
}

export default SignIn;
