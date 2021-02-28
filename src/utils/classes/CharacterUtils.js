const Discord = require('discord.js');
const Character = require("../../models/Character.js");
const StringUtils = require("./StringUtils.js");
const ItemUtils = require("./ItemUtils.js");
const Database = require("../../Database.js");

module.exports = {
    async displayCharacter(message, character) {
		if( !character ) {
			message.reply("Invalid character");
		} else {
		    let char=`Name: ${character.getDataValue('characterName')}`;
        	char += `\nLevel: ${character.getDataValue('level')}`;
        	char += `\nBackground: ${character.getDataValue('background')}`;
        	
        	char += `\n`;
        	
        	char += `\nSTR: ${character.getDataValue('currentSTR')}/${character.getDataValue('maxSTR')}`;
        	char += `\nDEX: ${character.getDataValue('currentDEX')}/${character.getDataValue('maxDEX')}`;
        	char += `\nWIL: ${character.getDataValue('currentWIL')}/${character.getDataValue('maxWIL')}`;
        	char += `\nHP: ${character.getDataValue('currentHP')}/${character.getDataValue('maxHP')}`;
        	
        	char += `\n`;
        	
        	let entries = await character.getInventoryEntries();
        	char += `\nInventory:`;
        	for( let i=0 ; i<6 ; i++ ) {
        	    if( i<entries.length ) {
        	        var entryStr = await ItemUtils.toInventoryDisplay(entries[i]);
        	        char += `\n${i+1}. ${entryStr}`;
        	    } else {
        	        char += `\n${i+1}.`;
        	    }
        	}
        	message.channel.send(char);
		}
    },
    
    random() {
    	
    }
}
