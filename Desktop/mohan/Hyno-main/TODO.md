# Task: Fix coupon application from offers page

## Problem
Coupons displayed on the home page are not applying correctly in checkout/cart because product prices are in USD but offer minimum orders are in INR.

## Changes Made
- [x] Updated `src/utils/currency.js` to properly convert USD to INR (rate: 83)
- [x] Modified `src/contexts/CartContext.js` getTotalPrice() to return total in INR
- [x] Verified offer validation logic in OfferContext.js

## Testing Required
- [ ] Test coupon application in cart page
- [ ] Test coupon application in checkout page
- [ ] Verify discount calculation is correct
- [ ] Check minimum order validation works
- [ ] Test with different offer types (percentage, fixed)

## Next Steps
- Run the application and test coupon functionality
- Verify offers display correctly on home page
- Ensure checkout process applies discounts properly
