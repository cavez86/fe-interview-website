import MainTitle from './components/MainTitle';
import SearchBar from './components/SearchBar';

const App = () => {
  return (
    <main className='main-content'>
      <section className='header-section'>
        <MainTitle />
        <SearchBar />
      </section>
      <section>Hello, World!</section>
    </main>
  );
};

export default App;
