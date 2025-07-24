# Sistema de Escrow y Transacciones Blockchain

Este diagrama detalla el flujo completo de transacciones blockchain utilizando el sistema de escrow para garantizar la seguridad de compradores y vendedores.

```mermaid
graph TB
    A["🛒 Comprador Inicia Compra"] --> B["💰 Selecciona Método de Pago"]
    
    B --> C["👛 Conectar Wallet Stellar"]
    B --> D["🌙 MoonPay (Fiat → USDC)"]
    B --> E["📱 Código QR"]
    
    C --> F["🔍 Verificar Balance USDC"]
    D --> G["💱 Convertir Fiat a USDC"]
    E --> H["📲 Escanear para Pagar"]
    
    F --> I["🔒 Inicializar Escrow"]
    G --> I
    H --> I
    
    I --> J["💵 Bloquear Fondos USDC<br/>en Smart Contract"]
    J --> K["📬 Notificar al Agricultor"]
    
    K --> L["👨‍🌾 Agricultor Confirma Orden"]
    L --> M["📦 Preparar Producto"]
    M --> N["🚚 Enviar Producto"]
    
    N --> O["📍 Actualizar Estado de Envío"]
    O --> P["🛒 Notificar al Comprador"]
    
    P --> Q["📦 Comprador Recibe Producto"]
    Q --> R{"✅ ¿Producto Satisfactorio?"}
    
    R -->|"Sí"| S["✅ Confirmar Recepción"]
    R -->|"No"| T["❌ Reportar Problema"]
    R -->|"Sin acción"| U["⏰ Auto-release (7 días)"]
    
    S --> V["💰 Liberar Fondos del Escrow"]
    T --> W["🔍 Proceso de Mediación"]
    U --> V
    
    V --> X["💳 Pago al Agricultor"]
    V --> Y["📊 Registrar Transacción"]
    
    W --> Z{"⚖️ ¿Resolución?"}
    Z -->|"A favor del Comprador"| AA["💰 Reembolso"]
    Z -->|"A favor del Agricultor"| X
    Z -->|"Parcial"| BB["💰 División de Fondos"]
    
    X --> CC["⭐ Solicitar Review"]
    AA --> DD["📋 Cerrar Caso"]
    BB --> CC
    
    CC --> EE["📊 Actualizar Reputación"]
    DD --> EE
    
    style I fill:#fef3c7,stroke:#f59e0b,stroke-width:3px,color:#000
    style J fill:#fecaca,stroke:#dc2626,stroke-width:2px,color:#000
    style V fill:#bbf7d0,stroke:#059669,stroke-width:3px,color:#000
    style W fill:#fed7aa,stroke:#ea580c,stroke-width:2px,color:#000
```

## Operaciones del Sistema de Escrow

### 🔒 Operaciones Principales
1. **Initialize Escrow**: Crear nuevo contrato de garantía
2. **Fund Escrow**: Depositar fondos USDC en el contrato
3. **Complete Escrow**: Liberar fondos al vendedor
4. **Cancel Escrow**: Cancelar y reembolsar
5. **Claim Earnings**: Retirar ganancias acumuladas
6. **Refund Remaining**: Reembolsar fondos restantes
7. **Get Engagement**: Consultar estado del contrato

### 💰 Métodos de Pago
- **Wallet Stellar**: Conexión directa con Freighter u otros wallets
- **MoonPay**: Conversión de fiat (EUR, USD) a USDC
- **Código QR**: Pago mediante escaneo de código QR
- **Transferencia Directa**: USDC wallet-to-wallet

### 🔒 Seguridad y Garantías
- **Smart Contracts**: Código inmutable en Stellar blockchain
- **Timelock**: Auto-liberación después de 7 días sin disputa
- **Mediación**: Proceso de resolución de conflictos
- **Multi-firma**: Requiere aprobación de múltiples partes

### ⚖️ Resolución de Disputas
- **Automatizada**: Para casos simples con criterios claros
- **Manual**: Revisión humana para casos complejos
- **Transparente**: Historial completo de transacciones
- **Justa**: División proporcional de fondos cuando corresponde 