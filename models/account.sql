CREATE TABLE Account (
    userid   varchar(50) Primary Key ,
    password VARCHAR (60) NOT NULL
);
CREATE TABLE customers (
    customerid     INTEGER    Primary Key Autoincrement,
    customer_email VARCHAR (50) NOT NULL,
    customer_age   VARCHAR (25) NOT NULL,
    customer_Fname VARCHAR (20) NOT NULL,
    customer_Lname VARCHAR (20) NOT NULL,
    customer_Phone INT (11)     NOT NULL,
    userid                      NOT NULL,
    CONSTRAINT FK_userid FOREIGN KEY (
        userid
    )
    REFERENCES Account (userid) ON DELETE CASCADE
);
CREATE TABLE item (
    itemid        INTEGER      PRIMARY KEY AUTOINCREMENT,
    item_name     VARCHAR (30) NOT NULL,
    item_price    VARCHAR (80) NOT NULL,
    item_warranty CHAR (1)

);
CREATE TABLE orders (
    orderid    INTEGER  PRIMARY KEY AUTOINCREMENT,
    userid         NOT NULL,
    itemid         NOT NULL,
    customerid     NOT NULL,
    CONSTRAINT FK_userid FOREIGN KEY (
        userid
    )
    REFERENCES account (userid) ON DELETE CASCADE,
    CONSTRAINT FK_customerid FOREIGN KEY (
        customerid
    )
    REFERENCES customers (customerid) ON DELETE CASCADE,
    CONSTRAINT FK_itemid FOREIGN KEY (
        itemid
    )
    REFERENCES item (itemid) ON DELETE CASCADE
);