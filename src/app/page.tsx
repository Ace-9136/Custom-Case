import Image from "next/image";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { ArrowRight, Check, Star} from 'lucide-react';
import Phone from "@/components/Phone";
import { Icons } from "@/components/Icons";
import Reviews from "@/components/Reviews";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="bg-slate-50">
      <section>
        <MaxWidthWrapper className='pb-24 pt-10 lg:grid lg:grid-cols-3 sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-27 lg:pb-30'>
          <div className="col-span-2 px-6 lg:px-0 lg:pt-4">
            <div className="relative mx-auto text-center lg:text-left flex flex-col items-center lg:items-start">
              <div className="absolute w-28 left-0 -top-20 hidden lg:block">
                <Image src="/snake-1.png" alt="Description of the image" className="w-full" width={100} height={100} />
                </div>
                  <h1 className="relative w-fit tracking-tight test-balance mt-16 font-bold !leading-tight text-gray-900 text-5xl md:text-6xl lg:text-7xl"> Your Image on a <span className="bg-green-600 px-2 text-white">Custom</span> Phone Case</h1>
                  <p className="mt-8 test-lg lg:pr-10 max-w-prose text-center lg:text-left text-balance md:text-wrap">
                    Capture your favourite memories with your own, <span className="font-semibold"> one-of-one</span> phone case. 
                    CustomCase allows you to protect your memories, not just your phone case.
                  </p>
                  <ul className="mt-8 space-y-2 text-left font-medium flex flex-col items-center sm:items-start">
                    <div className="space-y-2">
                      <li className="flex gap-1/5 items-center text-left">
                      <Check className="h-5 w-5 mr-1 shrink-0 text-green-600"/>
                      High-quality durable material</li>
                      <li className="flex gap-1/5 items-center text-left">
                      <Check className="h-5 w-5 mr-1 shrink-0 text-green-600"/>
                      5 year print guarantee</li>
                      <li className="flex gap-1/5 items-center text-left">
                      <Check className="h-5 w-5 mr-1 shrink-0 text-green-600"/>
                      Modern iPhone models supported</li>
                    </div>
                  </ul>
                  <div className="mt-12 flex flex-col sm:flex-row items-center sm:items-start gap-5">
                    <div className="flex -space-x-4">
                      <Image
                      src="/users/user-1.png"
                      alt="User 1 profile picture" 
                      width={100} 
                      height={100} 
                      className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
                    />
                      <Image
                      src="/users/user-2.png"
                      alt="User 2 profile picture" 
                      width={100} 
                      height={100} 
                      className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
                    />
                      <Image
                      src="/users/user-3.png"
                      alt="User 3 profile picture" 
                      width={100} 
                      height={100} 
                      className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
                    />
                      <Image
                      src="/users/user-4.jpg"
                      alt="User 4 profile picture" 
                      width={100} 
                      height={100} 
                      className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
                    />
                      <Image
                      src="/users/user-5.jpg"
                      alt="User 5 profile picture" 
                      width={100} 
                      height={100} 
                      className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100 object-cover"
                    />
                    </div>
                    <div className="flex flex-col justify-between items-center sm:items-start">
                      <div className="flex gap-0.5">
                        <Star className="h-4 w-4 text-green-600 fill-green-600" />
                        <Star className="h-4 w-4 text-green-600 fill-green-600" />
                        <Star className="h-4 w-4 text-green-600 fill-green-600" />
                        <Star className="h-4 w-4 text-green-600 fill-green-600" />
                        <Star className="h-4 w-4 text-green-600 fill-green-600" />
                      </div>
                      <p><span className="font-semibold">1,250</span> happy customers</p>
                    </div>
                  </div>
            </div>
          </div>
          <div className='col-span-full lg:col-span-1 w-full flex justify-center px-8 sm:px-16 md:px-0 mt-32 lg:mx-0 lg:mt-20 h-fit'>
            <div className='relative md:max-w-xl'>
            <Image
                src='/your-image.png'
                className='absolute w-40 lg:w-52 left-56 -top-20 select-none hidden sm:block lg:hidden xl:block'
                height={400}
                width={600}
                alt="your Image"
              />
              <Image
                src='/line.png'
                className='absolute w-20 -left-6 -bottom-6 select-none'
                height={100}
                width={100}
                alt="line image"
              />
              <Phone className='w-64' imgSrc='/testimonials/1.jpg' />
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Value proposition section */}
      <section className="bg-slate-100 my-6">
        <MaxWidthWrapper className="flex flex-col items-center gap-16 ">
          <div className="flex flex-col lg:flex-row items-center gap-4 sm:gap-6">
            <h2 className="order-1 tracking-tight text-center text-balance !leading-tight font-bold text-4xl md:6xl text-gray-900">What our <span className="relative px-2">customers <Icons.underline className="hidden sm:block pointer-events-none absolute inset-x-0 -bottom-5 text-green-500" /></span>say</h2>
            <Image src="/snake-2.png" width={100} height={100} className="w-24 order-0 lg:order-2" alt="Sanke image 2" />
          </div>
          <div className="mx-auto grid max-w-2xl grid-cols-1 px-4 lg:mx-0 lg:max-w-none lg:grid-col-2 gap-y-6">
            <div className="flex gap-0.5 mb-2">
              <Star className="h-5 w-5 text-green-600 fill-green-600"/>
              <Star className="h-5 w-5 text-green-600 fill-green-600"/>
              <Star className="h-5 w-5 text-green-600 fill-green-600"/>
              <Star className="h-5 w-5 text-green-600 fill-green-600"/>
              <Star className="h-5 w-5 text-green-600 fill-green-600"/>
            </div>
            <div className="text-lg leading-8">
              <p>
                &quot;This case feels durable and I even got a compliment on the design. Had the case for two and a half months now and <span className="p-0.5 bg-slate-800 text-white">the image is super clear,</span> on the case I had before, the image started fading into yellow-ish color after a couple weeks. Love it&quot;
              </p>
            </div>
            <div className="flex gap-4 mt-2">
              <Image className="rounded-full h-12 w-12 object-cover" src="/users/user-1.png" width={100} height={100} alt="user 1" />
              <div className="felx flex-col">
                <p className="font-semibold">
                  Jonathan
                </p>
                <div className="flex gap-1.5 items-center text-zinc-600"> 
                  <Check className="h-4 w-4 stroke-[3px] text-green-600"  />
                  <p className='text-sm'>Verified Purchase</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-auto grid max-w-2xl grid-cols-1 px-4 lg:mx-0 lg:max-w-none lg:grid-col-2 gap-y-6">
            <div className="flex gap-0.5 mb-2">
              <Star className="h-5 w-5 text-green-600 fill-green-600"/>
              <Star className="h-5 w-5 text-green-600 fill-green-600"/>
              <Star className="h-5 w-5 text-green-600 fill-green-600"/>
              <Star className="h-5 w-5 text-green-600 fill-green-600"/>
              <Star className="h-5 w-5 text-green-600 fill-green-600"/>
            </div>
            <div className="text-lg leading-8">
              <p>
                &quot;I usually keep my phone together with my keys in my pocket and that led to some pretty heavy scratchmarks on all of my last phone cases. This one, besides a barely noticeable scratch on the corner,{' '}
                  <span className='p-0.5 bg-slate-800 text-white'>
                    looks brand new after about half a year
                  </span>
                  . I dig it.&quot;
              </p>
            </div>
            <div className="flex gap-4 mt-2">
              <Image className="rounded-full h-12 w-12 object-cover" src="/users/user-2.png" width={100} height={100} alt="user 1" />
              <div className="felx flex-col">
                <p className="font-semibold">
                  Alice
                </p>
                <div className="flex gap-1.5 items-center text-zinc-600"> 
                  <Check className="h-4 w-4 stroke-[3px] text-green-600"  />
                  <p className='text-sm'>Verified Purchase</p>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
        <div className='pt-16 mt-5pb-16'>
          <Reviews />
        </div>
      </section>
      <section>
        <MaxWidthWrapper className="py-24 mt-24">
          <div className="mb-12 px-6 lg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center">
              <h2 className="order-1 tracking-tight text-center text-balance !leading-tight font-bold text-4xl md:6xl text-gray-900">Upload your photo and get {' '} <span className="relative px-2 bg-green-600 text-white">your own case </span>now
              </h2>
            </div>
          </div>
          <div className='mx-auto max-w-6xl px-6 lg:px-8'>
            <div className='relative flex flex-col items-center md:grid grid-cols-2 gap-40'>
              <Image
                src='/arrow.png'
                alt='Arrow'
                className='absolute top-[25rem] md:top-1/2 -translate-y-1/2 z-10 left-1/2 -translate-x-1/2 rotate-90 md:rotate-0'
                // No layout or objectFit needed for arrow (adjust if needed)
                width={100}
                height={100}
              />

              <div className='relative h-80 md:h-full w-full md:justify-self-end max-w-sm rounded-xl bg-gray-900/5 ring-inset ring-gray-900/10 lg:rounded-2xl'>
                <Image
                  src='/horse.jpg'
                  alt='Horse'
                  className='rounded-md object-cover bg-white shadow-2xl ring-1 ring-gray-900/10 h-full w-full'
                  fill
                />
              </div>

              <Phone className='w-60' imgSrc='/horse_phone.jpg' />
            </div>
          </div>
          <ul className='mx-auto mt-12 max-w-prose sm:text-lg space-y-2 w-fit'>
            <li className='w-fit'>
              <Check className='h-5 w-5 text-green-600 inline mr-1.5' />
              High-quality silicone material
            </li>
            <li className='w-fit'>
              <Check className='h-5 w-5 text-green-600 inline mr-1.5' />
              Scratch- and fingerprint resistant coating
            </li>
            <li className='w-fit'>
              <Check className='h-5 w-5 text-green-600 inline mr-1.5' />
              Wireless charging compatible
            </li>
            <li className='w-fit'>
              <Check className='h-5 w-5 text-green-600 inline mr-1.5' />5 year
              print warranty
            </li>

            <div className='flex justify-center'>
              <Link
                className={buttonVariants({
                  size: 'lg',
                  className: 'mx-auto mt-8 text-xl',
                })}
                href='/configure/upload'>
                Create your case now <ArrowRight className='h-4 w-4 ml-1.5' />
              </Link>
            </div>
          </ul>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
