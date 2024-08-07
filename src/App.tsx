import AuthContextProvider from "./contexts/AuthContextProvider";
import Routes from "./routes/Routes";

const App = () => {
  return (
    <>
      <AuthContextProvider>
        <Routes />
      </AuthContextProvider>
    </>
  );
};

export default App;
