const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-background/95 py-6 text-center text-sm text-muted-foreground">
      <div className="container mx-auto px-4">
        <p>&copy; {new Date().getFullYear()} GunDeals Navigator. All rights reserved.</p>
        <p className="mt-1">Prices and availability are subject to change.</p>
      </div>
    </footer>
  );
};

export default Footer;
