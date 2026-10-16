const petForm = document.getElementById("petForm");
const petList = document.getElementById("petList");

// Browser-ൽ save ചെയ്ത pets എടുക്കുന്നു
let pets = JSON.parse(localStorage.getItem("pets")) || [];

// എല്ലാ pets-ഉം website-ൽ കാണിക്കുന്നു
function displayPets() {
    petList.replaceChildren();

    pets.forEach(function(pet, index) {
        const card = document.createElement("div");
        card.className = "pet-card";

        const title = document.createElement("h3");
        title.textContent = "🐾 " + pet.name;

        const breed = document.createElement("p");
        breed.textContent = "Breed: " + pet.breed;

        const age = document.createElement("p");
        age.textContent = "Age: " + pet.age + " years";

        const type = document.createElement("p");
        type.textContent = "Type: " + pet.type;

        const button = document.createElement("button");
        button.textContent = pet.adopted ? "Adopted ❤️" : "Adopt Me";

        if (pet.adopted) {
            button.className = "adopted";
            button.disabled = true;
        } else {
            button.addEventListener("click", function() {
                adoptPet(index);
            });
        }

        card.append(title, breed, age, type, button);
        petList.appendChild(card);
    });
}

// Form submit ചെയ്യുമ്പോൾ pet add ചെയ്യുന്നു
petForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("petName").value.trim();
    const breed = document.getElementById("petBreed").value.trim();
    const age = document.getElementById("petAge").value;
    const type = document.getElementById("petType").value;

    if (!name || !breed || age === "" || Number(age) < 0 || !type) {
        alert("Please enter valid pet details!");
        return;
    }

    const pet = {
        name: name,
        breed: breed,
        age: Number(age),
        type: type,
        adopted: false
    };

    pets.push(pet);

    savePets();
    displayPets();
    petForm.reset();

    alert("Pet added successfully!");
});

// Pets browser-ൽ save ചെയ്യുന്നു
function savePets() {
    localStorage.setItem("pets", JSON.stringify(pets));
}

// Adopt button പ്രവർത്തിപ്പിക്കുന്നു
function adoptPet(index) {
    pets[index].adopted = true;

    savePets();
    displayPets();

    alert("You adopted " + pets[index].name + "!");
}

// Page തുറക്കുമ്പോൾ പഴയ pets കാണിക്കുന്നു
displayPets();