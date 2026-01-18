-- Query 1: Insert a new record into the account table
INSERT INTO public.account (
	account_firstname, 
	account_lastname, 
	account_email, 
	account_password
)
VALUES (
	'Tony', 
	'Stark', 
	'tony@starkent.com', 
	'Iam1ronM@n'
);

-- Query 2: Modify the Tony Stark record to change the account_type to "Admin"
UPDATE public.account 
SET account_type = 'Admin' 
WHERE account_email = 'tony@starkent.com';

-- Query 3: Delete the Tony Stark record from the database
DELETE FROM public.account 
WHERE account_email = 'tony@starkent.com';

-- Query 4: Modify the "GM Hummer" record to read "a huge interior" rather than "small interiors"
UPDATE public.inventory 
SET inv_description = REPLACE(inv_description, 'small interiors', 'a huge interior') 
WHERE inv_make = 'GM' AND inv_model = 'Hummer';

-- Query 5: Inner join to select make and model fields... for the "Sport" category
SELECT 
	inv_make, 
	inv_model, 
	classification_name 
FROM public.inventory 
INNER JOIN public.classification 
	ON inventory.classification_id = classification.classification_id 
WHERE classification_name = 'Sport';

-- Query 6: Update all records to add "/vehicles" to the file path
UPDATE public.inventory 
SET 
	inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'), 
	inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');