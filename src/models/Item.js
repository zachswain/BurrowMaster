module.exports = {
    modelName : "Item"
};

/*
 * Based on the magicitems.json found here: https://github.com/eepMoody/open5e-api/tree/master/data/WOTC_5e_SRD_v5.1
 *
 */

const Sequelize = require("sequelize");
const Database = require("../Database.js");
const Character = require("./Character.js");

Object.assign(module.exports, {
    modelName : "Item",
    model : {
    	name : {
    		type : Sequelize.CITEXT,
    		allowNull : false,
    	},
    	description : {
    	    type : Sequelize.CITEXT,
    	},
    	type : {
    	    type : Sequelize.CITEXT,
    	},
    	subType : {
    	    type : Sequelize.CITEXT,
    	},
    	mainPaw : {
    	    type : Sequelize.BOOLEAN,
    	    allowNull : false,
    	    defaultValue : false
    	},
    	offPaw : {
    	    type : Sequelize.BOOLEAN,
    	    allowNull : false,
    	    defaultValue : false
    	},
    	mainAndOffPaw : {
    	    type : Sequelize.BOOLEAN,
    	    allowNull : false,
    	    defaultValue : false
    	},
    	body : {
    	    type : Sequelize.BOOLEAN,
    	    allowNull : false,
    	    defaultValue : false
    	},
    	doubleBody : {
    	    type : Sequelize.BOOLEAN,
    	    allowNull : false,
    	    defaultValue : false
    	},
    	offAndBody : {
    	    type : Sequelize.BOOLEAN,
    	    allowNull : false,
    	    defaultValue : false
    	},
    	defense : {
    	    type : Sequelize.INTEGER,
    	    defaultValue : null
    	},
    	damageDice : {
    	    type : Sequelize.CITEXT,
    	    defaultValue : null
    	},
    	price : {
    	    type : Sequelize.INTEGER,
    	    defaultValue : null
    	},
    	uses : {
    	    type : Sequelize.INTEGER,
    	    defaultValue : null
    	},
    	effect : {
    	    type : Sequelize.STRING,
    	    defaultValue : null
    	},
    	recharge : {
    	    type : Sequelize.STRING,
    	    defaultValue : null
    	},
    	source : {
    	    type: Sequelize.CITEXT
    	}
    },
    relationships : [
    ],
    options : {
        indexes : [
            {
                name : "item_name_unique",
                unique : true,
                fields : ["name"]
            }
        ]
    },
    
    create(args) {
        var model = Database.getModel(this.modelName);
        return model.create(args);
    },
    
        
    findOneByItemName(itemName) {
        var model = Database.getModel(this.modelName);
        return model.findOne({ where : { name : itemName }})
    },
    
    findAllByItemName(itemName) {
        var model = Database.getModel(this.modelName);
        return model.findAll({ where : { name : itemName }})
    },
    
    findAllLikeItemName(itemName) {
        var model = Database.getModel(this.modelName);
        return model.findAll({ where : { name : { [Sequelize.Op.substring] : itemName } } })
    },
    
    findAllLike(keyword) {
        var model = Database.getModel(this.modelName);
        return model.findAll({ where : 
            {
                [Sequelize.Op.or] : [
                    { name : { [Sequelize.Op.substring] : keyword } },
                    { type : { [Sequelize.Op.substring] : keyword } },
                    { description : { [Sequelize.Op.substring] : keyword } }
                ]
            }   
        })
    }
});