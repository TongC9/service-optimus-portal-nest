import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OptimusRepairJobList_2s, OptimusRepairJob_2sDocument } from '../../schema/optimusrepairjob_2s.schema'; 
import { JobRepair_2sCondition } from 'src/database/mongo/repositories/nu_order/nu_order.interface';

@Injectable()
export class OptimusRepairJob_2sRepository {
  constructor(@InjectModel(OptimusRepairJobList_2s.name) private optimusRepairJob_2sModel: Model<OptimusRepairJob_2sDocument>) {}
    
  async queryRepairJobList( jobRepair_2sCondition: JobRepair_2sCondition ) { 
    return await this.optimusRepairJob_2sModel.find({...jobRepair_2sCondition}).exec(); 
  }
}
