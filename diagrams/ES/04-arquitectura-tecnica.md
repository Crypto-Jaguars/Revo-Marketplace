# Arquitectura Técnica del Sistema

Este diagrama muestra la arquitectura técnica completa del Revolutionary Farmers Marketplace, incluyendo frontend, backend, blockchain y servicios externos.

```mermaid
graph TB
    subgraph "🌐 Frontend - Next.js 14"
        A["⚛️ React Components<br/>TypeScript + Tailwind"]
        B["🎨 UI Components<br/>Radix UI + shadcn/ui"]
        C["🌍 Internacionalización<br/>next-intl (ES/EN)"]
        D["📱 Responsive Design<br/>Mobile-first"]
    end
    
    subgraph "🔧 Estado y Lógica"
        E["🗃️ Zustand Store<br/>- Cart Store<br/>- Farm Store<br/>- Search Store<br/>- Language Store"]
        F["📝 React Hook Form<br/>+ Zod Validation"]
        G["🎭 Framer Motion<br/>Animaciones"]
    end
    
    subgraph "🔗 Blockchain Layer"
        H["⭐ Stellar SDK<br/>JavaScript"]
        I["👛 Freighter Wallet<br/>Integration"]
        J["💵 USDC Payments<br/>Stablecoin"]
        K["🔒 Smart Contracts<br/>Escrow System"]
    end
    
    subgraph "🛠️ Servicios y APIs"
        L["🌤️ Weather API<br/>OpenWeatherMap"]
        M["📍 Geolocation API<br/>Maps Integration"]
        N["💳 MoonPay API<br/>Fiat to Crypto"]
        O["📊 Analytics<br/>User Tracking"]
    end
    
    subgraph "🗄️ Datos y Storage"
        P["🗂️ Local Storage<br/>User Preferences"]
        Q["📦 Mock Data<br/>Products & Farms"]
        R["🖼️ Image Storage<br/>Public Assets"]
        S["🔄 API Routes<br/>Next.js API"]
    end
    
    subgraph "🧪 Testing & Quality"
        T["🧪 Jest + RTL<br/>Unit Testing"]
        U["🎭 Cypress<br/>E2E Testing"]
        V["📏 ESLint + Prettier<br/>Code Quality"]
        W["🔍 TypeScript<br/>Type Safety"]
    end
    
    A --> E
    A --> F
    B --> A
    C --> A
    
    E --> H
    F --> H
    H --> I
    H --> J
    H --> K
    
    S --> L
    S --> M
    S --> N
    S --> O
    
    E --> P
    Q --> A
    R --> A
    
    T --> A
    U --> A
    V --> A
    W --> A
    
    style A fill:#3b82f6,stroke:#1d4ed8,stroke-width:2px,color:#fff
    style H fill:#10b981,stroke:#059669,stroke-width:2px,color:#fff
    style E fill:#8b5cf6,stroke:#7c3aed,stroke-width:2px,color:#fff
```

## Descripción de la Arquitectura

### 🌐 Frontend (Next.js 14)
- **Framework**: Next.js con App Router y Server Components
- **UI**: Combinación de TailwindCSS y Radix UI para componentes accesibles
- **Internacionalización**: Soporte completo para español e inglés
- **Responsive**: Design mobile-first con breakpoints optimizados

### 🔧 Estado y Gestión de Datos
- **Estado Global**: Zustand para gestión de estado ligera y eficiente
- **Formularios**: React Hook Form con validación Zod
- **Animaciones**: Framer Motion para transiciones fluidas

### 🔗 Integración Blockchain
- **Stellar Network**: SDK oficial para interacciones con la blockchain
- **Wallets**: Integración con Freighter y otros wallets Stellar
- **Payments**: Sistema de pagos en USDC stablecoin
- **Smart Contracts**: Sistema de escrow automatizado

### 🛠️ APIs y Servicios Externos
- **Clima**: Integración con OpenWeatherMap
- **Pagos**: MoonPay para conversión fiat-crypto
- **Analytics**: Seguimiento de métricas de usuario
- **Geolocalización**: APIs de mapas y ubicación

### 🧪 Testing y Calidad
- **Unit Testing**: Jest con React Testing Library
- **E2E Testing**: Cypress para pruebas de extremo a extremo
- **Code Quality**: ESLint, Prettier y TypeScript strict mode 