PGDMP             
            |            terion_billing %   12.18 (Ubuntu 12.18-0ubuntu0.20.04.1) %   12.18 (Ubuntu 12.18-0ubuntu0.20.04.1) �               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    20145    terion_billing    DATABASE     t   CREATE DATABASE terion_billing WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_IN' LC_CTYPE = 'en_IN';
    DROP DATABASE terion_billing;
                postgres    false            �            1255    20146    accesscontrol_log_trigger()    FUNCTION     �  CREATE FUNCTION public.accesscontrol_log_trigger() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
      INSERT INTO accesscontrol_log(distributer,product,invoicegenerator,userid,customer,staff,invoicepayslip,operation,last_updated_on,d_staff,last_updated_by)
	VALUES(NEW.distributer,NEW.product,NEW.invoicegenerator,NEW.userid,NEW.customer,NEW.staff,NEW.invoicepayslip,'insert',current_timestamp,NEW.d_staff,NEW.last_updated_by);
   
   ELSIF TG_OP = 'DELETE' THEN
       
        INSERT INTO accesscontrol_log(distributer,product,invoicegenerator,userid,customer,staff,invoicepayslip,operation,last_updated_on,d_staff,last_updated_by)
	VALUES(OLD.distributer,OLD.product,OLD.invoicegenerator,OLD.userid,OLD.customer,OLD.staff,OLD.invoicepayslip,'delete',current_timestamp,OLD.d_staff,OLD.last_updated_by);
     
	 ELSIF TG_OP = 'UPDATE' THEN
        INSERT INTO accesscontrol_log(distributer,product,invoicegenerator,userid,customer,staff,invoicepayslip,operation,last_updated_on,d_staff,last_updated_by)
	VALUES(NEW.distributer,NEW.product,NEW.invoicegenerator,NEW.userid,NEW.customer,NEW.staff,NEW.invoicepayslip,'update',current_timestamp,NEW.d_staff,NEW.last_updated_by);
       
   
		END IF;
    
    RETURN NEW;
END;
$$;
 2   DROP FUNCTION public.accesscontrol_log_trigger();
       public          postgres    false            �            1255    20147    credentials_log_trigger()    FUNCTION     M  CREATE FUNCTION public.credentials_log_trigger() RETURNS trigger
    LANGUAGE plpgsql
    AS $$

BEGIN
    IF TG_OP = 'INSERT' THEN
      INSERT INTO credentials_log(userid,username,password,lastupdatedby,operation,last_updated_on)
	VALUES(NEW.userid,NEW.username,NEW.password,NEW.lastupdatedby,'insert',current_timestamp);
   
   ELSIF TG_OP = 'DELETE' THEN
       
        INSERT INTO  credentials_log(userid,username,password,lastupdatedby,operation,last_updated_on)
	VALUES(OLD.userid,OLD.username,OLD.password,OLD.lastupdatedby,'delete',current_timestamp);

	 ELSIF TG_OP = 'UPDATE' THEN
        INSERT INTO  credentials_log(userid,username,password,lastupdatedby,operation,last_updated_on)
	VALUES(NEW.userid,NEW.username,NEW.password,NEW.lastupdatedby,'update',current_timestamp);
   
       
   
		END IF;
    
    RETURN NEW;
END;

$$;
 0   DROP FUNCTION public.credentials_log_trigger();
       public          postgres    false            �            1255    20148    invoice_log_trigger()    FUNCTION     B  CREATE FUNCTION public.invoice_log_trigger() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
	
BEGIN
    IF TG_OP = 'INSERT' THEN
      INSERT INTO invoice_log( invoiceid, senderid, receiverid, invoicedate, sendernotes,subtotal, discount, total, invoicestatus, last_updated_by, last_updated_on,operation)
	VALUES(NEW.invoiceid,NEW.senderid,NEW.receiverid,NEW.invoicedate,NEW.sendernotes,NEW.subtotal,NEW.discount,NEW.total,NEW.invoicestatus,NEW.lastupdatedby,NEW.last_updated_on,'insert');
   
   ELSIF TG_OP = 'DELETE' THEN
         INSERT INTO invoice_log( invoiceid, senderid, receiverid, invoicedate, sendernotes,subtotal, discount, total, invoicestatus, last_updated_by, last_updated_on,operation)
	VALUES(OLD.invoiceid,OLD.senderid,OLD.receiverid,OLD.invoicedate,OLD.sendernotes,OLD.subtotal,OLD.discount,OLD.total,OLD.invoicestatus,OLD.lastupdatedby,OLD.last_updated_on,'delete');  
       

	 ELSIF TG_OP = 'UPDATE' THEN
           INSERT INTO invoice_log( invoiceid, senderid, receiverid, invoicedate, sendernotes,subtotal, discount, total, invoicestatus, last_updated_by, last_updated_on,operation)
	VALUES(NEW.invoiceid,NEW.senderid,NEW.receiverid,NEW.invoicedate,NEW.sendernotes,NEW.subtotal,NEW.discount,NEW.total,NEW.invoicestatus,NEW.lastupdatedby,NEW.last_updated_on,'update');
       
   
		END IF;
    
    RETURN NEW;
END;

$$;
 ,   DROP FUNCTION public.invoice_log_trigger();
       public          postgres    false                       1255    20451    order_management_trigger()    FUNCTION     �  CREATE FUNCTION public.order_management_trigger() RETURNS trigger
    LANGUAGE plpgsql
    AS $$

BEGIN
    IF TG_OP = 'INSERT' THEN
      INSERT INTO public.order_management_log(
	product_id, product_price, cgst, sgst, quantity, total_amount, batch_no, order_date, receiverid, position_id, order_status, transaction_id, sender_id, payment_method, last_updated_by, order_id, upi_id, operation)
	VALUES (NEW.product_id, NEW.product_price, NEW.cgst, NEW.sgst, NEW.quantity, NEW.total_amount, NEW.batch_no, NEW.order_date, NEW.receiverid, NEW.position_id, NEW.order_status, NEW.transaction_id, NEW.sender_id, NEW.payment_method, NEW.last_updated_by, NEW.order_id, NEW.upi_id,'INSERTION');
   
   ELSIF TG_OP = 'DELETE' THEN
       
        INSERT INTO public.order_management_log(
	product_id, product_price, cgst, sgst, quantity, total_amount, batch_no, order_date, receiverid, position_id, order_status, transaction_id, sender_id, payment_method, last_updated_by, order_id, upi_id, operation)
	VALUES (OLD.product_id, OLD.product_price, OLD.cgst, OLD.sgst, OLD.quantity, OLD.total_amount, OLD.batch_no, OLD.order_date, OLD.receiverid, OLD.position_id, OLD.order_status, OLD.transaction_id, OLD.sender_id, OLD.payment_method, OLD.last_updated_by, OLD.order_id, OLD.upi_id,'DELETION');
   
	 ELSIF TG_OP = 'UPDATE' THEN
        INSERT INTO public.order_management_log(
	product_id, product_price, cgst, sgst, quantity, total_amount, batch_no, order_date, receiverid, position_id, order_status, transaction_id, sender_id, payment_method, last_updated_by, order_id, upi_id, operation)
	VALUES (NEW.product_id, NEW.product_price, NEW.cgst, NEW.sgst, NEW.quantity, NEW.total_amount, NEW.batch_no, NEW.order_date, NEW.receiverid, NEW.position_id, NEW.order_status, NEW.transaction_id, NEW.sender_id, NEW.payment_method, NEW.last_updated_by, NEW.order_id, NEW.upi_id,'UPDATION');
   
       
   
		END IF;
    
    RETURN NEW;
