const pool = require("../src/db");
const sp = {};

/*================== CRUD - Tabla servicio_producto, sp_proveedor_marca, sp_no_parte y sp_descripcion ==================*/
/*========================== Create ==========================*/
// Función para agregar atributos en la tabla servicio_producto y psp
sp.insert_sp = async (req, res) => {
  const {partida_id, proveedor_id, marca_id} = req.params;
  const new_sp = req.body;
  //console.log(req.body)

  try{
    if(new_sp.sp_id_spnp !=='' && new_sp.sp_id_categoria !== ''){
      const reSql = await pool.query('INSERT into servicio_producto set ?', [new_sp]);
 
      const psp ={
        psp_id_partida:partida_id,
        psp_id_sp:reSql.insertId
      }
      //console.log(psp)
      await pool.query('INSERT INTO psp SET ?', [psp]);
    
      const sppm ={
        sppm_id_sp:reSql.insertId,
        sppm_id_proveedor: proveedor_id,
        sppm_id_marca: marca_id
      };
      if(proveedor_id !== '' && marca_id !== ''){
        await pool.query('INSERT INTO sp_proveedor_marca SET ?', [sppm]);
      }else{
        res.json({
          msg: "Por favor asegurate de agregar correctamente el proveedor y la marca",
          estado: true,
        });

      }
      
      /* DEVUELVE RESPUESTA AL FRONT LOS SIGUIENTES DATOS*/
      res.json({
        //data: reSql,
        msg: "Servico/producto registrado exitosamente",
        estado: true,
      });
      

    }else{
      res.json({
        estado: false,
        msg: "¡ERROR, no seleccionaste una categoría!, por favor selecciona una categoría"
      });
    }
 

  } catch (error){
    console.log("Error identificado:",error);
    err = error;

    res.json({
     msg:'Error al agregar el servicio producto',
     error:err
    });
  }
};

sp.insert_spnp = async (req, res) => {
  const new_spnp= {
    spnp_np
  } = req.body;
  try {
    if(new_spnp.spnp_np !== ''){
      const sp = await pool.query("INSERT into sp_no_parte set ?",[new_spnp]);
      res.json({
        msg:'No. de Parte de un Servicio/Producto agregado correctamnete',
        data:sp
      }); 
    }
  } catch (error) {
    res.json({
      msg:'Error al agregar el No. de Parte',
      error:error
    });
  }   
};

sp.insert_spd = async (req, res) => {
  const new_spd= {
    spd_des
  } = req.body;
  try {
    if(new_spd.spd_des !== ''){
      const sp = await pool.query("INSERT into sp_descripcion set ?",[new_spd]);
      res.json({
        msg:'Descripción de un Servicio/Producto agregada correctamnete',
        data:sp
      }); 
    }
  } catch (error) {
    res.json({
      msg:'Error al agregar la Descripción del Servicio/Producto',
      error:error
    });
  }   
};


