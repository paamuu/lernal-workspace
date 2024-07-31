#!/usr/bin/env node
import { Command } from 'commander';
import * as path from 'path';
import { readdirSync } from 'node:fs';

const program = new Command();

//  动态获取其他的内容来添加
function register() {
  const pluginPath = path.resolve(__dirname, '../plugins');
  const files = readdirSync(pluginPath);
  files.forEach(file => {
    if (!file.endsWith('.d.ts')) {
      import(path.resolve(pluginPath, file)).then((_module) => {
        program.addCommand(_module.program);
      });
    }
  });
}

register();
program.parse();