const Footer = () => {
  return(
    <footer className="relative">
      {/* 럭셔리한 패턴 배경 */}
      <div className="absolute inset-0 opacity-10">
      </div>
      <div className="container mx-auto px-4 relative">
        <div className="mt-8 border-t border-brand-tertiary pt-4 pb-4 text-sm text-brand-secondary">
          <p><strong className="text-brand-primary">Company Name:</strong> ABC Lingerie Co., Ltd.</p>
          <p><strong className="text-brand-primary">Address:</strong> 123 Fashion St., Seoul, South Korea</p>
          <p><strong className="text-brand-primary">Main Number:</strong> +82-2-1588-0000</p>
          <p><strong className="text-brand-primary">Fax:</strong> +82-2-1588-1234</p>
          <p><strong className="text-brand-primary">Email:</strong> contact@abclingerie.co.kr</p>
          <p><strong className="text-brand-primary">Business Registration Number:</strong> 123-45-67890</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;