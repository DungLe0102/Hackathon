const contactForm = document.getElementById('main-form');
const submit = document.getElementById('submit-form');
const success = document.querySelector('div.success');

// Các container của form
const containers = {
    'first-name': document.querySelector('div.first-name'),
    'last-name': document.querySelector('div.last-name'),
    'email': document.querySelector('div.email'),
    'query-type': document.querySelector('div.query-type'),
    'message': document.querySelector('div.message'),
    'contact-consent': document.querySelector('div.contact-consent-container')
};

submit.addEventListener('click', () => {
    let validFields = [];
    const contactFormData = new FormData(contactForm);

    contactFormData.forEach((value, key) => {
        const container = containers[key];
        if (key === 'email') {
            if (!value || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
                container.classList.add('error');
            } else {
                container.classList.remove('error');
                validFields.push(key);
            }
        } else if (!value && key !== 'query-type' && key !== 'contact-consent') {
            container.classList.add('error');
        } else {
            container.classList.remove('error');
            validFields.push(key);
        }
    });

    // Kiểm tra các trường bắt buộc
    ['query-type', 'contact-consent'].forEach(key => {
        const container = containers[key];
        if (!validFields.includes(key)) {
            container.classList.add('error');
        } else {
            container.classList.remove('error');
        }
    });

    // Kiểm tra thành công
    if (validFields.length === 6) {
        window.scroll({ top: 0, behavior: 'smooth' });
        success.classList.add('submitted');
        setTimeout(() => success.classList.remove('submitted'), 5000);
    }
});
