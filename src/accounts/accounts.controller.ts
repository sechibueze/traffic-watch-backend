import { Controller, Get } from '@nestjs/common';
import { AccountsService } from './accounts.service';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get()
  getAccounts(): any {
    const accounts = this.accountsService.getAccounts();
    return {
      message: 'Success',
      data: accounts,
      errors: null,
    };
  }
}
