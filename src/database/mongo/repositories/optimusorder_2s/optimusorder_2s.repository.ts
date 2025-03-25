import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OptimusOrder_2s } from  'src/database/mongo/repositories/optimusorder_2s/optimusorder_2s.interface';
import { Order_2sCondition } from 'src/database/mongo/repositories/nu_order/nu_order.interface';

@Injectable()
export class OptimusOrder_2sRepository {
  constructor(@InjectModel('OptimusOrder_2s') private OptimusOrder_2sModel: Model<OptimusOrder_2s>) {}
  
  async queryOptimusOrders( order_2sCondition: Order_2sCondition  ) {
    return this.OptimusOrder_2sModel.find({ ...order_2sCondition}).exec();
  }
}
