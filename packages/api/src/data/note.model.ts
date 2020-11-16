import { Field, ID, InputType, ObjectType } from 'type-graphql';

@ObjectType()
export class Note {
  constructor(id: string) {
    this.id = id;
  }

  @Field((_type) => ID)
  id?: string;

  @Field()
  title?: string;

  @Field({ nullable: true })
  msg?: string;

  @Field({ nullable: true })
  color?: string;
}

@InputType()
export class NoteInput implements Partial<Note> {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  msg?: string;

  @Field({ nullable: true })
  color?: string;
}