// Función para agregar Partidas y servicios/productos de la plantilla excel
sp.insertSP = async (req, res) =>{

  let {proyecto_id} = req.params;

  let newSP = req.body;

  let resPartidasInsertadas = 0;
  let resPpInsertados = 0;
  let resSpInsertados = 0;
  let resNpspInsertados = 0;
  let resSpdInsertados = 0;
  let resPspInsertados = 0;
  let resPreciosInsertados = 0;
  let resSppmInsertados = 0;

  let errPartidasInsertadas = 0;
  let errPpInsertados = 0;
  let errSpInsertados = 0;
  let errNpspInsertados = 0;
  let errSpdInsertados = 0;
  let errPspInsertados = 0;
  let errPreciosInsertados = 0;
  let errSppmInsertados = 0;

  //Arrglo que contendra objetos los atributos de las distintas partidas
  let newPartida = [];

  //Objeto incial con los atributos de una partida
  let partida = {
    partida_nombre:'',
    partida_descripcion:''
  }
  /* =============== Separación de partidas ===============*/
    //Eliminación de nombres repetidos de las partidas
    let partidas = Object.keys(newSP).map((k)=>{
      return newSP[k].Partida;
    });

    let partidasUnicas = partidas.filter((v,i)=>{
      return partidas.indexOf(v) === i;
    });
    //console.log('Partidas sin filtro',partidas);
    //console.log('Partidas filtradas', partidasUnicas);

    //Eliminación de descripciones repetidos de las partidas 
    let descPartidas = Object.keys(newSP).map((k)=>{
      return newSP[k].Descripcion_Partida;
    });

    let descPartidasUnicas = descPartidas.filter((v,i)=>{
      return descPartidas.indexOf(v) === i;
    });
    //console.log('Descripciones de Partidas sin filtro',descPartidas);
    //console.log('Descripciones de Partidas filtrados',descPartidasUnicas);

    //Obtención del numero de partidas 
    let nPartidas = Object.keys(partidasUnicas);
    nPartidas = nPartidas.length;
    //console.log('No. de partidas:',nPartidas);

    //LLenado del arreglo con el objeto inicial
    for(let c = 0 ; c < nPartidas ; c++){
      newPartida[c] = partida;
    }

    //Llenado del arreglo con los datos de cada partida y inserción a la BD
    function llenarObjetoPartidas(nombre, descripcion,c){
      newPartida[c].partida_nombre = nombre;
      newPartida[c].partida_descripcion = descripcion;
    }

    let partidas1 = [];
    let idsPartidas = [];
    for(let c = 0 ; c < nPartidas ; c++){
      llenarObjetoPartidas(partidasUnicas[c],descPartidasUnicas[c],c);
      //console.log(`Partida del del objeto ${c}`,newPartida[c]);
      try {
        partidas1 [c] = await pool.query("INSERT into partida set ?",[newPartida[c]]);
        idsPartidas [c] = partidas1[c].insertId;
        resPartidasInsertadas + 1;
      } catch (error) {
        errPartidasInsertadas + 1;
      }
      

      //newPartida[c] = partida;
    }
    //console.log("ID's de las partidas insertadas",idsPartidas);
    //console.log('Todas las partidas:', newPartida);
  /* ======================================================*/
  
  /* =============== Separación de servicios/productos(sp) por partida ===============*/
  //Obtención del numero total de sp
  let kSP = Object.keys(newSP);
  kSP = kSP.length;
  
  //Objeto inicial de los atributos de un precio
  let precio = {
    precio_lista:'',
    precio_unitario:'',
    precio_descuento:'',
    precio_total:'',
    precio_id_moneda:''
  }
  //Objeto incial de una marca 
  let marca = {
    marca_nombre:''
  }
  //Objeto inicial de un proveedor
  let proveedor = {
    proveedor_nombre:''
  }
  //Objeto inicial de los atributos de un SP
  let sp = {
    sp_id_spnp:'',
    sp_id_spd:'',
    sp_meses:'',
    sp_semanas:'',
    sp_cantidad:'',
    sp_id_precio:'',
    sp_id_categoria:'',
    sp_comentarios:''
  }

  np = {
    spnp_np:''
  }

  des = {
    spd_des:''
  } 

  let pp = {
    pp_id_partida:'',
    pp_id_proyecto:''
  }

  let psp = {
    psp_id_partida:'',
    psp_id_sp:''
  }

  let sppm = {
    sppm_id_sp:'',
    sppm_id_marca:'',
    sppm_id_proveedor:''
  }

  let newMarcas = [];
  let newProveedores = [];
  let newPrecios = [];
  let newSP1 = [];
  let newPP = [];
  let newPSP = [];
  let newSPPM = [];
  let newSPNP = [];
  let newSPD = [];

  //Funciones - Calculo de precio unitario y total
  let pUnitario = 0;

  function limpiar(){
    pUnitario = 0;
  }

  function precioUnitario(precioLista, Descuento) {
      limpiar();
      pUnitario = parseFloat(( parseFloat(precioLista) *  parseFloat(Descuento)) / 100);
      pUnitario = precioLista - pUnitario;
      return pUnitario;
  }

  function Total(precioUnitario, Cantidad) {
    let Total= parseFloat(Cantidad * precioUnitario);
    Total = Total.toFixed(3);
    return Total;
  }

  for(let c = 0 ; c < nPartidas ; c++){

    newPP[c] = pp;

    newPP[c].pp_id_proyecto = proyecto_id;
    newPP[c].pp_id_partida = idsPartidas[c];
    try {
      await pool.query("INSERT INTO pp SET ?",[newPP[c]]);
      resPpInsertados + 1;
    } catch (error) {
      errPpInsertados + 1;
    }
    

    for(let c1 = 0 ; c1 < kSP ; c1++){

      newMarcas[c1] = marca;
      newProveedores[c1] = proveedor;
      newPrecios[c1] = precio;
      newSP1[c1] = sp;
      newPSP[c1] = psp;
      newSPPM[c1] = sppm;
      newSPNP[c1] = np;
      newSPD[c1] = des;

      

      if(newSP[c1].Partida === partidasUnicas[c]){
        //++spPorPartida[c];
        if(newSP[c1].Moneda === 'MXN'){
          newPrecios[c1].precio_id_moneda = 1; 
        }else{
          newPrecios[c1].precio_id_moneda = 2; 
        }
        newPrecios[c1].precio_descuento = newSP[c1].Descuento;
        newPrecios[c1].precio_lista = newSP[c1].Precio_Lista;
        newPrecios[c1].precio_unitario = precioUnitario(newSP[c1].Precio_Lista,newSP[c1].Descuento);
        newPrecios[c1].precio_total = Total(newPrecios[c1].precio_unitario,newSP[c1].Cantidad); 

        // let idsPrecios = [];
        // let precios = [];
        try {
          let precios = await pool.query("INSERT INTO precio SET ?",[newPrecios[c1]]);
          //idsPrecios[c1] = precios[c1].insertId;
          newSP1[c1].sp_id_precio = precios.insertId; 
          resPreciosInsertados + 1;
        } catch (error) {
          errPreciosInsertados + 1;
        }
        

        //newSP1[c1].sp_id_precio = idsPrecios[c1];

        let findSPNP = await pool.query("SELECT spnp_id FROM sp_no_parte where spnp_np = ?",[newSP[c1].No_Parte]);
        if(findSPNP != '' && findSPNP != undefined){
          newSP1[c1].sp_id_spnp = findSPNP[0].spnp_id;
          //console.log(findMarca[c1][0].marca_id); 
        }else{
          try {
            newSPNP.spnp_np = newSP[c1].No_Parte;
            let insertNewSpnp = await pool.query("INSERT INTO sp_no_parte SET ?",[newSPNP[c1]]);
            newSP1[c1].sp_id_spnp = insertNewSpnp.insertId;
            resNpspInsertados + 1;
          } catch (error) {
            errNpspInsertados + 1;
          }
          
        }

        let findSPD = await pool.query("SELECT spd_id FROM sp_descripcion where spd_des = ?",[newSP[c1].Descipcion]);
        if(findSPD != '' && findSPD != undefined){
          newSP1[c1].sp_id_spd = findSPD[0].spd_id;
          //console.log(findMarca[c1][0].marca_id); 
        }else{
          try {
            newSPD.spd_des = newSP[c1].Descipcion;
            let insertNewSpd = await pool.query("INSERT INTO sp_descripcion SET ?",[newSPD[c1]]);
            newSP1[c1].sp_id_spd = insertNewSpd.insertId;
            resSpdInsertados + 1;
          } catch (error) {
            errSpdInsertados + 1;
          }
          
        }
        
        newSP1[c1].sp_meses = newSP[c1].Duracion;
        newSP1[c1].sp_semanas = newSP[c1].Entega;
        newSP1[c1].sp_cantidad = newSP[c1].Cantidad;
        if( newSP[c1].Categoria === 'Tecnologia principal'){
          newSP1[c1].sp_id_categoria = 1;
        }else if( newSP[c1].Categoria === 'Subtecnologia'){
          newSP1[c1].sp_id_categoria = 2;
        }else if( newSP[c1].Categoria === 'Equipamiento'){
          newSP1[c1].sp_id_categoria = 3;
        }else if( newSP[c1].Categoria === 'Licencia'){
          newSP1[c1].sp_id_categoria = 4;
        }else if( newSP[c1].Categoria === 'Soporte'){
          newSP1[c1].sp_id_categoria = 5;
        }else if( newSP[c1].Categoria === 'Implementacion'){
          newSP1[c1].sp_id_categoria = 6;
        }
        newSP1[c1].sp_comentarios = newSP[c1].Comentarios

        let idsSP = [];  
        let insertSP = [];

        try {
          insertSP[c1] = await pool.query("INSERT INTO servicio_producto SET ?",[newSP1[c1]]);
          idsSP[c1] = insertSP[c1].insertId;
          newSPPM[c1].sppm_id_sp = idsSP[c1];
          newPSP[c1].psp_id_sp = idsSP[c1];
          resSpInsertados + 1;
        } catch (error) {
          errSpInsertados + 1;
        }
        

        newPSP[c1].psp_id_partida = idsPartidas[c];
        //newPSP[c1].psp_id_sp = idsSP[c1];

        //newSPPM[c1].sppm_id_sp = idsSP[c1];

        try {
          await pool.query("INSERT INTO psp SET ?",[newPSP[c1]]);
          resPspInsertados + 1;
        } catch (error) {
          errPspInsertados + 1;
        }
        

        
        let findMarca = await pool.query("SELECT marca_id FROM marca where marca_nombre = ?",[newSP[c1].Marca]);
        if(findMarca != '' && findMarca != undefined){
          newSPPM[c1].sppm_id_marca =  findMarca[0].marca_id;
          //newMarcas[c1] = findMarca[0].marca_id;
          //console.log(findMarca[c1][0].marca_id); 
        }else{
          //newMarcas[c1] = '"Se tiene que agregar la marca"';
        }

        let findProoveedor = await pool.query("SELECT proveedor_id FROM proveedor where proveedor_nombre = ?",[newSP[c1].Proveedor]);
        if(findProoveedor != '' && findProoveedor != undefined){
          newSPPM[c1].sppm_id_proveedor =  findProoveedor[0].proveedor_id;
          //newProveedores[c1] = findProoveedor[0].proveedor_id;
          //console.log(findMarca[c1][0].marca_id); 
        }else{
          //newProveedores[c1] = '"Se tiene que agregar el Proveedor"';
        }
        try {
          await pool.query("INSERT INTO sp_proveedor_marca SET ?",[newSPPM[c1]]);
          resSppmInsertados + 1;
        } catch (error) {
          errSppmInsertados + 1;
        }
        
        //newMarcas[c1]
        console.log('/=================================/','\n');
        console.log(`Precios del Servicio/Producto: ${c1}`,newPrecios[c1],'\n');
        console.log('/=================================/','\n');
        console.log(`Servicio/Producto de la partida: ${c} `,newSP1[c1],'\n');
        console.log('/=================================/','\n');
        console.log(`Servicio/Producto ${c1} - Proveedor - Marca: `,'{',newSPPM[c1],'}','\n');
        console.log('/=================================/','\n');
        console.log(`Relacion Partida${c} - Servicio/Productos ${c1}: `,'{',newPSP[c1],'}','\n');
        
      //}   
    }
    console.log('/=================================/','\n');
    console.log(`Relacion Proyecto - Partida ${c}: `,'{',newPP[c],'}','\n');
  }
  //console.log(newSP1);
  //console.log('Contador de sp por partida',spPorPartida);
    


  /* =============================================================================*/
  let msg;
  if(
      errPpInsertados !== 0 &&
      errSpInsertados !== 0 &&
      errNpspInsertados !== 0 &&
      errSpdInsertados !== 0 &&
      errPspInsertados !== 0 &&
      errPreciosInsertados !== 0 &&
      errSppmInsertados !== 0 
  ){
    msg = `No_parte(s) de los Servicios/Productos No insertados:${errNpspInsertados}\n`
    + `Descripciones de los Servicios/Productos No insertados:${errSpdInsertados}\n`
    + `Precios de los Servicios/Productos Noinsertados:${errPreciosInsertados}\n`
    + `Servicios/Productos No insertados:${errSpInsertados}\n`
    + `Relaciones Proyecto - Partidas No insertadas:${errPpInsertados}\n`
    + `Relaciones Partidas - Servicios/Productos No insertadas:${errPspInsertados}\n`
    + `Relaciones Servicios/Procustos - Proveedores - Marcas No insertadas:${errSppmInsertados}\n`;
  }else{
    msg = `No_parte(s) de los Servicios/Productos insertados:${resNpspInsertados}\n`
    + `Descripciones de los Servicios/Productos insertados:${resSpdInsertados}\n`
    + `Precios de los Servicios/Productos insertados:${resPreciosInsertados}\n`
    + `Servicios/Productos insertados:${resSpInsertados}\n`
    + `Relaciones Proyecto - Partidas insertadas:${resPpInsertados}\n`
    + `Relaciones Partidas - Servicios/Productos insertadas:${resPspInsertados}\n`
    + `Relaciones Servicios/Procustos - Proveedores - Marcas insertadas:${resSppmInsertados}\n`;
  }
    

  // res.json({
  //   msg:msg
  // })
  }
}

