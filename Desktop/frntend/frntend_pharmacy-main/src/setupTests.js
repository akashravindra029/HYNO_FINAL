import '@testing-library/jest-dom';

// Add global TextEncoder and TextDecoder for tests
import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
