import LabeledInput from "./component/LabeledInput";

function App() {
  const urlPattern = "https?:\\/\\/((www\\.)?google\\.(com|fr|de)|goo.gl)\\/maps(\\?.+|\\/.+)";
  const phonePattern = "(00|+)49[0-9]{,13}";


  function handleSubmit(event) {
    event.preventDefault()
    console.log(event)
  }
  return (
    <form onSubmit={handleSubmit}>
      <LabeledInput type={"url"} label={"google maps link"} name={"maps-link"} pattern={urlPattern}/>
      <LabeledInput type={"tel"} label={"phone number"} name={"phone-number"} pattern={phonePattern}/>
      <button>Submit</button>
    </form>
  );
}

export default App;
