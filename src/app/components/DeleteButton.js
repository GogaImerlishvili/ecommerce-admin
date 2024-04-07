import { useState } from "react";

const DeleteButton = ({ label, onDelete }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  if (showConfirm) {
    return (
      <div className="fixed bg-black/80 inset-0 flex items-center h-full justify-center">
        <div className="bg-white p-4 rounded-lg">
          <div>Are you sure you want to delete?</div>
          <div className="flex gap-2 mt-1">
            <button type="button" onClick={() => setShowConfirm(false)}>
              Cancel
            </button>
            <button type="button" onClick={onDelete} className="bg-red-600 text-white">
              Yes,&nbsp;delete!
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <button type="button" onClick={(onDelete) => setShowConfirm(true)}>
      {label}
    </button>
  );
};

export default DeleteButton;
