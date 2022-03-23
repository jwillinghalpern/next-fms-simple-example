import styles from './ListItem.module.css';

export default function ListItem({ children, onClick, title }) {
  function onKeyDown(e) {
    const space = ' ';
    if (e.key === 'Enter' || e.key === space) {
      onClick();
    }
  }
  return (
    <li
      tabIndex={0}
      onClick={onClick}
      onKeyDown={onKeyDown}
      className={styles.listItem}
      title={title}
    >
      {children}
    </li>
  );
}
