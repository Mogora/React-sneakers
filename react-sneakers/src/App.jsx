import './App.css';
import Card from './Components/Card/Card'
import Header from "./Components/Header";
import Drawer from "./Components/Drawer";
import {useEffect, useState} from "react";
import axios from "axios";


function App() {
    const [items, setItems] = useState(['']);
    const [cartOpened, setCartOpened] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        axios.get('https://64fde9e8596493f7af7ec2a3.mockapi.io/items').then((res) => {
            setItems(res.data);
            console.log(res.data)
        });
        axios.get('https://64fde9e8596493f7af7ec2a3.mockapi.io/cart').then((res) => {
            setCartItems(res.data);
        });
    }, []);

    const onAddToCart = (obj) => {
        axios.post('https://64fde9e8596493f7af7ec2a3.mockapi.io/cart', obj);
        setCartItems([...cartItems, obj]);
    };

    const onRemoveItem = (id) => {
        // axios.delete(`https://64fde9e8596493f7af7ec2a3.mockapi.io/cart/${id}`);
        setCartItems([(...cartItems) => cartItems.filter(item => item.id !== id)]);
    }

    function handleClickClose(){
        setCartOpened(false)
    };

    function handleClickCart(){
        setCartOpened(true)
    }

    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value);
    }
    return (
        <div className="wrapper clear">
            {cartOpened && <Drawer items={cartItems} handleClickClose={() => setCartOpened(false)} onRemove={onRemoveItem}/>}
            <Header handleClickCart={handleClickCart}/>
            <div className="content p-40">
                <div className="d-flex align-center mb-40 justify-between">
                    <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : "Все кроссовки"}</h1>
                    <div className="search-block d-flex">
                        <img src="/img/search.svg" alt="Search"/>
                        {searchValue && (
                            <img className="clear cu-p"
                                 onClick={() => setSearchValue('')}
                                 src="/img/btn-remove.svg"
                                 alt="Clear" />
                        )}
                        <input onChange={onChangeSearchInput}
                            value={searchValue}
                            placeholder="Поиск..."/>
                    </div>
                </div>
                <div className="sneakers d-flex flex-wrap">
                    {items
                        .filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))
                        .map((item, index) => (
                            <Card
                                key={index}
                                // title={item.title}
                                // price={item.price}
                                // imageUrl={item.imageUrl}
                                handleClickPlus={(obj) => onAddToCart(obj)}
                                {...item}/>
                        ))}
                </div>
            </div>
        </div>
  );
}

export default App;
