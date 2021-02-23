const Discord = require('discord.js');
const Character = require("../../models/Character.js");
const StringUtils = require("./StringUtils.js");
const Database = require("../../Database.js");

module.exports = {
    displayCharacter(message, character) {
		if( !character ) {
			message.reply("Invalid character");
		} else {
		    let char=`Name: ${character.getDataValue('characterName')}`;
        	char += `\nLevel: ${character.getDataValue('level')}`;
        	char += `\nBackground: ${character.getDataValue('background')}`;
        	char += `\nSTR: ${character.getDataValue('currentSTR')}\nDEX: ${character.getDataValue('currentDEX')}\nWIL: ${character.getDataValue('currentWIL')}`;
        	
        	message.channel.send(char);
		}
    },
    
    random() {
    	
    }
}