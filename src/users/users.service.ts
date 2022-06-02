import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { isEmpty } from 'lodash';
import { PinoLogger } from 'nestjs-pino';
import { FindOptions } from 'sequelize/types';

import {
	IFindAndPaginateOptions,
	IFindAndPaginateResult,
} from '../commons/find-and-paginate.interface';
import { UserDto } from './user.dto';
import { User } from './user.model';
import { IUsersService } from './users.interface';

@Injectable()
export class UsersService implements IUsersService {
	constructor(
		@Inject('UsersRepository') private readonly repo: typeof User,
		private readonly logger: PinoLogger,
	) {
		logger.setContext(UsersService.name);
	}

	async find(
		query?: IFindAndPaginateOptions,
	): Promise<IFindAndPaginateResult<User>> {
		try {
			this.logger.info('UsersService#findAll.call %o', query);

			const result: IFindAndPaginateResult<User> =
				// @ts-expect-error ignore error for now
				await this.repo.findAndPaginate({
					...query,
					attributes: { exclude: ['password'] },
					raw: true,
					paranoid: false,
				});

			this.logger.info('UsersService#findAll.result %o', result);

			return result;
		} catch (e) {
			throw new BadRequestException();
		}
	}

	async findById(id: string): Promise<User> {
		this.logger.info('UsersService#findById.call %o', id);

		const result: User = await this.repo.findByPk(id, {
			raw: true,
		});

		this.logger.info('UsersService#findById.result %o', result);

		return result;
	}

	async findOne(query: FindOptions): Promise<User> {
		this.logger.info('UsersService#findOne.call %o', query);

		const result: User = await this.repo.findOne({
			...query,
			raw: true,
		});

		this.logger.info('UsersService#findOne.result %o', result);

		return result;
	}

	async count(query?: FindOptions): Promise<number> {
		this.logger.info('UsersService#count.call %o', query);

		const result: number = await this.repo.count(query);

		this.logger.info('UsersService#count.result %o', result);

		return result;
	}

	async create(user: UserDto): Promise<User> {
		this.logger.info('UsersService#create.call %o', user);

		const result: User = await this.repo.create(user);

		this.logger.info('UsersService#create.result %o', result);

		return result;
	}

	async update(id: string, user: UserDto): Promise<User> {
		this.logger.info('UsersService#update.call %o', user);

		const record: User = await this.repo.findByPk(id);

		if (isEmpty(record)) throw new Error('Record not found.');

		const result: User = await record.update(user);

		this.logger.info('UsersService#update.result %o', result);

		return result;
	}

	async destroy(query?: FindOptions): Promise<number> {
		this.logger.info('UsersService#destroy.call %o', query);

		const result: number = await this.repo.destroy(query);

		this.logger.info('UsersService#destroy.result %o', result);

		return result;
	}
}
