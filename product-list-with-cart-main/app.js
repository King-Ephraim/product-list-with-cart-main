const jsonFiles = await fetch('./data.json');
const data = await jsonFiles.json();

let totalOrderPrice = 0 ;
let totalOrderCourses = 0 ;

function getProducts(pieces) {
    for (let i = 0; i < pieces.length; i++) {

        const menu = pieces[i];

        const sectionProduits = document.querySelector('.products');

        // creation d'une balise dedié pour chaque menu 
        const pieceMenu = document.createElement('article');
        // ajout de l'image
        const imageMenu = document.createElement('img');
        imageMenu.src = menu.image.tablet;
        // ajout de la categorie
        const categorieMenu = document.createElement('p');
        categorieMenu.innerText = menu.category;
        // ajout du nom
        const nomMenu = document.createElement('h3');
        nomMenu.innerText = menu.name;
        // creer une div pour contenir les prix
        const prixContainer = document.createElement('div');
        prixContainer.classList.add('price');
        // creer une balise p pour le prix
        const prixMenu = document.createElement('p');
        // ajout du prix
        prixMenu.innerText = `$${menu.price}`;

        // creer une div pour contenir les boutons 
        const btnContainer = document.createElement('div');
        btnContainer.classList.add('btn');

        // creer un bouton pour ajouter au panier
        const btn = document.createElement('button');
        // on ajoute dans le meme espace que le button un svg
        const imageSvg = document.createElement("img");
        imageSvg.src = menu.image.svg;
        imageSvg.style.position = "relative";
        imageSvg.style.top = "2px";
        //btn.appendChild(imagesvg);
        btn.innerHTML = imageSvg.outerHTML + " " + " " + " " + " Add to cart";

        // gestion carte
        const cart = document.querySelector('.cart')
        btn.addEventListener('click', () => {

            const svgMinus = document.createElement("img");
            svgMinus.src = menu.image.svgMinus;
            svgMinus.classList.add('svgMoins-button')

            const svgPlus = document.createElement('img');
            svgPlus.src = menu.image.svgPlus;
            svgPlus.classList.add('svgPlus-button')

            const number = document.createElement('p');
            number.innerText = menu.image.number;
            number.style.position = "relative";
            number.style.top = "2px";
            number.style.color = "#fff"

            btn.style.display = "none"

            const newButtonContainer = document.createElement('div');
            newButtonContainer.classList.add('newBtn');

            const newButton = document.createElement('button');
            newButton.classList.add('newButton');

            newButton.style.backgroundColor = "hsl(14, 86%, 42%)"; 
            newButton.style.color = "white";
            newButton.style.border = "none";
            newButton.style.padding = "10px 53px";
            newButton.style.textAlign = "center";
            newButton.style.textDecoration = "none";
            newButton.style.display = "inline-block";
            newButton.style.fontSize = "16px";
            newButton.style.margin = "4px 2px";
            newButton.style.cursor = "pointer";
            newButton.style.display = "flex"

            imageMenu.style.border = "2px solid hsl(14, 86%, 42%)"

            newButton.appendChild(svgMinus);
            newButton.appendChild(number);
            newButton.appendChild(svgPlus);

            newButtonContainer.appendChild(newButton);

            btnContainer.appendChild(newButtonContainer);

            // gerer les clics sur les boutons decrements et increments
            const courses = document.getElementById('courses')
            let numberConvert = parseInt(number.textContent)
            //let panierAjout = 0
            svgMinus.addEventListener('click', () => {
                if (numberConvert <= 0) {
                    numberConvert = 0
                    number.innerText = numberConvert
                    //panierAjout = 0
                    courses.innerHTML = `${"(" + totalOrderCourses + ")"}`
                } else {
                    numberConvert--
                    number.innerText = numberConvert
                    //panierAjout--
                    totalOrderCourses -= 1
                    courses.innerHTML = `${"(" + totalOrderCourses + ")"}`
                    getTotalpay.innerText = ("$" + menu.price * numberConvert)
                    getQuantity.innerText = `x${numberConvert}`

                    totalOrderPrice -= menu.price
                    allSold.innerHTML = `$${totalOrderPrice}`
                }
            })

            svgPlus.addEventListener('click', () => {
                numberConvert++
                number.innerText = numberConvert
                //panierAjout++
                totalOrderCourses += 1
                courses.innerHTML = `${"(" + totalOrderCourses + ")"}`
                getTotalpay.innerText = ("$" + menu.price * numberConvert)
                getQuantity.innerText = `x${numberConvert}`

                totalOrderPrice += menu.price
                allSold.innerHTML = `$${totalOrderPrice}`
            })

            // gestion de la session cart

            const Content = document.querySelector('.disabledContent')
            // recuperer le button cart pour l'activer au moment de choix
            const cartButton = document.querySelector('.buttonCart')
            const cnCart = document.querySelector('.cnCart')
            // faire partir la partie disable au clic
            Content.style.display = 'none'


            //alert(`Added to cart: ${menu.name}`);
            //cree une div pour ajouter le noms de chaque menu au clic
            const bigDiv = document.createElement('div')
            bigDiv.classList.add('bigDiv')
            const listAdded = document.createElement('div')
            const hr = document.createElement('hr')
            hr.style.width = "40vh"
            const getMenuName = document.createElement('h5')
            getMenuName.innerText = menu.name
            getMenuName.style.marginTop = "10px"
            const PriceContainer = document.createElement('div')
            PriceContainer.classList.add('price')
            const getMenuPrice = document.createElement('p')
            getMenuPrice.innerText = `@$${menu.price}`
            getMenuPrice.style.fontSize = "13px"
            const getTotalpay = document.createElement('h5')
            getTotalpay.innerText = ("$" + menu.price * numberConvert)
            const getQuantity = document.createElement('h6')
            getQuantity.style.color = "hsl(14, 86%, 42%)"
            getQuantity.innerText = `x${numberConvert}`
            

            // crre une div pour contenir le button de suppression du menu
            const delDiv = document.createElement('div')
            delDiv.classList.add('delDiv')
            const svgDelete = document.createElement('img')
            svgDelete.src = menu.image.svgRemove

            const deleteBtn = document.createElement('button')
            deleteBtn.appendChild(svgDelete)
            delDiv.appendChild(deleteBtn)

            deleteBtn.addEventListener('click', () => {
                cart.removeChild(bigDiv)
                //numberConvert = 0
                //number.innerText = numberConvert
                panierAjout = 0
                courses.innerHTML = `${"(" + panierAjout + ")"}`
                getTotalpay.innerText = ("$" + menu.price * numberConvert)
                getQuantity.innerText = `x${numberConvert}`
                btn.style.display = "block"
                imageMenu.style.border = "none"
                newButton.style.display = "none"   
                totalOrderPrice -= menu.price * numberConvert
                allSold.innerHTML = `$${totalOrderPrice}`    
                if(totalOrderPrice === 0){
                    totalSold.style.display = "none"
                }
            })
            // ajout des elements dans la div
            PriceContainer.appendChild(getQuantity)
            PriceContainer.appendChild(getMenuPrice)
            PriceContainer.appendChild(getTotalpay)
            listAdded.appendChild(getMenuName)
            listAdded.appendChild(PriceContainer)
            listAdded.appendChild(hr)
            bigDiv.appendChild(listAdded)
            bigDiv.appendChild(delDiv)

            const totalSold = document.querySelector('.totalSoldDiv')
            totalSold.style.display = "flex"

            const allSold = document.getElementById('getAllSold')
            //allSold.innerHTML = `$${totalOrderPrice}`


            cart.appendChild(bigDiv)
            

            cart.insertBefore(bigDiv, totalSold);
            cartButton.style.display = "block"
            cnCart.style.display = "flex"

            // gestion pour la confirmation de la commande
            const confirmOrder = document.querySelector('.confirmOrder')
            cartButton.addEventListener('click', () => {
                confirmOrder.style.display = "block"

                // creer une grande div pour contenrer tous les elements de la commande
                const bigOrderDiv = document.createElement('div')
                bigOrderDiv.classList.add('bigOrderDiv')

                const listAddedOrder = document.createElement('div')
                listAddedOrder.classList.add('listAddedOrder')

                // creer une div pour stocker l'image des menus
                const imageOrderDiv = document.createElement('div')
                imageOrderDiv.classList.add('imageOrderDiv')
                const imageOrder = document.createElement('img')
                imageOrder.src = menu.image.thumbnail
                imageOrderDiv.appendChild(imageOrder)
                // creer une div pour le nom du menu , la quantite et le prix
                const nameOrderDiv = document.createElement('div')
                const nameOrder = document.createElement('h5')
                nameOrder.innerText = menu.name
                nameOrder.style.fontSize = "11px"
                const  priceOrderContainer = document.createElement('div')
                priceOrderContainer.classList.add('priceOrderContainer')
                const quantityOrder = document.createElement('h6')
                quantityOrder.innerText = `x${numberConvert}`
                quantityOrder.style.color = "hsl(14, 86%, 42%)"
                const priceOrder = document.createElement('p')
                priceOrder.innerText = `@$${menu.price}`
                priceOrder.style.fontSize = "12px"
                // div pour le prix total 
                const priceOrderTotalContainer = document.createElement('div')
                priceOrderTotalContainer.classList.add('priceOrderTotalContainer')
                const priceOrderTotal = document.createElement('h4')
                priceOrderTotal.style.color = "hsl(14, 65%, 9%)"
                priceOrderTotal.innerText = `$${menu.price * numberConvert}`
                const orderHr = document.createElement('hr')
                orderHr.classList.add('orderHr')
                orderHr.style.width = "40vh"
                nameOrderDiv.appendChild(nameOrder)
                nameOrderDiv.appendChild(priceOrderContainer)
                priceOrderContainer.appendChild(quantityOrder)
                priceOrderContainer.appendChild(priceOrder)
                // ajout des elements dans la div
                priceOrderTotalContainer.appendChild(priceOrderTotal)

                const specialDiv = document.createElement('div')
                specialDiv.classList.add('specialDiv')
                
                specialDiv.appendChild(imageOrderDiv)
                specialDiv.appendChild(nameOrderDiv)
                specialDiv.appendChild(priceOrderTotalContainer)
                

                //bigOrderDiv.appendChild(imageOrderDiv)
                //bigOrderDiv.appendChild(nameOrderDiv)
                listAddedOrder.appendChild(specialDiv)
                listAddedOrder.appendChild(orderHr)
                bigOrderDiv.appendChild(listAddedOrder)

                //bigOrderDiv.appendChild(priceOrderTotalContainer)

                const orderConfirmContainer = document.querySelector('.orderConfirmContainer')
                orderConfirmContainer.appendChild(bigOrderDiv)

                // recuperer le button startNewOrder
                const startNewOrder = document.querySelector('.startNewOrder button')

                startNewOrder.addEventListener('click', () => {
                    // fonction pour actualiser la page
                    location.reload()
                })
                

            })
        })

        // on rattache la balise article a la setion Products
        sectionProduits.appendChild(pieceMenu);
        // on rattache l'image a la balise article
        pieceMenu.appendChild(imageMenu);
        btnContainer.appendChild(btn);
        pieceMenu.appendChild(btnContainer);
        pieceMenu.appendChild(categorieMenu);
        pieceMenu.appendChild(nomMenu);
        prixContainer.appendChild(prixMenu);
        pieceMenu.appendChild(prixContainer);

    }

}

getProducts(data);