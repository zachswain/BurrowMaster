const Discord = require('discord.js');
const Character = require("../../models/Character.js");
const StringUtils = require("./StringUtils.js");
const Database = require("../../Database.js");

module.exports = {
    displayCharacter(message, character) {
		if( !character ) {
			message.reply("Invalid character");
		} else {
		    message.reply("Character details TBD");
		}
    },
    
    random() {
    	
    }
}