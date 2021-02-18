module.exports = {
    modelName : "Matriname"
};

const Sequelize = require("sequelize");
const Database = require("../Database.js");

Object.assign(module.exports, {
    modelName : "Matriname",
    model : {
    	name : {
    		type : Sequelize.CITEXT,
    		allowNull : false,
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
                name : "matriname_name_unique",
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
    }
});