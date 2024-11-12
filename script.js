document.addEventListener("DOMContentLoaded", () => {
  // Cargo el archivo XML desde la URL
  fetch('https://raw.githubusercontent.com/ivansimmer/CartaRestaurante/main/subida_github/data.xml')
    .then(response => response.text())
    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    .then(data => {
      // Recorre cada grupo que encuentra en el XML
      const grups = data.getElementsByTagName("GRUP");
      for (let i = 0; i < grups.length; i++) {
        const grup = grups[i];
        
        // Obtiene el nombre del grupo y determina la seccion a la que pertenece
        const nomGrup = grup.getElementsByTagName("NOM")[0].textContent;
        let sectionId;
        if (nomGrup === "Entrantes") sectionId = "entrantes";
        else if (nomGrup === "Platos Principales") sectionId = "platos-principales";
        else if (nomGrup === "Postres") sectionId = "postres";

        const section = document.getElementById(sectionId).querySelector("ul");

        // Recorre a traves de los platos del grupo
        const plats = grup.getElementsByTagName("PLAT");
        for (let j = 0; j < plats.length; j++) {
          const plat = plats[j];

          // Crea un elemento de tipo lista para cada plato que encuentra
          const li = document.createElement("li");

          // Crea un contenedor para el plato con display flex
          const itemContainer = document.createElement("div");
          itemContainer.classList.add("menu-item");

          // Añade la imagen del plato
          const img = document.createElement("img");
          img.src = plat.getElementsByTagName("IMATGE")[0].textContent;
          img.alt = plat.getElementsByTagName("NOM")[0].textContent;
          itemContainer.appendChild(img);

          // Crea un div para los detalles del plato
          const detailsDiv = document.createElement("div");
          detailsDiv.classList.add("menu-item-details");

          // Añade el nombre del plato
          const platName = document.createElement("h3");
          platName.textContent = plat.getElementsByTagName("NOM")[0].textContent;
          detailsDiv.appendChild(platName);

          // Añade la descripción del plato
          const description = document.createElement("p");
          description.classList.add("description");
          description.textContent = plat.getElementsByTagName("DESCRIPCIO")[0].textContent;
          detailsDiv.appendChild(description);

          // Añade el precio del plato
          const price = document.createElement("span");
          price.classList.add("price");
          price.textContent = `${plat.getElementsByTagName("PREU")[0].textContent}€`;
          detailsDiv.appendChild(price);

          // Añade los detalles al contenedor del plato
          itemContainer.appendChild(detailsDiv);

          // Añade el contenedor del plato a la lista
          li.appendChild(itemContainer);
          section.appendChild(li);
        }
      }
    })
    .catch(error => console.error("Error al cargar el XML:", error));
});
