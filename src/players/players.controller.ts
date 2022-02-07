import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';
import { PlayersService } from './players.service';
import {ParamsValidationPipe} from '../common/pipes/params-validation.pipe';
import { UpdatePlayerDto } from './dtos/update-player.dto';
@Controller('api/v1/jogadores')
export class PlayersController {
  constructor(readonly playersService: PlayersService) {}
  @Post()
  @UsePipes(ValidationPipe)
  async createPlayer(@Body() createPlayerDto: CreatePlayerDto): Promise <Player> {
   return await this.playersService.createPlayer(createPlayerDto);
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async updatePlayer(@Body() updatePlayerDto: UpdatePlayerDto,
  @Param('_id', ParamsValidationPipe) _id:string): Promise<void> 
  {
    await this.playersService.updatePlayer(_id,updatePlayerDto);
  }
  @Get()
  async getPlayers(): Promise<Player[] | Player> {

    return await this.playersService.getAllPlayers();
  }

  @Get('/:_id')
  async getPlayersById(@Param('_id',ParamsValidationPipe) _id: string): Promise<Player[] | Player> {

     return await this.playersService.getPlayersById(_id)

  }


  @Delete('/:_id')
  async deletePlayer(@Param('_id', ParamsValidationPipe) _id: string): Promise<void> {
    this.playersService.deletePlayer(_id);
  }
}
