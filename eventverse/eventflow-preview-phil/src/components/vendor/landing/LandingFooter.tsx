import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";

export const LandingFooter = () => {
  return (
    <footer className="bg-muted/30 border-t py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
          {/* Product */}
          <div>
            <h3 className="font-bold mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="#features" className="hover:text-foreground">Features</Link></li>
              <li><Link to="#pricing" className="hover:text-foreground">Pricing</Link></li>
              <li><Link to="#integrations" className="hover:text-foreground">Integrations</Link></li>
              <li><Link to="/vendor" className="hover:text-foreground">Mobile App</Link></li>
            </ul>
          </div>

          {/* For Vendors */}
          <div>
            <h3 className="font-bold mb-4">For Vendors</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="#categories" className="hover:text-foreground">By Category</Link></li>
              <li><Link to="#testimonials" className="hover:text-foreground">Success Stories</Link></li>
              <li><Link to="/vendor" className="hover:text-foreground">Resources</Link></li>
              <li><Link to="/vendor" className="hover:text-foreground">Help Center</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-foreground">About Us</Link></li>
              <li><Link to="/" className="hover:text-foreground">Careers</Link></li>
              <li><Link to="/" className="hover:text-foreground">Contact</Link></li>
              <li><Link to="/" className="hover:text-foreground">Partners</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-foreground">Terms of Service</Link></li>
              <li><Link to="/" className="hover:text-foreground">Privacy Policy</Link></li>
              <li><Link to="/" className="hover:text-foreground">Security</Link></li>
              <li><Link to="/" className="hover:text-foreground">GDPR</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-bold mb-4">Stay Updated</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get the latest vendor tips and updates
            </p>
            <div className="flex gap-2 mb-4">
              <Input placeholder="Your email" type="email" />
              <Button size="sm">Join</Button>
            </div>
            <div className="flex gap-3">
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} EventVerse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
