import { Link } from "react-router-dom";
import { useState } from 'react';
import { Alerta } from "../components/Alerta";
import axios from 'axios';
import clienteAxios from "../config/axios";

export const Registrar = () => {

    const [ nombre, setNombre ] = useState( '' );
    const [ email, setEmail ] = useState( '' );
    const [ password, setPassword ] = useState( '' );
    const [ repetirPassword, setRepetirPassword ] = useState( '' );

    const [ alerta, setAlerta ] = useState( {} );

    const handleSubmit = async ( e ) => {
        e.preventDefault();

        if ( [ nombre, email, password, repetirPassword ].includes( '' ) ) {
            setAlerta( { msg: 'Hay campos vacios', error: true } );
            return;
        }
        if ( password !== repetirPassword ) {
            setAlerta( { msg: 'Las contraseñas no coinciden', error: true } );
            return;
        }
        if ( password.length < 8 ) {
            setAlerta( { msg: 'Password es muy corto, agrega minimo 8 caracteres', error: true } );
            return;
        }

        setAlerta( {} );

        //Crear el usuario en el api
        try {
            const respuesta = await clienteAxios.post( '/veterinarios', { nombre, email, password } );

            setAlerta( { msg: 'Creado Correctamente, revisa tu email', error: false } );
        } catch ( error ) {
            setAlerta( {
                msg: error.response.data.msg,
                error: true
            } );
        }
    };

    const { msg } = alerta;

    return (
        <>
            <div className="flex items-center justify-center">
                <h1
                    className="text-indigo-600 font-black text-6xl">Crea tu Cuenta y Administras   <span className="text-black"> tus Pacientes</span></h1>
            </div>
            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">

                { msg && <Alerta
                    alerta={ alerta }
                />
                }

                <form
                    action=""
                    onSubmit={ handleSubmit }
                >
                    <div className="my-5">
                        <label
                            className="uppercase text-gray-600 block text-xl font-bold"
                        >
                            Nombre:
                        </label>
                        <input
                            type="text"
                            placeholder="Tu Nombre"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            onChange={ e => setNombre( e.target.value ) }
                        />
                    </div>

                    <div className="my-5">
                        <label
                            className="uppercase text-gray-600 block text-xl font-bold"
                        >
                            Email:
                        </label>
                        <input
                            type="email"
                            placeholder="Email de Registro"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            onChange={ e => setEmail( e.target.value ) }
                        />
                    </div>

                    <div className="my-5">
                        <label
                            className="uppercase text-gray-600 block text-xl font-bold"
                        >
                            Contrseña:
                        </label>
                        <input
                            type="password"
                            placeholder="Tu Contraseña"
                            name="password"
                            autoComplete="on"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            onChange={ e => setPassword( e.target.value ) }
                        />
                    </div>
                    <div className="my-5">
                        <label
                            className="uppercase text-gray-600 block text-xl font-bold"
                        >
                            Repetir Contrseña:
                        </label>
                        <input
                            type="password"
                            placeholder="Tu Contraseña"
                            name="repeat-password"
                            autoComplete="on"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            onChange={ e => setRepetirPassword( e.target.value ) }
                        />
                    </div>

                    <input
                        type="submit"
                        value='Crear Cuenta'
                        className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
                    />
                </form>

                <nav className="mt-10 lg:flex lg:justify-between">
                    <Link
                        to="/"
                        className="block text-center my-5 text-gray-500"
                    >¿Ya tienes una cuenta? Inicia Sesion</Link>
                    <Link
                        to="/olvide-password"
                        className="block text-center my-5 text-gray-500"
                    >Olvide mi Contraseña</Link>
                </nav>

            </div>
        </>
    );
};
