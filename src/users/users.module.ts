import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { SequelizeModule } from '@nestjs/sequelize';

import { User } from './user.model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
	imports: [LoggerModule],
	providers: [
		{ provide: 'UsersService', useClass: UsersService },
		{ provide: 'UsersRepository', useValue: User },
	],
	controllers: [UsersController],
})
export class UsersModule {}
