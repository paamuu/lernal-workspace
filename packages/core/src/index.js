#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const path = require("path");
const node_fs_1 = require("node:fs");
const program = new commander_1.Command();
//  动态获取其他的内容来添加
function register() {
    const pluginPath = path.resolve(__dirname, '../plugins');
    const files = (0, node_fs_1.readdirSync)(pluginPath);
    files.forEach(file => {
    });
    console.log(files, 'files');
    // 读取其他cli
}
register();
program.parse();
