const jwt = require("jsonwebtoken");
const Player = require('./../models/Player')
class authJwt {
  static authentication(req, res, next) {
    const { access_token } = req.headers;
    // console.log("Access TOken  : ", access_token);
    const { idPlayer } = req.params;
    // console.log("idPlayer",idPlayer)
    if (!access_token) {
      throw { name: "Missing_Token" };
    }

    jwt.verify(access_token, "saltacademy", (err, decoded) => {
      if (err) {
        throw { name: "INVALID_TOKEN" };
      }
      req.playerData = decoded;
      // console.log("req.playerData : ",req.playerData);
      next();
    });
  }

  static async specificPlayer(req, res, next){
    const {idPlayer} = req.params;
    
    const result = await Player.findById(req.playerData.data._id);
    
    try {
        if(result.id == idPlayer){
            next();
        }else{
            throw {name:"UNAUTHORIZED_TOKEN"}
        }
    } catch (err) {
        next (err);
    }
  }

}

module.exports = authJwt;
