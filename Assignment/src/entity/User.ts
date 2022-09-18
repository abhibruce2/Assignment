import { Entity, ObjectIdColumn, Column } from "typeorm";
import { ObjectId } from "mongodb";

@Entity()
export class User {
  static save: any;
  static findOne(arg0: {id: ObjectId; description: string; due_date: string; assignee: string;  status: string  }) {
    throw new Error("Method not implemented.");
  }

  @ObjectIdColumn()
  id: ObjectId;
  @Column()
  description: string;

  @Column()
  due_date: string;

  @Column()
  assignee: string;

  @Column()
  status: string;

  constructor(description: string, due_date: string,  assignee: string, status: string) {
    this.id = new ObjectId();
    this.description = description;
    this.due_date = due_date;
    this.assignee = assignee;
    this.status = status;
  }
}
