import React, {useState} from 'react';
import './ProductList.css';
import {ProductItem} from "./ProductItem/ProductItem";
import {useTelegram} from "../../hooks/useTelegram";
import {useCallback, useEffect} from "react";

const products = [
   {id: '1', title: 'Пополнение баланса для Росии от 100-18000', price: 180, description: 'Пополнение от 100-18000 ₽ ОСНОВНАЯ ЦЕНА БУДЕТ ПОСЛЕ СВЯЗИ С ПРОДАВЦОМ!!!!', img: 'https://ggsel.net/_next/image?url=https%3A%2F%2Fimg.ggsel.ru%2F4109557%2Foriginal%2F250x250%2Fp1_4109557_b2ac69d3.webp&w=640&q=75'},
   {id: '2', title: 'голда в стендофф', price: 199, description: '100голды-199руб, 500голды-599руб, 1000голды-981руб , 3000голды-2500руб ', img:'data:image/jpeg;base64,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'},
   {id: '3', title: 'игры стим гифтом', price: 500, description: 'вы связывайтесь с продавцом говорите игру ему и он присылает цену на пакупку игры гифтом', img:' https://steam-account.ru/img/product/s/steam-gift-cards/steam-gift-cards.jpg'}
]



const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}

export const ProductList = () => {
    const [addedItems, setAddedItems] = useState([]);

    const {tg, queryId, onClose} = useTelegram();

    const onSendData = useCallback(() => {
        
        const data = {
            products: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId,
        }
        fetch('http://85.119.146.179:8000/web-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        
    }, [addedItems])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    const onAdd = (product) => {
        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItems = [];

        if(alreadyAdded) {
            newItems = addedItems.filter(item => item.id !== product.id);
        } else {
            newItems = [...addedItems, product];
        }

        setAddedItems(newItems)

        if(newItems.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Купить ${getTotalPrice(newItems)}`
            })
            tg.onClose()
        }
    }

    return (
        <div className={'list'}>
            {products.map(item => (
                <ProductItem
                    product={item}
                    onAdd={onAdd}
                    className={'item'}
                />
            ))}
            <div className='reviews'>
            <h1>Отзывы  ↓    оставьте свой тут: https://t.me/+IJsTYA-PqPEwZTYy</h1>
            <p><b>Botik007: </b>харош магаз</p>
            <p><b>bebrik: </b>имба магазин купил голду</p>
            <p><b>0074567: </b>сначала думал обман но купил сижу кайфую пополнил стим</p>
            <p><b>mr.trololo: </b>продавец долго отвечал думал афк потом ответил купил 500руб на стим топчик ваще</p>
            <p><b>funduk228: </b>норм магаз доброе обслуживание</p>
            <p><b>455588554: </b>братюли сайт ИМБА</p>
            <p><b>meow: </b>котятки сайт пополняет продовец он тоже спит как и все поэтому может не отвечать а так пополнение рабочее</p>
            <p><b>cat_memasik: </b>голду пополняет долго но пополняет</p>
            </div>
     

        </div>
    );
};
 