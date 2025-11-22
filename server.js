// 1. Zaroori Libraries Ko Import Karna
// ...
const mongoose = require('mongoose'); 

// 1.1. Contact Model Ko Import Karein
const ContactSubmission = require('./ContactModel'); // <--- Nayi Line
// ...

// ... (Baaqi code aur routes, jismein koi change nahi hoga) ...

// API Route 3: Contact Form Ka Data Receive Karne Ke Liye (UPDATED)
app.post('/api/contact', async (req, res) => { // 'async' keyword zaroori hai
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: "Please tamam fields fill karen." });
    }

    try {
        // --- Naya DataBase Mein Save Karna ---
        const newSubmission = new ContactSubmission({ // Model ka istemaal karke naya document banaya
            name,
            email,
            message
        });

        const savedSubmission = await newSubmission.save(); // Document ko database mein save kiya
        // ------------------------------------

        console.log("--- Naya Contact Form Submission Saved ---");
        console.log("ID:", savedSubmission._id);
        console.log("----------------------------------------");

        res.status(201).json({ success: "Aapka message kamyabi se save ho gaya hai. Shukriya!" }); // 201 status for creation
    } catch (error) {
        console.error("Database mein save karte waqt error aaya:", error);
        res.status(500).json({ error: "Server error: Data save nahi ho saka." });
    }
});

// 5. Server Ko Start Karna
// ...


document.addEventListener('DOMContentLoaded', () => {
    // 1. Form element ko select karna
    const contactForm = document.querySelector('.contact-form');
    
    // Agar form page par मौजूद hai to aage badhein
    if (contactForm) {
        // 2. Form submit hone ke event ko sunna (listen)
        contactForm.addEventListener('submit', async (e) => {
            // Default form submission ko rokna (taake page reload na ho)
            e.preventDefault(); 
            
            // 3. Form se data jama karna (Gathering Data)
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // 4. Validation (Check karna ke koi field khali na ho)
            if (!name || !email || !message) {
                alert('Meherbani karke tamam fields pur (fill) karein.');
                return;
            }

            // 5. Data ko JSON format mein banana
            const submissionData = {
                name: name,
                email: email,
                message: message
            };

            // 6. Backend API par POST Request Bhejna
            try {
                // Aapka server 5000 port par chal raha hai
                const response = await fetch('http://localhost:5000/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json', // Bataana ke hum JSON data bhej rahe hain
                    },
                    body: JSON.stringify(submissionData) // Data ko JSON string mein convert karna
                });
                
                // 7. Server ke jawab (Response) ko handle karna
                const result = await response.json();

                if (response.ok) { // Agar response status 200 ya 201 hai (Success)
                    alert(result.success); // Success message dikhana
                    contactForm.reset(); // Form ko clear karna
                } else { // Agar server se error aaye (maslan 400 ya 500)
                    alert(`Error: ${result.error || 'Server ki taraf se koi masla hai.'}`);
                }

            } catch (error) {
                // Agar network ya connection mein koi masla ho
                console.error('Network Error:', error);
                alert('Connection error. Server tak pahunch nahi ho saki.');
            }
        });
    }
});