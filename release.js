// const inquirer = require('inquirer'); // 命令行交互模块
// const shell = require('shelljs');

// import inquirer from 'inquirer';
// import shell from 'shelljs';

const inquirer = import('inquirer'); // 命令行交互模块
const shell = import('shelljs');

const getCommitDesc = async () => {
  return new Promise(async (resolve, reject) => {
    (await inquirer).default
      .prompt([
        {
          type: 'confirm',
          name: 'current',
          message:
            '源码仓库是否同步提交'
        },
        {
          type: 'list',
          name: 'type',
          choices: ['feat', 'fixed', 'update', 'delete', 'revert'],
          message:
            '请选择你所做的改动：'
        },
        {
          type: 'input',
          name: 'desc',
          message:
            '请输入你所做的改动内容：'
        }
      ])
      .then((answer) => {
        resolve(answer);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const main = async () => {
  const { echo,exec } = (await shell).default;
  echo(`\nReleasing start ...\n`);
  const commitDesc = await getCommitDesc();
  if(commitDesc.current) {
    await exec(`git add .`);
    await exec(`git commit -m "${commitDesc.type}: ${commitDesc.desc}"`);
    await exec(`git push`);
  }
  await exec(`npm run docs:build`);
  await exec(`cd ../`);
  await exec(`cp -af ./note/docs/.vuepress/dist/  ./L-SUI.github.io/`);
  await exec(`cd ./L-SUI.github.io`);
  await exec(`git add .`);
  await exec(`git commit -m "${commitDesc.type}: ${commitDesc.desc}"`);
  await exec('git push');
};

main();
