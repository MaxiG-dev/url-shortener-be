import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { User } from "../../users/entities/user.entity";
import { JWTPayload } from "../interfaces/jwt-payload.interface";
import { ExtractJwt } from "passport-jwt";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>,
    ) {
        super({
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() 
        })
    }

    async validate(payload: JWTPayload): Promise<User> {
        
        const { email, id, roles } = payload;

        const user = await this.userModel.findById(id);
        if (!user) throw new UnauthorizedException("Token not valid");
        if (user.deletedAt !== null) throw new UnauthorizedException("User deleted, talk with admin");
        
        return user;
    }
}
