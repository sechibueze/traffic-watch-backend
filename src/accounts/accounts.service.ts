import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';
import { getRepository, Repository } from 'typeorm';
import { Account } from './account.entity';
import { CreateAccountDTO } from './dto/createAccount.dto';
@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private userAccount: Repository<Account>,
  ) {}

  async getAccounts(): Promise<Account[]> {
    return await this.userAccount.find();
  }

  async getAccountById(accountId): Promise<Account> {
    return await this.userAccount.findOne(accountId);
  }

  async getAccountByPayload(payload): Promise<Account | undefined> {
    const user = await this.userAccount
      .createQueryBuilder('user')
      .select('user.id')
      .addSelect('user.fullname')
      .addSelect('user.email')
      .addSelect('user.password')
      .where(payload)
      .getOne();
    console.log('user--', user);
    return user;
    // return await this.userAccount.findOne({ where: payload });
  }

  async createAccount(userAccountDTO: CreateAccountDTO): Promise<Account> {
    const accountUser = this.userAccount.create(userAccountDTO);
    return await this.userAccount.save(accountUser);
  }

  async updateAccount(
    accountId: string,
    updateAccountDTO: CreateAccountDTO,
  ): Promise<any> {
    const foundUserAccount = await this.userAccount.preload({
      id: accountId,
      ...updateAccountDTO,
    });

    if (!foundUserAccount) {
      throw new NotFoundException(`User with ${accountId} not found`);
    }

    return this.userAccount.save(foundUserAccount);
  }

  async deleteAccount(payload: any): Promise<any> {
    return this.userAccount.delete(payload);
  }
}
