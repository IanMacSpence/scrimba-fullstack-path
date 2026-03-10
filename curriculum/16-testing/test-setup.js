import '@testing-library/jest-dom/vitest';
import { beforeAll, afterEach, afterAll } from 'vitest';
import { cleanup } from '@testing-library/react';

import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

const memes = {
  data: {
    memes: [
      {
        url: 'https://i.imgflip.com/1c1uej.jpg',
      },
    ],
  },
};

export const handlers = [
  http.get('https://api.imgflip.com/get_memes', () => {
    return HttpResponse.json(memes);
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

afterEach(() => {
  server.resetHandlers();
  cleanup();
});

afterAll(() => server.close());