// Función para agregar servicios/productos multiples
sp.multiSP = async (req, res) =>{

  
  let resSpInsertados = 0;
  let resNpspInsertados = 0;
  let resSpdInsertados = 0;
  let resPspInsertados = 0;
  let resPreciosInsertados = 0;
  let resSppmInsertados = 0;

 
  let errSpInsertados = 0;
  let errNpspInsertados = 0;
  let errSpdInsertados = 0;
  let errPspInsertados = 0;
  let errPreciosInsertados = 0;
  let errSppmInsertados = 0;

  let {partida_id} = req.params;
  let newSP = req.body;

  //console.log(listaSP);
  /* =============== Separación de servicios/productos(sp) por partida ===============*/
  //Obtención del numero total de sp
  let kSP = Object.keys(newSP);
  kSP = kSP.length;
  
  //Objeto inicial de los atributos de un precio
  let precio = {
    precio_lista:'',
    precio_unitario:'',
    precio_descuento:'',
    precio_total:'',
    precio_id_moneda:''
  }
  //Objeto incial de una marca 
  let marca = {
    marca_nombre:''
  }
  //Objeto inicial de un proveedor
  let proveedor = {
    proveedor_nombre:''
  }
  //Objeto inicial de los atributos de un SP
  let sp = {
    sp_id_spnp:'',
    sp_id_spd:'',
    sp_meses:'',
    sp_semanas:'',
    sp_cantidad:'',
    sp_id_precio:'',
    sp_id_categoria:'',
    sp_comentarios:''
  }

  np = {
    spnp_np:''
  }

  des = {
    spd_des:''
  } 

  let psp = {
    psp_id_partida:'',
    psp_id_sp:''
  }

  let sppm = {
    sppm_id_sp:'',
    sppm_id_marca:'',
    sppm_id_proveedor:''
  }

  let newMarcas = [];
  let newProveedores = [];
  let newPrecios = [];
  let newSP1 = [];
  let newPSP = [];
  let newSPPM = [];
  let newSPNP = [];
  let newSPD = [];

  for(let c1 = 0 ; c1 < kSP ; c1++){

    newMarcas[c1] = marca;
    newProveedores[c1] = proveedor;
    newPrecios[c1] = precio;
    newSP1[c1] = sp;
    newPSP[c1] = psp;
    newSPPM[c1] = sppm;
    newSPNP[c1] = np;
    newSPD[c1] = des;

  
    newPrecios[c1].precio_id_moneda = newSP[c1].moneda;
    newPrecios[c1].precio_descuento = newSP[c1].precio_descuento;
    newPrecios[c1].precio_lista = newSP[c1].precio_lista;
    newPrecios[c1].precio_unitario = newSP[c1].precio_unitario;
    newPrecios[c1].precio_total = newSP[c1].total;

   
    try {
      let precios = await pool.query("INSERT INTO precio SET ?",[newPrecios[c1]]);
      //idsPrecios[c1] = precios[c1].insertId;
      newSP1[c1].sp_id_precio = precios.insertId; 
      resPreciosInsertados = resPreciosInsertados + 1;
    } catch (error) {
      errPreciosInsertados = errPreciosInsertados + 1;
    }
    

    //newSP1[c1].sp_id_precio = idsPrecios[c1];

    let findSPNP = await pool.query("SELECT spnp_id FROM sp_no_parte where spnp_np = ?",[newSP[c1].n_parte]);
    if(findSPNP != '' && findSPNP != undefined){
      newSP1[c1].sp_id_spnp = findSPNP[0].spnp_id;
      //console.log(findMarca[c1][0].marca_id); 
    }else{
      try {
        newSPNP[c1].spnp_np = newSP[c1].n_parte;
        let insertNewSpnp = await pool.query("INSERT INTO sp_no_parte SET ?",[newSPNP[c1]]);
        newSP1[c1].sp_id_spnp = insertNewSpnp.insertId;
        resNpspInsertados = resNpspInsertados + 1;
      } catch (error) {
        errNpspInsertados = errNpspInsertados + 1;
      }
        
    }

    let findSPD = await pool.query("SELECT spd_id FROM sp_descripcion where spd_des = ?",[newSP[c1].descripcion]);
    if(findSPD != '' && findSPD != undefined){
      newSP1[c1].sp_id_spd = findSPD[0].spd_id;
      //console.log(findMarca[c1][0].marca_id); 
    }else{
      try {
        newSPD[c1].spd_des = newSP[c1].descripcion;
        let insertNewSpd = await pool.query("INSERT INTO sp_descripcion SET ?",[newSPD[c1]]);
        newSP1[c1].sp_id_spd = insertNewSpd.insertId;
        resSpdInsertados = resSpdInsertados + 1;
      } catch (error) {
        errSpdInsertados = errSpdInsertados + 1;
      }
      
    }
    
    newSP1[c1].sp_meses = newSP[c1].meses;
    newSP1[c1].sp_semanas = newSP[c1].semanas;
    newSP1[c1].sp_cantidad = newSP[c1].cantidad;
    newSP1[c1].sp_id_categoria = newSP[c1].categoria;
    newSP1[c1].sp_comentarios = newSP[c1].comentarios

    let idsSP = [];  
    let insertSP = [];

    try {
      insertSP[c1] = await pool.query("INSERT INTO servicio_producto SET ?",[newSP1[c1]]);
      idsSP[c1] = insertSP[c1].insertId;
      newSPPM[c1].sppm_id_sp = idsSP[c1];
      newPSP[c1].psp_id_sp = idsSP[c1];
      resSpInsertados = resSpInsertados + 1;
    } catch (error) {
      errSpInsertados = errSpInsertados + 1;
    }
    

    newPSP[c1].psp_id_partida = partida_id;
    newPSP[c1].psp_id_sp = idsSP[c1];

    //newSPPM[c1].sppm_id_sp = idsSP[c1];

    try {
      await pool.query("INSERT INTO psp SET ?",[newPSP[c1]]);
      resPspInsertados = resPspInsertados + 1;
    } catch (error) {
      errPspInsertados = errPspInsertados + 1;
    }
    

    
    let findMarca = await pool.query("SELECT marca_id FROM marca where marca_nombre = ?",[newSP[c1].marca]);
    if(findMarca != '' && findMarca != undefined){
      newSPPM[c1].sppm_id_marca =  findMarca[0].marca_id;
      //newMarcas[c1] = findMarca[0].marca_id;
      //console.log(findMarca[c1][0].marca_id); 
    }else{
      //newMarcas[c1] = '"Se tiene que agregar la marca"';
    }

    let findProoveedor = await pool.query("SELECT proveedor_id FROM proveedor where proveedor_nombre = ?",[newSP[c1].proveedor]);
    if(findProoveedor != '' && findProoveedor != undefined){
      newSPPM[c1].sppm_id_proveedor =  findProoveedor[0].proveedor_id;
      //newProveedores[c1] = findProoveedor[0].proveedor_id;
      //console.log(findMarca[c1][0].marca_id); 
    }else{
      //newProveedores[c1] = '"Se tiene que agregar el Proveedor"';
    }
    try {
      await pool.query("INSERT INTO sp_proveedor_marca SET ?",[newSPPM[c1]]);
      resSppmInsertados = resSppmInsertados + 1;
    } catch (error) {
      errSppmInsertados = errSppmInsertados + 1;
    }
    
    //newMarcas[c1]
    // console.log('/=================================/','\n');
    // console.log(`Precios del Servicio/Producto: ${c1}`,newPrecios[c1],'\n');
    // console.log('/=================================/','\n');
    // console.log(`Servicio/Producto: ${c1} `,newSP1[c1],'\n');
    // console.log('/=================================/','\n');
    // console.log(`Servicio/Producto ${c1} - Proveedor - Marca: `,'{',newSPPM[c1],'}','\n');
    // console.log('/=================================/','\n');
    // console.log(`Relacion Partida${partida_id} - Servicio/Productos ${c1}: `,'{',newPSP[c1],'}','\n');
    // console.log('/=================================/','\n');
    //console.log(`Relacion Proyecto - Partida ${c}: `,'{',newPP[c],'}','\n');
  }

//console.log(newSP1);
//console.log('Contador de sp por partida',spPorPartida);
  


/* =============================================================================*/
// console.log(
//   'Inserciones:\n'
//   + `No_parte(s) de los Servicios/Productos insertados:${errNpspInsertados}\n`
//   + `Descripciones de los Servicios/Productos insertados:${resSpdInsertados}\n`
//   + `Precios de los Servicios/Productos insertados:${resPreciosInsertados}\n`
//   + `Servicios/Productos insertados:${resSpInsertados}\n`
//   + `Relaciones Servicios/Procustos - Proveedores - Marcas insertadas:${resSppmInsertados}\n`
// );
  let msg;
    if(
        errSpInsertados !== 0 &&
        errNpspInsertados !== 0 &&
        errSpdInsertados !== 0 &&
        errPspInsertados !== 0 &&
        errPreciosInsertados !== 0 &&
        errSppmInsertados !== 0 
    ){
      msg = `No_parte(s) de los Servicios/Productos No insertados:${errNpspInsertados}\n`
      + `Descripciones de los Servicios/Productos No insertados:${errSpdInsertados}\n`
      + `Precios de los Servicios/Productos Noinsertados:${errPreciosInsertados}\n`
      + `Servicios/Productos No insertados:${errSpInsertados}\n`
      + `Relaciones Partidas - Servicios/Productos No insertadas:${errPspInsertados}\n`
      + `Relaciones Servicios/Procustos - Proveedores - Marcas No insertadas:${errSppmInsertados}\n`;
    }else{
      msg = `No_parte(s) de los Servicios/Productos insertados:${resNpspInsertados}\n`
      + `Descripciones de los Servicios/Productos insertados:${resSpdInsertados}\n`
      + `Precios de los Servicios/Productos insertados:${resPreciosInsertados}\n`
      + `Servicios/Productos insertados:${resSpInsertados}\n`
      + `Relaciones Partidas - Servicios/Productos insertadas:${resPspInsertados}\n`
      + `Relaciones Servicios/Procustos - Proveedores - Marcas insertadas:${resSppmInsertados}\n`;
    }
    

  // res.json({
  //   msg:msg
  // })


}

