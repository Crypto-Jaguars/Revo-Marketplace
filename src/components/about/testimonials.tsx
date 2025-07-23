import Image from 'next/image';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Organic Farmer',
    quote:
      'Revolutionary Farmers has transformed how I sell my products. The platform is easy to use and I get fair prices for my produce.',
    image: '/placeholder.svg',
  },
  {
    name: 'Michael Chen',
    role: 'Small-Scale Farmer',
    quote:
      'Revolutionary Farmers has transformed how I sell my products. The platform is easy to use and I get fair prices for my produce.',
    image: '/placeholder.svg',
  },
  {
    name: 'Emma Rodriguez',
    role: 'Family Farm Owner',
    quote:
      'Revolutionary Farmers has transformed how I sell my products. The platform is easy to use and I get fair prices for my produce.',
    image: '/placeholder.svg',
  },
];

export default function Testimonials() {
  return (
    <section className="w-full py-24 bg-muted/50">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center text-center space-y-16">
          <h2 className="text-3xl font-bold tracking-normal sm:text-4xl md:text-5xl">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="flex flex-col space-y-4 p-6 bg-background rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-100">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="object-cover"
                      fill
                    />
                  </div>
                  <div className="flex flex-col text-left">
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
                <blockquote className="text-left text-muted-foreground">
                  &quot;{testimonial.quote}&quot;
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
