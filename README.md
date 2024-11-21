# React Browser Storage

`react-browser-storage` is a TypeScript-based library that simplifies working with different types of storage in the browser (like `localStorage`, `sessionStorage`, `cookies`, `IndexedDB`, and `Temp` storage). It supports data encryption and ensures safe handling of sensitive information.

## Features

- **Multiple Storage Types**: Supports `localStorage`, `sessionStorage`, `cookies`, `IndexedDB`, and `Temp` storage.
- **Encryption**: Secure data encryption for both keys and values.
- **Singleton Pattern**: Ensures only one instance of the storage class.
- **Unified API**: Consistent API for managing all types of storage.
- **TypeScript Support**: Strong typing with auto-completion in editors.

## Installation

You can easily install `react-browser-storage` via **Yarn**:

```bash
yarn add react-browser-storage
```

## Project Setup

To get started, you need to configure the library and set up your encryption key if you plan to use encryption for data storage and retrieval.

```ts
import {configureStorage} from 'react-browser-storage';

// Configure encryption key globally
configureStorage({ encryptionKey: 'your-secret-key', encodeKey: true });
```

### Importing Storage Methods

The storage API is exposed via the `storage` object, which contains methods for `localStorage`, `sessionStorage`, `cookies`, `IndexedDB`, and `Temp` storage. Additionally, the `configure` method is now available directly from the `storage` object.

```ts
import storage from 'react-browser-storage';
```

You can then use the `set`, `get`, and `clear` methods provided for each storage type.

---

## Usage

### Storing Data (`set`)

To store data in a specific storage type, you can use the `set` method. Data can be stored with or without encryption.

```ts
// Store data in localStorage without encryption
storage.local.set('username', 'Teekam', false);

// Store data in sessionStorage with encryption
storage.session.set('username', 'Teekam', true);

// Store data in Temp storage (will be cleared on page refresh)
storage.temp.set('tempData', { key: 'value' }, false);

// Store data in IndexedDB
storage.indexedDB.set('userData', { name: 'Teekam', age: 30 }, false);

// Store data in cookies with encryption
storage.cookie.set('authToken', 'your-auth-token', true);
```

### Retrieving Data (`get`)

To retrieve data from any storage type, use the `get` method. If encryption was used during storage, you can pass `true` to decrypt the data when retrieving it.

```ts
// Get data from localStorage (without encryption)
const username = await storage.local.get('username', false);

// Get data from sessionStorage (with encryption)
const encryptedUsername = await storage.session.get('username', true);

// Get data from Temp storage (non-persistent across page refreshes)
const tempData = await storage.temp.get('tempData', false);

// Get data from cookies (with encryption)
const authToken = await storage.cookie.get('authToken', true);

// Get data from IndexedDB
const userData = await storage.indexedDB.get('userData', false);
```

### Clearing Data (`clear`)

To clear data from a storage type, use the `clear` method. You can clear a specific key or clear all data from that storage.

```ts
// Clear a specific key from localStorage (without encryption)
storage.local.clear('username', false);

// Clear all data from sessionStorage
storage.session.clear();

// Clear a specific encrypted key from cookies
storage.cookie.clear('authToken', true);

// Clear all data from IndexedDB
storage.indexedDB.clear();
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

- **type**: The storage type (`StorageType.LOCAL`, `StorageType.SESSION`, etc.).
- **encryption**: If `true`, encrypts the key before clearing.
- **key**: Optional. If provided, only the specific key will be removed. Otherwise, clears all data from the storage type.

---

## Example: Full Usage Example

```ts
import storage from 'react-browser-storage';

// Configure encryption key globally
storage.configure({ encryptionKey: 'secret-key' });

// Set encrypted data in localStorage
storage.local.set('username', 'Teekam', true);

// Get encrypted data from localStorage
const username = await storage.local.get('username', true);
console.log(username); // 'Teekam'

// Clear encrypted data from localStorage
storage.local.clear('username', true);
```

---

## Contributing

We welcome contributions to improve the library! Please fork the repository, create a new branch, and submit a pull request with your changes. Don't forget to add tests for new features or bug fixes.