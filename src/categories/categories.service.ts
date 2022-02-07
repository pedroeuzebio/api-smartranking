import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './interfaces/category.interface'
import { CreateCategoryDto } from './dtos/create-category.dto';
import { PlayersService } from 'src/players/players.service';
import { UpdateCategoryDto } from './dtos/update-category.dto'
@Injectable()
export class CategoriesService {
    
   
    constructor(@InjectModel('Category') private readonly categoryModel: Model<Category>, private readonly playersService: PlayersService){}
    
    async createCategory(createCategoryDto:CreateCategoryDto):Promise<Category>  {

        const { category } = createCategoryDto
        console.log(category)
        const categoryFound = await this.categoryModel.findOne({category: category}).exec()
        console.log("passou" + categoryFound)
        if(categoryFound) {
            throw new BadRequestException(` Category ${category} already exists`)
        }
        const createdCategory = new this.categoryModel(createCategoryDto)
        return await createdCategory.save()
    }
    async getAllCategories(): Promise<Category[]> {
        
        return await this.categoryModel.find().populate("players").exec();
        
    }

    async getCategoryById(category: string): Promise<Category>{

        const categoryFound  = await this.categoryModel.findOne({category: category}).exec();

        if(!categoryFound){
            throw new NotFoundException(`category ${category} not found`);
        }
        return categoryFound;
    }

    async getPlayerCategory(playerId: any): Promise<Category> {

        /*
        Desafio
        Escopo da exceção realocado para o próprio categorys Service
        Verificar se o player informado já se encontra cadastrado
        */

       //await this.playersService.consultarplayerPeloId(playerId)                                   

       const players = await this.playersService.getAllPlayers()

       const playerFilter = players.filter( player => player._id == playerId )

       if (playerFilter.length == 0) {
           throw new BadRequestException(`O id ${playerId} não é um player!`)
       }

        return await this.categoryModel.findOne().where('players').in(playerId).exec() 

    }



    async updateCategory(category: string, updatecategoryDto: UpdateCategoryDto): Promise<void> {
   
        const categoryFound = await this.categoryModel.findOne({category}).exec()

        if (!categoryFound) {
            throw new NotFoundException(`category ${category} not Found!`)
        }

        await this.categoryModel.findOneAndUpdate({category},{$set: updatecategoryDto}).exec()
        
    }

    async assignCategoryPlayer(params: string[]): Promise<void> {

        const category = params['category']
        const playerId = params['playerId']

        const categoryFound = await this.categoryModel.findOne({category}).exec()
        const playerAlreadyCreatedCategory = 
                                await this.categoryModel
                                                    .find({category})
                                                    .where('players')
                                                    .in(playerId)
                                                    .exec() 

                                      

        await this.playersService.getPlayersById(playerId)
       
        const players = await this.playersService.getAllPlayers()

        
        if (!categoryFound) {
            throw new BadRequestException(`category ${category} not found!`)
        }

        if(playerAlreadyCreatedCategory.length >0) {
            throw new BadRequestException(`player ${playerId} already registered to category ${category}!`)
        }

        categoryFound.players.push(playerId)
        await this.categoryModel.findOneAndUpdate({category},{$set: categoryFound}).exec() 
    }

    
}
