'use client'

import { Link } from "react-router-dom"
import { useState } from "react"
import Modal from "../components/Modal"
import Navbar from "../components/Navbar"

export default function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <div className="min-h-screen flex flex-col">
            <div className="relative z-20"><Navbar /></div>

            <div className="relative isolate px-4 sm:px-6 lg:px-8 flex-1 flex flex-col items-center justify-center">
                {/* Background decoration */}
                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                >
                    <div
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                        className="relative left-1/2 aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#4f46e5] to-[#10b981] opacity-30 sm:w-[72.1875rem]"
                    />
                </div>

                <div className="w-full max-w-3xl text-center py-12">
                    <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                        Gestão Financeira Inteligente
                    </h1>
                    <p className="mt-4 text-base leading-7 sm:text-lg sm:leading-8">
                        Controle seus lançamentos financeiros de forma organizada por mês, com relatórios detalhados para tomada de decisão estratégica.
                    </p>
                    <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            to="/record-list"
                            className="rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600"
                        >
                            Registros
                        </Link>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="text-sm font-semibold transition-colors"
                        >
                            Saiba mais <span aria-hidden="true">→</span>
                        </button>
                    </div>
                </div>

                {/* Cards section */}
                <div className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 pb-12">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {[
                            {
                                title: "Organização Mensal",
                                desc: "Lançamentos financeiros organizados por mês para fácil visualização.",
                            },
                            {
                                title: "Relatórios Detalhados",
                                desc: "Gere relatórios completos para auxiliar na tomada de decisões.",
                            },
                            {
                                title: "Armazenamento Seguro",
                                desc: "Dados financeiros armazenados com segurança em nosso banco de dados.",
                            },
                        ].map((card, idx) => (
                            <div key={idx} className="bg-gray-50 p-5 rounded-lg">
                                <h3 className="text-base font-semibold text-gray-900">{card.title}</h3>
                                <p className="mt-2 text-sm text-gray-600">{card.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal */}
            <Modal
                isOpen={isModalOpen}
                onCloseClick={() => setIsModalOpen(false)}
                modalId="info-modal"
            >
                <div className="p-4 sm:p-6">
                    <div className="space-y-4 sm:space-y-6">
                        {[
                            {
                                title: "1. Cadastro e Login",
                                text: "Primeiro, crie sua conta ou faça login se já tiver uma. Seus dados serão armazenados com segurança.",
                            },
                            {
                                title: "2. Adicionar Lançamentos",
                                text: "Na página de Registros, você pode adicionar novos lançamentos financeiros, classificando-os como receitas ou despesas.",
                            },
                            {
                                title: "3. Visualização Mensal",
                                text: "Seus lançamentos são automaticamente organizados por mês, facilitando o acompanhamento do seu fluxo financeiro.",
                            },
                            {
                                title: "4. Relatórios",
                                text: "Acesse relatórios detalhados que mostram seus gastos por categoria, comparação entre meses e projeções futuras.",
                            },
                            {
                                title: "5. Tomada de Decisão",
                                text: "Utilize os dados organizados para tomar decisões estratégicas sobre seus gastos e investimentos.",
                            },
                        ].map((step, i) => (
                            <div
                                key={i}
                                className="border-l-4 border-indigo-500 pl-4 py-2"
                            >
                                <h4 className="font-semibold text-base sm:text-lg">{step.title}</h4>
                                <p className="mt-1 text-sm sm:text-base text-gray-600">{step.text}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 sm:mt-8 flex justify-end">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm sm:text-base"
                        >
                            Entendi
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
