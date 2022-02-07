
import { IsString, IsOptional, IsArray, ArrayMinSize } from "class-validator";
import { Event} from "../interfaces/event.interface"
export class UpdateCategoryDto {

    @IsString()
    @IsOptional()
    description: string;

    @IsArray()
    @ArrayMinSize(1)
    events: Array<Event>

}
