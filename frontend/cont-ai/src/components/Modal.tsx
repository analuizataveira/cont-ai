interface ModalProps {
  width?: string;
  onCloseClick: () => void;
  isOpen?: boolean;
  children: React.ReactNode;
  modalId: string
}

export default function Modal(modalProps: ModalProps) {
  return (
    <dialog id={modalProps.modalId} className={`modal ${modalProps.isOpen ? 'modal-open' : ''}`}>
      <div
        className={`
          modal-box 
          w-full 
          max-w-[90vw] 
          md:max-w-2xl 
          max-h-[90vh] 
          overflow-y-auto 
          pt-10
          ${modalProps.width || ''}
        `}
      >
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={modalProps.onCloseClick}
        >
          ✕
        </button>
        {modalProps.children}
      </div>
    </dialog>
  );
}
