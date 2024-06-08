#!/usr/bin/env node

import "dotenv/config";
import { program } from "commander";
import startApp from "../app/appinit";

//@ts-ignore
const packJson = require("../../package.json");
program
  .version(packJson.version, "-v, --version")

// 创建一个实例
program
  .command("instance")
  .action(async () => {
    await startApp({
      picDir: '/data/www/AdRobot/dist',
      content: '测试文案',
      task: 'publish',
      account: [
        {
          account: '13148716794',
          password: '19930505'
        }
      ]
    });
  });
program.parse(process.argv);
