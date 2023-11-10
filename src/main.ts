import './app.css'
import App from './App.svelte'

import { makeServer } from "./api/api.js";
makeServer({ environment: "development" });

const app = new App({
  target: document.getElementById('app'),
})

export default app
