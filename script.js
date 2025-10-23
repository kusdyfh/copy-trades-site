document.addEventListener('DOMContentLoaded', function() {
    console.log('تم تحميل موقع نسخ الصفقات بنجاح');
});

function checkSubscription(email) {
    return localStorage.getItem('userEmail') === email;
}

function addSubscriber(email) {
    localStorage.setItem('userEmail', email);
    console.log(`تم إضافة المستخدم ${email} إلى قاعدة البيانات`);
}

function showMessage(message, type = 'info') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    messageDiv.textContent = message;
    
    messageDiv.style.padding = '1rem';
    messageDiv.style.margin = '1rem 0';
    messageDiv.style.borderRadius = '4px';
    
    if (type === 'success') {
        messageDiv.style.backgroundColor = '#d4edda';
        messageDiv.style.color = '#155724';
        messageDiv.style.border = '1px solid #c3e6cb';
    } else if (type === 'error') {
        messageDiv.style.backgroundColor = '#f8d7da';
        messageDiv.style.color = '#721c24';
        messageDiv.style.border = '1px solid #f5c6cb';
    } else {
        messageDiv.style.backgroundColor = '#d1ecf1';
        messageDiv.style.color = '#0c5460';
        messageDiv.style.border = '1px solid #bee5eb';
    }
    
    document.body.insertBefore(messageDiv, document.body.firstChild);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}
