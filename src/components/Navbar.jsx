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
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-[1000]">
      <div className="flex items-center justify-between h-[72px] md:h-20 relative max-w-[1200px] mx-auto px-5">
        <Link to="/" onClick={closeMenu} className="flex-shrink-0">
          <img
            src="/assets/IOT.webp"
            alt="IoTrenetics Logo"
            className="h-32 sm:h-36 md:h-[160px] lg:h-[160px] relative transition-all duration-300"
          />
        </Link>

        {/* Hamburger */}
        <div
          className={`menu-toggle w-[30px] h-[22px] hidden max-md:flex flex-col justify-between cursor-pointer z-[9999] ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Nav */}
        <nav
          className={`${menuOpen ? "max-md:flex" : "max-md:hidden"} md:flex max-md:absolute max-md:top-[72px] max-md:left-0 max-md:right-0 max-md:w-full max-md:bg-white max-md:shadow-lg max-md:border-t max-md:border-gray-100 max-md:z-[999] max-md:flex-col max-md:items-center max-md:py-4 max-md:max-h-[calc(100vh-72px)] max-md:overflow-y-auto`}
        >
          <ul className="list-none flex gap-6 max-lg:gap-3 max-md:flex-col max-md:items-center max-md:w-full m-0 p-0">
            {leftNavLinks.map(({ to, label }) => (
              <li key={to} className="flex items-center max-md:w-full max-md:justify-center">
                <NavLink
                  to={to}
                  end={to === "/"}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `no-underline transition-colors duration-300 hover:text-brand max-md:py-3 max-md:px-4 max-md:w-full max-md:text-center max-md:block ${
                      isActive ? "text-brand font-bold" : "text-gray-800 font-medium"
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}

            <li className="flex items-center max-md:w-full max-md:justify-center">
              <ProductsMenu closeMobileMenu={closeMenu} />
            </li>

            <li className="flex items-center max-md:w-full max-md:justify-center">
              <AutomationMenu closeMobileMenu={closeMenu} />
            </li>

            {rightNavLinks.map(({ to, label }) => (
              <li key={to} className="flex items-center max-md:w-full max-md:justify-center">
                <NavLink
                  to={to}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `no-underline transition-colors duration-300 hover:text-brand max-md:py-3 max-md:px-4 max-md:w-full max-md:text-center max-md:block ${
                      isActive ? "text-brand font-bold" : "text-gray-800 font-medium"
                    }`
                  }
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
