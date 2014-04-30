//Funciones para rellenar la tabla.

//Método que procesa el resultado de la petición para rellenar una tabla html con los datos.
function rellenarTabla(data){
    
  // Obtener la tabla de resultados.
  var table = $("#Resultados");        

  // Comenzar el índice de las filas de la tabla a cero.
  idRowResultados = 0;      

  // Obtener las variables de la consulta SPARQL de la cabecera.
  var headerVars = data.head.vars; 

  // Utilizando las variables hacer la cabecera de la tabla.
  var trHeaders = getTableHeaders(headerVars);
  table.append(trHeaders);  

  // Obtener los resultados de "data".                                          
  var bindings = data.results.bindings;

  // Para cada resultado, hacer una fila de la tabla y añadirla a la tabla.
  for(rowIdx in bindings){
    table.append(getTableRow(headerVars, bindings[rowIdx]));
  } 
}


//Función para crear la cabecera de la tabla.
function getTableHeaders(headerVars) {
  var trHeaders = $("<tr></tr>"); //crea un tr, es decir un rable row.
  for(var i in headerVars) {
    trHeaders.append( $("<th align=center>" + headerVars[i] + "</th>") ); //Th significa table header, es decir un título de columna.
  }
  return trHeaders;
}


//Se crean las filas de la tabla
function getTableRow(headerVars, rowData) {
  var tr = $("<tr class = \"tablaResultados\" id = \""+idRowResultados+"\"></tr>"); //crea un tr, es decir un rable row.
  idRowResultados = idRowResultados + 1;
  for(var i in headerVars) {
    tr.append(getTableCell(headerVars[i], rowData));
  }
  return tr;
}

//Rellenamos cada celda con el valor correspondiente.
function getTableCell(fieldName, rowData) {
  var td = $("<td align=center class \"celdaResultados\"></td>"); //Una casilla en una tabla = td.
  if(rowData.hasOwnProperty(fieldName)){//Si existe el campo se pone el valor, si no ponemos un guión(-).
    var fieldData = rowData[fieldName];
    td.html(fieldData["value"]);
  }
  else{
    td.html("-");
  }

  return td;
}
