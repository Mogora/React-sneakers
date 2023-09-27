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
    const [isLoading, setIsLoading] = useState(true);

    useEffect( () => {
        async function fetchData() {
            setIsLoading(true);
            const cartResponse = await axios.get('https://6fabf5efe5bd68d8.mokky.dev/cart');
            const favoritesResponse = await axios.get('https://6fabf5efe5bd68d8.mokky.dev/favorites');
            const itemsResponse = await axios.get('https://6fabf5efe5bd68d8.mokky.dev/items');

            setIsLoading(false);

            setItems(itemsResponse.data);
            setCartItems(cartResponse.data);
            setFavorites(favoritesResponse.data);
        }

        fetchData();
    }, []);

    const onAddToCart = (obj) => {
        if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
            axios.delete(`https://6fabf5efe5bd68d8.mokky.dev/cart/${obj.id}`, obj);
            setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
        }
        else {
            axios.post('https://6fabf5efe5bd68d8.mokky.dev/cart', obj);
            setCartItems([...cartItems, obj]);
        }
    };

    const onAddToFavorite = async (obj) => {
        try {
            if (favorites.find((favoritesObj) => favoritesObj.id === obj.id)) {
                axios.delete(`https://6fabf5efe5bd68d8.mokky.dev/favorites/${obj.id}`);
            }
            else {
                const {data} = await axios.post('https://6fabf5efe5bd68d8.mokky.dev/favorites', obj);
                setFavorites((prev) => [...prev, data]);
            }
        }
        catch (error) {
            alert('Не удалось добавить в избранное');
        }

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
                          cartItems={cartItems}
                          isLoading={isLoading}
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
