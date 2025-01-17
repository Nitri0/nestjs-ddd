import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './user.service';
import { DatabaseModule } from '../database/database.module';
import { userProviders } from './user.provider';
import { UserRepository } from './repository/user.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    ...userProviders,
  ],
})
export class UserModule {}
