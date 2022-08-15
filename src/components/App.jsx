import Header from './Header/Header';
import s from './App.module.css';
import { Route, Routes } from 'react-router';
import AddLocationPage from './AddLocationPage/AddLocationPage';
import HomePage from './Views/HomePage';
import DetailsInfoPage from './Views/DetailsInfoPage/DetailsInfoPage';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  return (
    <>
      <div className={s.container}>
        <Header />

        <Routes>
          <Route axact path="/" element={<HomePage />} />
          <Route axact path=":id" element={<DetailsInfoPage />} />

          <Route axact path="/add" element={<AddLocationPage />} />
        </Routes>
      </div>
    </>
  );
};
