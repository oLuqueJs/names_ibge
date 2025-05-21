import { DataSource } from 'typeorm';
import { User } from '../model/user.entity';
import { DATA_SOURCE, USER_REPOSITORY } from '../../../common/constants/typeorm.constants';

export const UserProviders = [
  {
    provide: USER_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: [DATA_SOURCE],
  },
];
