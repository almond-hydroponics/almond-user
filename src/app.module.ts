import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule, PinoLogger } from 'nestjs-pino';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Module({
	imports: [
		ConfigModule.forRoot(),
		LoggerModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => ({
				pinoHttp: {
					safe: true,
					transport:
						configService.get<string>('NODE_ENV') !== 'production'
							? {
									target: 'pino-pretty',
									options: {
										colorize: true,
									},
							  }
							: undefined,
					useLevelLabels: true,
				},
			}),
			inject: [ConfigService],
		}),
    TypeOrmModule.forRootAsync({
			imports: [ConfigModule, LoggerModule],
			useFactory: async (
				configService: ConfigService,
				logger: PinoLogger,
			): Promise<TypeOrmModuleOptions> => ({
				type: 'postgres',
				host: configService.get<string>('DB_HOST'),
				port: configService.get<number>('DB_PORT'),
				username: configService.get<string>('DB_USERNAME'),
				password: configService.get<string>('DB_PASSWORD'),
				database: configService.get<string>('DB_DATABASE'),
				logging: logger.info.bind(logger),
				synchronize: configService.get<boolean>('DB_SYNC'),
        entities: ['dist/**/*.entity.{ts,js}'],
			}),
			inject: [ConfigService, PinoLogger],
		}),
		UsersModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
