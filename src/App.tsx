import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Index from './pages/Index'; // Path to your Index component
import MCAT from './pages/MCAT';  // Define these pages
import Essays from './pages/Essays';  // Define these pages
import AMCAs from './pages/AMCAs';  // Define these pages
import RecLetters from './pages/RecLetters';  // Define these pages
import Interviews from './pages/Interviews';  // Define these pages
import Applications from './pages/Applications';  // Define these pages
import Research from './pages/Research';  // Define these pages
import Extracurriculars from './pages/Extracurriculars';  // Define these pages
import Opportunities from './pages/Opportunities';  // Define these pages
import CASPer from './pages/CASPer';  // Define these pages
import Schools from './pages/Schools';  // Define these pages
import Random from './pages/Random';  // Define these pages
import PostDetail from './pages/PostDetail';  // Post Detail Page





// Import all other pages similarly...

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/MCAT" element={<MCAT />} />
        <Route path="/Essays" element={<Essays />} />
        <Route path="/AMCAs" element={<AMCAs />} />
        <Route path="/RecLetters" element={<RecLetters />} />
        <Route path="/Interviews" element={<Interviews />} />
        <Route path="/Applications" element={<Applications />} />
        <Route path="/Research" element={<Research />} />
        <Route path="/Extracurriculars" element={<Extracurriculars />} />
        <Route path="/Opportunities" element={<Opportunities />} />
        <Route path="/CASPer" element={<CASPer />} />
        <Route path="/Schools" element={<Schools />} />
        <Route path="/Random" element={<Random />} />
        <Route path="/post/:id" element={<PostDetail />} />

      </Routes>
    </Router>
  );
}


export default App;
