const Discord = require('discord.js');
const Commando = require('discord.js-commando');
const path = require('path');
const fs = require('fs');
const Config = require("./Config.js");
const Database = require("./Database.js");
const Utils = require("./utils/utils.js");


const bot = new Commando.Client({
	commandPrefix : Config.commandPrefix,
	owner : Config.clientID,
	unknownCommandResponse: false
});

if( Database.initialized() ) {
	console.log("Database is initialized");
} else {
	console.log("Database is not initialized");
	Database.init();
}

bot.registry
	.registerDefaultTypes()
	.registerGroups([
        "characters"
	])
	.registerDefaultGroups()
	.registerCommandsIn(path.join(__dirname, 'commands'));

bot.once('ready', () => {
	console.log("Syncing database");
	Database.sync().then(() => {
		console.log('Ready!');
	});
		
	
	bot.user.setActivity('with Mausritter');
});

console.log("Logging in...");
bot.login(Config.token).then(tokenConfirmation => {
	console.log("Bot logged in");
	if( tokenConfirmation!=Config.token ) {
		throw "Could not login, tokens do not match";
	}
});