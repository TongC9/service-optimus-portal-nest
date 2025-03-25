import { Injectable } from '@nestjs/common';
import { SaleOrderJobListsRepository } from 'src/database/mongo/repositories/saleorderjoblists/saleorderjoblists.repository';
import { SaleOrderJobLists } from 'src/database/mongo/schema/saleorderjoblists.schema';

import { QueryOrderJobListDto, QueryRepairJobListDto } from 'src/domain/nu-order/dto/query-nu-order-list.dto';
import { JobList_2sCondition, JobRepair_2sCondition, Order_2sCondition } from 'src/database/mongo/repositories/nu_order/nu_order.interface'; 

import { OptimusRepairJob_2sRepository } from 'src/database/mongo/repositories/optimusrepairjob_2s/optimusrepairjob_2s.repository';
import { OptimusJobList_2sRepository } from 'src/database/mongo/repositories/optimusjoblist_2s/optimusjoblist_2s.repository';
import { OptimusOrder_2sRepository } from 'src/database/mongo/repositories/optimusorder_2s/optimusorder_2s.repository';
import { setParams } from 'src/common/utils';

@Injectable()
export class NuOrderService {
  constructor(private saleorderjoblistsRepository: SaleOrderJobListsRepository,
    private optimusRepairJob_2sRepository: OptimusRepairJob_2sRepository,
    private optimusJobList_2sRepository: OptimusJobList_2sRepository,
    private optimusOrder_2sRepository: OptimusOrder_2sRepository ) {}

  async createOrder(createDto: any) {
    return this.saleorderjoblistsRepository.createJob(createDto);
  }

  async findAll(): Promise<SaleOrderJobLists[]> {
    return this.saleorderjoblistsRepository.findSaleOrderJobList({});
  }

  async queryJobList(queryOrderJobListDto: QueryOrderJobListDto) {
    const jobListCondition: JobList_2sCondition = {};
    const orderCondition: Order_2sCondition = {};
    
    setParams(jobListCondition, 'jobDate', queryOrderJobListDto.jobDate.replaceAll('-',''));
    setParams(jobListCondition, 'jobId', queryOrderJobListDto.jobId);
    setParams(jobListCondition, 'jobStatus', queryOrderJobListDto.jobStatus, (v) => ({ $nin: v }));
    const resultOptimusJobList = await this.optimusJobList_2sRepository.queryOptimusJobList(jobListCondition);
    let resultOptimusOrder: any
    // console.log('1.....',resultOptimusJobList)
    for (let i = 0; i < resultOptimusJobList.length; i++) {
      setParams(orderCondition, 'jobListId', resultOptimusJobList[i].jobId);
      setParams(orderCondition, 'newMobileNo', queryOrderJobListDto.newMobileNo);
      setParams(orderCondition, 'orderStatus', ['cancelled'], (v) => ({ $nin: v }));
      setParams(orderCondition, 'orderNo', resultOptimusJobList[i].itemsList, (v) => ({ $in: v }));
      console.log('orderCondition =',orderCondition)
      resultOptimusOrder = await this.optimusOrder_2sRepository.queryOptimusOrders(orderCondition);
      const newItemList: any[] =[]
      let item: any;
      
      for (let j = 0; j < resultOptimusOrder.length; j++) {
        if (queryOrderJobListDto.fullInfoFlag) {
          item = {
            "transactionId" : resultOptimusOrder[j].transactionId,
            "orderDateTime" : resultOptimusOrder[j].orderDateTime,
            "orderNo": resultOptimusOrder[j].orderNo,
            "orderStatus" : resultOptimusOrder[j].orderStatus,
            "orderType" : resultOptimusOrder[j].orderType,
            "trackingNo" : resultOptimusOrder[j].trackingNo,
            "forwarderName": resultOptimusOrder[j].forwarderName,
            "customerName" : resultOptimusOrder[j].customerName,
            "contactPhoneNo" : resultOptimusOrder[j].contactPhoneNo,
            "address" : resultOptimusOrder[j].address,
            "zipCode" : resultOptimusOrder[j].zipCode,
            "deliveryProvince" : resultOptimusOrder[j].deliveryProvince,
            "packageFee" : resultOptimusOrder[j].packageFee,
            "logisticCost" : resultOptimusOrder[j].logisticCost,
            "locationCode" : resultOptimusOrder[j].locationCode,
            "newMobileNo" : resultOptimusOrder[j].newMobileNo,
            "chargeType" : resultOptimusOrder[j].chargeType,
            "networkType" : resultOptimusOrder[j].networkType,
            "packageType" : resultOptimusOrder[j].packageType,
            "productType" : resultOptimusOrder[j].productType,
            "simService" : resultOptimusOrder[j].simService,
            "subPackageType" : resultOptimusOrder[j].subPackageType,
            "sourceSystem" : resultOptimusOrder[j].sourceSystem,
            "serialNo" :  resultOptimusOrder[j].sourceSystem,
            "imsi" :  resultOptimusOrder[j].sourceSystem
          }
          
        } else {
          item = {
            "orderNo": resultOptimusOrder[j].orderNo,
            "orderStatus" : resultOptimusOrder[j].orderStatus,
            "orderDateTime" : resultOptimusOrder[j].orderDateTime,
            "newMobileNo" : resultOptimusOrder[j].newMobileNo,
            "serialNo" :  resultOptimusOrder[j].sourceSystem
          }
          }
          newItemList.push(item);
          console.log(' 2 order newItemList',newItemList)
        }
        resultOptimusJobList[i].itemsList = newItemList 
      } 
      return resultOptimusJobList;
  }
    
