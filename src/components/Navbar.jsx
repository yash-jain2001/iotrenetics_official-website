import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import ProductsMenu from "./ProductsMenu";
import AutomationMenu from "./AutomationMenu";

const leftNavLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
];

const rightNavLinks = [
  { to: "/industries", label: "Industries" },
  { to: "/solutions", label: "Solutions" },
  // { to: "/coming-soon", label: "Coming Soon" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-[1000] h-20">
      <div className="flex items-center justify-between h-full relative max-w-[1200px] mx-auto px-5">
        <Link to="/" onClick={closeMenu}>
          <img
            src="/assets/IOT.webp"
            alt="IoTrenetics Logo"
            className="h-[130px] relative max-md:h-[100px] max-md:-mt-[2%]"
          />
        </Link>

        {/* Hamburger */}
        <div
          className={`menu-toggle w-[30px] h-[22px] hidden max-md:flex flex-col justify-between cursor-pointer absolute right-5 top-1/2 -translate-y-1/2 z-[9999] ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Nav */}
        <nav
          className={`max-md:${menuOpen ? "block" : "hidden"} ${menuOpen ? "max-md:block" : "max-md:hidden"} max-md:absolute max-md:top-20 max-md:right-0 max-md:w-full max-md:bg-white max-md:z-[999]`}
        >
          <ul className="list-none flex gap-6 max-lg:gap-3 max-md:flex-col max-md:items-center max-md:py-4 m-0 p-0">
            {leftNavLinks.map(({ to, label }) => (
              <li key={to} className="flex items-center w-full max-md:justify-center">
                <NavLink
                  to={to}
                  onClick={closeMenu}
                  className="no-underline text-gray-800 font-medium transition-colors duration-300 hover:text-brand max-md:py-3 max-md:px-4 max-md:w-full max-md:text-center max-md:rounded-lg max-md:hover:bg-gray-50"
                >
                  {label}
                </NavLink>
              </li>
            ))}

            <li className="flex items-center w-full max-md:justify-center">
              <ProductsMenu closeMobileMenu={closeMenu} />
            </li>

            <li className="flex items-center w-full max-md:justify-center">
              <AutomationMenu closeMobileMenu={closeMenu} />
            </li>

            {rightNavLinks.map(({ to, label }) => (
              <li key={to} className="flex items-center w-full max-md:justify-center">
                <NavLink
                  to={to}
                  onClick={closeMenu}
                  className="no-underline text-gray-800 font-medium transition-colors duration-300 hover:text-brand max-md:py-3 max-md:px-4 max-md:w-full max-md:text-center max-md:rounded-lg max-md:hover:bg-gray-50"
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
