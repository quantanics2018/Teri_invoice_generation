PGDMP         $                |            terion_billing %   12.18 (Ubuntu 12.18-0ubuntu0.20.04.1) %   12.18 (Ubuntu 12.18-0ubuntu0.20.04.1) z    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    20145    terion_billing    DATABASE     t   CREATE DATABASE terion_billing WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_IN' LC_CTYPE = 'en_IN';
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
       public          postgres    false                       1255    20149    products_log_trigger()    FUNCTION     �  CREATE FUNCTION public.products_log_trigger() RETURNS trigger
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
       public          postgres    false                       1255    20150    user_log_trigger()    FUNCTION     <
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
       public          postgres    false    214            �           0    0    invoice_id_seq    SEQUENCE OWNED BY     H   ALTER SEQUENCE public.invoice_id_seq OWNED BY public.invoice.invoiceid;
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
    batchno character varying(90)
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
            public          postgres    false    216            �            1259    20240    position    TABLE     �   CREATE TABLE public."position" (
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
       public          postgres    false    227            �           0    0    product_log_rno_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.product_log_rno_seq OWNED BY public.product_log.rno;
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
            public          postgres    false    231            �            1259    20287    proformainvoiceitem    TABLE     z  CREATE TABLE public.proformainvoiceitem (
    rno integer NOT NULL,
    invoiceid character varying,
    productid character varying,
    quantity character varying,
    cost character varying,
    discountperitem character varying,
    lastupdatedby character varying,
    hsncode character varying,
    last_updated_on timestamp without time zone DEFAULT CURRENT_TIMESTAMP
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
       public          postgres    false    237            �           0    0    user_user_id_seq    SEQUENCE OWNED BY     F   ALTER SEQUENCE public.user_user_id_seq OWNED BY public."user".userid;
          public          postgres    false    240            �            1259    20321    usertrigger_rno_seq    SEQUENCE     �   ALTER TABLE public.user_log ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.usertrigger_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    238                       2604    20377    invoice invoiceid    DEFAULT     �   ALTER TABLE ONLY public.invoice ALTER COLUMN invoiceid SET DEFAULT ('INVOICE'::text || nextval('public.invoice_id_seq'::regclass));
 @   ALTER TABLE public.invoice ALTER COLUMN invoiceid DROP DEFAULT;
       public          postgres    false    215    214            	           2604    20378    product_log rno    DEFAULT     r   ALTER TABLE ONLY public.product_log ALTER COLUMN rno SET DEFAULT nextval('public.product_log_rno_seq'::regclass);
 >   ALTER TABLE public.product_log ALTER COLUMN rno DROP DEFAULT;
       public          postgres    false    228    227                       2604    20379    user userid    DEFAULT     |   ALTER TABLE ONLY public."user" ALTER COLUMN userid SET DEFAULT ('U'::text || nextval('public.user_user_id_seq'::regclass));
 <   ALTER TABLE public."user" ALTER COLUMN userid DROP DEFAULT;
       public          postgres    false    240    237            �          0    20151    accesscontrol_log 
   TABLE DATA           �   COPY public.accesscontrol_log (rno, distributer, product, invoicegenerator, userid, customer, staff, operation, invoicepayslip, d_staff, last_updated_on, last_updated_by) FROM stdin;
    public          postgres    false    202   /�       �          0    20158    accesscontroll 
   TABLE DATA           �   COPY public.accesscontroll (rno, distributer, product, invoicegenerator, userid, customer, staff, invoicepayslip, d_staff, last_updated_on, last_updated_by) FROM stdin;
    public          postgres    false    203   �       �          0    20169    credentials 
   TABLE DATA           f   COPY public.credentials (rno, userid, username, password, lastupdatedby, last_updated_on) FROM stdin;
    public          postgres    false    206   ��       �          0    20176    credentials_log 
   TABLE DATA           u   COPY public.credentials_log (rno, userid, username, password, lastupdatedby, operation, last_updated_on) FROM stdin;
    public          postgres    false    207   ��       �          0    20187    district 
   TABLE DATA           X   COPY public.district (rno, stateid, districtid, districtcode, districtname) FROM stdin;
    public          postgres    false    210   ��       �          0    20192    feedback 
   TABLE DATA           [   COPY public.feedback (rno, userid, feedback, last_updated_by, last_updated_on) FROM stdin;
    public          postgres    false    212   ��       �          0    20201    invoice 
   TABLE DATA           �   COPY public.invoice (rno, invoiceid, senderid, receiverid, invoicedate, sendernotes, subtotal, discount, total, invoicestatus, lastupdatedby, senderstatus, date, reciverstatus, transactionid, last_updated_on) FROM stdin;
    public          postgres    false    214   ��       �          0    20211    invoice_log 
   TABLE DATA           �   COPY public.invoice_log (rno, invoiceid, senderid, receiverid, invoicedate, sendernotes, subtotal, discount, total, invoicestatus, operation, last_updated_by, last_updated_on) FROM stdin;
    public          postgres    false    216   W�       �          0    20220    invoiceitem 
   TABLE DATA           �   COPY public.invoiceitem (rno, invoiceid, productid, quantity, cost, discountperitem, lastupdatedby, hsncode, last_updated_on, batchno) FROM stdin;
    public          postgres    false    218   �       �          0    20229    invoiceslip 
   TABLE DATA           �   COPY public.invoiceslip (rno, invoiceid, senderid, receiverid, invoicedate, hsncode, productid, quantity, discount, originalprice, afterdiscount, totalprice, lastupdatedby, last_updated_on) FROM stdin;
    public          postgres    false    220   ��       �          0    20240    position 
   TABLE DATA           a   COPY public."position" (rno, positionid, "position", lastupdatedby, last_updated_on) FROM stdin;
    public          postgres    false    223   �       �          0    20249 	   previlage 
   TABLE DATA           `   COPY public.previlage (rno, previlageid, previlage, lastupdatedby, last_updated_on) FROM stdin;
    public          postgres    false    225   ��       �          0    20258    product_log 
   TABLE DATA           �   COPY public.product_log (productid, quantity, priceperitem, last_updated_by, productname, belongsto, status, batchno, cgst, sgst, last_updated_on, operation, rno) FROM stdin;
    public          postgres    false    227   ��       �          0    20267    products 
   TABLE DATA           �   COPY public.products (rno, productid, quantity, priceperitem, last_updated_by, productname, belongsto, status, batchno, cgst, sgst, last_updated_on) FROM stdin;
    public          postgres    false    229   g      �          0    20276    proformainvoice 
   TABLE DATA           �   COPY public.proformainvoice (rno, invoiceid, senderid, receiverid, invoicedate, sendernotes, subtotal, discount, total, invoicestatus, lastupdatedby, senderstatus, date, reciverstatus, transactionid, last_updated_on) FROM stdin;
    public          postgres    false    231         �          0    20287    proformainvoiceitem 
   TABLE DATA           �   COPY public.proformainvoiceitem (rno, invoiceid, productid, quantity, cost, discountperitem, lastupdatedby, hsncode, last_updated_on) FROM stdin;
    public          postgres    false    233   �      �          0    20296    state 
   TABLE DATA           ]   COPY public.state (rno, stateid, statecode, statename, lastupdatedby, updatedon) FROM stdin;
    public          postgres    false    235   V%      �          0    20304    user 
   TABLE DATA           m  COPY public."user" (rno, userid, email, phno, aadhar, pan, positionid, adminid, updatedby, status, userprofile, pstreetname, pdistrictid, pstateid, ppostalcode, cstreetname, cdistrictid, cstateid, cpostalcode, updatedon, organizationname, gstnno, bussinesstype, fname, lname, upiid, bankname, bankaccno, passbookimg, accholdername, ifsccode, signature) FROM stdin;
    public          postgres    false    237   �&      �          0    20311    user_log 
   TABLE DATA           �  COPY public.user_log (rno, userid, email, phno, aadhar, pan, positionid, adminid, updatedon, updatedby, status, userprofile, pstreetname, pdistrictid, pstateid, ppostalcode, cstreetname, cdistrictid, cstateid, cpostalcode, operation, last_update_on, organizationname, gstno, bussinesstype, fname, lname, upiid, bankname, bankaccno, passbookimg, accholdername, ifsccode, signature) FROM stdin;
    public          postgres    false    238   �)      �           0    0    accesscontroll_rno_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.accesscontroll_rno_seq', 113, true);
          public          postgres    false    204            �           0    0    accesscontroltrigger_rno_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.accesscontroltrigger_rno_seq', 247, true);
          public          postgres    false    205            �           0    0    credentials_rno_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.credentials_rno_seq', 128, true);
          public          postgres    false    208            �           0    0    credentialstrigger_rno_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.credentialstrigger_rno_seq', 284, true);
          public          postgres    false    209            �           0    0    district_rno_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.district_rno_seq', 1, false);
          public          postgres    false    211            �           0    0    feedback_rno_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.feedback_rno_seq', 6, true);
          public          postgres    false    213            �           0    0    invoice_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.invoice_id_seq', 1650, true);
          public          postgres    false    215            �           0    0    invoice_rno_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.invoice_rno_seq', 578, true);
          public          postgres    false    217            �           0    0    invoiceitem_rno_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.invoiceitem_rno_seq', 594, true);
          public          postgres    false    219            �           0    0    invoiceslip_rno_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.invoiceslip_rno_seq', 5, true);
          public          postgres    false    221            �           0    0    invoicetrigger_rno_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.invoicetrigger_rno_seq', 1194, true);
          public          postgres    false    222            �           0    0    position_rno_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.position_rno_seq', 5, true);
          public          postgres    false    224            �           0    0    previlage_rno_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.previlage_rno_seq', 1, false);
          public          postgres    false    226            �           0    0    product_log_rno_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.product_log_rno_seq', 579, true);
          public          postgres    false    228                        0    0    products_rno_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.products_rno_seq', 157, true);
          public          postgres    false    230                       0    0    proformainvoice_rno_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.proformainvoice_rno_seq', 101, true);
          public          postgres    false    232                       0    0    proformainvoiceitem_rno_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.proformainvoiceitem_rno_seq', 108, true);
          public          postgres    false    234                       0    0    state_rno_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.state_rno_seq', 1, false);
          public          postgres    false    236                       0    0    user_rno_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.user_rno_seq', 238, true);
          public          postgres    false    239                       0    0    user_user_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.user_user_id_seq', 1010, true);
          public          postgres    false    240                       0    0    usertrigger_rno_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.usertrigger_rno_seq', 846, true);
          public          postgres    false    241                       2606    20327 "   accesscontroll accesscontroll_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public.accesscontroll
    ADD CONSTRAINT accesscontroll_pkey PRIMARY KEY (rno);
 L   ALTER TABLE ONLY public.accesscontroll DROP CONSTRAINT accesscontroll_pkey;
       public            postgres    false    203                       2606    20329 +   accesscontrol_log accesscontroltrigger_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.accesscontrol_log
    ADD CONSTRAINT accesscontroltrigger_pkey PRIMARY KEY (rno);
 U   ALTER TABLE ONLY public.accesscontrol_log DROP CONSTRAINT accesscontroltrigger_pkey;
       public            postgres    false    202                       2606    20331    credentials credentials_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.credentials
    ADD CONSTRAINT credentials_pkey PRIMARY KEY (rno);
 F   ALTER TABLE ONLY public.credentials DROP CONSTRAINT credentials_pkey;
       public            postgres    false    206                       2606    20333 '   credentials_log credentialstrigger_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.credentials_log
    ADD CONSTRAINT credentialstrigger_pkey PRIMARY KEY (rno);
 Q   ALTER TABLE ONLY public.credentials_log DROP CONSTRAINT credentialstrigger_pkey;
       public            postgres    false    207                       2606    20335    district district_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public.district
    ADD CONSTRAINT district_pkey PRIMARY KEY (rno);
 @   ALTER TABLE ONLY public.district DROP CONSTRAINT district_pkey;
       public            postgres    false    210            3           2606    20337    user email_already_exsist 
   CONSTRAINT     W   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT email_already_exsist UNIQUE (email);
 E   ALTER TABLE ONLY public."user" DROP CONSTRAINT email_already_exsist;
       public            postgres    false    237                       2606    20339 .   credentials email_already_exsist_in_user_table 
   CONSTRAINT     m   ALTER TABLE ONLY public.credentials
    ADD CONSTRAINT email_already_exsist_in_user_table UNIQUE (username);
 X   ALTER TABLE ONLY public.credentials DROP CONSTRAINT email_already_exsist_in_user_table;
       public            postgres    false    206            !           2606    20341    invoice invoice_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.invoice
    ADD CONSTRAINT invoice_pkey PRIMARY KEY (rno);
 >   ALTER TABLE ONLY public.invoice DROP CONSTRAINT invoice_pkey;
       public            postgres    false    214            %           2606    20343    invoiceitem invoiceitem_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.invoiceitem
    ADD CONSTRAINT invoiceitem_pkey PRIMARY KEY (rno);
 F   ALTER TABLE ONLY public.invoiceitem DROP CONSTRAINT invoiceitem_pkey;
       public            postgres    false    218            '           2606    20345    invoiceslip invoiceslip_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.invoiceslip
    ADD CONSTRAINT invoiceslip_pkey PRIMARY KEY (rno);
 F   ALTER TABLE ONLY public.invoiceslip DROP CONSTRAINT invoiceslip_pkey;
       public            postgres    false    220            #           2606    20347    invoice_log invoicetrigger_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.invoice_log
    ADD CONSTRAINT invoicetrigger_pkey PRIMARY KEY (rno);
 I   ALTER TABLE ONLY public.invoice_log DROP CONSTRAINT invoicetrigger_pkey;
       public            postgres    false    216            )           2606    20349    position position_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public."position"
    ADD CONSTRAINT position_pkey PRIMARY KEY (rno);
 B   ALTER TABLE ONLY public."position" DROP CONSTRAINT position_pkey;
       public            postgres    false    223            +           2606    20351    previlage previlage_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.previlage
    ADD CONSTRAINT previlage_pkey PRIMARY KEY (rno);
 B   ALTER TABLE ONLY public.previlage DROP CONSTRAINT previlage_pkey;
       public            postgres    false    225            -           2606    20353    product_log product_log_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.product_log
    ADD CONSTRAINT product_log_pkey PRIMARY KEY (rno);
 F   ALTER TABLE ONLY public.product_log DROP CONSTRAINT product_log_pkey;
       public            postgres    false    227            /           2606    20355    products products_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (rno);
 @   ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
       public            postgres    false    229            5           2606    20357    user set_unique_email 
   CONSTRAINT     S   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT set_unique_email UNIQUE (email);
 A   ALTER TABLE ONLY public."user" DROP CONSTRAINT set_unique_email;
       public            postgres    false    237            7           2606    20359    user set_unique_userid 
   CONSTRAINT     U   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT set_unique_userid UNIQUE (userid);
 B   ALTER TABLE ONLY public."user" DROP CONSTRAINT set_unique_userid;
       public            postgres    false    237            1           2606    20361    state state_pkey 
   CONSTRAINT     O   ALTER TABLE ONLY public.state
    ADD CONSTRAINT state_pkey PRIMARY KEY (rno);
 :   ALTER TABLE ONLY public.state DROP CONSTRAINT state_pkey;
       public            postgres    false    235            9           2606    20363    user user_pkey 
   CONSTRAINT     O   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (rno);
 :   ALTER TABLE ONLY public."user" DROP CONSTRAINT user_pkey;
       public            postgres    false    237            ;           2606    20365    user userid_already_exsist 
   CONSTRAINT     Y   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT userid_already_exsist UNIQUE (userid);
 F   ALTER TABLE ONLY public."user" DROP CONSTRAINT userid_already_exsist;
       public            postgres    false    237                       2606    20367 /   credentials userid_already_exsist_in_user_table 
   CONSTRAINT     l   ALTER TABLE ONLY public.credentials
    ADD CONSTRAINT userid_already_exsist_in_user_table UNIQUE (userid);
 Y   ALTER TABLE ONLY public.credentials DROP CONSTRAINT userid_already_exsist_in_user_table;
       public            postgres    false    206            =           2606    20369    user_log usertrigger_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.user_log
    ADD CONSTRAINT usertrigger_pkey PRIMARY KEY (rno);
 C   ALTER TABLE ONLY public.user_log DROP CONSTRAINT usertrigger_pkey;
       public            postgres    false    238            >           2620    20370     accesscontroll accesscontrol_log    TRIGGER     �   CREATE TRIGGER accesscontrol_log AFTER INSERT ON public.accesscontroll FOR EACH ROW EXECUTE FUNCTION public.accesscontrol_log_trigger();
 9   DROP TRIGGER accesscontrol_log ON public.accesscontroll;
       public          postgres    false    242    203            ?           2620    20371    credentials credentials_log    TRIGGER     �   CREATE TRIGGER credentials_log AFTER INSERT OR DELETE OR UPDATE ON public.credentials FOR EACH ROW EXECUTE FUNCTION public.credentials_log_trigger();
 4   DROP TRIGGER credentials_log ON public.credentials;
       public          postgres    false    243    206            @           2620    20372    invoice invoice_log    TRIGGER     �   CREATE TRIGGER invoice_log AFTER INSERT OR DELETE OR UPDATE ON public.invoice FOR EACH ROW EXECUTE FUNCTION public.invoice_log_trigger();
 ,   DROP TRIGGER invoice_log ON public.invoice;
       public          postgres    false    214    244            A           2620    20373    products product_log    TRIGGER     �   CREATE TRIGGER product_log AFTER INSERT OR DELETE OR UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.products_log_trigger();
 -   DROP TRIGGER product_log ON public.products;
       public          postgres    false    229    257            B           2620    20375    user user_log_trigger    TRIGGER     �   CREATE TRIGGER user_log_trigger AFTER INSERT OR DELETE OR UPDATE ON public."user" FOR EACH ROW EXECUTE FUNCTION public.user_log_trigger();
 0   DROP TRIGGER user_log_trigger ON public."user";
       public          postgres    false    237    258            �   �  x���=��0�k�s��+��L�4�.�"�"M�dr����&����{O�#E�,��+ ��?o����<?^*���$S��˗�(/؟��m?޲BJB3�M�tf�+KNJn�\&g:t��+q2e�O0��Z*yr0R�0����"&V���!�[��$)`����_��q��L\�x�2jf���si���S�t���ւ�9���JZ�eE�ѣPX��ogc2h����9��9o��{���ի�df'�]
�&�xR��
�*%r-y�5�$p<-~A��h�z����?�x�M�Z�� ]p���p=�c�bG=1)ƒ��<s���8?a�9�q�x��U䄑��}����G���/�^�! [���:�?b� �=��1tV�C���RHHZ��Gȳ���u�(����Xx}$�� ��U�V�M/i�Z�k���"\l+}}I����]      �   �   x�m�1� Eg8E.�o���*um���z���iU�-����Az�@�@}�=�L2�M���&[،�6�,��c}�¾���r��A萬�N'~Iu8Uc�r8E�`������eoJ�\s9�|%��%�ZRA�	J���,�y)ըO󬗼(� ����J-G�����i=�      �     x�}��j�0е����F�+�m7��j+��m�~��}�8�bJa�g�@��1 �?�r�C��[�U숫�З���^	g\��9X�-*Z3����V����I��?;i��a� ��,H
`�	���|��[�pe���O��΅������D�6���b�8��K8�	�,kW5�=Yj���93V�c4e�r5�f �ֳ��J�o�(���<5c)��i'		�>9
!�Nz�x�1wn �/�bs���V�
A�@��Ͳ��csZ      �   �  x����n�H���S�2���?� �䐽Xp%�&"Q�D;H�~kHymkeq@���T���!��G������-�v߭��vf��V�z��Kb��}����VlY?X��tcS͡vb� a��է�3
$��?�~h�nuX�m�n3R�§��~x�#[K���=hR��Lck�Z�rm�!�!(h:j�#M���Z��b��47j���n� �_���ԉ����v��ݯ'�,�Ś�I6�K�������Ƞ�jMdĉ
G����m3�7=�C�(�{�S�ц�Qi�y��ҝ���X�%#�S;�2y�2m,���ɧ�n+͡f���E��X�<��y.�i�tz��dN�ųno��5a��>��G�=܃�no7]�}V����q!<s�Jp�"#�E�!�a_}:�^Q6��/y�,��M ��Lj��#k|�%L�=q��hBVr��;���&֙���l�K�\])<=OM�<�_;6�\�輳�P^)�`�%�Z��@A4`Sa2=�$��<[�sFt��;�YI#L-J��1�����=�[I���J>�m̅�=�")��M���������dyv����E!%<����¹ˬ�'��C�8�_��@��\\���84ͪ�IL���`,���`,����X@�v6K(t)K |M�� �<1JpzUb����j�ŗ�޳�Sw.a�R_-��RG,�;�%���J�|���Y�Ԝ��	�o=�0���ȩ)@v�d���s�&�֐`���+�S����I�'y���(ż��0+�!0)7�b��9��OA�����C�\mv�vh�1mn_Vx���k+&���E�z^$��[VB@���\��=u��@�-�����r%_G��9k��2�&�T��v����-��<\�֋ȗ@s/"�qmC��<%,PQ*��+�:b�BP��S�~�6{=1�c�O�R��ا����\��s_d�'��x͗
�;���7�X,��4�      �     x�5��n�0E�寘/�sفV��r�YD�����v#Z���u�ٜ�-���rBYF	�tE����_g��,����|���~�eYU���A��N�����=�w���2[��ʏ�k߳��c�h?�x>��N=��
�U�л���s̞i��ϗު��PY�T��<b���Tr'�����Q	߃���g�$RI��(̐J�
,�;����O7HD��#��c?B�ُ�ȗa+�ؼj���q\���"X�{����3�3Dl�{�<��U"�`�ZQkq�/y�D|��4Ԯ�:^�'��� �.���7�T�A�Ԃ���m�)vt`o�Ld�C���p}���4偌#_�)h>4���_���!��i�ڀ����B����1ťb�N�/�a�b��A~��mǵw*E��O22噧	�PE�4��,X��"����A#��T������)��
����Y�5=�!e�y�&�W�|�%W��5�U�:��Og"v5u�K#m�k�'�Ê�Ƴ��[)��R�.      �   �   x�퐽
�0�盧�$ܛ��fsqt�c��^i1i�
�۫(�Vg�L����#����قA�ZE(�n��%Y�00p�y��c�/Z;��<�In��}��!�	����,`M�_o���Μԫ~��xIL��DVN���W�-��
J��      �   �  x������9r��Χ`�%Hƅdz�$c��d-��V�L� ��u��*�*9�'�@c0S�ݧI�ST�������,R��ߕ�ˏ��Ys��g�}-?����_%�������~)��^r�<r)7Q:�s���и�~Ϛ�f
!BvT��{����A�?�S�$�6
�zj?��K!�P/Z*�h�~aD㪎���T�a�nb9茣:�n%I���S>uj>��wk�y���ԠS�F�!�J��{���zNq��j�+�)B��(�"���4Z�R!�PT�?�_��/S'�
��6*�v��]so�9uu�����ݫ&W���X�,D�gTx��%*������*��d=ש~In#3�=P�.���35A$x��,�u����� ㍔�bA(`AX��ʽXBb�{�dA�MQYc:
��¦�@l'��!� W�pY�l$ҼS'A��NG����"�	@�+@��S����4����� ���3�z���t��CD[8��8(��k�{�����^����L����
��z��!��a�Z��^��u!"�"l��� 4׵
�-A��L��G��B �$t�E
z�t� ���R������ *\([�μ�� *w��TK����z��� ��tdS�[D��B�K�\���`�t�'ע��`� T��?^jyz ��v9��U�= ��A��"��y��v6�(�=�D�v86*6�"�"T�٨yt��4+#. �"j8I�Je�g$�A$�<ku N���H��E�0�����q"���$_�d��n<��ق	�@B��DuQ�"	y��Fl� _@!*52wυ@Sl�2�h(GF��/����\V���#C��F��/���!�����J��_p�!.O��B���2��\�6�\K֐���,<,ѳ��L�فg;v,F�i\�v&�r��"�5.�6u:[	>�����v��u�4M�6u�,\יR�#�f�[�B� ����)�d�� �v
���9wj�ʉHh�p]G����ݤB'���U.nT�B/���>�
.Gٳ@\���Ds B� �t�c��S�A(��S�
\k	4�i��	Ϗu�f���U�͓P���8(� ��߷0p���8���<�Bŋr��@�~�Γ*�V���@�~��@(55�R�h���~1X��8�q�wa&I�Y��K�A?��A��[��	��<h�W����S�A 4�RS�Q���0�m^��s����q��E�F��5�`�Ac#�h1��A'�`�A�ϩK�{s�O��8ȃ>����2�-�`�t
�t,{+�S�A����*��Y&���q����x9\	7���q�}v�[�Zr�x�<���)��u�:5��A���Ն4'd8����W�7��:����m*t8���|���X�Y�`Oi�Ƭ���#t8��Qި[υiAZ�Y��A�Y��j4�`y�� ����Kv�FZ aWHcc;HsZaSH��-)��@�$���ʼD��~TUl"L(&�]aNE��ڊ���	� 
��yCg$ۢ�l���6xIc,�8� ��oqS�V���!t�i�-�ʷ�%��愷L����qqWh��ֆ"?㢮���B�D�GP.��P��ʸ�tJ� 5�����+���xڼ>��E]7�38o:��|���-��X��
��nR�-�ʶ��cwC`K����2-n.�M#T��l<���,�괷{�>�' aeY����S��;��`YԕeqK�xn��:�V��M!���h6���YԕgqW�̈́T���Ӣ�L��BVgI�#�kQW��]!c�ouBp-�ʵ�+�x�v�9�@��mqW�#A$�^�|���-��Ǹ�p��&(����2.����N�UuV�ŭ�snWk�2#�sQW����0��]:�����+�⦎2}�<��	TXYwt��D[K�`]ԕuqO�W\�	���+�b�!ܯ
�T(i䊪B�	+���ܩC����r.n�t"��,��qQW��M��t7��-�u�[���;��i��l|���-n�Ѓ�3�ֿ���+���l��b�Q�㢮���:�&e�F��E]7u��_=�q���2.n��6��>/��qQW��=ͬK4p�-�u�[�ԩ�[7O��oQW����6GG�_�xV��=�q6������+�⦎��#h�����+��Nc���>�E]��tj�Y�G!w�mQW��MZX��d���kQW��=��u2��v
�E]�7u;J��1�ע�\�{:�o�4�!���+��Θ�A5��������+ӢG�g������W�	�����+Ϣ�d@�uh��[/���E]Y7u��&Wa=����+�n���q�uw�+�ʮt*j��:��p�K� �`eWܙ6��A�j����`W��o�.´1�x�Yue#|�gn^�f�*�!����\���w��7)?����?������cGg��o���ǂy�G�7������ڷ�z�X���k��`� ,qޠ���N&9���z�\�����Õ͹i%������sPa&��A���(U�gʏ�a�Oh�ӯb�U�\��б��߆_�9� z�l~�A�?y@���#��>qa}�?Q�~�>y�{*�x��LҾuko�#kAK����R��n��&�`j��~�1-~��Q2{4����R���_��̑QO��w�}tUE�����'1�m`���}4<M�-�/i��Or*��ch}��>Z����W�ЪcdN��zZK��ֲV�K���RZ�k�ݸ^rx��iN��M�7�G�A�����T[�S�!b�E)�{ti@!܏&B���\X	Љ���0p㣥wN��7@��r�`�4���^�F��\R�$b�apB�^�^��˦���Qu@+`C��|hb��G&7�H�9�qUV7u$�(�l���Ui��z�J�T��^�^/kL��;�+P�wL�i����[0H�^�ʯM!M��T{S�a��]��k�b�X@^8�v!�_�z�`���͂Y��x��+TPFU 	s�f�C^P�*��,قi��x*�X�{���a����|D�ȾYpO�_���Z�R4w�
��+�o^_������� ���^J`lD��jpFb �.�eڑ[�?D����+|:0�-o,8*�72�]�͘�L����2�,-�>[k|���Wxm������Zi�0}e>a��S爍௴v�+3[z��Y�XZ;\d��'T�ʦC�YZ;�����\��a,8-���?�үZ�K��[��[�V�F_�w[�/��T-�8����Vq��*��^������_���Ck6���n|��W�k\�CZ�S��zi}�������uh��
�諜���l~�!���L뫽���YqH�Y��i}UI�-�F[�<fL�+n�k�8*�·`ȴ��F����gb�U�޿/L:@�k��8�*������O�"�_����:j_~!UCf�L��b���İdYR+Cf�t�U���|��'q:�e0h�X���4*����i&M/���3g'V�4���Q����b�*l^�Kga̚��1ﮙ�o��>�n��æ/{��b|~��M8�;����e�y�t�*�nl�n����F682�s2K�`��e�yd�v��m^a��i���Ѝ2x	���l4�{����e5�&����.v5}�Ϩ�L�9�/*�b�!�K�/{��ۚ}��_�:�`+<��f������V�J�ď����7M�f9�����˦s�&O�� ZD�>�<�?R�~Ol�~^h�x���T?>����U/,�U[�&Il1��bnϻO�*�x	-%3���[^�,L�|��L�k���o�櫤�R�����v��?6��      �   �  x���ˮl7��9O����� �H��"0A���SU��wm��Y�:��Z^����߽�������o�[ ��~��W����'v�o:}��՟~�����������?�����/}p�q�޸��e	$m~�Cj�u�y����!l���8�R�]IL���^��@c\���x.N������'0�O�$����6ÍF�)6馭I{]�ƛ@�N���=>��_�曌6��g҆�_S,R�u��]|%q�&n1�IS$Mp����mZ��1���XЉ[��u�i����0�D't����F:P}Z�X�+����)M�DMxb�g/�m�r�6�r�ѩ�N,����U��6ꍨ���N,�<�^7�6���LtRAg֮SV����uE�sOxR����3�@��1�褂�m��՜sY_�HpR���8l��j�	M�A�H,�4t�v"�v�|�=m�l�@��	L��6ܺe���X��%m`�Xڰ�i�jM_|F.bi�j�<D%	K��%D�2�N�a�=����m���0��#Q�;T>ʱx��n�Oxw�|,�)�k��'��K���x$��H^��D&_$cu�՞-��3���4m��ފN��Nd�E2M{�������Ld�E2ы|+�v�;�|�Ltzx6���ӝ��d����Յ}N�ru����P��@̄�\\0M{:���'<�)LӶ���[�Q��rL�@�n�٣p%0�2�,^�X&쾁X	L��ĦʊM��d��\ӊpSL�����A&��(���W���-RVBS.�i��(��@�ۯ��\D�����R���\	M��h�/=����1Y�L-Ȥ��(��m6m��c���Z���-�?PGK��-�KtjAg�ZML�[�2����1��ևz�gV'Pz(�M[���'B� 4��u���X��ՂQ�	��X<�ї�'H��� fR�&�f<y�TH?M{�QTq�w��]���Z`�;/����d��c�t��O�r꒹b��c�����jˢ�.�@�>�6m%�>-�0�>���Y�ںUDS\=a:60}��ޚt����$H����I|�5�
y�Cbt<g�E�nKД����A����ok-��5���c�'��E�f%f<:.ʾ�٦b$EH|΋|z��\�����WR��"�PH�΋������S���s�G���!���#�1�9/�����Ï��y�O�/
h;~�\<�9/���v�:&x�`t^To��F��|��������jUt|�D�H�.4�>F<yBt]Dt�Jh�����0!�..�#�=f�:��\<�.:<q�"gu�J��u���}+�@�]J�����[�L�:���S"t]$t�"GF��Ӓ]	5q�݅Ws��S"t]$ԏ�����bFMD��u����d���	�D�H�V�m���'� ��EB�-��V�O���3�_$t�"�7D�V�. �m�S���+9Cܓx����eZ"q��x辸�r�mR`y�3&��q�>�V�ƓS/ �$^Ew���6�+R.sR/=P�ETڲb�ǳKR/=Q������#�5���3�x4f2aWO�B�:ā��2G�'J��t7d�W#[G����c�.R
N�M�Z|���9ĕs�dZ���ŋ	����;t����O�b9J�!��C���=tK1��x�d��>t�]�5�bO��?ĕ�@݂�j���p�je ��s��>��d ��@t��#�����������ɗO/�Gc����kK�ͮN��B�qe!:��X,҈II"�DS.ဘ��}�H"�D'���ӝ1��Aĕ��D|YI�&���d!��B��.^�������<D�,qL<dEzI."�\D'�)��4�gO�V>�u��I->"�$'WN�u��`����d%��Jt�>|k���ǳ'N+3щ����t*��d'��N������v��*�����hW\�8N�x"�rmϋ:K2��.��I�"�<E��ǘ����>crq�*:g_��^�O�V��]�ᓎ���%���+��W�/~o���mi2qe,��B��r
mu����������=������Yt�==��:}�0���+gс��5c��鮉'D+gѾ��}�͊�X2���+kс�[il#�e]�q�-:�f]��e@rq�.:Gl�+��u�^ĕ��@��Yg%��PL�"��E�ѕ�9�gi�`ĕ�h_��W^d|��d0��`t ��[�X%q��F���ô�ō:ݟ<Y����{��6^����d1��bt N�{�D2<�ǈ+�с��ʲ��'B+�Ѿ8��Rl�B�rq�2:w�X���2��e�/�q�Ak�{��fĕ��@|y��V}�|�|F\�����nWt�@'�WF�]��tl���9`2qe4�,^�s�+�D�YV���|F\��t��C��:����i�����@<N�;�W\�<F\y���x�m������ň+�QG�'�{���Z����b�;+�%��� (�.��d1��#Z�w�a$���	�O�B�������l-��>�/������������UO�V��O�>�L�����H�$������~RU���;���x�e,9L�ht��65;���'^m������*���}z��NRc��n��^H���~|��� �[����=�����ŷ��w/$�|���?�?�r$Y����vK����n8H.���&ig���=�����>Q��j{�h��E��F���w9��`��9���;$G���i/�7��-?��<�\I�ީ}0������Z�ce�/�ə$���đݓ(����"ٓ佥�h�O��@T����<@�(�{���G���i�Z=�H� ��(n�����D/��f��6���� ��t�`��P��8}>�_p�G�J�%��0��g�rJC�z�H�%��(}x-�N�)�\H�%y�*^`�	��C20	oP�d����d�S�@������`Z��$'���4,�b���ސ�L�����F�����?B�_���پ1A�'�y��XჱTw������|A�k<K"Y'w��g�g�}�ژ�p� $���F.}�^ف�:�C�%���F�>���H�>@"Y^���VT�%�����$J�jS�%iT-��$�(bw5���1��$��d�)��� ˋ>@Y7��� �uW��6@"Yw��P|6B��M���P��.��v��AG�%����}:Z_�zْlP�/Hw�6����q?$'��V}���{DD��Nf(/()������K~(/Hw�G�V�ZU��5Y�d� �Q�������ȉ��=Œ�͊���NH�(/��/`�>V`p�c�?J��4�~�@W��@�Hɬ�o�_�[(tІKA2Jɬ��� ~V��@�>i2Kɬ8��(� E��a&$Ô̊��7�K�ެ���H�goMG�t�Q�lS2+�?�������Y��Ի!~�&7�yJf�� �We�s|�D����k7�	*$�̊��'Ӛ���-$����|v�W����khZ:��.0HN*YU�j�
���ϟFз��V��o��iM�Sɪ5�࿾�d��ڀE��S%��ԓ8.*�u�/:�W%�
ՓYb_7E��՘���X=A�kD����V�UN=!N���f��f�es��;H\E7�J�֒�J����~)u��FH�U$������Y_�2Q4ג�J����;,�F�^i�<{�5�Uy�~Ҙ�WJ�`Z~��`E8�����#��ۑ�½�ͦb러XJ��ȿ��?��~��:؈���XZ6	���0���]��[rdi�#<�'i�14ڨɕu2����� � �\�9g�?��q��'�8�;ɡu2@�? ���s�����*�� #:���<��H��{l�#�<�����l?|$���	��;�I��]����ﳀUb�_�Ծ|��_���      �   �  x��[Kn%9\ۧ�tB�Wz�� ӛ�� ����cH�is�~��0
�F3S
�A���o������v����_o����ֻ��~�����z�>z��Ͷ��;<-|��I������j�)p	�� ��Wk�x)xy��/"�=h	���5�> {�ѩC.�(F.a��@��`[����G8<�_�0���>�Ўpz�^*]z<�{����-��h J 8��s�%`�υ��/�O�k�b�P({
¯f����]�4
�@�.�O(�=�Wo���K�q�&��N���t��!

r� �(�� �Kx�{aG���ҥʈ�~R(�m{�V �$2�& ϗBB��>:_v��P�;D���g���i�w��%Ѕ}H'4�ʟ�2^��|��A�����y({x4c��&�����6���s3G�)���.�sY�@�u/������z�謱�ZXG��p��0i�p�������?ߒq|���>� N|���y�A��_X���W��@=XI�/M����zt����Ӯ�M{���сz��ˊ�Ƒ�B=:P\5X�Ph�gV��@=p�и�+p~z��^�Mr�lL��P��	�V�o����||Hx��� �~��!��*�m�th��Q��/�4Gkv�r�F!�G���^K�1
��H<^��J���y���ĳjo��9#��0��y`�����7�|��F���|| �e\K�&X�C*�Q�����
èO��r��!�gS�m~h�Y�'����f�i>;�֫��O�yo ;�r������ �%��+��_��rK��}�������n��N@�j�5��3��|�N�}�o��k����W��~Xz���\e��� N�֛��b���]8����$������Y�z�p���W�WPm3���z�A����>����qz�^���[�#T�Rp���-U�8����u��>�ݑ�c����?�U��{�M[�^����g��#\Êo˗/�S</���&W3�48���c����Q�|�B>=p��{נCs���v���+}���w�jw7ɑ_��;�h��c�mh�B<�U����&����N�#��8�!�g
�Ɓt.X]��d�|�B�q���Do_۞��B�q���!�N$_��n����78�Pn;ҍ�����ۑ��,ҍ�����zF��B�q�w��.:z�}a�8�N�K�t� #[aa�8�N\���M��ڍ�t���h���»y��z��.�ӄ<2Xx7�N�tp\�z�����ό�*+�z/]a�<�N�ǵ:әBj`a�<�N���&C%���nX7V�Bck˗/�����F�*si�ºy`�O�=O�#����ӆ}�jm^��
��ucG�Ƀ�F>��u.8O�fK:(FSTl��'��˶-F�TL�8D�м�����*1�biPۑ.�s��a��G�e�n����z�����p�y��ςyXo�O��eG uC¾}�-~��c Ow|M�s1���hP/ k�/v)�_<j���AzgZLU�x��)@_�9�h(*���Ξ�,c�C���~��go?'}�_�_��g`�t�==����
 �Q���;������G }�PHx0�"�qY�8)Npq4�IHNK�V74lE*�mM��[ٵ�D��bhP?2��FL���@�Ҡ����oO�s��Ap����RQ�H.������Y+��B�������#K�v^�5Z�q|!������yl-��bk���c��mY&��P�G�H}2�<���� 8f@^�3�+�a�R17����U?m����� <f@v��V��#2`17��FP�^�2[�A!!`�!�dH�\��í�����^��b�Bí��.�S��^X�G���ջ|NS�:{�1��>��+m�����/W�pPq8hk����g�nle�+�m�=��]h��+���o˾x�R`�f��!�� :$@]�v#}�]�7��O׍�i��;w{��@<]�w^�
�̥/�ۺz�"���h�bo�����c&�g�*�m]���~�u����������sT��m���8y�eiw��o���^�W��cܓ��l��_��9	�_���^��I?�jv�{q5hk�q6����Tk���:>�n�[.����V14hk��^1zkn\a����z�<��4xa���[p�nI�\�$m14���y[:fl�������ք�Z�p�3h��|�Xn�睋�A[?o���R�^W^X'�����%ZƸ�t0�d]]���eG�q.^����Yp7�:��c8��� ��.�k � ���n�H��֪ڋ�h����p+3V���	�?���\����H<��q�^��mm�m[<c}���?�W��N�,���;�m6xe�^�k��G�0m-@e�-r�72V �-��7(�ӏk߻�����9bg
��N��%@߿>�����e��ən����!�-3��7��ñe��>鞨s�2>�+y�k�O�q��Ga����/`?=oP�\*�1�@����=�W8��&�F�����(���6uJ�7���}��W�񚽥���g0�eZ�7ꆻ�˻V5��?��GķaM~�u�F�`N�3���9'N�����#�BC�����>�����9[��,p8�q]�Sm1Kx�bg0�=��~�u�qm����x����Ckc�޹�|�U��~�i\��~�¹��ڠ��ZO�$([����9i�g<����	��5b��rt�\����9������Yn�w/���h�p^3�a�q���`:l�r��t�,3���Oϴ�T�=(���L�]7n�ۑ�޹x]���sM����/�����=�����]�x|w5��ݭO��{Rʗ/���`�t/2��K#_�p.�<����[����o~3ܲ,0�+_H��}C�QlirJ&�bf0W�|�o��b6��`9��uM�o�(�O/F�4���KD�/�inIH\+=	�ƈ��#��q�18����ݨ� ��s틉�r�p�@�k�������`9t�x�^�=���b�R%����Y_���z�Q�H�����8��C�>@�
i�4���N��e���ɥ+�Ӄ4��0����q�.XE
����2��������|c�0�e�$��u��=�o�����M�i�=�uc�M�/��Z��U�ǮJ��ʏ�(.���6	��sEB䝋w�c��_��y͕/��dp��Lj������\\�5���m�cw`><�ak-nDr1-x�r��fFb~�Ų�;���D�L��:.��-�V�2 ����uv��||����9����$o�Y��_��v�X<?��խ�~e������ZO�{X\��BZ�V����X�/���<���fl����I�P��,ޤ v��X�B�5%X�AY��!�/����ƍ&��J13�K1���[zq4�K��==]@�ٹ[CJߴ}���a��er.Ά ����U'�'��|��|�2�}fZL�6ji͖I������=�iq:�c8�ŉ���X~SG	8k]�;�tTO�cx���Bk*g�*������2�K�����%�vh���ߚJ�����}���ﺗN"��F�?��������1
GM���?�њ����&�}(�n�D�~-杋!�=Z_h�CF������&��A{,��~����]�_ѭ�؆�?~��z��~��      �      x������ � �      �   g   x���M
� ���)����Dw�a?B�
t�G��[<Ḋ�k��f,3�[�:�#�Q\/�E���{�-�`�)5�@p�������57Ko�� ��2R      �      x������ � �      �      x���K�9r��W�Bo;Aƃ����{30<^`4Z�Gp����,��MfVe������F���|���a�C��H,�ry�������_~����o������
$?�����/�.1-ęCy�����_���_;��j:��Vܯ_>}����G8�KK�R�K�
S|�o�H��ۍ��zX�81*���q.��H����/�~|�7�EO�ʆ��G\Q���/����?���O�?���$�ޢK���%�p�.I���M�m������x�����qc�'}�E�%�w?ly��Eo���a�?>���_~�~�In��+�Eu���?`��L߷��}-�w�i3����U6Կ}��W����\��Q��Wx��\Tn=�kC���i��t�ϯu
{`Gq�J�[����-N�+q���ț>���-ȣ�6U=���Vu��=�#�-���	��hx��~���_~��p?��z�R�F��� BWY����"�(���?��L��ӽ�WF��X֚��m+n1�؄��Qt����߇h�����ͷl)�|�%����dX�����VT���S�Г<ފ�k�!N\5�����O�a��?ꏱ�׿|��������o������ŷ��}�IT.BU��o��+��A�������M��V���1��vv�ٵz��"��j����~���H��o���O�ձ�9�-�7t��v��X.A�P9���`�p��k?��,qo�R�M\/.�K�u�������Xޱ9���3�"�k4��hbo�G\ݹ)�Y;��6(��XL},ސ�������%^8/�h�t;ڔ����[-d92]4.�ی��`!'o�G�h����B�y�)��7�����^-�&>ek�u\�m��l�C��O�r��x�K�~׵���xBqM|O��>�,5�V	�h_�ސ��&>��>��k��9�>pE'_	��<�Z���9_$,�2���%�|�Q\�����.�==\P/�B��,I��>%�ɖ��.�XӞ��Xɭ�EY���e�OɤW�Řk��+�҅yIZ��CɔW�Ři�D��²�̻@�	�:j�1ײ�]9�Z7�V}�%$jc�N��g��k��k��+�^Xx��H)���tg��kbMw��m#�>ۋL�u'���ۘk���n��ah�-�v0��Q���:_D�9o�ArNe'P��sAu���Zڜl�,F�%_'>Ă��p����{g˖�
�.{�=���|e�
n9�J+Tj�YB�9��17[���c�v�yWs)����X��,^�}M!/�D���YAt��x̵�[wr��.*��'�
�+�U���`�^��%�E�"��Q�
4t����zk�)��ޡ�I0FW�=�kv��ԗf���B�[��e`S��^^�w#��Eb[<���)�\^��1�����8��}�UK�JF��о|D&��]�7����Hn���H��#2�1�K�F��K����F�Պ���"��p�%SHV�ƀr�U�#r���e#�L#e��I�Br$_�8 �;U����ċԠb_3�*}�͈��L.֥�P�����d_�0"�*Ӊ̥��@Q�zaY��p�Q�z"�sm3�%�H�t)��~LF]ʉ�.�z�$��*�.՛�Ʉ���R�/Ҵ"0D��.՛-�ɨK9�-u�R.)$��.՛-�ɨK9�-�{R�Z��U@��M��d�%��;m�.u�,AL��L޼sLF]�;�p��D^��6��.�/�Ȍ�tn�l��'�V��N]z�p&d�%����H�K��wt�}ygDF]F_��uU'_���U��,��3!�.�/�tjErZ�Z�f�xg�g�dB�y���D�M,��G��X�����T9��$={;2H2_���M��rB�ۗ*Wz+�[k��;]!nG�����ZN踯�ZNȰ�겝M� ��}gc��>G�U%z��vT%��v�˳3A���릝	v�]��	ڌ��u����Bt�9l���!�UlE6�5�	��k�լ�Ys��d����~]Vgq��Q�ڈg�aB5��4��u3��jt�	&hP��v�	7����;��m���y<���Q+]��L9����F<�Qcr6��k�{#�뢙�5�n���c,T�ɹx��[?��t/V���l�x�&d���3�S��NBP��G<�gr¸�3�F/�蔪�
�l8�ų	��\<���J��&v��=�gc2�q��gtY���h���X 1�oF0"�.��~=]BZB&-��R@��E�	u�\���P�Y!+lQ�IG<�~2�ҹ�������ɾ���t�Y���Q��Γ�GY�K��	A�ٗ&��ղ�˹����S��/,�WH��[�&\�#���%�"�����#ٗ&`T#���t����f]�:�}Ir �r��;�~r7LP՞�w�U��u�˄�*��Fx\�T�adX|Y��Lh�Iѝյ;�7ͤDF��X|Y}DF5FwVO����$I� ����#2�1��z�F�V34	��FA_V�1;FwVO]=���-�E�Cv,��>"��ҝ����e�������e�9��ҽ��.�oS������[��Q��]��n����R�`�ˎxfMȨK�V^^ݧqI�KghХs+oDF]���r��1-����A��}�u��2��/����h6sˎxN>��du�w�4���͛8��ɾ$Y�ڹ��d���;���@e]�*Q6:Jҗ�G�;I�S|���r	��d�P��?"�Iҝ��:o��4��(I_���$�N���r_����P��? �['w��Wk�e���21�J_���t�N�'�g�I��K����K�#2�R�������梭�)�*p�1�R���'�;ŗ�z�i�\Ďb�u4�R��\0nw�/��F^�XeWۗ��h���K��^/�i5f����?!��˖�����9�HP��l9!ߩҗ-Wz�F�r�}�Xm�T�#[N�w��eˍ.�h����T�#[NȨ��˖=�keZ�Pf�U8�rLF׎f_�\�}��K_r��\;J�l9!�.����.m_3r������x�2�R|�r��\$/"�5��8��l9!�.ٗ-u=�.���F(e���ɑ-'d�%���F�>�K)�`�M�l9�{Gٝ-c�i�[�*�p�h�e�UI�l{N#�کZT�}�rDFU:��W:Q?lL���5�[sԳ|<!�*�sK��.\z��5������-'dP�m��z�������t�A'���|w�NqgK�cl��&ə�n�Lї-Gd¸��R�U/�j�,b)<=�|�r U�v�}Q��4R�p���綿����0nw��~OM��҆$�<8znv
G�G`�drgJ����TX�M@��K�2z�y�F׋���3|J��$�}�c0*Rݙ���˗J�CVԃ��f�rD}FE:�S<o���<���Q�N�����fP�&	�<�c���Q��Β��I����~��"�/K�x��87YW��WH��j��'y6Y'dԤsv��]�%��ѡU��c�
��d�<+]׷ZXH�v WO�\�3!�.�y�F�nQȢ�����ɞkx&d��џ)u5��^��h�evf�c2���՝)u=�-K*)�dt�e_��	�v��~{U���$btХ3Y�ȨKug�t۟+"H]�/]�ȨKq��Գ��n�Vۿ`0�d���u�z���*��1�{��v�1�=,�|���b�D��i:�R}�rDF]�;_���,��3[�c0���˗#2����f	�I��+2�{r���u�4�n�6�K�r5:���ޝ�Q���;y=`�"�l�oOξ�s��xؿ���W:j�ik��d�Z戌�$w���Ji]ڜ�`��:|YgDFU�;��nX��}̔#�
�2��Έ|�Jw���
oX��f�Ƅ��e��N��>n?�����C(K_���N�'�N�-ү<#��.=�LȨK�6]�ˬ͸+�V��ɞ[m&d�et��r7��1+O.�Yڈ���'������t�����]v�z��dԥ���F�^C�hFr�O�����Σ#zu#r]��*������N��|��̺OA��1�n�����t�Η���=�{�YP��|9"��ҝ/�z�,����֖u�˗# �
  �.����K�����XP��|9 �.����*��G�̈́�U��=GG&dԥ���J����nr�O���Q�Σ#����U�J�O���Q�Σ#+��6S�sWp�d�ё	u�<:�����ʦ%U
vЍ��=GG�d����Y�և��٫�mF+����tB&�ۗ/Wz��E����`�<>��,�����ˍ�İ��cy��c0���tʤ�kUc����18|��)3!�ۗu&tSe���3&�Ç�o��A��1
NȨJ��{:��s�ބ��t����%���*{���S<��	u�t�M�K�lBF]:�`i��������t��.=V�1]>�􂥾�!i��ٮ`��L��y�7����h�!��+]c�mS�K3���p��>˳�I��EZS4�;�ǧ��t=��q�R�>�c雐o�\Gֵg/{����O_�"�C~�w#-�?�eo�����.��ih5n����.}�&���*���a�!�}h��à�*z��!�V�X�V���Q�A�y�A�G�Ϻ�0�� ��//��� �`y���b����G�Ad�={Z^`��^7��G���
WM~����#��}�)��(޽>W�G@W~쳩P3xr�>���%��/h	(����O\���+�B��g��M�|�'JZ�� 즂��6}��b���H��
^��t¥�������ӧl��1��U��?�V|����;IKuϮՓ������׃��{�	�g���!l�u���9r%@:���ԃ��࿧���O/���\ԗ��L�<��w3P��k/Hk����oS���������oY�%�Z���:��?��b[f9<��$�ҏM�xS��8�Cz��]<�����4=,�Dش�h�������ylI������O��+{�&�r��t��@�8��T�����B&�z*�c:���K���ʖb�
1d�s��Q�'��^�*Kʬ��{f��!ǖ#}\_�+�_R왑~@G�N��a���b�!Y}@�b���q�Gx�橪F�݈S4�Y�$������|"Ou�����ɞ�S:(6�o�g�E���K�ƛc<(6�R��w,���ͱ$l��s�=ƃf�	ͮ�.�o[��M�tF���f�	�R_��$mH�u�͎��4-BF��c�p�i���������t�:[/��7д�	���fϔg#<h6�qh���7��Ba,�Y>3���t��Y_�ii�,�iM�|���5{j��ˡ�P���j��s#�14��F������7�����UB��u�O*0(���ϔ	#<�VO�9\۠�f��c;T{n�9ƃj�Ԙ#�Z�%���5�ʹ1��@�z��Y_��9e��'�j�L�3£jO,AQ�:Pj�w���ԙ5�T;φ�_O��/[�e]I��y&�!T;��F_�-MQ�`PH��y�8�C<�v^�Σ���Լ�Ȝ\�L����A�|�҉\����xǀdSm>�kGxPm<�ky���kKTai7�j�\;j�	��z~R�Zй(V�Ϩv������1Jn%��6�eSm>�kGxPm<�ky}�#�7~%���ɵ|��W�F_��1l��SJ������wS��Ec��,Cک���S#&mO�
�s��j�kӏ�?ģj�u��eݒ�~��#�M��}�Y�<�6x���_Nm�O�܂R@���~������[m�����G*��=���A��;�o���e�(C�j������~ïF?��
�T;��~�!T�#��~���lS��;�8�C<��Ԙé[��5�#�j��{NG��`���[�m��'���m�Q��&x��ϩ�����g
V�y�<�^ �s��}WI9�c����q����{;�v�o��ht�{��_�?:§ջ��X�E!C�ߪA��5�����[����׌�:>]z���T�(
��8O��Ɵ�A��t��)+�ce�5���]-L��ܫ7����:�W�&@Q��g��^Yo��i�-�|\P�
�!�{�9���]c�1��Q��.�1�P�ޑ�v(h=���VK�Qq>���ҽ�D�ᯓ��GԜc��(�Qd���g_��רq
j�3��uf��A���ȣ}�[1+�
x�g��^����:�2�z�h����>���|]�u�߷��ҚN�)z�����?�tO�z{���jv[E��߫3�tө���$qIm`�� ]��e��ӱ��=�Y���O��kbY��l9\�DS:���jHV�J���|�_�ڝƾ�W��T�R��%�N���ύκ����\��3�ߔ������^zE����2�BE�1=�q��//6Ψ�G|�
�>��J��(���Sv�W�v� m��_?��j.�}UY$�,�3zqJ�sEO�o��ܝ��6��j��;'�j��ᮦ��e�ԝ����)�e-�B(>��=��? l%��&��_����!�'�{�p9�˧�W2mV��j�Vr����8\%��a�98�-gx�]��ϿS�ߝ�~�|����0U�n��ߢ_:�=g�(�:�:��ݔ�|0u��>�O�'Gg��;�	L:g�!>�8�v��>��ȲPjŪ�'p�<5@�?��U98�����W��au�贆�����C�]�����[��R
)|���5�!>�n�r�//���ϟ������,9�d���?/�޽�R_9�      �   �   x��ν
�@�z�)�9f���+b�Hm���ͅk�T���pUӹ���3	��F��G7}q��������ʴv�"+a%��%ZaޔQ�UȰ&X�%÷�k���?�d7�,�2{zM�y�*�h�n`h��b��ڱq�w�}�8�      �   �  x�횽�#7���S�D�(N$)R�RHu@��-By7g��Y�H#����[I�'R&~�������o(&_�/���bx}c�u}�+�MpC���l���ڗ� �����{���/����#�@mS� 
X$q�.�Hi��$ڊ^I�)�n,UՌ��D��$���hT,�h:�7�J��ʔ�H�H��:��V�f�I�GH?Cj�ʝ�Q�����(�M�"�Ąj��#����
RB�]k;C�#&��b*I���$�ت7��I��O߹�"ܠWbh�&O8<EVz�*��q��mګ��)��i6�7lՕP{�$
? ���'�b�8��L�p����m��c�R(���.����qD�TFT�B���'��U���8(" �-�,���!b�$	�Aqn@�cD���!a/t5��i��FJ�Z�s@"�#K �
;H�z�������G�@2DX�s��0$�>�&Ё�XY"_�p�8nSB�� ΢t�FΜH�3�����U�HV������B�%Wn�r�$��B��F �[���B�E�@A�U���!΢��#We,�4�ӓ�(?#_as�UH"��9۵�t/*�g�$U��,�,�F��@�H��8�si/��^�?^�����#��Ī�EhI��~��vX��(w/	s�	L�@�N7 ��z�d�����~I'��c��-���1R9$h�D�QțrR��	
�~�s��M�'�W�QD�T��}�ޠvP>d!q��I�`���ܷp��$>0�7k�}T�U-ET4�Bx���-��.�B�\���̨h�8�6Q3)�d�8յ׆HЊ&Y(MGE����nE�,�f�"��l�<��I��Q���bT#��d�&�Q�-Ǣq�U�E;��Ϡ8R�M#�|$�M�h��p�:���(���d���x��1��[d�-���3��@Qg1�dk�Q�ڊj$�f�%Y؁�:I�1�X�	gK���k����G��/K�2�MKK��=/�<*;�jc�9JDE���!G�1�͢KXK�_r��-��A#F⑴�U���)�!ָH���]m�`o?��Ilգ/�u ϳD*Dr�&�� <�B��{1J�Q�)u�,N��3�Q�D.�a�X{�֣�&؊ib�I�Q�y�b-����GYޙ���z�7h�a]m��zb=���^DqtY�>����=y��8Q��Vz�>A<t�fQǕ���OІ�)4�-J𞴁G��)�^z+ƗS��x�ga�A�\JO��#�8�^�A�JO���8�oȸ��^�5�́v�YV�T�:;���Av�Y��_�p�t<=��p�?�P}d��A��X�d��*]{Xʓ:����qO=~V�@��xr�b��q�ģ5&Ƀf��������O�ؽ��<�;:{��9vo�>��7�J�=\�I<;m�KQ9қ�t�$>.�C���c2�nD:ZR��j\m�SI�p��'�6������ W�-�j�h�>Zm���j\m�7P�p�&��6�	��������� �j|�� B�6�m�� _?�� ߲V�ì�8��� W�m�j|��� ߱V�j\m��X�p�,�6�G���z���HwQ?��q�A�ب*��X����ׅt��]QQ��f�{�}�x��HfZ��$�܇ak7:o�^�\!2���ob��]x��Dx�E�&9vW�_����R�ɂ6      �   V  x��M��F��S�J�/�;�00�y1�W������:�K]�l�l�0ɗ�����럿��lc���q��x���ľ�~W�Ʊ[ߝ62'nR��B6q��W+]v�P1�Mߖ�[�7&��o��N���m�c�hv�����^���1O�%yH����MT�(Y�D�&��oq�X�D%d!��&r'ى7
�1Sa�d�-������kl:�4��U�n�1k\����$-���OR�<^�]���<{�3�Q�eD�:��fƍ���z�;�&J�k�bg�	����(���g�ꃈ���QQ�LYF��}K�h\�L]~۝7�T�M��i�bH�ŷ�֤虇�rsܮ<$(n�6ev�&E�<������e8B"��&��+�3�s�0��2�ɴ�N��+�e�,c�h�f�=[�=C\����W��he�<\�&Qt�a�e���X�)�e�d���P�)�e�|Y�ˤ,뫺�!�xᣩ�XF���.�{Q+�X&��c#EM� �C������/R�r3���e��(�1/#l^�CQ�Y�X�~����M�x��Pm!
��diV$���}�s����c��7���C1?$7y9G��A~�9Ƚ�~D�l�����2���~���ـ�6ׁkmV��)�'�ۑGQ��e���XG4+n
�!`Ua�T�Qܔ��'b��M�gqS�f��"Xw׍��7/jJ<��y�ߘg~�u��I(f��I� r��h�ټ����0>�`��n/jj<K�?}6�i^�4]�Ŭ�����Nk��]�|��ƚ7����r��B�yq�e�D�[�_�⦏U�7��S�q7=��bzVO�\؋�ݖ�Z�6�c/v����B���n�lV����B	�x�6ԀI�z�s,z��=Uƥ�@2��α-^6�.��b�諈Y�ˆ|�V�9�J�}!��	�C �"g�����~z}^��y��6��bhiN�
�\?���O�x$εh�ҡ���gi� �q��&mU3�� �rSDo��y4K�0B30޴�D'Ax6�p(-���� ��_3ڰ�����n�H��a �����g�( �
������W@#����_e��y*��f��lx]�g.��f8#D�(f�y�
5n-����D��ޢ��g������|Z����6�lHt�Q�~m����Q9��ѧL?�O��(��V�_b���l������a2B6�p��|g"�͎�bs��n-���'A�Ĺ����,����.ĳ����|�O�@hx~m���Y̗S�d󻘅^�,�˩:{���!HB���x�w����
�Hѕ��}l9>�N�����r*�4��c~��b��
�����B�]*f�)!}~.gǿ�@�B�*���/Ǉ�Y��d*n��k�yA7��;r�z+�z���5��b�P��]C�k(vŮ��5��bq���]C�k(vŮ��5��b�P��]C�k(vŮ��5���Qq�d�r<���77�l�ۯ! �q�h���?0�9��[Gw�~g��`��^���Y�R^�]B�#8�� 7�@�����ws�)�[������(�dv�0�8�*�P���_���Zk��d��      �   �  x����n�0�����6�v	�"BT��洠�I�#c���3��I*}+����

q�x쌣�v���u��C�(����A��>]�"���D��,�D� ���䬰�s�gc�{;�ȉW��F#�"��`�4G:�ɑ��-��d�n4��v�!����[�P!�<C��^��h*0E���H�.b
J�)�(zGWY���5J�����L��Ω�d��C������=�STk0�e�f�M��S������;j�ڣ������_x��d�{u�g���x�QS`��i�<G���q(p�������BK��u��.���=|���z�mкS��5�c����~0��Mw�Xo��&x�'$=�{���@N�05(x�+�����b��&�      �   �  x�͕�n�@�O�H���k��@�R�4iP�F���^`�����O����6M�F�e0������2�}E�z����~��Ke��U��k�'�	��	e��R\�L#d?F@ �u��WM%wx/W+YʴJ
��p��Lj��T���L*��_�� �N�=��i�Y��+B��|*2�?��y$��h8�;��-���#]�B�*�0�]9����+��Y�e�d�zP ��Jf��Kg��e�����gmOFd���-������|���`�������ز߱m��-uPr{".�����
�Q����v�S�$�J�F�բ���5*�N���`�Yx@�١\F1�O���,��x��r��~i�Ue�,[`O��G�E!�.ƁX}��^V{�=��l��W��<�>:.vyۊ��NI������bL<.&�L��$Ҩd���eht�\[3��֯�,N`j�q�9}��V(>žCHHXȅ�c\��vn��tpvsq�1×�����k�M�`U������3Wû����V���Xsh�G�6 ��
���HW����V�fO,#�_1�x��w��}"�_�_F@�ݥ�=U�T��X�|�x
���x���X�vr(s���uz����mz�c��Za�q��F�I	��da33k2C���@��ش�90�|�HzuD��^�����      �   �  x���ko�0�?��
����m���Vic�eZUir�KX�I�����(��~j����sy��6RC��q~7�Զ�GES�]��U��8���e3i��G�k���db����A��4��ڪh�͠�M�Jb��ʧf��������t<�6����G@H�]����[Kr������W��u��Py��X|4�q�[�*�:J�ԉ�zh<1���\3&��]·vc}�φ�p]��g�k��be�i��
��sv���$��wsDqX^t$�b۹�D�@����lN� �?��~�`�l2vANޞ�f2C%q�J�D1�0�b.V��կ>�������P͸���H��:�+�j�[l���M�<Z�t�&��B�RFF
�����e����m�p�{�#a1��B��젰޶֓{�w�����O��XF`������E���?fa޶     