const Database = require("./Database.js");
const Item = require("./models/Item.js");
const Birthname = require("./models/Birthname.js");
const Matriname = require("./models/Matriname.js");
const Background = require("./models/Background.js");

const items = require("../data/items.json");
const birthnames = require("../data/birthnames.json");
const matrinames = require("../data/matrinames.json");
const backgrounds = require("../data/backgrounds.json");

Database.init();
Database.sync().then(() => {
    items.forEach(item => {
        item.source = "Mausritter SRD";
        Item.create(item)
            .then(i => {
                console.log(`Created Item ${i.name}`);
            })
    });
    
    birthnames.forEach(birthname => {
        birthname.source = "Mausritter SRD";
        Birthname.create(birthname).then(bn => {
                console.log(`Created Birthname => ${bn.name}`);
        });
    });
    
    matrinames.forEach(matriname => {
        matriname.source = "Mausritter SRD";
        Matriname.create(matriname).then(mn => {
            console.log(`Created Matriname => ${mn.name}`);
        });
    });
    
    backgrounds.forEach(background => {
        Background.create(background).then(bg => {
            console.log(`Created Background => ${background.background}`);
        })
    })
});