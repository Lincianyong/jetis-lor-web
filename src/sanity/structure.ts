import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Blog Section
      S.listItem()
        .title('Blog')
        .child(
          S.list()
            .title('Blog Content')
            .items([
              S.documentTypeListItem('post').title('Posts'),
              S.documentTypeListItem('category').title('Categories'),
              S.documentTypeListItem('author').title('Authors'),
            ])
        ),
      
      // UMKM Section
      S.listItem()
        .title('UMKM')
        .child(
          S.documentList()
            .title('UMKM Entries')
            .filter('_type == "umkm"')
            .defaultOrdering([{ field: 'title', direction: 'asc' }])
        ),
      
      // Other Content Types (automatically listed)
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['post', 'category', 'author', 'umkm'].includes(item.getId()!)
      ),
    ])