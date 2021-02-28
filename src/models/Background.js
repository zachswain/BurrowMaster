module.exports = {
    modelName : "Background"
};

/*
 * Based on the magicitems.json found here: https://github.com/eepMoody/open5e-api/tree/master/data/WOTC_5e_SRD_v5.1
 *
 */

const Sequelize = require("sequelize");
const Database = require("../Database.js");
const Character = require("./Character.js");

Object.assign(module.exports, {
    modelName : "Background",
    model : {
    	hp : {
    		type : Sequelize.INTEGER,
    		allowNull : false,
    	},
    	pips : {
    	    type : Sequelize.INTEGER,
    	    allowNull : false
    	},
    	background : {
    	    type : Sequelize.STRING,
    	    allowNull : false
    	},
    	item1 : {
    	    type : Sequelize.STRING
    	},
    	item2 : {
    	    type : Sequelize.STRING
    	},
    	source : {
    	    type : Sequelize.STRING
    	}
    },
    relationships : [
    ],
    options : {
        indexes : [
            {
                name : "background_hp_pips_background_unique",
                unique : true,
                fields : ["hp", "pips", "background"]
            }
        ]
    },
    
    create(args) {
        var model = Database.getModel(this.modelName);
        return model.create(args);
    },
        
    findOneByHPPips(hp, pips) {
        var model = Database.getModel(this.modelName);
        return model.findOne({ where : { hp : hp, pips : pips }})
    },
    
    findAllByName(background) {
        var model = Database.getModel(this.modelName);
        return model.findAll({ where : { background : background }})
    },
    
    findAll() {
        var model = Database.getModel(this.modelName);
        return model.findAll();
    }
});