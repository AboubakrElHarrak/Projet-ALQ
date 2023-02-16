import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from './header/header';
import { Grid } from './Grid/Grid';


function App() {
  const grid = [];
  for (let i = 0; i < 20; i++) {
    grid[i] = [];
    for (let j = 0; j < 20; j++) {
      grid[i][j] = 0;
    }
  }

  const agents = [  { type: 'rock', x: 1, y: 1 },  { type: 'paper', x: 10, y: 10 },  { type: 'scissors', x: 18, y: 18 },];

  grid[1][1] = 1;
  grid[10][10] = 2;
  grid[18][18] = 3;

  return (
    <BrowserRouter>
      <Header />
      <main className="w-75 mx-auto p-5" style={{ display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
        <Grid grid={grid} agents={agents} />
        <Routes>
          <Route>
            {/* <Route path="/food" element={<Food foodCategories={foodCategories}/>} /> */}
          </Route>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
