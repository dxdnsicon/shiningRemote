import initPage from '../browser/page';
class App {
    homeURL: '';
    debugPort: '';
    constructor(props) {
        this.homeURL = props.homeURL;
        this.debugPort = props.debugPort;
    }
    public async startPage(){
        const cookies = `gid.sign=422GQ6FGOrifk1B9vgITklY0bEc=; abRequestId=2284730d7798677abe7fec1aa913f69f; xsecappid=xhs-pc-web; acw_tc=114c5afe5f0b1adf5cbb64666048e338b25d7298974a0f9f48c101ebf81a3a77; webBuild=4.22.4; a1=190534289b4ovl15xeev25nw3hmh6u79v3jryuyij30000254075; webId=75d67b39c18675af6702a910ef025c3b; websectiga=8886be45f388a1ee7bf611a69f3e174cae48f1ea02c0f8ec3256031b8be9c7ee; sec_poison_id=1df2cdf7-22cc-4f8b-92c1-35fc746aa7bf; gid=yj82q4JYd8hiyj82q4JYjq7vD4lh1y2CddhJV3V2IEqx6Fq8xK7Wjv888J248W2822ji400W; web_session=0400698ca709d4563c4f7bff4e344b3f2a0362; unread={%22ub%22:%226658158a0000000015009b88%22%2C%22ue%22:%22666c07f10000000006004fb2%22%2C%22uc%22:29}`

        const page = await initPage(cookies);

        await page.goto('https://xiaohongshu.com');

        console.log('打开页面')
    }
}

export default App;