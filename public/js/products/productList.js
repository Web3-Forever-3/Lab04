// Inicializar Firestore
var db = firebase.apps[0].firestore();
const tablaProductos = document.querySelector('#tablaProductos');

// Obtener el `CategoryID` desde la URL
const urlParams = new URLSearchParams(window.location.search);
const categoryID = parseInt(urlParams.get('cod'));  // `cod` es el parámetro de CategoryID

// Verificar que tenemos un CategoryID válido
if (isNaN(categoryID)) {
    tablaProductos.innerHTML = "<p>Error: Categoría no válida.</p>";
} else {
    // Consulta a Firebase para obtener productos de la categoría seleccionada
    db.collection("products").where("CategoryID", "==", categoryID).get().then(function(query) {
        // Comenzar a construir la tabla HTML
        let salida = "<table class='table table-striped'>" +
            "<thead>" +
            "<tr>" +
            "<td><strong>ID Producto</strong></td>" +
            "<td><strong>Nombre Producto</strong></td>" +
            "<td><strong>Precio Unitario</strong></td>" +
            "<td><strong>En Stock</strong></td>" +
            "<td><strong>Acciones</strong></td>" +
            "</tr>" +
            "</thead><tbody>";

        // Recorrer resultados de la consulta
        query.forEach(function(doc) {
            const data = doc.data();
            salida += '<tr>';
            salida += `<td>${data.ProductID}</td>`;
            salida += `<td>${data.ProductName}</td>`;
            salida += `<td>$${data.UnitPrice}</td>`;
            salida += `<td>${data.UnitsInStock}</td>`;
            // Botones para editar y eliminar
            salida += `<td>
                        <a href="editProduct.html?productID=${data.ProductID}" class="btn btn-warning btn-sm">Editar</a>
                        <a href="deleteProduct.html?productID=${data.ProductID}" class="btn btn-danger btn-sm">Eliminar</a>
                        </td>`;
            salida += '</tr>';
        });

        salida += "</tbody></table>";
        tablaProductos.innerHTML = salida;
    }).catch(function(error) {
        console.error("Error obteniendo productos: ", error);
        tablaProductos.innerHTML = "<p>Error cargando productos.</p>";
    });
}
