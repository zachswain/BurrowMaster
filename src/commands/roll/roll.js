const { Command } = require('discord.js-commando');
const BaseCommand = require("../BaseCommand.js");
const Discord = require('discord.js');
const Roll = require("roll");
const Utils = require("../../utils/utils.js");

module.exports = class MouseCommand extends BaseCommand {
	constructor(client) {
		super(client, {
			name: 'roll',
			aliases: ["r"],
			group: 'roll',
			memberName: 'roll',
			format: "[args]",
			description: `Dice roller
			
				__Valid Arguments__
				Xd6[bY|wY]-Z
			`,

		});
	}
	
	async run(message, arg) {
	    let args = Utils.StringUtils.parseArguments(arg);
		let diceNotation = args.join("");
		

    	let roll = new Roll();
    	
    	try{
    	    let result = roll.roll(diceNotation);
    	    let rolls = [];
    	    
    	    //console.log(result);
    	    
    	    message.reply(`:game_die:\n**Result:** ${arg} (${result.rolled.join(", ")})\n**Total:** ${result.result}`);
    	}
    	catch( err ) {
    	    message.channel.send("I didn't understand the noation: " + arg);
    	}
	}
}