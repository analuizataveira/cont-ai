/* eslint-disable @typescript-eslint/no-unused-vars */
// Componente para exibir as informações do servidor 
import { useEffect, useState } from 'react';
import { Record } from '../../interfaces/Record';
import { IoTrashBinSharp } from 'react-icons/io5';
import { getById } from '../../services/RecordServices';

interface RecordInfoProps {
    recordId: number;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    onEditClick: Function;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    onDeleteClick: Function;
    isOpen?: boolean;
}

export default function RecordInfo(recordInfoProps: RecordInfoProps) {

    const [recordInfo, setRecordInfo] = useState<Record>({} as Record)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const loadRecord = async () => {
            setLoading(true)
            const record = await getById(recordInfoProps.recordId);
            setRecordInfo(record)
        }
        if (recordInfoProps.isOpen) {
            loadRecord()
        }
    }, [recordInfoProps.isOpen])

    useEffect(() => {
        setLoading(false)
    }, [recordInfo])

    return (
        <div className='w-full'>
            <div className='w-full h-[180px]'>
                {loading ? (
                    <div className='flex justify-center h-full'>
                        <span className="loading loading-lg loading-ring"></span>
                    </div>
                ) : (
                    <>
                        <p><strong>ID:</strong> {recordInfo.id}</p>
                        <p><strong>Date:</strong> {recordInfo.date}</p>
                        <p><strong>Date:</strong> {recordInfo.description}</p>
                        <p><strong>Amout:</strong> {recordInfo.amount}</p>
                        <p><strong>Type:</strong> {recordInfo.type}</p>
                        <div className="flex justify-end mt-4">
                            <button className="btn btn-active mr-2  hover:outline hover:outline-neutral-500 hover:outline-1" onClick={() => recordInfoProps.onEditClick(recordInfo)}>
                                Editar
                            </button>
                            <button data-tip="Excluir" className="btn btn-error mr-2 px-3 tooltip-top tooltip  hover:outline hover:outline-neutral-500 hover:outline-1" onClick={() => recordInfoProps.onDeleteClick()}>
                                <IoTrashBinSharp size={20}></IoTrashBinSharp>
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

