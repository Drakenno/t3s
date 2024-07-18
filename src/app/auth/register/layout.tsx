export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-8 py-12 sm:px-6 lg:px-8">
      {children}
    </div>
  );
}
