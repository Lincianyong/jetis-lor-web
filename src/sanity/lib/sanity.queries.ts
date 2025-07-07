export const postsQuery = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  author->{name},
  mainImage,
  publishedAt,
  categories[]->{title},
  "excerpt": pt::text(body[0..1])
}`

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  author->{name},
  mainImage,
  publishedAt,
  categories[]->{title},
  body
}`

// lib/sanity.queries.ts
export const umkmsQuery = `*[_type == "umkm"] | order(_createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  description,
  thumbnail,
  categories[]->{title},
  products[]
}`

export const umkmBySlugQuery = `*[_type == "umkm" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  description,
  longDescription,
  thumbnail,
  locationUrl,
  categories[]->{
    _id,
    title,
    "slug": slug.current
  },
  products[]
}`