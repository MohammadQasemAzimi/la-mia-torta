import styles from "../styles/Navbar.module.css";
import { signIn, signOut } from "next-auth/react";

export default function Component() {
    /*const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".navMenu");

    hamburger.addEventListener("click", ()=> {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    })
    document.querySelectorAll(".navLink").forEach(e => n.addEventListener("click", ()=> {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }))*/
    return (
        <>
            <div className={styles.container}>
                <nav className={styles.nav}>
                    <a href="/" className={styles.navBranding}></a>
                    <ul className={styles.navMenu}>
                        <li className={styles.navItem}>
                            <a href="/" className={styles.navLink}>Home</a>
                        </li>
                        <li className={styles.navItem}>
                            <div className={styles.dropdown}>
                                <button className={styles.dropbtn}>My Account
                                    <i class="fa fa-caret-down">   ▼</i>
                                </button>
                                <div className={styles.dropdownContent}>
                                <a href="/bakers">Profile</a>
                                <a href="/bakers/new">Add New Cake</a>
                                <a href="/bakers/orders">Orders</a>
                                <a href="/" onClick={() => signOut()} value="action">Log out</a>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div className={styles.hamburger}>
                        <span className={styles.bar}></span>
                        <span className={styles.bar}></span>
                        <span className={styles.bar}></span>
                    </div>
                </nav>
            </div>
        </>
    )
}