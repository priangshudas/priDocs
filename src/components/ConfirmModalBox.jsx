import { createPortal } from "react-dom";
const ConfirmModalBox = ({ open, title, message, onConfirm, onCancel }) => {
  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-md">
      <div className="bg-white/10 text-white backdrop-blur-xl rounded-xl border border-white/20 shadow-2xl p-6 w-full max-w-sm mx-4">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-sm text-white/80 mb-4">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ConfirmModalBox;
