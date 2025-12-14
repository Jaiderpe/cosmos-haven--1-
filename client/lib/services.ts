export interface Service {
  id: string;
  name: string;
  description: string;
  characteristics: string[];
  price: number;
  icon: string;
}

export const SERVICES: Service[] = [
  {
    id: "design",
    name: "Diseño Web",
    description: "Diseño profesional y moderno para tu página web",
    characteristics: [
      "Diseño responsivo",
      "UI/UX profesional",
      "Hasta 10 páginas",
      "Animaciones modernas",
    ],
    price: 999,
    icon: "🎨",
  },
  {
    id: "development",
    name: "Desarrollo Web",
    description: "Desarrollo completo con las últimas tecnologías",
    characteristics: [
      "React + TypeScript",
      "Base de datos",
      "API REST",
      "Hosting incluido",
    ],
    price: 1999,
    icon: "💻",
  },
  {
    id: "seo",
    name: "SEO & Marketing",
    description: "Posiciona tu sitio en Google y atrae más clientes",
    characteristics: [
      "Auditoría SEO",
      "Optimización técnica",
      "Contenido optimizado",
      "Seguimiento mensual",
    ],
    price: 599,
    icon: "📈",
  },
  {
    id: "ecommerce",
    name: "Tienda Online",
    description: "Plataforma de ecommerce completa y segura",
    characteristics: [
      "Catálogo ilimitado",
      "Pasarela de pagos",
      "Sistema de inventario",
      "Soporte técnico",
    ],
    price: 2499,
    icon: "🛒",
  },
  {
    id: "app",
    name: "Aplicación Móvil",
    description: "App nativa o multiplataforma para tu negocio",
    characteristics: [
      "iOS y Android",
      "Interfaz intuitiva",
      "Push notificaciones",
      "1 año de actualizaciones",
    ],
    price: 3499,
    icon: "📱",
  },
  {
    id: "support",
    name: "Soporte Técnico",
    description: "Mantenimiento y soporte continuo para tu sitio",
    characteristics: [
      "Soporte 24/7",
      "Actualizaciones de seguridad",
      "Backups automáticos",
      "Optimización de rendimiento",
    ],
    price: 299,
    icon: "🛠️",
  },
];
