import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'customers' })
export class CustomerTable {
  @PrimaryColumn({
    type: 'uuid',
    name: 'id'
  })
  id!: string;

  @Column({
    type: 'varchar',
    name: 'name'
  })
  name!: string;

  @Column({
    type: 'varchar',
    name: 'email'
  })
  email!: string;

  @Column({
    type: 'varchar',
    name: 'password'
  })
  password!: string;

  @CreateDateColumn({
    name: 'created_at'
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'updated_at'
  })
  updatedAt!: Date;

  @DeleteDateColumn({
    name: 'deleted_at'
  })
  deletedAt?: Date;
}
