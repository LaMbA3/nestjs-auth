import { UserRole } from '../../users/user.entity';
export class JwtPayload {
  id: number;
  email: string;
  role: UserRole;
}
