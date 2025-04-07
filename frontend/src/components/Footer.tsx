const Footer = () => {
  return (
      <footer className="bg-[#c14e2a] py-10">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <span className="text-3xl text-white font-bold tracking-tight">
          Logoipsum
        </span>
          <nav>
            <ul className="flex gap-4 text-white font-bold tracking-tight">
              <li>
                <a href="/privacy-policy">Privacy Policy</a>
              </li>
              <li>
                <a href="/terms-of-service">Terms of Service</a>
              </li>
            </ul>
          </nav>
        </div>
      </footer>
  );
};

export default Footer;
