# 🚀 Soluciones Digitales - Configuration Guide

Your services marketplace is ready! Here's how to customize it for your business.

## 📋 Quick Setup

### 1. **Customize Services** (Most Important!)

Edit `client/lib/services.ts` to add your own services:

```typescript
export const SERVICES: Service[] = [
  {
    id: "your-service-id",
    name: "Your Service Name",
    description: "Brief description of what you offer",
    characteristics: [
      "Feature 1",
      "Feature 2",
      "Feature 3",
      "Feature 4",
    ],
    price: 999, // Price in your currency
    icon: "🎨", // Any emoji
  },
  // Add more services...
];
```

### 2. **Configure Payment Methods**

Create a `.env.local` file in the root directory with:

```env
VITE_WHATSAPP_NUMBER=5491234567890
VITE_QR_PAYMENT_URL=https://your-qr-payment-link.com
```

**Important:** Use the format `+[country code][number]` for WhatsApp (without + or spaces in the .env file)
- Argentina: `5491234567890` (country code 54)
- Mexico: `525512345678` (country code 52)
- Colombia: `573001234567` (country code 57)
- Spain: `34912345678` (country code 34)

### 3. **Update Contact Information**

Edit the footer in `client/pages/Index.tsx`:

```typescript
// Find the "Contacto" section and update:
<p className="text-slate-400">your-email@example.com</p>
<p className="text-slate-400">+1 (555) 123-4567</p>
```

### 4. **Customize Brand Colors** (Optional)

Edit `client/global.css` to change the primary color:

```css
:root {
  --primary: 222.2 47.4% 11.2%;  /* Change these HSL values */
  --primary-foreground: 210 40% 98%;
}
```

Or use the Indigo/Blue gradient that's already configured.

## 🛒 Features Included

✅ **Service Display** - 6 services displayed in a responsive grid  
✅ **Shopping Cart** - Add/remove services, adjust quantities  
✅ **Cart Persistence** - Cart saved to browser localStorage  
✅ **WhatsApp Integration** - Send order details directly to WhatsApp  
✅ **QR Payment** - Link to your QR code payment  
✅ **Mobile Responsive** - Works perfectly on all devices  
✅ **Modern Design** - Beautiful, professional appearance  
✅ **Price Calculation** - Automatic total calculation  

## 🔧 Customization Guide

### Add/Edit Services
1. Open `client/lib/services.ts`
2. Modify the SERVICES array
3. Changes auto-save and reload

### Change Cart Button Color
Edit `client/pages/Index.tsx`:
```typescript
className="bg-indigo-600 hover:bg-indigo-700"  // Change color here
```

### Modify Cart Modal Style
Edit `client/components/CartModal.tsx` to customize:
- Button styles
- Layout
- Payment button colors

### Update Services Grid Layout
Edit `client/pages/Index.tsx`:
```typescript
// Change: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
// To: grid-cols-1 md:grid-cols-2 lg:grid-cols-4  (for 4 columns on desktop)
```

## 📱 Testing the Cart

1. Click "Agregar al carrito" on any service
2. Click the "Carrito" button in the header
3. You should see:
   - Your selected services listed
   - Service icons and prices
   - Quantity controls (+/- buttons)
   - Total price calculation
   - Two payment buttons (WhatsApp and QR)

## 💡 Tips

- **WhatsApp**: The link will open WhatsApp with a pre-filled message including all selected services and total price
- **QR Code**: Set this to your payment provider's QR code (Mercado Pago, PayPal, etc.)
- **Currency**: Change "Servicios" text in the header to your currency symbol if needed
- **Emojis**: Replace service icons with any emoji you like (🎨 💻 📱 etc.)

## 🚀 Deployment

This app can be deployed to:
- **Netlify** - [Connect Netlify](#open-mcp-popover)
- **Vercel** - [Connect Vercel](#open-mcp-popover)
- Any static hosting service

## 📚 File Structure

```
client/
├── pages/
│   └── Index.tsx          # Main homepage with services grid
├── components/
│   ├── ServiceCard.tsx    # Individual service card component
│   ├── CartModal.tsx      # Shopping cart modal
│   └── ui/                # Radix UI components
├── hooks/
│   └── useCart.ts         # Cart state management
├── lib/
│   └── services.ts        # Service data & types
└── global.css             # Tailwind theming

shared/
└── api.ts                 # Shared types

server/
├── index.ts               # Express server
└── routes/                # API endpoints
```

## ❓ Common Questions

**Q: How do I add more services?**
A: Edit `client/lib/services.ts` and add a new object to the SERVICES array.

**Q: How do I change the currency?**
A: Find `$` symbols throughout the code and replace with your currency symbol (€, £, ¥, etc.)

**Q: Can I add categories for services?**
A: Yes! Modify `services.ts` to add a `category` field, then filter in `Index.tsx` using `const grouped = groupBy(SERVICES, s => s.category)`.

**Q: How do I hide the footer?**
A: Delete or comment out the `<footer>` section in `client/pages/Index.tsx`.

---

**Need help?** Check the [Builder.io Documentation](https://www.builder.io/c/docs/projects)
