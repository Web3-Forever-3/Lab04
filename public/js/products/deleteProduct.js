// Inicializar Firestore
var db = firebase.apps[0].firestore();

// Obtener el `ProductID` desde la URL
const urlParams = new URLSearchParams(window.location.search);
const productID = parseInt(urlParams.get('productID'));  // `productID` es el parámetro de ProductID

if (isNaN(productID)) {
    alert("Error: Producto no válido.");
} else {
    // Eliminar producto de Firestore
    document.getElementById('deleteButton').addEventListener('click', function() {
        db.collection("products").doc(productID.toString()).delete().then(function() {
            alert("Producto eliminado.");
            window.location.href = "listaProductos.html?cod=" + productID; // Regresar a la lista
        }).catch(function(error) {
            console.error("Error eliminando producto: ", error);
            alert("Error eliminando producto.");
        });
    });
}
