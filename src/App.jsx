import { useState } from 'react'
import './App.css'
import MainComponent from "./components/MainComponent.jsx";

function App() {
    const [count, setCount] = useState(0)

    return (
        <div>
            <MainComponent/>
        </div>
    )
}

export default App
