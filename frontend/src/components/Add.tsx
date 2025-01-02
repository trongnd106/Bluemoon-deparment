import Button from "./Button";
import Modal from "./Modal";
import { HiOutlinePlusCircle } from "react-icons/hi2";
import { ReactNode } from "react";

interface AddProps {
  children: ReactNode;
  title: string;
}

export default function Add({ children, title }: AddProps) {
  return (
    <Modal>
      <Modal.Open id="add">
        <Button size="small" variation="primary">
          Add
          <span>
            <HiOutlinePlusCircle />
          </span>
        </Button>
      </Modal.Open>

      <Modal.Window id="add" name={title}>
        {children}
      </Modal.Window>
    </Modal>
  );
}
