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

module.exports = class ItemCommand extends BaseCommand {
	constructor(client) {
		super(client, {
			name: 'item',
			aliases: ["i", "items"],
			group: 'items',
			memberName: 'item',
			format: "[args]",
			description: `View, edit, and create items.
			
				__Valid Arguments__
			`,

		});
	}
	
	async run(message, arg) {
	    let args = Utils.StringUtils.parseArguments(arg);
		let subCommand = args.shift();
		
		if( !subCommand ) {
			this.displaySelf(message);
		} else {
		    switch( subCommand.toLowerCase() ) {
		    }
		}
	}
}