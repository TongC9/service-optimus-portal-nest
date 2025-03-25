import { IsBoolean, IsOptional, IsString, IsArray, Matches } from 'class-validator';
import { AnyOf } from 'src/common/decorators/validation.decorator';

@AnyOf(['jobDate', 'jobId'])
export class QueryOrderJobListDto {
  @IsString()
  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: `JobDate must be in the format "YYYY-MM-DD"` }) //UTC date
  jobDate: string;

  @IsString()
  @IsOptional()
  jobId: string;

  @IsArray()
  @IsOptional()
  jobStatus: string[];

  @IsString()
  @IsOptional()
  newMobileNo: string;

  @IsArray()
  @IsOptional()
  orderStatus: string[];

  @IsBoolean()
  @IsOptional()
  fullInfoFlag: boolean = false;
}

@AnyOf(['jobDate', 'jobId'])
export class QueryRepairJobListDto {
  @IsString()
  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: `JobDate must be in the format "YYYY-MM-DD"` }) //UTC date
  jobDate: string;

  @IsString()
  @IsOptional()
  jobId: string;

  @IsArray()
  @IsOptional()
  jobStatus: string[];

  @IsString()
  @IsOptional()
  newMobileNo: string;

  @IsArray()
  @IsOptional()
  orderStatus: string[];

  @IsBoolean()
  @IsOptional()
  fullInfoFlag: boolean = false;
}
