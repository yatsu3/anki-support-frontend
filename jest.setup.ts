import { TextEncoder, TextDecoder } from 'util';
// jest.setup.ts
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
