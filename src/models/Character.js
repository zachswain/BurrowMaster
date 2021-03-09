module.exports = {
    modelName : "Character"
};

const Sequelize = require("sequelize");
const Database = require("../Database.js");
const InventoryEntry = require("./InventoryEntry.js");

Object.assign(module.exports, {
    model : {
    	characterName : {
    		type : Sequelize.CITEXT,
    		allowNull : false,
    	},
    	authorID: {
    		type: Sequelize.STRING,
    		allowNull : false
    	},
    	guildID : {
    		type: Sequelize.STRING,
    		defaultValue : null
    	},
    	level : {
    	    type : Sequelize.INTEGER,
    	    defaultValue : 0
    	},
    	xp : {
    	  type : Sequelize.INTEGER,
    	  defaultValue : 0
    	},
    	background : {
    	    type : Sequelize.STRING,
    	    allowNull : false
    	},
    	birthSign : {
    	    type : Sequelize.STRING,
    	    allowNull : false
    	},
    	coat : {
    	    type : Sequelize.STRING,
    	    allowNull : false
    	},
    	pattern : {
    	    type : Sequelize.STRING,
    	    allowNull : false
    	},
    	currentSTR : {
    	    type : Sequelize.INTEGER,
    	    allowNull : false
    	},
    	maxSTR : {
    	    type : Sequelize.INTEGER,
    	    allowNull : false
    	},
    	currentDEX : {
    	    type : Sequelize.INTEGER,
    	    allowNull : false
    	},
    	maxDEX : {
    	    type : Sequelize.INTEGER,
    	    allowNull : false
    	},
    	currentWIL : {
    	    type : Sequelize.INTEGER,
    	    allowNull : false
    	},
    	maxWIL : {
    	    type : Sequelize.INTEGER,
    	    allowNull : false
    	},
    	currentHP : {
    	    type : Sequelize.INTEGER,
    	    allowNull : false,
    	    defaultValue : 0
    	},
    	maxHP : {
    	    type : Sequelize.INTEGER,
    	    allowNull : false,
    	    defaultValue : 0
    	},
    	pips : {
    	  type : Sequelize.INTEGER,
    	  defaultValue : 0
    	},
    	portrait : {
    	    type : Sequelize.STRING,
    	    defaultValue : null
    	}
    },
    relationships : [
        // { modelName : Property.modelName, relationship : "hasMany" },
        // { modelName : WishlistEntry.modelName, relationship : "hasMany" },
        { modelName : InventoryEntry.modelName, relationship : "hasMany" }
    ],
    options : {
        /*
        indexes : [
            {
                name : "authorID_unique",
                unique : true,
                fields : ["authorID"]
            }
        ],
        */
        paranoid : true
    },
    
    getCharacterByAuthorID(authorID) {
        var model = Database.getModel(this.modelName);
		return model.findOne({ where : { authorID : authorID }, include : [ Database.getModel(InventoryEntry.modelName) ] });
    },
    
    getCharacterByCharacterName(characterName) {
        var model = Database.getModel(this.modelName);
        return model.findOne({ where : { characterName : characterName }});
    },
    
    findAllLike(characterName) {
        var model = Database.getModel(this.modelName);
        return model.findAll({ where : 
            {
                [Sequelize.Op.or] : [
                    { characterName : { [Sequelize.Op.substring] : characterName } }
                ]
            }   
        })  
    },

    create(args, options=null) {
        var model = Database.getModel(this.modelName);
        return model.create(args, options=null);
    },
    
    xpToLevel(xp) {
        return 1;
    },
    
    getAll() {
        var self=this;
        return Promise.all([
            new Promise(function(resolve, reject) {
                self.getProperties(properties => {
                    self.properties = properties;
                })
            })
        ]);
    }
});