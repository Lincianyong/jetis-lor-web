import { defineField, defineType } from 'sanity'
import { TagIcon } from '@sanity/icons'

export const umkmType = defineType({
  name: 'umkm',
  title: 'UMKM',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      validation: Rule => Rule.required().max(160)
    }),
    defineField({
      name: 'longDescription',
      title: 'Long Description',
      type: 'array',
      of: [{ type: 'block' }]
    }),
    defineField({
      name: 'products',
      title: 'Products',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' }
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'locationUrl',
      title: 'Location URL',
      type: 'url'
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{ type: 'category' }]
      }],
      validation: Rule => Rule.required()
    })
  ],
  preview: {
    select: {
      title: 'title',
      media: 'thumbnail'
    }
  }
})