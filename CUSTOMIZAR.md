# 🎯 Guía de Personalización - HTML/CSS/JS Vanilla

Tu aplicación está lista. Aquí está dónde encontrar cada cosa y cómo personalizarla.

## 📁 Archivos principales

```
index.html          ← Estructura HTML (en la raíz)
public/
  ├── style.css     ← Todos los estilos
  └── script.js     ← Toda la lógica JavaScript
```

## ✏️ Personalización

### 1. **Cambiar Servicios**

Abre `public/script.js` y busca `const SERVICES = [...]`

Cada servicio tiene:
```javascript
{
  id: "unico-id",
  name: "Nombre del Servicio",
  description: "Descripción corta",
  characteristics: [
    "Característica 1",
    "Característica 2",
    "Característica 3",
    "Característica 4",
  ],
  price: 999,
  icon: "🎨",  // Cualquier emoji
}
```

**Simplemente edita o agrega más servicios en este array.**

### 2. **Configurar WhatsApp**

En `public/script.js`, busca `function handleWhatsApp()` alrededor de línea 244:

```javascript
const phone = "1234567890";  // ← Cambia esto
```

Formato del número:
- **Argentina**: `5491234567890` (sin 0 al inicio)
- **México**: `525512345678`
- **Colombia**: `573001234567`
- **España**: `34912345678`
- **USA**: `13125552368`

Ejemplo: Si tu número es +54 9 11 2345 6789, usa: `5491123456789`

### 3. **Configurar QR de Pago**

En `public/script.js`, busca `function handleQRPayment()` alrededor de línea 256:

```javascript
const qrPaymentUrl = "TU_URL_AQUI";  // Agrega aquí

if (qrPaymentUrl) {
  window.open(qrPaymentUrl, "_blank");
} else {
  alert("Escanea el código QR con tu teléfono para completar el pago de $" + calculateTotal());
}
```

Puedes usar:
- Link de Mercado Pago: `https://link.mercadopago.com.ar/xxxxx`
- Link de PayPal: `https://www.paypal.me/tuusuario/`
- URL de tu código QR

### 4. **Cambiar Colores**

Abre `public/style.css` y busca los colores principales:

```css
/* Para botones azules */
background: #4f46e5;  ← Azul primario
background: #4338ca;  ← Azul oscuro (hover)

/* Para botones verdes (WhatsApp) */
background: #22c55e;
background: #16a34a;

/* Para botones azules (QR) */
background: #3b82f6;
background: #2563eb;
```

Reemplaza estos códigos hex con tus colores favoritos.

### 5. **Cambiar Textos**

- **Header**: En `index.html` línea 14-17
- **Títulos principales**: En `index.html` línea 32-33
- **Beneficios**: En `index.html` línea 87-106
- **Footer**: En `index.html` línea 115-136

### 6. **Agregar más servicios**

Simplemente agrega un nuevo objeto en `public/script.js`:

```javascript
const SERVICES = [
  // ... servicios existentes ...
  {
    id: "nuevo-servicio",
    name: "Mi Nuevo Servicio",
    description: "Descripción",
    characteristics: ["Feat 1", "Feat 2", "Feat 3", "Feat 4"],
    price: 1500,
    icon: "🚀",
  },
];
```

### 7. **Cambiar información de contacto**

En `index.html`, busca la sección `<footer>` (alrededor de línea 115):

```html
<div class="footer-section">
  <h4>Contacto</h4>
  <p>tu-email@example.com</p>
  <p>+1 (555) 123-4567</p>
</div>
```

## 🎨 Personalización Visual Avanzada

### Cambiar fuente
En `public/style.css` línea 12:
```css
body {
  font-family: 'Tu-Fuente', sans-serif;
}
```

### Cambiar espacios/tamaños
Los tamaños principales están en CSS usando `rem`:
- `1rem` = 16px
- `2rem` = 32px
- Aumenta los números para hacer todo más grande/pequeño

### Cambiar gradientes
En `public/style.css`, busca `linear-gradient`:
```css
background: linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%);
```

Cambia los códigos hex para usar tus colores.

## 📱 Funcionalidades incluidas

✅ Mostrar servicios en grid responsivo  
✅ Agregar/quitar servicios al carrito  
✅ Actualizar cantidades en carrito  
✅ Guardar carrito en localStorage (no se pierde al refrescar)  
✅ Enviar a WhatsApp con detalles del pedido  
✅ QR de pago  
✅ Modal de carrito elegante  
✅ Totales automáticos  
✅ Responsive en móvil/tablet/desktop  

## 🚀 Desplegar

Puedes desplegar esta app a:

- **Netlify** - Arrastra la carpeta del proyecto
- **Vercel** - Arrastra la carpeta del proyecto  
- **GitHub Pages** - Carga los archivos
- **Cualquier servidor web** - Solo copia los archivos

## 💡 Tips

- El carrito se guarda automáticamente en localStorage
- Cambios en `index.html` requieren refrescar (F5)
- Cambios en `public/style.css` se ven automáticamente
- Cambios en `public/script.js` requieren refrescar

## ❓ Preguntas Frecuentes

**P: ¿Cómo agrego más características a un servicio?**
R: Solo agrega más items al array `characteristics: [...]`

**P: ¿Cómo cambio el idioma?**
R: Busca y reemplaza todos los textos en español en `index.html` y `public/script.js`

**P: ¿Cómo oculto la sección "¿Por qué elegirnos?"**
R: En `index.html`, busca esa sección y borra las líneas 85-113 (o ponlas como comentario: `<!-- ... -->`)

**P: ¿Cómo hago que un servicio no sea comprable?**
R: Simplemente no lo incluyas en el array `SERVICES` en `public/script.js`

---

¡Listo! Tu app está lista para personalizar y usar. Solo edita los archivos mencionados arriba. ¡Éxito! 🎉
