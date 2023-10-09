import Card from "../Components/Card/Card";
import {useContext} from "react";
import {AppContext} from "../App";

function Favorites ({onAddToFavorite}) {
    const {favorites} = useContext(AppContext);
    return (
        <div className="content p-40">
            <div className="d-flex align-center mb-40 justify-between">
                <h1>Мое избранное</h1>
                <div className="search-block d-flex">
                    <img src="/img/search.svg" alt="Search"/>
                </div>
            </div>
            <div className="sneakers d-flex flex-wrap">
                {favorites.map((item, index) => (
                    <Card key={index}
                          title={item.title}
                          price={item.price}
                          imageUrl={item.imageUrl}
                          id={item.id}
                          onAddToFavorite={onAddToFavorite}
                          favorited={true}
                          />
                ))}
            </div>
        </div>
    )
}

export default Favorites;