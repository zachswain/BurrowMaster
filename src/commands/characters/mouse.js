const { Command } = require('discord.js-commando');
const BaseCommand = require("../BaseCommand.js");
const Discord = require('discord.js');
const Database = require("../../Database.js");
const Utils = require("../../utils/utils.js");
const Config = require("../../Config.js");
const Character = require("../../models/Character.js");
const Birthname = require("../../models/Birthname.js");
const Matriname = require("../../models/Matriname.js");
const Item = require("../../models/Item.js");
const InventoryEntry = require("../../models/InventoryEntry.js");
const Roll = require("roll");

const { createCanvas } = require("canvas");

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
	
	async run(message, arg) {
	    let args = Utils.StringUtils.parseArguments(arg);
		let subCommand = args.shift();
		
		if( !subCommand ) {
			this.displaySelf(message);
		} else {
		    switch( subCommand.toLowerCase() ) {
		    	case "image":
		    		


					const WIDTH = 100;
					const HEIGHT = 50;
					
					const canvas = createCanvas(WIDTH, HEIGHT);
					const ctx = canvas.getContext("2d");
					
					ctx.fillStyle = "#222222";
					ctx.fillRect(0, 0, WIDTH, HEIGHT);
					ctx.fillStyle = "#f2f2f2";
					ctx.font = "32px Arial";
					ctx.fillText("Hello", 13, 35);
					
					const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'hello.png');
					message.channel.send("Test", attachment);

		    		break;
		    	case "retire":
		    		var character = await Character.getCharacterByAuthorID(message.author.id);
		    		
		    		if( null==character ) {
		    			message.reply("You have no active mouse, create one with ``!mouse create``");
		    			return;
		    		}
		    		
		    		await character.destroy();
		    		message.reply("Character retired.");
		    		break;
		        case "create":
		        	var character = await Character.getCharacterByAuthorID(message.author.id);
		        	
		        	if( null!=character ) {
		        		message.reply("You already have a mouse.  Use ``!mouse retire`` to retire it and generate a new one.");
		        		return;
		        	}
		        	
		        	let roll = new Roll();
		        	
		        	let birthnames = await Birthname.findAll();
		        	let index = Math.floor(Math.random()*birthnames.length);
		        	let birthname = birthnames[index].getDataValue("name");
		        	
		        	let matrinames = await Matriname.findAll();
		        	index = Math.floor(Math.random()*matrinames.length);
		        	let matriname = matrinames[index].getDataValue("name");
		        	
		        	let name = `${birthname} ${matriname}`;
		        	let level = 1;
		        	let xp = 0;
		        	let pips = 0;
		        	
		        	let background = "Sap tapper";
		        	let birthSign = "Mother";
		        	let coat = "Grey";
		        	let pattern = "Flecked";
		        	
		        	let str = roll.roll('3d6b2').result;
		        	let dex = roll.roll('3d6b2').result;
		        	let wil = roll.roll('3d6b2').result;
		        	
		        	let weapons = await Item.findAllByItemName("Improvised Weapon");
		        	let weapon = null;
		        	if( weapons && weapons.length>0 ) {
		        		weapon = weapons[0];
		        	}
		        	var inventoryEntry = InventoryEntry.createFromItem(weapon);
			    	//var entry = await inventoryEntry.save();
			    	//character.addInventoryEntry(entry);
			    	//var client = message.client;
		        	
		        	console.log(weapon);
		        	
		        	character = await Character.create({
		        		characterName : name,
		        		authorID : message.author.id,
		        		guildID : message.guild.id,
		        		level : level,
		        		xp : xp,
		        		background: background,
		        		birthSign : birthSign,
		        		coat : coat,
		        		pattern : pattern,
		        		currentSTR : str,
		        		maxSTR : str,
		        		currentDEX : dex,
		        		maxDEX : dex,
		        		currentWIL : wil,
		        		maxWIL : wil,
		        		pips : pips
		        	});
		        	
		        	await character.addInventoryEntry(inventoryEntry);
		        	
		        	let char=`Name: ${name}`;
		        	char += `\nLevel: ${level}`;
		        	char += `\nBackground: ${background}`;
		        	char += `\nSTR: ${str}\nDEX: ${dex}\nWIL: ${wil}`;
		        	
		        	message.channel.send(char);
		        	break;
		    }
		}
	}
	
	displaySelf(message) {
		Character.getCharacterByAuthorID(message.author.id)
			.then(async character => {
				if( !character ) {
					message.reply("You don't have a mouse registered. (Use ``!mouse create`` to create one!)");
				} else {
					console.log(character);
					var entries = await character.getInventoryEntries();
					console.log(entries);
					Utils.CharacterUtils.displayCharacter(message, character);
				}
			});
	}
}