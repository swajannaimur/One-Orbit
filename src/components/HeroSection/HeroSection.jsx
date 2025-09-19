import React from 'react'

export default function HeroSection() {
  return (
    <section className='mt-10'>
      <div>
        <div
          className="flex min-h-[480px] md:min-h-[625px] flex-col gap-6 sm:gap-8 sm:rounded-lg items-start justify-end px-4 pb-10 sm:px-10 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCKdvA4rXGKMer5LZmt8EO4FOpfKM5urrkxrcUb1q5O-HrJZX2aUN2pB3MjrXDxDgzbMohFid1hkRnJbHFLkBzNPWfSfpHi-pXHh5hrQZ8cs7D7aKMTDnVV60BcY7WvFo_hUpBWB9oln296o2E45MCo1jYbc030q6VCXHPBY8qn4CuNabZDoEoMHFTzkGi7VNorPLm8L8ZHXFLlI2fs0yeB_vjRNFLDjPIzIoaYIkfDjyzyVyj7eYOzvubaFHam7rRK7gfR3N--9w")',
          }}
        >
          <div className="flex flex-col gap-2 max-w-2xl">
            <h1 className="text-white text-4xl font-black leading-tight tracking-tight sm:text-5xl">
              Streamline Your Workflow with OneOrbit
            </h1>
            <h2 className="text-white text-sm font-normal leading-normal sm:text-base">
              OneOrbit is the all-in-one platform for project management and
              team collaboration. Boost productivity, enhance communication, and
              achieve your goals faster.
            </h2>
          </div>

          <div className="flex flex-wrap gap-3 mt-4">
            <button className="btn btn-primary h-10 sm:h-12 px-4 sm:px-5">
              Get Started
            </button>
            <button className="btn h-10 sm:h-12 px-4 sm:px-5 bg-secondary">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