END;

$$;
 1   DROP FUNCTION public.order_management_trigger();
       public          postgres    false                       1255    20149    products_log_trigger()    FUNCTION     �  CREATE FUNCTION public.products_log_trigger() RETURNS trigger
    LANGUAGE plpgsql
    AS $$

BEGIN
    IF TG_OP = 'INSERT' THEN
	  INSERT INTO public.product_log(productid, quantity, priceperitem, last_updated_by, productname, belongsto, status, batchno, cgst, sgst,operation)
		VALUES(NEW.productid,NEW.quantity,NEW.priceperitem,NEW.last_updated_by,NEW.productname,NEW.belongsto,NEW.status,NEW.batchno,NEW.cgst,NEW.sgst,'insert');
   
   ELSIF TG_OP = 'DELETE' THEN
       
        INSERT INTO public.product_log(productid, quantity, priceperitem, last_updated_by, productname, belongsto, status, batchno, cgst, sgst,operation)
		VALUES(OLD.productid,OLD.quantity,OLD.priceperitem,OLD.last_updated_by,OLD.productname,OLD.belongsto,OLD.status,OLD.batchno,OLD.cgst,OLD.sgst,'delete');
   
	 ELSIF TG_OP = 'UPDATE' THEN
       INSERT INTO public.product_log(productid, quantity, priceperitem, last_updated_by, productname, belongsto, status, batchno, cgst, sgst,operation)
		VALUES(NEW.productid,NEW.quantity,NEW.priceperitem,NEW.last_updated_by,NEW.productname,NEW.belongsto,NEW.status,NEW.batchno,NEW.cgst,NEW.sgst,'update');
   
       
   
		END IF;
    
    RETURN NEW;
END;

$$;
 -   DROP FUNCTION public.products_log_trigger();
       public          postgres    false                       1255    20150    user_log_trigger()    FUNCTION     <
  CREATE FUNCTION public.user_log_trigger() RETURNS trigger
    LANGUAGE plpgsql
    AS $$

	
	

BEGIN
    IF TG_OP = 'INSERT' THEN
        INSERT INTO user_log(userid, email, phno, aadhar, pan, positionid, adminid, updatedby, status, userprofile, pstreetname, pdistrictid, pstateid, ppostalcode, cstreetname, cdistrictid, cstateid, cpostalcode,operation,organizationname,gstno,bussinesstype,fname,lname,upiid,bankname,bankaccno,passbookimg,accholdername,ifsccode,signature)
	VALUES( NEW.userid, NEW.email, NEW.phno, NEW.aadhar,NEW.pan, NEW.positionid, NEW.adminid, NEW.updatedby, NEW.status, NEW.userprofile, NEW.pstreetname, NEW.pdistrictid, NEW.pstateid, NEW.ppostalcode, NEW.cstreetname, NEW.cdistrictid, NEW.cstateid, NEW.cpostalcode,'insert',NEW.organizationname,NEW.gstnno,NEW.bussinesstype,NEW.fname,NEW.lname,NEW.upiid,NEW.bankname,NEW.bankaccno,NEW.passbookimg,NEW.accholdername,NEW.ifsccode,NEW.signature);
   
   ELSIF TG_OP = 'DELETE' THEN
        INSERT INTO user_log( userid, email, phno, aadhar, pan, positionid, adminid, updatedby, status, userprofile, pstreetname, pdistrictid, pstateid, ppostalcode, cstreetname, cdistrictid, cstateid, cpostalcode,operation,organizationname,gstno,bussinesstype,fname,lname,upiid,bankname,bankaccno,passbookimg,accholdername,ifsccode,signature)
	VALUES( OLD.userid, OLD.email, OLD.phno, OLD.aadhar,OLD.pan, OLD.positionid, OLD.adminid,OLD.updatedby, OLD.status, OLD.userprofile, OLD.pstreetname, OLD.pdistrictid, OLD.pstateid, OLD.ppostalcode, OLD.cstreetname, OLD.cdistrictid, OLD.cstateid, OLD.cpostalcode,'delete',OLD.organizationname,OLD.gstnno,OLD.bussinesstype,OLD.fname,OLD.lname,OLD.upiid,OLD.bankname,OLD.bankaccno,OLD.passbookimg,OLD.accholdername,OLD.ifsccode,OLD.signature);
     
	 ELSIF TG_OP = 'UPDATE' THEN
       
        INSERT INTO user_log( userid, email, phno, aadhar, pan, positionid, adminid, updatedby, status, userprofile, pstreetname, pdistrictid, pstateid, ppostalcode, cstreetname, cdistrictid, cstateid, cpostalcode,operation,organizationname,gstno,bussinesstype,fname,lname,upiid,bankname,bankaccno,passbookimg,accholdername,ifsccode,signature)
	VALUES( NEW.userid, NEW.email, NEW.phno, NEW.aadhar,NEW.pan, NEW.positionid, NEW.adminid, NEW.updatedby, NEW.status, NEW.userprofile, NEW.pstreetname, NEW.pdistrictid, NEW.pstateid, NEW.ppostalcode, NEW.cstreetname, NEW.cdistrictid, NEW.cstateid, NEW.cpostalcode,'update',NEW.organizationname,NEW.gstnno,NEW.bussinesstype,NEW.fname,NEW.lname,NEW.upiid,NEW.bankname,NEW.bankaccno,NEW.passbookimg,NEW.accholdername,NEW.ifsccode,NEW.signature);
   
		END IF;
    
    
    RETURN OLD; 
END;


