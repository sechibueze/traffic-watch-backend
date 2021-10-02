import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
  HttpException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDTO } from './dto/createAccount.dto';

import { LocalAuthGuard } from '../auth/local-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
@Controller('accounts')
export class AccountsController {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  async getAccounts(): Promise<any> {
    const accounts = await this.accountsService.getAccounts();
    return {
      message: 'Success',
      data: accounts,
      errors: null,
    };
  }

  @Get(':id')
  async getAccount(@Param('id') accountId): Promise<any> {
    const account = await this.accountsService.getAccountById(accountId);
    return {
      message: 'Success',
      data: account,
      errors: null,
    };
  }

  @Post()
  async createAccount(
    @Body() createAccountDTO: CreateAccountDTO,
  ): Promise<any> {
    // const { fullname, email, password } = createAccountDTO;
    const newAccount = await this.accountsService.createAccount(
      createAccountDTO,
    );
    const { password, ...otherAccountDetails } = newAccount;
    return {
      message: 'New account created',
      data: otherAccountDetails,
    };
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<any> {
    return this.authService.getUserJwt(req.user);
  }

  // Require Bear <token> as authorization header
  @UseGuards(JwtAuthGuard)
  @Get('profile/me')
  async accountProfile(@Request() req): Promise<any> {
    const currentUserId = req.user.id;
    const user = this.accountsService.getAccountById(currentUserId);

    if (!user) {
      throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  @Patch(':id')
  updateAccount(
    @Param('id') accountId,
    @Body() updateAccountDTO: CreateAccountDTO,
  ): any {
    return {
      data: {
        accountId,
        ...updateAccountDTO,
      },
    };
  }

  @Delete(':id')
  async deleteAccount(@Param('id') accountId): Promise<any> {
    const hasDeleted = await this.accountsService.deleteAccount({
      id: accountId,
    });
    return {
      data: hasDeleted,
    };
  }
}
