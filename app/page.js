
import Feed from './components/Feed/Feed'
import Layout from './components/Layout'
import MoreBlog from './components/MoreBlogs/MoreBlog'
import CreateBtn from './components/CreateBtn/CreateBtn'


export default function Home() {
  return (
    <Layout>
      <main className="flex items-center justify-center w-full px-7 lg:px-32">
        <Feed />
    </main>
    </Layout>
  )
}
