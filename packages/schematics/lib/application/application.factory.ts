import {
  apply, filter,
  mergeWith, move, noop,
  Rule, Source, strings, template, url,
} from '@angular-devkit/schematics';
import { ApplicationOptions } from './application.schema';
import { join, Path } from '@angular-devkit/core';

export function main(options: ApplicationOptions): Rule {
  const path =
    !options.directory || options.directory === 'undefined'
      ? options.name
      : options.directory;
  options.description = '描述信息';
  options.strict = false;
  options.style = 'less';
  return mergeWith(generate(options, options.name));
}

function generate(options: ApplicationOptions, path = ''): Source {
  return apply(url(join('./files' as Path, '')), [
    filter((path) => {
      console.log(path, 'path');
      return !!path.length;
    }),
    template({
      ...strings,
      ...options,
    }),
    move(path), // 移动到指定目录，根据命令所执行的命令下的path
  ]);
}
