import './error-page.css'
import logo from '../../../assets/Images/logo.png'
import Button from '../../button/button.jsx'
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  const handleClick = () => {
    console.log('Hola Error');
  };

  return (
    <>
      <div className='home'>
        <h1>¡Ay no!</h1>
        <p>Ha ocurrido un error inesperado</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
        <img src={logo} className="logo" alt="img logo" />
        <Button label="OK" onClick={handleClick} />
      </div>
    </>
  )
}