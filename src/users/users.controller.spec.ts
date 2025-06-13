import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUsers = [
    { id: 1, name: 'Test', email: 'test@example.com' },
    { id: 2, name: 'Jane', email: 'jane@example.com' },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            getAllUsers: jest.fn().mockReturnValue(mockUsers),
            getUserById: jest.fn((id) => mockUsers.find((u) => u.id === id)),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should return all users', () => {
    expect(controller.getAllUsers()).toEqual(mockUsers);
  });

  it('should return user by ID', () => {
    expect(controller.getUserById('1')).toEqual(mockUsers[0]);
  });

  it('should throw if user not found', () => {
    jest.spyOn(service, 'getUserById').mockReturnValue(undefined);
    expect(() => controller.getUserById('999')).toThrow();
  });
});
