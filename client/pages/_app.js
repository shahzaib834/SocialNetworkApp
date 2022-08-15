import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import Header from '../components/Header';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
