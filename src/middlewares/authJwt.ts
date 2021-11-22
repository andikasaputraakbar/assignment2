import { NextFunction, Response, } from "express";
import jwt from "jsonwebtoken";
import Player from "./../models/Player";
import Auth from "../interface/auth.interface";

class authJwt {
  static authentication(req:Auth, res: Response, next: NextFunction) {
    const { access_token } = req.headers;
    if (!access_token) {
      throw { name: "Missing_Token" };
    }

    const decoded:any = jwt.verify(access_token as string, "saltacademy"); 
    req.playerData = decoded.data;
    req.playerDataId = decoded.data._id;
    next();
    
  }

  static async specificPlayer(req: Auth, res: Response, next: NextFunction) {
    const { idPlayer } = req.params;
    
    const result:any = await Player.findById(req.playerDataId);
    
    try {
      if (result.id == idPlayer) {
        next();
      } else {
        throw { name: "UNAUTHORIZED_TOKEN" };
      }
    } catch (err) {
      next(err);
    }
  }
}

export default authJwt;
