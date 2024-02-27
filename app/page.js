import Image from 'next/image'
import Search from './components/SearchBar/Search'
import Feed from './components/Feed/Feed'
import Categories from './components/Categories/Categories'
import Layout from './components/Layout'
import MoreBlog from './components/MoreBlogs/MoreBlog'


export default function Home() {
  return (
    <Layout>
      <main className="flex items-start justify-center gap-10">
        <div className="left flex flex-col items-start justify-center px-7 py-24 sm:pl-20 gap-5">
          <Feed />
        </div>
        <div className="right flex flex-col px-16 py-10">
          <Search />
          <MoreBlog />
        </div>
    </main>
    </Layout>
  )
}
