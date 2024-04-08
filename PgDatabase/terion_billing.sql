PGDMP         :                |            terion_billing %   12.18 (Ubuntu 12.18-0ubuntu0.20.04.1) %   12.18 (Ubuntu 12.18-0ubuntu0.20.04.1) z    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
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
            public          postgres    false    214            �            1259    20220    invoiceitem    TABLE     r  CREATE TABLE public.invoiceitem (
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
    public          postgres    false    202   �       �          0    20158    accesscontroll 
   TABLE DATA           �   COPY public.accesscontroll (rno, distributer, product, invoicegenerator, userid, customer, staff, invoicepayslip, d_staff, last_updated_on, last_updated_by) FROM stdin;
    public          postgres    false    203   ��       �          0    20169    credentials 
   TABLE DATA           f   COPY public.credentials (rno, userid, username, password, lastupdatedby, last_updated_on) FROM stdin;
    public          postgres    false    206   h�       �          0    20176    credentials_log 
   TABLE DATA           u   COPY public.credentials_log (rno, userid, username, password, lastupdatedby, operation, last_updated_on) FROM stdin;
    public          postgres    false    207   ]�       �          0    20187    district 
   TABLE DATA           X   COPY public.district (rno, stateid, districtid, districtcode, districtname) FROM stdin;
    public          postgres    false    210   	�       �          0    20192    feedback 
   TABLE DATA           [   COPY public.feedback (rno, userid, feedback, last_updated_by, last_updated_on) FROM stdin;
    public          postgres    false    212   �       �          0    20201    invoice 
   TABLE DATA           �   COPY public.invoice (rno, invoiceid, senderid, receiverid, invoicedate, sendernotes, subtotal, discount, total, invoicestatus, lastupdatedby, senderstatus, date, reciverstatus, transactionid, last_updated_on) FROM stdin;
    public          postgres    false    214   ��       �          0    20211    invoice_log 
   TABLE DATA           �   COPY public.invoice_log (rno, invoiceid, senderid, receiverid, invoicedate, sendernotes, subtotal, discount, total, invoicestatus, operation, last_updated_by, last_updated_on) FROM stdin;
    public          postgres    false    216   6�       �          0    20220    invoiceitem 
   TABLE DATA           �   COPY public.invoiceitem (rno, invoiceid, productid, quantity, cost, discountperitem, lastupdatedby, hsncode, last_updated_on) FROM stdin;
    public          postgres    false    218   ��       �          0    20229    invoiceslip 
   TABLE DATA           �   COPY public.invoiceslip (rno, invoiceid, senderid, receiverid, invoicedate, hsncode, productid, quantity, discount, originalprice, afterdiscount, totalprice, lastupdatedby, last_updated_on) FROM stdin;
    public          postgres    false    220   ��       �          0    20240    position 
   TABLE DATA           a   COPY public."position" (rno, positionid, "position", lastupdatedby, last_updated_on) FROM stdin;
    public          postgres    false    223   ��       �          0    20249 	   previlage 
   TABLE DATA           `   COPY public.previlage (rno, previlageid, previlage, lastupdatedby, last_updated_on) FROM stdin;
    public          postgres    false    225   Q�       �          0    20258    product_log 
   TABLE DATA           �   COPY public.product_log (productid, quantity, priceperitem, last_updated_by, productname, belongsto, status, batchno, cgst, sgst, last_updated_on, operation, rno) FROM stdin;
    public          postgres    false    227   n�       �          0    20267    products 
   TABLE DATA           �   COPY public.products (rno, productid, quantity, priceperitem, last_updated_by, productname, belongsto, status, batchno, cgst, sgst, last_updated_on) FROM stdin;
    public          postgres    false    229   �      �          0    20276    proformainvoice 
   TABLE DATA           �   COPY public.proformainvoice (rno, invoiceid, senderid, receiverid, invoicedate, sendernotes, subtotal, discount, total, invoicestatus, lastupdatedby, senderstatus, date, reciverstatus, transactionid, last_updated_on) FROM stdin;
    public          postgres    false    231   �      �          0    20287    proformainvoiceitem 
   TABLE DATA           �   COPY public.proformainvoiceitem (rno, invoiceid, productid, quantity, cost, discountperitem, lastupdatedby, hsncode, last_updated_on) FROM stdin;
    public          postgres    false    233         �          0    20296    state 
   TABLE DATA           ]   COPY public.state (rno, stateid, statecode, statename, lastupdatedby, updatedon) FROM stdin;
    public          postgres    false    235   "      �          0    20304    user 
   TABLE DATA           m  COPY public."user" (rno, userid, email, phno, aadhar, pan, positionid, adminid, updatedby, status, userprofile, pstreetname, pdistrictid, pstateid, ppostalcode, cstreetname, cdistrictid, cstateid, cpostalcode, updatedon, organizationname, gstnno, bussinesstype, fname, lname, upiid, bankname, bankaccno, passbookimg, accholdername, ifsccode, signature) FROM stdin;
    public          postgres    false    237   �#      �          0    20311    user_log 
   TABLE DATA           �  COPY public.user_log (rno, userid, email, phno, aadhar, pan, positionid, adminid, updatedon, updatedby, status, userprofile, pstreetname, pdistrictid, pstateid, ppostalcode, cstreetname, cdistrictid, cstateid, cpostalcode, operation, last_update_on, organizationname, gstno, bussinesstype, fname, lname, upiid, bankname, bankaccno, passbookimg, accholdername, ifsccode, signature) FROM stdin;
    public          postgres    false    238   �%      �           0    0    accesscontroll_rno_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.accesscontroll_rno_seq', 112, true);
          public          postgres    false    204            �           0    0    accesscontroltrigger_rno_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.accesscontroltrigger_rno_seq', 246, true);
          public          postgres    false    205            �           0    0    credentials_rno_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.credentials_rno_seq', 127, true);
          public          postgres    false    208            �           0    0    credentialstrigger_rno_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.credentialstrigger_rno_seq', 282, true);
          public          postgres    false    209            �           0    0    district_rno_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.district_rno_seq', 1, false);
          public          postgres    false    211            �           0    0    feedback_rno_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.feedback_rno_seq', 6, true);
          public          postgres    false    213            �           0    0    invoice_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.invoice_id_seq', 1641, true);
          public          postgres    false    215            �           0    0    invoice_rno_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.invoice_rno_seq', 573, true);
          public          postgres    false    217            �           0    0    invoiceitem_rno_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.invoiceitem_rno_seq', 589, true);
          public          postgres    false    219            �           0    0    invoiceslip_rno_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.invoiceslip_rno_seq', 5, true);
          public          postgres    false    221            �           0    0    invoicetrigger_rno_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.invoicetrigger_rno_seq', 1189, true);
          public          postgres    false    222            �           0    0    position_rno_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.position_rno_seq', 5, true);
          public          postgres    false    224            �           0    0    previlage_rno_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.previlage_rno_seq', 1, false);
          public          postgres    false    226            �           0    0    product_log_rno_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.product_log_rno_seq', 547, true);
          public          postgres    false    228                        0    0    products_rno_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.products_rno_seq', 153, true);
          public          postgres    false    230                       0    0    proformainvoice_rno_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.proformainvoice_rno_seq', 97, true);
          public          postgres    false    232                       0    0    proformainvoiceitem_rno_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.proformainvoiceitem_rno_seq', 102, true);
          public          postgres    false    234                       0    0    state_rno_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.state_rno_seq', 1, false);
          public          postgres    false    236                       0    0    user_rno_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.user_rno_seq', 237, true);
          public          postgres    false    239                       0    0    user_user_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.user_user_id_seq', 1010, true);
          public          postgres    false    240                       0    0    usertrigger_rno_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.usertrigger_rno_seq', 845, true);
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
       public          postgres    false    237    258            �   �  x����n1���S�L�/��.�ڤqk ���(�,�;��sg� A�.g�t�������������o��������P�T�$�J^�~����y�,����#+T�$T1��dLGƹ�T��i�er�]g�ι'SQ���1���'#�3L��XA*bbea0N��¹��J�f+��l�g?�ĕ)�g/cf��99�vaU�b���Q�\[�8g5�vFiA����Vz
���|�&���9��H��J�|���^�$3�8q���m��7%x���R"ג�YC�L���g�hG�]���]��������ƨU�	���q�	�#<�Ĥ%��y�vn����	�|�����p��	#����w?�����~A��wY�/���C 
��깭�����*����BBҢv;B�v��b��yOQx�|J���Fm�      �   �   x�m�A
� �ᵞ�Dޛ��qW��d��oѩ���� �|�֠c]	0`��GHY�,�t�]K�����F�Ǻo����d>L�Nt�LZ�2���nC�&eq����z4�rT8������`�� Sj���o�����\���s��uw2      �   �   x�}бn�0��~
^ ֝�{r���5R�C-��I���:T�n���?do�,N��r�c;?�h��|7�ɡT���$�� � M!�jiU-��T�8ʒ��+��O�F喜��;i��0:,PY�Z �Ɣ�iv>���9�%ޢk����?E}�h��;�$Q4FJSWm�d���1#h������Ѳ]%U���ui�jԛ�ح����4�~���8U�2�6FП4���� K�];      �   �  x����n�F�����d�3��W*�����P�"m�(W�$O߳K��SY\h��?�Ξ3K�4������a=��as�~P�þi��0�����{��صS߰f�A��;�dEEr^�����e�H��yjǩ��i��o�]����0����G:IHd�qh���Lc�ͭ0�IE�xo@3E�ir�%1I���c�l���8L�a� E�K,�[cł�
A�?�i���Y�ؐ8��=��/��QJ�J�$"%V� � , ?~��iێ�-�\�	P�(���P��/���8 �c�4�P����[ �icI�JG�mh	���mQ�-�  �b����	�����l�V��%}WϢ�#�U4*�`"��`޻S>>yD�������E���c}x�,����E��SH���]��yE��۱�ϰ��)�ƙ4��
�<���^�ؘLP�{-�m��Ki3�Bu�4+q�M�.
�ϟ�ͼ��,+�68t��w(�Ͱ˒|R8P�\���*I�$����9:m�ʢ�3%������ٞ�[I���J>�m���V����m�m��}8L�d}���t\D!%<Q	�����묗g��C�8�_��@��\��]�?����I�&+���XC��XC�W�����b0�P�Z0� ��4�J}b���M�QC���k��_{��v�V���X�u�
��K�X��l��g�)�J��L�|�`�^���KNM���E��%9k����s��m���k>͊~�8��/.?D1����XE�I�a�D�!�e����p��fw8�S���s����^��X�X11Hn�p/���"�E���������p?L���k7O�[(�:�]�jE�4�Q4��y��=�bh�5+xT�"Y�����^D�5�چ9����V�տq�5      �     x�5��n�0E�寘/�sفV��r�YD�����v#Z���u�ٜ�-���rBYF	�tE����_g��,����|���~�eYU���A��N�����=�w���2[��ʏ�k߳��c�h?�x>��N=��
�U�л���s̞i��ϗު��PY�T��<b���Tr'�����Q	߃���g�$RI��(̐J�
,�;����O7HD��#��c?B�ُ�ȗa+�ؼj���q\���"X�{����3�3Dl�{�<��U"�`�ZQkq�/y�D|��4Ԯ�:^�'��� �.���7�T�A�Ԃ���m�)vt`o�Ld�C���p}���4偌#_�)h>4���_���!��i�ڀ����B����1ťb�N�/�a�b��A~��mǵw*E��O22噧	�PE�4��,X��"����A#��T������)��
����Y�5=�!e�y�&�W�|�%W��5�U�:��Og"v5u�K#m�k�'�Ê�Ƴ��[)��R�.      �   �   x�퐽
�0�盧�$ܛ��fsqt�c��^i1i�
�۫(�Vg�L����#����قA�ZE(�n��%Y�00p�y��c�/Z;��<�In��}��!�	����,`M�_o���Μԫ~��xIL��DVN���W�-��
J��      �   c  x���M��7��۟"R�Xv��}C�!���	�p�țߞ�<����v�ߎ�U�Lz�Y��_�ˏ�E���?���_��q�/�l��/��s��*�/*��ڗ?���W���o�����w�������vcѤ#��i�ׄƽ�{�R�
�,	�Q!�w�R��BǓ��ա{kE�G�����B|u� �!ԛ4�%I�_Ѹ�#��^ZW,ҍ�&�qT���
W��:�M��Q���f-�CI��EĵR�z!NBtNq�U��)BN����I��B�
��}K�>
�wSǓ
�MB�
��®�ߥ6'��KX�v�Z�W���ѝ�@,d�GTx��%jR�����&*Ђ
��`=�!�3�Q#�-Q�T��w��̈KT���C�>bd�Q���x���	ߛ$�N�C���*l��Z�5:����(l��v��d�
.˨΂��z�$"�"\���PC-����:�^A�XX�_��u��:@:z$UK8��8���WAqȌh�>��6�8/֛:v�'�<��_���*��r�W�ݫŀ�PE�@�p Wpp](G�sD�r�OM�u!���'"�A"��t�zd��PHD��D��Fу�3�D9H���[A9��?�� �@q�B��T-�'"�A"P�T酚�byz"�$�1�:U���d�@w��������'$��:=�S�	a�z"�,�����U��' �Y �`W+�M���(D�T�k�z���1
y�(z�A ����:�z�d�#5��B.U"�� P��R�Q�zFB�DϳV℣�		v�H�H���rx�� k�G!�Ţ�5N�u�`FB�-������.*��"p�=l����`���جm�p�##A�P�B܌/+�^ʑ!HD#a�X�J����F!��P�-��..O��B�ɽb���[pa3��֢�d��[`��=ʬ�t";��.:�ߤ&.؂;G��Z���R|��M���ǀN�_��u�h���x�:	~�u�T�ȫ5�-A�/@�@�)�Z�(�B(A�/@����u;Օb����Ʃػ)t��D ��Q%6xCm듀�W�pq8=ĵ�;(H�& � <��Q0�X��p�q qP�^�p--Ѡ�A�N��HCE1k-Ѡ��t����=���p��@���f1q	���X�T���Eb��D�~�'U���D�~��Ш8�n�I4��{�l�E�%�8�;G�0Qe��p�����[��	��A�lŵbT�1J@��Q0�&����0�>�{���C'�`�G��Q�{�%��<�hġm�D�ăq�~�SW�u�X�ăq�}fm�k�[��8��8�E�K�%��<GTU�Q�2��A�ا�ÄH�	'��<�c�E�Վ���rR�ͻ�`5t(��A��TՊ4ǜd8�o��G�7��:��`�mʒt8���|��)k�Y�`Oi�Ƭ���Öt8�ԑ�Q�^[������;�Gu�B��h����'�6��@�2P`��HB �
�]1uј����D���tH����@P��h8��&�Ą�`�Nеȩ�P[ElKbB;ȄL���!3�mQV���yqI�QJŀV��M!�����ᾓ�[��oqKH�:��e��KXXw��}�p������2.n
a�A���B	+��N�I8`��1��$ߢ�|����y}�[X`$ee\�ψy���ɷ(+�➌�ٯ���MJ�EY�7u��l�9k		+�����4Bu�Q�vɳ(+�⮎��3��<	+���@E_:��Q�&ˢ�,�[B� ϐ)����,n
�N'���%Ϣ�<��B�L(��F�L��2-n
)͒!�K�EY�w�4zW�u�	ɵ(+�⮐����F�%*�l��B	�X�f��[��oq?��oqF��ą�qqG�~<�wT=����2.nM��vU�� �cdr.�ʹ�9�0 }���d]��uqSG"}�yHB'Qae]���X �%lqQj'뢬��{:/��f2�������.f���U!�
��J��!����.n(��t( ��sQV��M��C92˫d\��qqSgD�H�|���-���;��i3�l�|���-n�g.kQ�&ߢ�|��:��[�rGᓌ��2.n��\�䝌��2.n�H�Q��d\��qqSg�1��y	����2.��H���AߒoQV��M
�u���'�e�[�љmsqa�1�ă�oqO'Z�8����d[��mqS���4s�u�-�ʶ�����$�اɶ(+���0������d[��mqS',�E�k���kQV��=��u<��vJ�EY�7uFt���F�I�EY��t^��U��C�kQV���1���ؠ��ɴ(+Ӣe�G��}���.��"�F`'Ϣ�<���=�	�����=t�,�ʲ��3m6�8���W��_1�tmWe�紅w^w'����I�P�_ԉ[ �tD$��;Ӧq.A}ДԐ��]Q���gƛEaژ��nZ�F]��	��37/�[dT�aJ�y�\���w��oҾ���������x0�5x?:mq�F�(4����"�׿��Z�����|�����6���ov2�9 e������ϼ���ќ�V"MN�8�*���<���+�Z�L��=f1�$l�4�*Z�Pkr1껎���6�Jϱ��``�C���'��Ċ2�B����������������A�LҾu�{��yҒ��'�$^f��ph25��~�1��
.����h26�ז�Ohy}F+�e���z��4��kW�'��W�ψ�|c]�X�8�׆�O���%�6�I-���Zo�Я��C��ph�5&�������Խ
Ÿ$i�q-	k?��5�+��o�6��R�A~�d{T���i��^������OJI�Gg
���~T������@8��Z�0L����;��� FB�i2A�\�]Oa��o.���s���*��s��i��`h%l�ᐟM���|��T��S�EuC�F1,aCo/
�<֋�[H%jȅ����4��s�5�v�iEZ�go#�k2H�\���Ma����t��Ä�@���byq�9L��!��֋�&�o�̒��C>�BeI��d�T=�^Q���-�&U�ǡ��Xw�arN���|,����&����?�%Q��n/Z�v�n�ؼ��v��H���谁E58#1���<��^��Q�%;��a�r<�ߖ7��j������ͨ�A%�*���<�,��>[k�|����qm���(rD}�V��/�'Luz�������<�������&����"�㉑XA%/�tH6K�ÙZ/�el�=�&���}��Z�QK��}�a)����J��+�nk�xC%E�"7�j%�U.�Z�ao�#�W�F_���q�C�hH!{�4�.������f��"� ��R�j�kiܧӐ:Ǖ��W9e_ˢ��G�`j_��}��Z�����W���ъ֨;U�0�1�������YPi�+|M�L+n䋮x4�HL?�����q�+�X�X�}�o���b�Q�^�����/�rd�d�Ա��$����r�6x�}B�X�����'~�$Nf�LM��ߝF�B@��"�1�ɤim��bjщen��d�4Z�~Wl^�ͫ~�Q�'��-{̻k���.�Ϫi�b�aӖ=�}�x~��p4kӖM��il��	stc�uӖ]�1�#�9�FI�웶l3�,�5��+���4>M���h#.!��Ӗ��|��z����Ik��IvN��:|����H+rt��t�NC�I�N[����5���?j�(���a}�F�N�N[��WR-�}�>�I�4Y�eѷOO[6���0y0�w�흨����>n*����޵�W      �   _  x���͎t7����"7��k�wXd,"�BB�d�!~��LMHuۜ�4J�h�ۧ�r���^ҿ����÷��-�W�����������N� |��߿�@�����_?����_��5���z�:��%����6����s닆��c����oH�w%1mJ�z]o �y,pqN��8=Zr����������#m��Sl�M[�����7�F�l��=>��_�曌6|�3i��))�:��.��8^�t��)���&8q�g�,��h�N,��-q��۲P�	Cy�x�:O�Ǎ{#��,	O,���~��ܔ��E�&<��3��t��-9p�l9���D't~�x塍z#j*�{ j�:�׍��!D�4�TЙ���d��j]�����T�?q�H#�=��T�y�����s.��	N*�<�^��g�&�Ф4J�ĦLC�k'2i�����v��Į���0hí[F����HX����K������g$,�"����Ӭ�!�(IX�E,!���t���,�h��j�(bȏD%�P�(�⭫O�6_��%�`�X�S
�Ӕ�3��K���x$��H^��D&_$cw�ݞ-{�3���4m��ފN[�Nd�E2M{�������Ld�E2ы|+�v�;�|�Ltzx6���˝��d���v~�Յ}M�ru����P�?@̄�\�0M{:���<�)7LӶ���[�Q��rL;@�n�٣p%0�2�,^�X&�~�X	L��ġʊM��e��\ӊpSL�|މL� �a�^ϫ���)+�)Ѵ��j;~���WBS.�IQ�OK)L^n���^�4ɷ;}�u?��D�d�V�S@��v��q�^	M-��ₖ���%qm�����%:��3��&�-eA`[�_B�C��3�(=��Ӧmʋ���Z����:G�i�PO�j�(�L�Kl������Z@z3)I�A3f� ��O�^�CU\����e�t�����z��9��8��ӏ��d�X������w�ڲh��'P����C�Mۉ�/$L��O��V��n�WO��LO�[����u��؀��8���T!�tH���"=��=�m��k�;�>�8���BQۣM<!:6}".^�Vb���"��'!�m*FR���ȧ��~Z�%,�(��yu#�(�!�< ���x��<U}]0:7 }$�~2q��9���"���!K-`Iq8�����T��v�7>������o��c��&@�E@�F~0o���w9L�΋������VE�M�΋���@S�c����"�÷PB;�/���	�uqq�1��q&���u����69�;G<PJ�����X�"�^�R"t]$t�beZ�9�ל��"�3692Be�X�D�H����.��Cǟ��"�~셅3j"J����N�H�"�N�N(%B�EBg�*����g���P�	��h>[y>��$~��y���,��
ZI� Tv�%n��6`Vr��'���e˴D�1$��}q��,)ڢ��0gL����|2����S/ �$^Ew����+R.sR/=P�MTڲb���%�����Mle�P�Κ�Fԙo<3���'H��t[�B�N��#��PP�2໑��V^��1Q
)�Ԗe-�?����9t�,�{��ńO=y����#��.�؎�y�+�ж:{�Ry;�&ه����G}���So�q�:P�`���j#+\=�Z�vC��Ɯ,�f�4��2��|D?z�ߙ�z´��|���{4&H+Ѿ��8��h/$W�q���"�X�� ��At���i�[Frq� :���%O"�D'��J�6��h�&W�mu�j�%��w��h�!:Pg�k�!+�Krq�":Q�C���q@�=AZ����&������D\9�N��;��O�K���++щ�𣝊�sO�Vf��i���TP��Nĕ�h7�������kU��'R+CѮ��xp��w�Dj�(�^u�dx7]��<E\y���ט����>crq�*:g���^�O�V��]�ዎ���%���+��W�/~o���ci2qe,��B��v
mu��������`��m�����h�,:О�^l��W�Yĕ��@|���X�v�����h_�ݾ�VEGl�Zĕ��@ܭ4vP��.y����G�����2 ���r�#6�����d/��^t �ެ�`E(&W����Jɜ���d0��`�/��+/2>�sK2qe0:G�-S���8O�V�]��aZ��F��3O#�,F���<������.Y����S�^,���1��ct >�-���D����d�/��;�P��\F\����5�D�G#���r�s\aК�^}�qe3:_�b�]_"�'�W>�}�+:�ؠ�ш+�Ѯ��v:6]��0��2i/�9��+�F�YV���|F\��tg�!�fisL��4�	��ft 7��+.H#�<FI{
<Ҷ�B�oqU�bĕ�(��ՓĽ�j7���x"�����x	m{(���'B?Y������h�4hB��ŨP��.�.�g.ۋ&�������|����\}������i�烐�;R�]iY��d3��㬿��'�Q��O>㈨!�wXƒÔ�F�oK�����~��ο���V�>����D�;I1�b�i�{!y���� �� 	���D=�4�i����o;�7�^H$��e��?���r$Y����|{K����n8H.���ig���=���H���?�n{�h��E��F���w9��`s,��wH�$yo�^������F��\r%�{��� �?���j厕���&g��7kWvOF�x}@�,Oɞ$�-�G#|��; D��L��$����=/<��?m \��i _1 ślct��	f���n��n��x�ezTn:H0@H(�F�>�_p�G�J�%��0��g唆t�T��KBQ�4�ZΝ4S�;���K��U�6��$H�?��$�A�S�!���&�6�X�2o`��HX��
o�@r2	� Jò/v@Z�����$����}��WS���!$���[���~�70�� +|0��� q���4�oh�ϒH���$����r�6�9�  ��$��K����R��!|���Id#J�pwi$S �,/�R��+*�C,QY^�d��ؖ�4���wyI�;���A��dy}A2��)���A�}��ndӍ��>�m�D��$ӡ�l��(�%�O9�� <����.%/�"��J��)��t���zْlP�/Hw�6����u?$'��v}���{DD��Nf(/()������K~(/Hw�W�V�ZU��5Y�d� �Q����ѥ���g(�-G��ý���Q2^P;���a�X��q�M�(/��l�������GJf��xs ���8B��6�Z
�QJf���7`��
��&��̊ތ�� �Q4a�_fB2Lɬ88��R�7+���$�g���'��#z��(J�)�g��T��~���Y��Ի!��M\n$��
������{�xȉ�Y��x�n�TH*��g�W�5;ǫ��\T�*��ݕ��W� o�\C��iGw�ArRɪ�T������i}{�ժ;�.���Iv*YU������`��S�("5y�dU�z2ǋJ���7�䫒U���*�m��j���
U��� �5"{��sI+�*����[qsN3��d�Ҳ9x�$^E7�J�֒�J�����R����H~+-��g���5d�h�%ו����ϰ�3��@Q`$땖�����f�*o�o��J�Lˏ/-X�N&,-;�����q��p�q�%�8�'+��r<��`�$���c�{Q���K�&����z~*\CbK�,-{���$�2�F5��N��+��`��$��6��`w����3��Nrh�P~�����˗��ݮ      �     x���Mnd����)�&��a��5��f��j�G�%+ݒȂh4D��ȏ��Vӷ�������h����?��[��5�7�H�[տI����ţ�bu����,�m��ۜ?�磍G�R��Ԟ�~WK}��Z�:�=��by�V�b6�#��n뻿W;գY~�H��\�����C����nhg�ΫVފV�s���V�Uk�����zK�v_/�b�R��J�$�\��'�����1��xs+3B�@� �3d�Gś났E��:A&gȶ:V����7O�ə2���G��X��:�_�2���Zb|v�2��y�LN�-��j�>�ڮ�� ���P+���	2�ǣ�Ԋ�0K�݆:a���d�G��4�d*Wm��(��'�	1իvb�
��!M|�ݤ�+ j�Am�K���aŤ!zA���~ֶG��� X=��q��+8s0��ĕ^����OApW�*'���U[�:J���+;��şY��LF����jy��'#|��#qe��ԄZ�^>׳Yv^[��&�	.��%+ l���Kp�.h�A	�m��.pAm�-p�#�e��)�>�v�Hp�.! 6����&���0#��Y���#��נ%�+N��X���_���hVi&����KЂ	ܛT�9Z�Z�jŁ�>���_�2g��q��FB˯h��`��zE�	-���l�|N�eh[���D���{9�Eªq�^~�����7a�9^~�KW"�ڔYm&��%v)���:w	1\��t�@���rq&��9v-��$�"�C����[j������������H?_���H��SB_Z�g��f�h�6~C;~C;�o���E{ܪ_��7��;��[��k�i�~Us�k����Ȕ�B���j�قZ�m�m|���n�Sg�Nti}�搈:�͈�}�?Ջ�Ի��ظ�6�k]�#s@�;Э63&8�h�?�q
�[;�R��c�[",N�yk�4���^�W\Bj�u�)h\���B�\{�(f�C���Sv�g5�H��^qA5��D��]��	�Xpɛ�e����Fzm�����8~[��$�H�&	�8e�u2�_+���pe,�u�х'IV��EV�2�9�	�q�˾
ζ��`Ik\�rv�{�z�['��%Xw�Њu��J�j\��,�t�A
 )	�q��s����VڄոĬ���Z�Ѹ҉�q᪣�b�@[_AGW��UgyM۩�\�Zik\���3�ҥF𹉬y!+��16�³���y	X��2t��'�a�&�慫�a@�Aލ�V��y�*�/"34w�����^��>��{W���X!G��G�;'��+hKD&�����h<3��&���W��� NK����ռp5����IZ|�'W,�nڶܗ��j�^��u�v�q��Q�z�g�/#r��8]�F��Y�ݴs��z�Fr�Y�]�98Fx�6��ɣg�w�Pho�ܑ�g�v��>;�w�&����U͐�e"'U<;��,��jC�\�%69��,��j��EՀW��՛�-�
���6�	�vlk������Lzk��K�i{�`���l��y��|rB�2�Zjz�2��K�]fP��C�V�D\��e����A�5�2��֮������ݒOo�!��"9�HN���ve��-f4��lz;N��v�m:�*��&��#(�k}(��dӛ\3��}B�Oi�2��5Z�a�Mo�����n�����e���9����Z���2}r��u��(�m�^r����|�D;��&�(�0��]���ɰ7�������D;���(��l����;Œaoz.�:Xu���	3=[f[=p.K�u�Z"�8����R/��m�8�r���2j �S�8�+g��x�Kvɵ��$jk��"��6*��vEm�11K�ɵ��(�W�]i�r(�\�<{;�����n�&�����s%o��R#��2� �A���K��
�2�4�)Y�f���Z��n���.h�ʑ�Ld�ɅNh�PK�	��+�` H���P[˩2{oL4ɯ��jkW7S���6�uC}hE�1� �$�ގc��5v3��{��z;���vu>�2n�[o~I��g�L�������q��B��#�b�So�!�?;0�j��*����W��a��\�d��q�����ܣ��q����@|���6quA-�4NTPE(�L&����A��V�ZQ�z2��8ZZ[� �Kv؞,z;Ο�v�J���bhW����>/�T���U�p5W�,�O���M\]�G}]�}Sp��s�Yǡ���&w���U�6��Odm��"��q�XGc�?�Ft~x_�>�����iJ�L2��_��&�_�q��b{쵽$Nl'
��]�j��=n�����,�U�
cts�n�f��fg�sMsU;�h����{s~���LC��g'����Y����nE'�T���8����ʭjp�����q"19J�ehi��&����o�߿j�>C��{���+]qW_�~���.�Pf���}4�����%:
 P�\z�_T��!{�$#�@yr���}����{1;=>O�?�����S��VYP{��]�cd�_�(ZV=��'B=Nc��}7^�6Е��Z]3��	<�G�7��tli[A��68ۂ��,��z���u�Z���g��M��bWDE#��ɢw�l���"hp��,z����5�B��%~�d��G��wgF���UM�Aj�-�^�v�zߍ��d4F-:��;-O���~ԎuD�H�=������j����W�Y�+'�v�qz�/Gq�H���z�����#�O��=�n~~�0N�e�x
�7�n���~����������A��&�w�p�2f���GO��t?�2gs��=	�;'�v~z.�B�Ahc�U�
?i�Y��)z�dл_��w}#K�wNX�u�)��fg|M��u��N5:�PV�ɞ�~9E���^�"��{2�}W�G�1��ѷ6q��ad�����2��ңc��5��� �����`̕NƼ�K6�5�B�0�?b�3��r����/4���ə�~�u�*xڦ�Tĺ��{\R�.�}���r�=.�Ai� �!LJp�Yq9���u9�k�ȊKŠ����
,�=��������BB%i���!�q���is���=���q�[��Q�*�lD�6q5N%����XG����=��>NIek�y����M���Sɰ��M�j��ݓ�㴿[�
w��:'��)�m��˒iu=7q5Ngpk;+Q�%`'��x�3���KkE}��Ɉ�q��Z6h�M\����Z����J�׮<��o@D1�U���:p�*
�wO���M�F��<�?�@!?��:;�d���<��!�}Ť?�eW-�F�ە�x����u#�7lłd���>��m�c��	���6^���T[�I�|y�V��l2LXɛ�/����w`�vg[��.��m�����n7��]�K��h��^������`���+Ckr��Ko�ʬ!��r�g�����l�-]2���SV�G�:�k��ϻfx�ocm����O�t*���}�	�=��p����S����o�|f8CP��{j[.z��;����wk�5�`c8�'���������̠Y      �      x������ � �      �   g   x���M
� ���)����Dw�a?B�
t�G��[<Ḋ�k��f,3�[�:�#�Q\/�E���{�-�`�)5�@p�������57Ko�� ��2R      �      x������ � �      �      x���K�$�q��w~޲����{�pX^*B����	S#9Z��@wW�p���,8}���L �ϑX4��)�~�ۯ_���������S�?H��=��b�D�Ĵg���_?���M?��q�W��a�������_n8:��^b؂�w\��T��[~�F�����}��ō���w14�%�I�>~����Oo�N"���IT���m�����_?���/�������˧�D�{tiܳ���%I��z�`���<4��)�q�2��"��7?ly��+��4���5����_��	��S$��"R��z9(�����~�Z����>�����7m�rE�ۗ�y��ۻɕ�5|}�W��E��c�����y� �]�����Oa�(�Wi�����c��� ��� y�'��CS�y4�Ԧ�g�|e�U݃|�pO��r��k�>ި���������?<�S�ޢԣQ��0��M�����7����O_��~���N��Q���=�+ք����|ۊ�_l�j�(��@��������~݉��[��Q�풿�~t~2,���ǿ~�r/*����)R�I_��k�)N\5������~T��w��׿|��ׯ���/�����~/�]��o?��Eh�J���tC�7�?~��o_>���*5�8�R���;�V/:^$�"PB1����?�)�]��`������#�{C��l�z��d���=`	�	�����[��v(����B�B���X���Z�\M|�����<#n"�FCˎ&�F|�՝�҉���Kl��ލ������k�K�Y����N��My�ΐ��B�!�E�Ɓ��ohr�|č6Z��^-D.���b�{c(�h�����k�S���6Y�-P*��&>��6>����!�a�������w]��O�'�����D���Vsn���6����k�#_@߅�yd��S�7t2��z�s�e>_mq%狄�S���d��:��9�wQ?�����V��-�r��$;�2����k������[��H+[���Lz�Q\̹&=_q1Ȕ.�[�lJ���(.�\H{'"��-ge��Mx�Q[̹��ʡ׺1��n!Q;w�e=��^�ƇX��C1�Z��c�#��>lfӝ�B�|�5����+9��^d"�;t�(��\ӝ�v��k���i����k���At��$�Tvr�9�9T'�N����6��bdP]�u�C,����Kh��w�lY���'�c�i�Wfp�ITZ�R��
h�Qfι���S߰�(̻�K�.�>Ě�|e� �5���5�f�9��9�jLoU���ߺ���D+��WY<3��+z�N�������F�*���[wwx�ݦ �{��&�]��
��]�R_�ej2�
n�/�����M��zyEߍ<�"ĶxZm�Sv����cla;�p�}�UK�JF��о|F&��]�7����Hn���H��32�1�K�F��[����F�Պ����"��p�-SHV�ƀr�U�3r���e#�L#e��I�Br$_�8!�U����ěԠb_3�*}�͌��L.��F����cU��f��Q��D���{�(d�0�,�W8�ȨK=�۹�̖R�P��or?&�.�Dv�V=�V��hA��M�dB]ʉl)�iZ"�A��͖�dԥ�Ȗ:v��K
��K�f�c2�RNdK�ԴVfhХz��1u�'�N��K�(KS=�.�7��Q���;�'"����������;2�.�8Wz��L�y��A��-�u���}2�*�]D]f_ޙ�Q�їwx����=� �ʑA�őwd�e��A�V$����m6Z�w&z�Hd�W��K�@��2�}���+(��K�:Hҳ�� �$s���$�ё*d��}�r�[��
�Xs_��
q;R傜0n��rA�}}��rA�W��l�I��;�s�9��*Y�#4��*Y�m��\����_7�,�����,�f,ͯ\�s��J�!�b+h��9,ȸ��\sXЭfϚÜ&������e8�3����F<k2���%X�A���	\P��M�@�_�,�i�F���m��������\�t+Йr65Ӎx���l6oצ��\.��f.� ຩ��zϱP�&���}�~pa�^�jKs�*T�,�-Ȃq�gԧv�;�����x��q�g�^��)U-z�p<�g2�ѹxv�w+�V�ؑz�,���h�I��e�[�aI�@bTߌ`FF]:���t	i��ؒK]z�dԥsяo[B�g���E&�,�-ȨK�ߠ��ik�}ee�ҳ� �.ɝ'���R��E��,�/M��eI�s�
�>NiK��X^!M�n]ZpQ��Γҗ�C؈8Z�ώd_���Q��Β��\��z�u=��H�%�	�Ug�����0AU{��V��׍/.�0������8�T�adX|Y��Lh�Iѝյ;ۯ�I��ٱ�����j��ѣ�I�0�A�ŗ�gd�ctg�ԍ�fh,Y��,��>#cv��z"m�[�F��X|Y}F~Х;����6�-�Nu���r|Х{9']�;�6�֧��A�շ�3#�.��I��яե,�����Z�Q����<ܧqK�KghХs+oFF]���r��1m����A��}�u��2��ek�k4�9�eG<'��d��ջs�{���M�Z�d_��n�\Gi2?Hҝ�sw��nQ�(%�K�3�$�)>_Ʒ�B*9Y$��/����t��2�M��� _%�K�3�$�)��c�P��^vJҗ�'dt��N��j��,"[�!�T�K�3�.�)��Ġ�l4�y~	�:|)~F]��V�A�57m�N�V������gd<�X�)�\�ᦍs;�E����K�3r���)�\F�����.* ��/��Ѱ�՗�u����3�dÎG�_�	��e�+��u���z$�JG�\�T�˖�ަQ�\k�2VcU�Ȗ�*}��J�~�^K�Pf
�ґ-dTe�e�+=�keZ�Pf�U8�rNF׎f_��>�ӭ/9�U�%G�\�Q�NÕ.m_3r������x�2�R|�r�E.�7v�nUG�\�Q��˖:��e�Z�e�,�w49�傌�d_��ҵO�R�0X�}G�#[N���Qvg��sZ���
j�;�|�rFFU�;[ƞ�H�vj�VUf_���Q����A'ꇍ�2\�Fpk�z��dT�sn�}ׅK�!8�F�<ܝ�����������j����N�t�/[N�7�w��>ƶ�k����}�rF&�۝-�_�­F�"���ӓȗ,'`P�}��u��J�_,=��}G؇�q�s��{jڷ�6$����s�S8�>�&�;SJ���o���
m�d_�����#��8�t�h�8ç?O���9�"՝)|\�T����<wk�#�#0*�i����ճ\���'y�Ss0��i����%��`�I+O�X�dT$����uR�-�����˒2^�#�M�A�q�t�Z�v�+x�g�uAFM:W`�������2:�
�s�Y�]�A�켃g�u���B��z���t��[x�t��,�����칆gAƛ��R�a��BM5@��.�3S��=��L��t�l�����M�Y|�rF&�۝+��U}�K2���A��d9#�.՝-�}�� t)�t9#�.ŝ/S���[m���ܓ՗/gdԥ�n�+�_`��P�����ܓ=�C��h�aq�����$��L�A��˗32�R��2�^He�W�����''_���Q��ΗwKHLRm_��ܓ�/_�ȨK�y�Jo3���@)W��.=��uI����d�x{r���c0������<^�-�1�0�Ɠ�k�32���Y'��Һ�95�q���u��Ό��$w��ݰk��)GhPe�e��A��
o���f�Ƅ��e��A��>n?�����C(K_֙��A�'�N�mү<#��.=�,ȨK�6W�t�Y�qW��ߓ=��,Ȩ�螥�n�Wi5D�cV��\|��uOdK	}I��<'�!��s������ɨK�ё+�zQT��>�stdNF�;���͍�u�1�Uu�˗3�.��r�̺OA��1�n�����t�Η���=�{�YP��|9#?�ҝ/˸J���lsk������� p	  A��|Y�%�ڊMV�l,�K_����A��|Yz�ԣ�f��*��ɞ�#2��ytd�e8�Z�M���ɞ�#2��yt�J�}�?dU����=GGdԥ��Ƞ��f
�a�
��9:� �.�GG�?6�]ٴ�J��1X|���Ȝ�r:K�x�����Z�`��O�8Kd¸}�r��M/��V����)g�,�/_^��8x �%%|�c,���],�S&�\��ͦp\���S<N��`ܾ����*Ktd�9>T|������QpAFU:o�[�A����dT��7��.�&�VA�{���M/ȨK�lA]z�`2���Kc��GT�ҝ��X��dt�����N�����v} ��g���Ӱ��_�F���t�}c�M�,̀�g�ý
�,ς��<��h�w�O%�-]�v�5�%�j� }��ҷ �9F�ѳ�=�����_�"�C~�w#m�?�eo�����.��ih��b�o��~��G������H���>�V�a�y��{r���>V����ʽR�A�q�A�ޟu7a.�I̵_^N�� �`y�ۺ���׃�؃����=hy�=�{l���($�������?�G8��}�)��(޽>7�G@7~쳩P3xr�>C@������A�k�8���+�B��g��M�|�%���F 	vSA��6}�Ճn��{l$�m/�T����mj���k&t��K�E�>��U��?�V|����;I[uϮՓ��s-��	^�?���'�^���XC�^���R�ȕ �t�c����-}�@�|*x�v�࠾�F�g��U�H����z�t&�X{AZc o��n ~[����N�k�����u�R����M��>�n��tPl�,g���JR*��Ԏ7�.��HO0��gx��㘦�-��6ힼ��C�O��>�-���q<O��4�_ك7��-?��x��������^�2��S��A���8��;n�l)�`�C�:�!{b���*U�Rf5'���3#�9����xM�l�~YH�gF�	�l�wc��;g��������g�l^����7�M�C6����~�x�l>����t�b�j��A�g�Ԅ�ͧ��Y|�*���5�ҹ���ͧ�㎅Ғ�9��M�tN��x�l>��q��V��%�4Kg4;�h6��,�� �[҆��)P����M�"���wL�@7�Ҳ|z?�#:h6���ƅ���V?A����l�ͦ#�O�*�b��3#��M'*��tH[f�Ok��3����S#N_�����اU�,�q��Y=5�\o0J��3���ύ8�xP���>��>�����Z>S&��Z=5�pm�Z�-��>v<��ܘs���1G��F[*��'j��sc�!>�j�D�3^��9e��'�j�L�3ãjO,AQ�:Pj�wz��ԙ5�T�Ά�F?N��/[�e]I��u&?�C<�v]E�}�4Ee�A!�j�����A��
v=�{R�j srI2ծ��w���3��N�Z�tw�e�;$�j�\;Ãj�\���ׯ-Q���l��gr���'T����n��sQ2��Q���'r-�c��JX�mH˦�|&����x"��x�#���
֎���	��j�+]�F_��1l��SJ������wS��Mc��,Cک���S#&]�4H��H1ծצߏ�����9�](cK��)B��7ծ�V�/������6�ڤ�����j���_A��;���cJ�jV��Z��j���x��7-�u@T��xPm���W�0�Q�`mP��������A��;b^���tS���c�]{ޏ���=5�p�և�t����jמ���?�k0���Ү��'���m�Q��x��ϩ�ka�d�3+Ժm��� /�9�־����1Z}��~����{;����]�5*�:�.v����6����wQ7
�؋B
��;�U�.<�ks��m�V��o�u|�=�tk�j'PQq�W����po��~SV�-��6&kD���ZX�A�7o�+|�:�W�&@Q��g���
Yo��i�-�|\P�
?�C>(�6r����Ƙc6+��3*�]"s>�t�#��P�8���VK�Qq=�'��{�x����GԜc��(�Qd���g_��רq
j�3��uf���A���ȣ}�[1+�
x�g�������:�2�z�h�Z����<R�����oǭ5��S�H��������=1p������m]R~�΂�M�F�^��-��Y��t�v�OǶ���f��}"�_���f+���%Z�!�'�7C��U�_��k����4�]���r����.٦xpJ��x�t֭��D�G�������F��+��mO-�*T$p�S�_.��b���ǭ o9{��>W)Bb��T|���*?����Ç��{�      �   �  x����j�@�ϣ���п��7C09��r4��k�/^X;��]GJ�H�>��O5U�(~N 
�1 @x|����v]Χ?Ǐ��	 �v
���@8"�dC��4#o�v����q��GT6ň�%gg��$�Q���1��L�!GP�DN�k�����#sZGd�j�Q!SiO�/hC�_���������1��P9�8�|9h`���;lw��^z��0:Rj�Jno�3�I�����%�fk�IJ��ujX�cyD0�V(�������T�I^��{{��ނ��P�J��sq�@%Q?��7Ȫ��NVC�����F�҃=���Y��Fb
r�ܔ�-�U;m��m��cR�n�ιy��䐺�-6�k�v,�Q�x5Xq�������� �
��1��	����      �   o  x��M�#��ףS�"�W$k$Yd�d�
���"�{��tw�Um�`��(�kI�'R&~�������O���|����" ���oo�^���	nȝ5��q�^��#�����?�v���1x����:�6)���AC8R�ĺ1����$��$"?Eҍ�����QH��ds���-'�&�i�\��ąď�Sl@`'0kQHr?"@�il읝mP�����Q�pG0"i�5V�f�%
m�5����(�q��3&F�b�H�}5)6�CD�aф���;�R�x'�1�a�D�Pd]P�sTE���hS�J��"���$�p�PB��Eq@'�O6ŎyB�hXL�zO��H��piTDz�dpf�8�O:#*p������U���8(# �mT,��!b�"��Š<7�ۀ�9�∈瀐��Bփ4�\#�F���9 �L��
����v �����9 A�}$�A�݃������ ����d��ʒ�J�C�qۘ
�~q�s/Ҍp�B��A�%��ց3YɂF
jy
��\y7��E�<��E� D��Ex?�8����2�\�"	��C�E��G��ظh�'Y~f���9�"
<�D�8s���^VP#�v)���Y�Y��`��j�"��t��M���-���E\����7�b�`��XW��&��Y�k���-a���b��y�Y�͛[�Ee��-� f��+� \���H甠eX[�F!o�L8IE�]P�맸{|H�$��8ˀ�?#�*�`����*�,$���&E��Q���SZd�&�Úc5�u��A5-�^=�y�d�eP�]�+��Z�m�'��!j&M�,�����>	F�"����G>�ִ�Bm5*S�����u-��X��c��	�[Y��m�<�s��-Ɓ-|ř�l�i`�#Y�h��X���ֹ��g)m[��}�S��n�q�b;����bVpEΖb�6V���L���(��Ku�dsP�N�	�(������j�E��/K�2�M�(��=/�:*;�s�JFE�E�!�G�>���E�������[���:FJ�:$2i�U�E�)�!ּHp�6^m1`o?��I=��h�u ϳD:dr��x�c!Qڽց(���\�Ņ�wf=ʒ�36L
k��z�5G3-�=�>ʲpPl6
k/�y�����
�	ޠ�{�uu����z�7��^DytY�>��򌌌C/���x#Oc4/��'h���,��E�mȜB#Y�{��FVh�`z뭘_N͋7��7��l��B�q�q���w
P���x�����v�]Bs`�x`7�ey��=8�y1��gY1��Y4dts��L�K7���0R��qD1��bɒ���zZ*�:��K��yO=Vp 'lQ�A��'`<� �l�)��gs��&E�ٜ��7x�g�tǀs$��c��󁈾�vb�t}q��MoE�Lo�O�-�8����_��i6�d���h+mW����t�^m�oIW����t�^m���6�O��6��@W�'�z�^m���6�����j\��� �}�j�u�>4���a����j|�Wා]m�߳�6��YW�"��x�~̺� g]m�oXW��x��c]m�+f�j|tX�U�����7(F��      �   �  x��M��F��S�"◌ȝa�,,/�j ���X�����.f{gdC�����cD���߾�럿��ols���v��x���ľ�~U��q�8�:�7)�1�M���.��>U�GӟC�������J��~�u�9e6{F�|O��^�?��V�%yJψ�IT�,ٟD&]��ʷxFlL��tsy�ĝBh��T�z����C�84���!�� |�t�v�)b���1����<�K�����ˉ�?D�Zϑ�iT9c��Ξ�̸q�3wC���4�6.v&�@���F�Y=�w?D���.F	D�3e���.�Ѹ����!v8w�TM��i�b�8�{�kR�̻�rs�|HP�uev�&Eϼ뉟���aXB"��&�Ȝ;�&3�s�0��a8�����ߊy�;�X8���͉^s��).Mf�;Ât6�2L>�&Q�a�a�3�X�)�a�b�p�T(Ҕ�0=,��ä���!byᣩ��F���!�}Q+��&����"
Φ^�!L�i����/R�v3Z��e��(�1o#lm�CQ�Z�X�~�5ݕ��x;���Bԙ�ҬH����
�H����=�o8�oC1H(n�v�FŃ�:r�{3}�ؙ�Bq��d�����Y�adBN��ڬ��/S�J�{r,Eu3�	�����hV��C����]RU|GqS^f��r��N,gqS^f�?��k�i�͋�/�t��敟�(�u����D��a�6�͋���{�c��EM�W)�b�K��$D�7Mwg����Æ VxQ�ior���a��X���6u[��,4�7]�Hd��"p�*n��E zC�X5,gq�s!(�W��ȅ��9lqW�f�z����{ ���>�V�1��cS-� �s�Q&e�ι酮s��M��d8��s'Z<��[��9v����|���(rΝ�� �5	�C �"g�����r=����z��kV��r9�U����<8c9�3ٰ�E����|~��� ����I�EՌ��|��V��S�h��y�J�0�e`��v���p�C1h٦��uB|�h�
�y�6@,�Sݦ�~$1� d���Z�Y@��0&��G�πf9��4?�P��9��Κ-+����\@g�(�F"�BQ���fXj�Z��f#���E�ϊ��霨|Z���ض�lJ�Q��~]��������?����7�Ő��������у�r�y�/LF��-��G1�癈n��D��O���|Γ�@��)��-��B'A�ޅx�Ҳ�/���.�^[�bz��h �z���ʢ����뎽��$�[�{ЉO{*�˩P|)n%$8�-�{ЩP�\N�t��=<�\o�Y̖S�ؿ?�S�zإb����s9;�%rV!���?ԭ2w@��>�_t���ߑc��[y뽚bWS�j�]M��)v5Ů�����bWS�j�U����)v5Ů�����bWS�j�]M��)v5Ů�����bWS���)�Go��o��      �   �  x����n�0�����6�v	�"BT��洠�I�#c���3��I*}+����

q�x쌣�v���u��C�(����A��>]�"���D��,�D� ���䬰�s�gc�{;�ȉW��F#�"��`�4G:�ɑ��-��d�n4��v�!����[�P!�<C��^��h*0E���H�.b
J�)�(zGWY���5J�����L��Ω�d��C������=�STk0�e�f�M��S������;j�ڣ������_x��d�{u�g���x�QS`��i�<G���q(p�������BK��u��.���=|���z�mкS��5�c����~0��Mw�Xo��&x�'$=�{���@N�05(x�+�����b��&�      �   (  x�͓ko�0�?~E~@��B.��jL��TU�L�#qP�0�_?C`
�֭�*�rn�u���C���!�A�ک^�Uj��Ms�2�]�P�RH]ϷO���<"�5
K|��*!<���ne%�:)e�M��T0��ʜ�Lj�2[W��>J(�%v��,D"q����;p>�k��wiT��QFG�>�Z�ʔjY����af�jղ�+�*V1�t��v�Ro:�����bq���xS����퍓�F�a�X1v��СL4�(|+�j��Kd��ݸ�Ö��ms[��!A(�$.R������`�$W����cg�K�4�4K����ϸF�:Ȭ.����-�HBbm�r���e�Xvi�M����x�z��oZ�/����e<i^�p?��զ/���hpwzݹTTzU؜K�����{�w��I��h|7Ѯ��VR�w�4i�<?�q2�q6@m6�浖��m{\7��vwco�s()��rʹ�an��$뿻�,9N�ar�B}��ֹ,�p�����ûA;V˷�i��I�'�'��n���m��      �     x��PMo�0=���?�U�lҞ�14���b��%k��AӪM�د_
�Ӑ�˳���%P����=L�Z�cT45첻��G�4D��)C,S�SB"A���!	$�0�a0���:ݙ�;7MR
��S^/�-�e����\f�}gd�R9]~�G(C�I�U��n��LU��@���@�js�P9@L8��N_/�u�HD	a"��{�J�Oo�-�o��^�JY���ܚ/u��P����2�6S������
����f���zчN�^w��=��ŕ��s�?�篯�Z[�(�#���     