import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthLayout } from './layout/AuthLayout';
import { RutaProtegida } from './layout/RutaProtegida';

import { ConfirmarCuenta } from './Paginas/ConfirmarCuenta';
import { Login } from './Paginas/Login';
import { NuevoPassword } from './Paginas/NuevoPassword';
import { OlvidePassword } from './Paginas/OlvidePassword';
import { Registrar } from './Paginas/Registrar';
import { AdministrarPacientes } from './Paginas/AdministrarPacientes';

import AuthContext, { AuthProvider } from './context/AuthProvider';
import { PacienteProvider } from './context/PacientesProvider';
import { EditarPerfil } from './Paginas/EditarPerfil';
import { CambiarPassword } from './Paginas/CambiarPassword';

function App () {


  return (

    <BrowserRouter>

      <AuthProvider>
        <PacienteProvider>

          <Routes>

            <Route path='/' element={ <AuthLayout /> }>
              <Route index element={ <Login /> } />
              <Route path='registrar' element={ <Registrar /> } />
              <Route path='olvide-password' element={ <OlvidePassword /> } />
              <Route path='olvide-password/:token' element={ <NuevoPassword /> } />
              <Route path='confirmar/:id' element={ <ConfirmarCuenta /> } />
            </Route>

            {/* Rutas protegidas */ }
            <Route path='/admin' element={ <RutaProtegida /> }  >
              <Route index element={ <AdministrarPacientes /> } />
              <Route path='perfil' element={ <EditarPerfil /> } />
              <Route path='cambiar-password' element={ <CambiarPassword /> } />
            </Route>

          </Routes >

        </PacienteProvider>
      </AuthProvider>

    </BrowserRouter >

  );
}

export default App;
