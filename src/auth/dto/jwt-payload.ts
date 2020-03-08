import { UserRole } from './../user.entity';
export class JwtPayload {
  id: number;
  email: string;
  role: UserRole;
}
