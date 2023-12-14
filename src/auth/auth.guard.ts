import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { jwtConstants } from "./constants";
import { Request } from "express";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private userService: UsersService) {}
    
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: Request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request.headers);
        if (!token) {
            throw new UnauthorizedException();
        }

        try {
            const payload = await this.jwtService.verifyAsync(token, { secret: jwtConstants.secret });
            const user = await this.userService.findOne(payload.sub);
            if (!user) {
                throw new UnauthorizedException();
            }

            request['user'] = user;
        } catch (error) {
            throw new UnauthorizedException();
        }

        return true;
    }

    private extractTokenFromHeader(headers: any) {
        const [type, token] = headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
