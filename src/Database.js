const Sequelize = require("sequelize");
const Config = require("./Config.js");
const fs = require("fs");

class Database {
  static init() {
    if( this._sequelize ) {
        console.log("Database is already initialized");
        return;
    }
    
    this._sequelize = new Sequelize({
    	dialect: 'sqlite',
    	storage: Config.database.location,
    	logging : console.log,
    	pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000
      }
    });
    
    let self=this;
    self._models=[];    
    var relationships=[];
    
    fs.readdirSync(__dirname + "/models").forEach(function(name){
			var object = require(__dirname + "/models" + "/" + name);
			var options = object.options || {}
			var modelName = object.modelName || name.replace(/\.js$/i, "");
			self._models[modelName] = self._sequelize.define(modelName, object.model, options);
			if( object.skipSync===true ) {
					console.log("Setting sync=false on " + modelName);
					self._models[modelName].sync = () => Promise.resolve();
			}
			if("relationships" in object){
				relationships.push({
				  modelName : modelName,
				  relationships : object.relationships
				});
			}
			console.log("added model " + modelName);
		});

		relationships.forEach(relationship  => {
		  var source = self._models[relationship.modelName];

		  relationship.relationships.forEach(relatedTo => {
		    var target = self._models[relatedTo.modelName];

		    switch( relatedTo.relationship ) {
		      case "hasOne":
		        source.hasOne(target);
		        break;
		      case "hasMany":
		        source.hasMany(target, {sourceKey:"id"});
		        break;
		      case "belongsTo":
		        source.belongsTo(target);
		        break;
		      case "belongsToMany":
		      	console.log("relatedTo.modelName:" + relatedTo.modelName);
		      	console.log("relatedTo:" + relatedTo.through);
		      	console.log(target);
		      	source.belongsToMany(target, { through : relatedTo.through });
		      	break;
		    }
		    
		    console.log("added relationship, " + source.name + " " + relatedTo.relationship + " " + target.name);
		  })
		});
		
		console.log("Database initialized");
  }
  
  static async sync() {
  	var options = {};
  	if( Config.database.sync ) {
  		options.force = true;
  	}
  	return this._sequelize.sync(options);
  }
  
  static initialized() {
      return this._sequelize!=null;
  }
  
  static getModel(modelName) {
    return this._models[modelName];
  }
  
  static query(query, options) {
  	return this._sequelize.query(query, options);
  }
  
  static async startTransaction() {
	return await this._sequelize.transaction();
  }
}

module.exports = Database;