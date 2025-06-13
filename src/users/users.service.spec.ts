import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import * as fs from 'fs';

jest.mock('fs');

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should return all users', () => {
    const mockData = JSON.stringify([
      { id: 1, name: 'Test User', email: 'test@example.com' },
    ]);
    (fs.readFileSync as jest.Mock).mockReturnValue(mockData);
    expect(service.getAllUsers()).toEqual(JSON.parse(mockData));
  });

  it('should throw if file cannot be read', () => {
    (fs.readFileSync as jest.Mock).mockImplementation(() => {
      throw new Error('File not found');
    });
    expect(() => service.getAllUsers()).toThrow();
  });

  it('should return user by ID', () => {
    const mockData = JSON.stringify([
      { id: 2, name: 'Test User 2', email: 'test2@example.com' },
    ]);
    (fs.readFileSync as jest.Mock).mockReturnValue(mockData);
    expect(service.getUserById(2)).toEqual(JSON.parse(mockData)[0]);
  });
});
