
-- Task 1: Insert new record
/*INSERT INTO public.account (account_firstname, account_lastname, account_email, account_password, account_type)

VALUES ('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n', 'Admin');

-- Task 2: Modify Tony Stark's account_type
UPDATE account 
SET account_type = 'Admin'
WHERE account_firstname = 'Tony' AND account_lastname = 'Stark';

-- Task 3: Delete Tony Stark's record
DELETE FROM account 
WHERE account_firstname = 'Tony' AND account_lastname = 'Stark';

-- Task 4: Modify "GM Hummer" record
UPDATE inventory
SET inv_description = REPLACE(inv_description, 'small interiors', 'a huge interior')
WHERE inv_make = 'GM' AND inv_model = 'Hummer';

-- Task 5: Inner join to select specific records
SELECT inv_make, inv_model, classification_name
FROM inventory
INNER JOIN classification ON inventory.classification_id = classification.classification_id
WHERE classification_name = 'Sport';

-- Task 6: Update all records in the inventory table
UPDATE inventory
SET inv_image = CONCAT('/images/vehicles/', SUBSTRING(inv_image, 9)),
   inv_thumbnail = CONCAT('/images/vehicles/', SUBSTRING(inv_thumbnail, 9));
*/

INSERT INTO public.account (
        account_firstname,
        account_lastname,
        account_email,
        account_password,
        account_type
    )
VALUES (
        'Tony',
        'Stark',
        'tony@starkent.com',
        'Iam1ronM@nTony',
        'Admin'
    );
    
-- Delete info
DELETE FROM public.account
where account_email = 'tony@starkent.com';

-- Update data
UPDATE public.inventory
SET inv_description = 'The Hummer gives you a huge interior with an engine to get you out of any muddy or rocky situation.'
WHERE inv_make = 'GM'
    AND inv_model = 'Hummer';

--inner join data
SELECT i.inv_make,
    i.inv_model,
    c.classification_name
FROM public.inventory AS i
    INNER JOIN public.classification AS c ON i.classification_id = c.classification_id
WHERE c.classification_name = 'Sport';

--update records
UPDATE public.inventory
SET inv_image = REPLACE(inv_image, '/images', '/vehicles/images'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images', '/vehicles/images');