// app/posts/page.tsx
import { client } from '../../lib/sanity'
import { postsQuery } from '../sanity/lib/sanity.queries'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import NavBar from './components/NavigationBar'

export default async function PostsPage() {
  const posts = await client.fetch(postsQuery)

  return (
    <div className='xl:container xl:mx-auto mx-6 md:mx-16 lg:mx-20 '>
      <NavBar />
      home
    </div>
  )
}