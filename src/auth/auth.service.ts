import { Injectable } from '@nestjs/common';
import { AccountsService } from '../accounts/accounts.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

// import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    private accountService: AccountsService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const userAccount = await this.accountService.getAccountByPayload({
      email,
    });
    const isPasswordMatch = await bcrypt.compare(
      password,
      userAccount.password,
    );
    if (userAccount && isPasswordMatch) {
      const { password, ...otherFields } = userAccount;
      return otherFields;
    }

    return null;
  }

  async getUserJwt(user: any) {
    const payload = { id: user.id, is_active: user.is_active };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