/*============================================================*/

/*========================== Read ==========================*/
//Función para consultar datos relacionados de una determinada partida 
sp.viewPSP = async (req, res) => {
  const {partida_id} = req.params;
  const reSql = await pool.query(
      "SELECT sp_id,sp_id_spnp,spnp_np,sp_id_spd,spd_des,sp_meses,sp_semanas,sp_cantidad,sp_id_precio,"
    + "proveedor_id, proveedor_nombre, marca_id, marca_nombre, sp_id_categoria, sp_comentarios "
    + "FROM partida "
    + "INNER JOIN psp ON psp_id_partida = partida_id "
    + "INNER JOIN servicio_producto ON psp_id_sp = sp_id "
    + "INNER JOIN sp_no_parte ON spnp_id = sp_id_spnp "
    + "INNER JOIN sp_descripcion ON spd_id = sp_id_spd "
    + "INNER JOIN precio ON sp_id_precio = precio_id "
    + "INNER JOIN sp_proveedor_marca ON sppm_id_sp = sp_id "
    + "INNER JOIN proveedor ON sppm_id_proveedor = proveedor_id "
    + "INNER JOIN marca ON sppm_id_marca = marca_id "
    + "INNER JOIN categoria ON sp_id_categoria = categoria_id "
    + "WHERE partida_id = ? "
    + "ORDER BY sp_id", [partida_id]);
  res.json({data:reSql});
  //console.log(reSql);
};

