const { Command } = require('discord.js-commando');

module.exports = class BaseCommand extends Command {
    displayHelp(message) {
		let commands = this.client.registry.findCommands("help", false, message);
		if( commands.length>0 ) {
			commands[0].run(message, { command : this.name });
		}
	}
}