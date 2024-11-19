// Inicializar Firestore
var db = firebase.apps[0].firestore();

// Obtener el `ProductID` desde la URL
const urlParams = new URLSearchParams(window.location.search);
const productID = parseInt(urlParams.get('productID'));  // `productID` es el parámetro de ProductID

if (isNaN(productID)) {
    alert("Error: Producto no válido.");
} else {
    // Cargar datos del producto para editar
    db.collection("products").doc(productID.toString()).get().then(function(doc) {
        if (doc.exists) {
            const productData = doc.data();
            // Rellenar el formulario con los datos actuales
            document.getElementById('productName').value = productData.ProductName;
            document.getElementById('unitPrice').value = productData.UnitPrice;
            document.getElementById('unitsInStock').value = productData.UnitsInStock;
        } else {
            alert("Producto no encontrado.");
        }
    });

    // Guardar cambios al enviar el formulario
    document.getElementById('editProductForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const updatedProduct = {
            ProductName: document.getElementById('productName').value,
            UnitPrice: parseFloat(document.getElementById('unitPrice').value),
            UnitsInStock: parseInt(document.getElementById('unitsInStock').value)
        };

        // Actualizar producto en Firestore
        db.collection("products").doc(productID.toString()).update(updatedProduct).then(function() {
            alert("Producto actualizado.");
            window.location.href = "listaProductos.html?cod=" + productID; // Regresar a la lista
        }).catch(function(error) {
            console.error("Error actualizando producto: ", error);
            alert("Error actualizando producto.");
        });
    });
}
