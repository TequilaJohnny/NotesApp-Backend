import { UsersController } from '@/controllers/users.controller';
import { User, UserSchema } from '@/schemas/user.schema';
import { UsersService } from '@/services/users.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService], 
})
export class UsersModule {}
