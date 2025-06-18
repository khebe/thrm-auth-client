# Auth Client Library

TypeScript authentication client for auth services

## Installation

```bash
npm install auth-client-library
```

## Usage

```typescript
import { AuthClient } from 'auth-client-library';

const auth = new AuthClient({
  baseUrl: 'https://api.example.com/',

// Password login
const tokens = await auth.token({
  grant_type: 'password',
  email: 'user@example.com',
  password: 'securepassword'
});

// More examples available in documentation
```

## Documentation
[View Full Documentation](https://github.com/khebe/thrm-auth-client#readme)

## Contributing
Pull requests welcome! Please open an issue first to discuss changes.

## License
MIT