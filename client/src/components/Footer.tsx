import { Link } from "wouter";
import { SiLinkedin, SiX } from "react-icons/si";
import logoUrl from "@assets/generated_images/zerix.png";

const handleClick = () => {
  const element = document.getElementById("top");
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background py-12" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
          <div className="flex flex-col gap-4">
            <Link href="/#top" className="flex items-center gap-2" onClick={handleClick}>
              <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center">
                <img src={logoUrl} alt="Zerix Capital Logo" className="w-full h-full object-cover" />
              </div>
              {/* <span className="text-xl font-bold text-background">Zerix Capital</span> */}
            </Link>
          </div>
          
          <div className="flex gap-4">
            <a
              href="https://www.linkedin.com/company/zerix-capital/?viewAsMember=true"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 bg-background/10 rounded-lg flex items-center justify-center hover:bg-background/20 transition-colors"
              data-testid="link-social-linkedin"
            >
              <SiLinkedin className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="border-t border-background/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-background/60">
            &copy; {currentYear} Zerix Capital. All rights reserved.
          </p>
          <p className="text-xs text-background/40">
            Past performance does not guarantee future results. Investment involves risk.
          </p>
        </div>
      </div>
    </footer>
  );
}
