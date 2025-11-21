import { Github, Linkedin, Twitter, Heart } from 'lucide-react';
const Footer = () => {
  const socialLinks = [{
    icon: <Github className="w-5 h-5" />,
    href: 'https//github.com/Layo-dev',
    label: 'GitHub'
  }, {
    icon: <Linkedin className="w-5 h-5" />,
    href: '#',
    label: 'LinkedIn'
  }, {
    icon: <Twitter className="w-5 h-5" />,
    href: '#',
    label: 'Twitter'
  }];
  return <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="font-poppins font-bold text-xl text-primary">
            Layo.Dev
          </div>

          <div className="flex items-center space-x-6">
            {socialLinks.map((link, index) => <a key={index} href={link.href} aria-label={link.label} className="w-10 h-10 bg-secondary/50 text-muted-foreground rounded-lg flex items-center justify-center hover:bg-gradient-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 hover:shadow-orange">
                {link.icon}
              </a>)}
          </div>

          <div className="flex items-center space-x-1 font-inter text-sm text-muted-foreground">
            <span>Made by Layo.Dev</span>

            <span>© 2024 </span>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;