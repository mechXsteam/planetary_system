import {useState} from 'react'
import './App.css'
import MainComponent from "./components/MainComponent.jsx";

function App() {
    const [count, setCount] = useState(0)

    return (
        <div>
            <h1 style={{textAlign: 'center'}}>Exoplanet <span className={'color_text'}>hunt!</span></h1>
            <MainComponent/>
        </div>
    )
}

export default App
