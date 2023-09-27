import Card from "../Components/Card/Card";

function Home ({items, searchValue, setSearchValue,
                   onChangeSearchInput, onAddToCart, onAddToFavorite}) {
    return (
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
                    .filter((item) => item.title?.toLowerCase().includes(searchValue.toLowerCase()))
                    .map((item, index) => (
                        <Card
                            key={index}
                            title={item.title}
                            price={item.price}
                            imageUrl={item.imageUrl}
                            id={item.id}
                            handleClickPlus={(obj) => onAddToCart(obj)}
                            onAddToFavorite={(obj) => onAddToFavorite(obj)}
                        />
                    ))}
            </div>
        </div>
    )
}

export default Home;