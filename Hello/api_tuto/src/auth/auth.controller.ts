import { Controller, ParseIntPipe, Post } from "@nestjs/common";
import { Body } from "@nestjs/common";
import { AuthServices } from "./auth.services";
import { AuthDto } from "./dto";

@Controller('auth')
export class AuthController {
    constructor(private authServices: AuthServices) {}

    @Post('Signup')
    signup(@Body() dto: AuthDto) {
        
        return this.authServices.signup();
    }

    @Post('Signin')
    signin() {
        return this.authServices.signin()
    }
}