import * as faker from 'faker';
import { has } from 'lodash';
import { Test } from '@nestjs/testing';
import { Model } from 'mongoose';
import { TestingModule } from '@nestjs/testing/testing-module';
import { USER_MODEL_PROVIDER } from '../../constants';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserService } from '../user.service';
import { User } from '../entity/user.entity';
import { UserModel } from '../model/user.model';
import { UserRepository } from '../repository/user.repository';

describe('User Controller', () => {
  let service: UserService;
  let userModel: Model<User> = UserModel;
  let repository: UserRepository;

  beforeAll(async () => {
    userModel = UserModel;

    const userProviders = {
      provide: USER_MODEL_PROVIDER,
      useValue: userModel,
    };

    const module: TestingModule = await Test
      .createTestingModule({
        providers: [
          UserService,
          UserRepository,
          userProviders,
        ],
      })
      .compile();

    service = module.get<UserService>(UserService);
    repository = module.get<UserRepository>(UserRepository);
  });

  it('should create a user', async () => {
    const result: CreateUserDto = {
      _id: faker.random.uuid(),
      name: faker.name.findName(),
      lastname: faker.name.lastName(),
      age: faker.random.number(),
      picture: faker.image.imageUrl(),
      company: faker.company.companyName(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber(),
      balance: faker.finance.amount(),
      jobTitle: faker.name.jobTitle(),
      avatar: faker.image.avatar(),
      ipv6: faker.internet.ipv6(),
      finance: {
        account: faker.finance.account(),
        accountName: faker.finance.accountName(),
     },
      address: {
        zipCode: faker.address.zipCode(),
        city: faker.address.city(),
        streetAddress: faker.address.streetAddress(),
        country: faker.address.country(),
     },
      shopping: [{
        _id: faker.random.uuid(),
        productName: faker.commerce.productName(),
        price: faker.commerce.price(),
        productAdjective: faker.commerce.productAdjective(),
        productMaterial: faker.commerce.productMaterial(),
        product: faker.commerce.product(),
        department: faker.commerce.department(),
      }],
    };

    jest.spyOn(repository, 'create').mockImplementation(async () => result );
    const data = await service.create(result);
    expect(has(data , '_id')).toBeTruthy();
    expect(data._id).toBeDefined();
    Object.keys(data).forEach((key) => {
      expect(data[key]).toBe(result[key]);
    });
  });
});
