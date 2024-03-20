PGDMP     .                    |            demo_db %   12.18 (Ubuntu 12.18-0ubuntu0.20.04.1) %   12.18 (Ubuntu 12.18-0ubuntu0.20.04.1) q    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    19284    demo_db    DATABASE     m   CREATE DATABASE demo_db WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_IN' LC_CTYPE = 'en_IN';
    DROP DATABASE demo_db;
                postgres    false            �            1255    19285    accesscontrol_log_trigger()    FUNCTION     �  CREATE FUNCTION public.accesscontrol_log_trigger() RETURNS trigger
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
       public          postgres    false            �            1255    19286    credentials_log_trigger()    FUNCTION     M  CREATE FUNCTION public.credentials_log_trigger() RETURNS trigger
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
       public          postgres    false            �            1255    19287    invoice_log_trigger()    FUNCTION     B  CREATE FUNCTION public.invoice_log_trigger() RETURNS trigger
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
       public          postgres    false            �            1255    19288    products_log_trigger()    FUNCTION     �  CREATE FUNCTION public.products_log_trigger() RETURNS trigger
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
       public          postgres    false            �            1255    19289    user_log_trigger()    FUNCTION     Z
  CREATE FUNCTION public.user_log_trigger() RETURNS trigger
    LANGUAGE plpgsql
    AS $$

	
	

BEGIN
    IF TG_OP = 'INSERT' THEN
        INSERT INTO user_log(userid, email, phno, aadhar, pan, positionid, adminid, updatedby, status, userprofile, pstreetname, pdistrictid, pstateid, ppostalcode, cstreetname, cdistrictid, cstateid, cpostalcode,operation,last_updated_on,organizationname,gstno,bussinesstype,fname,lname,upiid,bankname,bankaccno,passbookimg,accholdername,ifsccode)
	VALUES( NEW.userid, NEW.email, NEW.phno, NEW.aadhar,NEW.pan, NEW.positionid, NEW.adminid, NEW.updatedby, NEW.status, NEW.userprofile, NEW.pstreetname, NEW.pdistrictid, NEW.pstateid, NEW.ppostalcode, NEW.cstreetname, NEW.cdistrictid, NEW.cstateid, NEW.cpostalcode,'insert',current_timestamp,NEW.organizationname,NEW.gstnno,NEW.bussinesstype,NEW.fname,NEW.lname,NEW.upiid,NEW.bankname,NEW.bankaccno,NEW.passbookimg,NEW.accholdername,NEW.ifsccode);
   
   ELSIF TG_OP = 'DELETE' THEN
        INSERT INTO user_log( userid, email, phno, aadhar, pan, positionid, adminid, updatedby, status, userprofile, pstreetname, pdistrictid, pstateid, ppostalcode, cstreetname, cdistrictid, cstateid, cpostalcode,operation,last_updated_on,organizationname,gstno,bussinesstype,fname,lname,upiid,bankname,bankaccno,passbookimg,accholdername,ifsccode)
	VALUES( OLD.userid, OLD.email, OLD.phno, OLD.aadhar,OLD.pan, OLD.positionid, OLD.adminid,OLD.updatedby, OLD.status, OLD.userprofile, OLD.pstreetname, OLD.pdistrictid, OLD.pstateid, OLD.ppostalcode, OLD.cstreetname, OLD.cdistrictid, OLD.cstateid, OLD.cpostalcode,'delete',current_timestamp,OLD.organizationname,OLD.gstnno,OLD.bussinesstype,OLD.fname,OLD.lname,OLD.upiid,OLD.bankname,OLD.bankaccno,OLD.passbookimg,OLD.accholdername,OLD.ifsccode);
     
	 ELSIF TG_OP = 'UPDATE' THEN
       
        INSERT INTO user_log( userid, email, phno, aadhar, pan, positionid, adminid, updatedby, status, userprofile, pstreetname, pdistrictid, pstateid, ppostalcode, cstreetname, cdistrictid, cstateid, cpostalcode,operation,last_updated_on,organizationname,gstno,bussinesstype,fname,lname,upiid,bankname,bankaccno,passbookimg,accholdername,ifsccode)
	VALUES( NEW.userid, NEW.email, NEW.phno, NEW.aadhar,NEW.pan, NEW.positionid, NEW.adminid, NEW.updatedby, NEW.status, NEW.userprofile, NEW.pstreetname, NEW.pdistrictid, NEW.pstateid, NEW.ppostalcode, NEW.cstreetname, NEW.cdistrictid, NEW.cstateid, NEW.cpostalcode,'update',current_timestamp,NEW.organizationname,NEW.gstnno,NEW.bussinesstype,NEW.fname,NEW.lname,NEW.upiid,NEW.bankname,NEW.bankaccno,NEW.passbookimg,NEW.accholdername,NEW.ifsccode);
   
		END IF;
    
    
    RETURN OLD; 
END;


