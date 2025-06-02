import { useEffect, useState } from 'react';
import { Record, TransactionType, TYPE_CREDIT, TYPE_DEBIT } from '../../interfaces/Record';
import { getById, save, update } from '../../services/RecordServices';
import DatePicker from "react-datepicker";
import { parse, format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";


type RecordFormProps = {
    recordId: number;
    isEditing?: boolean;
    isClose: boolean;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    onSubmit: Function;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    onCancel: Function;
}

const RecordForm = (recordFormProps: RecordFormProps) => {
    const [id, setId] = useState<number | undefined>(undefined);
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState<number>(0);
    const [type, setType] = useState<number>(0);

    const handleSubmit = async () => {
        const record: Record = {
            id: id,
            date: date,
            description: description,
            amount: amount,
            type: type,
        };

        if (!record.id) {
            await save(record).then(() => recordFormProps.onSubmit());
        } else {
            await update(record).then(() => recordFormProps.onSubmit());
        }
    };

    useEffect(() => {
        const loadRecord = async () => {
            const record = await getById(recordFormProps.recordId);
            if (record.id != null) {
                setId(record.id);
                setDate(record.date ?? '');
                setDescription(record.description ?? '');
                setAmount(record.amount ?? 0);
                setType(record.type ?? TransactionType.CREDIT);
            }
        }

        if (recordFormProps.isEditing) {
            loadRecord();
        } else if (!recordFormProps.isEditing || recordFormProps.isClose) {
            setId(undefined);
            setDate('');
            setDescription('');
            setAmount(0);
            setType(TransactionType.CREDIT);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [recordFormProps.isClose]);

    return (
        <div className="w-full">
            <form className="p-6 rounded-xl bg-base-100 shadow-md space-y-4">
                <h2 className="text-2xl font-bold mb-4 text-center">
                    {recordFormProps.isEditing ? 'Edit Record' : 'New Accounting Record'}
                </h2>

                {/* Hidden ID */}
                <input type="hidden" id="id" defaultValue={id ?? ''} />

                {/* Date */}
                <div>
                    <label htmlFor="date" className="label">
                        <span className="label-text font-medium">Date (DD/MM/YYYY)</span>
                    </label>
                    <DatePicker
                        id="date"
                        selected={date ? parse(date, "dd/MM/yyyy", new Date()) : null}
                        onChange={(date: Date | null) =>
                            setDate(date ? format(date, "dd/MM/yyyy") : "")
                        }
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Select a date"
                        className="input input-bordered w-full"
                    />
                </div>

                {/* Description */}
                <div>
                    <label htmlFor="description" className="label">
                        <span className="label-text font-medium">Description</span>
                    </label>
                    <input
                        type="text"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                {/* Amount */}
                <div>
                    <label htmlFor="amount" className="label">
                        <span className="label-text font-medium">Amount</span>
                    </label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                {/* Type */}
                <div>
                    <label htmlFor="type" className="label">
                        <span className="label-text font-medium">Transaction Type</span>
                    </label>
                    <select
                        id="type"
                        value={type}
                        onChange={(e) => setType(Number(e.target.value) as TransactionType)}
                        className="select select-bordered w-full"
                        required
                    >
                        <option value={TransactionType.CREDIT}>{TYPE_CREDIT.desc}</option>
                        <option value={TransactionType.DEBIT}>{TYPE_DEBIT.desc}</option>
                    </select>
                </div>

                {/* Buttons */}
                <div className="flex justify-center gap-4 mt-6">
                    {recordFormProps.isEditing ? (
                        <>
                            <button onClick={() => recordFormProps.onCancel()} type="button" className="btn btn-ghost">
                                Cancel
                            </button>
                            <button onClick={handleSubmit} type="button" className="btn btn-success">
                                Update
                            </button>
                        </>
                    ) : (
                        <button onClick={handleSubmit} type="button" className="btn btn-neutral w-1/2">
                            Register
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default RecordForm;
