import { Body, Controller, Post } from '@nestjs/common';
import { NuOrderService } from './nu-order.service';
import { QueryOrderJobListDto, QueryRepairJobListDto } from 'src/domain/nu-order/dto/query-nu-order-list.dto';

@Controller('nu-order')
export class NuOrderController {
constructor(
    private nuOrderService: NuOrderService
){}

@Post('insertJob')
  async insertJob(@Body() record: any) {
      return await this.nuOrderService.createOrder(record);
  }

@Post('getJob')
  getJob() {
    return this.nuOrderService.findAll();
  }

@Post('queryJobList')
  queryJobList(@Body() req: QueryOrderJobListDto) {
    return this.nuOrderService.queryJobList(req);
  }

@Post('queryRepairJobList')
  queryRepairJobList(@Body() req: QueryRepairJobListDto) {
    return this.nuOrderService.queryRepairJobList(req);
  }
}
