
function App() {
  window.navigator.geolocation.getCurrentPosition( 
    (position) => console.log(position) 
  ) 

  return (
    <div>
      Meu App
    </div>
  );
}

export default App;
