import { Exclude, Expose, classToPlain } from "class-transformer";
import { Table, Column, Model, Default, DataType } from "sequelize-typescript";

@Exclude()
@Table({
    tableName: 'users',
    timestamps: true,
    paranoid: false,
    underscored: true
})
export class User extends Model<User> {
    @Column({
      primaryKey: true,
      field: "id",
      type: DataType.UUID,
      defaultValue: DataType.UUIDV4
    })
    id: string;
  
    @Expose()
    @Column({
      allowNull: false,
      unique: true,
      field: "name",
      type: DataType.STRING(255)
    })
    name!: string;
  
    @Expose()
    @Column({
      allowNull: false,
      unique: true,
      field: "email",
      type: DataType.STRING(255)
    })
    email!: string;

    @Column({
      allowNull: false,
      field: "password",
      comment: "Make sure this is encrypted!!!",
      type: DataType.TEXT
    })
    password?: string | null;
  
    @Default("")
    @Expose()
    @Column({
      allowNull: false,
      field: "profileImg",
      type: DataType.TEXT
    })
    profileImg?: string;
  
  
    @Default(0)
    @Column({
      allowNull: false,
      field: "is_deleted",
      comment: "0: Not Deleted | 1: Deleted",
      type: DataType.SMALLINT
    })
    is_deleted?: number | null;
}
