'use client';
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { IoClose } from "react-icons/io5";
import { FiMenu } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import { FaBox, FaTags, FaBuilding, FaBlogger, FaChartBar, FaRegUser } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "@/Redux/ReduxFunction";
import Cookies from "js-cookie";
import { AppDispatch, RootState } from "@/Redux/store";
import logout from "@/assests/logout.png";
import logo from "@/assests/logo/Logo.png";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const navigation = [
  { label: "Dashboard", route: "/", icon: <MdDashboard size={20} /> },
  { label: "Product", route: "/products", icon: <FaBox size={20} /> },
  { label: "Category", route: "/category", icon: <FaTags size={20} /> },
  { label: "Brand", route: "/brand", icon: <FaBuilding size={20} /> },
  { label: "Blog", route: "/blog", icon: <FaBlogger size={20} /> },
  { label: "Benchmark", route: "/benchmark", icon: <FaChartBar size={20} /> },
  { label: "Contact", route: "/contact", icon: <FaChartBar size={20} /> },

];

const NavbarSlider = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const path = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const { name } = useSelector((state: RootState) => state.Auth);
  const router = useRouter();

  const handleLogOut = () => {
    dispatch(logOut());
    Cookies.remove("accessToken");
    router.push("/login");
  };

  return (
    <div className="relative flex">
      <button
        onClick={toggleSidebar}
        className="absolute z-50 top-4 left-4 text-white p-2 rounded-md bg-secondary shadow-md"
      >
        {isOpen ? <IoClose size={24} /> : <FiMenu size={24} />}
      </button>

      <div
        className={`h-screen bg-secondary duration-300 flex flex-col font-inter ${isOpen ? 'w-[320px]' : 'w-[80px]'}`}
      >
        {isOpen && (
        <Link href="/" className="flex justify-start  pl-4 pt-[50px] pb-[15px]">
        <div className="w-[180px] h-[120px] flex items-center justify-start  ">
          <Image width={100} height={100} src={logo} alt="logo_image" className="rounded-lg " />
        </div>
      </Link>
      
        )}

        <div className={`flex flex-col justify-between h-screen pb-11 ${isOpen ? "pt-0" : 'pt-14'}`}>
          <div className="space-y-3">
            <ul className="pt-2 pb-4 space-y-1 text-sm">
              {navigation.map((item) => {
                const isActive = path === item.route;
                return (
                  <li key={item.route}>
                    <Link
                      href={item.route}
                      className={`relative flex items-center h-11 pr-6 py-[10px] pl-[24px] text-lg transition-all my-3 duration-300 ${isActive
                        ? "poppins-semibold text-white border-l-4 border-primary bg-[#4D6BDD] rounded-[8px]"
                        : "text-white hover:bg-[#4D6BDD] hover:text-white"}`}
                    >
                      {item.icon}
                      {isOpen && <span className="ml-3 text-[18px] tracking-wide truncate">{item.label}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>

            <button
              onClick={handleLogOut}
              className={`relative flex items-center h-11 pr-6 py-[10px] pl-[24px] text-lg transition-all duration-300 poppins-semibold hover:bg-gradient-to-r   to-white text-black border-l-4 ${isOpen ? '' : 'justify-center'}`}
            >
              <Image src={logout} alt="logout" width={20} height={20} className="ml-2" />
              {isOpen && <span className="ml-3 text-white text-[18px] tracking-wide truncate">Logout</span>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarSlider;
