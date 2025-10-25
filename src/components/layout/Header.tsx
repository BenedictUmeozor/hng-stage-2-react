import { useAuth } from "@/hooks/useAuth";
import { Link, useNavigate } from "react-router";

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          TicketFlow
        </Link>
        <nav className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="rounded-md px-4 py-2 text-gray-700 transition-colors hover:bg-gray-100"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="rounded-md border border-blue-600 px-4 py-2 text-blue-600 transition-colors hover:bg-blue-50"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/auth/login"
                className="rounded-md px-4 py-2 text-gray-700 transition-colors hover:bg-gray-100"
              >
                Login
              </Link>
              <Link
                to="/auth/signup"
                className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
              >
                Get Started
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
