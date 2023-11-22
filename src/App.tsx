import './App.css'
import CapitalMatchGame from './component/CapitalMatchGame'


function App() {

  const data = { Türkiye: "Ankara", Fransa: "Paris", Sırbistan: "Belgrad",Macaristan:"Budapeşte" }
  return (
    <>
      <CapitalMatchGame data={data} />
    </>
  )
}

export default App
