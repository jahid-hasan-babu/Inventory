import Sidebar from "./components/Sidebar";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata = {
  title: "Inventory Management Dashboard",
  description: "Manage your inventory seamlessly",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen flex">
        <Sidebar />
        <main className="flex-1 flex flex-col min-h-screen p-4">
          <Header />
          <div className="flex-1">{children}</div>
          <Footer className="mt-auto" />
        </main>
      </body>
    </html>
  );
}
