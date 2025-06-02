'use client'

export default function Navbar() {
  return (
    <header className="bg-white">
      <nav aria-label="Global" className="mx-auto flex ml-4 mr-4 max-w items-center justify-between">
        <div className="flex">
          <img src="/src/assets/Logo1.png" className="h-auto w-32" alt="Logo" />
        </div>
        <div className="flex justify-end">
          <a href="#" className="text-sm/6 font-semibold text-gray-900">
            Log Out <span aria-hidden="true">→</span>
          </a>
        </div>
      </nav>
    </header>
  )
}