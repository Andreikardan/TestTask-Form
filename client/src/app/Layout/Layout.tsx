import styles from './Layout.module.css';
import { Outlet } from 'react-router-dom';
import { Footer } from '@/widgets/Footer';

function Layout(): JSX.Element {
  return (
    <>
      <main className={styles.root}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
