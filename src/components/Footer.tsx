const Footer = () => {
  return (
    <footer className="p-4 bg-gray-50 sm:p-6 dark:bg-slate-800 mt-12">
      <div className="mx-auto md:container">
        <div className="flex flex-col items-center justify-center py-8">
          <div className="flex flex-wrap justify-center gap-8 text-sm">
            <a
              href="#"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:underline"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:underline"
            >
              Terms & Conditions
            </a>
            <a
              href="/contact"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:underline"
            >
              Contact Us
            </a>
            <a
              href="#"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:underline"
            >
              Support
            </a>
          </div>
        </div>
        <hr className="my-4 border-gray-200 sm:mx-auto dark:border-gray-700" />
        <div className="text-center mt-4">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            © 2024 shimshon.ai. All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
