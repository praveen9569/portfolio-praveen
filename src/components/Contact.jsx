import { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' });
  const sectionRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100');
          entry.target.classList.remove('translate-y-10');
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
      }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Initialize EmailJS with your public key
    emailjs.init('YOUR_PUBLIC_KEY'); // Replace with your actual public key
    
    // Prepare template parameters
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
      to_email: 'kotavns@gmail.com', // Your email address
    };
    
    // Send email using EmailJS
    emailjs.send(
      'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
      'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
      templateParams
    )
    .then(() => {
      setIsSubmitting(false);
      setSubmitMessage({
        type: 'success',
        text: 'Thank you for your message! I will get back to you soon.'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitMessage({ type: '', text: '' });
      }, 5000);
    })
    .catch((error) => {
      console.error('Email sending failed:', error);
      setIsSubmitting(false);
      setSubmitMessage({
        type: 'error',
        text: 'Failed to send message. Please try again later.'
      });
    });
  };

  return (
    <section id="contact" className="py-20 bg-black">
      <div 
        ref={sectionRef} 
        className="container mx-auto px-4 opacity-0 translate-y-10 transition-all duration-1000 ease-out"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto"></div>
          <p className="text-gray-300 max-w-2xl mx-auto mt-6">
            Have a project in mind or want to discuss potential opportunities? 
            Feel free to reach out using the form below or through my social media channels.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-dark/50 backdrop-blur-lg rounded-xl p-8 border border-gray-800">
            <h3 className="text-2xl font-bold mb-6 text-white">Send Me a <span className="text-primary">Message</span></h3>
            
            {submitMessage.text && (
              <div className={`p-4 mb-6 rounded-lg ${submitMessage.type === 'success' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                {submitMessage.text}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="name" className="block text-gray-300 mb-2">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-dark/70 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors duration-300"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-300 mb-2">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-dark/70 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors duration-300"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="subject" className="block text-gray-300 mb-2">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-dark/70 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors duration-300"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-300 mb-2">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full bg-dark/70 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors duration-300 resize-none"
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-primary text-white font-medium rounded-full hover:bg-primary/80 transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none w-full sm:w-auto"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : 'Send Message'}
              </button>
            </form>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-6 text-white">Contact <span className="text-primary">Information</span></h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-primary/20 p-3 rounded-lg mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-white mb-1">Email</h4>
                  <a href="mailto:kotavns@gmail.com" className="text-gray-300 hover:text-primary transition-colors duration-300">kotavns@gmail.com</a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/20 p-3 rounded-lg mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-white mb-1">Location</h4>
                  <p className="text-gray-300">Ghaziabad, India</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/20 p-3 rounded-lg mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-white mb-1">Working Hours</h4>
                  <p className="text-gray-300">Monday - Friday: 9AM - 5PM</p>
                </div>
              </div>
            </div>
            
            <div className="mt-10">
              <h4 className="text-lg font-medium text-white mb-4">Follow Me</h4>
              <div className="flex space-x-4">
                <a href="#" className="bg-dark/70 border border-gray-700 p-3 rounded-full text-gray-300 hover:text-primary hover:border-primary transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                  </svg>
                </a>
                <a href="#" className="bg-dark/70 border border-gray-700 p-3 rounded-full text-gray-300 hover:text-primary hover:border-primary transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.066 9.645c.183 4.04-2.83 8.544-8.164 8.544-1.622 0-3.131-.476-4.402-1.291 1.524.18 3.045-.244 4.252-1.189-1.256-.023-2.317-.854-2.684-1.995.451.086.895.061 1.298-.049-1.381-.278-2.335-1.522-2.304-2.853.388.215.83.344 1.301.359-1.279-.855-1.641-2.544-.889-3.835 1.416 1.738 3.533 2.881 5.92 3.001-.419-1.796.944-3.527 2.799-3.527.825 0 1.572.349 2.096.907.654-.128 1.27-.368 1.824-.697-.215.671-.67 1.233-1.263 1.589.581-.07 1.135-.224 1.649-.453-.384.578-.87 1.084-1.433 1.489z"/>
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/praveen-nishad-4669a0258/" className="bg-dark/70 border border-gray-700 p-3 rounded-full text-gray-300 hover:text-primary hover:border-primary transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"/>
                  </svg>
                </a>
                <a href="#" className="bg-dark/70 border border-gray-700 p-3 rounded-full text-gray-300 hover:text-primary hover:border-primary transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.441 16.892c-2.102.144-6.784.144-8.883 0-2.276-.156-2.541-1.27-2.558-4.892.017-3.629.285-4.736 2.558-4.892 2.099-.144 6.782-.144 8.883 0 2.277.156 2.541 1.27 2.559 4.892-.018 3.629-.285 4.736-2.559 4.892zm-6.441-7.234l4.917 2.338-4.917 2.346v-4.684z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;