module.exports = {
    modelName : "InventoryEntry"
}

const Sequelize = require("sequelize");
const Item = require("./Item.js");
const Database = require("../Database.js");

Object.assign(module.exports, {
    model : {

    },
    
    relationships : [
        { modelName : Item.modelName, relationship : "belongsTo" }
    ],
    
    createFromItem(item) {
        var model = Database.getModel(this.modelName);
        var entry = model.build({
        });
        entry.setItem(item);
        return entry;
    }
})