  async queryRepairJobList(queryRepairJobListDto: QueryRepairJobListDto) {
      const jobRepairCondition: JobRepair_2sCondition = {};
      const orderCondition: Order_2sCondition = {};

      setParams(jobRepairCondition, 'jobDate', queryRepairJobListDto.jobDate.replaceAll('-',''));
      setParams(jobRepairCondition, 'jobId', queryRepairJobListDto.jobId);
      setParams(jobRepairCondition, 'jobStatus', queryRepairJobListDto.jobStatus, (v) => ({ $nin: v }));
      const resultOptimusRepairJob = await this.optimusRepairJob_2sRepository.queryRepairJobList(jobRepairCondition);
      let resultOptimusOrder: any

      console.log('1.....',resultOptimusRepairJob)

      for (let i = 0; i < resultOptimusRepairJob.length; i++) {
        setParams(orderCondition, 'jobListId', resultOptimusRepairJob[i].jobId);
        setParams(orderCondition, 'newMobileNo', queryRepairJobListDto.newMobileNo);
        setParams(orderCondition, 'orderStatus', ['cancelled'], (v) => ({ $nin: v }));
        setParams(orderCondition, 'orderNo', resultOptimusRepairJob[i].itemsList, (v) => ({ $in: v }));
        console.log('orderCondition =',orderCondition)
        
        resultOptimusOrder = await this.optimusOrder_2sRepository.queryOptimusOrders(orderCondition);
        const newItemList: any[] =[]
        let item: any;
        
        for (let j = 0; j < resultOptimusOrder.length; j++) {
          if (queryRepairJobListDto.fullInfoFlag) {
            item = {
              "transactionId" : resultOptimusOrder[j].transactionId,
              "orderDateTime" : resultOptimusOrder[j].orderDateTime,
              "orderNo": resultOptimusOrder[j].orderNo,
              "orderStatus" : resultOptimusOrder[j].orderStatus,
              "orderType" : resultOptimusOrder[j].orderType,
              "trackingNo" : resultOptimusOrder[j].trackingNo,
              "forwarderName": resultOptimusOrder[j].forwarderName,
              "customerName" : resultOptimusOrder[j].customerName,
              "contactPhoneNo" : resultOptimusOrder[j].contactPhoneNo,
              "address" : resultOptimusOrder[j].address,
              "zipCode" : resultOptimusOrder[j].zipCode,
              "deliveryProvince" : resultOptimusOrder[j].deliveryProvince,
              "packageFee" : resultOptimusOrder[j].packageFee,
              "logisticCost" : resultOptimusOrder[j].logisticCost,
              "locationCode" : resultOptimusOrder[j].locationCode,
              "newMobileNo" : resultOptimusOrder[j].newMobileNo,
              "chargeType" : resultOptimusOrder[j].chargeType,
              "networkType" : resultOptimusOrder[j].networkType,
              "packageType" : resultOptimusOrder[j].packageType,
              "productType" : resultOptimusOrder[j].productType,
              "simService" : resultOptimusOrder[j].simService,
              "subPackageType" : resultOptimusOrder[j].subPackageType,
              "sourceSystem" : resultOptimusOrder[j].sourceSystem,
              "serialNo" :  resultOptimusOrder[j].sourceSystem,
              "imsi" :  resultOptimusOrder[j].sourceSystem
            }
            
          } else {
            item = {
              "orderNo": resultOptimusOrder[j].orderNo,
              "orderStatus" : resultOptimusOrder[j].orderStatus,
              "orderDateTime" : resultOptimusOrder[j].orderDateTime,
              "newMobileNo" : resultOptimusOrder[j].newMobileNo,
              "serialNo" :  resultOptimusOrder[j].sourceSystem
            }
            }
            newItemList.push(item);
            console.log(' 2 order newItemList',newItemList)
          }
          resultOptimusRepairJob[i].itemsList = newItemList 
        } 
      return resultOptimusRepairJob;
  }
}
    