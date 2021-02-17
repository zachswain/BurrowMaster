let config = null;

module.exports = function() {
    if( config!=null && config!=undefined ) {
        return config;
    }
    
    config = {
        "environment" : "development",
        "token" : "",
        "clientID" : "",
        "commandPrefix" : "&",
        "adminRoles" : [],
        "database" : {
            "logging " : false
        }
    }
    
    console.log("reading config");
    config = Object.assign(config, require("../config.json"));
    
    return config;
}()