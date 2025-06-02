'use client'

import Navbar from "../components/Navbar"

export default function Home() {
    return (
        <div className="bg-white h-screen overflow-hidden">
            <Navbar />
            <div className="relative isolate px-6 lg:px-8 h-full">
                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                >
                    <div
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                        className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-gradient-to-tr from-[#4f46e5] to-[#10b981] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
                    />
                </div>
                
                <div className="mx-auto max-w-2xl pt-20 pb-10 sm:pt-24 sm:pb-12 lg:pt-28 lg:pb-14">
                    <div className="text-center">
                        <h1 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                            Gestão Financeira Inteligente
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Controle seus lançamentos financeiros de forma organizada por mês, com relatórios detalhados para tomada de decisão estratégica.
                        </p>
                        <div className="mt-8 flex items-center justify-center gap-x-4">
                            <a
                                href="/record-list"
                                className="rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Registros
                            </a>
                            <a href="/features" className="text-sm font-semibold text-gray-900">
                                Saiba mais <span aria-hidden="true">→</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-5xl px-6 lg:px-8 mb-8">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                        <div className="bg-gray-50 p-5 rounded-lg">
                            <h3 className="text-base font-semibold text-gray-900">Organização Mensal</h3>
                            <p className="mt-2 text-sm text-gray-600">
                                Lançamentos financeiros organizados por mês para fácil visualização.
                            </p>
                        </div>
                        <div className="bg-gray-50 p-5 rounded-lg">
                            <h3 className="text-base font-semibold text-gray-900">Relatórios Detalhados</h3>
                            <p className="mt-2 text-sm text-gray-600">
                                Gere relatórios completos para auxiliar na tomada de decisões.
                            </p>
                        </div>
                        <div className="bg-gray-50 p-5 rounded-lg">
                            <h3 className="text-base font-semibold text-gray-900">Armazenamento Seguro</h3>
                            <p className="mt-2 text-sm text-gray-600">
                                Dados financeiros armazenados com segurança em nosso banco de dados.
                            </p>
                        </div>
                    </div>
                </div>

                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 -z-10 transform-gpu overflow-hidden blur-3xl"
                >
                    <div
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                        className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-gradient-to-tr from-[#4f46e5] to-[#10b981] opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75"
                    />
                </div>
            </div>
        </div>
    )
}