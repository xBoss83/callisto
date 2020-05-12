/* 
* Callisto 
* Copyright 2020 @boss#0001
*/

/* Requiring Stuff Needed  */
const { Client, Collection } = require('eris'); 
const { Command } = require('./Classes/Command.js')
const { config } = require('dotenv'); 
let logDate = new Date().toLocaleTimeString(); 
const mongooseFile = require('./Database/Mongoose.js')
const mongoose = require('mongoose'); 
const { fs, readdir, readdirSync } = require('fs'); 
config({
    path: __dirname + '/.env'
});
const callisto = new Client(process.env.TOKEN,{
    disableEveryone: true, 
    getAllUsers: true, 
    messageLimit: 100,
    restMode: true
});

module.exports.callisto = callisto;

/* New collections for Commands/Events, etc */
callisto.commands = new Collection(Command)
callisto.aliases = new Collection();
callisto.events = new Collection(); 
callisto.categories = readdirSync('./Commands')

/* Command Handler */
readdirSync(`./Commands/`).forEach(dir => { 
    const commands = readdirSync(`./Commands/${dir}/`).filter(file => file.endsWith('.js'))

    for (let file of commands) { 
        let pull = require(`./Commands/${dir}/${file}`)
        let CmdClass = new pull.cmd()
        callisto.commands.add(CmdClass)
        
    }
    

})
console.log(`[Callisto] [${logDate}] Loaded Commands`)

/* Event Handler */ 
    const events = readdirSync(`./Events/`).filter(file => file.endsWith('.js')); 
    for (let file of events) { 
        const evt = require(`./Events/${file}`)
    }; 

console.log(`[Callisto] [${logDate}] Loaded Events`)

/* Login */
callisto.connect()

