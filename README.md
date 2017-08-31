# Installation

```bash
ycs add plugin rolesmanager
```

# configurations

```ts
import { Ycs } from '@ycs/core';
import { IConfig } from 'ycs-plugin-rolesmanager';

const config = Ycs.instance.config;

export const development: IConfig = {
  endpoint: '/rolesmanager',
  roles: ['rolesmanager'],
  errors: {
    empty: 'empty content',
    targetNotFound: 'target not found',
  },
};

export const production: IConfig = {
  endpoint: '/rolesmanager',
  roles: ['rolesmanager'],
  errors: {
    empty: 'empty content',
    targetNotFound: 'target not found',
  },
};

```