// Función para consultar datos relacionados de una determinada partida 
sp.viewFindSP = async (req, res) => {
  const reSql = await pool.query(
      "SELECT proyecto_clave, partida_nombre,spnp_id,spnp_np,spd_id,spd_des,sp_meses,sp_semanas,sp_cantidad,sp_id_precio,"
    + "precio_lista,precio_unitario,precio_descuento,precio_total,precio_id_moneda,"
    + "proveedor_nombre, marca_nombre, sp_id_categoria, sp_comentarios "
    + "FROM proyecto "
    + "INNER JOIN pp ON pp_id_proyecto = proyecto_id "
    + "INNER JOIN partida ON pp_id_partida = partida_id "
    + "INNER JOIN psp ON psp_id_partida = partida_id "
    + "INNER JOIN servicio_producto ON psp_id_sp = sp_id "
    + "INNER JOIN sp_no_parte ON spnp_id = sp_id_spnp "
    + "INNER JOIN sp_descripcion ON spd_id = sp_id_spd "
    + "INNER JOIN precio ON sp_id_precio = precio_id "
    + "INNER JOIN sp_proveedor_marca ON sppm_id_sp = sp_id "
    + "INNER JOIN proveedor ON sppm_id_proveedor = proveedor_id "
    + "INNER JOIN marca ON sppm_id_marca = marca_id "
    + "INNER JOIN categoria ON sp_id_categoria = categoria_id "
    );
  res.json({data:reSql});
  //console.log(reSql);
};

