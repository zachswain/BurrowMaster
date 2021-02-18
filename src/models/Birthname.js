module.exports = {
    modelName : "Birthname"
};

/*
 * Based on the magicitems.json found here: https://github.com/eepMoody/open5e-api/tree/master/data/WOTC_5e_SRD_v5.1
 *
 */

const Sequelize = require("sequelize");
const Database = require("../Database.js");

Object.assign(module.exports, {
    modelName : "Birthname",
    model : {
    	name : {
    		type : Sequelize.CITEXT,
    		allowNull : false,
    	},
    	gender : {
    	    type : Sequelize.CITEXT,
    	    allowNull : true
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
                name : "birthname_name_unique",
                unique : true,
                fields : ["name"]
            }
        ]
    },
    
    create(args) {
        var model = Database.getModel(this.modelName);
        return model.create(args);
    },
    
    findAll() {
        var model = Database.getModel(this.modelName);
        return model.findAll();
    },
});