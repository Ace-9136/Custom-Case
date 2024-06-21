# Custom Case Ecommerce Platform

Custom Case is an ecommerce platform that allows users to customize phone cases by uploading images. This README provides an overview of the project, its features, and setup instructions.

## Features

- **User Authentication**: Secure authentication system for users and administrators.
- **Customization**: Users can upload images to create personalized phone cases.
- **Admin Dashboard**: Dashboard for administrators to manage orders, products, and users.
- **Payment Integration**: PayPal integration for secure and convenient payments.
- **Responsive Design**: Mobile-friendly design using Tailwind CSS for seamless user experience.
- **Database**: PostgreSQL database managed with Prisma ORM.

## Tech Stack

- **Frontend**: Next.js, Tailwind CSS
- **Backend**: NestJS (Tanstack)
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Payment**: PayPal

## Getting Started

To get a local copy of the project up and running, follow these steps:

### Prerequisites

- Node.js and npm installed on your machine
- PostgreSQL installed and running
- PayPal Developer account for API credentials
- Kinde auth user account for user authentication

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Ace-9136/Custom-Case
   cd Custom-case

2. Install dependencies:
   ```bash
   npm i
   
3. Set up environment variables:
Create a .env file in the root directory and add the following variables:
   ```bash
   check .env.example
   
4. Run database migrations:
   ```bash
   npx prisma migrate dev
   
5. Start the development server::
   ```bash
   npm run dev
6. Access the application at http://localhost:3000.



## Deployment
Vercel Link : https://custom-case-phi.vercel.app/

Use following Paypal credentials for demo user flow:

Username : sb-2qxjc31217849@business.example.com

Password: 9N9y/U7[

## Contributing
Contributions are welcome! Feel free to open issues and pull requests for bug fixes, features, or improvements.

## License
This project is licensed under the MIT License.

  
