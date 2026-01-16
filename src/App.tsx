import Filters from './components/Filters';
import Grid from './components/Grid';
import MainTitle from './components/MainTitle';
import Modal from './components/Modal';
import SearchBar from './components/SearchBar';

const App = () => {
  return (
    <main className='main-content'>
      <section className='header-section'>
        <MainTitle />
        <SearchBar />
      </section>
      <section>
        <Filters />
      </section>
      <section>
        <Grid />
        <Modal />
      </section>
    </main>
  );
};

export default App;
