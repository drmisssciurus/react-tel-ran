# Homework / Practical Task

Create a React application with TypeScript to demonstrate how props and state work using a shopping cart example.

The project must be created without Vite. You may use esbuild for building the project.

## Requirements:

### 1. Describe the product type

Create a `Product` type with the following fields:

```typescript
type Product = {
  id: number;
  title: string;
  price: number;
};
```

### 2. Create an array of products

Create a separate file with an array of products. Each product must have:

- a unique `id`;
- a title;
- a price.

### 3. Create the functional component version

Create a functional component `ProductCardFunction`. It should:

- receive a product through `props`;
- receive the product quantity through `props`;
- receive increase and decrease functions through `props`;
- display the product title, price, quantity, and total price for this product;
- contain `+` and `-` buttons.

Create a functional component `CartSummaryFunction`. It should:

- receive the total number of items through `props`;
- receive the total cart price through `props`;
- display the cart summary.

### 4. Create the class component version

Create a class component `ProductCardClass` that does the same thing as `ProductCardFunction`. The component should:

- extend `Component`;
- receive typed `props`;
- access data through `this.props`;
- return JSX from the `render()` method.

Create a class component `CartSummaryClass` that does the same thing as `CartSummaryFunction`.

### 5. Implement state in App

In the `App` component, create two independent states.

- The first state should be used only for the functional components.
- The second state should be used only for the class components.

That means:

- changing the product quantity in the functional version must not change the class version;
- changing the product quantity in the class version must not change the functional version.

### 6. Implement cart logic

You need to implement:

- increasing the product quantity;
- decreasing the product quantity;
- preventing the quantity from going below 0;
- calculating the total number of items;
- calculating the total cart price;
- a separate clear button for the functional cart;
- a separate clear button for the class cart.

### 7. Split the code into separate files

Organize the application into separate files.

### 8. Test the application

As a result, the page should contain two independent sections:

- Functional components;
- Class components.

Each section should display a list of products and a cart summary.

If you click `+` in the functional section, only the functional cart should change.
If you click `+` in the class section, only the class cart should change.

## Goal of the task

Practice:

- passing data through `props`;
- passing functions through `props`;
- working with `state`;
- typing `props` in `TypeScript`;
- understanding the difference between functional and class components;
- lifting state up to the parent component;
- working with independent states inside one application.
