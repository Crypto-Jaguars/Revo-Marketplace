import FloatingButton from "@/components/ui/floating-button";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <FloatingButton /> {/* 👈 floating button added globally */}
      </body>
    </html>
  );
}
