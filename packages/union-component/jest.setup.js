import '@testing-library/jest-dom/extend-expect';
import mockFetch from 'jest-fetch-mock';

window.grecaptcha = {
  ready: jest.fn().mockImplementation((cb) => Promise.resolve(cb && cb())),
  execute: jest.fn().mockResolvedValue('recaptcha-token')
};

mockFetch.enableMocks();
