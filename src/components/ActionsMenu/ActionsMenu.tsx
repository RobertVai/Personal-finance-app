import styles from "./ActionsMenu.module.css";

type ActionsMenuProps = {
  editLabel: string;
  deleteLabel: string;
  onEdit: () => void;
  onDelete: () => void;
};

const ActionsMenu = ({
  editLabel,
  deleteLabel,
  onEdit,
  onDelete,
}: ActionsMenuProps) => {
  return (
    <div className={styles.menu}>
      <button type="button" onClick={onEdit} className={styles.editButton}>
        {editLabel}
      </button>

      <button type="button" onClick={onDelete} className={styles.deleteButton}>
        {deleteLabel}
      </button>
    </div>
  );
};

export default ActionsMenu;
