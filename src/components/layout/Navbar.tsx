import { Link, useLocation } from "react-router-dom";
import { Search, Menu, X, Bookmark, X as XIcon } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "../ui/ThemeToggle";
import { useBookmarks } from "../../hooks/useBookmarks";
import { useAllCourses } from "../../hooks/useCourses";

const links = [
  { to: "/trimesters", label: "Trimesters" },
  { to: "/search", label: "Search" },
  { to: "/about", label: "About" },
  { to: "/contribute", label: "Contribute" },
];

export function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { bookmarkedIds, toggleBookmark } = useBookmarks();
  const { data: allCourses } = useAllCourses();

  const bookmarkedCourses = (allCourses ?? []).filter((c) =>
    bookmarkedIds.includes(c.id)
  );

  return (
    <nav className="sticky top-0 z-50 border-b border-[#EAECEF] bg-[#FAFBFD]/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex h-16 items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-xl text-[#1F2937] dark:text-slate-100"
          >
            <img src="/logo.svg" alt="Acadex" className="h-8 w-8" />
            Acadex
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150 ${
                  location.pathname === link.to
                    ? "bg-[#4F7CFF]/10 text-[#4F7CFF]"
                    : "text-[#6B7280] hover:text-[#1F2937] hover:bg-[#EAECEF]/50 dark:text-slate-300 dark:hover:text-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="relative group ml-1">
              <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-[#6B7280] hover:text-[#1F2937] hover:bg-[#EAECEF]/50 transition-all duration-150 dark:text-slate-300 dark:hover:text-slate-100 dark:hover:bg-slate-800 cursor-pointer">
                <Bookmark className="w-4 h-4" />
                My Courses
              </button>
            <div className="absolute right-0 top-full mt-2 w-80 rounded-2xl border border-[#EAECEF] bg-white shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 overflow-hidden dark:border-slate-800 dark:bg-slate-900 z-[100]">
              <div className="px-4 py-2.5 border-b border-[#EAECEF] dark:border-slate-800">
                <p className="text-xs font-medium text-[#6B7280] dark:text-slate-400">
                  Bookmarked Courses
                </p>
              </div>
              {bookmarkedCourses.length > 0 ? (
                <ul className="max-h-80 overflow-y-auto">
                  {bookmarkedCourses.map((course) => (
                    <li key={course.id} className="flex items-center group/item">
                      <Link
                        to={`/course/${course.id}`}
                        className="flex-1 min-w-0 flex flex-col gap-0.5 px-4 py-2.5 hover:bg-[#F8F9FA] transition-colors duration-150 dark:hover:bg-slate-800"
                      >
                        <p className="text-sm font-medium text-[#1F2937] dark:text-slate-100 break-words">
                          {course.course_name}
                        </p>
                        <p className="text-xs text-[#4F7CFF] font-medium">
                          {course.course_code}
                        </p>
                      </Link>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          toggleBookmark(course.id);
                        }}
                        className="p-2 mr-2 rounded-lg text-[#6B7280] hover:text-red-500 hover:bg-red-50 transition-all duration-150 cursor-pointer dark:hover:text-red-400 dark:hover:bg-red-950/30"
                        title="Remove bookmark"
                      >
                        <XIcon className="w-4 h-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                  <div className="px-4 py-6 text-center">
                    <p className="text-sm text-[#6B7280] dark:text-slate-400">
                      Bookmark courses to show here
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="ml-2">
              <ThemeToggle />
            </div>
          </div>

          <button
            className="md:hidden p-2 rounded-xl text-[#6B7280] hover:bg-[#EAECEF]/50 transition-all duration-150 cursor-pointer dark:text-slate-300 dark:hover:bg-slate-800"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-[#EAECEF] bg-white px-6 py-4 animate-[fadeIn_150ms_ease] dark:border-slate-800 dark:bg-slate-950">
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                  location.pathname === link.to
                    ? "bg-[#4F7CFF]/10 text-[#4F7CFF]"
                    : "text-[#6B7280] hover:text-[#1F2937] hover:bg-[#EAECEF]/50 dark:text-slate-300 dark:hover:text-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 mt-2 border-t border-[#EAECEF] dark:border-slate-800">
              <details className="group">
                <summary className="px-4 py-2.5 rounded-xl flex items-center justify-between cursor-pointer text-sm font-medium text-[#6B7280] hover:text-[#1F2937] hover:bg-[#EAECEF]/50 transition-all duration-150 dark:text-slate-300 dark:hover:text-slate-100 dark:hover:bg-slate-800">
                  <span className="flex items-center gap-1.5">
                    <Bookmark className="w-4 h-4" />
                    My Courses
                  </span>
                  <svg
                    className="w-4 h-4 transition-transform group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="mt-1 ml-1">
                  {bookmarkedCourses.length > 0 ? (
                    bookmarkedCourses.map((course) => (
                      <div key={course.id} className="flex items-center">
                        <Link
                          to={`/course/${course.id}`}
                          onClick={() => setMobileOpen(false)}
                          className="flex-1 px-3 py-2 rounded-xl flex flex-col gap-0.5 hover:bg-[#EAECEF]/50 transition-all duration-150 dark:hover:bg-slate-800"
                        >
                          <p className="text-sm font-medium text-[#1F2937] dark:text-slate-100 break-words">
                            {course.course_name}
                          </p>
                          <p className="text-xs text-[#4F7CFF] font-medium">
                            {course.course_code}
                          </p>
                        </Link>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            toggleBookmark(course.id);
                          }}
                          className="p-2 rounded-lg text-[#6B7280] hover:text-red-500 hover:bg-red-50 transition-all duration-150 cursor-pointer dark:hover:text-red-400 dark:hover:bg-red-950/30"
                          title="Remove bookmark"
                        >
                          <XIcon className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="px-3 py-2 text-sm text-[#6B7280] dark:text-slate-400">
                      Bookmark courses to show here
                    </p>
                  )}
                </div>
              </details>
            </div>
            <Link
              to="/search"
              onClick={() => setMobileOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-[#6B7280] hover:text-[#1F2937] hover:bg-[#EAECEF]/50 transition-all duration-150 dark:text-slate-300 dark:hover:text-slate-100 dark:hover:bg-slate-800"
            >
              Search
            </Link>
            <div className="px-4 pt-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
