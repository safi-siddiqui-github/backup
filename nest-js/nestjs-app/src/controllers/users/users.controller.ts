import { Body, Controller, Post } from '@nestjs/common';
import { Roles } from '../../decorators/roles/roles.decorator';
import { CreateGeneralUserDto } from '../../dtos/users/users.dto';
import { UsersService } from '../../services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('signupGeneralUser')
  createGeneralUser(@Body() createGeneralUserDto: CreateGeneralUserDto) {
    const user = this.usersService.createGeneralUser(createGeneralUserDto);
    return { user };
  }

  @Post('signupAdminUser')
  @Roles('admin')
  createAdminUser(@Body() createGeneralUserDto: CreateGeneralUserDto): string {
    this.usersService.createGeneralUser(createGeneralUserDto);
    return 'This action adds a admin user';
  }

  //   @Get()
  //   async findAll(
  //     @Req() request: Request,
  //     @Query('age') age: number,
  //   ): Promise<string> {
  //     await new Promise(() => setTimeout(() => {}, 1000));
  //     return 'This action returns all users';
  //   }
  // @Get()
  // async findAll(): Promise<User[]> {
  //   await new Promise(() => setTimeout(() => {}, 1000));
  //   return this.usersService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param() params: { id: string }): string {
  //   return `This action returns user #${params?.id}`;
  // }

  // //   @Post()
  // //   create(@Body() body: CreateUserDto): string {
  // //     return 'This action adds a new user';
  // //   }
  // @Post()
  // // @UsePipes(new ZodValidationPipe(createUserSchema))
  // // create(@Body(new ValidationPipe()) createUserDto: CreateUserDto): string {
  // create(@Body() createUserDto: CreateUserDto): string {
  //   this.usersService.create(createUserDto);
  //   return 'This action adds a new user';
  // }

  // @Put(':id')
  // update(
  //   @Param('id', new DefaultValuePipe(0), ParseIntPipe) id: string,
  //   // @Body(new ZodValidationPipe(createUserSchema)) createUserDto: CreateUserDto,
  //   // @Body(new ValidationPipe()) createUserDto: CreateUserDto,
  //   @Body() createUserDto: CreateUserDto,
  // ) {
  //   return `This action updates a #${id} user, email ${createUserDto?.email}`;
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return `This action removes a #${id} user`;
  // }

  // @Get('restricted/:id')
  // restrictedRoute() {
  //   throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  // }

  // @Get('validation/:id')
  // validationRoute(@Param('id', ParseIntPipe) id: number) {
  //   return `This action returns user #${id}`;
  // }
}
