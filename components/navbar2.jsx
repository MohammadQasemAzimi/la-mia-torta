import Link from "next/link"
import styles from "../styles/Navbar.module.css";

export default function Component() {
    return(
        <nav className={styles.navbar}>
            <div className= {styles.logo}>
                <img className={styles.navlogo} src="tortaImage/torta image.png"></img>
            </div>


                 <div className={styles.navlink}>
                    <Link href={`/`}>
                        <h4 className= {styles.Home}>Home</h4>
                    </Link>
                </div>

                    <div className={styles.navlink}>
                        <Link href={`/`}>
                            <h4 className= {styles.upload}>+upload</h4>
                        </Link>
                    </div>

                        <div className={styles.navlink}>
                            <Link href={`/`}>
                                <h4 className= {styles.orders}>Orders</h4>
                            </Link>
                         </div>

                         
                            <div className={styles.navlink}>
                                <img className={styles.myAccount} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIqHwacmgoLwY1ktf2aZ6yYfgbljMNNwK4GA&usqp=CAU"></img>
                            </div>
                
               

            
        </nav>
    )
}