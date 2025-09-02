// scripts.js
document.addEventListener('DOMContentLoaded', function() {
    // Modal functionality
    const modal = document.getElementById('inquiryModal');
    const openFormBtn = document.getElementById('openFormBtn');
    const closeBtn = document.querySelector('.close');
    
    if (openFormBtn) {
        openFormBtn.addEventListener('click', function() {
            modal.style.display = 'block';
        });
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Form submission
    const inquiryForm = document.getElementById('inquiryForm');
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // In a real application, you would send the form data to a server
            alert('Thank you for your inquiry! We will contact you shortly.');
            modal.style.display = 'none';
            inquiryForm.reset();
        });
    }
    
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
            mobileMenuBtn.classList.toggle('active');
        });
    }
});