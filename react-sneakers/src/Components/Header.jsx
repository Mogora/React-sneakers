function Header({handleClickCart}) {
    return(
        <header className="d-flex justify-between align-center p-40">
            <div className="d-flex align-center">
                <img width={40} height={40} src="/img/logo.png"/>
                <div>
                    <h3 className="text-uppercase">React Sneakers</h3>
                    <p>Магазин лучших кроссовок</p>
                </div>
            </div>
            <ul className="d-flex">
                <li onClick={handleClickCart} className="mr-30 cu-p">
                    <img src="/img/cart.svg"/>
                    <span>1205 руб.</span>
                </li>
                <li>
                    <img src="/img/user.svg"/>
                </li>
            </ul>
        </header>
    );
}

export default Header;