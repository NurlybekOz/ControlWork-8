import './App.css'
import NavBar from "./components/NavBar/NavBar.tsx";
import {Route, Routes} from "react-router-dom";
import Home from "./containers/Home/Home.tsx";
import EditQuote from "./containers/EditQuote/EditQuote.tsx";
import NewQuote from "./containers/NewQuote/NewQuote.tsx";

const App = () => {


  return (
      <>
    <header>
     <NavBar/>
    </header>
      <main>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/quotes' element={<Home/>}></Route>
          <Route path='/quotes/:category' element={<Home/>}></Route>
          <Route path='/quotes/new-quote' element={<NewQuote/>}></Route>
          <Route path='/quotes/:idQuote/edit' element={<EditQuote/>}></Route>
          <Route path='*' element={(<h1>Page not found</h1>)}></Route>
        </Routes>
      </main>
      </>
  )
};

export default App
