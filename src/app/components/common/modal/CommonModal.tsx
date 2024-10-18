"use client";

import { useModal } from "@/app/context/modal.context";
import { useRouter } from "next/navigation";
import BackDrop from "./BackDrop";

interface CommonModalProps {
  title: string;
  content: React.ReactNode | null;
  children: React.ReactNode | null;
  path?: string;
  type?: "normal" | "confirm" | "non-click";
  size?: "small" | "medium" | "large"; // 모달 크기 옵션 추가
  onClose?: () => void;
}

const CommonModal = ({
  title,
  content,
  children,
  path,
  type = "normal",
  size = "medium",
  onClose,
}: CommonModalProps) => {
  const modal = useModal();
  const router = useRouter();

  const handleConfirmClick = () => {
    if (type === "confirm") {
      modal.confirmClose();
    } else {
      if (path) {
        router.push(`${path}`);
      }
      modal.close();
    }
    if (onClose) {
      onClose();
    }
  };

  const modalSizeClasses = {
    small: "max-w-xs w-full",
    medium: "max-w-md w-full",
    large: "max-w-lg w-full",
  };

  return (
    <BackDrop>
      <section
        className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center p-8 gap-4 rounded-lg bg-white z-[9999] ${modalSizeClasses[size]}`}
      >
        <h2 className="text-2xl font-semibold mb-2 text-center">{title}</h2>

        {content && <div className="modal-content">{content}</div>}

        {children && <div className="modal-children">{children}</div>}
        {type === "normal" && (
          <button
            className="px-4 py-1 bg-primary-400 text-white font-semibold border border-grey-200 rounded hover:opacity-85 active:opacity-75"
            onClick={handleConfirmClick}
          >
            확인
          </button>
        )}
      </section>
    </BackDrop>
  );
};

export default CommonModal;
