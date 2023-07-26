import { IsNotEmpty, IsString } from 'class-validator';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Ticket {
  @Field()
  @IsString()
  @IsNotEmpty()
  section: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  seat: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  price: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  row: string;
}
