import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule, PinoLogger } from 'nestjs-pino';
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import { User } from './users/user.model';
import { Op, OperatorsAliases } from 'sequelize';

const operatorsAliases: OperatorsAliases = {
	_and: Op.and,
	_or: Op.or,
	_eq: Op.eq,
	_ne: Op.ne,
	_is: Op.is,
	_not: Op.not,
	_col: Op.col,
	_gt: Op.gt,
	_gte: Op.gte,
	_lt: Op.lt,
	_lte: Op.lte,
	_between: Op.between,
	_notBetween: Op.notBetween,
	_all: Op.all,
	_in: Op.in,
	_notIn: Op.notIn,
	_like: Op.like,
	_notLike: Op.notLike,
	_startsWith: Op.startsWith,
	_endsWith: Op.endsWith,
	_substring: Op.substring,
	_iLike: Op.iLike,
	_notILike: Op.notILike,
	_regexp: Op.regexp,
	_notRegexp: Op.notRegexp,
	_iRegexp: Op.iRegexp,
	_notIRegexp: Op.notIRegexp,
	_any: Op.any,
	_contains: Op.contains,
	_contained: Op.contained,
	_overlap: Op.overlap,
	_adjacent: Op.adjacent,
	_strictLeft: Op.strictLeft,
	_strictRight: Op.strictRight,
	_noExtendRight: Op.noExtendRight,
	_noExtendLeft: Op.noExtendLeft,
	_values: Op.values,
};

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
		SequelizeModule.forRoot({
			dialect: 'postgres',
			host: '0.0.0.0',
			port: 5432,
			username: 'postgres',
			password: 'bhakitamasha',
			database: 'almond_users',
			autoLoadModels: true,
			synchronize: true,
			retryAttempts: 2,
			retryDelay: 1000,
			sync: {
				force: true,
			},
			// logging: (sql) => sequelizeLogger.debug(sql),
		}),
		// SequelizeModule.forRootAsync({
		// 	imports: [ConfigModule, LoggerModule],
		// 	useFactory: async (
		// 		configService: ConfigService,
		// 		logger: PinoLogger,
		// 	): Promise<SequelizeModuleOptions> => ({
		// 		dialect: 'postgres',
		// 		host: '0.0.0.0',
		// 		port: 5432,
		// 		username: 'postgres',
		// 		password: 'bhakitamasha',
		// 		database: 'almond_users',
		// 		logging: logger.info.bind(logger),
		// 		typeValidation: true,
		// 		benchmark: true,
		// 		native: true,
		// 		autoLoadModels: true,
		// 		operatorsAliases,
		// 		retryAttempts: 3,
		// 		retryDelay: 1000,
		// 		synchronize: configService.get<boolean>('DB_SYNC'),
		// 		sync: {
		// 			force: true,
		// 		},
		// 		define: {
		// 			timestamps: true,
		// 			underscored: true,
		// 			version: true,
		// 			schema: configService.get<string>('DB_SCHEMA'),
		// 		},
		// 		models: [User],
		// 	}),
		// 	inject: [ConfigService, PinoLogger],
		// }),
		UsersModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
