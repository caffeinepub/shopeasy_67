# ShopEasy

## Current State
Frontend-only shopping site with cart, wishlist, filters, and a checkout form that simulates order placement without real payment processing. Backend is an empty actor.

## Requested Changes (Diff)

### Add
- Stripe payment integration so customers can pay with credit/debit cards at checkout
- Backend Stripe component for secure payment intent creation
- Stripe payment form in the checkout flow (card details entry)
- Order confirmation after successful payment

### Modify
- CheckoutModal: replace the mock "Place Order" button with a real Stripe payment form
- handlePlaceOrder: trigger Stripe payment, only clear cart on success

### Remove
- Nothing removed

## Implementation Plan
1. Select Stripe Caffeine component
2. Generate Motoko backend with Stripe payment intent creation endpoint
3. Update CheckoutModal to use Stripe Elements for card input and call backend to create payment intent
4. Show order confirmation on successful payment
