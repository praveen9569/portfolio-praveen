# Portfolio Website with React and Tailwind CSS

## Overview
This is a modern portfolio website built with React and Tailwind CSS. It features a responsive design, smooth animations, and a contact form that uses EmailJS to send emails without requiring a backend server.

## Features
- Responsive design that works on all devices
- Modern UI with smooth animations
- Sections for About, Skills, Projects, and Contact
- Contact form with EmailJS integration
- Dark theme with customizable colors

## Getting Started

### Prerequisites
- Node.js (v14 or later)
- npm or yarn

### Installation
1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```

## Setting Up EmailJS for the Contact Form

The contact form uses EmailJS to send emails without a backend. Follow these steps to set it up:

1. Create a free account at [EmailJS](https://www.emailjs.com/)
2. Create a new Email Service in your EmailJS dashboard
   - Go to "Email Services" tab
   - Click "Add New Service"
   - Choose your email provider (Gmail, Outlook, etc.)
   - Follow the instructions to connect your email account
3. Create an Email Template
   - Go to "Email Templates" tab
   - Click "Create New Template"
   - Design your email template using the following variables:
     - `{{from_name}}` - Sender's name
     - `{{from_email}}` - Sender's email
     - `{{subject}}` - Email subject
     - `{{message}}` - Email message
     - `{{to_email}}` - Your email address (kotavns@gmail.com)
4. Get your EmailJS credentials
   - Public Key: Found in your EmailJS dashboard under "Account" > "API Keys"
   - Service ID: Found in the Email Services tab next to your service name
   - Template ID: Found in the Email Templates tab next to your template name
5. Update the Contact component
   - Open `src/components/Contact.jsx`
   - Replace the placeholder values with your actual credentials:
     ```javascript
     // Initialize EmailJS with your public key
     emailjs.init('YOUR_PUBLIC_KEY'); // Replace with your actual public key
     
     // Send email using EmailJS
     emailjs.send(
       'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
       'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
       templateParams
     )
     ```

## Customization

### Changing Colors
You can customize the colors by editing the `tailwind.config.js` file:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#3490dc', // Change this to your preferred primary color
      secondary: '#ffed4a', // Change this to your preferred secondary color
      dark: '#242424', // Change this to your preferred dark color
    },
  },
},
```

### Adding Your Information
Update the content in each component to reflect your personal information, skills, and projects.

## Building for Production

To build the project for production, run:

```
npm run build
```

This will create a `dist` folder with optimized production files.

## Deployment

You can deploy this website to various platforms like Netlify, Vercel, or GitHub Pages.

### Example: Deploying to Netlify
1. Create a Netlify account
2. Connect your GitHub repository
3. Set the build command to `npm run build`
4. Set the publish directory to `dist`

## License
This project is open source 
