import { ChildProcess, spawn, SpawnOptions } from 'child_process';


function execute() {
  const options: SpawnOptions = {
    cwd: process.cwd(),
    stdio: 'inherit',
    shell: true,
  };
  const schematic = getSchematicExecutePath();
  console.log(schematic, '命令');
  // '--list-schematics'
  const args = ['@muilk/schematics:application', '--dry-run', 'false'];
  const child: ChildProcess = spawn(
    `node`,
    [schematic, ...args],
    options,
  );
  child.on('close', (code) => {
    if (code === 0) {
      console.log('执行成功');
    } else {
      console.log('执行失败');
    }
  });
}

/**
 * 获取schematic-cli的执行文件所在目录
 */
function getSchematicExecutePath() {
  return require.resolve(
    '@angular-devkit/schematics-cli/bin/schematics.js',
    { paths: getModulePaths() },
  );
}

function getModulePaths() {
  return module.paths;
}

export {
  execute,
};
