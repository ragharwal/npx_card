#!/usr/bin/env node

'use strict'

const boxen = require("boxen");
const chalk = require("chalk");
const inquirer = require("inquirer");
const clear = require("clear");
const open = require("open");
const fs = require('fs');
const request = require('request');
const path = require('path');
const ora = require('ora');
const cliSpinners = require('cli-spinners');

// import boxen from 'boxen'
// import chalk from 'chalk'
// import clear from 'clear'
// import inquirer from 'inquirer'
// import open from 'open'
// import path from 'path'
// import fs from 'fs'
// import request from 'request'
// import ora from 'ora'
// import cliSpinners from 'cli-spinners'

clear();

const prompt = inquirer.createPromptModule();

const questions = [
    {
        type: "list",
        name: "action",
        message: "What you want to do?",
        choices: [
            {
                name: `Send me an ${chalk.greenBright.bold("email")}?`,
                value: () => {
                    open("mailto:ragharwal@gmail.com");
                    console.log("\nDone, see you soon at inbox.\n");
                }
            },
            {
                name: `Download my ${chalk.greenBright.bold("Resume")}?`,
                value: () => {
                    // cliSpinners.dots;
                    const loader = ora({
                        text: ' Downloading Resume',
                        spinner: cliSpinners.material,
                    }).start();
                    let pipe = request('https://ragharwal.me/resume').pipe(fs.createWriteStream('./resume.pdf'));
                    pipe.on("finish", function () {
                        let downloadPath = path.join(process.cwd(), 'resume.pdf')
                        console.log(`\nResume Downloaded at ${downloadPath} \n`);
                        open(downloadPath)
                        loader.stop();
                    });
                }
            },
            {
                name: "Just quit.",
                value: () => {
                    console.log("Goodbye. See you later.\n");
                }
            }
        ]
    }
];

const data = {
    name: chalk.bold.blue("             Raghav Agarwal"),
    handle: chalk.white("@ragharwal"),
    twitter: chalk.cyan("https://twitter.com/ragharwal"),
    github: chalk.cyan("https://github.com/ragharwal"),
    linkedin: chalk.cyan("https://linkedin.com/in/ragharwal"),
    web: chalk.cyan("https://ragharwal.me"),
    npx: chalk.red("npx") + " " + chalk.white("ragharwal"),

    labelTwitter: chalk.white.bold("    Twitter:"),
    labelGitHub: chalk.white.bold("     GitHub:"),
    labelLinkedIn: chalk.white.bold("   LinkedIn:"),
    labelWeb: chalk.white.bold("        Web:"),
    labelCard: chalk.white.bold("       Card:")
};

const me = boxen(
    [
        `${data.name}`,
        ``,
        `${chalk.italic("A Pre-Final Year Student, Pursuing Computer Science Engineering with a ")}`,
        `${chalk.italic("Specialization in Big Data from University of Petroleum and Energy Studies")}`,
        `${chalk.italic(" and a Passionate Self-Taught Full Stack Web Developer from India.")}`,
        ``,
        `${data.labelTwitter}  ${data.twitter}`,
        `${data.labelGitHub}  ${data.github}`,
        `${data.labelLinkedIn}  ${data.linkedin}`,
        `${data.labelWeb}  ${data.web}`,
        ``,
        `${data.labelCard}  ${data.npx}`
    ].join("\n"),
    {
        margin: 1,
        float: 'center',
        padding: 1,
        borderStyle: "single",
        borderColor: "green",
        width: "50"
    }
);

console.log(me);
const tip = [
    `Tip: Try ${chalk.cyanBright.bold(
        "cmd/ctrl + click"
    )} on the links above`,
    '',
].join("\n");
console.log(tip);

prompt(questions).then(answer => answer.action());