$$;
 )   DROP FUNCTION public.user_log_trigger();
       public          postgres    false            �            1259    20151    accesscontrol_log    TABLE     �  CREATE TABLE public.accesscontrol_log (
    rno integer NOT NULL,
    distributer character varying,
    product character varying,
    invoicegenerator character varying,
    userid character varying(20),
    customer character varying,
    staff character varying,
    operation character varying,
    invoicepayslip character varying,
    d_staff character varying,
    last_updated_on timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    last_updated_by character varying(90)
);
 %   DROP TABLE public.accesscontrol_log;
       public         heap    postgres    false            �            1259    20158    accesscontroll    TABLE     �  CREATE TABLE public.accesscontroll (
    rno integer NOT NULL,
    distributer character varying,
    product character varying,
    invoicegenerator character varying,
    userid character varying(20) NOT NULL,
    customer character varying,
    staff character varying,
    invoicepayslip character varying,
    d_staff character varying,
    last_updated_on timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    last_updated_by character varying(90)
);
 "   DROP TABLE public.accesscontroll;
       public         heap    postgres    false            �            1259    20165    accesscontroll_rno_seq    SEQUENCE     �   ALTER TABLE public.accesscontroll ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.accesscontroll_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    203            �            1259    20167    accesscontroltrigger_rno_seq    SEQUENCE     �   ALTER TABLE public.accesscontrol_log ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.accesscontroltrigger_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    202            �            1259    20169    credentials    TABLE       CREATE TABLE public.credentials (
    rno integer NOT NULL,
    userid character varying(20),
    username character varying,
    password character varying,
    lastupdatedby character varying,
    last_updated_on timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.credentials;
       public         heap    postgres    false            �            1259    20176    credentials_log    TABLE     5  CREATE TABLE public.credentials_log (
    rno integer NOT NULL,
    userid character varying(20),
    username character varying,
    password character varying,
    lastupdatedby character varying,
    operation character varying,
    last_updated_on timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
 #   DROP TABLE public.credentials_log;
       public         heap    postgres    false            �            1259    20183    credentials_rno_seq    SEQUENCE     �   ALTER TABLE public.credentials ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.credentials_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    206            �            1259    20185    credentialstrigger_rno_seq    SEQUENCE     �   ALTER TABLE public.credentials_log ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.credentialstrigger_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    207            �            1259    20187    district    TABLE     �   CREATE TABLE public.district (
    rno integer NOT NULL,
    stateid character varying(6),
    districtid character varying(6),
    districtcode character varying(6),
    districtname character varying(50)
);
    DROP TABLE public.district;
       public         heap    postgres    false            �            1259    20190    district_rno_seq    SEQUENCE     �   ALTER TABLE public.district ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.district_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    210            �            1259    20192    feedback    TABLE     �   CREATE TABLE public.feedback (
    rno integer NOT NULL,
    userid character varying,
    feedback character varying,
    last_updated_by character varying(90),
    last_updated_on timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.feedback;
       public         heap    postgres    false            �            1259    20199    feedback_rno_seq    SEQUENCE     �   ALTER TABLE public.feedback ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.feedback_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    212            �            1259    20201    invoice    TABLE     `  CREATE TABLE public.invoice (
    rno integer NOT NULL,
    invoiceid character varying,
    senderid character varying(20),
    receiverid character varying(20),
    invoicedate date DEFAULT CURRENT_TIMESTAMP,
    sendernotes character varying,
    subtotal character varying,
    discount character varying,
    total character varying,
    invoicestatus character varying,
    lastupdatedby character varying,
    senderstatus integer,
    date character varying,
    reciverstatus integer,
    transactionid character varying,
    last_updated_on timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.invoice;
       public         heap    postgres    false            �            1259    20209    invoice_id_seq    SEQUENCE     y   CREATE SEQUENCE public.invoice_id_seq
    START WITH 1000
    INCREMENT BY 1
    MINVALUE 0
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.invoice_id_seq;
       public          postgres    false    214                       0    0    invoice_id_seq    SEQUENCE OWNED BY     H   ALTER SEQUENCE public.invoice_id_seq OWNED BY public.invoice.invoiceid;
          public          postgres    false    215            �            1259    20211    invoice_log    TABLE     �  CREATE TABLE public.invoice_log (
    rno integer NOT NULL,
    invoiceid character varying,
    senderid character varying,
    receiverid character varying,
    invoicedate date,
    sendernotes character varying,
    subtotal character varying,
    discount character varying,
    total character varying,
    invoicestatus character varying,
    operation character varying,
    last_updated_by character varying(90),
    last_updated_on timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.invoice_log;
       public         heap    postgres    false            �            1259    20218    invoice_rno_seq    SEQUENCE     �   ALTER TABLE public.invoice ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.invoice_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    214            �            1259    20220    invoiceitem    TABLE     �  CREATE TABLE public.invoiceitem (
    rno integer NOT NULL,
    invoiceid character varying,
    productid character varying,
    quantity character varying,
    cost character varying,
    discountperitem character varying,
    lastupdatedby character varying,
    hsncode character varying,
    last_updated_on timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    batchno character varying(90),
    priceperitem character varying(90),
    cgst character varying(90),
    sgst character varying(90)
);
    DROP TABLE public.invoiceitem;
       public         heap    postgres    false            �            1259    20227    invoiceitem_rno_seq    SEQUENCE     �   ALTER TABLE public.invoiceitem ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.invoiceitem_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    218            �            1259    20229    invoiceslip    TABLE        CREATE TABLE public.invoiceslip (
    rno integer NOT NULL,
    invoiceid character varying,
    senderid character varying,
    receiverid character varying,
    invoicedate character varying,
    hsncode character varying,
    productid character varying,
    quantity character varying,
    discount character varying,
    originalprice character varying,
    afterdiscount character varying,
    totalprice character varying,
    lastupdatedby character varying,
    last_updated_on timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.invoiceslip;
       public         heap    postgres    false            �            1259    20236    invoiceslip_rno_seq    SEQUENCE     �   ALTER TABLE public.invoiceslip ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.invoiceslip_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    220            �            1259    20238    invoicetrigger_rno_seq    SEQUENCE     �   ALTER TABLE public.invoice_log ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.invoicetrigger_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    216            �            1259    20436    order_id_sequence    SEQUENCE     z   CREATE SEQUENCE public.order_id_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.order_id_sequence;
       public          postgres    false            �            1259    20418    order_management    TABLE     [  CREATE TABLE public.order_management (
    rno integer NOT NULL,
    product_id character varying(97),
    product_price character varying(98),
    cgst character varying(96),
    sgst character varying(98),
    quantity character varying(98),
    total_amount character varying(98),
    batch_no character varying(90),
    order_date character varying(90),
    receiverid character varying(98),
    position_id character varying(98),
    order_status character varying(90),
    transaction_id character varying(98),
    sender_id character varying(89),
    payment_method character varying(98),
    last_updated_by character varying(98),
    last_updated_on timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    order_id character varying(98) DEFAULT ('Order'::text || nextval('public.order_id_sequence'::regclass)),
    upi_id character varying(90)
);
 $   DROP TABLE public.order_management;
       public         heap    postgres    false    244            �            1259    20441    order_management_log    TABLE     ;  CREATE TABLE public.order_management_log (
    rno integer NOT NULL,
    product_id character varying(90),
    product_price character varying(98),
    cgst character varying(98),
    sgst character varying(98),
    quantity character varying(98),
    total_amount character varying(98),
    batch_no character varying(98),
    order_date character varying(98),
    receiverid character varying(98),
    position_id character varying(98),
    order_status character varying(98),
    transaction_id character varying(98),
    sender_id character varying(98),
    payment_method character varying(98),
    last_updated_by character varying(98),
    order_id character varying(98),
    upi_id character varying(98),
    operation character varying(98),
    last_updated_on timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
 (   DROP TABLE public.order_management_log;
       public         heap    postgres    false            �            1259    20439    order_management_log_rno_seq    SEQUENCE     �   CREATE SEQUENCE public.order_management_log_rno_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.order_management_log_rno_seq;
       public          postgres    false    246                       0    0    order_management_log_rno_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public.order_management_log_rno_seq OWNED BY public.order_management_log.rno;
          public          postgres    false    245            �            1259    20416    order_management_rno_seq    SEQUENCE     �   CREATE SEQUENCE public.order_management_rno_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.order_management_rno_seq;
       public          postgres    false    243                       0    0    order_management_rno_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.order_management_rno_seq OWNED BY public.order_management.rno;
          public          postgres    false    242            �            1259    20240    position    TABLE     �   CREATE TABLE public."position" (
    rno integer NOT NULL,
    positionid character varying,
    "position" character varying,
    lastupdatedby character varying,
    last_updated_on timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public."position";
       public         heap    postgres    false            �            1259    20247    position_rno_seq    SEQUENCE     �   ALTER TABLE public."position" ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.position_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    223            �            1259    20249 	   previlage    TABLE     �   CREATE TABLE public.previlage (
    rno integer NOT NULL,
    previlageid character varying,
    previlage character varying,
    lastupdatedby character varying,
    last_updated_on timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.previlage;
       public         heap    postgres    false            �            1259    20256    previlage_rno_seq    SEQUENCE     �   ALTER TABLE public.previlage ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.previlage_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    225            �            1259    20258    product_log    TABLE       CREATE TABLE public.product_log (
    productid character varying(200),
    quantity integer,
    priceperitem character varying(90),
    last_updated_by character varying(90),
    productname character varying(90),
    belongsto character varying(90),
    status character varying(90),
    batchno character varying(90),
    cgst character varying(90),
    sgst character varying(90),
    last_updated_on timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    operation character varying(90),
    rno integer NOT NULL
);
    DROP TABLE public.product_log;
       public         heap    postgres    false            �            1259    20265    product_log_rno_seq    SEQUENCE     �   CREATE SEQUENCE public.product_log_rno_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.product_log_rno_seq;
       public          postgres    false    227                       0    0    product_log_rno_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.product_log_rno_seq OWNED BY public.product_log.rno;
          public          postgres    false    228            �            1259    20267    products    TABLE     �  CREATE TABLE public.products (
    rno integer NOT NULL,
    productid character varying,
    quantity integer,
    priceperitem character varying,
    last_updated_by character varying,
    productname character varying,
    belongsto character varying,
    status character varying,
    batchno character varying,
    cgst character varying,
    sgst character varying,
    last_updated_on timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.products;
       public         heap    postgres    false            �            1259    20274    products_rno_seq    SEQUENCE     �   ALTER TABLE public.products ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.products_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    229            �            1259    20276    proformainvoice    TABLE     �  CREATE TABLE public.proformainvoice (
    rno integer NOT NULL,
    invoiceid character varying DEFAULT ('INVOICE'::text || nextval('public.invoice_id_seq'::regclass)),
    senderid character varying(20),
    receiverid character varying(20),
    invoicedate date DEFAULT CURRENT_TIMESTAMP,
    sendernotes character varying,
    subtotal character varying,
    discount character varying,
    total character varying,
    invoicestatus character varying,
    lastupdatedby character varying,
    senderstatus integer,
    date character varying,
    reciverstatus integer,
    transactionid character varying,
    last_updated_on timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
 #   DROP TABLE public.proformainvoice;
       public         heap    postgres    false    215            �            1259    20285    proformainvoice_rno_seq    SEQUENCE     �   ALTER TABLE public.proformainvoice ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.proformainvoice_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    231            �            1259    20287    proformainvoiceitem    TABLE       CREATE TABLE public.proformainvoiceitem (
    rno integer NOT NULL,
    invoiceid character varying,
    productid character varying,
    quantity character varying,
    cost character varying,
    discountperitem character varying,
    lastupdatedby character varying,
    hsncode character varying,
    last_updated_on timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    batchno character varying(90),
    priceperitem character varying(90),
    cgst character varying(90),
    sgst character varying(90)
);
 '   DROP TABLE public.proformainvoiceitem;
       public         heap    postgres    false            �            1259    20294    proformainvoiceitem_rno_seq    SEQUENCE     �   ALTER TABLE public.proformainvoiceitem ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.proformainvoiceitem_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    233            �            1259    20296    state    TABLE     �   CREATE TABLE public.state (
    rno integer NOT NULL,
    stateid character varying,
    statecode character varying,
    statename character varying,
    lastupdatedby character varying,
    updatedon character varying
);
    DROP TABLE public.state;
       public         heap    postgres    false            �            1259    20302    state_rno_seq    SEQUENCE     �   ALTER TABLE public.state ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.state_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    235            �            1259    20304    user    TABLE     e  CREATE TABLE public."user" (
    rno integer NOT NULL,
    userid character varying(20) NOT NULL,
    email character varying NOT NULL,
    phno character varying,
    aadhar character varying,
    pan character varying,
    positionid character varying,
    adminid character varying,
    updatedby character varying,
    status character varying,
    userprofile character varying,
    pstreetname character varying,
    pdistrictid character varying,
    pstateid character varying,
    ppostalcode character varying,
    cstreetname character varying,
    cdistrictid character varying,
    cstateid character varying,
    cpostalcode character varying,
    updatedon timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    organizationname character varying,
    gstnno character varying,
    bussinesstype character varying,
    fname character varying,
    lname character varying,
    upiid character varying,
    bankname character varying,
    bankaccno character varying,
    passbookimg character varying,
    accholdername character varying,
    ifsccode character varying,
    signature character varying
);
    DROP TABLE public."user";
       public         heap    postgres    false            �            1259    20311    user_log    TABLE     �  CREATE TABLE public.user_log (
    rno integer NOT NULL,
    userid character varying(20),
    email character varying,
    phno character varying,
    aadhar character varying,
    pan character varying,
    positionid character varying,
    adminid character varying,
    updatedon character varying,
    updatedby character varying,
    status character varying,
    userprofile character varying,
    pstreetname character varying,
    pdistrictid character varying,
    pstateid character varying,
    ppostalcode character varying,
    cstreetname character varying,
    cdistrictid character varying,
    cstateid character varying,
    cpostalcode character varying,
    operation character varying,
    last_update_on timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP,
    organizationname character varying,
    gstno character varying,
    bussinesstype character varying,
    fname character varying,
    lname character varying,
    upiid character varying,
    bankname character varying,
    bankaccno character varying,
    passbookimg character varying,
    accholdername character varying,
    ifsccode character varying,
    signature character varying
);
    DROP TABLE public.user_log;
       public         heap    postgres    false            �            1259    20317    user_rno_seq    SEQUENCE     �   ALTER TABLE public."user" ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.user_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    237            �            1259    20319    user_user_id_seq    SEQUENCE     |   CREATE SEQUENCE public.user_user_id_seq
    START WITH 1000
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.user_user_id_seq;
       public          postgres    false    237                       0    0    user_user_id_seq    SEQUENCE OWNED BY     F   ALTER SEQUENCE public.user_user_id_seq OWNED BY public."user".userid;
          public          postgres    false    240            �            1259    20321    usertrigger_rno_seq    SEQUENCE     �   ALTER TABLE public.user_log ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.usertrigger_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    238                       2604    20377    invoice invoiceid    DEFAULT     �   ALTER TABLE ONLY public.invoice ALTER COLUMN invoiceid SET DEFAULT ('INVOICE'::text || nextval('public.invoice_id_seq'::regclass));
 @   ALTER TABLE public.invoice ALTER COLUMN invoiceid DROP DEFAULT;
       public          postgres    false    215    214            #           2604    20421    order_management rno    DEFAULT     |   ALTER TABLE ONLY public.order_management ALTER COLUMN rno SET DEFAULT nextval('public.order_management_rno_seq'::regclass);
 C   ALTER TABLE public.order_management ALTER COLUMN rno DROP DEFAULT;
       public          postgres    false    242    243    243            &           2604    20444    order_management_log rno    DEFAULT     �   ALTER TABLE ONLY public.order_management_log ALTER COLUMN rno SET DEFAULT nextval('public.order_management_log_rno_seq'::regclass);
 G   ALTER TABLE public.order_management_log ALTER COLUMN rno DROP DEFAULT;
       public          postgres    false    246    245    246                       2604    20378    product_log rno    DEFAULT     r   ALTER TABLE ONLY public.product_log ALTER COLUMN rno SET DEFAULT nextval('public.product_log_rno_seq'::regclass);
 >   ALTER TABLE public.product_log ALTER COLUMN rno DROP DEFAULT;
       public          postgres    false    228    227            !           2604    20379    user userid    DEFAULT     |   ALTER TABLE ONLY public."user" ALTER COLUMN userid SET DEFAULT ('U'::text || nextval('public.user_user_id_seq'::regclass));
 <   ALTER TABLE public."user" ALTER COLUMN userid DROP DEFAULT;
       public          postgres    false    240    237            �          0    20151    accesscontrol_log 
   TABLE DATA           �   COPY public.accesscontrol_log (rno, distributer, product, invoicegenerator, userid, customer, staff, operation, invoicepayslip, d_staff, last_updated_on, last_updated_by) FROM stdin;
    public          postgres    false    202   ��       �          0    20158    accesscontroll 
   TABLE DATA           �   COPY public.accesscontroll (rno, distributer, product, invoicegenerator, userid, customer, staff, invoicepayslip, d_staff, last_updated_on, last_updated_by) FROM stdin;
    public          postgres    false    203   m�       �          0    20169    credentials 
   TABLE DATA           f   COPY public.credentials (rno, userid, username, password, lastupdatedby, last_updated_on) FROM stdin;
    public          postgres    false    206   �       �          0    20176    credentials_log 
   TABLE DATA           u   COPY public.credentials_log (rno, userid, username, password, lastupdatedby, operation, last_updated_on) FROM stdin;
    public          postgres    false    207   ��       �          0    20187    district 
   TABLE DATA           X   COPY public.district (rno, stateid, districtid, districtcode, districtname) FROM stdin;
    public          postgres    false    210   ��       �          0    20192    feedback 
   TABLE DATA           [   COPY public.feedback (rno, userid, feedback, last_updated_by, last_updated_on) FROM stdin;
    public          postgres    false    212   �       �          0    20201    invoice 
   TABLE DATA           �   COPY public.invoice (rno, invoiceid, senderid, receiverid, invoicedate, sendernotes, subtotal, discount, total, invoicestatus, lastupdatedby, senderstatus, date, reciverstatus, transactionid, last_updated_on) FROM stdin;
    public          postgres    false    214   "�       �          0    20211    invoice_log 
   TABLE DATA           �   COPY public.invoice_log (rno, invoiceid, senderid, receiverid, invoicedate, sendernotes, subtotal, discount, total, invoicestatus, operation, last_updated_by, last_updated_on) FROM stdin;
    public          postgres    false    216   ?�       �          0    20220    invoiceitem 
   TABLE DATA           �   COPY public.invoiceitem (rno, invoiceid, productid, quantity, cost, discountperitem, lastupdatedby, hsncode, last_updated_on, batchno, priceperitem, cgst, sgst) FROM stdin;
    public          postgres    false    218   \�       �          0    20229    invoiceslip 
   TABLE DATA           �   COPY public.invoiceslip (rno, invoiceid, senderid, receiverid, invoicedate, hsncode, productid, quantity, discount, originalprice, afterdiscount, totalprice, lastupdatedby, last_updated_on) FROM stdin;
    public          postgres    false    220   y�                 0    20418    order_management 
   TABLE DATA           
  COPY public.order_management (rno, product_id, product_price, cgst, sgst, quantity, total_amount, batch_no, order_date, receiverid, position_id, order_status, transaction_id, sender_id, payment_method, last_updated_by, last_updated_on, order_id, upi_id) FROM stdin;
    public          postgres    false    243   ��                 0    20441    order_management_log 
   TABLE DATA             COPY public.order_management_log (rno, product_id, product_price, cgst, sgst, quantity, total_amount, batch_no, order_date, receiverid, position_id, order_status, transaction_id, sender_id, payment_method, last_updated_by, order_id, upi_id, operation, last_updated_on) FROM stdin;
    public          postgres    false    246   ��       �          0    20240    position 
   TABLE DATA           a   COPY public."position" (rno, positionid, "position", lastupdatedby, last_updated_on) FROM stdin;
    public          postgres    false    223   ��       �          0    20249 	   previlage 
   TABLE DATA           `   COPY public.previlage (rno, previlageid, previlage, lastupdatedby, last_updated_on) FROM stdin;
    public          postgres    false    225   G�       �          0    20258    product_log 
   TABLE DATA           �   COPY public.product_log (productid, quantity, priceperitem, last_updated_by, productname, belongsto, status, batchno, cgst, sgst, last_updated_on, operation, rno) FROM stdin;
    public          postgres    false    227   d�       �          0    20267    products 
   TABLE DATA           �   COPY public.products (rno, productid, quantity, priceperitem, last_updated_by, productname, belongsto, status, batchno, cgst, sgst, last_updated_on) FROM stdin;
    public          postgres    false    229   ��       �          0    20276    proformainvoice 
   TABLE DATA           �   COPY public.proformainvoice (rno, invoiceid, senderid, receiverid, invoicedate, sendernotes, subtotal, discount, total, invoicestatus, lastupdatedby, senderstatus, date, reciverstatus, transactionid, last_updated_on) FROM stdin;
    public          postgres    false    231   ��       �          0    20287    proformainvoiceitem 
   TABLE DATA           �   COPY public.proformainvoiceitem (rno, invoiceid, productid, quantity, cost, discountperitem, lastupdatedby, hsncode, last_updated_on, batchno, priceperitem, cgst, sgst) FROM stdin;
    public          postgres    false    233   ��       �          0    20296    state 
   TABLE DATA           ]   COPY public.state (rno, stateid, statecode, statename, lastupdatedby, updatedon) FROM stdin;
    public          postgres    false    235   ��       �          0    20304    user 
   TABLE DATA           m  COPY public."user" (rno, userid, email, phno, aadhar, pan, positionid, adminid, updatedby, status, userprofile, pstreetname, pdistrictid, pstateid, ppostalcode, cstreetname, cdistrictid, cstateid, cpostalcode, updatedon, organizationname, gstnno, bussinesstype, fname, lname, upiid, bankname, bankaccno, passbookimg, accholdername, ifsccode, signature) FROM stdin;
    public          postgres    false    237   x�                  0    20311    user_log 
   TABLE DATA           �  COPY public.user_log (rno, userid, email, phno, aadhar, pan, positionid, adminid, updatedon, updatedby, status, userprofile, pstreetname, pdistrictid, pstateid, ppostalcode, cstreetname, cdistrictid, cstateid, cpostalcode, operation, last_update_on, organizationname, gstno, bussinesstype, fname, lname, upiid, bankname, bankaccno, passbookimg, accholdername, ifsccode, signature) FROM stdin;
    public          postgres    false    238   ��                  0    0    accesscontroll_rno_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.accesscontroll_rno_seq', 122, true);
          public          postgres    false    204                       0    0    accesscontroltrigger_rno_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.accesscontroltrigger_rno_seq', 256, true);
          public          postgres    false    205                       0    0    credentials_rno_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.credentials_rno_seq', 139, true);
          public          postgres    false    208                       0    0    credentialstrigger_rno_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.credentialstrigger_rno_seq', 308, true);
          public          postgres    false    209                       0    0    district_rno_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.district_rno_seq', 1, false);
          public          postgres    false    211                       0    0    feedback_rno_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.feedback_rno_seq', 7, true);
          public          postgres    false    213                       0    0    invoice_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.invoice_id_seq', 1692, true);
          public          postgres    false    215                       0    0    invoice_rno_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.invoice_rno_seq', 616, true);
          public          postgres    false    217                       0    0    invoiceitem_rno_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.invoiceitem_rno_seq', 619, true);
          public          postgres    false    219                       0    0    invoiceslip_rno_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.invoiceslip_rno_seq', 5, true);
          public          postgres    false    221                       0    0    invoicetrigger_rno_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.invoicetrigger_rno_seq', 1240, true);
          public          postgres    false    222                       0    0    order_id_sequence    SEQUENCE SET     @   SELECT pg_catalog.setval('public.order_id_sequence', 21, true);
          public          postgres    false    244                        0    0    order_management_log_rno_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.order_management_log_rno_seq', 60, true);
          public          postgres    false    245            !           0    0    order_management_rno_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.order_management_rno_seq', 22, true);
          public          postgres    false    242            "           0    0    position_rno_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.position_rno_seq', 5, true);
          public          postgres    false    224            #           0    0    previlage_rno_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.previlage_rno_seq', 1, false);
          public          postgres    false    226            $           0    0    product_log_rno_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.product_log_rno_seq', 618, true);
          public          postgres    false    228            %           0    0    products_rno_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.products_rno_seq', 172, true);
          public          postgres    false    230            &           0    0    proformainvoice_rno_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.proformainvoice_rno_seq', 104, true);
          public          postgres    false    232            '           0    0    proformainvoiceitem_rno_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.proformainvoiceitem_rno_seq', 112, true);
          public          postgres    false    234            (           0    0    state_rno_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.state_rno_seq', 1, false);
          public          postgres    false    236            )           0    0    user_rno_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.user_rno_seq', 249, true);
          public          postgres    false    239            *           0    0    user_user_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.user_user_id_seq', 1010, true);
          public          postgres    false    240            +           0    0    usertrigger_rno_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.usertrigger_rno_seq', 870, true);
          public          postgres    false    241            +           2606    20327 "   accesscontroll accesscontroll_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public.accesscontroll
    ADD CONSTRAINT accesscontroll_pkey PRIMARY KEY (rno);
 L   ALTER TABLE ONLY public.accesscontroll DROP CONSTRAINT accesscontroll_pkey;
       public            postgres    false    203            )           2606    20329 +   accesscontrol_log accesscontroltrigger_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.accesscontrol_log
    ADD CONSTRAINT accesscontroltrigger_pkey PRIMARY KEY (rno);
 U   ALTER TABLE ONLY public.accesscontrol_log DROP CONSTRAINT accesscontroltrigger_pkey;
       public            postgres    false    202            -           2606    20331    credentials credentials_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.credentials
    ADD CONSTRAINT credentials_pkey PRIMARY KEY (rno);
 F   ALTER TABLE ONLY public.credentials DROP CONSTRAINT credentials_pkey;
       public            postgres    false    206            3           2606    20333 '   credentials_log credentialstrigger_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.credentials_log
    ADD CONSTRAINT credentialstrigger_pkey PRIMARY KEY (rno);
 Q   ALTER TABLE ONLY public.credentials_log DROP CONSTRAINT credentialstrigger_pkey;
       public            postgres    false    207            5           2606    20335    district district_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public.district
    ADD CONSTRAINT district_pkey PRIMARY KEY (rno);
 @   ALTER TABLE ONLY public.district DROP CONSTRAINT district_pkey;
       public            postgres    false    210            I           2606    20337    user email_already_exsist 
   CONSTRAINT     W   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT email_already_exsist UNIQUE (email);
 E   ALTER TABLE ONLY public."user" DROP CONSTRAINT email_already_exsist;
       public            postgres    false    237            /           2606    20339 .   credentials email_already_exsist_in_user_table 
   CONSTRAINT     m   ALTER TABLE ONLY public.credentials
    ADD CONSTRAINT email_already_exsist_in_user_table UNIQUE (username);
 X   ALTER TABLE ONLY public.credentials DROP CONSTRAINT email_already_exsist_in_user_table;
       public            postgres    false    206            7           2606    20341    invoice invoice_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.invoice
    ADD CONSTRAINT invoice_pkey PRIMARY KEY (rno);
 >   ALTER TABLE ONLY public.invoice DROP CONSTRAINT invoice_pkey;
       public            postgres    false    214            ;           2606    20343    invoiceitem invoiceitem_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.invoiceitem
    ADD CONSTRAINT invoiceitem_pkey PRIMARY KEY (rno);
 F   ALTER TABLE ONLY public.invoiceitem DROP CONSTRAINT invoiceitem_pkey;
       public            postgres    false    218            =           2606    20345    invoiceslip invoiceslip_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.invoiceslip
    ADD CONSTRAINT invoiceslip_pkey PRIMARY KEY (rno);
 F   ALTER TABLE ONLY public.invoiceslip DROP CONSTRAINT invoiceslip_pkey;
       public            postgres    false    220            9           2606    20347    invoice_log invoicetrigger_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.invoice_log
    ADD CONSTRAINT invoicetrigger_pkey PRIMARY KEY (rno);
 I   ALTER TABLE ONLY public.invoice_log DROP CONSTRAINT invoicetrigger_pkey;
       public            postgres    false    216            W           2606    20450 .   order_management_log order_management_log_pkey 
   CONSTRAINT     m   ALTER TABLE ONLY public.order_management_log
    ADD CONSTRAINT order_management_log_pkey PRIMARY KEY (rno);
 X   ALTER TABLE ONLY public.order_management_log DROP CONSTRAINT order_management_log_pkey;
       public            postgres    false    246            U           2606    20427 &   order_management order_management_pkey 
   CONSTRAINT     e   ALTER TABLE ONLY public.order_management
    ADD CONSTRAINT order_management_pkey PRIMARY KEY (rno);
 P   ALTER TABLE ONLY public.order_management DROP CONSTRAINT order_management_pkey;
       public            postgres    false    243            ?           2606    20349    position position_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public."position"
    ADD CONSTRAINT position_pkey PRIMARY KEY (rno);
 B   ALTER TABLE ONLY public."position" DROP CONSTRAINT position_pkey;
       public            postgres    false    223            A           2606    20351    previlage previlage_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.previlage
    ADD CONSTRAINT previlage_pkey PRIMARY KEY (rno);
 B   ALTER TABLE ONLY public.previlage DROP CONSTRAINT previlage_pkey;
       public            postgres    false    225            C           2606    20353    product_log product_log_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.product_log
    ADD CONSTRAINT product_log_pkey PRIMARY KEY (rno);
 F   ALTER TABLE ONLY public.product_log DROP CONSTRAINT product_log_pkey;
       public            postgres    false    227            E           2606    20355    products products_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (rno);
 @   ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
       public            postgres    false    229            K           2606    20357    user set_unique_email 
   CONSTRAINT     S   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT set_unique_email UNIQUE (email);
 A   ALTER TABLE ONLY public."user" DROP CONSTRAINT set_unique_email;
       public            postgres    false    237            M           2606    20359    user set_unique_userid 
   CONSTRAINT     U   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT set_unique_userid UNIQUE (userid);
 B   ALTER TABLE ONLY public."user" DROP CONSTRAINT set_unique_userid;
       public            postgres    false    237            G           2606    20361    state state_pkey 
   CONSTRAINT     O   ALTER TABLE ONLY public.state
    ADD CONSTRAINT state_pkey PRIMARY KEY (rno);
 :   ALTER TABLE ONLY public.state DROP CONSTRAINT state_pkey;
       public            postgres    false    235            O           2606    20363    user user_pkey 
   CONSTRAINT     O   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (rno);
 :   ALTER TABLE ONLY public."user" DROP CONSTRAINT user_pkey;
       public            postgres    false    237            Q           2606    20365    user userid_already_exsist 
   CONSTRAINT     Y   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT userid_already_exsist UNIQUE (userid);
 F   ALTER TABLE ONLY public."user" DROP CONSTRAINT userid_already_exsist;
       public            postgres    false    237            1           2606    20367 /   credentials userid_already_exsist_in_user_table 
   CONSTRAINT     l   ALTER TABLE ONLY public.credentials
    ADD CONSTRAINT userid_already_exsist_in_user_table UNIQUE (userid);
 Y   ALTER TABLE ONLY public.credentials DROP CONSTRAINT userid_already_exsist_in_user_table;
       public            postgres    false    206            S           2606    20369    user_log usertrigger_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.user_log
    ADD CONSTRAINT usertrigger_pkey PRIMARY KEY (rno);
 C   ALTER TABLE ONLY public.user_log DROP CONSTRAINT usertrigger_pkey;
       public            postgres    false    238            X           2620    20370     accesscontroll accesscontrol_log    TRIGGER     �   CREATE TRIGGER accesscontrol_log AFTER INSERT ON public.accesscontroll FOR EACH ROW EXECUTE FUNCTION public.accesscontrol_log_trigger();
 9   DROP TRIGGER accesscontrol_log ON public.accesscontroll;
       public          postgres    false    247    203            Y           2620    20371    credentials credentials_log    TRIGGER     �   CREATE TRIGGER credentials_log AFTER INSERT OR DELETE OR UPDATE ON public.credentials FOR EACH ROW EXECUTE FUNCTION public.credentials_log_trigger();
 4   DROP TRIGGER credentials_log ON public.credentials;
       public          postgres    false    206    248            Z           2620    20372    invoice invoice_log    TRIGGER     �   CREATE TRIGGER invoice_log AFTER INSERT OR DELETE OR UPDATE ON public.invoice FOR EACH ROW EXECUTE FUNCTION public.invoice_log_trigger();
 ,   DROP TRIGGER invoice_log ON public.invoice;
       public          postgres    false    249    214            ]           2620    20452 %   order_management order_management_log    TRIGGER     �   CREATE TRIGGER order_management_log AFTER INSERT OR DELETE OR UPDATE ON public.order_management FOR EACH ROW EXECUTE FUNCTION public.order_management_trigger();
 >   DROP TRIGGER order_management_log ON public.order_management;
       public          postgres    false    243    264            [           2620    20373    products product_log    TRIGGER     �   CREATE TRIGGER product_log AFTER INSERT OR DELETE OR UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.products_log_trigger();
 -   DROP TRIGGER product_log ON public.products;
       public          postgres    false    262    229            \           2620    20375    user user_log_trigger    TRIGGER     �   CREATE TRIGGER user_log_trigger AFTER INSERT OR DELETE OR UPDATE ON public."user" FOR EACH ROW EXECUTE FUNCTION public.user_log_trigger();
 0   DROP TRIGGER user_log_trigger ON public."user";
       public          postgres    false    237    263            �   �   x�m�=�0�g�\��#���7�ڕ����p�"����I�{~f�>+!`����>^�#�:��k�q>�(�͟�4l�_:O�<�<W�̎%��:/��c��Њ�����θ�����0��ŕ��-���,C2      �   �   x�m�1�0Eg|�\�|l�x���K����&��F �?>�t�C��x������5�-����Z���M"F2c;0�O�f�"<<�]Ŵ��$��:A9��������Ti�NR�-��椲�����q���_\�M�Z����KJ�ʒ0�      �   �   x���Mj�0�t�^ b�d{�r�o�m6"u�H%��r�(v��)�Y<�do��&�ﱛ�)����Nc2�+��!��Ȏ��j����Z�"W�09���u���;w̯��`O�aT�֦��"֠²En��";R� ؘ~}1�/!?� `��<i��A�k�s)^�)����˳c�T�����c!      �      x���Mj�0�|�^ b43�~V.���n��Lj�8N!��l���; �ç�$�
@�&�w�P�;�vrߵ"�&
i>��s�y�CzR��v�X63J�ۤ��UקKze��8�������v�?\Z�%���\�8yo�+�� �@Z�wk]���yC���V�ƌAyC��=��Z�s�6���! ��_���t�O��ϣ/��y�����#�&I.w<��Y϶T.�T�^Y�����ڕ����̲���      �     x�5��n�0E�寘/�sفV��r�YD�����v#Z���u�ٜ�-���rBYF	�tE����_g��,����|���~�eYU���A��N�����=�w���2[��ʏ�k߳��c�h?�x>��N=��
�U�л���s̞i��ϗު��PY�T��<b���Tr'�����Q	߃���g�$RI��(̐J�
,�;����O7HD��#��c?B�ُ�ȗa+�ؼj���q\���"X�{����3�3Dl�{�<��U"�`�ZQkq�/y�D|��4Ԯ�:^�'��� �.���7�T�A�Ԃ���m�)vt`o�Ld�C���p}���4偌#_�)h>4���_���!��i�ڀ����B����1ťb�N�/�a�b��A~��mǵw*E��O22噧	�PE�4��,X��"����A#��T������)��
����Y�5=�!e�y�&�W�|�%W��5�U�:��Og"v5u�K#m�k�'�Ê�Ƴ��[)��R�.      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �            x������ � �            x������ � �      �   g   x���M
� ���)����Dw�a?B�
t�G��[<Ḋ�k��f,3�[�:�#�Q\/�E���{�-�`�)5�@p�������57Ko�� ��2R      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �   �  x����n�0�����6�v	�"BT��洠�I�#c���3��I*}+����

q�x쌣�v���u��C�(����A��>]�"���D��,�D� ���䬰�s�gc�{;�ȉW��F#�"��`�4G:�ɑ��-��d�n4��v�!����[�P!�<C��^��h*0E���H�.b
J�)�(zGWY���5J�����L��Ω�d��C������=�STk0�e�f�M��S������;j�ڣ������_x��d�{u�g���x�QS`��i�<G���q(p�������BK��u��.���=|���z�mкS��5�c����~0��Mw�Xo��&x�'$=�{���@N�05(x�+�����b��&�      �   $  x����n�0�����7Q�O^��F�i|a$�VmсLp���uM�6�Cr��?���Qʠ�?�c�WEZ��^�/!*��ƅ���7�9W~��3����\���4�"Ks0�m���TW�lr[@b�b�]��}�9�rHِ���#?�$��!A�{BL��-��Iv��Z[�W��Os���4US��B=�o�/��̺� �V1�QNO����W'�|r��e0��)E�p|k��l�.<4vZs��&���ui�]c��V,�L]�CAv$�7���-\� �����
�����e��U�a]\7k�� �߂l�(�Z
�'I:�/�&�Y�/�̝;������b��[h����D>b��*�v�!A����2!�	*�(3��Hc��k��t.a9�x
���2�<�$�i��i�)�Y���Z?C�Z�%f�[��vj-��+��N�;�_	���|Au�������K��]h֬vh+= +��:�+L<��Z�/���)��͊S�ͮ���*W�`0�	'5S          0  x���]o�0����?�����
JZ���1���M2� ��A��~'ltb���(�}��=�h�a�(eP�/�2��� ۬A�JeB��q!O��ɘ�P'�pf	췹�E�z�W@Hߐ��Y��$vn�H�+!��r�K�C�խp����&L�CէQ`����{�8����dʘdO�e���u�����a��ܯm��*m�e����Q�iC����h�v��bWT�=x��s'�-����2غyO���`�=E#�4�|0_�r��Dd�Sgr(Ȏ	*��fz�C}�+.�}<Ch�Ԫ�}�q�˝��%hMC�ۚk�E�H!�f��H�Rp�ax;J��vc�m���d竢����*�'HJ�k�.7��L�P��glRdCj8�LS�G���;����ż��������W�Af���#��-�*F5�zJ��(�ұWm���U��շZ�,Xc$7Bp��aG3���.�4� 5u�#��'�r��pG�}ߨy���xj����@�Y��n�V��<��ޮN̺�S������PFr     