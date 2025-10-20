# MGC Website

A responsive e-commerce website built with modern web technologies and integrated with Supabase for backend functionality.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Adding New Products](#adding-new-products)
- [Supabase Functions](#supabase-functions)
- [Contributing](#contributing)


## Overview

The MGC Website is a scalable e-commerce platform designed for easy maintenance and product management. The modular architecture allows for seamless updates and expansion of the product catalog.

## Features

- **Modular Navigation**: Separate HTML navigation component for improved scalability and maintenance
- **Responsive Design**: Bootstrap framework ensures optimal viewing across all devices
- **Dynamic Content**: jQuery integration for efficient DOM manipulation
- **Secure API Integration**: Supabase API keys protected through server-side implementation
- **Easy Product Management**: Streamlined process for adding and updating products

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript
- **Framework**: Bootstrap (responsive design)
- **Library**: jQuery (DOM manipulation)
- **Backend**: Supabase (database and authentication)

## Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Text editor or IDE (VS Code recommended)
- Supabase account and project

### Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd mgc-website
   ```

2. Edit the supabase API keys in the scrits in checkout.html

## Project Structure

```
mgc-website/
├── api/                  # API configuration and keys
├── css/                  # Stylesheets
├── js/                   # JavaScript files
├── components/           # Reusable HTML components (navbar, etc.)
├── index.html           # Main homepage
└── README.md            # Project documentation
```

## Adding New Products

Follow these steps to add a new product to the website:

1. **Update Product List**: Add the product details to the items array in the appropriate JavaScript file

2. **Customize Homepage**: Add the product display section to `index.html`
   - Copy an existing product template
   - Update product information (name, price, description, images)
   - Ensure proper class names for styling consistency

3. **Update Navigation**: Add the product to the navbar under the appropriate category column

4. **Database Entry**: Use the product updater function in Supabase to add the product to the database
   - Access Supabase dashboard
   - Use the updater function or manually insert the record

### Supabase Functions

1. View all current orders
2. fulfill order using order id
3. delete order using order id
4. update products list

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

For questions or support, please open an issue in the GitHub repository.