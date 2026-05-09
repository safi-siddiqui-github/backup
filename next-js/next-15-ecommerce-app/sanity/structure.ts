import type { StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Store')
    .items([
      S.documentTypeListItem('author').title('Author'),
      S.documentTypeListItem('category').title('Categories'),
      S.divider(),
      ...S.documentTypeListItems()
        .filter((item) => {
          return item.getId() && !['category', 'author'].includes(item.getId()!);
        }),
    ])
