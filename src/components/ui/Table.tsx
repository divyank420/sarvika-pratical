// components/Table.tsx
import React from 'react';
import { Button } from './Button';

export interface Column<T> {
    key: keyof T;
    label: string;
}

interface TableProps<T> {
    columns: Column<T>[];
    data: T[];
    currentPage: number;
    pageSize: number;
    totalItems: number;
    onPageChange: (page: number) => void;
    renderActions?: (row: T) => React.ReactNode;
}

function Table<T extends { id: number | string }>({
    columns,
    data,
    currentPage,
    pageSize,
    totalItems,
    onPageChange,
    renderActions,
}: TableProps<T>) {
    const totalPages = Math.ceil(totalItems / pageSize);
    const baseIndex = (currentPage == 1 ? 0 : (currentPage - 1) * pageSize);
    return (
        <div className="flex flex-col h-full">
            <table className="min-w-full table-fixed border-collapse">
                <thead className="sticky top-0 z-10 shadow-sm">
                    <tr className='text-white rounded-t-lg'>
                        {columns.map((col) => (
                            <th key={String(col.key)} className={'bg-blue-900'}>
                                {col.label}
                            </th>
                        ))}
                        {renderActions && <th className={'bg-blue-900'}>Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.slice(baseIndex, currentPage * pageSize).map((row) => (
                            <tr key={String(row.id)}>
                                {columns.map((col) => (
                                    <td key={String(col.key)} style={cellStyle}>
                                        {String(row[col.key])}
                                    </td>
                                ))}
                                {renderActions && <td style={cellStyle}>{renderActions(row)}</td>}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length + 1} style={{ textAlign: 'center', padding: 10 }}>
                                No data found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="sticky bottom-0 bg-white border-t p-2 flex justify-between items-center">
                <Button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >Previous</Button>
                {[...Array(totalPages)].map((_, idx) => {
                    const page = idx + 1;
                    return (
                        page != currentPage ? (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className='bg-gray-200 p-2 py-0 rounded text-gray-900 border border-gray-200'
                            style={{
                                fontWeight: currentPage === page ? 'bold' : 'normal',
                            }}
                        >
                            {page}
                        </button>
                    ) : <span key={page} className='bg-blue-900 p-2 py-0 rounded text-white'>{page}</span>
                    )
                })}
                <Button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                >Next</Button>
            </div>
        </div>
    );
}


const cellStyle: React.CSSProperties = {
    padding: '10px',
    borderBottom: '1px solid #eee',
};

export default Table;