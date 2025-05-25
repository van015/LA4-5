// Assignment 5: Queueing System using Hash Function

// Simple hash function: sums character codes of name and uses modulo
function hashFunction(name) {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash += name.charCodeAt(i);
    }
    return hash % 10; // Simple modulo hash table size 10
}

// Initialize hash table (object)
let hashTable = {};

// Prepopulate with 5 customers
let initialCustomers = ["Elaine", "Althea", "Angelo", "Lito", "Engelbert"];
initialCustomers.forEach(name => {
    let key = hashFunction(name);
    while (hashTable[key] !== undefined) {
        key = (key + 1) % 10; // Linear probing
    }
    hashTable[key] = name;
});

console.log("Initial Hashed Table:", hashTable);

// Let a customer enter their name
let newCustomer = prompt("Enter customer name:");
let hashedIndex = hashFunction(newCustomer);

// Resolve collision with linear probing
while (hashTable[hashedIndex] !== undefined) {
    hashedIndex = (hashedIndex + 1) % 10;
}
hashTable[hashedIndex] = newCustomer;
alert(`${newCustomer}, you are customer number ${hashedIndex + 1}`);
console.log("Updated Hashed Table after new customer:", hashTable);

// Ask CSR to enter the number to be serviced
let serviceIndex = parseInt(prompt("Enter the customer number to be serviced:")) - 1;

// Validate and service
if (hashTable[serviceIndex] !== undefined) {
    let customer = hashTable[serviceIndex];
    alert(`Now servicing: ${customer}`);
    delete hashTable[serviceIndex]; // Remove from table
    console.log("Updated Hashed Table after servicing:", hashTable);
} else {
    alert("Invalid or already serviced customer number.");
}
