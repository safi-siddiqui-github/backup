import { IsEmail, IsString } from 'class-validator';

export class CreateGeneralUserDto {
  // @IsString()
  // id?: string;

  @IsEmail()
  email?: string;

  @IsString()
  password?: string;

  // @IsString()
  // username?: string;
}

// export const createUserSchema = z.object({
//   email: z.email(),
//   password: z.string(),
// });

// export type CreateUserDto = z.infer<typeof createUserSchema>;

// nest g cl dtos/users/user.dto --flat
