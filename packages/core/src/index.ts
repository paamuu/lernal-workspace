#!/usr/bin/env node
import { Command } from 'commander';
import * as path from 'path';
import { readdirSync } from 'node:fs';
import { spawn, sync } from 'cross-spawn';

const program = new Command();
console.log('test');

//  动态获取其他的内容来添加test
async function register() {
  // const child = sync('npm search muilk', { stdio: 'pipe' });
  const { plugins, toolkits } = await getPackages();
  console.log(toolkits, 'took');
  // try {
  //   sync(`npm install ${toolkits.join(' ')}`, { stdio: 'inherit' });
  // } catch (error) {
  //   console.error(`Failed to install package  ${error.message}`);
  //   process.exit(1);
  // }
  // 将所有依赖包添加到package中，然后重新安装
  // const pluginPath = path.resolve(__dirname, '../plugins');
  // 只知道包的名称
  // const files = readdirSync(pluginPath);
  // files.forEach(file => {
  //   if (!file.endsWith('.d.ts')) {
  //     import(path.resolve(pluginPath, file)).then((_module) => {
  //       program.addCommand(_module.program);
  //     });
  //   }
  // });
}

/**
 * 根据npm接口获取包
 */
async function getPackages() {
  return fetch('https://registry.npmjs.org/-/v1/search?text=scope:muilk').then(res => res.json()).then(result => {
    const packages = result.objects || [];
    const toolkits = packages.filter((item: any) => {
      return item.package.name.startsWith('@muilk/toolkit-');
    })?.map((p: any) => p.package.name);
    const plugins = packages.filter((item: any) => {
      return item.package.name.startsWith('@muilk/plugin-');
    })?.map((p: any) => p.package.name);
    return {
      toolkits,
      plugins,
    };
  });
}

register();
program.parse();