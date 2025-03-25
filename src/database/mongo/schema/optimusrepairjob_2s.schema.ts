import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

export type OptimusRepairJob_2sDocument = OptimusRepairJobList_2s & Document;

@Schema()
export class OptimusRepairJobList_2s {
  @Prop({type: String})
  jobId: string;

  @Prop({type: String})
  jobStatus: string;

  @Prop({type: String})
  jobType: string;
  
  @Prop({type: String})
  jobZone: string;

  @Prop({type: Number})
  itemsSize: number;

  @Prop({ type: String })
  createBy: string;

  @Prop({ type: String })
  updateBy: string;

  @Prop({ default: [] })
  itemsList: string[];

  @Prop({type: String})
  jobDate: string;

  @Prop({ default: Date.now })
  TIMESTAMP: Date;
}

export const OptimusRepairJob_2sSchema = SchemaFactory.createForClass(OptimusRepairJobList_2s);
