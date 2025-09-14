document.getElementById("contactForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    e.stopPropagation(); // Add this to prevent any parent handlers
    e.stopImmediatePropagation(); // Prevent other handlers on the same element

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const statusEl = document.getElementById("form-status");
    const submitBtn = document.querySelector("#contactForm button[type='submit']");
    const originalBtnText = submitBtn.textContent;

    // Disable button during submission to prevent multiple clicks
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    // Also disable the form itself to prevent any default behavior
    const form = e.target;
    form.style.pointerEvents = 'none';

    if (!name || !email || !message) {
        statusEl.textContent = "⚠️ Please fill in all fields.";
        statusEl.style.color = "red";

        // Re-enable form and button
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
        form.style.pointerEvents = 'auto';
        return;
    }

    statusEl.textContent = "⏳ Sending your message...";
    statusEl.style.color = "blue";

    try {
        // Add a small delay to ensure preventDefault is fully processed
        await new Promise(resolve => setTimeout(resolve, 50));

        const response = await fetch("/api/contact/send", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, message })
        });

        // Check if we got any response at all
        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        const textResponse = await response.text();
        let data = {};

        if (textResponse) {
            try {
                data = JSON.parse(textResponse);
            } catch (parseError) {
                throw new Error("Invalid response from server");
            }
        }

        if (!data.success) {
            throw new Error(data.error || "Failed to send email");
        }

        statusEl.textContent = "✅ Your message has been sent!";
        statusEl.style.color = "green";
        document.getElementById("contactForm").reset();

    } catch (err) {
        console.error("Form submission error:", err);

        if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
            statusEl.textContent = "❌ Network error. Please check your connection.";
        } else {
            statusEl.textContent = "❌ " + (err.message || "Failed to send message. Please try again.");
        }
        statusEl.style.color = "red";
    } finally {
        // Always re-enable form and button
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
        form.style.pointerEvents = 'auto';
    }

    // Return false to prevent default behavior (extra safety)
    return false;
});

// Add this to prevent any other event listeners from causing issues
document.getElementById("contactForm").addEventListener("click", function (e) {
    if (e.target.tagName === 'BUTTON' && e.target.type === 'submit') {
        e.stopPropagation();
    }
})
