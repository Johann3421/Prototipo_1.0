// Landing pages are standalone — no shared Navbar/Footer
// This layout strips all global chrome for maximum CRO focus
export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
