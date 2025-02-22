// import Instragram from "@/components/icon/Instragram";
// import Twiter from "@/components/icon/Twiter";
// import Whatsapp from "@/components/icon/Whatsapp";
import { useTheme } from "next-themes";
import logo from "@/assets/icons/Logo (2) (1).png";
import logoBlack from "@/assets/icons/Logo (1).png";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const { theme } = useTheme();

  // Determine navbar background color

  // Determine which logo to show based on theme
  const currentLogo = theme === "dark" ? logo : logoBlack;
  return (
    <footer className="dark:bg-primary bg-white  dark:text-white text-black py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          {/* Logo and Description Section */}
          <div className="mb-6 md:mb-0 max-w-xs">
            <Link href="/">
              <Image
                className="w-[150px] object-contain"
                src={currentLogo}
                alt="logo icon"
              />
            </Link>

            <p className="text-sm pt-[20px]">
              Become your own boss, choose your own schedule, and work in your
              preferred areas.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 gap-8 md:gap-16">
            <div className="space-y-2">
              <Link href="/" className="block text-sm hover:text-gray-300">
                Home{" "}
              </Link>
              <Link href="/compare" className="block text-sm hover:text-gray-300">
                Compare{" "}
              </Link>
             
            </div>
            <div className="space-y-2">
              <Link href="/allblogs" className="block text-sm hover:text-gray-300">
                Blog
              </Link>
              <a href="/contact" className="block text-sm hover:text-gray-300">
                Contact
              </a>
            </div>
          </div>

          {/* Social Icons */}
          {/* <div className="flex items-center gap-4 mt-6 md:mt-0">
            <a
              href="#"
              className="bg-white w-9 h-9 flex justify-center items-center shadow-lg rounded"
            >
              <div className="">
                <Twiter />
              </div>
            </a>
            <a
              href="#"
              className="bg-white w-9 h-9 flex justify-center items-center shadow-lg rounded"
            >
              <div className="">
                <Instragram />
              </div>
            </a>
            <a
              href="#"
              className="bg-white w-9 h-9 flex justify-center items-center shadow-lg rounded"
            >
              <div className="">
                <Whatsapp />
              </div>
            </a>
          </div> */}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800">
          <p className="text-sm text-gray-400 mb-4 md:mb-0">
            ©2025 XYZ, all rights reserved.
          </p>
          <Link href="/privacy" className="text-sm text-gray-400 hover:text-gray-300">
            Privacy and policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
