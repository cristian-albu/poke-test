import { T_NavLink } from "@/components/nav/Navbar";
import { FaEye, FaHome } from "react-icons/fa";

export const navData: T_NavLink[] = [
  { label: "Home", href: "/", icon: <FaHome /> },
  { label: "Styleguide", href: "/styleguide", icon: <FaEye /> },
];
