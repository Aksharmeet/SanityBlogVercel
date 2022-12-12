// index.js
import type { NextPage } from 'next'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import sanityClient, { urlFor } from "../sanity"

import { Post } from "../typings"

interface Props {
  posts: [Post]
}
const Home : NextPage = ({posts}: Props) => {
  console.log(posts)
  return (
    <div className='max-w-4xl mx-auto'>
      <Head>
        <title>The Blog.</title>
            {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <div className='grid grid-cols-1 sm:gird-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6'>
      { posts.map((post) => {
          return (
          <Link key={post._id} href={`/post/${post.slug.current}`}>
            <div className='group'>
              <img className='h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out' src={urlFor(post.mainImage).url()!} alt=''/>
              <div className='flex justify-between p-5 bg-white'>
             <div>
              <p>{post.title}</p>
              <p>{post.description}</p>
              <p>by {post.author.name}</p>
              </div>
              <div>
                <img className="h-12 w-12 rounded-full"src={urlFor(post.author.image).url()!} alt={post.author.name}></img>
              </div>
              </div>
            </div>
          </Link>
          )
        })
        }
      </div>
    </div>
    
  )
}

export default Home



export const getServerSideProps: GetServerSideProps = async() =>  {
  const query = `*[_type == "post"] {
    _id,
    title,
    slug,
    author -> {
      name,
      image
    },
      description,
      mainImage,
      slug
  }
  `
  const posts = await sanityClient.fetch(query)

  return {
    props: {
      posts
    }
  }
}