import { getModelForClass, prop } from '@typegoose/typegoose';

export class Post {
  // @prop()
  // public id: number;
  @prop()
  public title: string;
  @prop()
  public content: string;
}

export const PostModel = getModelForClass(Post);
