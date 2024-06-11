/* eslint-disable prettier/prettier */
import { Controller,Get,Param, UseInterceptors } from "@nestjs/common";
import { UserService } from "../services/user.service";
import { ResponseInterceptor } from "src/modules/common/Interceptors/response.interceptor";

@Controller('user')
@UseInterceptors(ResponseInterceptor)
export class UserController{
    constructor(private readonly userService: UserService) {}

    @Get(':id')
    async getUserDetails(@Param('id') id: string) {
        const data = await this.userService.findByOAuthId(id);
        // console.log("here it uis"+data);
        return { errorMsg: data ? null: "No data found", success: true, data, sessionActive: true };
    }
}