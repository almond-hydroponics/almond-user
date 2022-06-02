import { FindOptions } from 'sequelize/types';

import {
	IFindAndPaginateOptions,
	IFindAndPaginateResult,
} from '../commons/find-and-paginate.interface';
import { UserDto } from './user.dto';
import { User } from './user.model';

export interface IUsersService {
	find(query?: IFindAndPaginateOptions): Promise<IFindAndPaginateResult<User>>;
	findById(id: string): Promise<User>;
	findOne(query?: FindOptions): Promise<User>;
	count(query?: FindOptions): Promise<number>;
	create(user: UserDto): Promise<User>;
	update(id: string, user: UserDto): Promise<User>;
	destroy(query?: FindOptions): Promise<number>;
}
