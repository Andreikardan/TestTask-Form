import { Modal } from 'antd';
import { Button } from '../../Button';

interface Props {
  visible: boolean;
  title: string;
  content: React.ReactNode;
  onCancel?: () => void;
  onOk?: () => void;
  footer?: React.ReactNode;
  width?: number;
  style?: React.CSSProperties;
}

export function ModalWindow({
  visible,
  title,
  content,
  onCancel,
  onOk,
  footer,
  width = 600
}: Props): JSX.Element {
  return (
    <Modal
      style={{ paddingTop: '8%' }}
      title={title}
      open={visible}
      onOk={onOk}
      onCancel={onCancel}
      footer={footer || <Button color="green" text="OK" onClick={onOk} />}
      width={width}>
      {content}
    </Modal>
  );
}
