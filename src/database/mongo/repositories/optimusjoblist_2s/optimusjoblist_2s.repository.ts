import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OptimusJobList_2s, OptimusJobList_2sDocument } from '../../schema/optimusjoblist_2s.schema'; 
import { JobList_2sCondition } from 'src/database/mongo/repositories/nu_order/nu_order.interface';

@Injectable()
export class OptimusJobList_2sRepository {
  constructor(@InjectModel(OptimusJobList_2s.name) private optimusJobList_2sModel: Model<OptimusJobList_2sDocument>) {}
    
  async queryOptimusJobList( jobList_2sCondition: JobList_2sCondition ) { 
    return await this.optimusJobList_2sModel.find({...jobList_2sCondition}).exec(); 
  }
}
