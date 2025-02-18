import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/authProvider.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import styles from "./Header.module.css";
function Header() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className={styles.header__cont}>
      <Link
        to="/"
        className={styles.logo__cont}
        onClick={() => setMenuOpen(false)}
      >
        <img className={styles.logo} src="/logo__transparent.png" alt="logo" />
        <h3 className={styles.logo__text}>ThoughtSpill</h3>
      </Link>
      <button
        className={`${styles.icon} ${menuOpen ? styles.arrIcon : ""}`}
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Toggle menu"
      >
        <FontAwesomeIcon icon={menuOpen ? faCaretRight : faBars} />
      </button>

      {/* ----------------------- mobile menu ----------------------- */}
      <nav className={`${styles.mobileMenu} ${menuOpen && styles.open}`}>
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? `${styles.activeLink} ${styles.link}` : styles.link
              }
              onClick={() => setMenuOpen(false)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? `${styles.activeLink} ${styles.link}` : styles.link
              }
              onClick={() => setMenuOpen(false)}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/posts"
              className={({ isActive }) =>
                isActive ? `${styles.activeLink} ${styles.link}` : styles.link
              }
              onClick={() => setMenuOpen(false)}
            >
              Posts
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/account"
              className={({ isActive }) =>
                isActive ? `${styles.activeLink} ${styles.link}` : styles.link
              }
              onClick={() => setMenuOpen(false)}
            >
              Account
            </NavLink>
          </li>
          {user && (
            <li>
              <button
                className={styles.link}
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>

      {/* ----------------------- tablets+ menu ----------------------- */}
      <nav className={styles.largeMenu}>
        <ul>
          <ul>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? `${styles.activeLink} ${styles.link}` : styles.link
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? `${styles.activeLink} ${styles.link}` : styles.link
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/posts"
                className={({ isActive }) =>
                  isActive ? `${styles.activeLink} ${styles.link}` : styles.link
                }
              >
                Posts
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/account"
                className={({ isActive }) =>
                  isActive ? `${styles.activeLink} ${styles.link}` : styles.link
                }
              >
                Account
              </NavLink>
            </li>
            {user && (
              <li>
                <button
                  className={styles.link}
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
