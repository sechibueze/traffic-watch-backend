import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AccountsModule } from '../accounts/accounts.module';
import { LocalStratgy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot(),
    AccountsModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '86400s' },
    }),
  ],
  providers: [AuthService, LocalStratgy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
