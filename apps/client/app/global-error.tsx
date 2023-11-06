'use client';

import { PiSmileyNervousDuotone } from 'react-icons/pi';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export default function GlobalError({
  error,
  reset,
}: {
  error: (Error & { digest?: string }) | string;
  reset: () => void;
}) {
  return (
    <html
      lang='uk'
      className={montserrat.className}>
      <body>
        <main className='grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8'>
          <div className='text-center'>
            <p className='text-base font-semibold text-indigo-600'>
              <PiSmileyNervousDuotone />
            </p>
            <h1 className='mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl'>
              Щось трапилось!
            </h1>
            <p className='mt-6 text-base leading-7 text-gray-600'>
              Вибачте, неочікувана помилка
            </p>
            <div className='mt-10 flex items-center justify-center gap-x-6'>
              <button
                onClick={() => reset()}
                className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                Спробувати знову
              </button>
              <a
                href='#'
                className='text-sm font-semibold text-gray-900'>
                Служба підтримки <span aria-hidden='true'>&rarr;</span>
              </a>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
