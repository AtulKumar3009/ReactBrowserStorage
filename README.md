# Web Storage Helper

`web-storage-helper` is a TypeScript-based library that simplifies working with different types of storage in the browser (like `localStorage`, `sessionStorage`, `cookies`, `indexedDB`, and `temp` storage). It supports data encryption and ensures safe handling of sensitive information.

## Features

- **Multiple Storage Types**: Supports `localStorage`, `sessionStorage`, `cookies`, `indexedDB`, and `temp` storage.
- **Encryption**: Secure data encryption for both keys and values.
- **Singleton Pattern**: Ensures only one instance of the storage class.
- **Unified API**: Consistent API for managing all types of storage.
- **TypeScript Support**: Strong typing with auto-completion in editors.

## Installation

You can easily install `web-storage-helper` via **Yarn**:

```bash
yarn add web-storage-helper
```

## Project Setup

To get started, you need to configure the library and set up your encryption key if you plan to use encryption for data storage and retrieval.

```ts
import {configureStorage} from 'web-storage-helper';

// Configure encryption key globally
configureStorage({ encryptionKey: 'your-secret-key', encodeKey: true });
```

### Importing Storage Methods

The storage API is exposed via the `storage` object, which contains methods for `localStorage`, `sessionStorage`, `cookies`, `indexedDB`, and `temp` storage. Additionally, the `configure` method is now available directly from the `storage` object.

```ts
import storage from 'web-storage-helper';
```

You can then use the `set`, `get`, and `clear` methods provided for each storage type.

---

## Usage

### Storing Data (`set`)

To store data in a specific storage type, you can use the `set` method. Data can be stored with or without encryption.

```ts
// Store data in localStorage without encryption
const saved = storage.local.set('username', 'Atul', false);
console.log(saved); //true | false

// Store data in sessionStorage with encryption
const saved = storage.session.set('username', 'Atul', true);
console.log(saved); //true | false

// Store data in temp storage (will be cleared on page refresh)
const saved = storage.temp.set('tempData', { key: 'value' }, false);
console.log(saved); //true | false

// Store data in indexedDB
const saved = await storage.indexedDB.set('userData', { name: 'Atul', age: 30 }, false);
console.log(saved); //true | false

// Store data in cookies with encryption
const saved = storage.cookie.set('authToken', 'your-auth-token', true);
console.log(saved); //true | false
```

### Retrieving Data (`get`)

To retrieve data from any storage type, use the `get` method. If encryption was used during storage, you can pass `true` to decrypt the data when retrieving it.

```ts
// Get data from localStorage (without encryption)
const username = storage.local.get('username', false);

// Get data from sessionStorage (with encryption)
const encryptedUsername = storage.session.get('username', true);

// Get data from temp storage (non-persistent across page refreshes)
const tempData = storage.temp.get('tempData', false);

// Get data from cookies (with encryption)
const authToken = storage.cookie.get('authToken', true);

// Get data from indexedDB
const userData = await storage.indexedDB.get('userData', false);
```

### Clearing Data (`clear`)

To clear data from a storage type, use the `clear` method. You can clear a specific key or clear all data from that storage.

```ts
// Clear a specific key from localStorage (without encryption)
const cleared = storage.local.clear('username', false);
console.log(cleared); //true | false

// Clear all data from sessionStorage
const cleared = storage.session.clear();
console.log(cleared); //true | false

// Clear a specific encrypted key from cookies
const cleared = storage.cookie.clear('authToken', true);
console.log(cleared); //true | false

// Clear all data from indexedDB
const cleared= await storage.indexedDB.clear();
console.log(cleared); //true | false
```

---

## API Reference

### `configureStorage({ encryptionKey:string, encodeKey: boolean })`

Configures the encryption key for the library. If encryption is enabled, this key will be used to encrypt and decrypt data.

- **config**: The configuration object containing `encryptionKey` (string).

### `set(key: string, value: any, encryption = false)`

Stores data in a specified storage type.

- **key**: The key under which the data will be stored (string).
- **value**: The data to be stored (any type).
- **encryption**: If `true`, encrypts the key and value before storing.

### `get(key: string, encryption = false)`

Retrieves data from the specified storage type.

- **key**: The key under which the data is stored (string).
- **encryption**: If `true`, decrypts the value before returning it.

### `clear(key?: string, encryption = false)`

Clears data from the specified storage type.

- **key**: Optional. If provided, only the specific key will be removed. Otherwise, clears all data from the storage type.
- **encryption**: If `true`, encrypts the key before clearing.

---

## Example: Full Usage Example

```ts
import storage from 'web-storage-helper';

// Configure encryption key globally
storage.configure({ encryptionKey: 'secret-key', encodeKey: true });

// Set encrypted data in localStorage
storage.local.set('username', 'Atul', true);

// Get encrypted data from localStorage
const username = storage.local.get('username', true);
console.log(username); // 'Atul'

// Clear encrypted data from localStorage
storage.local.clear('username', true);

// Set data in indexedDB
const saved = await storage.indexedDB.set('username', 'Atul');

// Get data from localStorage
const username = await storage.indexedDB.get('username');
console.log(username); // 'Atul'

// Clear data from localStorage
const cleared = await storage.local.clear('username');
```

---

## Contributing

We welcome contributions to improve the library! Please fork the repository, create a new branch, and submit a pull request with your changes. Don't forget to add tests for new features or bug fixes.