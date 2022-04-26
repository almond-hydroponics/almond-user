import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

import { DatabaseProvider } from './database.providers';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
	imports: [
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
	],
	providers: [...DatabaseProvider],
	exports: [...DatabaseProvider],
})
export class DatabaseModule {}