// Función para consultar datos de la tabla sp_no_parte
sp.viewSpnp = async (req, res) => {
  const reSql = await pool.query(
      "SELECT spnp_id,spnp_np FROM sp_no_parte"
    );
  res.json({data:reSql});
  //console.log(reSql);
};

// Función para consultar datos de la tabla sp_descripcion
sp.viewSpd = async (req, res) => {
  const reSql = await pool.query(
      "SELECT spd_id,spd_des FROM sp_descripcion"
    );
  res.json({data:reSql});
  //console.log(reSql);
};
/*==========================================================*/

/*========================== Update ==========================*/
// Función para editar atributos en la tabla servicio_producto
sp.update_sp = async (req, res) => {
  const { sp_id, sppm_id_proveedor, sppm_id_marca } = req.params;
  const{
    sp_id_spnp,
    sp_id_spd,
    sp_meses,
    sp_semanas,
    sp_cantidad,
    sp_id_categoria,
    sp_comentarios } = req.body;

  const editnew_sp = {
    sp_id_spnp,
    sp_id_spd,
    sp_meses,
    sp_semanas,
    sp_cantidad,
    sp_id_categoria,
    sp_comentarios };

    try{
      await pool.query("UPDATE servicio_producto set ?  WHERE sp_id = ?", [editnew_sp,sp_id]);
  
      const editnewSPPM ={
        sppm_id_proveedor,
        sppm_id_marca
      }
      await pool.query("UPDATE sp_proveedor_marca set ?  WHERE sppm_id_sp = ?", [editnewSPPM,sp_id]);

      res.json({
        msg: "Servicio/Producto editado exitosamente",
        estado: true,
      });
    } catch (error) {
      console.log("Error identificado:", error);
      err = error;
      res.json({
        estado: false,
        msg: "¡ERROR!, Revisa que hayas ingresado correctamente los datos"
      });
    }

};

// Función para editar el atributo sp_cantidad en la tabla servicio_producto
sp.update_sp_cant = async (req, res) => {
  const { sp_id} = req.params;
  const{
    sp_cantidad} = req.body;

  const editnew_sp = {
    sp_cantidad
  }
  //editnew_sp1.sp_no_parte = 20; //Dato para prueba
  try{
    await pool.query("UPDATE servicio_producto set ?  WHERE sp_id = ?", [editnew_sp,sp_id]);
    res.json({
      msg: "Producto editado exitosamente",
      estado: true,
    });
  }catch (error) {
    console.log("Error identificado:", error);
    err = error;
    res.json({
      estado: false,
      msg: "¡ERROR!, Revisa que hayas ingresado correctamente los datos"
    });
  }

};
/*============================================================*/

/*========================== Delete ==========================*/
// Función para elimiar  atributos de la tabla servicio_producto
sp.delete_sp = async (req, res) => {
  //const { sp_id = 1003 } = req.params; //Dato para prueba
  const { sp_id } = req.params;
  await pool.query("DELETE FROM servicio_producto WHERE sp_id = ?", [sp_id]);
  res.json({
    msg: "Producto eliminado exitosamente",
    estado: true,
  });
};
/*============================================================*/

module.exports = sp;