// eslint-disable-next-line @typescript-eslint/no-var-requires
const DataTypes = require('sequelize').DataTypes;

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('users', {
			id: {
				type: DataTypes.UUID,
				field: 'id',
				primaryKey: true,
				allowNull: false,
			},
			firstName: {
				type: DataTypes.STRING,
				field: 'first_name',
				allowNull: false,
			},
			lastName: {
				type: DataTypes.STRING,
				field: 'last_name',
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				field: 'email',
				allowNull: false,
				unique: true,
			},
			avatar: {
				type: DataTypes.STRING,
				field: 'avatar',
			},
			googleId: {
				type: DataTypes.STRING,
				field: 'google_id',
				allowNull: true,
			},
			role: {
				type: DataTypes.ENUM('User', 'Admin', 'Developer'),
				field: 'role',
			},
			password: {
				type: DataTypes.STRING,
				field: 'password',
				allowNull: true,
			},
			active: {
				type: DataTypes.BOOLEAN,
				field: 'active',
			},
			verified: {
				type: DataTypes.BOOLEAN,
				field: 'verified',
			},
			createdAt: {
				type: DataTypes.DATE,
				field: 'created_at',
			},
			updatedAt: {
				type: DataTypes.DATE,
				field: 'updated_at',
			},
			version: {
				type: DataTypes.INTEGER,
				field: 'version',
			},
		});
	},
	down: async (queryInterface) => {
		await queryInterface.dropTable('users');
	},
};
