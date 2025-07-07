import { client } from '../../../../lib/sanity';
import { postBySlugQuery } from '@/sanity/lib/sanity.queries';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import { urlFor } from '../../../../lib/sanity';
import NavBar from '@/app/components/NavigationAndFooter/NavigationBar';
import Footer from '@/app/components/NavigationAndFooter/Footer';


// Define the type for your page's props
interface Props {
  params: Promise<{ slug: string }>;

}

export default async function PostPage({ params }: Props) {
  const post = await client.fetch(postBySlugQuery, { slug: (await params).slug });

  if (!post) return <div>Post not found</div>;


 return (
   <div>
     <div className='xl:container xl:mx-auto px-4 sm:px-6 md:px-8 lg:px-10'>
       <NavBar />
     </div>


     <article className="container mx-auto px-4 sm:px-6 py-6 md:py-8 lg:py-12 max-w-3xl mb-8 md:mb-12">
       <header className="mb-6 md:mb-8">
         {/* Categories */}
         {post.categories?.length > 0 && (
           <div className="flex flex-wrap gap-2 mb-3 md:mb-4">
             {post.categories.map((cat: any) => (
               <span
                 key={cat._id || cat.title}
                 className="text-sm md:text-base rounded-full font-medium"
               >
                 {cat.title}
               </span>
             ))}
           </div>
         )}


         {/* Title - responsive font size */}
         <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-3 md:mb-4">
           {post.title}
         </h1>

         {/* Author and date - responsive layout */}
         <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-sm md:text-base font-medium mb-4 md:mb-6 text-gray-600">
           <span>Oleh {post.author.name}</span>
           <span className="hidden sm:inline">•</span>
           <span>
             {new Date(post.publishedAt).toLocaleDateString('id-ID', {
               weekday: 'long',
               year: 'numeric',
               month: 'long',
               day: 'numeric'
             })}
           </span>
         </div>


         {/* Main image - responsive sizing */}
         {post.mainImage && (
           <div className="relative w-full aspect-video rounded-lg overflow-hidden">
             <Image
               src={urlFor(post.mainImage).width(1200).height(630).url()}
               alt={post.mainImage.alt || post.title}
               fill
               className="object-cover"
               sizes="(max-width: 767px) 100vw, (max-width: 1023px) 90vw, 800px"
               priority
             />
           </div>
         )}
       </header>


       {/* Content - responsive typography */}
       <div className="prose prose-sm sm:prose-base max-w-none font-medium text-gray-800 leading-relaxed break-words">
         <PortableText value={post.body} />
       </div>
     </article>


     <Footer />
   </div>
 );
}


export async function generateStaticParams() {
 const posts = await client.fetch(`*[_type == "post"] { "slug": slug.current }`);
 return posts.map((post: any) => ({ slug: post.slug }));
}
