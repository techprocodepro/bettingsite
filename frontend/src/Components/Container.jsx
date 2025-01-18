import React from 'react'
import '../Styles/Container.css'
import CrashGame from '../games/Crash/CrashGame'
import { Route, Routes } from 'react-router-dom'
import HomePage from './HomePage'
import LoginPage from './LoginPage'
import DiceGame from './DiceGame'
import MinesGame from './MinesGame'

const Container = () => {
    return (

        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/home' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/crashgame' element={<CrashGame />} />
            <Route path='/dicegame' element={<DiceGame />} />
            <Route path='/minesgame' element={<MinesGame />} />
        </Routes>

    )
}

export default Container