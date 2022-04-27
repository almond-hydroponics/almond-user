import * as withPagination from 'sequelize-cursor-pagination';
import { Column, Model, Table, DataType, Index } from 'sequelize-typescript';

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
		comment: "The user's photo.",
		defaultValue:
			'https://storage.googleapis.com/static.almondhydroponics.com/static/images/avatar_male.svg',
	})
	photo: string;

	@Column({
		type: DataType.BOOLEAN,
		comment: "The user's verification.",
		defaultValue: false,
	})
	isVerified: boolean;

	@Column({
		type: DataType.BOOLEAN,
		comment: "The user's activeness.",
		defaultValue: false,
	})
	isActive: boolean;
}

withPagination({
	methodName: 'findAndPaginate',
	primaryKeyField: 'id',
})(User);