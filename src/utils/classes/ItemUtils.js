const Discord = require('discord.js');
const Character = require("../../models/Character.js");
const StringUtils = require("./StringUtils.js");
const Item = require("../../models/Item.js");

module.exports = {
    displayItem(message, items) {
        /*
		if( !items ) {
			message.reply("Invalid item");
		} else {
			if( items.length==0 ) {
				message.reply("No matching items were found.");
			} else if( items.length>1 ) {
				var self=this;
				
				var choices=[];
				items.forEach(item => {
					choices.push(item.name);
				});
				
				StringUtils.pickOne(message, choices)
					.then(choice => {
						if( null===choice ) {
							message.reply("Nothing picked, request canceled");
						} else {
							self.displayOneItem(message, items[choice-1]);
						}
					})
					.catch(err => {
						console.log(err);
					});
			} else {
				this.displayOneItem(message, items[0]);
			}
		}
		*/
    },
    
    displayOneItem(message, item) {
        /*
    	if( !item ) {
    		message.reply("Invalid item");
    	}
    	
    	var name = item.getDataValue("name") ? item.getDataValue("name") : "No name set";
    	var type = item.getDataValue("type") ? item.getDataValue("type") : "No type set";
    	var description=item.getDataValue("description") ? item.getDataValue("description") : "No description set";
    	var rarity = item.getDataValue("rarity") ? item.getDataValue("rarity") : "No rarity set";
    	var requiresAttunement = item.getDataValue("requiresAttunement") ? item.getDataValue("requiresAttunement") : "No attunement set";
    	var source = item.getDataValue("source") ? item.getDataValue("source") : "No source set";
    	
		var embed = new Discord.MessageEmbed();
        embed.setColor('#0099ff');
        embed.setTitle(name);
        embed.setDescription(`*${type}, ${rarity}*`)
    	if( item.getDataValue("requiresAttunement") && item.getDataValue("requiresAttunement")!="" ) {
    	    embed.addFields({ name: `Attunement`, value : `${requiresAttunement}` });
    	}
    	
    	// Break the description up into 1024 character (max) chunks, due to Discord field value limitations
    	if( !description ) {
    		description = "";
    	}
    	
		var chunks=description.match(/.{1,1024}/g);

    	var chunk = chunks.shift();

    	embed.addFields(
    		{ name: `Description`, value : `${chunk}` }
    	);
    	
    	chunks.forEach(chunk => {
	        embed.addFields(
	    		{ name: `\u200B`, value : `${chunk}` }
	    	);
    	});
    	
        embed.setFooter(`Source: ${source}`);

		var promise = new Promise(function(resolve, reject) {
	        message.channel.send(embed)
	        	.then(message => {
	        		resolve(message);
	        	})
	        	.catch(err => {
	        		message.reply("I can't post (do I have embed permissions?)")
	        			.then(message => {
	        				reject(err);
	        			})
	        			.catch(reject(err))
	        	});
		});
		
		return promise;
		*/
	},
	
	getItemByName(message, itemName) {
		var promise = new Promise(function(resolve, reject) {
			// Find all items that match the provided name 
			Item.findAllLike(itemName)
				.then(items => {
					if( items.length>0 ) {
						if( items.length==1 ) {
							var item = items[0];
							if( item.getDataValue("name").toLowerCase()==itemName.toLowerCase() ) {
								resolve(item);
							} else {
								// confirm it
								StringUtils.confirm(message, `Did you mean '${item.getDataValue("name")}'?`, { choices : ["y","n"], defaultChoice : "n", hideChoices : true })
									.then(result => {
										if( result==="y" ) {
											resolve(item);
										} else {
											resolve(null);
										}
									})
									.catch(err => {
										message.channel.send("An error has occurred");
										console.error(err);
										reject({ error : err });
									})
							}
						} else {
							// got multiple characters, pick one
							// TODO
							var itemNames = [];
							items.forEach(item => {
								itemNames.push(item.getDataValue("name"));
							});
							
							StringUtils.pickOne(message, itemNames)
								.then(choice => {
									if( null===choice ) {
										resolve(null);
									} else {
										resolve(items[choice-1]);
									}
								})
								.catch(err => {
									reject(err)
								});
						}	
					} else {
						resolve(null);
					}
					
				})
				.catch(err => {
					message.channel.send("An error occurred");
					console.log(err);
					reject({ error : err });
    			})
		});
		
		return promise;
	},
	
	async toInventoryDisplay(inventoryItem) {
		let item = await inventoryItem.getItem();
		let name = item.getDataValue('name');
		let str = `${name}`;
		
		if( item.getDataValue('type')=='Weapon' ) {
			str += ` (${item.getDataValue('damageDice')}, ${"o".repeat(item.getDataValue('uses'))})`;
		} else if( item.getDataValue('type')=='Trade Good' || item.getDataValue('type')=='Spell' || item.getDataValue('type')=='Armor' ) {
			if( item.getDataValue('uses') && item.getDataValue('uses')>0 ) {
				var used=inventoryItem.getDataValue("used");
				var uses=item.getDataValue("uses");
				str += ` (${"x".repeat(used)}${"o".repeat(uses-used)})`;
			}
		}
		
		return str;
	}
}