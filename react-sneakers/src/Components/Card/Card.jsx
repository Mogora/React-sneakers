import styles from './Card.module.scss';
import React from 'react';

function Card({id, price, imageUrl, title, handleClickPlus, onAddToFavorite, favorited= false}) {
    const [isAdded, setIsAdded] = React.useState(false);
    const [isFavorite, setIsFavorite] = React.useState(favorited);


    const onClickPlus = () => {
        handleClickPlus({price, imageUrl, title});
        setIsAdded(!isAdded);
    }

    const onClickFavorite = () => {
        onAddToFavorite({id, price, imageUrl, title});
        setIsFavorite(!isFavorite);
    }

    return (
        <div className={styles.card}>
            <div className="favorite"
                 onClick={onClickFavorite}>
                <img src={isFavorite ? '/img/liked.svg' : '/img/unliked.svg'} alt="unliked"/>
            </div>
            <img width={133} height={112} src={imageUrl} alt="Sneakers"/>
            <h5>{title}</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                    <span>Цена:</span>
                    <b>{price}</b>
                </div>
                <img className={styles.plus}
                     onClick={onClickPlus}
                     src={isAdded ? '/img/btn-checked.svg' : '/img/btn-plus.svg'}/>
            </div>
        </div>
    );
}

export default Card;