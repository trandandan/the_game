import { Injectable } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AuthServices {
    constructor(private prisma: PrismaService) {}
    signup() {
        return {msg: 'I have signed up!'};
    }
    signin() {
        return {msg: 'I have signed in'}
    }
}

