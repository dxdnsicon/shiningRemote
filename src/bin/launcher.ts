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
      keyword: '信用卡'
    });
  });
program.parse(process.argv);
