import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

export type OptimusJobList_2sDocument = OptimusJobList_2s & Document;

@Schema()
export class OptimusJobList_2s {
  @Prop({type: String})
  jobId: string;

  @Prop({type: String})
  jobStatus: string;

  @Prop({type: String})
  jobType: string;
  
  @Prop({type: String})
  jobZone: string;

  @Prop({ default: [] })
  itemsList: string[];

  @Prop({type: String})
  jobDate: string;

  @Prop({ default: Date.now })
  TIMESTAMP: Date;
}

export const OptimusJobList_2sSchema = SchemaFactory.createForClass(OptimusJobList_2s);
