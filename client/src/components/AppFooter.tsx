import { Link } from "wouter";

export default function AppFooter() {
  return (
    <footer className="bg-gray-200 p-4 text-center text-darkText">
      <p>
      ComuniTech | {" "}
        <Link href="/help">
          <a className="underline hover:text-primary focus:outline-none focus:text-primary">
            Help
          </a>
        </Link> | {" "}
        <Link href="/about">
          <a className="underline hover:text-primary focus:outline-none focus:text-primary">
            About
          </a>
        </Link>
      </p>
    </footer>
  );
}
