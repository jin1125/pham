import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Image from 'next/image'

export default function ApplyModal({ isOpen, setIsOpen }) {
  // let [isOpen, setIsOpen] = useState(true)

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-center align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-2xl font-bold leading-6 text-blue-400"
                >
                  応募完了
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    求人への応募が完了しました。
                  </p>
                  <Image
                    src="/apply_img.png"
                    alt="apply_img"
                    width={250}
                    height={250}
                  />
                  <p className="text-sm text-gray-500">
                    採用担当者より今後の流れについてメッセージが届きますので、今しばらくお待ち下さいませ。
                  </p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-400 border border-transparent rounded-md hover:bg-blue-300 focus:outline-none"
                    onClick={closeModal}
                  >
                    戻る
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}