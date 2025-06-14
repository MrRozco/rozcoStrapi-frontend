import Link from "next/link";
import Image from "next/image";
import { fetchFromStrapi } from "@/lib/api";

export const Footer = async () => {
  // Fetch data from Strapi
  const globalData = await fetchFromStrapi("global", {
    populate: {
      Footer: {
        populate: {
          logo: { populate: "*" },
          links: "*",
        },
      },
    },
  });

  // Error handling
  if (
    !globalData ||
    !globalData.data ||
    !globalData.data.Footer ||
    globalData.data.Footer.length === 0
  ) {
    return <footer className="footer">Error loading footer</footer>;
  }

  // Destructure the data
  const { logo, links, copyright } = globalData.data.Footer;

  return (
    <footer className="px-[5%] md:px-[5%] mt-10 bg-white border-t-6  border-red-900 shadow-inner text-black">
      <div className="container mx-auto flex flex-col items-center ">
        <div className="w-full flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            {logo && (
              <Link href="/" className="flex items-center">
              <Image
                src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${logo.imagen.url}`}
                alt={logo.alternativeText || "Logo"}
                width={150}
                height={100}
              />
              </Link>
            )}
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {links &&
              links.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="font-semibold text-[#801c1c] text-3xl px-2 py-1 rounded transition-colors duration-200 hover:text-[#fff] hover:bg-[#801c1c]"
                >
                  {link.texto}
                </Link>
              ))}
          </div>
        </div>
        <p className="text-sm text-gray-500!  w-full text-center">
          &copy; {new Date().getFullYear()} {copyright || "All rights reserved."}
        </p>
      </div>
    </footer>
  );
};