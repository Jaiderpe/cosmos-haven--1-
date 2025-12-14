import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCart, CartItem } from "@/hooks/useCart";
import { X, Trash2, Plus, Minus } from "lucide-react";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { items, removeFromCart, updateQuantity, total, clearCart } = useCart();

  const handleWhatsApp = () => {
    const message = `Hola, me gustaría contratar los siguientes servicios:\n\n${items
      .map((item) => `• ${item.name} x${item.quantity} - $${item.price * item.quantity}`)
      .join("\n")}\n\nTotal: $${total}`;

    const phone = import.meta.env.VITE_WHATSAPP_NUMBER || "1234567890";
    const encodedMessage = encodeURIComponent(message);
    window.open(
      `https://wa.me/${phone}?text=${encodedMessage}`,
      "_blank"
    );
  };

  const handleQRPayment = () => {
    const qrPaymentUrl = import.meta.env.VITE_QR_PAYMENT_URL;
    if (qrPaymentUrl) {
      window.open(qrPaymentUrl, "_blank");
    } else {
      alert("Escanea el código QR con tu teléfono para completar el pago");
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Carrito de Compra
          </DialogTitle>
        </DialogHeader>

        {items.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-lg text-slate-600 mb-4">
              Tu carrito está vacío
            </p>
            <Button
              onClick={onClose}
              variant="outline"
              className="rounded-xl"
            >
              Continuar comprando
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Items List */}
            <div className="space-y-4">
              {items.map((item) => (
                <CartItemRow
                  key={item.id}
                  item={item}
                  onRemove={removeFromCart}
                  onUpdateQuantity={updateQuantity}
                />
              ))}
            </div>

            {/* Divider */}
            <div className="border-t border-slate-200" />

            {/* Total */}
            <div className="flex justify-between items-center mb-8">
              <span className="text-lg font-semibold text-slate-900">
                Total:
              </span>
              <span className="text-4xl font-bold text-indigo-600">
                ${total}
              </span>
            </div>

            {/* Payment Options */}
            <div className="space-y-3">
              <Button
                onClick={handleWhatsApp}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-6 rounded-xl flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.935 1.237l-.354-.177-3.68-.969.987 3.622-.239.383a9.861 9.861 0 001.51 5.694c.526.675 1.23 1.268 1.977 1.72 5.282 3.365 12.87.897 16.235-4.386.662-1.03 1.203-2.11 1.605-3.231.174-.441-.026-.917-.393-1.106-.367-.19-.8-.042-1.025.308-.78 1.422-1.754 2.733-2.882 3.78-.524.532-1.096 1.016-1.708 1.435a9.89 9.89 0 01-6.231 2.065 9.887 9.887 0 01-5.318-1.508l-.355.177-3.758-.988.976 3.588-.24.384a9.87 9.87 0 001.465 5.627c.526.676 1.23 1.268 1.977 1.72 5.282 3.365 12.87.897 16.235-4.386.662-1.03 1.203-2.11 1.605-3.231" />
                </svg>
                Pagar con WhatsApp
              </Button>

              <Button
                onClick={handleQRPayment}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 rounded-xl flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Escanear QR de Pago
              </Button>
            </div>

            {/* Clear Cart Button */}
            <button
              onClick={clearCart}
              className="w-full text-sm text-slate-500 hover:text-slate-700 py-2 transition-colors"
            >
              Limpiar carrito
            </button>

            <Button
              onClick={onClose}
              variant="outline"
              className="w-full rounded-xl"
            >
              Continuar comprando
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function CartItemRow({
  item,
  onRemove,
  onUpdateQuantity,
}: {
  item: CartItem;
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}) {
  return (
    <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
      <div className="text-4xl flex-shrink-0">{item.icon}</div>
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-slate-900">{item.name}</h4>
        <p className="text-sm text-slate-600">${item.price} por servicio</p>
      </div>
      <div className="flex items-center gap-2 bg-white rounded-lg border border-slate-200 p-1">
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          className="p-1.5 hover:bg-slate-100 transition-colors"
        >
          <Minus size={16} />
        </button>
        <span className="min-w-[2rem] text-center font-semibold">
          {item.quantity}
        </span>
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          className="p-1.5 hover:bg-slate-100 transition-colors"
        >
          <Plus size={16} />
        </button>
      </div>
      <div className="text-right min-w-[80px]">
        <p className="font-bold text-slate-900">
          ${item.price * item.quantity}
        </p>
      </div>
      <button
        onClick={() => onRemove(item.id)}
        className="p-2 hover:bg-red-100 text-red-600 rounded-lg transition-colors ml-2"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}
