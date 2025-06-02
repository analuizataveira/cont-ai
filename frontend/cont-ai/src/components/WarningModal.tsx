interface WarningModalProps {
    onDenyClick: Function;
    onAcceptClick: Function;
    children: React.ReactNode;
    acceptBtnType?: string | "btn-active" | "btn-warning" | "btn-error"
    isClose: boolean;
}

export default function WarningModal(props: WarningModalProps) {

    return (
        <dialog id="my_modal_1" className={`modal ${props.isClose ? "" : "modal-open"} absolute w-full`}>
            <div className="modal-box w-fit">
                <div className="flex">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span>{props.children}</span>
                </div>
                <div className="flex justify-center mt-2">
                    <button onClick={() => props.onDenyClick()} className="btn btn-neutral mr-2">Cancelar</button>
                    <button onClick={() => props.onAcceptClick()} className={`btn ${props.acceptBtnType}`}>Sim</button>
                </div>
            </div>
        </dialog>
    )

}