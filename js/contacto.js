/*
    CRUD JS & FIREBASE para Contactos
    01/08/2023
*/

"use strict";

// Inicialización de Firebase (asegúrate de tener esta parte sólo una vez en todo tu proyecto)
const db = firebase.firestore();

// Colección para Contactos
const coleccionContactos = "Contactos";

// Referencia a elementos del DOM
const contactForm = document.querySelector("#contactForm");
const contactTable = document.querySelector("#contactTable>tbody");

/* FUNCIONES CRUD PARA CONTACTOS */

const findAllContacts = () => db.collection(coleccionContactos).get();

const insertContact = (contactData) =>
  db.collection(coleccionContactos).doc().set(contactData);

const deleteContact = (paramId) => db.collection(coleccionContactos).doc(paramId).delete();

// Obtener todos los contactos y mostrarlos en una tabla
window.addEventListener("load", async () => {
    await findAllContacts().then((query) => {
        contactTable.innerHTML = "";
        
        query.forEach((documento) => {
            let contacto = documento.data();
            contactTable.innerHTML += `
                <tr>
                    <td>${contacto.nombre}</td>
                    <td>${contacto.email}</td>
                    <td>${contacto.mensaje}</td>
                    <td>
                        <button class="btn btn-danger btn-borrar mx-1" data-id="${documento.id}">Borrar</button>
                    </td>
                </tr>
            `;
        });

        // Funcionalidad para botones de borrar
        const btnBorrar = document.querySelectorAll(".btn-borrar");
        btnBorrar.forEach((btn) => {
            btn.addEventListener("click", async (ev) => {
                if (confirm("Desea borrar el registro de contacto?")) {
                    await deleteContact(ev.target.dataset.id);
                    Toastify({
                        text: "Contacto eliminado exitosamente!",
                        duration: 3000
                    }).showToast();
                }
            });
        });
    });
});

// Evento submit para el formulario de contacto
contactForm.addEventListener("submit", async (ev) => {
    ev.preventDefault();

    let nombreContacto = contactForm.txtNombreContacto.value;
    let emailContacto = contactForm.txtEmailContacto.value;
    let mensajeContacto = contactForm.txtMensajeContacto.value;
    
    await insertContact({ nombre: nombreContacto, email: emailContacto, mensaje: mensajeContacto });
    
    Toastify({
        text: "Mensaje de contacto enviado correctamente",
        duration: 3000
    }).showToast();

    contactForm.reset();
});

