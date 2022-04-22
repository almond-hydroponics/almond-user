import { Exclude } from 'class-transformer';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar' })
  public firstName!: string;

  @Exclude()
  @Column({ type: 'varchar' })
  public lastName!: string;

  @Exclude()
  @Column({ type: 'varchar' })
  public photo!: string;

  @Column({ type: 'varchar' })
  public email!: string;

  @Exclude()
  @Column({ type: 'varchar' })
  public password!: string;
}
