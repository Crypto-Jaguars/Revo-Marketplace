"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

interface FAQItem {
  id: string
  question: string
  answer: string
}

export default function FAQPage() {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

  const spanishFAQs: FAQItem[] = [
    {
      id: "es-1",
      question: "¿Qué es Revolutionary Farmers?",
      answer:
        "Es una comunidad y plataforma digital que conecta agricultores, comerciantes y emprendedores con consumidores para un comercio justo, seguro y transparente.",
    },
    {
      id: "es-2",
      question: "¿Cómo funciona para agricultores?",
      answer:
        "Listan productos, reciben pedidos y gestionan envíos con pagos seguros mediante contratos inteligentes y trazabilidad.",
    },
    {
      id: "es-3",
      question: "¿Cómo funciona para compradores?",
      answer:
        "Exploran el catálogo, realizan compras y hacen seguimiento en tiempo real con un sistema de reputación verificada.",
    },
    {
      id: "es-4",
      question: "¿Qué tecnología utilizan?",
      answer: "Usamos blockchain y herramientas modernas para garantizar transparencia, seguridad y bajas comisiones.",
    },
    {
      id: "es-5",
      question: "¿Puedo invertir en el proyecto?",
      answer:
        'Sí, pronto habilitaremos opciones de inversión. Utiliza el botón "Invertir Ahora" o escríbenos a revolutionaryfarmers@gmail.com.',
    },
  ]

  const englishFAQs: FAQItem[] = [
    {
      id: "en-1",
      question: "What is Revolutionary Farmers?",
      answer:
        "A community and digital platform connecting farmers, merchants, and entrepreneurs with consumers for fair, secure, and transparent trade.",
    },
    {
      id: "en-2",
      question: "How does it work for farmers?",
      answer:
        "List products, receive orders, and manage shipping with secure payments via smart contracts and traceability.",
    },
    {
      id: "en-3",
      question: "How does it work for buyers?",
      answer: "Browse the catalog, purchase, and track deliveries in real time with verified reputation.",
    },
    {
      id: "en-4",
      question: "What technology do you use?",
      answer: "We use blockchain and modern tooling to ensure transparency, security, and low fees.",
    },
    {
      id: "en-5",
      question: "Can I invest?",
      answer:
        'Yes, investment options are coming soon. Use the "Invest Now" button or email revolutionaryfarmers@gmail.com.',
    },
  ]

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedItems(newExpanded)
  }

  const FAQSection = ({ items, title }: { items: FAQItem[]; title?: string }) => (
    <div className="space-y-4">
      {title && <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 md:mb-6 mx-4 md:mx-6">{title}</h2>}
      <div >
        {items.map((item, index) => (
          <div key={item.id}>
            <button
              className="w-full p-4 md:p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              onClick={() => toggleExpanded(item.id)}
            >
              <span className="text-gray-800 font-medium text-base md:text-lg">{item.question}</span>
              {expandedItems.has(item.id) ? (
                <ChevronUp className="h-5 w-5 text-gray-600 flex-shrink-0 ml-4" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-600 flex-shrink-0 ml-4" />
              )}
            </button>
            {expandedItems.has(item.id) && (
              <div className="px-4 md:px-6 pb-4 md:pb-6">
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">{item.answer}</p>
              </div>
            )}
            {index < items.length - 1 && <div className="border-b border-gray-300 mx-4 md:mx-6" />}
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-green-100 py-8 md:py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h1>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
            Clear your doubts about how the platform works, our technology and investment opportunities.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        <div className="space-y-8 md:space-y-12 bg-white rounded-2xl border border-green-200 shadow-sm overflow-hidden p-4 md:p-6">
          <FAQSection items={spanishFAQs} />
          <FAQSection items={englishFAQs} title="FAQ (English)" />
        </div>
      </div>
    </div>
  )
}
