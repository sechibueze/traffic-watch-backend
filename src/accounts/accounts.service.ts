import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './account.entity';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private userAccount: Repository<Account>,
  ) {}

  getAccounts(): Promise<Account[]> {
    return this.userAccount.find();
  }
}
