# Funcionalidades Generales - Revolutionary Farmers Marketplace

Este diagrama muestra una vista general de todas las funcionalidades principales del Revolutionary Farmers Marketplace, organizada por tipos de usuario.

```mermaid
graph TD
    A["🌱 Revolutionary Farmers<br/>Marketplace"] --> B["👨‍🌾 Agricultores"]
    A --> C["🛒 Compradores"] 
    A --> D["💰 Inversores"]
    
    B --> E["📝 Registro de Granja"]
    B --> F["📦 Gestión de Productos"]
    B --> G["📊 Dashboard"]
    B --> H["💳 Recibir Pagos"]
    
    C --> I["🔍 Explorar Marketplace"]
    C --> J["🛒 Carrito de Compras"]
    C --> K["💰 Proceso de Pago"]
    C --> L["📋 Gestión de Órdenes"]
    
    D --> M["💹 Oportunidades de Inversión"]
    D --> N["📈 Seguimiento de ROI"]
    
    E --> O["📋 Formulario Multi-paso"]
    F --> P["🏷️ Listar Productos"]
    P --> Q["📸 Galería de Imágenes"]
    P --> R["🏷️ Precios y Descuentos"]
    
    I --> S["🔎 Búsqueda y Filtros"]
    I --> T["📊 Categorías"]
    I --> U["⭐ Reviews y Ratings"]
    
    J --> V["➕ Agregar Productos"]
    J --> W["📝 Modificar Cantidad"]
    
    K --> X["🔐 Blockchain USDC"]
    K --> Y["🔒 Sistema Escrow"]
    
    L --> Z["📍 Seguimiento de Entrega"]
    L --> AA["📜 Historial de Órdenes"]
    
    style A fill:#4ade80,stroke:#16a34a,stroke-width:3px,color:#000
    style B fill:#fbbf24,stroke:#f59e0b,stroke-width:2px,color:#000
    style C fill:#60a5fa,stroke:#3b82f6,stroke-width:2px,color:#000
    style D fill:#a78bfa,stroke:#8b5cf6,stroke-width:2px,color:#000
```

## Descripción de Funcionalidades

### 👨‍🌾 Agricultores
- **Registro de Granja**: Proceso completo de onboarding con verificación
- **Gestión de Productos**: CRUD completo de productos agrícolas
- **Dashboard**: Panel de control con métricas y gestión
- **Recibir Pagos**: Sistema automatizado de pagos vía blockchain

### 🛒 Compradores
- **Explorar Marketplace**: Navegación y descubrimiento de productos
- **Carrito de Compras**: Gestión de productos seleccionados
- **Proceso de Pago**: Checkout seguro con múltiples métodos
- **Gestión de Órdenes**: Seguimiento y historial de compras

### 💰 Inversores
- **Oportunidades de Inversión**: Proyectos agrícolas disponibles
- **Seguimiento de ROI**: Monitoreo de retorno de inversión 