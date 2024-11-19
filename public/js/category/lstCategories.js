var db = firebase.apps[0].firestore();
const tabla = document.querySelector('#tablaCateg');

// Función para renderizar las categorías
function renderCategories() {
    db.collection("categories").get().then(function(query) {
        tabla.innerHTML = "";
        var salida = "<table class=\"table table-striped\">" +
                     "    <thead>" +
                     "        <tr>" +
                     "            <td><strong>Código</strong></td>" +
                     "            <td><strong>Nombre</strong></td>" +
                     "            <td><strong>Descripción</strong></td>" +
                     "            <td colspan='2' align='center'><strong>Modificar</strong></td>" +
                     "        </tr>" +
                     "    </thead><tbody>";
        query.forEach(function(doc) {
            salida += '<tr>';
            salida += '<td><a href="listaProductos.html?cod=' + doc.data().CategoryID + '">' + doc.data().CategoryID + '</a></td>';
            salida += '<td>' + doc.data().CategoryName + '</td>';
            salida += '<td>' + doc.data().Description + '</td>';
            salida += '<td align="center"><a href="editCategory.html?cod=' + doc.data().CategoryID + '">Editar</a></td>';
            salida += `<td align="center"><button onclick="deleteCategory('${doc.id}')">Borrar</button></td>`;
            salida += '</tr>';
        });
        salida += "</tbody></table>";
        tabla.innerHTML = salida;
    });
}

// Función para eliminar una categoría
function deleteCategory(categoryId) {
    if (confirm("¿Estás seguro de que deseas eliminar esta categoría?")) {
        db.collection("categories").doc(categoryId).delete().then(function() {
            alert("Categoría eliminada exitosamente.");
            renderCategories(); // Recargar la tabla después de eliminar
        }).catch(function(error) {
            console.error("Error al eliminar la categoría: ", error);
        });
    }
}

// Llamar a la función para renderizar las categorías cuando se carga la página
renderCategories();