$$;
 )   DROP FUNCTION public.user_log_trigger();
       public          postgres    false            �            1259    19290    accesscontrol_log    TABLE     �  CREATE TABLE public.accesscontrol_log (
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
       public         heap    postgres    false            �            1259    19297    accesscontroll    TABLE     �  CREATE TABLE public.accesscontroll (
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
       public         heap    postgres    false            �            1259    19304    accesscontroll_rno_seq    SEQUENCE     �   ALTER TABLE public.accesscontroll ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.accesscontroll_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    203            �            1259    19306    accesscontroltrigger_rno_seq    SEQUENCE     �   ALTER TABLE public.accesscontrol_log ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.accesscontroltrigger_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    202            �            1259    19308    credentials    TABLE       CREATE TABLE public.credentials (
    rno integer NOT NULL,
    userid character varying(20),
    username character varying,
    password character varying,
    lastupdatedby character varying,
    last_updated_on timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.credentials;
       public         heap    postgres    false            �            1259    19315    credentials_log    TABLE     5  CREATE TABLE public.credentials_log (
    rno integer NOT NULL,
    userid character varying(20),
    username character varying,
    password character varying,
    lastupdatedby character varying,
    operation character varying,
    last_updated_on timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
 #   DROP TABLE public.credentials_log;
       public         heap    postgres    false            �            1259    19322    credentials_rno_seq    SEQUENCE     �   ALTER TABLE public.credentials ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.credentials_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    206            �            1259    19324    credentialstrigger_rno_seq    SEQUENCE     �   ALTER TABLE public.credentials_log ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.credentialstrigger_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    207            �            1259    19326    district    TABLE     �   CREATE TABLE public.district (
    rno integer NOT NULL,
    stateid character varying(6),
    districtid character varying(6),
    districtcode character varying(6),
    districtname character varying(50)
);
    DROP TABLE public.district;
       public         heap    postgres    false            �            1259    19329    district_rno_seq    SEQUENCE     �   ALTER TABLE public.district ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.district_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    210            �            1259    19331    feedback    TABLE     �   CREATE TABLE public.feedback (
    rno integer NOT NULL,
    userid character varying,
    feedback character varying,
    last_updated_by character varying(90),
    last_updated_on timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.feedback;
       public         heap    postgres    false            �            1259    19338    feedback_rno_seq    SEQUENCE     �   ALTER TABLE public.feedback ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.feedback_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    212            �            1259    19340    invoice    TABLE     `  CREATE TABLE public.invoice (
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
       public         heap    postgres    false            �            1259    19348    invoice_id_seq    SEQUENCE     y   CREATE SEQUENCE public.invoice_id_seq
    START WITH 1000
    INCREMENT BY 1
    MINVALUE 0
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.invoice_id_seq;
       public          postgres    false    214            �           0    0    invoice_id_seq    SEQUENCE OWNED BY     H   ALTER SEQUENCE public.invoice_id_seq OWNED BY public.invoice.invoiceid;
          public          postgres    false    215            �            1259    19350    invoice_log    TABLE     �  CREATE TABLE public.invoice_log (
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
       public         heap    postgres    false            �            1259    19357    invoice_rno_seq    SEQUENCE     �   ALTER TABLE public.invoice ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.invoice_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    214            �            1259    19359    invoiceitem    TABLE     r  CREATE TABLE public.invoiceitem (
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
       public         heap    postgres    false            �            1259    19366    invoiceitem_rno_seq    SEQUENCE     �   ALTER TABLE public.invoiceitem ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.invoiceitem_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    218            �            1259    19368    invoiceslip    TABLE        CREATE TABLE public.invoiceslip (
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
       public         heap    postgres    false            �            1259    19375    invoiceslip_rno_seq    SEQUENCE     �   ALTER TABLE public.invoiceslip ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.invoiceslip_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    220            �            1259    19377    invoicetrigger_rno_seq    SEQUENCE     �   ALTER TABLE public.invoice_log ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.invoicetrigger_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    216            �            1259    19379    position    TABLE     �   CREATE TABLE public."position" (
    rno integer NOT NULL,
    positionid character varying,
    "position" character varying,
    lastupdatedby character varying,
    last_updated_on timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public."position";
       public         heap    postgres    false            �            1259    19386    position_rno_seq    SEQUENCE     �   ALTER TABLE public."position" ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.position_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    223            �            1259    19388 	   previlage    TABLE     �   CREATE TABLE public.previlage (
    rno integer NOT NULL,
    previlageid character varying,
    previlage character varying,
    lastupdatedby character varying,
    last_updated_on timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.previlage;
       public         heap    postgres    false            �            1259    19395    previlage_rno_seq    SEQUENCE     �   ALTER TABLE public.previlage ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.previlage_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    225            �            1259    19397    product_log    TABLE       CREATE TABLE public.product_log (
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
       public         heap    postgres    false            �            1259    19404    product_log_rno_seq    SEQUENCE     �   CREATE SEQUENCE public.product_log_rno_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.product_log_rno_seq;
       public          postgres    false    227            �           0    0    product_log_rno_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.product_log_rno_seq OWNED BY public.product_log.rno;
          public          postgres    false    228            �            1259    19406    products    TABLE     �  CREATE TABLE public.products (
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
       public         heap    postgres    false            �            1259    19413    products_rno_seq    SEQUENCE     �   ALTER TABLE public.products ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.products_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    229            �            1259    19415    state    TABLE     �   CREATE TABLE public.state (
    rno integer NOT NULL,
    stateid character varying,
    statecode character varying,
    statename character varying,
    lastupdatedby character varying,
    updatedon character varying
);
    DROP TABLE public.state;
       public         heap    postgres    false            �            1259    19421    state_rno_seq    SEQUENCE     �   ALTER TABLE public.state ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.state_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    231            �            1259    19423    user    TABLE     D  CREATE TABLE public."user" (
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
    ifsccode character varying
);
    DROP TABLE public."user";
       public         heap    postgres    false            �            1259    19430    user_log    TABLE     c  CREATE TABLE public.user_log (
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
    last_update_on timestamp(6) without time zone,
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
    ifsccode character varying
);
    DROP TABLE public.user_log;
       public         heap    postgres    false            �            1259    19436    user_rno_seq    SEQUENCE     �   ALTER TABLE public."user" ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.user_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    233            �            1259    19438    user_user_id_seq    SEQUENCE     |   CREATE SEQUENCE public.user_user_id_seq
    START WITH 1000
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.user_user_id_seq;
       public          postgres    false    233            �           0    0    user_user_id_seq    SEQUENCE OWNED BY     F   ALTER SEQUENCE public.user_user_id_seq OWNED BY public."user".userid;
          public          postgres    false    236            �            1259    19440    usertrigger_rno_seq    SEQUENCE     �   ALTER TABLE public.user_log ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.usertrigger_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    234            �           2604    19442    invoice invoiceid    DEFAULT     �   ALTER TABLE ONLY public.invoice ALTER COLUMN invoiceid SET DEFAULT ('INVOICE'::text || nextval('public.invoice_id_seq'::regclass));
 @   ALTER TABLE public.invoice ALTER COLUMN invoiceid DROP DEFAULT;
       public          postgres    false    215    214            �           2604    19443    product_log rno    DEFAULT     r   ALTER TABLE ONLY public.product_log ALTER COLUMN rno SET DEFAULT nextval('public.product_log_rno_seq'::regclass);
 >   ALTER TABLE public.product_log ALTER COLUMN rno DROP DEFAULT;
       public          postgres    false    228    227            �           2604    19444    user userid    DEFAULT     |   ALTER TABLE ONLY public."user" ALTER COLUMN userid SET DEFAULT ('U'::text || nextval('public.user_user_id_seq'::regclass));
 <   ALTER TABLE public."user" ALTER COLUMN userid DROP DEFAULT;
       public          postgres    false    236    233            �          0    19290    accesscontrol_log 
   TABLE DATA           �   COPY public.accesscontrol_log (rno, distributer, product, invoicegenerator, userid, customer, staff, operation, invoicepayslip, d_staff, last_updated_on, last_updated_by) FROM stdin;
    public          postgres    false    202   6�       �          0    19297    accesscontroll 
   TABLE DATA           �   COPY public.accesscontroll (rno, distributer, product, invoicegenerator, userid, customer, staff, invoicepayslip, d_staff, last_updated_on, last_updated_by) FROM stdin;
    public          postgres    false    203   W�       �          0    19308    credentials 
   TABLE DATA           f   COPY public.credentials (rno, userid, username, password, lastupdatedby, last_updated_on) FROM stdin;
    public          postgres    false    206   л       �          0    19315    credentials_log 
   TABLE DATA           u   COPY public.credentials_log (rno, userid, username, password, lastupdatedby, operation, last_updated_on) FROM stdin;
    public          postgres    false    207   ��       �          0    19326    district 
   TABLE DATA           X   COPY public.district (rno, stateid, districtid, districtcode, districtname) FROM stdin;
    public          postgres    false    210   O�       �          0    19331    feedback 
   TABLE DATA           [   COPY public.feedback (rno, userid, feedback, last_updated_by, last_updated_on) FROM stdin;
    public          postgres    false    212   c�       �          0    19340    invoice 
   TABLE DATA           �   COPY public.invoice (rno, invoiceid, senderid, receiverid, invoicedate, sendernotes, subtotal, discount, total, invoicestatus, lastupdatedby, senderstatus, date, reciverstatus, transactionid, last_updated_on) FROM stdin;
    public          postgres    false    214   ��       �          0    19350    invoice_log 
   TABLE DATA           �   COPY public.invoice_log (rno, invoiceid, senderid, receiverid, invoicedate, sendernotes, subtotal, discount, total, invoicestatus, operation, last_updated_by, last_updated_on) FROM stdin;
    public          postgres    false    216   ��       �          0    19359    invoiceitem 
   TABLE DATA           �   COPY public.invoiceitem (rno, invoiceid, productid, quantity, cost, discountperitem, lastupdatedby, hsncode, last_updated_on) FROM stdin;
    public          postgres    false    218   F�       �          0    19368    invoiceslip 
   TABLE DATA           �   COPY public.invoiceslip (rno, invoiceid, senderid, receiverid, invoicedate, hsncode, productid, quantity, discount, originalprice, afterdiscount, totalprice, lastupdatedby, last_updated_on) FROM stdin;
    public          postgres    false    220   �       �          0    19379    position 
   TABLE DATA           a   COPY public."position" (rno, positionid, "position", lastupdatedby, last_updated_on) FROM stdin;
    public          postgres    false    223   g�       �          0    19388 	   previlage 
   TABLE DATA           `   COPY public.previlage (rno, previlageid, previlage, lastupdatedby, last_updated_on) FROM stdin;
    public          postgres    false    225   ��       �          0    19397    product_log 
   TABLE DATA           �   COPY public.product_log (productid, quantity, priceperitem, last_updated_by, productname, belongsto, status, batchno, cgst, sgst, last_updated_on, operation, rno) FROM stdin;
    public          postgres    false    227   ��       �          0    19406    products 
   TABLE DATA           �   COPY public.products (rno, productid, quantity, priceperitem, last_updated_by, productname, belongsto, status, batchno, cgst, sgst, last_updated_on) FROM stdin;
    public          postgres    false    229   Y�       �          0    19415    state 
   TABLE DATA           ]   COPY public.state (rno, stateid, statecode, statename, lastupdatedby, updatedon) FROM stdin;
    public          postgres    false    231   G�       �          0    19423    user 
   TABLE DATA           b  COPY public."user" (rno, userid, email, phno, aadhar, pan, positionid, adminid, updatedby, status, userprofile, pstreetname, pdistrictid, pstateid, ppostalcode, cstreetname, cdistrictid, cstateid, cpostalcode, updatedon, organizationname, gstnno, bussinesstype, fname, lname, upiid, bankname, bankaccno, passbookimg, accholdername, ifsccode) FROM stdin;
    public          postgres    false    233   ��       �          0    19430    user_log 
   TABLE DATA           ~  COPY public.user_log (rno, userid, email, phno, aadhar, pan, positionid, adminid, updatedon, updatedby, status, userprofile, pstreetname, pdistrictid, pstateid, ppostalcode, cstreetname, cdistrictid, cstateid, cpostalcode, operation, last_update_on, organizationname, gstno, bussinesstype, fname, lname, upiid, bankname, bankaccno, passbookimg, accholdername, ifsccode) FROM stdin;
    public          postgres    false    234   S�       �           0    0    accesscontroll_rno_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.accesscontroll_rno_seq', 90, true);
          public          postgres    false    204            �           0    0    accesscontroltrigger_rno_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.accesscontroltrigger_rno_seq', 224, true);
          public          postgres    false    205            �           0    0    credentials_rno_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.credentials_rno_seq', 105, true);
          public          postgres    false    208            �           0    0    credentialstrigger_rno_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.credentialstrigger_rno_seq', 163, true);
          public          postgres    false    209            �           0    0    district_rno_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.district_rno_seq', 1, false);
          public          postgres    false    211            �           0    0    feedback_rno_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.feedback_rno_seq', 5, true);
          public          postgres    false    213            �           0    0    invoice_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.invoice_id_seq', 1312, true);
          public          postgres    false    215            �           0    0    invoice_rno_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.invoice_rno_seq', 343, true);
          public          postgres    false    217            �           0    0    invoiceitem_rno_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.invoiceitem_rno_seq', 342, true);
          public          postgres    false    219            �           0    0    invoiceslip_rno_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.invoiceslip_rno_seq', 5, true);
          public          postgres    false    221            �           0    0    invoicetrigger_rno_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.invoicetrigger_rno_seq', 499, true);
          public          postgres    false    222            �           0    0    position_rno_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.position_rno_seq', 5, true);
          public          postgres    false    224            �           0    0    previlage_rno_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.previlage_rno_seq', 1, false);
          public          postgres    false    226            �           0    0    product_log_rno_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.product_log_rno_seq', 5, true);
          public          postgres    false    228            �           0    0    products_rno_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.products_rno_seq', 138, true);
          public          postgres    false    230            �           0    0    state_rno_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.state_rno_seq', 1, false);
          public          postgres    false    232            �           0    0    user_rno_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.user_rno_seq', 209, true);
          public          postgres    false    235            �           0    0    user_user_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.user_user_id_seq', 1010, true);
          public          postgres    false    236            �           0    0    usertrigger_rno_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.usertrigger_rno_seq', 845, true);
          public          postgres    false    237                       2606    19446 "   accesscontroll accesscontroll_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public.accesscontroll
    ADD CONSTRAINT accesscontroll_pkey PRIMARY KEY (rno);
 L   ALTER TABLE ONLY public.accesscontroll DROP CONSTRAINT accesscontroll_pkey;
       public            postgres    false    203                        2606    19448 +   accesscontrol_log accesscontroltrigger_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.accesscontrol_log
    ADD CONSTRAINT accesscontroltrigger_pkey PRIMARY KEY (rno);
 U   ALTER TABLE ONLY public.accesscontrol_log DROP CONSTRAINT accesscontroltrigger_pkey;
       public            postgres    false    202                       2606    19450    credentials credentials_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.credentials
    ADD CONSTRAINT credentials_pkey PRIMARY KEY (rno);
 F   ALTER TABLE ONLY public.credentials DROP CONSTRAINT credentials_pkey;
       public            postgres    false    206            
           2606    19452 '   credentials_log credentialstrigger_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.credentials_log
    ADD CONSTRAINT credentialstrigger_pkey PRIMARY KEY (rno);
 Q   ALTER TABLE ONLY public.credentials_log DROP CONSTRAINT credentialstrigger_pkey;
       public            postgres    false    207                       2606    19454    district district_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public.district
    ADD CONSTRAINT district_pkey PRIMARY KEY (rno);
 @   ALTER TABLE ONLY public.district DROP CONSTRAINT district_pkey;
       public            postgres    false    210                        2606    19456    user email_already_exsist 
   CONSTRAINT     W   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT email_already_exsist UNIQUE (email);
 E   ALTER TABLE ONLY public."user" DROP CONSTRAINT email_already_exsist;
       public            postgres    false    233                       2606    19458 .   credentials email_already_exsist_in_user_table 
   CONSTRAINT     m   ALTER TABLE ONLY public.credentials
    ADD CONSTRAINT email_already_exsist_in_user_table UNIQUE (username);
 X   ALTER TABLE ONLY public.credentials DROP CONSTRAINT email_already_exsist_in_user_table;
       public            postgres    false    206                       2606    19460    invoice invoice_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.invoice
    ADD CONSTRAINT invoice_pkey PRIMARY KEY (rno);
 >   ALTER TABLE ONLY public.invoice DROP CONSTRAINT invoice_pkey;
       public            postgres    false    214                       2606    19462    invoiceitem invoiceitem_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.invoiceitem
    ADD CONSTRAINT invoiceitem_pkey PRIMARY KEY (rno);
 F   ALTER TABLE ONLY public.invoiceitem DROP CONSTRAINT invoiceitem_pkey;
       public            postgres    false    218                       2606    19464    invoiceslip invoiceslip_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.invoiceslip
    ADD CONSTRAINT invoiceslip_pkey PRIMARY KEY (rno);
 F   ALTER TABLE ONLY public.invoiceslip DROP CONSTRAINT invoiceslip_pkey;
       public            postgres    false    220                       2606    19466    invoice_log invoicetrigger_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.invoice_log
    ADD CONSTRAINT invoicetrigger_pkey PRIMARY KEY (rno);
 I   ALTER TABLE ONLY public.invoice_log DROP CONSTRAINT invoicetrigger_pkey;
       public            postgres    false    216                       2606    19468    position position_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public."position"
    ADD CONSTRAINT position_pkey PRIMARY KEY (rno);
 B   ALTER TABLE ONLY public."position" DROP CONSTRAINT position_pkey;
       public            postgres    false    223                       2606    19470    previlage previlage_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.previlage
    ADD CONSTRAINT previlage_pkey PRIMARY KEY (rno);
 B   ALTER TABLE ONLY public.previlage DROP CONSTRAINT previlage_pkey;
       public            postgres    false    225                       2606    19472    product_log product_log_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.product_log
    ADD CONSTRAINT product_log_pkey PRIMARY KEY (rno);
 F   ALTER TABLE ONLY public.product_log DROP CONSTRAINT product_log_pkey;
       public            postgres    false    227                       2606    19474    products products_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (rno);
 @   ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
       public            postgres    false    229            "           2606    19476    user set_unique_email 
   CONSTRAINT     S   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT set_unique_email UNIQUE (email);
 A   ALTER TABLE ONLY public."user" DROP CONSTRAINT set_unique_email;
       public            postgres    false    233            $           2606    19478    user set_unique_userid 
   CONSTRAINT     U   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT set_unique_userid UNIQUE (userid);
 B   ALTER TABLE ONLY public."user" DROP CONSTRAINT set_unique_userid;
       public            postgres    false    233                       2606    19480    state state_pkey 
   CONSTRAINT     O   ALTER TABLE ONLY public.state
    ADD CONSTRAINT state_pkey PRIMARY KEY (rno);
 :   ALTER TABLE ONLY public.state DROP CONSTRAINT state_pkey;
       public            postgres    false    231            &           2606    19482    user user_pkey 
   CONSTRAINT     O   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (rno);
 :   ALTER TABLE ONLY public."user" DROP CONSTRAINT user_pkey;
       public            postgres    false    233            (           2606    19484    user userid_already_exsist 
   CONSTRAINT     Y   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT userid_already_exsist UNIQUE (userid);
 F   ALTER TABLE ONLY public."user" DROP CONSTRAINT userid_already_exsist;
       public            postgres    false    233                       2606    19486 /   credentials userid_already_exsist_in_user_table 
   CONSTRAINT     l   ALTER TABLE ONLY public.credentials
    ADD CONSTRAINT userid_already_exsist_in_user_table UNIQUE (userid);
 Y   ALTER TABLE ONLY public.credentials DROP CONSTRAINT userid_already_exsist_in_user_table;
       public            postgres    false    206            *           2606    19488    user_log usertrigger_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.user_log
    ADD CONSTRAINT usertrigger_pkey PRIMARY KEY (rno);
 C   ALTER TABLE ONLY public.user_log DROP CONSTRAINT usertrigger_pkey;
       public            postgres    false    234            +           2620    19489     accesscontroll accesscontrol_log    TRIGGER     �   CREATE TRIGGER accesscontrol_log AFTER INSERT ON public.accesscontroll FOR EACH ROW EXECUTE FUNCTION public.accesscontrol_log_trigger();
 9   DROP TRIGGER accesscontrol_log ON public.accesscontroll;
       public          postgres    false    238    203            ,           2620    19490    credentials credentials_log    TRIGGER     �   CREATE TRIGGER credentials_log AFTER INSERT OR DELETE OR UPDATE ON public.credentials FOR EACH ROW EXECUTE FUNCTION public.credentials_log_trigger();
 4   DROP TRIGGER credentials_log ON public.credentials;
       public          postgres    false    206    239            -           2620    19491    invoice invoice_log    TRIGGER     �   CREATE TRIGGER invoice_log AFTER INSERT OR DELETE OR UPDATE ON public.invoice FOR EACH ROW EXECUTE FUNCTION public.invoice_log_trigger();
 ,   DROP TRIGGER invoice_log ON public.invoice;
       public          postgres    false    240    214            .           2620    19492    products product_log    TRIGGER     �   CREATE TRIGGER product_log AFTER INSERT OR DELETE OR UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.products_log_trigger();
 -   DROP TRIGGER product_log ON public.products;
       public          postgres    false    253    229            �     x����n$7E�寘����p����&��"H0��'��z��*y �"܋���㊤H�$����D<������o��,�提���>S�$�"�"鹰p�����o���x�]bد��X����?͆X��Wa�:΍�w N�|�o�}[X��e�;��˴�_/l��3f9`|��=�}�a0;�9�[|_�n1+mزn�p@a����Ь�Ӳ��L3�k��7������g	Z��r\���.]��?v�#h�&��2�9����,O��z�-;*Ǟ�ؕ��d��6{<2l>������h�q��X������Q���k�6X�Q o�r����k�{�/Nr���z`��WpB���±�k��I����=
��m=���0"�)cv��Lm�,;˰�8Z�d���n_qm���t��8��g�{�r��D��<(��P�w00l��
�U1v0`9Y�ܭ6 Gp�V;�a�I�#�z�H&���&��$(����z�a'��t�D�{�z�h�KUdo��� �IEYAa��q�d���[n �8X`-1����T̡pQ��p�
�≊vc�� h1��DkG�Q��� ��N�KRp@�l���Py3�2�AӼ�ͫK�t��ʘ��>�I{�����0�Z��B'�y��\S��۹1�W�]��07rs�q��uo��JBG�}[��Ĕ9w4b�Xh!Ӣ����v&��4.N<��-�����Mr���h�ڜImΤ6�]P�BG#���N&Z_������X��D�J����ՙ��q�zI�B7=FKy�U(�x�s���[ݸҮ<�2Yͥ-�qh��M��a�Q]�q�:!�	��'.�J��yw�u6�E��(�M�Iܶ�E'���bÝ�6<�>�p-:�����b��=8�D�y'[�"=w���I�wъ#��&�x���U���������*�?&#X��G�1�r���7��b64�g���9�~	��<qv��G��6�B+�C�����m�	�nb+�o���V8)ʍ�ଦi2��4m����.��K�5�۬��h��lֳͺ.���fD6�4�a�{||�Bb����+'��R	b[�J�2��=!�FE�B����ڥ&5r4�fE�)���I�p}�}%!��܅�LXeshB&�E��en�޳����Z(Y��Q��ǡ�����4��x��ЌH�FV�g�hה��_����H�S|�kK�s���v;��+޿�<�@eN��_��vϱ�Q��'N/���sHy�:3������2�և      �   i  x���M��0�Ϟ_�`Y���0������V(���P�c'
e�;%H��JV�#'��,Z��}���+�+��O7�k�\
ק�Tߣ�~�P�w[�D�S:��OQ���A)Liv�_o50�;�c�H�.�Q���"Z0�AmD�tP?<Qı0�Q1Opd��42�F���{Ü�(-�C��W��ۮa ������v�L��R9?�����GN��RM���+GwyXGηle2r��Y��V(+%i��ƈ��!��%p\l=D��e�v�!/�!�8���ʆ�0E����N8�*{�j�M}���o��G��+��d]�5[:�ί�R�<N�n��ܯ�H��:(�0��J���Q�$)tJ�`g�T��G)�(f�*�Bu(vfO�+��9��	d�n<�!Ac�]�(��Z�e9�\��fI��8ܩEn6�q KS'y��NIA[,��6K�[T;�
���� ��跇!((���)��ؘ�ĸ7��A�t_QP��ݳ}j'���U� �� �	���K�eW'�X���S('�zt^������3J�[Wsyv��_�1���/�U�y�j�RM�j�����2�T��(]Cʵ'+�q�\.����      �   �  x����n1���)x�������D����-��e�쒰�*y�ڞID-K�������8#�)#�͏)�O��8�4L�Q���̝�w2�A�z�;�Vz��_d�^L�|H�����Ӝ	}�s�ncoSF�r�j����lAt5,��.j88�MI�D�q@-��&�Ai��ZP_��d9�b�փ�rP۰�R�1@�cM-���m#+вH���ѲHd��X�d�����A��PC�Y�-\EmK _Q��%@��A�R/V%��b�`�E�R�j��@�����a��Pu�|�,��Ab[R{��X]ER��Œ�hY$2-�D%c���&7.t,6�mx��7����ѕ 9�wZRȱXZ���*�ʀ�U>uƫZ>#kI��4�X,��%�b�R�*&k�^�Zj�Ed5����d���*"Y��)�9KYɱXL��X,=�9�A����KA/�yH�4�����mJoo�$�?s�?����kw�IG�s�������R�u�gU�sw�E�V�&4��=m��a�+_��V�щmm���נ'��Zރ'o|o�d��!�>B4�'���k��]b��7��iܝ^��@�R	ȱ�}[��P{�6��ze�9�����˔N^F��1��Z�l�U,@�i���}&Dc�/ʫp�� �1���X��VP�*��ۍy�����q��5ȵ�}�Ӳ�>H�z�V��o�-�      �   �  x��ZMo7<S�" �����c{1z�e�Uk!��Hr��ח���j�	��a��,9|����$�w������ >��~����tJ*�^��2�#�Qf#��I(��t�}�]v���ş�����t��H����<���C2<=�)a'K2��8�/����?�i<ƿ&�4�i��U�s��uBr��MBr�����NӹA��ݖ�$5[-�����Lv��l�@�J�A����1�]�;oD\�Ɗ-�ԕ���2��^�Cvx�m}���,!MF�@)n ����fh���MK��(q��@n����4H��<���ű儩ݲ*X���`�3��8 F�S��-0Ƽ�[uX��Un�E�E|D�-B2�gI6Vf��! ��� ����F;X}SH��$����I��B|'!� �+~Ә�3�B3(n!��"zFA뛘!�<630����P�A�M�A4p���lց�n�˙u�5�����v�T7���� �%1-mz+��"U�g�O��.n�'�w���8O�ĩ����V���L�<׽qS�B���u�m�.g$�z�6� ���AT:�Pp.lW,;��aٸ�<p9��5tdjxdU�
+�'ά�c�G#]:��MƆCvi��;�
% *t-o�/��dw��,�(N��Ze��Ԡ�V�s�ag�yXs��Ar�Y�f9|>Ae%!њJyNC�ˏ���d%�5�9�b�є,���UT:��'D9ЍN�U�`�R�e��>���(����:Q�dʮ3�G��L�Tfz*�=���ʆu5x㞰n\SV൜�ӮA�z���m��'U�F�t�IK�0�a�<������y<*0�i[C�[�ߝ�՘2Y��t��R>��h�$��L%~��2X,�������ý�ٝ��S377�.1%f���6�8͗�(�*S�%�7�$Kq�V��1��<���f˔V*+�UAKWy�^��Moް݃wd�C�3[h6S�Q�a]�ޏ�?�����_��R]C��wH�'�|���N����$ƕ��J��q$�k�T9Ui�1>=	8��v��/��4�`t��n4��UJG�?s��ؘ��Ǫ��&Vjc̆��X��̱�b������ח�x��{��D%�Ѱ�?Z������^�V�����      �     x�5��n�0E�寘/�sفV��r�YD�����v#Z���u�ٜ�-���rBYF	�tE����_g��,����|���~�eYU���A��N�����=�w���2[��ʏ�k߳��c�h?�x>��N=��
�U�л���s̞i��ϗު��PY�T��<b���Tr'�����Q	߃���g�$RI��(̐J�
,�;����O7HD��#��c?B�ُ�ȗa+�ؼj���q\���"X�{����3�3Dl�{�<��U"�`�ZQkq�/y�D|��4Ԯ�:^�'��� �.���7�T�A�Ԃ���m�)vt`o�Ld�C���p}���4偌#_�)h>4���_���!��i�ڀ����B����1ťb�N�/�a�b��A~��mǵw*E��O22噧	�PE�4��,X��"����A#��T������)��
����Y�5=�!e�y�&�W�|�%W��5�U�:��Og"v5u�K#m�k�'�Ê�Ƴ��[)��R�.      �   i   x���1�  ����HZ
�� GYk4�$.~�'h��ָ�0#�,ZW!W���5�w�&����Ur.�,�-9�C>i�\[9u'2O1�z)�d�%��1���9v      �   �  x���Ao7���(гeΐ\�9�hz�%=�)��.ZM�����JO��.Mq� 0 i�f8�qv��D����_�����rى�ݧG�d�Ný����������}����Tޅ�.�}���t'*�w8����Ø�+\N��=\o��r���[������뽿��"�@`�=/Ǯ6R��M
�"��B9	(�ڻi_�Q��XӉ�T��TI�5-�对"��'v߫q�5� "ᘯ�����ß_~{�{���//�טg����2�N&��&)j���5o����� ��b�zs^�D֤]1A���\���Z�bY'L¤���&_d�K|8j�aE��}�v���{��0��lEd�����Y��}���r�xd�2��^�ۻ7�^���ۯ?f���QQ9�Sv���a�(RJsrcQy��. ;�ӗc���t}��ѥ����,�7f��Nojk�u�������u.��:7�֝�z[B!K%��߾=>��swg�'��9
��e�� �_֣�x!�4.��`!��B�:blxg��pճ�"��;$���ZO`��߲}z�Ct=
���f��)Q���3�r%Q�U��^��� �r����_>�������Q�t��t�L�o���y{��:��b^���j�M�B����dO� ��3%<�y�pm�����ys� �Q &��.�>q��P(Rw�i��(��K ���v	 �Pb�.8���%&hDOG��ZP�H�X�q=��T��H"��l���j$aU&���2W"�_m��J(�.$\c}I@��H2��4��F����k#�CP����}�K��/�ᄭKJ��oS���+=�*0I�����*:L:7�ZZ�d�,�N'iB1�Dg��EC`A4�������rD�뾒���rfDCd�A4�ADC�A4�AL�<(��ɐ�m2���6��-ׁz���M�۴Uo�u/�:Poɮ��@Ǯ�����Ԭ�������?�n�Q�O��������!x����A6� �!x���Qש,ț��I؇N%�A6�� �!h�i w�$�M�
�y%� �y�i .=)�4 ÞC�wO��٩*�؝�*x�l�����>w*�6|�	�P� %)�H O�C$�Ef9I��9#a9I��Q�1D8��;� :�H ��:�<�G���ΐp�]�!��r�b�7��� � n��� � n��� � ���i���@y�b�� �� �Ы� Ԑx�[<ȥ{G�r�B.$�f<Ң<PzAu|��B xh�M5%� f�� �C\G��3����^Q�@P
�)�E bUJ�1UFb���t��&ޥ��UoH0����� ����� ���Ӂ�u��pk0p)�M�S�x
Б�����<�
I�+�X��S"�PtڭD���/�7�� PƗ�)<�ַ2�H`��kC��;���Rp�i`����r�ys���F�ŋ2W2�_x\W��l���j�må��O������m�_K���)�Ek+.h��T�ش��?+��i����������"��S��&�$gU0K|����Lz�V&�È��_<QW�����*@%���TB�
@���.U�}2�
b����*@	b��T��U�i�oP,`�Sb��&D픁�!�A��;%޻Q)�T^���*З�g����__�1hK��*��f��%�D֐q�� ��M.w�ڟ�!/U|�]�m*ܐJܐU�������T���O���T���V�{W����@�'�����T�S��J����W�ZU����q�
�~������'��J%ue��J����t�2���������Q��q̮������8J����LK<�J<����J�զ�Xp�d����.��Z��'v�Q��O̎���J���2FG%F�:c��6G%6�Q*����Xe�[��X�%��YY:�Kp7*q7���&�F%��J&��i��J������3����8��ר��XU�v�\���u&x=�4.��0s�����HƚT����_�֙M2d( .~���L��2 �3��M*	Th����UɠB��b�'�17����?T�:�l���/U�Ѥ�OL�U��K2M2����8*��`���/������� �H�!      �   �  x���O���GϫO g-����>%�s��9����lو�|��h�7��X�.����l�c7k~��C�\������<}���?���%���K~��?-��ڿy�u�o��u+�Gc��0�����;��3$-'�R�X$������)_e��Q��=�\� Ƙ?Y��!��,I��iY�#)W�(�P��o�X<�Ҿ��JI�H���]Ӥ��c�D\��syl�5bfG ��ß�oe�PLsR��Gb�����;�%�Pևw���ӏ��ǧ��~��O�����㏿�rxl�I5��.���?������ă�[�l� 9�5��kD-׊S|�Jm���o���5�й��#�Ρ���׏p�۴=D��#�΁���r���M�k�Eb��b��11;�#t���q����(����)���k������?Qyf�l�(3e;D=�p�{y����4������L� �_
�� �_�a������.$�ȅ��G�/����c`T�<�(6�q����EQK䢔e䢀e�q
8/�\pN�\p�@.֛����X����w�~/O���2*8V��9�wp�J8/�����a0��hE|�*.Zc�TJ$�F��Bw�&�a0�+�y��P�hK�a0�+�yG�	��H�̫��%�W#�K0�F��`^�4/������a^�4/��i^�y5Ҽ�j�y�:n�u,��Yǂ:n�u,��Yǂ:n�u,��Yǂ:n�u,��Y�+H�\A2�G�qF��:�(�Yn��#�-��zd�e�[�,��r[#˭`òFnX
�x���:^#��~�FޏY#)lpz[���Ja���C5�-No՘=��.��v���j��i������4�ᥱ�i�Ck��l��Z�F0{�����&���i��e�z�������4�٧��=�`6j#븱SY���F0{\�]���m�a��e{�4���mg�`��l�����F0�˶���m�o��l����.���F0{\���Wwc��f�+�<��nlP��qE���֍J#���H��뺱Ai��i���r�y��F0�r�u�D��Ai�+Z���E�1C���J#����:f.�ؠ4��G����J#�ߠ4��J#�ߠ4��J��2��Ai��F0�36(�`v>�X�e06(�`v>f�{A��}�����[�� ü�^�	0�ς��.�`fF�<?bf��N(f��c��Ï��ǧ��0ppYKd�1z����X��㲔D�ī�\\ Y�=Ȕ_I�I6r�$n>�[N�֓��$n��l�'�w��e4"rr�-"���c� H?�8�|ٽ���#6���0��i��!/�o����7]uñ���}��\��/���GU���8��.'-{�e�P���fW�BF_\��(�Wm/���4W?�8!�4r?�����+�!��4r:�̅��/��˹f?�8�r�
�r��7Ǆ�Cp����p�����&|����h�PƝ�ݵ4~h�m���idؘ��ـ�I�'������a��G͢�P1i��d���{�-���Hw���dИ�0�m���42�y��V�1�O6���Fn��3��YdD�T���zLA��L6�9�FFՉzG:�C��L6���FFՉ��=>��l�8���C�A�S��I%Զ�D�=;�r`����硋>��z����QY5T���h�RV7���������L�<��nt���xHY]V��1�¬ޢ�!aVow��p0�z&���:x����a2̪���p�h
2 ��qF�!��	6���z8Tv[��}=�H@��w؞�R��R)�d�Xj�|���v���Kf�ǲ�ad�l8Y�`6��)���E�{Nz�p��9�e�ʺg��/랗^6���^"��j��Hb��%��{�D���X6�l�^"��Z��Lg�`/��h�^2�т�DF#�`/��h�^�!lxق�DV#�=/e���`���%��7 C�lt����k�����{��F�����%s=�K&7z���n���鍴{� ��%#��zi��;3���>W�%�G{7-3ı[��l%�k���r���X&9�`+�X��d�c[� ���Q���e�c�b��^�˚����1�1����5t�9��d�c��d�V���V�~U��fe,{��&R)�?�N`��d�,�K&�)�/�H���%�)�{���,�^"�"K�����`/�9I�^�$���DrGR����H
��I�^"�#)�K$x${���`/���%r<"�^"�#���:\�*dy��}*͂tx�󈨍�/�{b"�3p���Tb",����g�L�����`CLQ�{x&V�j��d�ʬZ9����DIA�Gr�����j9���Y]-'ؐ2��%���e��L
">�U)'ؐ2�R�����]��ZIxZ}33�j&�uf��́;ވ,��HQ�K��7M3Qѣ>��L��J�Df���D��eѲ�7S�z.$�>R���R--8�n�ƹ���r���q m�,硱L-�I�s)C���6�;��.'�i��X���v�mw?���Ȧ�Z�wb��r�mwN'�ᥒv�o��ݔ=Q_��<�L���_Ǿ�/�<:6���a��z�!�����i��w�����?��#$J�5�|�d{ �  $J�����+bG�����͠��Lc�����"S����f��h�y�483���Qps	K���\�%�:30R	��L\Tb��g����(!։�C�G���l �#J���,��&ZA�G����ֱxFۮ�����Jx��|�b���P��n��񕁂��(��2,Tb�3dX��,̋c-G�Gz�����X��:�{D��n����/��V�!���砫6��%��!w�v�Qr�t�$DJ5I�|�B%�:�b1ͣDT'���(!Չ��<J@u�B�x�x�f����hh��S���;�x�l��%��J2u���Qr�3��T�v6<W*��2$T�����Q��0���Q�{��XW��Q��[�cG�ЎDݠ�p���Qr�w�iFv���U��JuSy♎W�A��a��P���+=�:Y��n��1�d%|zK��9��dOo�_��v� �������d%x�!g���jxs�c�B@'+��[t^<װ��j�k�E>'+��Mu����J�tf��P��n��>��߼y�P���      �   �  x���K��DE��*؀;T��eJ0`bf���:�l��ۄɋ�>-���+)�||���?~���ŏ��(����N��O�|�_��Z���>��������L�M���hݟ�	t=���rI�� ��	�H$�2Sw���B{���Z{�m���Z�i����T�l��%��k?e��E�;��M��#�2��vy�;�ۇ|l��5]�4���1,��x4b�w��8��;w�#W qo؉+�������h� B��wv�
 ��A+�0�)���,4ϒ��X@��] ��s�:MQgB���3�NSԙP�)�L��M�N���te���>.�ӕ}\0�+��`NW�q�����9C��s����iaθo�y�����Dc*���с.�H��P��#���&�0j��^�jV�]��8��*�>���<��x�m������? �v���%��py�v|<����|;a��k��C�팑P8�D��y_-�r<�[K;�l�2����񱙑;m;�����:|+��9h[��!f@]_p�x�+��|�������h��v���{�)n���ͯ��Y�����~����$������x�m�cݲ�C�}@��s�	,|+&����µ��v��ؚ�>��Ҏ�vDſ>z����������Zg!���t���B,��beC�g��X�ܘ����=�B,��:Ec�O���O��:BHZ��ܴun��]<.��*��ʛ��+���;Hc�O��W�D^՗W~�� �ݑ@*�������:�����vU1-1f�R�~�.��C��X�2��ix�d�0x�DRix�L��Ys��i��4\kM��Z�]�X>�I��Z�]À>J��Z�]ä>J��Z�]��>2J��Z�]��>RJ��Z�]�?RJ��Z�]�D?R�L{��׆�f��R*׆����R*׆����R*׆�&��R*׆�:�H)��kSu�PDJ�4\�O�����$�'�. �*�����,�Q������sSu��DZ�4���s�> �J���T�3��V*��z�H+��sK�7Ci��pm]����<�c%�o�"��'���)���-�9t�Z*��K�%;�^�N�9��Z*]@�Ρ��Ri-�z�H+�n�e�P	DZ�� -��b �J��Z�]C%`Ev���5�Vd�PX�]C%)��p�Ȯ���Ri�Vd�PX�]C7)%�h"�T�|K�g��~ N=2L{�q#-��5�MEO`&����쮠�e� P��mwO��'N�dQQ�ˢ�20�EEi`.ˆ��\E�j��e�P���f�;0������������������i��ݾ��1�K�e�e;-���^�����R���>�W]S�ׇ7	�]uM;��N���]u�DC���)��}{a��.l�4��M�a�]�4L�+C}`rec�L�l��ݕM| �baڻ�i5ǎoY;z�BP�]��l�;.�k��:>�Ȱ�^���n���������C���Y��2,����}\�E�k���o6u�Tk�/՚�9S�����5I-̺j%�!�U*�O%���'k�O渨���I(�W�!�U&�c�@<ì�K��S����V�YC�w��J*�PX�Wc��¬�DX�5��:*&E�������lhf9J ��5��� lt��Wc�����h��QS���۸�*���c�oS3�1��ygV.w��Zf9��6]�Y��ߦhF�vD;v��KĎc�o�Vn�0�9�łZsj���%�3�Z��p�b!�*���z3�Rk���rMN��>(�I{R�Y�m�~J|Q��_-P?��%w�P�*����R�ǩ�Ҟ��3�u�e�[�c�����~�n%��|?o���4��_l�V�I�_����/8��yKEm
