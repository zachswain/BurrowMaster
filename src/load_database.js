const Database = require("./Database.js");
const Item = require("./models/Item.js");
const items = require("../data/items.json");

console.log(items);

Database.init();
Database.sync().then(() => {
    items.forEach(item => {
        item.source = "Mausritter SRD";
        Item.create(item)
            .then(i => {
                console.log(`Created ${i.name}`);
            })
    });
});