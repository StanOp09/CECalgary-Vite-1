const Footer = () => {
  return (
    <div>
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 text-center fixed bottom-0 left-0 w-full z-50 ">
        &copy; {new Date().getFullYear()} Christ Embassy Calgary. All rights
        reserved.
      </footer>

      {/* Spacer div to prevent overlap with content */}
      <div className="h-24"></div>
    </div>
  );
};

export default Footer;
