import { FaHome, FaShieldAlt, FaUser } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

export default function SidebarNav() {
  const location = useLocation();

  const navItems = [
    { to: "/dashboard", icon: FaHome, label: "Home" },
    { to: "/legalaid", icon: FaShieldAlt, label: "Legal Aid" },
    { to: "/profile", icon: FaUser, label: "Profile" },
  ];

  return (
    <aside className="sticky top-0 w-64 h-screen bg-[#23171b] flex flex-col justify-between px-4 border-r border-[#643E43] z-40">
      <div>
        <h2 className="text-2xl font-bold text-[#C6A3B5] mb-8 tracking-wider">Awaaz</h2>
        <nav className="flex flex-col gap-2">
          {navItems.map(item => {
            const Icon = item.icon;
            const active = location.pathname === item.to;
            return (
              <Link key={item.to} to={item.to} className="no-underline">
                <div
                  className={`flex items-center px-4 py-3 rounded-lg font-semibold text-lg transition
                    ${active
                      ? "bg-[#9E6263] text-white"
                      : "text-[#C6A3B5] opacity-90 hover:bg-[#643E43] hover:text-white"
                    }`}
                >
                  <Icon className="mr-3 text-xl" />
                  {item.label}
                </div>
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="text-[#C6A3B5] text-sm opacity-75 mt-8 mb-4">
        Share your story safely
      </div>
    </aside>
  );
}
