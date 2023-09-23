import './App.css';
import Header from "./Components/Header";
import Drawer from "./Components/Drawer";
import {useEffect, useState} from "react";
import axios from "axios";
import {Route, Routes} from "react-router-dom";
import Home from "./Pages/Home";
import Favorites from "./Pages/Favorites";


function App() {
    const [items, setItems] = useState(['']);
    const [cartOpened, setCartOpened] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        axios.get('https://6fabf5efe5bd68d8.mokky.dev/items').then((res) => {
            setItems(res.data);
        });
        axios.get('https://6fabf5efe5bd68d8.mokky.dev/cart').then((res) => {
            setCartItems(res.data);
        });
        axios.get('https://6fabf5efe5bd68d8.mokky.dev/favorites').then((res) => {
            setFavorites(res.data);
        });
    }, []);

    const onAddToCart = (obj) => {
        axios.post('https://6fabf5efe5bd68d8.mokky.dev/cart', obj);
        setCartItems([...cartItems, obj]);
    };

    const onAddToFavorite = (obj) => {
        axios.post('https://6fabf5efe5bd68d8.mokky.dev/favorites', obj);
        setFavorites([...favorites, obj]);
        console.log(favorites)
    };

    const onRemoveItem = (id) => {
        axios.delete(`https://6fabf5efe5bd68d8.mokky.dev/cart/${id}`);
        setCartItems((prev) => prev.filter(item => item.id !== id));
    }

    function handleClickCart(){
        setCartOpened(true)
    }

    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value);
    }

    console.log(favorites);
    return (
        <div className="wrapper clear">
            {cartOpened && <Drawer items={cartItems} handleClickClose={() => setCartOpened(false)} onRemove={onRemoveItem}/>}
            <Header handleClickCart={handleClickCart}/>

            <Routes>
                <Route path="/" exact element={
                    <Home items={items}
                          searchValue={searchValue}
                          setSearchValue={setSearchValue}
                          onChangeSearchInput={onChangeSearchInput}
                          onAddToCart={onAddToCart}
                          onAddToFavorite={onAddToFavorite}/>
                }>>
                </Route>
            </Routes>

            <Routes>
                <Route path="/favorites" exact element={
                    <Favorites items={favorites}
                               onAddToFavorite={onAddToFavorite}/>
                }>></Route>
            </Routes>
        </div>
  );
}

export default App;
