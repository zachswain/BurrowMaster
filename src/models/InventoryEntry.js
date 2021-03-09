module.exports = {
    modelName : "InventoryEntry"
}

const Sequelize = require("sequelize");
const Item = require("./Item.js");
const Database = require("../Database.js");

Object.assign(module.exports, {
    model : {
        used : {
            type : Sequelize.INTEGER,
            allowNull : false,
            defaultValue : 0
        }
    },
    
    relationships : [
        { modelName : Item.modelName, relationship : "belongsTo" }
    ],
    
    create(args, options=null) {
        var model = Database.getModel(this.modelName);
        return model.create(args, options);
    },
    
    createFromItem(item, options=null) {
        var model = Database.getModel(this.modelName);
        return model.create({ ItemId : item.id }, options);

    }
})