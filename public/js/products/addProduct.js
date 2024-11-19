// Importación de los módulos necesarios de Firebase v9
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "#####",
    authDomain: "#####",
    projectId: "#####",
    storageBucket: "#####",
    messagingSenderId: "#####",
    appId: "#####"
  };

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Obtener las instancias de Firestore y Storage
const db = getFirestore(app);
const storage = getStorage(app);

// Elementos del formulario
const txtCategoryID = document.querySelector('#txtCategoryID');
const txtCategoryName = document.querySelector('#txtCategoryName');
const txtDescription = document.querySelector('#txtDescription');
const txtUrlImage = document.querySelector('#txtUrlImage');
const btnAddProduct = document.querySelector('#btnAddProduct');

// Evento para cargar el producto
btnAddProduct.addEventListener('click', async function() {
    // Obtener el archivo seleccionado
    const archivo = txtUrlImage.files[0];
    const nomarch = archivo ? archivo.name : '';

    // Verificar si se ha seleccionado un archivo
    if (!archivo) {
        alert('Debe seleccionar una imagen');
        return;
    }

    try {
        // Definir los metadatos del archivo
        const metadata = { contentType: archivo.type };

        // Subir la imagen a Firebase Storage
        const storageRef = ref(storage, 'categories/' + nomarch); // Referencia al archivo en Storage
        await uploadBytes(storageRef, archivo, metadata);
        const url = await getDownloadURL(storageRef); // Obtener la URL de descarga

        // Guardar los datos del producto en Firestore
        await addDoc(collection(db, "products"), {
            CategoryID: parseInt(txtCategoryID.value),
            ProductName: txtCategoryName.value,
            Description: txtDescription.value,
            Price: parseFloat(txtPrice.value),    // Campo para el precio
            Stock: parseInt(txtStock.value),      // Campo para el stock
            urlImage: url                          // URL de la imagen subida
        });
        alert("Producto agregado con éxito");
        limpiar();
    } catch (error) {
        alert("Error al agregar el producto: " + error.message);
    }
});

// Función para limpiar el formulario después de agregar un producto
function limpiar() {
    txtCategoryID.value = '';
    txtCategoryName.value = '';
    txtDescription.value = '';
    txtUrlImage.value = '';
    txtPrice.value = '';
    txtStock.value = '';
    txtCategoryID.focus();
}
