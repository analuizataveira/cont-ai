import { useEffect, useState } from 'react';
import { IoColorPaletteOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/Logo1.png';


export default function Navbar() {
  const [theme, setTheme] = useState('light');

  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/menu');
  }

  const handleLogout = () => {
    localStorage.removeItem("session");
    navigate("/login");
  };

  const themes = ["light", "dark", "dracula", "corporate", "retro", "valentine", "halloween", "lofi", "black", "winter"];


  const toggleTheme = (selectedTheme: string) => {
    setTheme(selectedTheme);
    document.documentElement.setAttribute('data-theme', selectedTheme);
    localStorage.setItem('theme', selectedTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  return (
    <header>
      <nav className="mx-auto flex ml-4 mr-8 items-center justify-between">
        <div className="flex">
          <button
            className="border-none bg-transparent cursor-pointer"
            onClick={handleLogoClick}
          >
            <img
              src={logo}
              alt="Logo"
              className="h-18 w-32 hover:opacity-80 transition-opacity"
            />
          </button>
        </div>
        <div className="flex justify-end">
          <details className="dropdown">
            <summary className="block text-sm cursor-pointer"><IoColorPaletteOutline size={40} /></summary>
            <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-35 p-2">
              {themes.map((themeOption) => (
                <li key={themeOption}>
                  <button
                    onClick={() => toggleTheme(themeOption)}
                    className={`block w-full text-left px-2 py-1 rounded ${theme === themeOption ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                  >
                    {themeOption}
                  </button>
                </li>
              ))}
            </ul>
          </details>
          <button
            onClick={handleLogout}
            className="text-sm/6 font-semibold text-gray-900 ml-4"
          >
            Log Out →
          </button>
        </div>
      </nav>
    </header>
  )
}