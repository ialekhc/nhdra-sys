import { Modal } from './Modal';
import { Button } from './Button';

export const ConfirmDialog = ({ open, title, message, onConfirm, onCancel }) => (
  <Modal open={open} title={title} onClose={onCancel}>
    <p className="mb-4 text-sm text-slate-600">{message}</p>
    <div className="flex gap-2">
      <Button variant="danger" onClick={onConfirm}>
        Confirm
      </Button>
      <Button variant="secondary" onClick={onCancel}>
        Cancel
      </Button>
    </div>
  </Modal>
);
