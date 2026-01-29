import {createRoot} from "react-dom/client"
import reactLogo from "/src/assets/react.svg"

createRoot(document.getElementById('root')).render(
        <>
            <header>
                <img src={reactLogo} width="40px" alt="React Logo"/>
                <h2>ReactFacts</h2>
            </header>
            <main>
                <h1>Fun facts about React</h1>
                <ul>
                    <li>Was first released in 2013</li>
                    <li>Was originally created by Jordan Walker</li>
                    <li>Has well over 200K stars on GitHub</li>
                    <li>Is maintained by Meta</li>
                    <li>Powers thousands of enterprise apps, including mobile apps</li>
                </ul>
            </main>
        </>
)