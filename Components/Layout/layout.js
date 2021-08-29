import Link from 'next/link'
import style from './layout.module.scss';
import Logo from '../Logo/Logo';
import { useRouter } from "next/router";

const Layout = ({children}) => {
    const router = useRouter();
    return (
        <div className={style.layout}>
            <div className={style.navigation}>
                <Logo />
                <nav>
                    <Link href={'/'}>
                        <a className={router.pathname === "/" ? style.active : ""}>home</a>
                    </Link>
                    <Link href={'/about'}>
                        <a className={router.pathname === "/about" ? style.active : ""}>about  us</a>
                    </Link>
                </nav>
            </div>
            <div className={style.children}>
                {children}
            </div>
        </div>
    )
}

export default Layout;