import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { Rare } from "./Rare" // imports rare component from rare.js
import "./index.css"

//Renders Rare component in browser
const container = document.getElementById("root")
const root = createRoot(container)
root.render(
  <BrowserRouter>
    <Rare />
  </BrowserRouter>
)
