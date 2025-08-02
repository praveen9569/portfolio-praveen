import { useState, useEffect } from 'react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-dark/90 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4'}`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="#home" className="text-2xl font-bold text-primary hover:text-white transition-colors duration-300">Portfolio</a>
        
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            <li><a href="#home" className="text-white hover:text-primary transition-colors duration-300">Home</a></li>
            <li><a href="#about" className="text-white hover:text-primary transition-colors duration-300">About</a></li>
            <li><a href="#skills" className="text-white hover:text-primary transition-colors duration-300">Skills</a></li>
            <li><a href="#projects" className="text-white hover:text-primary transition-colors duration-300">Projects</a></li>
            <li><a href="#contact" className="text-white hover:text-primary transition-colors duration-300">Contact</a></li>
            <li>
              <a 
                href="https://codolio.com/profile/praveen12" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-primary hover:text-white transition-colors duration-300 flex items-center"
              >
                <span>Codolio</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </li>
          </ul>
        </nav>

        <button 
          className="md:hidden text-white focus:outline-none" 
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-dark/95 backdrop-blur-md shadow-lg">
          <nav className="container mx-auto px-4 py-4">
            <ul className="flex flex-col space-y-4">
              <li><a href="#home" onClick={closeMobileMenu} className="text-white hover:text-primary transition-colors duration-300 block py-2">Home</a></li>
              <li><a href="#about" onClick={closeMobileMenu} className="text-white hover:text-primary transition-colors duration-300 block py-2">About</a></li>
              <li><a href="#skills" onClick={closeMobileMenu} className="text-white hover:text-primary transition-colors duration-300 block py-2">Skills</a></li>
              <li><a href="#projects" onClick={closeMobileMenu} className="text-white hover:text-primary transition-colors duration-300 block py-2">Projects</a></li>
              <li><a href="#contact" onClick={closeMobileMenu} className="text-white hover:text-primary transition-colors duration-300 block py-2">Contact</a></li>
              <li>
                <a 
                  href="https://codolio.com/profile/praveen12" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  onClick={closeMobileMenu}
                  className="text-primary hover:text-white transition-colors duration-300 flex items-center py-2"
                >
                  <span>Codolio</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;