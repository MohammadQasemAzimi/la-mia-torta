import styles from "../styles/Navbar.module.css";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
export default function Component() {
    return (
        <>
            <div className={styles.container}>
                <nav className={styles.nav}>
                    <div >
                    <a href="/" ><Image src="https://res.cloudinary.com/dlmrmq1tl/image/upload/v1670770166/LaMiaTorta/logo-withoutBG_sbnqri.png" height="200" width="200" alt="logo" className={styles.navBranding}/></a>
                    </div>
                    <ul className={styles.navMenu}>
                        <li className={styles.navItem}>
                            <Link href="/" className={styles.navLink}>Home</Link>
                        </li>
                        <li className={styles.navItem}>
                            <div className={styles.dropdown}>
                                <button className={styles.dropbtn}>My Account
                                    <i className="fa fa-caret-down">   ▼</i>
                                </button>
                                <div className={styles.dropdownContent}>
                                <a href="/bakers">Profile</a>
                                <a href="/bakers/new">Add New Cake</a>
                                <a href="/bakers/orders">Orders</a>
                                <a href="/profile">Change Passwrod</a>
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