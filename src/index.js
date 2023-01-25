import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { Rare } from "./Rare"
import "./index.css"

const container = document.getElementById("root")
const root = createRoot(container)
root.render(
    <BrowserRouter>
        <Rare />
    </BrowserRouter>
)
