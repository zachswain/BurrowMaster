module.exports = {
    modelName : "Character"
};

const Sequelize = require("sequelize");
const Database = require("../Database.js");

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
    	xp : {
    	  type : Sequelize.INTEGER,
    	  defaultValue : 0
    	},
    	pip  :{
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
        // { modelName : InventoryEntry.modelName, relationship : "hasMany" }
    ],
    options : {
        indexes : [
            {
                name : "authorID_unique",
                unique : true,
                fields : ["authorID"]
            }
        ]
    },
    
    getCharacterByAuthorID(authorID) {
        var model = Database.getModel(this.modelName);
		return model.findOne({ where : { authorID : authorID }});
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