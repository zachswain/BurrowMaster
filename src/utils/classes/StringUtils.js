const Discord = require('discord.js');

class StringUtils {
    static parseArguments(str) {
        if( null==str ) return [];
        let s = str.match(/[A-Za-z0-9;:\\\/\.,\!\@\#\$\%\^\&\*\(\)-_]+|"(?:\\"|[^"])+"/g);
        if( null==s ) return [];
        for( var i=0 ; i<s.length ; i++ ) {
            s[i] = s[i].replace(/"/g,"");
        }
        return s;
    }
    
    static getArgument(args, argument, standAlone=false) {
        console.log(args);
        for( let i=0 ; i<args.length ; i++ ) {
            console.log("arg: " + args[i]);
            if( args[i] == argument ) {
                if( standAlone ) {
                    return true;
                } else {
                    if( i<args.length-1 ) {
                        return args[i+1];
                    }
                }
            }
        }
        
        return null;
    }
    
    static stripArgument(args, argument, standAlone=false) {
        for( let i=0 ; i<args.length ; i++ ) {
            if( args[i] == argument ) {
                if( standAlone ) {
                    args.splice(i, 1);
                    return true;
                } else {
                    if( i<args.length-1 ) {
                        let argument = args.splice(i, 2);
                        return argument[1];
                    } else {
                        let argument = args.splice(i, 1);
                        return argument[0];
                    }
                }
            }
        }
        
        return null;
    }

    static possessive(str) {
        if( !str ) return null;
        if( str.length === 0 ) throw new Error('Cannot make empty string possessive');
        if( str.toLowerCase().endsWith('s') ) {
            return str + '\'';
        } else {
            return str + '\'s';
        }
    }
    
    static confirm(message, prompt, opt) {
        
        opt = Object.assign({
                choices : ["y", "n"],
                defaultChoice : "n",
                hideChoices : false,
                delay : 5000
            }, opt);

        var promise = new Promise(function(resolve, reject) {
            var filter = response => {
				return opt.choices.some(choice => choice.toLowerCase() === response.content.toLowerCase());
			};
			
			// Capitalize the default choice
			var choices = opt.choices;
			for( var i=0 ; i<choices.length ; i++ ) {
			    if( choices[i]===opt.defaultChoice ) {
			        choices[i]=choices[i].toUpperCase();
			    } else {
			        choices[i]=choices[i].toLowerCase();
			    }
			}
			
			prompt = prompt + " [" + choices.join(",") + "]";

            message.channel.send(prompt)
    			.then(() => {
    				message.channel.awaitMessages(filter, { max: 1, time: opt.delay, errors: ['time'] })
    					.then(collected => {
    						var choice = collected.first().content;
    						resolve(choice);
    					})
    					.catch(collected => {
    						resolve(opt.defaultChoice);
    					});	
    			})
    			.catch(err => {
                    reject(err);
    			});    
        });

		return promise;
    }
    
    static pickOne(message, items, opt) {
        var self=this;
        
        if( !opt ) {
            opt = {
                page : 0,
                authorOnly : true
            }
        }  
        
        var promise = new Promise(function(resolve, reject) {
            var choices = [];
            var page = opt.page;
            var pageSize = 10;
            var start = page*pageSize;
            var pages = Math.ceil(items.length / pageSize);
            var end = items.length-1<start+pageSize-1 ? items.length-1 : (page+1)*pageSize-1;
            
    		for( var i=start ; i<=end ; i++ ) {
    			choices.push(`[${i+1}] ${items[i]}`);
    		}
    		
    		var options = ['c'];
    		var prompt = [`Which one were you looking for? (Type the number, "c" to cancel`];
    		if( end<(items.length-1) ) {
    		    options.push('n');
    		    prompt.push(`"n" for the next page`);
    		}
    		if( start>0 ) {
    		    options.push('p');
    		    prompt.push(`"p" for the previous page`);
    		}
    		prompt = prompt.join(", ") + ")";
    		
            var filter = response => (
                (
                    (!isNaN(response.content.trim()) && (parseInt(response.content.trim()) > page*pageSize && parseInt(response.content.trim()) <= items.length))
                    ||
                    options.some(values => values === response.content.trim().toLowerCase())
                )
                &&
                (
                    (response.author.id==message.author.id) || (!opt.authorOnly)
                )
            );
            
            var embed = new Discord.MessageEmbed()
    			.setTitle(options.title || "Multiple Matches Found")
    			.setDescription(prompt)
    			.setFooter(`Page ${page+1}/${pages}`)
            	.addFields({ name: `\u200B`, value: `${choices.join("\n")}`});        
            embed.setColor('#0099ff');    
            message.channel.send(embed)
    			.then((msg) => {
    				message.channel.awaitMessages(filter, { max: 1, time: 10000, errors: ['time'] })
    					.then(collected => {
    					    let m = collected.first();
    						var choice = m.content;
    						
    						if( choice=='n' ) {
    						    msg.delete();
    						    self.pickOne(message, items, { page : page+1 }).then(choice => { resolve(choice) });
    						} else if( choice=='p' ) {
    						    msg.delete();
    						    self.pickOne(message, items, { page : page-1 }).then(choice => { resolve(choice) });
    						} else if( choice=='c' ) {
    						    msg.delete();
    						    resolve(null);
    						} else {
    						    msg.delete();
    						    resolve(choice);
    						}
    						
    						m.delete();
    					})
    					.catch(collected => {
    					    msg.delete();
    						resolve(null);
    					});	
    			})
    			.catch(err => {
    				message.reply("I can't post (do I have embed permissions?)")
            			.then(message => { reject(message) })
            			.catch(console.error)
    			});    
        });

		return promise;
    }
    
    static emptyToNotEmpty(str, emptyString=null) {
        if( null==str || ""==str.trim() ) {
            if( null==emptyString || ""==emptyString.trim() ) {
                return "\u200B";
            } else {
                return emptyString;
            }
        } else {
            return str;
        }
    }
}

module.exports = StringUtils;