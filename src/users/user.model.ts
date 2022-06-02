// @formatter:off
import * as withPagination from 'sequelize-cursor-pagination';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

import { Roles } from '../types/enums';

@Table({
	modelName: 'user',
	tableName: 'users',
	underscored: true,
	timestamps: true,
	version: true,
})
export class User extends Model<User> {
	@Column({
		primaryKey: true,
		type: DataType.UUID,
		defaultValue: DataType.UUIDV1,
		comment: 'The identifier for the user record.',
	})
	id: string;

	@Column({
		type: DataType.STRING,
		comment: "The user's first name.",
	})
	firstName: string;

	@Column({
		type: DataType.STRING,
		comment: "The user's last name.",
	})
	lastName: string;

	@Column({
		type: DataType.STRING,
		unique: true,
		allowNull: false,
		comment: "The user's email.",
	})
	email: string;

	@Column({
		type: DataType.STRING,
		comment: "The user's password.",
	})
	password: string;

	@Column({
		type: DataType.STRING,
		comment: "The user's avatar photo.",
		defaultValue:
			'https://storage.googleapis.com/static.almondhydroponics.com/static/images/avatar_male.svg',
	})
	avatar: string;

	@Column({
		type: DataType.STRING,
		comment: "The user's google id.",
	})
	googleId: string;

	@Column({
		type: DataType.ENUM({ values: Object.values(Roles) }),
		allowNull: false,
		comment: "The user's current role",
		defaultValue: Roles.USER,
	})
	role?: Roles;

	@Column({
		type: DataType.BOOLEAN,
		comment: "The user's verification.",
		defaultValue: false,
	})
	verified: boolean;

	@Column({
		type: DataType.BOOLEAN,
		comment: "The user's activeness.",
		defaultValue: false,
	})
	active: boolean;
}

withPagination({
	methodName: 'findAndPaginate',
	primaryKeyField: 'id',
})(User);
