/* eslint-disable prettier/prettier */
import { Controller,Get,Param} from "@nestjs/common";
import { UserService } from "../services/user.service";

@Controller('api/v1/user')
export class UserController{
    constructor(private readonly userService: UserService) {}

    @Get(':id')
    async getUserDetails(@Param('id') id: string) {
        const data = await this.userService.findById(id);
        console.log("here it uis"+data);
        return { errorMsg: data ? null: "No data found", success: true, data, sessionActive: true };
    }
}