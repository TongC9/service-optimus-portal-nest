import { MongoConfiguration } from "src/config/mongo.config";
import { applyEncryption } from "../encryption.helper";
import {HydratedDocument, Schema } from 'mongoose'; 

export type OptimusOrder_2sDocument = HydratedDocument<typeof OptimusOrder_2sSchema>; 

export const OptimusOrder_2sSchema = new Schema({
    orderNo: String,
    transactionId: String,
    orderDateTime: String,

    createDateTime: String,
    modifyDateTime: String,
    orderStatus: String,
    orderType: String,
    trackingNo: String, 
    forwarderName: String,
    customerName: String, 
    contactPhoneNo: String,
    address: String,

    zipCode: String,
    deliveryProvince: String,
    packageFee: String,
    logisticCost: String,
    locationCode: String,
    newMobileNo: String,
    chargeType: String,
    sourceSystem: String,
    serialNo: String,
    imsi: String,
    networkType: String,
    packageType: String,
    productType: String,
    simService: String,
    subPackageType: String,
    jobDate: String,
    createBy: String,
    TIMESTAMP: String,
    jobListId: String,
    province: String,
    region: String,
    subregion: String,
    district: String,
    subdistrict: String
});

// OptimusOrders_2sSchema.index({ orderNo: 1});

export function encryptOptimusOrder_2sSchema(mongoConfig: MongoConfiguration) {
    applyEncryption(OptimusOrder_2sSchema, mongoConfig, ["customerName", "address", "contactPhoneNo", "newMobileNo"]);
}
