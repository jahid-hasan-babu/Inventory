export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-8 rounded-md ">
      <div className="container mx-auto text-center">
        <p>
          &copy; {new Date().getFullYear()} Inventory Management Dashboard. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
}
