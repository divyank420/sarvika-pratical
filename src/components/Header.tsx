import { Link } from 'react-router-dom'
import { useThemeStore } from '../store/themeStore';
import { useAuthStore } from '../store/authStore';

export default function Header() {
    const { theme, toggleTheme } = useThemeStore();
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    return (
        <header className="flex justify-between items-center p-4 shadow bg-white dark:bg-gray-800">
            <h1 className="text-xl text-blue-900 font-bold">
                <Link to="/">📊 Mini Dashboard</Link>
            </h1>
            <div className="flex items-center gap-4">
                <button
                    onClick={toggleTheme}
                    className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700"
                >
                    {theme === "dark" ? "Light" : "Dark"} Mode
                </button>
                {user ? (
                    <>
                        <span className="hidden sm:inline text-black">Hello, {user.name}</span>
                        <button
                            onClick={logout}
                            className="px-3 py-1 rounded bg-red-500 text-white"
                        >
                            Logout
                        </button>
                    </>
                ) : null}
            </div>
        </header>
    )
}
