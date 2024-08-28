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
  return mergeWith(generate(options, ''));
}

function generate(options: ApplicationOptions, path = ''): Source {
  return apply(url(join('./files' as Path, path)), [
    filter((path) => {
      console.log(path, 'path');
      return !!path.length;
    }),
    template({
      ...strings,
      ...options,
    }),
    move(path),
  ]);
}
