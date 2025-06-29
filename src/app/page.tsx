// app/posts/page.tsx
import { client } from '../../lib/sanity'
import { postsQuery } from '../sanity/lib/sanity.queries'
import ArticleCards from './components/Home/ArticleCards'
import Landing from './components/Home/Landing'
import Tentang from './components/Home/Tentang'
import Footer from './components/NavigationAndFooter/Footer'
import NavBar from './components/NavigationAndFooter/NavigationBar'

export default async function PostsPage() {
  const posts = await client.fetch(postsQuery)

  return (
    <div>
      <div className='xl:container xl:mx-auto mx-6 md:mx-16 lg:mx-20'>
        <NavBar />

        <div className='space-y-40'>
          <div className='mt-28'>
            <Landing />
          </div>

          <Tentang />

          <ArticleCards />

        </div>
      </div>
      <div className='mt-40'>
        <Footer />
      </div>
    </div>
  )
}