import { Request } from "express";

interface Auth extends Request{
    playerData?: string;
    playerDataId?: string;
}

export default Auth;