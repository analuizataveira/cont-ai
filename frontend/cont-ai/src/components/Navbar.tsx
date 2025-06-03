import { useNavigate } from 'react-router-dom';

export default function Navbar() {

  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/menu');
  }

  const handleLogout = () => {
    localStorage.removeItem("session"); // Remove a sessão
    navigate("/login"); // Redireciona para login
  };


  return (
    <header className="bg-white mb-2">
      <nav className="mx-auto flex ml-4 mr-8 max-w items-center justify-between">
        <div className="flex">
          <img
            src="/src/assets/Logo1.png"
            className="h-auto w-32 cursor-pointer hover:opacity-80 transition-opacity"
            alt="Logo"
            onClick={handleLogoClick}
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleLogout}
            className="text-sm/6 font-semibold text-gray-900"
          >
            Log Out →
          </button>
        </div>
      </nav>
    </header>
  )
}