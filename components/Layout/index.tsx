import styles from './styles.module.css';

interface Props {
  children: React.ReactNode,
}

const Layout: React.FC<Props> = ({ children }) => (
  <div className={styles.container}>
    {children}
  </div>
);

export default Layout;
