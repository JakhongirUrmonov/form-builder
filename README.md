# Dynamic Form Builder

A flexible and customizable form builder built with React and TypeScript, allowing you to create forms dynamically based on configuration. This project enables you to easily define form fields, their types, validations, and layout without having to hard-code each form component.

![Project Status](https://img.shields.io/badge/status-active-brightgreen.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-blue.svg)
![React](https://img.shields.io/badge/React-18.2.0-blue.svg)
![Vite](https://img.shields.io/badge/Vite-4.4.0-purple.svg)

## Features

- **Dynamic Form Creation**: Create forms based on JSON configuration
- **Multiple Input Types**: Support for various input types:
  - Text input
  - Numeric input
  - Date picker
  - Checkbox
  - Radio buttons
  - Textarea
- **Validation Rules**:
  - Required fields
  - Pattern matching
  - Min/max length
  - Custom validation functions
- **Error Handling**:
  - Graceful error boundaries
  - Detailed error messages
  - Form-level validation
- **Customization**:
  - Custom form structure
  - Custom validation rules
  - Custom styling
- **Developer Experience**:
  - TypeScript support
  - Comprehensive logging
  - Environment configuration
  - Error boundaries

## Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher) or yarn
- Modern web browser

## Installation

1. Clone the repository:

```bash
git clone https://github.com/JakhongirUrmonov/form-builder.git
cd form-builder
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

4. Start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Configuration

### Form Configuration

Forms are defined using a JSON configuration. Here's an example:

```json
{
  "title": "User Registration",
  "inputs": [
    {
      "name": "username",
      "label": "Username",
      "type": "string",
      "validation": {
        "required": true,
        "pattern": "^[a-zA-Z0-9_]{3,20}$",
        "minLength": 3,
        "maxLength": 20
      }
    },
    {
      "name": "age",
      "label": "Age",
      "type": "numeric",
      "validation": {
        "required": true,
        "min": 18,
        "max": 100
      }
    }
  ],
  "buttons": [
    {
      "text": "Submit",
      "type": "submit"
    }
  ]
}
```

### Environment Configuration

The application supports various environment variables for configuration:

```env
# Application
VITE_APP_NAME=Dynamic Form Builder
VITE_APP_VERSION=$npm_package_version

# API Configuration
VITE_API_URL=http://localhost:3000/api
VITE_API_TIMEOUT=5000

# Feature Flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_LOGGING=true

# Development
VITE_ENABLE_DEVTOOLS=true
```

## Usage

### Basic Usage

```tsx
import React from "react";
import { DynamicForm } from "./components/formGenerator";
import { useFormState } from "./hooks/useFormState";

const App = () => {
  const { state, dispatch } = useFormState();
  const formConfig = {
    // Your form configuration here
  };

  return (
    <div>
      <DynamicForm formState={{ state, dispatch }} config={formConfig} />
    </div>
  );
};
```

### Custom Validation

```tsx
const customValidation = (value: string) => {
  if (value.length < 5) {
    return "Value must be at least 5 characters long";
  }
  return null;
};

const formConfig = {
  inputs: [
    {
      name: "customField",
      label: "Custom Field",
      type: "string",
      validation: {
        custom: customValidation,
      },
    },
  ],
};
```

## Development

### Project Structure

```
src/
├── components/         # React components
│   ├── common/        # Shared components
│   ├── formGenerator/ # Form-related components
│   └── configTab/     # Configuration UI components
├── hooks/             # Custom React hooks
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
├── constants/         # Application constants
└── assets/            # Static assets
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run test` - Run tests
- `npm run lint` - Run linter
- `npm run format` - Format code

### Testing

The project uses Jest and React Testing Library for testing. Run tests with:

```bash
npm test
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- React Team
- TypeScript Team
- Vite Team
- All contributors and users of this project
