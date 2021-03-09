const { Command } = require('discord.js-commando');
const BaseCommand = require("../BaseCommand.js");
const Discord = require('discord.js');
const Database = require("../../Database.js");
const Utils = require("../../utils/utils.js");
const Config = require("../../Config.js");
const Character = require("../../models/Character.js");
const Item = require("../../models/Item.js");
const InventoryEntry = require("../../models/InventoryEntry.js");

const { createCanvas } = require("canvas");

module.exports = class UseCommand extends BaseCommand {
	constructor(client) {
		super(client, {
			name: 'use',
			aliases: ["u", "mark"],
			group: 'characters',
			memberName: 'use',
			format: "<itemname>",
			description: `Mark an item as used.
			
				__Valid Arguments__
			    *<item name>* - Mark a use on the first item named '<item name>' in your inventory or on your body.
			`,

		});
	}
	
	async run(message, arg) {
	    let args = Utils.StringUtils.parseArguments(arg);
		let subCommand = args.shift();
		
		var character = await Character.getCharacterByAuthorID(message.author.id);
		    		
		if( null==character ) {
			message.reply("You have no active mouse, create one with ``!mouse create``");
			return;
		}
		
		console.log(character);
	}
}