# Flujo de Usuario Comprador

Este diagrama detalla todo el journey del usuario comprador desde el descubrimiento hasta la finalización de la compra.

```mermaid
graph TB
    A["🏠 Página de Inicio"] --> B["🔍 Explorar Marketplace"]
    B --> C["🛒 Ver Productos"]
    C --> D["📱 Filtrar por Categorías"]
    C --> E["🔎 Buscar Productos"]
    C --> F["⭐ Ver Reviews"]
    
    D --> G["🥬 Verduras"]
    D --> H["🍎 Frutas"]
    D --> I["🌾 Granos"]
    D --> J["🌿 Hierbas"]
    
    C --> K["👀 Ver Detalle del Producto"]
    K --> L["📸 Galería de Imágenes"]
    K --> M["📋 Información Detallada"]
    K --> N["👨‍🌾 Información del Agricultor"]
    K --> O["🛒 Agregar al Carrito"]
    
    O --> P["🛒 Gestionar Carrito"]
    P --> Q["➕ Modificar Cantidad"]
    P --> R["❌ Eliminar Productos"]
    P --> S["💰 Ver Total"]
    
    S --> T["🏃‍♂️ Proceso de Checkout"]
    T --> U["📍 Seleccionar Dirección"]
    T --> V["🚚 Método de Entrega"]
    T --> W["💳 Método de Pago"]
    
    U --> X["📋 Libreta de Direcciones"]
    X --> Y["➕ Agregar Nueva Dirección"]
    
    W --> Z["💰 Pago con USDC"]
    W --> AA["🔗 Conectar Wallet Stellar"]
    W --> BB["📱 Código QR"]
    W --> CC["🌙 MoonPay"]
    
    Z --> DD["🔒 Sistema Escrow"]
    DD --> EE["⏳ Pago en Garantía"]
    EE --> FF["📦 Confirmación de Envío"]
    FF --> GG["🚚 Seguimiento de Entrega"]
    GG --> HH["✅ Confirmar Recepción"]
    HH --> II["💰 Liberar Pago"]
    
    II --> JJ["⭐ Dejar Review"]
    JJ --> KK["📋 Historial de Órdenes"]
    
    style A fill:#e0e7ff,stroke:#6366f1,stroke-width:2px,color:#000
    style T fill:#fef3c7,stroke:#f59e0b,stroke-width:2px,color:#000
    style DD fill:#dcfce7,stroke:#16a34a,stroke-width:2px,color:#000
    style II fill:#bbf7d0,stroke:#059669,stroke-width:2px,color:#000
```

## Descripción del Flujo

### 🔍 Descubrimiento
- **Exploración**: Navegación libre por el marketplace
- **Filtros**: Búsqueda por categorías, precios, métodos de cultivo
- **Reviews**: Sistema de calificaciones y comentarios

### 🛒 Selección
- **Detalle del Producto**: Información completa con galería
- **Carrito**: Gestión flexible de productos seleccionados
- **Comparación**: Evaluación entre diferentes opciones

### 💳 Compra
- **Checkout Seguro**: Proceso simplificado en múltiples pasos
- **Pagos Flexibles**: USDC, wallet Stellar, QR, MoonPay
- **Escrow**: Protección automática de fondos

### 📦 Seguimiento
- **Transparencia**: Seguimiento en tiempo real
- **Confirmación**: Proceso de verificación de entrega
- **Feedback**: Sistema de reviews post-compra 