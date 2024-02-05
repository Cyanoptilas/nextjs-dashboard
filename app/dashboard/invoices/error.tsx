'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  console.log('🚀 ~ reset:', reset);
  return (
    <main className="flex h-full flex-col items-center justify-center">
      <h2 className="text-bold">Whoops! Something went wrong!</h2>
      <button
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400 hover:ring-4"
        onClick={() => reset()}
      >
        Try again
      </button>
    </main>
  );
}
