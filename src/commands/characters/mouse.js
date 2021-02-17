const { Command } = require('discord.js-commando');
const BaseCommand = require("../BaseCommand.js");
const Discord = require('discord.js');
const Database = require("../../Database.js");
const Utils = require("../../utils/utils.js");
const Config = require("../../Config.js");
const Character = require("../../models/Character.js");
const Roll = require("roll");

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
				*create [character name] [-b background]* - Create a new character.
			`,

		});
	}
	
	run(message, arg) {
	    message.reply("Yup, working");
	    
	    let args = Utils.StringUtils.parseArguments(arg);
		let subCommand = args.shift();
		
		if( !subCommand ) {
			this.displaySelf(message);
		} else {
		    switch( subCommand.toLowerCase() ) {
		        case "create":
		        	let roll = new Roll();
		        	let name = "Petal Rainflower";
		        	let background = "Sap tapper";
		        	let str = roll.roll('3d6b2').result;
		        	let dex = roll.roll('3d6b2').result;
		        	let wil = roll.roll('3d6b2').result;
		        	
		        	message.channel.send(`Name: ${name}\nBackground: ${background}\nSTR: ${str}, DEX: ${dex}, WIL: ${wil}`);
		        	break;
		    }
		}
	}
	
	displaySelf(message) {
		Character.getCharacterByAuthorID(message.author.id)
			.then(character => {
				if( !character ) {
					message.reply("You don't have a mouse registered. (Use ``!mouse create`` to create one!)");
				} else {
					Utils.CharacterUtils.displayCharacter(message, character);
				}
			});
	}
}