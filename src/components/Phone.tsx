import Image from 'next/image';
import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

interface PhoneProps extends HTMLAttributes<HTMLDivElement> {
  imgSrc: string;
  dark?: boolean;
}

const Phone = ({ imgSrc, className, dark = false, ...props }: PhoneProps) => {
  return (
    <div
      className={cn(
        'relative pointer-events-none z-50 overflow-hidden',
        className
      )}
      {...props}
    >
      <Image
        src={dark ? '/phone-template-dark-edges.png' : '/phone-template-white-edges.png'}
        alt='Phone template'
        width={800} 
        height={1800} 
        className='pointer-events-none z-50 select-none' 
      />

      <div className='absolute -z-10 inset-0'>
        <Image
            src={imgSrc}
            alt="Testimonial image"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,YOUR_BASE64_ENCODED_DATA"
            width={500} 
            height={250} 
            className='object-cover min-w-full min-h-full'
            />
        </div>
    </div>
  );
};

export default Phone;
