import style from './Modal.module.scss';

const Modal = ({modalWindowIsEnable, onDisableFocusWindow, focusDateInfo}) => {
    return (
        <div className={`${style.modalBackground} ${modalWindowIsEnable ? style.active : ''}`}>
            <div className={style.modal}>
                <div className={style.content}>
                    <div className={style.exit} onClick={onDisableFocusWindow}>
                        &#215;
                    </div>
                    <div>
                        <h2>Month</h2>
                        <input type="text" value={focusDateInfo.month} readOnly/>
                    </div>
                    <div>
                        <h2>Day</h2>
                        <input type="text" value={focusDateInfo.day} readOnly/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;