const { Command } = require('discord.js-commando');
const BaseCommand = require("../BaseCommand.js");
const Discord = require('discord.js');
const Database = require("../../Database.js");
const Utils = require("../../utils/utils.js");
const Config = require("../../Config.js");

module.exports = class MouseCommand extends BaseCommand {
	constructor(client) {
		super(client, {
			name: 'mouse',
			aliases: ["m", "mice"],
			group: 'characters',
			memberName: 'mouse',
			format: "[args]",
			description: `Manage your Mausritter characters.
			
				__Valid Arguments__
				*create <character name>* - Create a new character.
			`,

		});
	}
	
	run(message, arg) {
	    message.reply("Yup, working");
	}
}