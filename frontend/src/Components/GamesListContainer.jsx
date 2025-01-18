import React from 'react'
import crashImage from '../Assets/crash.jpeg'
import diceImage from '../Assets/dice.jpg'
import minesImage from '../Assets/mines.png'
import { useNavigate } from 'react-router-dom'

const GamesListContainer = () => {
    const navigate = useNavigate();

    const gameData = [{ name: "crashgame", img: crashImage }, { name: "dicegame", img: diceImage }, { name: "minesgame", img: minesImage }, { name: "crashgame", img: crashImage }, { name: "dicegame", img: diceImage }, { name: "minesgame", img: minesImage }]

    return (
        <>
            {gameData.map(data => (
                <div key={data.name} onClick={() => { navigate(`/${data.name}`) }} style={{ margin: "10px" }}>
                    <img src={data.img} style={{ height: "230px", borderRadius: "20px" }} alt='' />
                </div>
            ))}
        </>
    )
}

export default GamesListContainer