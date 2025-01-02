import Table from "../../components/Table";
import Tag from "../../components/Tag";
import Modal from "../../components/Modal";
import FeeAndFundForm from "./FeeAndFundForm";
import { formatFeeType } from "../../utils/helpers";

interface FeeOrFund {
  id: string;
  name: string;
  description: string;
  unitPrice: number;
  feeTypeEnum: "DepartmentFee" | "ContributionFund" | "VehicleFee";
}

export default function FeeAndFundRow({ feeOrFund }: { feeOrFund: FeeOrFund }) {
  const { id, name, description, unitPrice, feeTypeEnum } = feeOrFund;

  const statusStyled = {
    DepartmentFee: "pink",
    ContributionFund: "green",
    VehicleFee: "yellow",
  };

  return (
    <Table.Row>
      <div>{id}</div>
      <div>{name}</div>
      <div>{description}</div>
      <div>{unitPrice}</div>
      <Tag type={statusStyled[feeTypeEnum]}>{formatFeeType(feeTypeEnum)}</Tag>
      <Modal>
        <Modal.Open id="details">
          <button>Details</button>
        </Modal.Open>

        <Modal.Window id="details" name="Fee and Fund Details">
          <FeeAndFundForm feeOrFund={feeOrFund} />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}
