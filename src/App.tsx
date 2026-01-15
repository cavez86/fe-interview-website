import Filters from './components/Filters';
import MainTitle from './components/MainTitle';
import SearchBar from './components/SearchBar';
import UsersGrid from './components/UsersGrid';

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
        <UsersGrid />
      </section>
    </main>
  );
};

export default App;
