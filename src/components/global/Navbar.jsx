import { fetchFromStrapi } from "@/lib/api";
import NavbarClient from "./NavbarClient";

export const Navbar = async () => {
  const globalData = await fetchFromStrapi("global", {
    populate: {
      Navbar: {
        populate: {
          logo: { populate: "*" },
          links: "*",
          cta: "*",
        },
      },
    },
  });

  if (
    !globalData ||
    !globalData.data ||
    !globalData.data.Navbar ||
    globalData.data.Navbar.length === 0
  ) {
    return <nav className="navbar">Error loading navigation</nav>;
  }

  const { logo, links, cta } = globalData.data.Navbar[0];
  const imageUrl = logo.imagen.url;
  const ctaData = cta[0];

  return (
    <NavbarClient
      logo={logo}
      imageUrl={imageUrl}
      links={links}
      ctaData={ctaData}
    />
  );
};