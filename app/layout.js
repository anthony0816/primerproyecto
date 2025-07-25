import NavBar from "@/components/NavBar";
import "./globals.css";
import { AuthProvider } from "@/context/authContext";
import ProtectedRouter from "@/components/ProtectedRouter";
export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <NavBar/>
          <ProtectedRouter>{children}</ProtectedRouter>
        </AuthProvider>
      </body>
    </html>
  );
}
