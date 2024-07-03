import whistle, { WhistleResult } from 'whistle';
import path from 'path';
import { getPort } from './';
import { WHISTLE_PATH } from '../config/task-config';
import kill from 'kill-port'

const logger = console;

const DEFAULT_TIMEOUT = 3000;
const DEFAULT_OPTIONS = {
    __maxHttpHeaderSize: 0,
    clearPreOptions: false,
    noGlobalPlugins: false,
    certDir: path.join(__dirname, '../../public/cert/'),
    mode: 'capture',
    port: 8080
}

interface WhistleOptions {
    baseDir: string;
    port: number;
}

export default class Whistle {
    public originOptions: Partial<WhistleOptions>;
    public options: WhistleOptions;
    private rules: any;
    private values: any;
    private w2Instance: WhistleResult;

    constructor(originOptions: Partial<WhistleOptions> = {}) {
        this.originOptions = originOptions
    }


    /**
     * 合并默认配置
     */
    async generatorW2Conf() {
        const port = this.originOptions.port || await getPort();
        const baseDir = this.originOptions.baseDir ? path.join(WHISTLE_PATH, this.originOptions.baseDir) : path.join(WHISTLE_PATH, String(port))

        this.options = {
            ...DEFAULT_OPTIONS,
            ...this.originOptions,
            port,
            baseDir
        }
    }


    /**
     * 启动 Whistle
     */
    start(): Promise<Whistle> {
        return new Promise(async (resolve, reject) => {
            await this.generatorW2Conf()

            const timer = setTimeout(() => {
                reject(new Error('timeout'))
            }, DEFAULT_TIMEOUT)

            const onStarted = () => {
                clearTimeout(timer)
                logger.info(`process ${process.pid} Whistle start at http://127.0.0.1:${this.options.port}`)
                this.rules = require('whistle/lib/rules/util').rules;
                this.values = require('whistle/lib/rules/util').values;
                resolve(this)
            }

            logger.info(`process ${process.pid} Start whistle ...`, JSON.stringify(this.options))
            this.w2Instance = whistle(this.options, onStarted);
        })
    }



    /**
     * 停止 Whistle
     */
    async stop() {
        const port = this.options.port;
        logger.info('kill whistle port', port)
        return await kill(port)
            .then(() => {
                logger.info(`process ${process.pid}  kill whistle port ${port} success`)
            })
            .catch(e => {
                logger.error(`process ${process.pid} kill whistle port ${port} error`)
                return Promise.reject(e)
            })
    }

    setRules(val) {
        logger.debug(`process ${process.pid} whistle ${this.options.port} set rules: ${val}`)
        return this.rules.setDefault(val)
    }

    addtionRules(val) {
        const rules = this.rules.getDefault();
        return this.rules.setDefault(rules + '\n' + val)
    }

    replaceRule(key, content, val) {
        const rules = this.rules.getDefault();
        if (rules.indexOf(key) > -1) {
            return this.rules.setDefault(rules.replace(key, content))
        } else {
            return this.addtionRules(val);
        }
    }

    setValues(name, val) {
        return this.values.add(name, val)
    }

    // 根据端口号拿到实利
    static getInstanceFromPort(port: string, value) {
        console.log('whistle', whistle)
    }
};