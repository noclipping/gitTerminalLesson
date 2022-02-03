#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';
import continueKey from './detectKeypress.js';

let playerName;

const sleep = (ms = 1000) => new Promise((r)=> setTimeout(r, ms))
async function welcome(){
    const rainbowTitle = chalkAnimation.rainbow(
        'Welcome to the Github CLI learning tool!\n'
    )
    // await sleep();
    rainbowTitle.stop();
    console.log(`   ${chalk.bgGreen('INSTRUCTIONS')}

        You will be presented with a series of 
        information and questions about the ${chalk.bgBlue('Github')} CLI
        
        Press ${chalk.bgWhite.black('CTRL + C')} at any time to exit the program.
    `)
    await continueKey();

}

async function askName(){
    const answers = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message:'Press enter to continue.',
        default(){
            return ' ';
        },
    })

    playerName = answers.player_name;
}

async function question1(){
    console.log(`
        
       ${chalk.bgWhite.black('>git add <parameter>')}

        This command updates the ${chalk.bgBlue('index')} using the current content found 
        in the working tree, to prepare the content for the next commit.

        The ${chalk.bgBlue('index')} holds a snapshot of the content of the working tree, and it
        is this snapshot that is taken as the contents of the next commit.

        This command can be performed multiple times before a commit.

        ${chalk.bgRed.black('TIP:')} using a period as the parameter (i.e. "git add .") adds all new
        changes to the index of the current working tree.
        If one does not want to add all changes, one can specify a directory or a file path.

    `);
    async function q1prompt(){
    const answers = await inquirer.prompt({
        name: 'question_1',
        type: 'list',
        message: 'Who is the inventor of   \n',
        choices:['a: Linus Torvalds','b: LinusTechTips','c: GNUnix']
    })
    return handleAnswer(answers.question_1=='a: Linus Torvalds',q1prompt)
    }
    await q1prompt();
}

async function handleAnswer(isCorrect, callback){
    const spinner = createSpinner('Checking answer...').start()
    await sleep();
    if(isCorrect) {
        spinner.success({ text: `Nice job, that's ${chalk.bgGreen('correct!')}` })
    } else {
        spinner.error({ text: `Incorrect answer, try again`});
        await callback();
    }
}

    console.log(gradient.retro.multiline(figlet.textSync('GithubCLI',{
        horizontalLayout: 'default',
        verticalLayout: 'default'
    })))

await welcome()
// await askName()
await question1()
await askName();
// await question1();
function winner(){
   
    figlet('Fin.', (err,data)=>{
        console.log(gradient.pastel.multiline(data))
    })

}
winner()