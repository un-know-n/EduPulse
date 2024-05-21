import { IoCreateOutline } from 'react-icons/io5';
import { DefaultPosterLayout } from './layout/DefaultPosterLayout';
import { TbCertificate } from 'react-icons/tb';

export default function NoCertificatesPoster() {
  return (
    <DefaultPosterLayout
      title={'Сертифікати відсутні...'}
      description={'У вас немає жодного сертифікату'}
      icon={<TbCertificate fontSize='2rem' />}
    />
  );
}
