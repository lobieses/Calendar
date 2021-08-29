import style from './Logo.module.scss';

const Logo = () => {
    return (
        <div className={style.logo}>
           <div className={style.vertical}>
               w
               <br/>
               e
           </div>
            <div className={style.horizontal}>
                <span>R</span>devs
            </div>
        </div>
    )
}

export default Logo