import Link from "next/link";
import styles from "./NavBar.module.css"; // CSS Modules

export default function NavBar() {
  return (
    <nav className={styles.navbar}>
      {/* Logo */}
      <Link href="/" className={styles.logo}>
        Clinica Veterinaria
      </Link>

      {/* Menú Hamburguesa (solo móvil) */}
      <input
        type="checkbox"
        id={styles.menuToggle}
        className={styles.menuInput}
      />
      <label htmlFor={styles.menuToggle} className={styles.menuButton}>
        <span></span>
        <span></span>
        <span></span>
      </label>

      {/* Links de navegación */}
      <div className={styles.linksContainer}>
        {["Disponibles Para Adopcion", "Productos", "Servicios", "About us"].map((item) => {
          const getHref = (item) => {
            switch(item) { 
              case "About us": return "/about";
              case "Disponibles Para Adopcion": return "/adopcion"
              default: return "#";
            }
          };

          return (
            <Link key={item}
                href={getHref(item)} 
                className={styles.navLink}
                style={getHref(item) === "#" ? { cursor: "not-allowed", opacity: 0.7 } : {}}
             >
              {item}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
