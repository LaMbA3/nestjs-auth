import { UserRole } from './user.entity';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
// import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
// import { AuthGuard } from '@nestjs/passport';

@Injectable()
// export class RolesGuard extends AuthGuard('jwt') {
export class RolesGuard implements CanActivate {
  constructor(private roles: UserRole[]) {
    //super();
  }
  //constructor(private readonly reflector: Reflector) {}
  // handleRequest(err, user, info: Error) {
  //   // console.log(this.roles);
  //   console.log(user);
  //   console.log(err);
  //   return user;
  // }
  canActivate(context: ExecutionContext): boolean {
    //const roles = this.reflector.get<string[]>('roles', context.getHandler());
    // if (!this.roles) {
    //   return true;
    // }
    const request = context.switchToHttp().getRequest();
    const user = request.user; // it's undefined
    console.log(user);
    console.log(this.roles);
    console.log(this.roles.includes(user.role));
    const hasRole = () => this.roles.includes(user.role);
    return user && hasRole();
  }
}
