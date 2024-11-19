var db = firebase.apps[0].firestore();

// Obtener parámetros de URL (usaremos `categoryId` para identificar la categoría a editar)
const urlParams = new URLSearchParams(window.location.search);
const categoryId = urlParams.get('id');

// Cargar datos de la categoría para mostrarlos en el formulario
function loadCategoryData() {
    if (categoryId) {
        db.collection("categories").doc(categoryId).get()
            .then(function(doc) {
                if (doc.exists) {
                    document.getElementById("editCategoryId").value = doc.id;
                    document.getElementById("editCategoryName").value = doc.data().CategoryName;
                    document.getElementById("editCategoryDescription").value = doc.data().Description;
                } else {
                    alert("Categoría no encontrada.");
                    window.location.href = "index.html"; // Redirigir al listado si no existe
                }
            })
            .catch(function(error) {
                console.error("Error al obtener la categoría: ", error);
                alert("Error al cargar los datos de la categoría.");
            });
    } else {
        alert("ID de categoría no especificado.");
        window.location.href = "index.html";
    }
}

// Guardar los cambios realizados en la categoría
function saveCategoryEdit() {
    const categoryName = document.getElementById("editCategoryName").value;
    const categoryDescription = document.getElementById("editCategoryDescription").value;

    db.collection("categories").doc(categoryId).update({
        CategoryName: categoryName,
        Description: categoryDescription
    })
    .then(function() {
        alert("Categoría actualizada exitosamente.");
        window.location.href = "index.html"; // Redirigir al listado de categorías
    })
    .catch(function(error) {
        console.error("Error al actualizar la categoría: ", error);
        alert("Error al guardar los cambios.");
    });
}

// Cancelar y volver al listado de categorías sin guardar cambios
function cancelEdit() {
    window.location.href = "index.html";
}

// Cargar los datos de la categoría al cargar la página
loadCategoryData();
