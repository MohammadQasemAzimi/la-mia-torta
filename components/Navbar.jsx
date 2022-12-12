import styles from "../styles/Navbar.module.css";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function Component() {
    return (
        <>
            <div className={styles.container}>
                <nav className={styles.nav}>
                    <Link href="/" className={styles.navBranding}/>
                    <ul className={styles.navMenu}>
                        <li className={styles.navItem}>
                            <Link href="/" className={styles.navLink}>Home</Link>
                        </li>
                        <li className={styles.navItem}>
                            <div className={styles.dropdown}>
                                <button className={styles.dropbtn}>My Account
                                    <i class="fa fa-caret-down">   ▼</i>
                                </button>
                                <div className={styles.dropdownContent}>
                                <Link href="/bakers">Profile</Link>
                                <Link href="/bakers/new">Add New Cake</Link>
                                <Link href="/bakers/orders">Orders</Link>
                                <Link href="/" onClick={() => signOut()} value="action">Log out</Link>
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