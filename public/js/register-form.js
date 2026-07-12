const registerForm = document.getElementById("register-form");

if (registerForm) {
    const encodedServerErrors = registerForm.dataset.serverErrors || "";
    const serverErrors = encodedServerErrors
        ? JSON.parse(decodeURIComponent(encodedServerErrors))
        : [];

    if (serverErrors.length > 0) {
        alert(serverErrors.join("\n"));
    }

    registerForm.addEventListener("submit", (event) => {
        const invalidFields = Array.from(registerForm.querySelectorAll(":invalid"));

        if (invalidFields.length === 0) {
            return;
        }

        event.preventDefault();

        const messages = invalidFields.map((field) => {
            const label = registerForm.querySelector(`label[for="${field.id}"]`);
            const fieldName = label ? label.textContent.trim() : field.name;

            if (field.validity.valueMissing) {
                return `${fieldName} is required.`;
            }

            if (field.validity.typeMismatch && field.type === "email") {
                return "Please enter a valid email address.";
            }

            return `${fieldName} is invalid.`;
        });

        alert([...new Set(messages)].join("\n"));
        invalidFields[0].focus();
        registerForm.reportValidity();
    });
}
