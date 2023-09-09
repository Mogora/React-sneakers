import './App.css';
import Card from './Components/Card/Card'
import Header from "./Components/Header";
import Drawer from "./Components/Drawer";
import {useState} from "react";

const arr = [
    {
        title: 'Мужские Кроссовки Nike Blazer Mid Suede',
        price: 12999,
        imageUrl: '/img/sneakers/1.jpg',
    },
    {
        title: 'Мужские Кроссовки Nike Air Max 270',
        price: 15600,
        imageUrl: '/img/sneakers/2.jpg'
    },
    {
        title: 'Кроссовки Puma X Aka Boku Future Rider',
        price: 8999,
        imageUrl: '/img/sneakers/4.jpg',
    },
    {
        title: 'Мужские Кроссовки Nike Blazer Mid Suede',
        price: 8499,
        imageUrl: '/img/sneakers/3.jpg',
    },
];

function App() {
    const [cartOpened, setCartOpened] = useState(false);

    return (
        <div className="wrapper clear">
            {cartOpened ? <Drawer onClose={() => setCartOpened(false)}/> : null}
            <Drawer/>
            <Header onClickCart={() => setCartOpened(true)}/>
            <div className="content p-40">
                <div className="d-flex align-center mb-40 justify-between">
                    <h1>Все кроссовки</h1>
                    <div className="search-block d-flex">
                    <img src="/img/search.svg" alt="Search"/>
                    <input placeholder="Поиск..."/>
                </div>
                </div>
                <div className="sneakers d-flex">
                {arr.map((obj) =>
                <Card
                    title={obj.title}
                    price={obj.price}
                    imageUrl={obj.imageUrl}/>)}
            </div>
            </div>
        </div>
  );
}

export default App;
