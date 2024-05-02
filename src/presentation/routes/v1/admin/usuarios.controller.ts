import { Request, Response } from 'express';
import { json } from 'sequelize/types';
import Usuario from '../../../../domain/entities/usuario';


export const getUsuarios = async( req: Request , res: Response ) => {

    const usuarios = await Usuario.findAll();

    res.json({ usuarios });
}

export const getUsuario = async( req: Request , res: Response ) => {

    const { id } = req.params;

    const usuario = await Usuario.findByPk( id );

    if( usuario ) {
        res.json(usuario);
    } else {
        res.status(404).json({
            msg: `No existe un usuario con el id ${ id }`
        });
    }


}

export const postUsuario = async( req: Request , res: Response ) => {

    const { body } = req;

    try {
        
        const existeEmail = await Usuario.findOne({
            where: {
                email: body.email
            }
        });

        if (existeEmail) {
            return res.status(400).json({
                msg: 'Ya existe un usuario con el email ' + body.email
            });
        }


        //const usuario =;// new Usuario(body);
       // await usuario.save();

        res.json(  );


    } catch (error) {

        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })    
    }



}

export const putUsuario = async( req: Request , res: Response ) => {

    const { id }   = req.params;
    const { body } = req;

    try {
        
        const usuario = await Usuario.findByPk( id );
        if ( !usuario ) {
            return res.status(404).json({
                msg: 'No existe un usuario con el id ' + id
            });
        }

        await usuario.update( body );

        res.json( usuario );


    } catch (error) {

        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })    
    }   
}


export const deleteUsuario = async( req: Request , res: Response ) => {

    const { id } = req.params;

    const usuario = await Usuario.findByPk( id );
    if ( !usuario ) {
        return res.status(404).json({
            msg: 'No existe un usuario con el id ' + id
        });
    }

    await usuario.update({ estado: false });

    // await usuario.destroy();


    res.json(usuario);
}



// export const GenerateReport = (Registros:DataReporteGeneral[]) => {
//   const Registros2 :DataReporteGeneral[] = [];
//   Registros.forEach(element => {
//     if( typeof element.FECHA_INICIO != "string" && typeof element.FECHA_FIN != "string"){
//       let currentDate = element.FECHA_INICIO;
//       while (currentDate <= element.FECHA_FIN) {
//         let cdat =currentDate
//         let cdatnext ;
//         if(currentDate.getHours() ==element.FECHA_FIN.getHours())
//           {
//             cdatnext = element.FECHA_FIN;
//           }else{
//             cdatnext = roundToHour(currentDate);
//           }
//         if (cdat.getHours() == cdatnext.getHours() && currentDate.getHours() !=element.FECHA_FIN.getHours()){
//           cdatnext.setHours(cdat.getHours() +1);
//           cdatnext.setMinutes(0,0,0);
//         }
//         const reg = {
//           SEMANA: element.SEMANA,
//           NOMBRE_TIENDA:element.NOMBRE_TIENDA,
//           FECHA_INICIO: cdat,
//           FECHA_FIN:cdatnext,
//           COMENTARIO : element.COMENTARIO,
//           DURACION_MINUTOS:((cdatnext.getTime()-cdat.getTime())/60000).toString(),
//           HOUR:currentDate.getHours()
//         };
//           Registros2.push(reg);         
//           if(currentDate.getHours() ==element.FECHA_FIN.getHours() )
//           {
//             currentDate = element.FECHA_FIN;
//             break;
//           }else{
//             currentDate.setHours(currentDate.getHours()+ 1);
//             currentDate.setMinutes(0,0,0);
//           }
//       }
//     }
//   });

//   Registros2.forEach(element => {
//     console.log(element);
//   });
// }

function roundToHour(date:Date):Date {
    let p = 60 * 60 * 1000; // milliseconds in an hour
    return new Date(Math.round(date.getTime() / p ) * p);
  }