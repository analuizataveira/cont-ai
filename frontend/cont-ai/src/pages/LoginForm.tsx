import { useState } from "react";
import { useNavigate } from "react-router";
import { userLogin } from "../services/UserService";

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const submitForm = async (event: React.FormEvent) => {
        event.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const response = await userLogin(email, password);

            if (response.userId) {
                localStorage.setItem("session", JSON.stringify({
                    id: response.userId
                }));
                navigate("/menu");
            } else {
                throw new Error("Credenciais inválidas");
            }
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message || "Erro ao fazer login");
            } else {
                setError("Ocorreu um erro desconhecido");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen hero bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="w-full hero-content">
                <div className="w-full max-w-2xl">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Bem-vindo ao ContAI!</h1>
                        <p className="py-4 text-lg text-gray-600">Entre com suas credenciais para acessar o sistema</p>
                    </div>
                    
                    <div className="w-full shadow-xl card bg-base-100">
                        <div className="p-8 card-body">
                            {error && (
                                <div className="alert alert-error">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 stroke-current shrink-0" fill="none" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>{error}</span>
                                </div>
                            )}

                            <form onSubmit={submitForm} className="space-y-6">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="text-lg label-text">E-mail</span>
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="seu@email.com"
                                        className="input input-bordered input-lg"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="text-lg label-text">Senha</span>
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="********"
                                        className="input input-bordered input-lg"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="mt-8 form-control">
                                    <button
                                        type="submit"
                                        className={`btn btn-primary btn-lg ${isLoading ? 'loading' : ''}`}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? '' : 'Entrar'}
                                    </button>
                                </div>
                            </form>

                            <div className="divider">OU</div>

                            <div className="flex justify-center">
                                <button 
                                    onClick={() => navigate("/create-user")} 
                                    className="btn btn-ghost btn-lg"
                                >
                                    Criar nova conta
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}