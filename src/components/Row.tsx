import React from 'react';

interface RowProps {
	index: number;
	row: { amount: string; groupName: string };
	updateRow: (index: number, field: string, value: string) => void;
	removeRow: (index: number) => void;
	disabled: boolean;
}

const Row: React.FC<RowProps> = ({
	index,
	row,
	updateRow,
	removeRow,
	disabled,
}) => {
	return (
		<div className="flex space-x-2">
			<input
				type="text"
				value={row.amount}
				onChange={e => updateRow(index, 'amount', e.target.value)}
				disabled={disabled}
				className="border p-2"
				placeholder="Сума"
			/>
			<input
				type="text"
				value={row.groupName}
				onChange={e => updateRow(index, 'groupName', e.target.value)}
				disabled={disabled}
				className="border p-2"
				placeholder="Име на групата"
			/>
			<button
				type="button"
				onClick={() => removeRow(index)}
				disabled={disabled}
				className="bg-red-500 text-white p-2"
			>
				Х
			</button>
		</div>
	);
};

export default Row;
