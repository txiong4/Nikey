

CREATE TABLE Account (
    userid   integer primary key  Auto_increment,
    username varchar(60) not null,
    password VARCHAR (60) NOT NULL
);
CREATE TABLE customers (
    customerid     INTEGER    Primary Key Auto_increment,
    customer_email VARCHAR (50) NOT NULL,
    customer_age   VARCHAR (25) NOT NULL,
    customer_Fname VARCHAR (20) NOT NULL,
    customer_Lname VARCHAR (20) NOT NULL,
    customer_Phone INT (11)     NOT NULL,
    userid      integer     NOT NULL,
    CONSTRAINT FK_userid FOREIGN KEY (
        userid
    )
    REFERENCES Account (userid) ON DELETE CASCADE
);
CREATE TABLE item (
    itemid        INTEGER      PRIMARY KEY AUTO_INCREMENT,
    item_name     VARCHAR (30) NOT NULL,
    item_price    VARCHAR (80) NOT NULL,
    item_warranty CHAR (1)

);
CREATE TABLE orders (
    orderid    INTEGER  PRIMARY KEY AUTO_INCREMENT,
    userid     integer    NOT NULL,
    itemid     Integer    NOT NULL,
    customerid Integer    NOT NULL,
    CONSTRAINT FK_userid2 FOREIGN KEY (
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