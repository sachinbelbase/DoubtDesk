import Modal from "./Modal";
import Button from "./Button";

function ConfirmModal({
     isOpen,
     onClose,
     onConfirm,
     title,
     message,
     confirmText = "Confirm",
     cancelText = "Cancel",
     loading = false,
}) {

     return (
          <Modal
               isOpen={isOpen}
               onClose={onClose}
               title={title}
          >

               <div className="space-y-6">

                    <p className="text-gray-600">
                         {message}
                    </p>

                    <div className="flex justify-end gap-3">

                         <Button
                              variant="secondary"
                              onClick={onClose}
                              disabled={loading}
                         >
                              {cancelText}
                         </Button>

                         <Button
                              onClick={onConfirm}
                              disabled={loading}
                         >
                              {loading ? "Please wait..." : confirmText}
                         </Button>

                    </div>

               </div>

          </Modal>
     );
}

export default ConfirmModal;