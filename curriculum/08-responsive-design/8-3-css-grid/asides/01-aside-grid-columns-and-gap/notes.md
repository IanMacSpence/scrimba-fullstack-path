Setting display: grid
- margins no longer collapse
- Elements in a grid container become grid items
- grid items fall into place on the grid

- can get overlap issues with fixed width columns

Important patterns
I've learned this one before:
grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));

but the below is even more useful as it takes into account smaller screensizes and adjusts the pattern to make sure the columns fit on screens smaller than 500px too which makes it even more responsive and safer than the one above
grid-template-columns: repeat(auto-fit, minmax(min(500px, 100%), 1fr));

auto-fit vs auto-fill
in order to see the difference between auto-fit and autofill, you need a smaller number of grid-items. They look the same if there's more than one row of items, but if there's only one row, you can see that auto-fit will take up the entire row

auto-fill reserves extra space for columns, even if there isn't anything to fill the columns. 
auto-fit doesn't reserve extra space for columns if there aren't extra items and therefore fits the existing items to the container. so the container will only have as many columns as there are 

https://youtu.be/OZ6qKoq7RJU?t=694