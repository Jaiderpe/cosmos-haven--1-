import { Service } from "@/lib/services";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Check } from "lucide-react";

interface ServiceCardProps {
  service: Service;
  onAddToCart: (service: Service) => void;
  isInCart?: boolean;
}

export default function ServiceCard({
  service,
  onAddToCart,
  isInCart,
}: ServiceCardProps) {
  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-slate-100">
      {/* Icon/Header Background */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 flex items-center justify-center">
        <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
          {service.icon}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        <h3 className="text-xl font-bold text-slate-900 mb-2">
          {service.name}
        </h3>
        <p className="text-slate-600 text-sm mb-4 line-clamp-2">
          {service.description}
        </p>

        {/* Characteristics */}
        <div className="flex-1 mb-6">
          <ul className="space-y-2">
            {service.characteristics.map((char, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm">
                <span className="text-indigo-500 font-bold mt-0.5 flex-shrink-0">
                  ✓
                </span>
                <span className="text-slate-700">{char}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Price and Button */}
        <div className="border-t border-slate-200 pt-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl font-bold text-slate-900">
              ${service.price}
            </span>
            <span className="text-xs uppercase tracking-wide text-slate-500">
              Una vez
            </span>
          </div>

          <Button
            onClick={() => onAddToCart(service)}
            className={`w-full py-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
              isInCart
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
            }`}
          >
            {isInCart ? (
              <>
                <Check size={20} />
                Agregado al carrito
              </>
            ) : (
              <>
                <ShoppingCart size={20} />
                Agregar al carrito
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
