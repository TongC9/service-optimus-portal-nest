import { Module } from '@nestjs/common';
import { MongoModule } from 'src/database/mongo/mongo.module';
import { SaleOrderJobListsRepository } from 'src/database/mongo/repositories/saleorderjoblists/saleorderjoblists.repository';
import { NuOrderController } from './nu-order.controller';
import { NuOrderService } from './nu-order.service';
import { OptimusOrder_2sRepository } from 'src/database/mongo/repositories/optimusorder_2s/optimusorder_2s.repository';
import { OptimusJobList_2sRepository } from 'src/database/mongo/repositories/optimusjoblist_2s/optimusjoblist_2s.repository';
import { OptimusRepairJob_2sRepository } from 'src/database/mongo/repositories/optimusrepairjob_2s/optimusrepairjob_2s.repository';

@Module({
  imports: [MongoModule],
  providers: [NuOrderService, SaleOrderJobListsRepository, OptimusOrder_2sRepository, OptimusJobList_2sRepository, OptimusRepairJob_2sRepository], 
  controllers: [NuOrderController],
})
export class NuOrderModule {}
