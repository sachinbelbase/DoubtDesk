import { X } from "lucide-react";

function Modal({ isOpen, onClose, title, children }) {
     if (!isOpen) return null;

     return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

               <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-4">

                    {/* Header */}
                    <div className="flex items-center justify-between border-b px-6 py-4">

                         <h2 className="text-xl font-semibold">
                              {title}
                         </h2>

                         <button
                              onClick={onClose}
                              className="p-2 rounded-lg hover:bg-gray-100"
                         >
                              <X size={20} />
                         </button>

                    </div>

                    {/* Body */}
                    <div className="p-6 max-h-[70vh] overflow-y-auto">
                         {children}
                    </div>

               </div>

          </div>
     );
}

export default Modal;