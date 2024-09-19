This repository is for RAiD's software engineer technical assessment. This repo is created and done by Chiu Kai Yong
Website: https://www.kyong.xyz/

# Stack
**Back End**
- Node.js

**Front End**
- React

**Database**
- MongoDB

**Note**
When first loading of the web application, it might take up to 50 seconds for the page to load
This is hosted on Render with the free version where 15 minutes of inactivity will cause the backend to wind down. 

### User Stories fulfilled
Required
1) Customer is able to view the list of fruits available for purchase, with stock and pricing information.
2) Customer is able to keep track of the fruits and quantity that was shortlisted along with the amount for payment. 
3) Customer is able to submit the order for purchase once done shopping. 
4) Owner is able to see the orders that customers have purchased and submitted for fulfillment. 


### Optinal User Stories fulfilled
1) Owner is able to add new fruits and amend stock levels accordingly
2) Customer is able to log in and see order history
3) Customer is able to re-order a previous order for quick purchase 
4) Customer is able to shop on the phone as the layout will fit the screen. 
5) Customer is able to log in, shortlist saved and continue on another device
6) Owner is able to restrict what customers can or cannot see and amending things that they are not suppose to amend. 


## Run through program
# Customer account
1) When first entering the web app, the page **MIGHT** be loading as it is waiting for the backend server to spin up. 
2) As a guest to the web page, you will be able to see all the fruits that are available with pricing information and stock information. However, as a guest you are not able to add things into your cart. 
3) The guest can choose to 'Register' (top right corner) for an account if want to make purchases. 
4) Members can 'Login' (top right corner) to view their cart, order history and add items to their cart. 
5) Customers can view their short listed item in their cart (bottom right corner), also will be able to delete line items that the customer do not want anymore. In the cart, will display the chosen product name, quantity, unit price and sub total for that fruit. At the bottom of the cart, the customer will be able to see the total cost incurred in the cart. the Checkout is also in the cart, below the total cost.
6) At the checkout page, the customer can review their order first before placing Order. If they decided to add more things into their purchase, they can do so by clicking on cancel to bring them back to the main page. 
7) From the hompage, customer is able to view their purchase history by clicking on History(top left corner) to view their purchases and should they want to order again, they can just click on the button and they can choose to continue shopping or checkout right away. 

# Admin account
1) When the admin first log in, Admin will be able to see all the fruits that the shop owns and the owner can increase the stock or delete the item or their choice. 
2) Admin can click on 'Orders' to view all the orders placed by the customer and can click on the fulfill button to simulate a fulfillment of the purchase. Admin can also filter the orders by clicking on 'FULLFILLED' or 'NOT FULFILLED' to view the orders. 
3) From the homepage, admin can click on "ADD NEW" to add new products into the list by filling up the details in the page. 


## Accounts to log in to the web app
# Customer 
username: test1
password: test1

# Admin
username: admin
password: admin