import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdatePlayerDto } from './dtos/update-player.dto';
@Injectable()
export class PlayersService {


  private readonly logger = new Logger(PlayersService.name);
  constructor(
    @InjectModel('Player') private readonly playerModel: Model<Player>,
  ) {}

  async createPlayer(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const { email } = createPlayerDto;
    const playerFound = await this.playerModel.findOne({ email }).exec();
    if (playerFound) {
      throw new BadRequestException(`Email: ${email} already exists`);
    }
    const createdPlayer = new this.playerModel(createPlayerDto);
    return await createdPlayer.save();
  }

  async updatePlayer(_id: string, updatePlayerDto: UpdatePlayerDto): Promise<void> {
    const playerFound = await this.playerModel.findOne({ _id }).exec();
    if (!playerFound) {
      throw new NotFoundException(`Player with id: ${_id } not found`);
    }
     await this.playerModel
    .findOneAndUpdate({ _id }, { $set: updatePlayerDto })
    .exec();
  }


  async getAllPlayers(): Promise<Player[]> {
    return await this.playerModel.find().exec();
  }

  async getPlayersById(
    _id: string,
  ):Promise<Player> {
    const playerFounded = await this.playerModel.findOne({ _id }).exec();
    if (!playerFounded) {
      throw new NotFoundException(`Player with id: ${_id} does not exist`);
    }
    return playerFounded;
  }

  async deletePlayer(_id: string): Promise<any> {
    const playerFound = await this.playerModel.findOne({ _id }).exec();
    if(!playerFound){
      throw new NotFoundException(`Player with id: ${_id} does not exist`);
    }
    return await this.playerModel.remove({ _id }).deleteOne();
  }


}
