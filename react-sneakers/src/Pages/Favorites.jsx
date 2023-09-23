import Card from "../Components/Card/Card";

function Favorites ({items, searchValue, setSearchValue,
                   onChangeSearchInput, onAddToCart, onAddToFavorite}) {
    return (
        <div className="content p-40">
            <div className="d-flex align-center mb-40 justify-between">
                <h1>Мое избранное</h1>
                <div className="search-block d-flex">
                    <img src="/img/search.svg" alt="Search"/>
                </div>
            </div>
            <div className="sneakers d-flex flex-wrap">
                {items.map((item, index) => (
                    <Card key={index}
                          {...item}
                          // title={item.title}
                          // price={item.price}
                          // imageUrl={item.imageUrl}
                          onAddToFavorite={onAddToFavorite}
                          favorited={true}
                          />
                ))}
            </div>
        </div>
    )
}

export default Favorites;