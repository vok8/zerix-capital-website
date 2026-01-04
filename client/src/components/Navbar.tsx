import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logoUrl from "@assets/generated_images/minimalist_geometric_capital_letter_z_logo.png";

interface NavbarProps {
  transparent?: boolean;
}

export default function Navbar({ transparent = false }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const scrollToHash = () => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        setTimeout(() => {element.scrollIntoView({ behavior: "smooth" });}, 0);
      }
    }};
    scrollToHash();
    // window.addEventListener("hashchange", scrollToHash);
    // return () => window.removeEventListener("hashchange", scrollToHash);
  }, [location]);

  useEffect(() => {
    if (!transparent) return;

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [transparent]);

  const navLinks = [
    { href: "/#top", label: "Home" },
    { href: "/performance#top", label: "Performance" },
    { href: "/team#top", label: "Team" },
  ];

  const handleClick = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleClick2 = () => {
    const element = document.getElementById("top");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isActive = (path: string) => location === path;
  const sevenSpaces = '\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0';
  // const twoSpaces = '\u00a0\u00a0';
  const isNavTransparent = transparent && !isScrolled;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isNavTransparent
          ? "bg-transparent"
          : "bg-background/95 backdrop-blur-sm border-b border-border shadow-sm"
      }`}
      data-testid="navbar"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* <div className="hidden md:flex items-center gap-4"> */}
          <Link
            href="/#top"
            className="flex items-center gap-2"
            data-testid="link-logo"
            onClick={handleClick2}
          >
            <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center">
              <img
                src={logoUrl}
                alt="Zerix Capital Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span style={{ marginRight: '2em' }}>{sevenSpaces}</span>
            {/* <span
              className={`text-xl font-bold ${isNavTransparent ? "text-white" : "text-foreground"}`}
            >
              {fiveSpaces}
            </span> */}
          </Link>
          {/* </div> */}

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleClick2}
                className={`text-sm font-medium transition-colors ${
                  isNavTransparent
                    ? isActive(link.href)
                      ? "text-white"
                      : "text-white/80 hover:text-white"
                    : isActive(link.href)
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                }`}
                data-testid={`link-nav-${link.label.toLowerCase()}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/#contact" onClick={handleClick}>
              <Button
                variant={isNavTransparent ? "outline" : "default"}
                className={
                  isNavTransparent
                    ? "text-white border-white/30 bg-white/10 backdrop-blur-sm"
                    : ""
                }
                data-testid="button-contact-nav"
              >
                Contact Us
              </Button>
            </Link>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className={`md:hidden ${isNavTransparent ? "text-white" : ""}`}
            onClick={() => setIsOpen(!isOpen)}
            data-testid="button-mobile-menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <div className="px-6 py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block text-sm font-medium ${
                  isActive(link.href)
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
                onClick={() => setIsOpen(false)}
                data-testid={`link-mobile-${link.label.toLowerCase()}`}
              >
                {link.label}
              </Link>
            ))}
            <a href="#contact" onClick={() => setIsOpen(false)}>
              <Button className="w-full" data-testid="button-contact-mobile">
                Contact Us
              </Button>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
