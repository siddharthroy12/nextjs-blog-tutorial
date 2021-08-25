import fs from 'fs'
import matter from 'gray-matter'
import Link from 'next/link'

import styles from '../styles/Home.module.css'

export default function Home({ blogs }) {
  return (<div className={styles['container']}>
    <h1 className={styles['header']}>Welcome to my blog</h1>
    <p className={styles['subtitle']}>This is a subtitle idk what to type here</p>
    <ul className={styles['blog-list']}>
      {blogs.map(blog => (
        <li key={blog.slug}>
          <Link href={`/blog/${blog.slug}`}>
            <a>{blog.date}: {blog.title}</a>
          </Link>
        </li>
      ))}
    </ul>
  </div>)
}

export async function getStaticProps() {
  // List of files in blgos folder
  const filesInBlogs = fs.readdirSync('./content/blogs')

  // Get the front matter and slug (the filename without .md) of all files
  const blogs = filesInBlogs.map(filename => {
    const file = fs.readFileSync(`./content/blogs/${filename}`, 'utf8')
		const matterData = matter(file)
		
    return {
			...matterData.data, // matterData.data contains front matter
			slug: filename.slice(0, filename.indexOf('.'))
		}
	})

  return {
    props: {
      blogs
    }
  }

}