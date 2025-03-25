import {ValidationArguments, registerDecorator, ValidationOptions, ValidateIf} from 'class-validator';

import { applyDecorators} from '@nestjs/common';

export function RequireBothFields(field: string, validationOptions?: ValidationOptions) {
    return (object: object, propertyName: string) => {
      registerDecorator({
        name: 'RequireBothFields',
        target: object.constructor,
        propertyName,
        options: validationOptions,
        constraints: [field],
        validator: {
          validate(value: any, args: ValidationArguments) {
            const relatedField = args.constraints[0];
            const relatedValue = (args.object as any)[relatedField];
            if ((value && !relatedValue)) {
              return false;
            }
            return true;
          },
          defaultMessage(args: ValidationArguments) {
            return `${args.property} requires ${args.constraints[0]} and vice versa.`;
          },
        },
      });
    };
  }

  export function AnyOf(properties: string[]) {
    return function (target: any) {
      for (const property of properties) {
        const otherProps = properties.filter(prop => prop !== property);
        const decorators = [
          // Validates if all other properties are undefined.
          ValidateIf((obj: any) =>
            obj[property] !== undefined || otherProps.reduce(
              (acc, prop) => acc && obj[prop] === undefined,
              true,
            ),
          ),
        ];
  
        for (const decorator of decorators) {
          applyDecorators(decorator)(target.prototype, property);
        }
      }
    };
  }