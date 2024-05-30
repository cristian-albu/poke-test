import Link from "next/link";
import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white p-10 flex justify-center items-center gap-5">
      Cristian albu{" "}
      <Link
        href="https://github.com/cristian-albu"
        className="flex justify-center items-center gap-1"
        target="_blank"
        rel="noreferrer"
      >
        <FaGithub />
        Github
      </Link>
      <Link
        href="https://www.linkedin.com/in/cristian-albu-koddezign/"
        className="flex justify-center items-center gap-1"
        target="_blank"
        rel="noreferrer"
      >
        <FaLinkedin />
        LinkedIn
      </Link>
    </footer>
  );
};

export default Footer;
