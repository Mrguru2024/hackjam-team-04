import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "../../context/UserContext";
import { getAuth, signOut } from "firebase/auth";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: "🏠" },
  { href: "/tasks", label: "Tasks", icon: "📝" },
  { href: "/badges", label: "Badges", icon: "🏅" },
  { href: "/leaderboard", label: "Leaderboard", icon: "📊" },
];

export default function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();

  // Hide NavBar on auth and onboarding pages
  if (pathname.startsWith("/auth") || pathname.startsWith("/onboarding")) {
    return null;
  }

  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
    router.push("/auth/login");
  };

  return (
    <nav className="w-full bg-white dark:bg-surface-default border-b border-border-default shadow-sm sticky top-0 z-30">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-2">
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-jura font-bold text-primary-default select-none">
            LevelUp
          </span>
        </div>
        <div className="flex items-center space-x-2 md:space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-3 py-2 rounded-lg font-medium transition-colors duration-200 text-title hover:bg-primary-subtle hover:text-primary-default ${
                pathname.startsWith(item.href)
                  ? "bg-primary-subtle text-primary-default"
                  : ""
              }`}
            >
              <span className="mr-2 text-lg">{item.icon}</span>
              <span className="hidden md:inline">{item.label}</span>
            </Link>
          ))}
          <Link
            href="/profile"
            className="ml-2 flex items-center justify-center w-10 h-10 rounded-full bg-surface-subtle border border-border-default text-title hover:bg-primary-subtle hover:text-primary-default transition-colors duration-200"
            title="Account"
          >
            {user && user.photoURL ? (
              <img
                src={user.photoURL}
                alt="avatar"
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <span className="text-xl">👤</span>
            )}
          </Link>
          <button
            onClick={handleLogout}
            className="ml-2 px-4 py-2 rounded-lg bg-primary-default text-text-negative font-bold hover:bg-primary-lighter transition-colors duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
