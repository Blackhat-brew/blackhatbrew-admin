// import { Brand } from "@/types/brand";
// import Image from "next/image";
// import brandsData from "./brandsData";

// const Brands = () => {
//   return (
//     <section className="pt-16">
//       <div className="container">
//         <div className="-mx-4 flex flex-wrap">
//           <div className="w-full px-4">
//             <div className="flex flex-wrap items-center justify-center rounded-sm bg-gray-light px-8 py-8 dark:bg-gray-dark sm:px-10 md:px-[50px] md:py-[40px] xl:p-[50px] 2xl:px-[70px] 2xl:py-[60px]">
//               {brandsData.map((brand) => (
//                 <SingleBrand key={brand.id} brand={brand} />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Brands;

// const SingleBrand = ({ brand }: { brand: Brand }) => {
//   const { href, image, imageLight, name } = brand;

//   return (
//     <div className="flex w-1/2 items-center justify-center px-3 py-[15px] sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6">
//       <a
//         href={href}
//         target="_blank"
//         rel="nofollow noreferrer"
//         className="relative h-10 w-full opacity-70 transition hover:opacity-100 dark:opacity-60 dark:hover:opacity-100"
//       >
//         <Image src={imageLight} alt={name} fill className="hidden dark:block" />
//         <Image src={image} alt={name} fill className="block dark:hidden" />
//       </a>
//     </div>
//   );
// };



import Image from "next/image";
import SectionTitle from "../Common/SectionTitle";

export default function CertificateSection() {
  const certificates = [
    {
      src: "/images/certificate/c4.webp",
      alt: "Certificate 4",
    },
 
    {
      src: "/images/certificate/c2.webp",
      alt: "Certificate 2",
    },
    {
      src: "/images/certificate/c3.webp",
      alt: "Certificate 3",
    },
    {
      src: "/images/certificate/c1.webp",
      alt: "Certificate 1",
    },
  
  ];

  return (
    <section className="bg-gray-50 py-12" id="certificates">
      <div className="container mx-auto px-6 md:px-12">
        {/* <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          We take pride in our expertise and commitment to excellence, certified by these trusted organizations.
        </p> */}
            <SectionTitle
            title="Our Certifications"
            paragraph="We take pride in our expertise and commitment to excellence, certified by these trusted organizations."
            center
          />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {certificates.map((certificate, index) => (
            <div
              key={index}
              className="relative overflow-hidden  bg-transparent hover:scale-105 transition-transform duration-300"
            >
              <Image
                src={certificate.src}
                alt={certificate.alt}
                layout="responsive"
                width={500}
                height={700}
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
