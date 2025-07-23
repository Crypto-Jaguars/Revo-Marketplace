# Flujo de Usuario Agricultor

Este diagrama muestra el proceso completo que sigue un agricultor desde el registro hasta la gestión de su negocio en la plataforma.

```mermaid
graph TB
    A["🌱 Unirse como Agricultor"] --> B["📝 Registro Multi-paso"]
    B --> C["👤 Información Personal"]
    B --> D["🏡 Información de la Granja"]
    B --> E["📋 Certificaciones"]
    B --> F["📸 Documentación"]
    
    F --> G["✅ Verificación de Cuenta"]
    G --> H["🎛️ Dashboard del Agricultor"]
    
    H --> I["📦 Gestión de Productos"]
    H --> J["📊 Métricas de la Granja"]
    H --> K["📋 Gestión de Órdenes"]
    H --> L["💰 Finanzas"]
    
    I --> M["➕ Agregar Nuevo Producto"]
    M --> N["📝 Información Básica"]
    M --> O["📸 Subir Imágenes"]
    M --> P["💰 Configurar Precios"]
    M --> Q["📦 Stock y Disponibilidad"]
    M --> R["🚚 Opciones de Entrega"]
    
    N --> S["🏷️ Nombre del Producto"]
    N --> T["📝 Descripción"]
    N --> U["🏷️ Categoría"]
    N --> V["🌱 Método de Cultivo"]
    
    P --> W["💵 Precio Base"]
    P --> X["🏷️ Descuentos"]
    P --> Y["📦 Precio por Unidad"]
    
    I --> Z["✏️ Editar Productos"]
    I --> AA["📊 Ver Estadísticas"]
    
    K --> BB["📬 Nuevas Órdenes"]
    BB --> CC["✅ Confirmar Orden"]
    CC --> DD["📦 Preparar Envío"]
    DD --> EE["🚚 Procesar Entrega"]
    EE --> FF["💰 Recibir Pago"]
    
    J --> GG["🌤️ Widget del Clima"]
    J --> HH["📈 Producción"]
    J --> II["🌿 Sostenibilidad"]
    J --> JJ["🏆 Certificaciones"]
    
    L --> KK["💳 Historial de Pagos"]
    L --> LL["📊 Ingresos"]
    L --> MM["🔒 Gestión de Escrow"]
    
    style A fill:#dcfce7,stroke:#16a34a,stroke-width:2px,color:#000
    style H fill:#fed7aa,stroke:#ea580c,stroke-width:2px,color:#000
    style I fill:#ddd6fe,stroke:#8b5cf6,stroke-width:2px,color:#000
    style FF fill:#bbf7d0,stroke:#059669,stroke-width:2px,color:#000
```

## Descripción del Flujo

### 📝 Onboarding
- **Registro Multi-paso**: Proceso completo de verificación
- **Documentación**: Certificaciones y pruebas de legitimidad
- **Verificación**: Proceso de aprobación manual

### 📦 Gestión de Productos
- **CRUD Completo**: Crear, leer, actualizar y eliminar productos
- **Rich Media**: Múltiples imágenes y descripciones detalladas
- **Pricing Flexible**: Descuentos, promociones y pricing dinámico

### 📊 Analytics y Métricas
- **Performance**: Seguimiento de ventas y engagement
- **Weather Integration**: Datos climáticos en tiempo real
- **Sustainability**: Métricas de impacto ambiental

### 💰 Gestión Financiera
- **Pagos Automáticos**: Recepción de pagos vía blockchain
- **Escrow Management**: Control sobre transacciones en garantía
- **Reporting**: Informes detallados de ingresos 