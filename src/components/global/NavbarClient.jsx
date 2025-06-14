"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function NavbarClient({ logo, imageUrl, links, ctaData }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="px-[5%] md:px-[10%] flex bg-white justify-between items-center shadow-md text-black border-b-6 border-red-900 relative z-50">
      {/* Logo */}
      <div>
        {logo && (
          <Link href="/" className="flex items-center">
            <Image
              src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${imageUrl}`}
              alt={logo.texto || "RozctoTv Logo"}
              width={100}
              height={100}
            />
          </Link>
        )}
      </div>

     {/* Desktop Links and CTA */}
        <div className="hidden md:flex flex-row items-center gap-8">
        <ul className="flex flex-row items-center gap-8 m-0 p-0">
            {links &&
            links.map((link) => {
                const isActive = pathname === link.href;
                return (
                <li key={link.id}>
                    <Link
                    href={link.href}
                    className={`px-3 py-2 rounded-md font-semibold text-xl transition-colors duration-200
                        ${isActive
                        ? "bg-[#db0000] text-[#fff]"
                        : "text-[#801c1c] hover:text-[#fff] hover:bg-[#801c1c]"
                        }`}
                    >
                    {link.texto}
                    </Link>
                </li>
                );
            })}
        </ul>
        {/* Desktop CTA Button */}
        {ctaData && (
            <Link
            href={ctaData.href}
            className="ml-4 btn"
            >
            {ctaData.texto}
            </Link>
        )}
        </div>

      {/* Hamburger Icon */}
      <button
        className="md:hidden flex flex-col justify-center items-center w-10 h-10"
        onClick={() => setOpen(!open)}
        aria-label="Open menu"
        type="button"
      >
        <span className={`block w-7 h-1 bg-[#801c1c] rounded transition-all duration-200 ${open ? "rotate-45 translate-y-2" : ""}`}></span>
        <span className={`block w-7 h-1 bg-[#801c1c] rounded my-1 transition-all duration-200 ${open ? "opacity-0" : ""}`}></span>
        <span className={`block w-7 h-1 bg-[#801c1c] rounded transition-all duration-200 ${open ? "-rotate-45 -translate-y-2" : ""}`}></span>
      </button>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg flex flex-col items-center pt-6 gap-4 md:hidden animate-fade-in z-50">
          {links &&
            links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.id}
                  href={link.href}
                  className={`block w-full text-center px-3 py-3 rounded-md font-semibold text-xl transition-colors duration-200
                    ${isActive
                      ? "bg-[#801c1c] text-[#d3f6f6]"
                      : "text-[#801c1c] hover:text-[#d3f6f6] hover:bg-[#801c1c]"
                    }`}
                  onClick={() => setOpen(false)}
                >
                  {link.texto}
                </Link>
              );
            })}
          {ctaData && (
            <Link
              href={ctaData.href}
              className="btn  rounded-none! w-full mx-auto text-center"
              onClick={() => setOpen(false)}
            >
              {ctaData.texto}
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}