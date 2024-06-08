import { ConsoleMessage } from "puppeteer-core";

const puppeteer = require('puppeteer-core');

class App {
    homeURL: '';
    debugPort: '';
    constructor(props) {
        this.homeURL = props.homeURL;
        this.debugPort = props.debugPort;
    }
    public async startPage(){
        const browser = this.debugPort ? await puppeteer.connect({
            browserURL: this.debugPort,
        }) : await puppeteer.launch({ headless: false });

        console.log(browser)
    }
}

export default App;