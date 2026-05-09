import { MdAdd } from "react-icons/md";
import Link from "next/link";
import HeaderUserDropdown from "./HeaderUserDropdown";

export default function SubHeader() {
  return (
    <header className=" w-full lg:ml-0" style={{ background: "linear-gradient(180deg, rgba(111, 90, 205, 0.3) 0%, rgba(111, 90, 205, 0.1) 100%)" }}>
      <div className="mx-auto flex w-full max-w-none items-center justify-between px-6 py-4 xl:max-w-7xl xl:px-8">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link
            href="/"
            className="sm:text-2xl"
            style={{
              color: "#4A3A8A",
              fontFamily: "Abhaya Libre ExtraBold",
              fontWeight: 800,
              fontStyle: "normal",
              fontSize: "32px",
              lineHeight: "40px",
              letterSpacing: "0%",
            }}
          >
            EventVerse
          </Link>
        </div>

        {/* Navigation Links - Hidden on mobile, shown on desktop */}
        <nav className="hidden items-center space-x-6 lg:flex xl:space-x-8">
          <Link
            href="/"
            className="text-sm font-medium transition-colors hover:text-purple-700"
            style={{
              color: "#4A3A8A",
              fontFamily: "Inter",
              fontWeight: 400,
              fontStyle: "normal",
              fontSize: "16px",
              lineHeight: "24px",
              letterSpacing: "0%",
            }}
          >
            Home
          </Link>
          <Link
            href="/create-event"
            className="text-sm font-medium transition-colors hover:text-gray-700"
            style={{
              color: "#2D2D2D",
              fontFamily: "Inter",
              fontWeight: 400,
              fontStyle: "normal",
              fontSize: "16px",
              lineHeight: "24px",
              letterSpacing: "0%",
            }}
          >
            Create event
          </Link>
          <Link
            href="/join-event"
            className="text-sm font-medium transition-colors hover:text-purple-700"
            style={{
              color: "#4A3A8A",
              fontFamily: "Inter",
              fontWeight: 600,
              fontStyle: "normal",
              fontSize: "16px",
              lineHeight: "24px",
              letterSpacing: "0%",
            }}
          >
            Join event
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium transition-colors hover:text-gray-700"
            style={{
              color: "#2D2D2D",
              fontFamily: "Inter",
              fontWeight: 400,
              fontStyle: "normal",
              fontSize: "16px",
              lineHeight: "24px",
              letterSpacing: "0%",
            }}
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium transition-colors hover:text-gray-700"
            style={{
              color: "#2D2D2D",
              fontFamily: "Inter",
              fontWeight: 400,
              fontStyle: "normal",
              fontSize: "16px",
              lineHeight: "24px",
              letterSpacing: "0%",
            }}
          >
            Contact
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          {/* Create Event Button */}
          <Link
            href="/create-event"
            className="flex h-[36px] w-[120px] items-center justify-center text-xs font-medium text-white transition-colors hover:bg-purple-700 sm:h-[48px] sm:w-[166px] sm:text-sm"
            style={{
              borderRadius: "40px",
              backgroundColor: "#6F5ACD",
              paddingTop: "6px",
              paddingRight: "12px",
              paddingBottom: "6px",
              paddingLeft: "12px",
              gap: "8px",
              opacity: 1,
            }}
          >
            <MdAdd className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="text-xs sm:text-sm">Create event</span>
          </Link>

          {/* User Profile Dropdown */}
          <HeaderUserDropdown />
        </div>
      </div>

      {/* Mobile Navigation - Show navigation links on smaller screens */}
      <div className="border-t border-gray-200 lg:hidden">
        <div className="flex items-center justify-center space-x-4 px-4 py-3">
          <Link
            href="/"
            className="text-xs font-medium"
            style={{
              color: "#4A3A8A",
              fontFamily: "Inter",
              fontWeight: 400,
              fontStyle: "normal",
              fontSize: "16px",
              lineHeight: "24px",
              letterSpacing: "0%",
            }}
          >
            Home
          </Link>
          <Link
            href="/create-event"
            className="text-xs font-medium"
            style={{
              color: "#2D2D2D",
              fontFamily: "Inter",
              fontWeight: 400,
              fontStyle: "normal",
              fontSize: "16px",
              lineHeight: "24px",
              letterSpacing: "0%",
            }}
          >
            Create event
          </Link>
          <Link
            href="/join-event"
            className="text-xs font-medium"
            style={{
              color: "#2D2D2D",
              fontFamily: "Inter",
              fontWeight: 400,
              fontStyle: "normal",
              fontSize: "16px",
              lineHeight: "24px",
              letterSpacing: "0%",
            }}
          >
            Join event
          </Link>
          <Link
            href="/about"
            className="text-xs font-medium"
            style={{
              color: "#2D2D2D",
              fontFamily: "Inter",
              fontWeight: 400,
              fontStyle: "normal",
              fontSize: "16px",
              lineHeight: "24px",
              letterSpacing: "0%",
            }}
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-xs font-medium"
            style={{
              color: "#2D2D2D",
              fontFamily: "Inter",
              fontWeight: 400,
              fontStyle: "normal",
              fontSize: "16px",
              lineHeight: "24px",
              letterSpacing: "0%",
            }}
          >
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
}
