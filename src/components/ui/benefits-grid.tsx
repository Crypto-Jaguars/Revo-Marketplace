import React from 'react';
import { DollarSign, Users, Shield, Smartphone } from 'lucide-react';

const BenefitsGrid = () => {
  const benefits = [
    {
      icon: DollarSign,
      titleEn: 'Direct Sales',
      titleEs: 'Ventas Directas',
      descriptionEn: 'Sell your products directly to customers without intermediaries, maximizing your profits.',
      descriptionEs: 'Vende tus productos directamente a los clientes sin intermediarios, maximizando tus ganancias.',
      gradient: 'from-green-500 to-emerald-600',
    },
    {
      icon: Users,
      titleEn: 'Community',
      titleEs: 'Comunidad',
      descriptionEn: 'Connect with other farmers and customers in a supportive agricultural community.',
      descriptionEs: 'Conéctate con otros agricultores y clientes en una comunidad agrícola solidaria.',
      gradient: 'from-blue-500 to-cyan-600',
    },
    {
      icon: Shield,
      titleEn: 'Secure Payments',
      titleEs: 'Pagos Seguros',
      descriptionEn: 'Process transactions safely with encrypted payment systems and buyer protection.',
      descriptionEs: 'Procesa transacciones de forma segura con sistemas de pago encriptados y protección al comprador.',
      gradient: 'from-purple-500 to-indigo-600',
    },
    {
      icon: Smartphone,
      titleEn: 'Easy Management',
      titleEs: 'Gestión Fácil',
      descriptionEn: 'Manage your farm business from anywhere with our intuitive mobile-friendly platform.',
      descriptionEs: 'Gestiona tu negocio agrícola desde cualquier lugar con nuestra plataforma intuitiva y móvil.',
      gradient: 'from-orange-500 to-red-600',
    },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/images/crops-collage.png)',
          opacity: 0.06,
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose Our Platform
          </h2>
          <p className="text-xl text-gray-600">
            Por Qué Elegir Nuestra Plataforma
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="group relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
                style={{
                  perspective: '1000px',
                }}
              >
                <div
                  className="relative p-8 transition-transform duration-500 group-hover:-translate-y-1 group-hover:[transform:rotateX(6deg)_rotateY(6deg)]"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                  {/* Icon Container */}
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${benefit.gradient} mb-6 shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                    <Icon className="w-10 h-10 text-white" strokeWidth={2.5} />
                  </div>

                  {/* Title English */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-gray-700">
                    {benefit.titleEn}
                  </h3>

                  {/* Title Spanish */}
                  <p className="text-lg font-semibold text-gray-500 mb-4">
                    {benefit.titleEs}
                  </p>

                  {/* Description English */}
                  <p className="text-gray-600 mb-3 leading-relaxed">
                    {benefit.descriptionEn}
                  </p>

                  {/* Description Spanish */}
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {benefit.descriptionEs}
                  </p>

                  {/* Decorative Element */}
                  <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${benefit.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BenefitsGrid;