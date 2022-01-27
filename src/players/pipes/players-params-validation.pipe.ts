import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";

export class PlayersParamsValidationPipe implements PipeTransform{

        transform (value:any, metadata: ArgumentMetadata){

            if(!value){
                throw new BadRequestException(`Param value ${metadata.data} must be non-empty`)
            }
            //console.log(`value: ${value} metadata: ${metadata.type}`);
            return value;
        }

}