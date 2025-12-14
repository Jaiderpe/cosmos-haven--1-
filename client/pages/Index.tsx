import { useState, useEffect } from "react";
import { SERVICES } from "@/lib/services";
import { useCart } from "@/hooks/useCart";
import ServiceCard from "@/components/ServiceCard";
import CartModal from "@/components/CartModal";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

export default function Index() {
  const { addToCart, isOpen, setIsOpen, itemCount, items } = useCart();
  const [cartItemIds, setCartItemIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    setCartItemIds(new Set(items.map((item) => item.id)));
  }, [items]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
              Soluciones Digitales
            </h1>
            <p className="text-slate-600 text-sm mt-1">
              Servicios profesionales para tu negocio
            </p>
          </div>
          <Button
            onClick={() => setIsOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-6 px-6 flex items-center gap-2 relative group"
          >
            <ShoppingCart size={20} />
            <span className="font-semibold">Carrito</span>
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-slate-900 mb-4">
              Nuestros Servicios
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Selecciona los servicios que necesitas y crea tu paquete
              personalizado. Paga de forma segura mediante WhatsApp o QR.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onAddToCart={addToCart}
                isInCart={cartItemIds.has(service.id)}
              />
            ))}
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="bg-white rounded-2xl shadow-lg p-12 mt-20">
          <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            ¿Por qué elegirnos?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: "⚡",
                title: "Rápido",
                desc: "Entrega ágil de tus proyectos",
              },
              {
                icon: "🎯",
                title: "Profesional",
                desc: "Equipo experto en tecnología",
              },
              {
                icon: "🛡️",
                title: "Seguro",
                desc: "Máxima protección de datos",
              },
              {
                icon: "💰",
                title: "Económico",
                desc: "Precios competitivos",
              },
            ].map((benefit, idx) => (
              <div key={idx} className="text-center">
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h4 className="font-bold text-slate-900 mb-2">{benefit.title}</h4>
                <p className="text-slate-600 text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-20 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-12 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">
            ¿Listo para comenzar?
          </h3>
          <p className="text-lg mb-8 opacity-90">
            Selecciona tus servicios y pagaremos de forma segura
          </p>
          <Button
            onClick={() => setIsOpen(true)}
            className="bg-white hover:bg-slate-100 text-indigo-600 font-bold py-6 px-8 rounded-xl text-lg"
          >
            Ver carrito ({itemCount})
          </Button>
        </section>
      </main>

      {/* Cart Modal */}
      <CartModal isOpen={isOpen} onClose={() => setIsOpen(false)} />

      {/* Footer */}
      <footer className="bg-slate-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-lg mb-4">Soluciones Digitales</h4>
              <p className="text-slate-400">
                Tu partner en transformación digital
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Servicios</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Diseño Web
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Desarrollo
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    SEO
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Contacto</h4>
              <p className="text-slate-400">info@solucionesdigitales.com</p>
              <p className="text-slate-400">+1 (555) 123-4567</p>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-slate-400">
            <p>
              &copy; 2024 Soluciones Digitales. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
