import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Instagram, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const PageFooter = () => {
  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-foreground mb-4">EventVerse</h3>
            <p className="text-muted-foreground mb-4">
              The all-in-one platform for planning, managing, and executing unforgettable events.
            </p>
            <div className="flex gap-3">
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Linkedin className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Instagram className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Product</h4>
            <ul className="space-y-2">
              <li><Link to="/features" className="text-muted-foreground hover:text-primary transition-colors">Features</Link></li>
              <li><Link to="/how-it-works" className="text-muted-foreground hover:text-primary transition-colors">How It Works</Link></li>
              <li><Link to="/public-events" className="text-muted-foreground hover:text-primary transition-colors">Pricing</Link></li>
              <li><Link to="/modules" className="text-muted-foreground hover:text-primary transition-colors">Modules</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/careers" className="text-muted-foreground hover:text-primary transition-colors">Careers</Link></li>
              <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Blog</Link></li>
              <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Press</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Support</h4>
            <ul className="space-y-2">
              <li><Link to="/help" className="text-muted-foreground hover:text-primary transition-colors">Help Center</Link></li>
              <li><Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
              <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Community</Link></li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-border pt-8 mb-8">
          <div className="max-w-md">
            <h4 className="font-semibold text-foreground mb-2">Stay Updated</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Get the latest event planning tips and updates delivered to your inbox.
            </p>
            <div className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1"
              />
              <Button>
                <Mail className="w-4 h-4 mr-2" />
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 EventVerse. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link>
            <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Security</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
