import { TextEncoder, TextDecoder } from 'util';
import '@testing-library/jest-dom';

// jest.setup.ts
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
