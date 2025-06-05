'use client'

import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import { useState } from "react"

export default function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <div className="h-screen overflow-hidden">
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
                        className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30  from-[#4f46e5] to-[#10b981] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
                    />
                </div>

                <div className="mx-auto max-w-2xl pt-20 pb-10 sm:pt-24 sm:pb-12 lg:pt-28 lg:pb-14">
                    <div className="text-center">
                        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                            Gestão Financeira Inteligente
                        </h1>
                        <p className="mt-6 text-lg leading-8 ">
                            Controle seus lançamentos financeiros de forma organizada por mês, com relatórios detalhados para tomada de decisão estratégica.
                        </p>
                        <div className="mt-8 flex items-center justify-center gap-x-4">
                            <Link
                                to="/record-list"
                                className="rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Registros
                            </Link>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="text-sm font-semibold text-gray-900 hover:text-indigo-600 transition-colors"
                            >
                                Saiba mais <span aria-hidden="true">→</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-5xl px-6 lg:px-8 mb-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
                        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-2xl font-bold text-gray-900">Como usar o sistema</h3>
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="text-gray-500 hover:text-gray-700"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    <div className="border-l-4 border-indigo-500 pl-4 py-2">
                                        <h4 className="font-semibold text-lg">1. Cadastro e Login</h4>
                                        <p className="mt-1 text-gray-600">
                                            Primeiro, crie sua conta ou faça login se já tiver uma. Seus dados serão armazenados com segurança.
                                        </p>
                                    </div>

                                    <div className="border-l-4 border-indigo-500 pl-4 py-2">
                                        <h4 className="font-semibold text-lg">2. Adicionar Lançamentos</h4>
                                        <p className="mt-1 text-gray-600">
                                            Na página de Registros, você pode adicionar novos lançamentos financeiros, classificando-os como receitas ou despesas.
                                        </p>
                                    </div>

                                    <div className="border-l-4 border-indigo-500 pl-4 py-2">
                                        <h4 className="font-semibold text-lg">3. Visualização Mensal</h4>
                                        <p className="mt-1 text-gray-600">
                                            Seus lançamentos são automaticamente organizados por mês, facilitando o acompanhamento do seu fluxo financeiro.
                                        </p>
                                    </div>

                                    <div className="border-l-4 border-indigo-500 pl-4 py-2">
                                        <h4 className="font-semibold text-lg">4. Relatórios</h4>
                                        <p className="mt-1 text-gray-600">
                                            Acesse relatórios detalhados que mostram seus gastos por categoria, comparação entre meses e projeções futuras.
                                        </p>
                                    </div>

                                    <div className="border-l-4 border-indigo-500 pl-4 py-2">
                                        <h4 className="font-semibold text-lg">5. Tomada de Decisão</h4>
                                        <p className="mt-1 text-gray-600">
                                            Utilize os dados organizados para tomar decisões estratégicas sobre seus gastos e investimentos.
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-8 flex justify-end">
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                                    >
                                        Entendi
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
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