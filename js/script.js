// In this example, I want to create an interactive form that allows Newt Scamander create a sort of inventory of the Fantastic Beasts he's rescuing
// Here's what we'll need to do:
// 1. Grab the input a user enters into our form
// 2. Represent this input in a meaningful way, let's say an Object
// 3. Push the contents of that Object into an Array 
// 4. Reset our form so that the user can add a new creature if they want without having to manually delete the previous input
// 5. Display the new creature in our Array back to the user on our page

document.addEventListener("DOMContentLoaded", () => {
    const creatures = [];

    const addCreatureForm = document.getElementById("addCreatureForm");
    const creatureSanctuary = document.getElementById("creatureSanctuary");

    function getDefaultImage(type) {
        const images = {
            "Dragon": "img/dragon.jpg",
            "Phoenix": "img/Phoenix.jpg",
            "Unicorn": "img/unicorn.jpg",
            "Griffin": "img/griffin.jpg",
            "Mermaid": "img/mermaid.jpg"
        };
        
        if (!images[type]) {
            console.error(`Image not found for: ${type}`); 
        }
        
        return images[type] || "img/default.jpg"; 
    }
    

    // Handle form submission
    addCreatureForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("creatureName").value;
        const type = document.getElementById("creatureType").value;
        const habitat = document.getElementById("creatureHabitat").value;
        const imageUrl = getDefaultImage(type); // Automatically assign image
        const notes = prompt("Add notes about this creature (optional):");

        const creature = { name, type, habitat, imageUrl, notes };
        creatures.push(creature);
        displayCreatures();

        addCreatureForm.reset();
    });

    // Display creatures in the sanctuary
    function displayCreatures(filter = "") {
        creatureSanctuary.innerHTML = "";
        creatures.forEach((creature, index) => {
            if (
                filter &&
                !creature.name.toLowerCase().includes(filter.toLowerCase()) &&
                !creature.type.toLowerCase().includes(filter.toLowerCase())
            ) {
                return;
            }

            const creatureDiv = document.createElement("div");
            creatureDiv.classList.add("card", "mb-3");
            creatureDiv.style.padding = "10px";

            creatureDiv.innerHTML = `
                <h3>${creature.name}</h3>
                <p><strong>Type:</strong> ${creature.type}</p>
                <p><strong>Habitat:</strong> ${creature.habitat}</p>
                <img src="${creature.imageUrl}" alt="${creature.name}" style="width:100px;">
                <p><strong>Notes:</strong> ${creature.notes || "None"}</p>
                <button class="btn btn-danger btn-sm" onclick="removeCreature(${index})">Remove</button>
            `;

            creatureSanctuary.appendChild(creatureDiv);
        });
    }

    // Remove creature function
    window.removeCreature = function (index) {
        creatures.splice(index, 1);
        displayCreatures();
    };

    // Search functionality
    const searchBox = document.createElement("input");
    searchBox.type = "text";
    searchBox.placeholder = "Search by name or type...";
    searchBox.classList.add("form-control", "mb-3");
    searchBox.addEventListener("input", function () {
        displayCreatures(this.value);
    });

    document.querySelector(".container").insertBefore(searchBox, addCreatureForm);
});
