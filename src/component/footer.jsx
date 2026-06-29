import React from "react";
import { NavLink } from "react-router-dom"; 

const Footer = ({ isLogin }) => {
  return (
    <footer id="footer" className={`${isLogin === "officer" ? 'hidden' : 'relative' } bg-[#222222] text-white py-16 px-8 md:px-16 lg:px-16`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-16">
          
          <div className="lg:col-span-2">
            
            <div className="bg-[url(./assets/logo-asa-footer.png)] bg-center bg-no-repeat bg-size-[120px] h-[60px] w-[120px] flex items-center justify-center"></div>
            <p className="font-extrabold font-inter tracking-wide text-lg md:text-xl my-2">PT Ardana Sejahtera Abadi</p>
            
            
            <div className="space-y-2 text-gray-300 text-sm md:text-base leading-relaxed my-4">
              <p>Semarang Indah E2 No.65, Kota Semarang, 50144</p>
              <p>024-76438979</p>
              <p>asalogistic.office@gmail.com</p>
              <p>asa.logistic</p>
            </div>
          </div>

          <div className="my-2">
            <NavLink to="/resource"><h4 className="text-3xl font-bold mt-2 mb-8">Company</h4></NavLink>
            <ul className="space-y-6 text-gray-300">
              <li><NavLink to="/resource?tab=profile" className="hover:text-red-calm transition-colors">Profile</NavLink></li>
              <li><NavLink to="/resource?tab=goals" className="hover:text-red-calm transition-colors">Mission</NavLink></li>
              <li><NavLink to="/resource?tab=whychooseus" className="hover:text-red-calm transition-colors">Why Choose Us?</NavLink></li>
              <li><NavLink to="/contact" className="hover:text-red-calm transition-colors">Get a Free Quote</NavLink></li>
            </ul>
          </div>

          <div className="my-2">
            <NavLink to="/service"><h4 className="text-3xl font-bold mt-2 mb-8">Services</h4></NavLink>
            <ul className="space-y-4 text-gray-300">
              <li><NavLink to="/service?tab=export" className="hover:text-red-calm transition-colors">Export Handling</NavLink></li>
              <li><NavLink to="/service?tab=import" className="hover:text-red-calm transition-colors">Import Clearance</NavLink></li>
              <li><NavLink to="/service?tab=internationalff" className="hover:text-red-calm transition-colors">Domestic Logistic</NavLink></li>
              <li><NavLink to="/service?tab=domesticdelivery" className="hover:text-red-calm transition-colors">International Freight</NavLink></li>
              <li><NavLink to="/service?tab=undernameexim" className="hover:text-red-calm transition-colors">Undername Exim</NavLink></li>
            </ul>
          </div>

          <div className="my-2">
            <NavLink to="/career"><h4 className="text-3xl font-bold mt-2 mb-8">Networks</h4></NavLink>
            <ul className="space-y-4 text-gray-300">
              <li><NavLink to="/career?tab=jobvacancy" className="hover:text-red-500 transition-colors">Career</NavLink></li>
              <li><NavLink to="/contact" className="hover:text-red-500 transition-colors">Contact us</NavLink></li>
            </ul>
          </div>
          
          <div className="my-2">
            <NavLink to="/about"><h4 className="text-3xl font-bold mt-2 mb-8">Resources</h4></NavLink>
            <ul className="space-y-4 text-gray-300">
              <li><NavLink to="/about?tab=articles" className="hover:text-red-500 transition-colors">Articles</NavLink></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-gray-600 text-center">
          <p className="text-gray-400 text-sm">
            &copy; 2026 PT. Ardana Sejahtera Abadi. All Right Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;