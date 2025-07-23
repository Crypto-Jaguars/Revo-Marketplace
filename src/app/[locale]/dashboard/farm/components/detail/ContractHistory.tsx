'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Contract } from './types';
import { useTranslations } from 'next-intl';

interface DataTableProps<T> {
  translationKey: string;
  data: T[];
  columns: {
    translationKey: string;
    cell: (item: T) => React.ReactNode;
  }[];
  className?: string;
}

function DataTable<T>({ translationKey, data, columns, className = '' }: DataTableProps<T>) {
  const t = useTranslations('farm');

  return (
    <Card className={`w-full ${className}`}>
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl md:text-2xl">{t(`${translationKey}.title`)}</CardTitle>
        <p className="text-sm text-muted-foreground">{t(`${translationKey}.subtitle`)}</p>
      </CardHeader>
      <CardContent>
        <div className="relative w-full overflow-auto">
          <div className="overflow-x-auto border rounded-lg">
            <table className="w-full min-w-[800px] caption-bottom">
              <thead>
                <tr className="border-b bg-muted/50">
                  {columns.map((column, index) => (
                    <th
                      key={index}
                      className="h-12 px-4 text-left align-middle text-sm font-medium text-muted-foreground"
                    >
                      {t(`${translationKey}.columns.${column.translationKey}`)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, rowIndex) => (
                  <tr key={rowIndex} className="border-b transition-colors hover:bg-muted/50">
                    {columns.map((column, colIndex) => (
                      <td key={colIndex} className="p-4 align-middle text-sm">
                        {column.cell(row)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface ContractHistoryProps {
  contracts: Contract[];
}

export function ContractHistory({ contracts }: ContractHistoryProps) {
  const t = useTranslations('farm.contracts');

  const columns = [
    {
      translationKey: 'client',
      cell: (contract: Contract) => contract.client,
    },
    {
      translationKey: 'startDate',
      cell: (contract: Contract) => new Date(contract.startDate).toLocaleDateString(),
    },
    {
      translationKey: 'endDate',
      cell: (contract: Contract) => new Date(contract.endDate).toLocaleDateString(),
    },
    {
      translationKey: 'status',
      cell: (contract: Contract) => (
        <span
          className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
            contract.status === 'active'
              ? 'bg-green-100 text-green-800'
              : 'bg-blue-100 text-blue-800'
          }`}
        >
          {t(`status.${contract.status}`)}
        </span>
      ),
    },
    {
      translationKey: 'value',
      cell: (contract: Contract) => `$${contract.value.toLocaleString()}`,
    },
    {
      translationKey: 'completion',
      cell: (contract: Contract) => `${contract.completionRate}%`,
    },
    {
      translationKey: 'satisfaction',
      cell: (contract: Contract) => `${contract.satisfaction}/5`,
    },
  ];

  return <DataTable translationKey="contracts" data={contracts} columns={columns} />;
}
