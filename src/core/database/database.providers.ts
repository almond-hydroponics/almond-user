import { Sequelize } from 'sequelize-typescript';

import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants';
import { databaseConfig } from './database.config';
import { User } from '../../users/user.model';

export const databaseProviders = [
	{
		provide: SEQUELIZE,
		useFactory: async () => {
			let config;
			switch (process.env.NODE_ENV as any) {
				case DEVELOPMENT:
					config = databaseConfig.development;
					break;
				case TEST:
					config = databaseConfig.test;
					break;
				case PRODUCTION:
					config = databaseConfig.production;
					break;
				default:
					config = databaseConfig.development;
			}
			console.log(config);
			const sequelize = new Sequelize(config);
			sequelize.addModels([User]);
			console.log(sequelize);
			// await sequelize.sync();
			return sequelize;
		},
	},
];