n���K����6�YIv���ҎU{.�n�{�Rspw��=�9��~��ϴ����{/��8w������?�,R      �   8   x�3��CA��F�F(�FF&�ƺ
F�V&�V&�zf����\1z\\\ "      �   e   x���A
� ���]��q�Ct� �\T���;���sp�ÓS��ʅmY��������"v�"l�3W-�h��������{_��`T)u�@p��6c>�31�      �      x������ � �      �   P   x�+0426153��442�bc�⒢Ē��J0�-�����D��X��@��������L�������33�8���Ӕ+F��� �U�      �   �  x���=s�@�k�+\\�G�~�.��"M��i��0�p������]c�M��3�^��k�b
^�a�o�c���7D��ȺDU�_1U�T�޳%.U�����e�2
t87`�ݡ���V��횄�+��-�
�(e��(�\{��a���Vb�(��!�FN_����`\8;ȼ4����̋�#$�EC�#�;*6UR�_�ɻE�����(O���zP��w����+��`��}���hJh�]cJfVe��%�������	$�zح�8ik0�y&�D��ٗ0�8q &�]^��mt��q���G���潤�+��nt3s[I2��������vM7�r!)�@ap.���L�Z��q����ub�Y~\��%m��A��?��>,���i���j��V�(��omΏ�����q_�?�'��"�Q��~�QDN(�&do�DgItAb\���+�kVN�/^�EQ|P�      �   �  x����n�0�����6�v	�"BT��洠�I�#c���3��I*}+����

q�x쌣�v���u��C�(����A��>]�"���D��,�D� ���䬰�s�gc�{;�ȉW��F#�"��`�4G:�ɑ��-��d�n4��v�!����[�P!�<C��^��h*0E���H�.b
J�)�(zGWY���5J�����L��Ω�d��C������=�STk0�e�f�M��S������;j�ڣ������_x��d�{u�g���x�QS`��i�<G���q(p�������BK��u��.���=|���z�mкS��5�c����~0��Mw�Xo��&x�'$=�{���@N�05(x�+�����b��&�      �   \
  x��Z�r�F}> F���'KVR�ݵc��NU�/0IK�DH�E.��{fH$ �e@�@�����0&��R�o��yq�N���jm)7���%�%�E�?�quFg��%~�����&_���� W���K>��5��H��N�|M�k�.2�2!R��rwMY�n�ڧ6?��4�lIS�T1�:k�VRp6�m,!��l��`	�d�d&i�e��7^�U��[<�+��_%�TO�3k�} f�យ���R*���p{-�a� 59L�:Lx÷���;stQ�[���$%S ��`jp�T� o�Nk!��&j�3�0`�2���E�\-�������?U�휦���aX�7����A�(6e:���Cw$�8�	�I�: w�#���l:/�
X�<�pMO��r�V�1���ی�TSG�끑��
��\�}����'Le�f���YjBpm@j�+�����(�ho��M�d����C��x-jD&tʸ�TvF���x� �p�	^I5D-�(�l�i4dƠ/Xfx��cºx����R�G�4 "�1 Xk���)r\%�f
*�N���[��u[��hE���]i��b�>SG���eN����?���|����E�a!��-����� ������ů�Rz��t���:/�����/ɇO�֒�����K"ʍ�R���:)d*��K����C`U8��.ݢ���I�5F@=������}�� ���~>g˛�"/+�zs[L�	Y�C�˻�!��av�E&���!:B�sϏt�\*����\��"�>�^��[��O?R�mX?W@F��竛���=��U^��,��(ש��0_���;�wO��C^o`.4qO�zy7e�
�3*�UP)�/��eg+����a\L�d�L���T��x�	�.SF�_�03�!1����HY�� �����%]ƀ�;F�&��y������d��!���]슟�(�p|!,r?�-��߸BbRǁ�L�Lќ�p��� C��!]�P×�

�[��Y=k��X�klP"�|���P�V[x[?(�����-u�� z8�;���?>'��zJ��V�l#Uj�l3ʲc�8S�[v^�y�.���bY��������I>X/�MU8V�h��iA+A`�xWN��b���zc�c�<kWk!�	0���5�~'�^���)7��8��Y�����r+�	<�0��R��n����sS��um�*6b4(W� �5BJ��>!��l0�|+��~E����I��C־ |����.C"��XmѠNm��s:$C0��4ր9��!q���.��J��=�0�pOU���R;%8A�_p7�^��w)s�^�:h�\\�����R������p=C���w[j%N:�^��q����O�7�H�,�A�<��ɾ�5���Д��K�b���WD16�M��j��h�P�	]&(jT�h�U��f<T"��J�-�Ak0�T�dj�����:�'*+��*�A��I�ʒ���5�팁j�r]N���+�������W+%�K	��^F��-W�E��s�7�)�A��Q�AڊJ�ɔH�2������<6�T�`���Pˍ��Qa��xh�:�Ң��)�1ryA�_�S��R�K���o4������p��*X[�s��y����</o��	��P)y�[u�ƅK9�m��y#F1bK���#�6���:�v�:`>b��u猍N��4��+Ö�-�����������W�.kܽ�'�]h����Zi�]�� ��q��V�Ky��	�QX$O��҈?�e�L�GSV����'y��+���u��ʗ���J�ی�_��9��N!�6�TPM�3�Ǧ�M�n���P^��O'N�E>/BM���v�A�u�]�<ڼmv��#2����ǆ&CF)��s-huh?ԵOڷS2'^�=E׭Os�ׅ�y�y|�g73��4�,���|��}͏_�ښ��Nr{x�	��
�P6٭�P�=I�
T!p���\�=h�{}��-}�g*n\M�fn����}}��p_�s_������@�@P�i�J���]�J%!bQ�?����A��5{H�Q<���%?���C�$��J�E�R�b�9
���Dz�**����߮�������[�Cv�-�9�"xl����ɤ���g��;OG��#���l�g�?|ga��S&�l����=��v7��&�_�]��UH|�m������q�b�t&�]�K�f���l�<<���Ք��pqNQD���)�o�oV�E1Y<��@s��,��h�������a��fӯO��I/~I>D��&H���/��fV�(J���]�� �����3c�}b~�����+"��y��Aa]D� ����mUT���෪���}�tT�N���$�V���͌iޭv�Jx�{>��)cL�gwwyq3�::��0y�e��|J޷��zo��6S&��QGsz�e��C��������PUە��w�����#De�8��>�uRT���0N3�`i5�X�s�|��¦xx���O�Y��,)o7�+x�b��rD� �P$�T�q��hu=��  0d�����ۘ�H��8�rW�ڌڈ���Q�bb�vLSe,5��UA�K��ի�X���      �      x��}�rǑ���S�������%s7�O��Y{��8����)Y���Y������Lh�h��uvU��K��_�����������w7�?voz�)9� LX��~�?<�}������ �	tpx�����_���n�~��x�S�
�Z�K�!����@�������8>����ő�B��r�K"��8�<� ��}8���
��5b�ȅ�q ���o�a���1� ��D��w�)9�H\Q"r��8�2��	$_c�0%�UK �+�kLc)ţP`5�H���	Đ�.d����+��G�Q4��*��2�Pr=@���K��\#�!�%��9���5������&�$^��~��,q��̐J2�v1C.ǟ�+H�R�E��p�$����9����k�NBv)�=��1PP]c�����7���?��E��H19�2��p�IR���={��'m��_;q��8��i�Q?I�T���ً(A��Q�Hׁ��٤t&�
i����Nq��q��p*N�bj_Y)�d�'_�%s.s
�r���s�Ԁ��A�el�R��"NG���s��q� {P�1��&J�](�獗�P>��r�lv2d���w)̆	����0ձ(ǂz�#����y���C@�N���W�'<8ͯ��Cn���b��܊=0ǽ�)0y�W��q�b
�Q�!a���*�u���#琥��Ab
�{�����q(���70�޸�u�N$G���f��23�8`v�qs�x���c��ةn��A9;��r.+J��qL�jyO��L��(�D�C��E3�*K��Isۣ(���]VG7Ji#K(���)4̶=Q�u� �'�γm�d�"Vł�= 59���G�xJ�	n�4��\wE͸��l�3Q�b�����&���d�]���4��A�t��_��ь�Z�[)���W\Z)�d��K`G��+�X�+��a
ɓ�ь�ZNp�5�����(���d��ƹ��\�V���Tg��.u�$��g�V�'�K�F���Q�v.��w<��KV�%]��!W�?�VKV�%_���G��LgӴ��7X��`qX�8��L���BHEI'86	(�u�;^�Gh���#Y��~P�$�XE��z�zRY�I*��Du�	CrX��$�գ� �5�u��4;�5e����\�'5IeU�d(��Ê��A��;�,�f����D==���X���&QO��Ƨ�$8�4?Ꙥ�L�v.!y
�I*�G���їMRY�Jp��B
�s9��L�=�2uY�O�-7�=�,IS�Q��AϤˣ�:A
f�&�d0�4p�$�s����d��]9��$�(5��,�7>��?�X�k�.k9�I��Y��ѡ���t۴cY�C�@O�A�mx&�b.0&O�472<�R�#c��4���(s�ȓ�(�,O��2{P6
z�=9Dr8���驕�Ĺx�Q�I��GY��H3^�=Y��k��Kq��Jۓ-ݦ(!���MJ==�����i�/Mz�*J�
��?l�p�5y��o:q~�g�0�^�����&Ƨ��|,١� �/�L����k�,�7?S�)�C�=�R�n�`�5c'
ӓ΂Ф��Ì����1��|*L�]�%y<vMj>ٲ���,�3]�����		=�֡��0Kfp�the���zT���"�VV�:-'������BfΪj\0����0�CP1�`6���0i��B{��s6�B��M�z���fpe�
�j��������QR�g��I#��,��Lœvl���a�9c����4Ӥ	������Tb����Z���Lѣ5��2�Fw�]����l�f-��A�(�"�K�go@�p���A�Cg
XC���
����-�a��wV����V�3�h�=Q:�a;m��̣��=L�k��x�i�j$D������=~��͇����ń���/�_��&��7��&U�����y��͇w7�?}��������W��?��3n)�+� ��(�<3�@����'x���e�s�T��h��>ݞ�~n�|��p�3�'ɜ�j�%�-�#�"��^GE����H1�/��}��n�O=���>ũ���y�f��_���,�*�v'�NP%�J;U���r{(����`�:�6.�A���l���M�L�H��&϶�ӥi-�Xģ}���%��F�US�r\�B��<��M�`��àZב�M��Rr���Y�b���+��v~�3RV�����^Qr�-����M<E4�z<�����2 MQ�K"+0Tʌ�اW���>牂~�|?3@P1x�(\-K�v��r���ܾԡ�g�1�2U/�_�Ҍ4p[@J�4耄3k���K��]ƲDFKE1tU��֡YH���*�m� -�a�1&�T��Ⓔ�~�P+���:=��3�ì�p�.'KjQ�b=�D,��r�	����兞�A!��~��0�2N=�C��\�8r1V6��|5����l���y2k�)�+K�S*����n�YF�Ԯ`���3,,"g轇���R��Ğpa��d�;������u��h�q�Į�1�D����Q���K�_4SA�Di����gq=c}6�&^p �ci�٥�c:��f�]~U�n���9�u\�Ma�����M���	]Y�X�	�+\:WuZ�l��Y<���zp����%$Ϡ�Q��:\�Vz_��=|	���t�p%h���+�V��*\�t�XR �������2t��GW�����!�+Ò�l��=�q�V���l�+��|S:;��g�ܕ�ދK,b��Z�R�L��L���zka| ��#�ElX�|��If@��=dh���!�"�5%��`3dk�H]	�E���W-��{�]r+�y�0�tA�tWKc޳�r�2���N�(r��˱��-v�D��~���BJ�X#&'�*���L�ms���ڄ���CzI\�����*�)��
�m�q��x,C���;B�>Bd���!e=�u�����EӼpEI������P���8-�]I�"���w�]Y�2?��(O��9�˗-󣯉����ͮy��o��i��{��t*ײ�({Vw��+['[�������:l**1�'�ƀ��m�@C���1���g��I��s�1�7M�YD9W�|�4Q��Ti@Iѡ�0�J�"�b�b�)�ah��\W���0�7M�YSB�N��4+���p�-�K��r��5�r]|��8*[���~Oq ��b�X��]��+���jZ��)oMϸHum���N� m3.69:�<r��Vf�`rR"Ob��3��+(.��窦e�E*��$��5k��6���sO��W��Ooa��A�$���4Y]�d�(g�(�.�إ��aS�̈́Y:�R\�*��J��+)#�5 ��J�61��6.a�dp�O��kX
�K���U���e�\K�I��Ŗ�uX(yxZ�	����b;x:�!����"��L)'ocr5�7c���t)�V�(����V��+�M�\�H�c�K����a��l��/��׭�l�,�i�Dj|��4Z'�j21���.ڀ�X�Е���5�1�5of�=�4���g�t .���&89�R,A�Xe���Ҙ�J�Q8���"	�y�k�Kv��2R�Ѫ�B
��=�n2��0����!��M��Q:���Xu,z�A�'�hS�ߞ[��1=��N��� �e3����I�Ք���Z�hI���Yq�ˋV:
�xX^P�=��E�$0�EwqZ�!�($l~��	��S�.@I>��h��abЀ�������`p5�lS5��kĝr�%����Ɯ���:�-
\�af�������Uiz�PlQ��aJ��������<�Y<�Y[�f��br�1��6hJ�p]�V6(���$�`��PS����,b+TY�-�J��V6�V�w!BvE��05@�Q����O0���6 z`��A=L���s�S+#���L��K!�vF�`�\��U$��).%�+͔�Y!��K!�vV��te�S;+��S�\�~��"�$Qr���v    V��d��G�M���mQ� ������P��%��Aʋ4�ϩ-���z!�]�)�nL �J������9d�@>����h��,f�8x�y�v�ِ�;P%�ǞѢ=d�}<,�[���\�e\�5p��ز���T�y`�vd�Op�#��!ǲ����hX-�:��`��.�4�F��(���M���-��Rv�ܖ��hT��m�{�sai��>�U�Fb���}�=\�dE��<h[��h�K�O�-���z$WQ�4����-�(.�åФTe�!3�D&���D�Tc��s�(��`��+��x�B��u�+��}reQhٽ��Uw6q��^ܖT�\�6^ģ�(,�Ak�t��!9�D�/�JW���ӮFa���yҍ�̫K������V)����f�o�̈���5�uN(�T��-�F�nT3%3{zZ�t-�td�mZ6�F���mmӲ98�G��Ѻ�ڦU����ؑL hmӲ����\O?	Ak�V���@�	Z۴:@�Ѹp��M��TE �a��F-�s8���N�ڨ���K)�t[�lm2L\a:��j�Oa{�f=ڐ\�	�5�.d�,=pی+�bA(Eϔ���p�O�.'��8S1�+��WƜQ�
Y�*#�F^h��y�]�\�<C�D�I
{����Ny�ht� Y:(Ŷ�9 7���q��%���-C�1�4`02p�̞�;�aƼ�`���P�x�j�)\I]q��2����u=���_C�8LC�7Ga�t��g��f��rB�]�\�aF�3�b�"�|f���dˊ�xo��,-p��VszH6��,-��`ղ"	<:���,`rG��ʃ��Βg�T������Β�����p�������2�C�@<?�(O�y-ʞ&��(^��\\o;E*����	�j���K#i`�z�q ��3Ik�ũ�TDvU���1��5��w<X�g��8F�钴e���o�1�˽���-N5LI��U����';��x>����"V�F��*��V6J�
pd{k=.Tle�'�Q���|ۦ {�u�jQo��xۦ ��!u#��q�q��RF[����VM��<�dۻE�'�K0h���"{F�y0�6'h[� '���-�\!��5��+�T��8	l��3D����'�FZ�3XC����'��%���H��|©z��J����-N�	\�W)5(d=�N
&��Z2�!�ö�d��f��֯�U_�mdp`S��ԤF���J]�6!X�Q8t�\�積m�q���c�!����8U�`D�%�ܓ�veI�,`�3G�.Qn�'�� z�%z�	)7�8՞ft��Sc�t��*��_�Jk,þ1����+�� �k��1����!e��"��l)�n@N�Q�6����d��\����no�}��p�����x���q�1���O3Q�.W�6{�h�O}���TT�M�n�$u9gq́�h�!l�*�Ӱ�=/�b_�d�50U갌��w0�<��z�dΜ~z"c+2�1@�ʦ�S��@V����3\Z��T�R{�r�z:�8�M���@�YO�}��6���,��vdY�2�l�;�2;�=�������/B�����,��C� ��:	�1z���I]��
Ԓ}��m��B�ZcҀ$zh�Y��/����Um� ��-�v��	.w�HAG���Ȇ��ҕPKa�=id�7�xѦN���G=Ckc��9't)h[k�B�U�I�'�жָ�\w����mK�O�cg�E��Ê�]�o�ͳ���;+�vy�N-�k]cSW�ꍳ�k��Ʀ6���
%OS%c�ƚ2Y)B�����u�7@Ʈd����`�� )Q��0^��3�uEM�42M�}������Ȗ뗨����������S�=�ۿ�j�y��on?�=>>�?��?~�p������G����O�w�Ǐwwn��m�x�x��?�����X���J�1$O��9��>
^�� �ދ������K�l0�0f�S���j���H���y���K��������w���r�����v�=��^�g�W87��g"m�.:/��p�KU#vr�h�2J�5���ʧ����)�%�PM��w}���H�j�go��i��ɀ� c�rj�a�if�d�ҾN��cD{�zdNU}h)�d��ə���\��.?�Sk
��o���Åԝ�`�K�o��|�}�+ȹy�w2��/z�(��H�xX˘Ͽ�G-G����v�y���������Pǳ��M�&&�f��<M���ߍSa��9u3�j���zټ�� S�d��בf8���M��T��P'�֙�S�E�NE/mr��%NE��gNE�/#�p*�r����#�KI8�
.!�p*�V�-��.)�?<_N8*��ƭ!�s� �͛���׹�Ї��z�?k�G4�R��]�z������=L�]l��b	�	3N8ۉ���߉3��֙S��<�r(� �9���L J�1"}�K�S�=��;N���$��p�vq�4��B��i��
�$$94 �!���4��ډ��i0����i�����i��m�:�"�ZN�S�!M��NcUӠ7k7��,��ej�:24�S��E�ǹ1ȳ��+1��k�u���^��:<�D��)!�k£��o�w~�ѡ��I,�!��R.��U�X�B��I6���������n&]�t�Rɱ �f%���g��������?�y	��=�b��nL\<��i-ԛgĳϏ:���pq���|a���l�m=d�I<���g��b���"������G[������q�\�G��x����Gq�Ð=�8��CD*�d���� ��=��2{��A|��~=������m����ű�{<��_E��Xv��x�.{������S���s寉e&OyF0MF�����b�F�p�`�p��K�(N5yM�@޳�@�,�z�昬�j��BN�G�~�[�Qs�A�kZ�7�����r@��@����>�t����@�}r��yB� �.�_������B!��y������ύ��Q����̳�QH�B=~+V,��H2?Ɓ5nnk)�vJ��%DL�،J����Ҳ��~���˔��K2�ŀ��$�ڤ%49�(�<cfW�B�!V�;'b��! m���M�J��j�3�5G��cc ��Nn
��yAسQ����3B�=����2ɨ>��L�x�{vO���Y�Z���ː�͕u!�H=��e�Z,�҈�uB��cڤ�������!���g��B��\�lv<&,���4����t�b*+)p��q�3x�E��^E��=ABO���B�q�����H]��\�eT�Ŗ�����(>Y�2�D����KpU��,�B6.j[*��u���3oc�7��ջ�X�I�. :w��x�Z�"�X5@�����8���hZx�J\�2�= �j��}�a�+�h�ɑ=��$^B�XQ�t�%��T/�0��e��]%�x	!#\����Q��J*��0�����]z�2c?h�{]6&^�a4Ъ�b��:�e�2�|��� {��%-ҋ��6�4Z�W���+	.��+h;j
��$lը4	���h&��3��-g.%/�⹞�=����NÙN�N\.ejt
�֘��ZN�NB|9��ӱS��I�����`��oLwAO�.o�x�s��/��4�/���<�|�$��X���?7y���œ�7�{7�e�EOE�|�b�u8�V �����|!���#/3�_�4�:Uh�^c(�SQ�!�{�tT���X߼l.���J�6g�	�dG&7�]��f�%`�&�s��*�6�_g���d�|hKǯ!t�=�qx鿞�IN���Z�V�ZFOĸ����_��ߛ%��S6���w7��}������?�<|�}����N^j�!���o��n-o����?�x�����w�=	J�jW�+���ɮbB��d�1)��≳���o{N	����L�(�4K@g�i�+�h L�J(��#�]	r�kJ�/._g:�gT�\G������߷�xu�a��Z�l��>	W��2�O�̒�YN    �^Q��C�e���$*��;�_Ru�F.��$)z����3b�O���h����=�kSHԕ<q�,�!C����џ`o�6��c�p�����e�薉�i�w����'�����������������n~<��"J$�Z�`ͼ.��U(�>pI�<#�x����o~���e���0#8�>t$vdc+ހQ@c%�㔄rTC�4��M�l���#ѿ~���`��Ն���'{iL���Q��2��?C�����q�`���gD�,k�b�~<�E; ��O�3t�>&���t��˧�={�݆�*���Yi� g�jEU%�t�?VϿ����n���?Xl�
���ύ����3�㝽��p��O�p��_�n���������ah��yR��>��z���٪*$9-�g$)�U<Y�[�F�!ga���7��=������«�m�g\$0���j��uX7����)���-���/�Lj�y�J��h���3�S=o�m����)?�RŲ��PO4�_�A�yEQ�~��5D�t
ʾ�kbo��Σ����.n���!���'��P���4��m�UUw�x��`�yV��R��ܗ@dO��0#3mȐCJ�Co�Xv%���g��{��N>1���<P���TU=������g�������E��k�K�$�|M�	KZ�Q^���h	y��.�����J�tU�U{�+���6Ib�i\W���!(z$�bI8�\�Y{�T�2�8��dw=b�Y�pL(|ABIFdh��oXQ([�5�v9�ɶ�B�ҩ��)<C;�$P��`{���|>������{c;1��Y�b�Cs���$3�)���o�'����OOƖEOs�DI6x�+��L�$�6C�F*z�L);�$��ԧ�Д:L�XF=^�I�BA邔@2��-��Y�]�PN��PF�X��t���l��(XW*��NU\���"��\7�hy����,�
�)��e���������opCe;���mY�i�L�A�k�����y���K������+�Ї�D`�n��v��,�_�G��C��(�5]b�6y�iB��� �kDQ#9u��ILXi&!�֎�����db[�:��_6ؐ|�]j�4k�_��˫T�ֿ��H0���j��s��I��QN��]!�������C���Y@/�DlS����G�4��@A�[���
�m9G�0�5̿3�`qpϓԚƎb�V����`t�C��ǂ'���Qܼ��)~ns�L.��ZB�6�KD��4�#h�����5;���	��e�<a
۞Z03��lf�1((΃"�4�0x��6l��w��]�Ό���t�8���SG��j���OKzD?�_�	}ݯ�z��	IՓ�!�X{:������{�����_�����Ȗfl������|�#9�C��W��<�`OWr2:�'iɅK����u�V	)���--��j��SG�z��{_�B:��s�Dus>��|�/�? �ՙK�����/��Zi�����������JK,O���^���k+L��+;cJ!��P�-�K�C�O�^��� L��hX�x�Eh���q�#~ii]��wHZd�a9�9�֥�x��-|�HO�)��:���;vA�V�OZ����tX�Q�OZ���Y⼔3j��{���t�\bڃ��\v\�j�L^;�/��'�X������$+|���@h���Eu ;��"�V�g_VI��A4��.e��:ӏ����z�ìڇD�СШ)[B"�8��9�r`�2�mDzC(dƸ;G?�L��7�'$(��`E�.2$}_k�!�З�a��x��xקពQ@?4|p��s�&=!:��l����rF��l�f��m�z<R�UyAB-=�0d�d��$�+�p$�a����8��_@	�$2
����m�?�^��s'!d�J�u����o�h����*'S�����)�E!=;�����}�Қ׫�Ddd�p�{�|�+�/,�Fa�oP\��M��m�{�+ؕ��,����2�%?ϴ�PȨa��܎B*CS�'sp*�ʉd�N����5yB�ӑp�J(AF��P��0|[J-��i�*�(��B!�V�Rl]sf�?�V��p\�o�Ca��ƌ)9��q��=-�N7@���E�����!��\{�bP��0XSfGQJ9�.���+����,�ӏ�C|=Ul�B� �U��ן'�C�O��Hٺ�2�=f��/�$���&��P�hS<��,c��K�G��46�:`�k,��#�i��[��w��T���ׄ�|6c�p�<Q8�O�t�h���ON�S'693~�޴s���j����1�zy���	;������8���OP��J=�#7�{����$[�OO���@] &拲,Mw�(y�s�R8@�;W
���)�N[������5�8�}7��kH99��g�.�R��`}������X��|r��5�H���<_+~ .�c��~�l������֗��`W�_
d���ܿ���{�v�C89��FB��_��}0aS>���9
s��A�����7��]��a&��J�����xh}J�g*�Q���&�Б����39A�"zv�0��1��LN��H� 1�C�y�4��%�#=�I��g��E��b��s�?�����Y���w�qծ�bG����:�L��U`ۍa	��N�(��g]������O�?�}x����Շ���͏Woo޽��x��@pw"�b�c26��]u��"�����d�����|=�:*��h9�'���'P�|��s��j�>�/��H��	��%��ݽ>�ġ�)�����}���#��$��Ӡ&kV�>I<��zZ�����9,j�9��e�vR{d�N������:�%���}�-����-s�?=�jh�nߊ�����?��b�1��Z����ǻW������@%��T���
��͟�;�'��d����f��'[ٗx�B�uJ ��9��������#�'�}.gĸ��z"|�'L�hTXJ�t~�Wv
���lT�r�9�_�y�[s־
�	Q7��",+��*��t�#��t
���%���3���}#3��Ϲ��oF*[�&��?�(g�_W1|��������r����������K����*�ĸ�#��']K2��@$?c�TFڔ�|���k��/%un͜�ރ6�pރơ���It��Zzm�Ѓ��-KQ����	)ySǙ���V\�;D��ٜ�3�ypI�ޤE;��j�_�9�0�<��l���U$V��]�`��&ŁGd���h�o��*�9�o<�t��y,�����P�|�B�(�:��ʒ��� YJ��Z�VA�� ��3�7,�tJ�-0B��OW(�!1w�����B�g��y�KԜ���uŰ���V��V�Ӄ'Gʌ�A�x�PĨ��oI4^�.8O�;���E 9�*Xh�5tAA�2�#6h��0|�����[�5T*�bN����SjW��Ʈ�ZO��RDяE�Hc�	��'��*
���{>\�o�c(0�ݞ ��je��#@���^�d����*��1Y���f�k��,�R��E�^�|�l�߲����4���y���'�p���<6n��QZ�������i(6����. iB��e��3��Ťos4���o����>ʇ�H/g��c�����H ��W�����ǟ���9��r�Ws�IR��ʚ(��(�#�|�_�厴�H��s�qe¸<�]�p꓌��e	�t^��tj�q��L;��I$�;���͔�+u�[�v���ک�����AQ_�F�� u��m�,��D`�����y~�*v�c�2���T�+���O������x�,f;O�ґq��N�T��1�	�W�\�#.�Oİ>���~M��O�Z�"yǹ�	��>�ȫh/ߑ�.�/*���u�$��+=���o�}��[�h�^�!��j��V6ޠ-�Ø�^9O�y�C[�A�A�̻���'�s�wRK������F��:B���tK���I�����~����[�D���N����� �  ����'������b���H��}�p����v�����J����f��9r
^:�SL�г�j:������q���*=Gn����0xj��yp��<�K�i�WPz8Ax�	?^|�>Z�>��S%S֗�^��HAG��o�w�%�ƢU,i�V��2N�[��&�pi���m��DPxQ��Uj��ٖ�o��\�QY�N*�<Z/E!��얦o�ĥ�OP��dNFN;ׅBui��8@ȣ=���!���o���;��?��S��ī\�pr�N����_��>|��FO�w7�i�����'d�N��=�*���܁�a��?�#��%��������G����d����n~�����͇S<t�ֱ?���}��~�L�n�e5��������� �*������?��n��@�+�'[j��a����������|���W?~��0��2AU�ܐu?9�쾔�>�z��+�h"�J�lhvs��7�����R�G|�Um~��7�[ˢ���nW�ru~�$�{���ޑ��]Y���LkV�&S�B�ȅ�uH����S_K����ŖY2豻 U��|��E�灍��j�9š%� �I��J�Q��W����K�$��j��Y����O�����k�z�����*�
��9��rR���Q��;*�2�/���Z��_��8��K���=KŘ,�M.� �|E{���ᇭ�e�3�L/�*�Sl��;�PzV�����n��Ї����ڿ�@��}��W��
٩     