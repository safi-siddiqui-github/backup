'use client';

import { deleteCategoryAction } from '@/actions/categoryActions';
import { pathConstants } from '@/constants/pathConstants';
import { CategoryType } from '@/types/modelTypes';
import { ColumnDef } from '@tanstack/react-table';
import ActionDataComponent from '../ui/ActionDataComponent';
import { DataTable } from '../ui/DatatableComponent';

type CategoryTableComponentType = {
  data?: CategoryType[];
};

export default function CategoryTableComponent(
  props: CategoryTableComponentType
) {
  const { data } = props;

  const columns: ColumnDef<CategoryType>[] = [
    {
      accessorKey: 'image.url',
      header: 'Image',
      cell: ({ getValue }) => {
        const value = getValue() as string;
        return <img src={value} alt={value} className="w-14 h-14" />;
      },
    },
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'description',
      header: 'Description',
    },
    {
      accessorKey: 'modified_at',
      header: 'Modified',
    },
    {
      id: 'actions',
      header: 'Actions',
      accessorKey: 'id',

      cell: ({ getValue }) => {
        const id = getValue() as string;

        return (
          <ActionDataComponent
            id={id}
            work="delete"
            variant="destructive"
            action={deleteCategoryAction}
            redirect={pathConstants.categories.read}
          />
        );
      },
    },
  ];

  return <DataTable columns={columns} data={data ?? []} />;
}
