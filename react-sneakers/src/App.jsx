import './App.css';
import Card from './Components/Card/Card'
import Header from "./Components/Header";
import Drawer from "./Components/Drawer";
import {useEffect, useState} from "react";


function App() {
    const [items, setItems] = useState(['']);
    const [cartOpened, setCartOpened] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        fetch('https://64fde9e8596493f7af7ec2a3.mockapi.io/items')
            .then((res) => {
                return res.json();
            })
            .then((json) => {
                setItems(json);
            });
    }, []);

    const onAddToCart = (obj) => {
        setCartItems([...cartItems, obj]);
    };

    function handleClickClose(){
        setCartOpened(false)
    };


    function handleClickCart(){
        setCartOpened(true)
    }

    const onChangeSearchInput = (event) => {

    }
    return (
        <div className="wrapper clear">
            {cartOpened ? <Drawer items={cartItems} handleClickClose={handleClickClose}/> : null}
            <Header handleClickCart={handleClickCart}/>
            <div className="content p-40">
                <div className="d-flex align-center mb-40 justify-between">
                    <h1>Все кроссовки</h1>
                    <div className="search-block d-flex">
                    <img src="/img/search.svg" alt="Search"/>
                    <input placeholder="Поиск..."/>
                </div>
                </div>
                <div className="sneakers d-flex flex-wrap">
                {items.map((item, index) =>
                <Card
                    key={index}
                    title={item.title}
                    price={item.price}
                    imageUrl={item.imageUrl}
                    handleClickPlus={(obj) => onAddToCart(obj)}/>)
               }
            </div>
            </div>
        </div>
  );
}

export default App;
