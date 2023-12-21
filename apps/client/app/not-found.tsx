'use client';

import { Routes } from './config/routing/routes';
import { PiSmileyNervousDuotone } from 'react-icons/pi';
import './global.css';

export default function NotFound() {
  return (
    <main
      style={{
        padding: '6rem 1.5rem ',
        placeItems: 'center',
        minHeight: '100%',
        backgroundColor: 'transparent',
      }}>
      <div
        style={{
          textAlign: 'center',
        }}>
        <p
          style={{
            color: 'rgb(79 70 229)',
            fontWeight: '600',
            fontSize: '2rem',
            lineHeight: '1.5rem',
            padding: '',
          }}>
          404
        </p>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
          }}>
          <h1
            style={{
              fontSize: '3rem',
              lineHeight: '3rem',
              fontWeight: '700',
            }}>
            Сторінку не знайдено
          </h1>
          <PiSmileyNervousDuotone
            style={{
              fontSize: '50',
            }}
          />
        </div>
        <p
          style={{
            marginTop: '1.5rem',
            fontSize: '1rem',
            lineHeight: '1.5rem',
          }}>
          Нам не вдалося знайти сторінку, яку ви шукаєте{' '}
        </p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '2.5rem',
            columnGap: '1.5rem',
          }}>
          <a
            className='mainButton'
            href={Routes.Dashboard}>
            На головну
          </a>
          <a
            href='/'
            className='SupButton'>
            <p>
              Служба підтримки <span aria-hidden='true'>&rarr;</span>
            </p>
          </a>
        </div>
      </div>
    </main>
  );
}
