PGDMP     2    $        
        |            terion_billing %   12.18 (Ubuntu 12.18-0ubuntu0.20.04.1) %   12.18 (Ubuntu 12.18-0ubuntu0.20.04.1) q    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    18768    terion_billing    DATABASE     t   CREATE DATABASE terion_billing WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_IN' LC_CTYPE = 'en_IN';
    DROP DATABASE terion_billing;
                postgres    false            �            1255    19006    accesscontrol_log_trigger()    FUNCTION     �  CREATE FUNCTION public.accesscontrol_log_trigger() RETURNS trigger
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
       public          postgres    false            �            1255    19011    credentials_log_trigger()    FUNCTION     M  CREATE FUNCTION public.credentials_log_trigger() RETURNS trigger
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
       public          postgres    false            �            1255    19245    invoice_log_trigger()    FUNCTION     B  CREATE FUNCTION public.invoice_log_trigger() RETURNS trigger
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
       public          postgres    false            �            1255    19256    products_log_trigger()    FUNCTION     �  CREATE FUNCTION public.products_log_trigger() RETURNS trigger
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
       public          postgres    false            �            1255    19258    user_log_trigger()    FUNCTION     Z
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
       public          postgres    false            �            1259    18785    accesscontrol_log    TABLE     �  CREATE TABLE public.accesscontrol_log (
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
       public         heap    postgres    false            �            1259    18777    accesscontroll    TABLE     �  CREATE TABLE public.accesscontroll (
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
       public         heap    postgres    false            �            1259    18783    accesscontroll_rno_seq    SEQUENCE     �   ALTER TABLE public.accesscontroll ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.accesscontroll_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    202            �            1259    18791    accesscontroltrigger_rno_seq    SEQUENCE     �   ALTER TABLE public.accesscontrol_log ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.accesscontroltrigger_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    204            �            1259    18793    credentials    TABLE       CREATE TABLE public.credentials (
    rno integer NOT NULL,
    userid character varying(20),
    username character varying,
    password character varying,
    lastupdatedby character varying,
    last_updated_on timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.credentials;
       public         heap    postgres    false            �            1259    18801    credentials_log    TABLE     5  CREATE TABLE public.credentials_log (
    rno integer NOT NULL,
    userid character varying(20),
    username character varying,
    password character varying,
    lastupdatedby character varying,
    operation character varying,
    last_updated_on timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
 #   DROP TABLE public.credentials_log;
       public         heap    postgres    false            �            1259    18799    credentials_rno_seq    SEQUENCE     �   ALTER TABLE public.credentials ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.credentials_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    206            �            1259    18807    credentialstrigger_rno_seq    SEQUENCE     �   ALTER TABLE public.credentials_log ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.credentialstrigger_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    208            �            1259    18809    district    TABLE     �   CREATE TABLE public.district (
    rno integer NOT NULL,
    stateid character varying(6),
    districtid character varying(6),
    districtcode character varying(6),
    districtname character varying(50)
);
    DROP TABLE public.district;
       public         heap    postgres    false            �            1259    18812    district_rno_seq    SEQUENCE     �   ALTER TABLE public.district ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.district_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    210            �            1259    18819    feedback    TABLE     �   CREATE TABLE public.feedback (
    rno integer NOT NULL,
    userid character varying,
    feedback character varying,
    last_updated_by character varying(90),
    last_updated_on timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.feedback;
       public         heap    postgres    false            �            1259    18825    feedback_rno_seq    SEQUENCE     �   ALTER TABLE public.feedback ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.feedback_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    212            �            1259    18827    invoice    TABLE     `  CREATE TABLE public.invoice (
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
       public         heap    postgres    false            �            1259    18834    invoice_id_seq    SEQUENCE     y   CREATE SEQUENCE public.invoice_id_seq
    START WITH 1000
    INCREMENT BY 1
    MINVALUE 0
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.invoice_id_seq;
       public          postgres    false    214            �           0    0    invoice_id_seq    SEQUENCE OWNED BY     H   ALTER SEQUENCE public.invoice_id_seq OWNED BY public.invoice.invoiceid;
          public          postgres    false    215            �            1259    18854    invoice_log    TABLE     �  CREATE TABLE public.invoice_log (
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
       public         heap    postgres    false            �            1259    18836    invoice_rno_seq    SEQUENCE     �   ALTER TABLE public.invoice ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.invoice_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    214            �            1259    18838    invoiceitem    TABLE     r  CREATE TABLE public.invoiceitem (
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
       public         heap    postgres    false            �            1259    18844    invoiceitem_rno_seq    SEQUENCE     �   ALTER TABLE public.invoiceitem ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.invoiceitem_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    217            �            1259    18846    invoiceslip    TABLE        CREATE TABLE public.invoiceslip (
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
       public         heap    postgres    false            �            1259    18852    invoiceslip_rno_seq    SEQUENCE     �   ALTER TABLE public.invoiceslip ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.invoiceslip_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    219            �            1259    18860    invoicetrigger_rno_seq    SEQUENCE     �   ALTER TABLE public.invoice_log ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.invoicetrigger_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    221            �            1259    18862    position    TABLE     �   CREATE TABLE public."position" (
    rno integer NOT NULL,
    positionid character varying,
    "position" character varying,
    lastupdatedby character varying,
    last_updated_on timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public."position";
       public         heap    postgres    false            �            1259    18868    position_rno_seq    SEQUENCE     �   ALTER TABLE public."position" ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.position_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    223            �            1259    18878 	   previlage    TABLE     �   CREATE TABLE public.previlage (
    rno integer NOT NULL,
    previlageid character varying,
    previlage character varying,
    lastupdatedby character varying,
    last_updated_on timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.previlage;
       public         heap    postgres    false            �            1259    18884    previlage_rno_seq    SEQUENCE     �   ALTER TABLE public.previlage ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.previlage_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    225            �            1259    19247    product_log    TABLE       CREATE TABLE public.product_log (
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
       public         heap    postgres    false            �            1259    19272    product_log_rno_seq    SEQUENCE     �   CREATE SEQUENCE public.product_log_rno_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.product_log_rno_seq;
       public          postgres    false    236            �           0    0    product_log_rno_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.product_log_rno_seq OWNED BY public.product_log.rno;
          public          postgres    false    237            �            1259    18894    products    TABLE     �  CREATE TABLE public.products (
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
       public         heap    postgres    false            �            1259    18900    products_rno_seq    SEQUENCE     �   ALTER TABLE public.products ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.products_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    227            �            1259    18902    state    TABLE     �   CREATE TABLE public.state (
    rno integer NOT NULL,
    stateid character varying,
    statecode character varying,
    statename character varying,
    lastupdatedby character varying,
    updatedon character varying
);
    DROP TABLE public.state;
       public         heap    postgres    false            �            1259    18908    state_rno_seq    SEQUENCE     �   ALTER TABLE public.state ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.state_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    229            �            1259    18918    user    TABLE     D  CREATE TABLE public."user" (
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
       public         heap    postgres    false            �            1259    18929    user_log    TABLE     c  CREATE TABLE public.user_log (
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
       public         heap    postgres    false            �            1259    18925    user_rno_seq    SEQUENCE     �   ALTER TABLE public."user" ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.user_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    231            �            1259    18927    user_user_id_seq    SEQUENCE     |   CREATE SEQUENCE public.user_user_id_seq
    START WITH 1000
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.user_user_id_seq;
       public          postgres    false    231            �           0    0    user_user_id_seq    SEQUENCE OWNED BY     F   ALTER SEQUENCE public.user_user_id_seq OWNED BY public."user".userid;
          public          postgres    false    233            �            1259    18935    usertrigger_rno_seq    SEQUENCE     �   ALTER TABLE public.user_log ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.usertrigger_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    234            �           2604    18937    invoice invoiceid    DEFAULT     �   ALTER TABLE ONLY public.invoice ALTER COLUMN invoiceid SET DEFAULT ('INVOICE'::text || nextval('public.invoice_id_seq'::regclass));
 @   ALTER TABLE public.invoice ALTER COLUMN invoiceid DROP DEFAULT;
       public          postgres    false    215    214            �           2604    19274    product_log rno    DEFAULT     r   ALTER TABLE ONLY public.product_log ALTER COLUMN rno SET DEFAULT nextval('public.product_log_rno_seq'::regclass);
 >   ALTER TABLE public.product_log ALTER COLUMN rno DROP DEFAULT;
       public          postgres    false    237    236            �           2604    18938    user userid    DEFAULT     |   ALTER TABLE ONLY public."user" ALTER COLUMN userid SET DEFAULT ('U'::text || nextval('public.user_user_id_seq'::regclass));
 <   ALTER TABLE public."user" ALTER COLUMN userid DROP DEFAULT;
       public          postgres    false    233    231            �          0    18785    accesscontrol_log 
   TABLE DATA           �   COPY public.accesscontrol_log (rno, distributer, product, invoicegenerator, userid, customer, staff, operation, invoicepayslip, d_staff, last_updated_on, last_updated_by) FROM stdin;
    public          postgres    false    204   R�       �          0    18777    accesscontroll 
   TABLE DATA           �   COPY public.accesscontroll (rno, distributer, product, invoicegenerator, userid, customer, staff, invoicepayslip, d_staff, last_updated_on, last_updated_by) FROM stdin;
    public          postgres    false    202   \�       �          0    18793    credentials 
   TABLE DATA           f   COPY public.credentials (rno, userid, username, password, lastupdatedby, last_updated_on) FROM stdin;
    public          postgres    false    206   ��       �          0    18801    credentials_log 
   TABLE DATA           u   COPY public.credentials_log (rno, userid, username, password, lastupdatedby, operation, last_updated_on) FROM stdin;
    public          postgres    false    208   w�       �          0    18809    district 
   TABLE DATA           X   COPY public.district (rno, stateid, districtid, districtcode, districtname) FROM stdin;
    public          postgres    false    210   ��       �          0    18819    feedback 
   TABLE DATA           [   COPY public.feedback (rno, userid, feedback, last_updated_by, last_updated_on) FROM stdin;
    public          postgres    false    212   �       �          0    18827    invoice 
   TABLE DATA           �   COPY public.invoice (rno, invoiceid, senderid, receiverid, invoicedate, sendernotes, subtotal, discount, total, invoicestatus, lastupdatedby, senderstatus, date, reciverstatus, transactionid, last_updated_on) FROM stdin;
    public          postgres    false    214   ��       �          0    18854    invoice_log 
   TABLE DATA           �   COPY public.invoice_log (rno, invoiceid, senderid, receiverid, invoicedate, sendernotes, subtotal, discount, total, invoicestatus, operation, last_updated_by, last_updated_on) FROM stdin;
    public          postgres    false    221   a�       �          0    18838    invoiceitem 
   TABLE DATA           �   COPY public.invoiceitem (rno, invoiceid, productid, quantity, cost, discountperitem, lastupdatedby, hsncode, last_updated_on) FROM stdin;
    public          postgres    false    217   ��       �          0    18846    invoiceslip 
   TABLE DATA           �   COPY public.invoiceslip (rno, invoiceid, senderid, receiverid, invoicedate, hsncode, productid, quantity, discount, originalprice, afterdiscount, totalprice, lastupdatedby, last_updated_on) FROM stdin;
    public          postgres    false    219   ��       �          0    18862    position 
   TABLE DATA           a   COPY public."position" (rno, positionid, "position", lastupdatedby, last_updated_on) FROM stdin;
    public          postgres    false    223   �       �          0    18878 	   previlage 
   TABLE DATA           `   COPY public.previlage (rno, previlageid, previlage, lastupdatedby, last_updated_on) FROM stdin;
    public          postgres    false    225   ��       �          0    19247    product_log 
   TABLE DATA           �   COPY public.product_log (productid, quantity, priceperitem, last_updated_by, productname, belongsto, status, batchno, cgst, sgst, last_updated_on, operation, rno) FROM stdin;
    public          postgres    false    236   ��       �          0    18894    products 
   TABLE DATA           �   COPY public.products (rno, productid, quantity, priceperitem, last_updated_by, productname, belongsto, status, batchno, cgst, sgst, last_updated_on) FROM stdin;
    public          postgres    false    227   ��       �          0    18902    state 
   TABLE DATA           ]   COPY public.state (rno, stateid, statecode, statename, lastupdatedby, updatedon) FROM stdin;
    public          postgres    false    229   ��       �          0    18918    user 
   TABLE DATA           b  COPY public."user" (rno, userid, email, phno, aadhar, pan, positionid, adminid, updatedby, status, userprofile, pstreetname, pdistrictid, pstateid, ppostalcode, cstreetname, cdistrictid, cstateid, cpostalcode, updatedon, organizationname, gstnno, bussinesstype, fname, lname, upiid, bankname, bankaccno, passbookimg, accholdername, ifsccode) FROM stdin;
    public          postgres    false    231   6�       �          0    18929    user_log 
   TABLE DATA           ~  COPY public.user_log (rno, userid, email, phno, aadhar, pan, positionid, adminid, updatedon, updatedby, status, userprofile, pstreetname, pdistrictid, pstateid, ppostalcode, cstreetname, cdistrictid, cstateid, cpostalcode, operation, last_update_on, organizationname, gstno, bussinesstype, fname, lname, upiid, bankname, bankaccno, passbookimg, accholdername, ifsccode) FROM stdin;
    public          postgres    false    234   �       �           0    0    accesscontroll_rno_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.accesscontroll_rno_seq', 89, true);
          public          postgres    false    203            �           0    0    accesscontroltrigger_rno_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.accesscontroltrigger_rno_seq', 223, true);
          public          postgres    false    205            �           0    0    credentials_rno_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.credentials_rno_seq', 104, true);
          public          postgres    false    207            �           0    0    credentialstrigger_rno_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.credentialstrigger_rno_seq', 162, true);
          public          postgres    false    209            �           0    0    district_rno_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.district_rno_seq', 1, false);
          public          postgres    false    211            �           0    0    feedback_rno_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.feedback_rno_seq', 5, true);
          public          postgres    false    213            �           0    0    invoice_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.invoice_id_seq', 1312, true);
          public          postgres    false    215            �           0    0    invoice_rno_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.invoice_rno_seq', 343, true);
          public          postgres    false    216            �           0    0    invoiceitem_rno_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.invoiceitem_rno_seq', 342, true);
          public          postgres    false    218            �           0    0    invoiceslip_rno_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.invoiceslip_rno_seq', 5, true);
          public          postgres    false    220            �           0    0    invoicetrigger_rno_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.invoicetrigger_rno_seq', 499, true);
          public          postgres    false    222            �           0    0    position_rno_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.position_rno_seq', 5, true);
          public          postgres    false    224            �           0    0    previlage_rno_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.previlage_rno_seq', 1, false);
          public          postgres    false    226            �           0    0    product_log_rno_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.product_log_rno_seq', 4, true);
          public          postgres    false    237            �           0    0    products_rno_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.products_rno_seq', 137, true);
          public          postgres    false    228            �           0    0    state_rno_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.state_rno_seq', 1, false);
          public          postgres    false    230            �           0    0    user_rno_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.user_rno_seq', 208, true);
          public          postgres    false    232            �           0    0    user_user_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.user_user_id_seq', 1010, true);
          public          postgres    false    233            �           0    0    usertrigger_rno_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.usertrigger_rno_seq', 845, true);
          public          postgres    false    235                        2606    18940 "   accesscontroll accesscontroll_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public.accesscontroll
    ADD CONSTRAINT accesscontroll_pkey PRIMARY KEY (rno);
 L   ALTER TABLE ONLY public.accesscontroll DROP CONSTRAINT accesscontroll_pkey;
       public            postgres    false    202                       2606    18942 +   accesscontrol_log accesscontroltrigger_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.accesscontrol_log
    ADD CONSTRAINT accesscontroltrigger_pkey PRIMARY KEY (rno);
 U   ALTER TABLE ONLY public.accesscontrol_log DROP CONSTRAINT accesscontroltrigger_pkey;
       public            postgres    false    204                       2606    18944    credentials credentials_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.credentials
    ADD CONSTRAINT credentials_pkey PRIMARY KEY (rno);
 F   ALTER TABLE ONLY public.credentials DROP CONSTRAINT credentials_pkey;
       public            postgres    false    206            
           2606    18946 '   credentials_log credentialstrigger_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.credentials_log
    ADD CONSTRAINT credentialstrigger_pkey PRIMARY KEY (rno);
 Q   ALTER TABLE ONLY public.credentials_log DROP CONSTRAINT credentialstrigger_pkey;
       public            postgres    false    208                       2606    18948    district district_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public.district
    ADD CONSTRAINT district_pkey PRIMARY KEY (rno);
 @   ALTER TABLE ONLY public.district DROP CONSTRAINT district_pkey;
       public            postgres    false    210                       2606    18952    user email_already_exsist 
   CONSTRAINT     W   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT email_already_exsist UNIQUE (email);
 E   ALTER TABLE ONLY public."user" DROP CONSTRAINT email_already_exsist;
       public            postgres    false    231                       2606    18954 .   credentials email_already_exsist_in_user_table 
   CONSTRAINT     m   ALTER TABLE ONLY public.credentials
    ADD CONSTRAINT email_already_exsist_in_user_table UNIQUE (username);
 X   ALTER TABLE ONLY public.credentials DROP CONSTRAINT email_already_exsist_in_user_table;
       public            postgres    false    206                       2606    18956    invoice invoice_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.invoice
    ADD CONSTRAINT invoice_pkey PRIMARY KEY (rno);
 >   ALTER TABLE ONLY public.invoice DROP CONSTRAINT invoice_pkey;
       public            postgres    false    214                       2606    18958    invoiceitem invoiceitem_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.invoiceitem
    ADD CONSTRAINT invoiceitem_pkey PRIMARY KEY (rno);
 F   ALTER TABLE ONLY public.invoiceitem DROP CONSTRAINT invoiceitem_pkey;
       public            postgres    false    217                       2606    18960    invoiceslip invoiceslip_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.invoiceslip
    ADD CONSTRAINT invoiceslip_pkey PRIMARY KEY (rno);
 F   ALTER TABLE ONLY public.invoiceslip DROP CONSTRAINT invoiceslip_pkey;
       public            postgres    false    219                       2606    18962    invoice_log invoicetrigger_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.invoice_log
    ADD CONSTRAINT invoicetrigger_pkey PRIMARY KEY (rno);
 I   ALTER TABLE ONLY public.invoice_log DROP CONSTRAINT invoicetrigger_pkey;
       public            postgres    false    221                       2606    18964    position position_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public."position"
    ADD CONSTRAINT position_pkey PRIMARY KEY (rno);
 B   ALTER TABLE ONLY public."position" DROP CONSTRAINT position_pkey;
       public            postgres    false    223                       2606    18968    previlage previlage_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.previlage
    ADD CONSTRAINT previlage_pkey PRIMARY KEY (rno);
 B   ALTER TABLE ONLY public.previlage DROP CONSTRAINT previlage_pkey;
       public            postgres    false    225            *           2606    19276    product_log product_log_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.product_log
    ADD CONSTRAINT product_log_pkey PRIMARY KEY (rno);
 F   ALTER TABLE ONLY public.product_log DROP CONSTRAINT product_log_pkey;
       public            postgres    false    236                       2606    18972    products products_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (rno);
 @   ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
       public            postgres    false    227                        2606    18974    user set_unique_email 
   CONSTRAINT     S   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT set_unique_email UNIQUE (email);
 A   ALTER TABLE ONLY public."user" DROP CONSTRAINT set_unique_email;
       public            postgres    false    231            "           2606    18976    user set_unique_userid 
   CONSTRAINT     U   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT set_unique_userid UNIQUE (userid);
 B   ALTER TABLE ONLY public."user" DROP CONSTRAINT set_unique_userid;
       public            postgres    false    231                       2606    18978    state state_pkey 
   CONSTRAINT     O   ALTER TABLE ONLY public.state
    ADD CONSTRAINT state_pkey PRIMARY KEY (rno);
 :   ALTER TABLE ONLY public.state DROP CONSTRAINT state_pkey;
       public            postgres    false    229            $           2606    18982    user user_pkey 
   CONSTRAINT     O   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (rno);
 :   ALTER TABLE ONLY public."user" DROP CONSTRAINT user_pkey;
       public            postgres    false    231            &           2606    18984    user userid_already_exsist 
   CONSTRAINT     Y   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT userid_already_exsist UNIQUE (userid);
 F   ALTER TABLE ONLY public."user" DROP CONSTRAINT userid_already_exsist;
       public            postgres    false    231                       2606    18986 /   credentials userid_already_exsist_in_user_table 
   CONSTRAINT     l   ALTER TABLE ONLY public.credentials
    ADD CONSTRAINT userid_already_exsist_in_user_table UNIQUE (userid);
 Y   ALTER TABLE ONLY public.credentials DROP CONSTRAINT userid_already_exsist_in_user_table;
       public            postgres    false    206            (           2606    18988    user_log usertrigger_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.user_log
    ADD CONSTRAINT usertrigger_pkey PRIMARY KEY (rno);
 C   ALTER TABLE ONLY public.user_log DROP CONSTRAINT usertrigger_pkey;
       public            postgres    false    234            +           2620    19007     accesscontroll accesscontrol_log    TRIGGER     �   CREATE TRIGGER accesscontrol_log AFTER INSERT ON public.accesscontroll FOR EACH ROW EXECUTE FUNCTION public.accesscontrol_log_trigger();
 9   DROP TRIGGER accesscontrol_log ON public.accesscontroll;
       public          postgres    false    252    202            ,           2620    19012    credentials credentials_log    TRIGGER     �   CREATE TRIGGER credentials_log AFTER INSERT OR DELETE OR UPDATE ON public.credentials FOR EACH ROW EXECUTE FUNCTION public.credentials_log_trigger();
 4   DROP TRIGGER credentials_log ON public.credentials;
       public          postgres    false    238    206            -           2620    19246    invoice invoice_log    TRIGGER     �   CREATE TRIGGER invoice_log AFTER INSERT OR DELETE OR UPDATE ON public.invoice FOR EACH ROW EXECUTE FUNCTION public.invoice_log_trigger();
 ,   DROP TRIGGER invoice_log ON public.invoice;
       public          postgres    false    253    214            .           2620    19259    products product_log    TRIGGER     �   CREATE TRIGGER product_log AFTER INSERT OR DELETE OR UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.products_log_trigger();
 -   DROP TRIGGER product_log ON public.products;
       public          postgres    false    227    254            �   �  x����n\7���O��ARw�8�n��)2^-�����uu� �E��P�_$E�'�����Dӗ_�?������|����"���/"/�/��?��I�������.��0!��J���͠�����G�ٰ+��
!l\ǹ�a��霯�����o�0��vg֡v�v���&1�0<c�Ƈ�N�ð�wù������e����V�-+q��	���y�fEG��}�g�	]�����m�^�m�h�<K�������upi�^��I��E��cJ��c��t<m����쨜{�cW.0�un��5pϰ�����OX�`�eƩ�?`9[�rM:�G�"�t�`F����5#�"���z_���m�u�jy����A����';�
�(\v���T`pX�VÈ�æ��Y^3�X��,��8X�h��>v��k;�
���v���>�u���#W0&���AyF���¾��akV��������f��(8���ȰډsN��ׁ#���40i&�@�����+�8�����$�S֓Fc]:D�v��t��T����I��`o����(�,�N�
�Ca#��h7����L�vd��X	�Qy�4a޻$�X��7)�4ͫ�]2���0W�T���LڛEx�Ww��G��,�!t2ѹ�ё�Gj�v�v ��Cn#W�Jn6�Z��mx[�@�h��o���2�Fl-dZta�q1��D5���ۺE��[�!�Inb��#mR�3�͙�漢� \hh�v4��D���B�b���=�裒�v�:�w-�X�")Z��'�h)��
�<�'=w8	��э+�ʃx ��P]JѲ�*K0^�o�+�ת�q��	|₮�
�w]gX��~���D��m��Zt{�(6��poÃm�עC+~--v�̓3 Nd�wұ�)�CpGN���V9o�ηP}�j|��B�8]^"p�_E�Ǥ�a�6���2�\
J�rs�(�gC=x&���Cpi����g���@~���h�-��9�8 ����v�@�*���F�Ul���\��j�&��YM�f�q`�U�a \Z�po�l֣�z�Y�6�L�v��H�t`�qn�����^�����nK%�m]*A�4B����,�t-WYZ\BZoh�J���єJ���T'!��L�H�2a�͡	��E����y������B��#G�+���K�KP���ǡ��Y��9�]SZ�?��-��w��N���-=������˯x�����9%��������d�`      �   S  x���˪�0�מ���A����L�ݔ�ή�
�?�q�XY�S20��C�_�9��g��G����cb}#y�����C�^"����-���C��#�'���'�v��KT���T��f���^�q0�g:^p��}�.�c��FpJ;��E]�G�M#�i�؝|�����pxE0	�=�oӘ_�e�%���d|/�:�F�f�9YdK5Կ�����,$��o'��d<��1ZQ�4�{����nk�#
ʆd��q���R���3��L�㠢**�
V{;1���9|id��6��vr��7?<2�vX�m%��٪��r~�*��85��is��"YJP�r�D��ȖJ(u�bF����)��m�R�R����Q�X
աؙ=� N� g'���]�X���v	�T��j�rL���fI��8<i��l�cG��.�@�9]���X��m�0����+`.�(�����!BP4PD!S !�1)
�qo�/!6�P+蹢�������`�w�W���7�L>.����%�2􃫑/,_�Ҏ�)��M=:/�����j3J�kWsyt��_ǘ�E��?�U}x�k�RM�?���/���      �   �  x����n1�g�)�1$��&p�v)�e|n}H��I���+�L�.u��4`�(���Sw�֙���\����8�2�Ӳ1`��ܭ��:݀<6�Cp��U�����j.χ�L���,���>�%�qjWc���+t���hD\h.�$��hT-H@�����Ci@V�=hl�5�Ԉ���w,lL#A��ی��J��42����KVDC�$�&�����BՂ[f���ٞ QK�'@Bԑ���!	���T%TeYD�Ԥ�h PX^��|؟���+ː�ط�>S��px�"�N�RKx�"��@VDC��F��qS9��ފ����@VBN	��u�������0D�2ШLdE�w����DKڧc'b�$<;�w�!�YOy�,��|��Zv!"(j��]��1r�%v"��2��T"�ىX~v6����0Ĕ[C�_����,�BG�ﶹ��ѓ����|�[��:
'�
����������+!J~����s����t[��Eɏ�ُ������asP[����`d�9=��L7o~o���I�C�}��<Ofq#;х�>�Դ|?n���iwz=�>�4��-^��YG��>��ڒK���//s9E����m�o��֬�h1�ZhΤ�|���g�]�087X;�3���z�Z����
      �   t  x��ZM�9<;��?@�篶s����e�7.�t`"Hϐd����簠I����1U����=ې8II�t����?��O����g?�vǳPR��R���ɍ2��N�@a�����5����v���p؏w�tdxy�ۃ��0M�Fb�����`-���qwz���q�;�Db'!2���xn��Hn��Hn������tj�������&��}bxr�I�A�B�M\�)���v�x��1mic����6�p�C��� ۽��ﯚ��%�Ř"P��bhy��24]�d-��)	����L�D@m��گ�?�-'L�]P��-O�����	0Z�"Oj�U0�z��aŻST�Et0��!`��!�i�AHP^$�X���[���Cr���f*�`�M!����B\#!ݟ
�LQ���Ɯ�!��Aq�a��!�3
j����屉�ِ��\�2Ro:��[����Y�\�YV,g�N�d�Z:iR٪v�7"�@�Ĵt�-�2�T���l;q�����8�\\h&����<�����+zky�n81x
�\�N�B�
�=�#$h{v9� 1׳����='��!��sa��`ٱ����-����a.��+S�3�r�PXq?pf�{�3��!l26rJ�؉T(!�P�Khy��x�$���d�Fv
t�*���ݷ�$���@;�F���C����rT���	�;	�֔�s�r=~䄕� ;�.�>�A6#刦d� v���A� *ˁ^t�,{��,3��1��G��f��Z&+PvY�6�TKe��2�R�m�̵T��x�+���%�p㙲 ���v	���K8�Lm�D��*�5Zߤ+OZ�����������~T`�Ӷ����ow�Tc�d��u>�J��2����3�$��w���b��E��o5$�e��D��y��u��13���1�i>wG�W^B�,1|�&�;���:��)0��啮^�0[��RYY)� Z��k��v:���=��AV�0TK1��f5_����G����a��
��n���3s0��5tܱ!���7?<ݝw�����	�rDP�C�8�e�T)Ui��4z0���v㧗C�d0��o7���*�'�i'~�,胱S���U+SL��Ƙ���2(�z�^�V? �<o.      �     x�5��n�0E�寘/�sفV��r�YD�����v#Z���u�ٜ�-���rBYF	�tE����_g��,����|���~�eYU���A��N�����=�w���2[��ʏ�k߳��c�h?�x>��N=��
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
� ���]��q�Ct� �\T���;���sp�ÓS��ʅmY��������"v�"l�3W-�h��������{_��`T)u�@p��6c>�31�      �      x������ � �      �      x������ � �      �   �  x���=s�0�g�Wx�* ~���:t��9��Qk]�g{�/-�����I:�s^ �k�b�
"������N���	#�U�n��Rfep�[�PE
�{��� �@�s����[|ԛm�5	GV&Z�{RRQ�j�ȿ�z��a�U��"(
�(��!GN_�s���a0�?d~7�ݮ̋�#ćE!���*�)����M�glE�`<����=��h�*a���h0F�.�(�@�|aL�L�l�Y�ΔM>���� Q����Y[�y�3�g%�M������р1I�z�rj�ѩ���c�>b/��O�mIO�+����f�n%�\�R����]�nT�LR.���\-o�;ʹP]��R����K�<�|�n�TW}8&XƯ��=,�vԎC�jVFUP�}��??��bK��C}j���a��+�E���eQ�ѣ��      �   �  x����n�0�����6�v	�"BT��洠�I�#c���3��I*}+����

q�x쌣�v���u��C�(����A��>]�"���D��,�D� ���䬰�s�gc�{;�ȉW��F#�"��`�4G:�ɑ��-��d�n4��v�!����[�P!�<C��^��h*0E���H�.b
J�)�(zGWY���5J�����L��Ω�d��C������=�STk0�e�f�M��S������;j�ڣ������_x��d�{u�g���x�QS`��i�<G���q(p�������BK��u��.���=|���z�mкS��5�c����~0��Mw�Xo��&x�'$=�{���@N�05(x�+�����b��&�      �   9
  x��Z�r�F}> F���'KfR뭍�^k���_`����̋\��o�̐H (D�(�h�D����3`L�O3JY8��^��]:�_����p.����������e\\NV��/�?��M�\��eA��Eq���g�|��v?�r����\'\d�eB�Bq+����X��Om^1i�Ŋ2��b6u�h���l?�XB$���_���Ʉ�LҌ�TQo0�V��۷x�W�=��J*2��wg��g�h� �$��=3eSɥT��S��Z�)��jr�lu����[�w袊�F3�IJ&3 ��`jp�T� o��j!u�&j�3�0`�2���X������~I.����N�
Q��0,�@k��S�2O�ס;� ��ˤH���#���b�(�
X�<�p����Ӭ�,4c�-&�����
�#q��%��R��O���(O%�Ԅ�ڂ�W���7��Q,���1�
����%��p1�4ZԈL�qG��P�4�<�4��j�Z&:P2����hȌA_�����Ǆu�4��%M���.h  D@c �ּ��R�J��Tf�
�����6�	Њ�����
��}�N;�˜���混�*_lf˼�.Bd�[(����AJ�_����ɯ�Rz��t���:/�����/��-O�֒�����K"ʍ�R���:)d*��K����C`U8��.ݡ���I�5F@=���_\�}�� ����|<�W7?�e^VV�����S�B�<�O�������X.�����=?ҙr�t�J�w�?6�G�p�X�{5�Vho��?�Dնa�\��s��o�7�t�bVy�2���3�\��
�|���߁�{��zs���x��˻)+Vp�Q���Ja|��:[����b:x&d��l�z�CFH�v�2
�ڇ��E�	��Fʪ?X��G��/�2|�1j4����5��Tt'{}�aܜ�b_��GA��a���n�����:�dR�`��|���wH�x�҇�|TP��:u�Z�Y;4Ԉh��\c+�y����0�����A��d4o)���áh��ifXd��9�ж�szX��e!�R�e�Q��@X����߲�̓MY<Η�b��,��`_~�L���f�l�©�CC �0NZ	{�ƻrV<�M~���E��XO�������;���mn`dH������jW�~W�[�N���i����p�|� >ן��߮k��U�c�A��� P�R��	1�f�A�[��+���O
4��� ����p�]�j�un[�#�!�����̑0��S%G���gP��ф��x��d��)�	���ø����θK��4����@k�������d�4����ֿ�R+qҁ��N��M=�|:g�9G�gA������@�m�AM���,l�X�`����"��q�o
^V��'3��L�2AQ�rFs���5��8�VBoAZ��qϥ&S���4�ԙ>QYa'�TQ2o�G`H�W�tRE5�9�fTsV�r�vQ��w�u�_�Z)�\�H���2��|��/��QM	<����VT�M�Dʕ�0�w��>�q��j�D�ZnL�f�
� ���h@֩�u�NY��O��*��p��}�} |�ɽ���^P��V��*��`���ͻ��'�yy[]�5H�x�Jɣߪ�7.\�msm��0�#X
4E�؇������{�a �ÜP�;glt���Q�^��,n��vޟ���,�RwY��=��BS�~ؕ�J3��0�����Ɛ�z_�kONЌ�"y��F����,sb�?�b�0�❜-<�S�]��7�;�V���GG�@\PB�v�������t
�� 壟j�q=6`l�t+����}:q�,��yj�.�v��{�������m��S�4��?642JT�kA�C���}�о��9���9�n}���ȸ.L�3 ���c=��Y��1d�$<���ٟ�5?~-kk;���A&zX*�C�d��c��,�*P���Z�s���I���������q5!����C��m���}�Y�}���G_�vA�Aq�qH�+��w�*���E��tW�/s8�@ Q�G��KV�X����d╢I�R��ࡂ�9
���Dz�**������nV��ż��[�Cv��9�"xl����ɤ���g��;O'�����l�g�?|ga��S&�n����=��v7��&�_�[��UH|�m������q�b�t&�}�K��ӛ�|��<<������{?��(�J������7����.��T��ӉuFB�p�?���mc�0�����'|K���_�� Q�����|������#�C�� BW`8@&��|�̘dٟ�x~.�ʟ��f�/cPXQ,�?&�������U��u���*C����D�	t�v��1ͻ��bQ	O�aχ�3e�)����./naf�D'z&��E���>���[�T}0�K�)�B�F�#�9=�	����!Q^sp��kq���K��;���KHT��2��KJ�:)�[SZ��q����}��9\>W^aS<<����'Ƭ�I������
<X�Fp9�A�e(�T*��[����~ 2��i��󾤯^��S=m      �      x��}�rǑ���S�������%s7�O��Y{��8����)Y���Y������Lh�h��uvU��K��_�����������w7�?voz�)9� LX��~�?<�}������ �	tpx�����_���n�~��x�S�
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