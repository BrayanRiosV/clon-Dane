var remoteDb = new PouchDB("http://admin:brayanRios@localhost:5984/dane");
var localDb = new PouchDB("prueba");

onload = (event) => { 
  var botonLimpiar = document.querySelector("#limpiar");
  var botonSincronizar = document.querySelector("#sincronizar");
  var botonAdicionar = document.querySelector("#adicionar");
  var form = document.querySelector("#form");


  remoteDb.info().then(function (info) {
    console.log(info);
  });
  
  botonAdicionar.addEventListener("click", function () {
    console.log(document.querySelector("#id").value);
    if(document.querySelector("#id").value === ''){
      alert('La cédula es obligatoria');
    }else{
      var doc = {
        _id: document.querySelector("#id").value,
        name: document.querySelector("#name").value,
        lastname: document.querySelector("#address").value,
        stratum: document.querySelector("#stratum").value,
        cellphone: document.querySelector("#cellphone").value,
        email: document.querySelector("#email").value,        
      };
      localDb.put(doc);
    }});
  
  
  botonLimpiar.addEventListener("click", function () {
    form.reset();
  });
  
  botonSincronizar.addEventListener("click", function () {
    localDb 
    .sync(remoteDb)
    .on("complete", function () {
      alert("Se han sincronizado los documentos");
    })
    .on("error", function (err) {
      console.log(error);
    });
  });
}

