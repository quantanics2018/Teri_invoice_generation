PGDMP         
        
         |            billing    15.2    15.2 t    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    37706    billing    DATABASE     z   CREATE DATABASE billing WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_India.1252';
    DROP DATABASE billing;
                postgres    false            �            1255    37707    accesscontrolllog()    FUNCTION     �  CREATE FUNCTION public.accesscontrolllog() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
      INSERT INTO accesscontroltrigger(distributer,product,invoice,userid,customer,staff,operation,dateandtime)
	VALUES(NEW.distributer,NEW.product,NEW.invoice,NEW.userid,NEW.customer,NEW.staff,'insert',current_timestamp);
   
   ELSIF TG_OP = 'DELETE' THEN
       
        INSERT INTO accesscontroltrigger(distributer,product,invoice,userid,customer,staff,operation,dateandtime)
	VALUES(OLD.distributer,OLD.product,OLD.invoice,OLD.userid,OLD.customer,OLD.staff,'delete',current_timestamp);
     
	 ELSIF TG_OP = 'UPDATE' THEN
        INSERT INTO accesscontroltrigger(distributer,product,invoice,userid,customer,staff,operation,dateandtime)
	VALUES(NEW.distributer,NEW.product,NEW.invoice,NEW.userid,NEW.customer,NEW.staff,'update',current_timestamp);
       
   
		END IF;
    
    RETURN OLD;
END;
$$;
 *   DROP FUNCTION public.accesscontrolllog();
       public          postgres    false            �            1255    37708    credentialslog()    FUNCTION     �  CREATE FUNCTION public.credentialslog() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
      INSERT INTO credentialstrigger(userid,username,password,lastupdatedby,updatedon,operation,dateandtime)
	VALUES(NEW.userid,NEW.username,NEW.password,NEW.lastupdatedby,NEW.updatedon,'insert',current_timestamp);
   
   ELSIF TG_OP = 'DELETE' THEN
       
        INSERT INTO  credentialstrigger(userid,username,password,lastupdatedby,updatedon,operation,dateandtime)
	VALUES(OLD.userid,OLD.username,OLD.password,OLD.lastupdatedby,OLD.updatedon,'delete',current_timestamp);

	 ELSIF TG_OP = 'UPDATE' THEN
        INSERT INTO  credentialstrigger(userid,username,password,lastupdatedby,updatedon,operation,dateandtime)
	VALUES(NEW.userid,NEW.username,NEW.password,NEW.lastupdatedby,NEW.updatedon,'update',current_timestamp);
   
       
   
		END IF;
    
    RETURN OLD;
END;
$$;
 '   DROP FUNCTION public.credentialslog();
       public          postgres    false                       1255    37709    districtlog()    FUNCTION     W  CREATE FUNCTION public.districtlog() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
      INSERT INTO districttrigger(stateid,districtid,districtcode,districtname,operation,dateandtime)
	VALUES(NEW.stateid,NEW.districtid,NEW.districtcode,NEW.districtname,'insert',current_timestamp);
   
   ELSIF TG_OP = 'DELETE' THEN
       
        INSERT INTO districttrigger (stateid,districtid,districtcode,districtname,operation,dateandtime)
	VALUES(OLD.stateid,OLD.districtid,OLD.districtcode,OLD.districtname,'delete',current_timestamp);
     
	 ELSIF TG_OP = 'UPDATE' THEN
        INSERT INTO districttrigger(stateid,districtid,districtcode,districtname,operation,dateandtime)
	VALUES(NEW.stateid,NEW.districtid,NEW.districtcode,NEW.districtname,'update',current_timestamp);
       
   
		END IF;
    
    RETURN OLD;
END;
$$;
 $   DROP FUNCTION public.districtlog();
       public          postgres    false                       1255    37710    invoicelog()    FUNCTION     t  CREATE FUNCTION public.invoicelog() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
	
	
	BEGIN
    IF TG_OP = 'INSERT' THEN
      INSERT INTO invoicetrigger( invoiceid, senderid, receiverid, invoicedate, sendernotes,subtotal, discount, total, invoicestatus, lastupdatedby, updatedon,operation,dateandtime)
	VALUES(NEW.invoiceid,NEW.senderid,NEW.receiverid,NEW.invoicedate,NEW.sendernotes,NEW.subtotal,NEW.discount,NEW.total,NEW.invoicestatus,NEW.lastupdatedby,NEW.updatedon,'insert',current_timestamp);
   
   ELSIF TG_OP = 'DELETE' THEN
         INSERT INTO invoicetrigger( invoiceid, senderid, receiverid, invoicedate, sendernotes,subtotal, discount, total, invoicestatus, lastupdatedby, updatedon,operation,dateandtime)
	VALUES(OLD.invoiceid,OLD.senderid,OLD.receiverid,OLD.invoicedate,OLD.sendernotes,OLD.subtotal,OLD.discount,OLD.total,OLD.invoicestatus,OLD.lastupdatedby,OLD.updatedon,'delete',current_timestamp);  
       

	 ELSIF TG_OP = 'UPDATE' THEN
           INSERT INTO invoicetrigger( invoiceid, senderid, receiverid, invoicedate, sendernotes,subtotal, discount, total, invoicestatus, lastupdatedby, updatedon,operation,dateandtime)
	VALUES(NEW.invoiceid,NEW.senderid,NEW.receiverid,NEW.invoicedate,NEW.sendernotes,NEW.subtotal,NEW.discount,NEW.total,NEW.invoicestatus,NEW.lastupdatedby,NEW.updatedon,'update',current_timestamp);
       
   
		END IF;
    
    RETURN OLD;
END;
$$;
 #   DROP FUNCTION public.invoicelog();
       public          postgres    false            	           1255    37711    positionlog()    FUNCTION     Q  CREATE FUNCTION public.positionlog() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
      INSERT INTO positiontrigger(positionid,position,lastupdatedby,updatedon,operation,dateandtime)
	VALUES(NEW.positionid,NEW.position,NEW.lastupdatedby,NEW.updatedon,'insert',current_timestamp);
   
   ELSIF TG_OP = 'DELETE' THEN
       
        INSERT INTO positiontrigger(positionid,position,lastupdatedby,updatedon,operation,dateandtime)  
	VALUES(OLD.positionid,OLD.position,OLD.lastupdatedby,OLD.updatedon,'delete',current_timestamp);

	 ELSIF TG_OP = 'UPDATE' THEN
        INSERT INTO positiontrigger(positionid,position,lastupdatedby,updatedon,operation,dateandtime)
	VALUES(NEW.positionid,NEW.position,NEW.lastupdatedby,NEW.updatedon,'update',current_timestamp);
   
       
   
		END IF;
    
    RETURN OLD;
END;
$$;
 $   DROP FUNCTION public.positionlog();
       public          postgres    false            
           1255    37712    previlagelog()    FUNCTION     [  CREATE FUNCTION public.previlagelog() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
      INSERT INTO previlagetrigger(previlageid,previlage,lastupdatedby,updatedon,operation,dateandtime)
	VALUES(NEW.previlageid,NEW.previlage,NEW.lastupdatedby,NEW.updatedon,'insert',current_timestamp);
   
   ELSIF TG_OP = 'DELETE' THEN
       
        INSERT INTO  previlagetrigger(previlageid,previlage,lastupdatedby,updatedon,operation,dateandtime)
	VALUES(OLD.previlageid,OLD.previlage,OLD.lastupdatedby,OLD.updatedon,'delete',current_timestamp);

	 ELSIF TG_OP = 'UPDATE' THEN
     
         INSERT INTO previlagetrigger(previlageid,previlage,lastupdatedby,updatedon,operation,dateandtime)
	VALUES(NEW.previlageid,NEW.previlage,NEW.lastupdatedby,NEW.updatedon,'update',current_timestamp);
   
		END IF;
    
    RETURN OLD;
END;
$$;
 %   DROP FUNCTION public.previlagelog();
       public          postgres    false                       1255    37713 
   statelog()    FUNCTION     �  CREATE FUNCTION public.statelog() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
      INSERT INTO statetrigger(stateid,statecode,statename,lastupdatedby,updatedon,operation,dateandtime)
	VALUES(NEW.stateid,NEW.statecode,NEW.statename,NEW.lastupdatedby,NEW.updatedon,'insert',current_timestamp);
   
   ELSIF TG_OP = 'DELETE' THEN
       
        INSERT INTO statetrigger(stateid,statecode,statename,lastupdatedby,updatedon,operation,dateandtime)
	VALUES(OLD.stateid,OLD.statecode,OLD.statename,OLD.lastupdatedby,OLD.updatedon,'delete',current_timestamp);
     
	 ELSIF TG_OP = 'UPDATE' THEN
        INSERT INTO statetrigger(stateid,statecode,statename,lastupdatedby,updatedon,operation,dateandtime)
	VALUES(NEW.stateid,NEW.statecode,NEW.statename,NEW.lastupdatedby,NEW.updatedon,'update',current_timestamp);
       
   
		END IF;
    
    RETURN OLD;
END;
$$;
 !   DROP FUNCTION public.statelog();
       public          postgres    false                       1255    37714 	   userlog()    FUNCTION        CREATE FUNCTION public.userlog() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        INSERT INTO usertrigger(userid, email, phno, altphoneno, aadhar, pan, name, positionid, adminid, updatedon, updatedby, status, userprofile, pstreetname, pdistrictid, pstateid, ppostalcode, cstreetname, cdistrictid, cstateid, cpostalcode,operation,dateandtime)
	VALUES( NEW.userid, NEW.email, NEW.phno,NEW.altphoneno, NEW.aadhar,NEW.pan, NEW.name, NEW.positionid, NEW.adminid, NEW.updatedon, NEW.updatedby, NEW.status, NEW.userprofile, NEW.pstreetname, NEW.pdistrictid, NEW.pstateid, NEW.ppostalcode, NEW.cstreetname, NEW.cdistrictid, NEW.cstateid, NEW.cpostalcode,'insert',current_timestamp);
   
   ELSIF TG_OP = 'DELETE' THEN
        INSERT INTO usertrigger( userid, email, phno, altphoneno, aadhar, pan, name, positionid, adminid, updatedon, updatedby, status, userprofile, pstreetname, pdistrictid, pstateid, ppostalcode, cstreetname, cdistrictid, cstateid, cpostalcode,operation,dateandtime)
	VALUES( OLD.userid, OLD.email, OLD.phno,OLD.altphoneno, OLD.aadhar,OLD.pan, OLD.name, OLD.positionid, OLD.adminid,OLD.updatedon, OLD.updatedby, OLD.status, OLD.userprofile, OLD.pstreetname, OLD.pdistrictid, OLD.pstateid, OLD.ppostalcode, OLD.cstreetname, OLD.cdistrictid, OLD.cstateid, OLD.cpostalcode,'delete',current_timestamp);
     
	 ELSIF TG_OP = 'UPDATE' THEN
       
        INSERT INTO usertrigger( userid, email, phno, altphoneno, aadhar, pan, name, positionid, adminid, updatedon, updatedby, status, userprofile, pstreetname, pdistrictid, pstateid, ppostalcode, cstreetname, cdistrictid, cstateid, cpostalcode,operation,dateandtime)
	VALUES( NEW.userid, NEW.email, NEW.phno,NEW.altphoneno, NEW.aadhar,NEW.pan, NEW.name, NEW.positionid, NEW.adminid, NEW.updatedon, NEW.updatedby, NEW.status, NEW.userprofile, NEW.pstreetname, NEW.pdistrictid, NEW.pstateid, NEW.ppostalcode, NEW.cstreetname, NEW.cdistrictid, NEW.cstateid, NEW.cpostalcode,'update',current_timestamp);
   
		END IF;
    
    
    RETURN OLD; 
END;
$$;
     DROP FUNCTION public.userlog();
       public          postgres    false            �            1259    37715    accesscontroll    TABLE       CREATE TABLE public.accesscontroll (
    rno integer NOT NULL,
    distributer character varying(2),
    product character varying(2),
    invoice character varying(2),
    userid character varying(6),
    customer character varying(2),
    staff character varying(2)
);
 "   DROP TABLE public.accesscontroll;
       public         heap    postgres    false            �            1259    37718    accesscontroll_rno_seq    SEQUENCE     �   ALTER TABLE public.accesscontroll ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.accesscontroll_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    214            �            1259    37719    accesscontroltrigger    TABLE     j  CREATE TABLE public.accesscontroltrigger (
    rno integer NOT NULL,
    distributer character varying(2),
    product character varying(2),
    invoice character varying(2),
    userid character varying(6),
    customer character varying(2),
    staff character varying(2),
    operation character varying(10),
    dateandtime timestamp(6) without time zone
);
 (   DROP TABLE public.accesscontroltrigger;
       public         heap    postgres    false            �            1259    37722    accesscontroltrigger_rno_seq    SEQUENCE     �   ALTER TABLE public.accesscontroltrigger ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.accesscontroltrigger_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    216            �            1259    37723    credentials    TABLE     �   CREATE TABLE public.credentials (
    rno integer NOT NULL,
    userid character varying(20),
    username character varying(50),
    password character varying(50),
    lastupdatedby character varying(50),
    updatedon character varying(16)
);
    DROP TABLE public.credentials;
       public         heap    postgres    false            �            1259    37726    credentials_rno_seq    SEQUENCE     �   ALTER TABLE public.credentials ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.credentials_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    218            �            1259    37727    credentialstrigger    TABLE     R  CREATE TABLE public.credentialstrigger (
    rno integer NOT NULL,
    userid character varying(20),
    username character varying(50),
    password character varying(50),
    lastupdatedby character varying(50),
    updatedon character varying(16),
    operation character varying(10),
    dateandtime timestamp(6) without time zone
);
 &   DROP TABLE public.credentialstrigger;
       public         heap    postgres    false            �            1259    37730    credentialstrigger_rno_seq    SEQUENCE     �   ALTER TABLE public.credentialstrigger ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.credentialstrigger_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    220            �            1259    37731    district    TABLE     �   CREATE TABLE public.district (
    rno integer NOT NULL,
    stateid character varying(6),
    districtid character varying(6),
    districtcode character varying(6),
    districtname character varying(50)
);
    DROP TABLE public.district;
       public         heap    postgres    false            �            1259    37734    district_rno_seq    SEQUENCE     �   ALTER TABLE public.district ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.district_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    222            �            1259    37735    districttrigger    TABLE     -  CREATE TABLE public.districttrigger (
    rno integer NOT NULL,
    stateid character varying(6),
    districtid character varying(6),
    districtcode character varying(6),
    districtname character varying(50),
    operation character varying(10),
    dateandtime timestamp(6) without time zone
);
 #   DROP TABLE public.districttrigger;
       public         heap    postgres    false            �            1259    37738    districttrigger_rno_seq    SEQUENCE     �   ALTER TABLE public.districttrigger ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.districttrigger_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    224            �            1259    37739    invoice    TABLE     �  CREATE TABLE public.invoice (
    rno integer NOT NULL,
    invoiceid character varying(20),
    senderid character varying(20),
    receiverid character varying(20),
    invoicedate date,
    sendernotes character varying(50),
    subtotal character varying(20),
    discount character varying(20),
    total character varying(10),
    invoicestatus character varying(10),
    lastupdatedby character varying(50),
    updatedon character varying(16)
);
    DROP TABLE public.invoice;
       public         heap    postgres    false            �            1259    37742    invoice_rno_seq    SEQUENCE     �   ALTER TABLE public.invoice ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.invoice_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    226            �            1259    37743    invoiceitem    TABLE     B  CREATE TABLE public.invoiceitem (
    rno integer NOT NULL,
    invoiceid character varying(20),
    itemid character varying(10),
    quantity character varying(10),
    rate character varying(10),
    discountperitem character varying(10),
    lastupdatedby character varying(50),
    updatedon character varying(16)
);
    DROP TABLE public.invoiceitem;
       public         heap    postgres    false            �            1259    37746    invoiceitem_rno_seq    SEQUENCE     �   ALTER TABLE public.invoiceitem ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.invoiceitem_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    228            �            1259    37747    invoicetrigger    TABLE     "  CREATE TABLE public.invoicetrigger (
    rno integer NOT NULL,
    invoiceid character varying(20),
    senderid character varying(20),
    receiverid character varying(20),
    invoicedate date,
    sendernotes character varying(50),
    subtotal character varying(20),
    discount character varying(20),
    total character varying(10),
    invoicestatus character varying(10),
    lastupdatedby character varying(50),
    updatedon character varying(16),
    operation character varying(10),
    dateandtime timestamp(6) without time zone
);
 "   DROP TABLE public.invoicetrigger;
       public         heap    postgres    false            �            1259    37750    invoicetrigger_rno_seq    SEQUENCE     �   ALTER TABLE public.invoicetrigger ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.invoicetrigger_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    230            �            1259    37751    position    TABLE     �   CREATE TABLE public."position" (
    rno integer NOT NULL,
    positionid character varying(2),
    "position" character varying(20),
    lastupdatedby character varying(50),
    updatedon character varying(16)
);
    DROP TABLE public."position";
       public         heap    postgres    false            �            1259    37754    position_rno_seq    SEQUENCE     �   ALTER TABLE public."position" ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.position_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    232            �            1259    37755    positiontrigger    TABLE     0  CREATE TABLE public.positiontrigger (
    rno integer NOT NULL,
    positionid character varying(2),
    "position" character varying(20),
    lastupdatedby character varying(50),
    updatedon character varying(16),
    operation character varying(10),
    dateandtime timestamp(6) without time zone
);
 #   DROP TABLE public.positiontrigger;
       public         heap    postgres    false            �            1259    37758    positiontrigger_rno_seq    SEQUENCE     �   ALTER TABLE public.positiontrigger ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.positiontrigger_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    234            �            1259    37759 	   previlage    TABLE     �   CREATE TABLE public.previlage (
    rno integer NOT NULL,
    previlageid character varying(6),
    previlage character varying(30),
    lastupdatedby character varying(50),
    updatedon character varying(16)
);
    DROP TABLE public.previlage;
       public         heap    postgres    false            �            1259    37762    previlage_rno_seq    SEQUENCE     �   ALTER TABLE public.previlage ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.previlage_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    236            �            1259    37763    previlagetrigger    TABLE     1  CREATE TABLE public.previlagetrigger (
    rno integer NOT NULL,
    previlageid character varying(6),
    previlage character varying(30),
    lastupdatedby character varying(50),
    updatedon character varying(16),
    operation character varying(10),
    dateandtime timestamp(6) without time zone
);
 $   DROP TABLE public.previlagetrigger;
       public         heap    postgres    false            �            1259    37766    previlagetrigger_rno_seq    SEQUENCE     �   ALTER TABLE public.previlagetrigger ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.previlagetrigger_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    238            �            1259    37842    products    TABLE     V  CREATE TABLE public.products (
    rno integer NOT NULL,
    productid character varying,
    quantity character varying,
    priceperitem character varying,
    "Lastupdatedby" character varying,
    updatedon timestamp with time zone[],
    productname character varying,
    belongsto character varying,
    status character varying(2)
);
    DROP TABLE public.products;
       public         heap    postgres    false            �            1259    37849    products_rno_seq    SEQUENCE     �   ALTER TABLE public.products ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.products_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    248            �            1259    37767    state    TABLE     �   CREATE TABLE public.state (
    rno integer NOT NULL,
    stateid character varying(6),
    statecode character varying(6),
    statename character varying(50),
    lastupdatedby character varying(50),
    updatedon character varying(16)
);
    DROP TABLE public.state;
       public         heap    postgres    false            �            1259    37770    state_rno_seq    SEQUENCE     �   ALTER TABLE public.state ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.state_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    240            �            1259    37771    statetrigger    TABLE     M  CREATE TABLE public.statetrigger (
    rno integer NOT NULL,
    stateid character varying(6),
    statecode character varying(6),
    statename character varying(50),
    lastupdatedby character varying(50),
    updatedon character varying(16),
    operation character varying(10),
    dateandtime timestamp(6) without time zone
);
     DROP TABLE public.statetrigger;
       public         heap    postgres    false            �            1259    37774    statetrigger_rno_seq    SEQUENCE     �   ALTER TABLE public.statetrigger ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.statetrigger_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    242            �            1259    37775    user    TABLE     6  CREATE TABLE public."user" (
    rno integer NOT NULL,
    userid character varying(20),
    email character varying(50) NOT NULL,
    phno character varying(10),
    altphoneno character varying(10),
    aadhar character varying(20),
    pan character varying(12),
    name character varying(50),
    positionid character varying(2),
    adminid character varying(20),
    updatedon character varying(16),
    updatedby character varying(50),
    status character varying(9),
    userprofile character varying(10),
    pstreetname character varying(50),
    pdistrictid character varying(50),
    pstateid character varying(30),
    ppostalcode character varying(6),
    cstreetname character varying(50),
    cdistrictid character varying(50),
    cstateid character varying(30),
    cpostalcode character varying(6)
);
    DROP TABLE public."user";
       public         heap    postgres    false            �            1259    37780    user_rno_seq    SEQUENCE     �   ALTER TABLE public."user" ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.user_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    244            �            1259    37781    usertrigger    TABLE     �  CREATE TABLE public.usertrigger (
    rno integer NOT NULL,
    userid character varying(20),
    email character varying(50),
    phno character varying(10),
    altphoneno character varying(10),
    aadhar character varying(20),
    pan character varying(12),
    name character varying(50),
    positionid character varying(2),
    adminid character varying(20),
    updatedon character varying(16),
    updatedby character varying(50),
    status character varying(1),
    userprofile character varying(10),
    pstreetname character varying(50),
    pdistrictid character varying(50),
    pstateid character varying(30),
    ppostalcode character varying(6),
    cstreetname character varying(50),
    cdistrictid character varying(50),
    cstateid character varying(30),
    cpostalcode character varying(6),
    operation character varying(10),
    dateandtime timestamp(6) without time zone
);
    DROP TABLE public.usertrigger;
       public         heap    postgres    false            �            1259    37786    usertrigger_rno_seq    SEQUENCE     �   ALTER TABLE public.usertrigger ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.usertrigger_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    246            �          0    37715    accesscontroll 
   TABLE DATA           e   COPY public.accesscontroll (rno, distributer, product, invoice, userid, customer, staff) FROM stdin;
    public          postgres    false    214   ��       �          0    37719    accesscontroltrigger 
   TABLE DATA           �   COPY public.accesscontroltrigger (rno, distributer, product, invoice, userid, customer, staff, operation, dateandtime) FROM stdin;
    public          postgres    false    216   ��       �          0    37723    credentials 
   TABLE DATA           `   COPY public.credentials (rno, userid, username, password, lastupdatedby, updatedon) FROM stdin;
    public          postgres    false    218   ��       �          0    37727    credentialstrigger 
   TABLE DATA              COPY public.credentialstrigger (rno, userid, username, password, lastupdatedby, updatedon, operation, dateandtime) FROM stdin;
    public          postgres    false    220   �       �          0    37731    district 
   TABLE DATA           X   COPY public.district (rno, stateid, districtid, districtcode, districtname) FROM stdin;
    public          postgres    false    222   ܹ       �          0    37735    districttrigger 
   TABLE DATA           w   COPY public.districttrigger (rno, stateid, districtid, districtcode, districtname, operation, dateandtime) FROM stdin;
    public          postgres    false    224   �       �          0    37739    invoice 
   TABLE DATA           �   COPY public.invoice (rno, invoiceid, senderid, receiverid, invoicedate, sendernotes, subtotal, discount, total, invoicestatus, lastupdatedby, updatedon) FROM stdin;
    public          postgres    false    226   �       �          0    37743    invoiceitem 
   TABLE DATA           x   COPY public.invoiceitem (rno, invoiceid, itemid, quantity, rate, discountperitem, lastupdatedby, updatedon) FROM stdin;
    public          postgres    false    228   *�       �          0    37747    invoicetrigger 
   TABLE DATA           �   COPY public.invoicetrigger (rno, invoiceid, senderid, receiverid, invoicedate, sendernotes, subtotal, discount, total, invoicestatus, lastupdatedby, updatedon, operation, dateandtime) FROM stdin;
    public          postgres    false    230   G�       �          0    37751    position 
   TABLE DATA           [   COPY public."position" (rno, positionid, "position", lastupdatedby, updatedon) FROM stdin;
    public          postgres    false    232   :�       �          0    37755    positiontrigger 
   TABLE DATA           x   COPY public.positiontrigger (rno, positionid, "position", lastupdatedby, updatedon, operation, dateandtime) FROM stdin;
    public          postgres    false    234   ��       �          0    37759 	   previlage 
   TABLE DATA           Z   COPY public.previlage (rno, previlageid, previlage, lastupdatedby, updatedon) FROM stdin;
    public          postgres    false    236   ��       �          0    37763    previlagetrigger 
   TABLE DATA           y   COPY public.previlagetrigger (rno, previlageid, previlage, lastupdatedby, updatedon, operation, dateandtime) FROM stdin;
    public          postgres    false    238   ý       �          0    37842    products 
   TABLE DATA           �   COPY public.products (rno, productid, quantity, priceperitem, "Lastupdatedby", updatedon, productname, belongsto, status) FROM stdin;
    public          postgres    false    248   �       �          0    37767    state 
   TABLE DATA           ]   COPY public.state (rno, stateid, statecode, statename, lastupdatedby, updatedon) FROM stdin;
    public          postgres    false    240   ��       �          0    37771    statetrigger 
   TABLE DATA           |   COPY public.statetrigger (rno, stateid, statecode, statename, lastupdatedby, updatedon, operation, dateandtime) FROM stdin;
    public          postgres    false    242   5�       �          0    37775    user 
   TABLE DATA           �   COPY public."user" (rno, userid, email, phno, altphoneno, aadhar, pan, name, positionid, adminid, updatedon, updatedby, status, userprofile, pstreetname, pdistrictid, pstateid, ppostalcode, cstreetname, cdistrictid, cstateid, cpostalcode) FROM stdin;
    public          postgres    false    244   R�       �          0    37781    usertrigger 
   TABLE DATA             COPY public.usertrigger (rno, userid, email, phno, altphoneno, aadhar, pan, name, positionid, adminid, updatedon, updatedby, status, userprofile, pstreetname, pdistrictid, pstateid, ppostalcode, cstreetname, cdistrictid, cstateid, cpostalcode, operation, dateandtime) FROM stdin;
    public          postgres    false    246   ��       �           0    0    accesscontroll_rno_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.accesscontroll_rno_seq', 11, true);
          public          postgres    false    215            �           0    0    accesscontroltrigger_rno_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.accesscontroltrigger_rno_seq', 8, true);
          public          postgres    false    217            �           0    0    credentials_rno_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.credentials_rno_seq', 11, true);
          public          postgres    false    219            �           0    0    credentialstrigger_rno_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.credentialstrigger_rno_seq', 9, true);
          public          postgres    false    221            �           0    0    district_rno_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.district_rno_seq', 1, false);
          public          postgres    false    223            �           0    0    districttrigger_rno_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.districttrigger_rno_seq', 1, false);
          public          postgres    false    225            �           0    0    invoice_rno_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.invoice_rno_seq', 11, true);
          public          postgres    false    227            �           0    0    invoiceitem_rno_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.invoiceitem_rno_seq', 8, true);
          public          postgres    false    229            �           0    0    invoicetrigger_rno_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.invoicetrigger_rno_seq', 20, true);
          public          postgres    false    231            �           0    0    position_rno_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.position_rno_seq', 1, false);
          public          postgres    false    233            �           0    0    positiontrigger_rno_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.positiontrigger_rno_seq', 1, false);
          public          postgres    false    235            �           0    0    previlage_rno_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.previlage_rno_seq', 1, false);
          public          postgres    false    237            �           0    0    previlagetrigger_rno_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.previlagetrigger_rno_seq', 1, false);
          public          postgres    false    239            �           0    0    products_rno_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.products_rno_seq', 11, true);
          public          postgres    false    249            �           0    0    state_rno_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.state_rno_seq', 1, false);
          public          postgres    false    241            �           0    0    statetrigger_rno_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.statetrigger_rno_seq', 1, false);
          public          postgres    false    243            �           0    0    user_rno_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.user_rno_seq', 61, true);
          public          postgres    false    245            �           0    0    usertrigger_rno_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.usertrigger_rno_seq', 130, true);
          public          postgres    false    247            �           2606    37788 "   accesscontroll accesscontroll_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public.accesscontroll
    ADD CONSTRAINT accesscontroll_pkey PRIMARY KEY (rno);
 L   ALTER TABLE ONLY public.accesscontroll DROP CONSTRAINT accesscontroll_pkey;
       public            postgres    false    214            �           2606    37790 .   accesscontroltrigger accesscontroltrigger_pkey 
   CONSTRAINT     m   ALTER TABLE ONLY public.accesscontroltrigger
    ADD CONSTRAINT accesscontroltrigger_pkey PRIMARY KEY (rno);
 X   ALTER TABLE ONLY public.accesscontroltrigger DROP CONSTRAINT accesscontroltrigger_pkey;
       public            postgres    false    216            �           2606    37792    credentials credentials_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.credentials
    ADD CONSTRAINT credentials_pkey PRIMARY KEY (rno);
 F   ALTER TABLE ONLY public.credentials DROP CONSTRAINT credentials_pkey;
       public            postgres    false    218            �           2606    37794 *   credentialstrigger credentialstrigger_pkey 
   CONSTRAINT     i   ALTER TABLE ONLY public.credentialstrigger
    ADD CONSTRAINT credentialstrigger_pkey PRIMARY KEY (rno);
 T   ALTER TABLE ONLY public.credentialstrigger DROP CONSTRAINT credentialstrigger_pkey;
       public            postgres    false    220            �           2606    37796    district district_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public.district
    ADD CONSTRAINT district_pkey PRIMARY KEY (rno);
 @   ALTER TABLE ONLY public.district DROP CONSTRAINT district_pkey;
       public            postgres    false    222            �           2606    37798 $   districttrigger districttrigger_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY public.districttrigger
    ADD CONSTRAINT districttrigger_pkey PRIMARY KEY (rno);
 N   ALTER TABLE ONLY public.districttrigger DROP CONSTRAINT districttrigger_pkey;
       public            postgres    false    224            �           2606    37800    user email_already_exsist 
   CONSTRAINT     W   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT email_already_exsist UNIQUE (email);
 E   ALTER TABLE ONLY public."user" DROP CONSTRAINT email_already_exsist;
       public            postgres    false    244            �           2606    37802 .   credentials email_already_exsist_in_user_table 
   CONSTRAINT     m   ALTER TABLE ONLY public.credentials
    ADD CONSTRAINT email_already_exsist_in_user_table UNIQUE (username);
 X   ALTER TABLE ONLY public.credentials DROP CONSTRAINT email_already_exsist_in_user_table;
       public            postgres    false    218            �           2606    37804    invoice invoice_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.invoice
    ADD CONSTRAINT invoice_pkey PRIMARY KEY (rno);
 >   ALTER TABLE ONLY public.invoice DROP CONSTRAINT invoice_pkey;
       public            postgres    false    226            �           2606    37806    invoiceitem invoiceitem_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.invoiceitem
    ADD CONSTRAINT invoiceitem_pkey PRIMARY KEY (rno);
 F   ALTER TABLE ONLY public.invoiceitem DROP CONSTRAINT invoiceitem_pkey;
       public            postgres    false    228            �           2606    37808 "   invoicetrigger invoicetrigger_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public.invoicetrigger
    ADD CONSTRAINT invoicetrigger_pkey PRIMARY KEY (rno);
 L   ALTER TABLE ONLY public.invoicetrigger DROP CONSTRAINT invoicetrigger_pkey;
       public            postgres    false    230            �           2606    37810    position position_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public."position"
    ADD CONSTRAINT position_pkey PRIMARY KEY (rno);
 B   ALTER TABLE ONLY public."position" DROP CONSTRAINT position_pkey;
       public            postgres    false    232            �           2606    37812 $   positiontrigger positiontrigger_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY public.positiontrigger
    ADD CONSTRAINT positiontrigger_pkey PRIMARY KEY (rno);
 N   ALTER TABLE ONLY public.positiontrigger DROP CONSTRAINT positiontrigger_pkey;
       public            postgres    false    234            �           2606    37814    previlage previlage_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.previlage
    ADD CONSTRAINT previlage_pkey PRIMARY KEY (rno);
 B   ALTER TABLE ONLY public.previlage DROP CONSTRAINT previlage_pkey;
       public            postgres    false    236            �           2606    37816 &   previlagetrigger previlagetrigger_pkey 
   CONSTRAINT     e   ALTER TABLE ONLY public.previlagetrigger
    ADD CONSTRAINT previlagetrigger_pkey PRIMARY KEY (rno);
 P   ALTER TABLE ONLY public.previlagetrigger DROP CONSTRAINT previlagetrigger_pkey;
       public            postgres    false    238            �           2606    37848    products products_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (rno);
 @   ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
       public            postgres    false    248            �           2606    37818    user set_unique_email 
   CONSTRAINT     S   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT set_unique_email UNIQUE (email);
 A   ALTER TABLE ONLY public."user" DROP CONSTRAINT set_unique_email;
       public            postgres    false    244            �           2606    37820    user set_unique_userid 
   CONSTRAINT     U   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT set_unique_userid UNIQUE (userid);
 B   ALTER TABLE ONLY public."user" DROP CONSTRAINT set_unique_userid;
       public            postgres    false    244            �           2606    37822    state state_pkey 
   CONSTRAINT     O   ALTER TABLE ONLY public.state
    ADD CONSTRAINT state_pkey PRIMARY KEY (rno);
 :   ALTER TABLE ONLY public.state DROP CONSTRAINT state_pkey;
       public            postgres    false    240            �           2606    37824    statetrigger statetrigger_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.statetrigger
    ADD CONSTRAINT statetrigger_pkey PRIMARY KEY (rno);
 H   ALTER TABLE ONLY public.statetrigger DROP CONSTRAINT statetrigger_pkey;
       public            postgres    false    242            �           2606    37826    user user_pkey 
   CONSTRAINT     O   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (rno);
 :   ALTER TABLE ONLY public."user" DROP CONSTRAINT user_pkey;
       public            postgres    false    244            �           2606    37828    user userid_already_exsist 
   CONSTRAINT     Y   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT userid_already_exsist UNIQUE (userid);
 F   ALTER TABLE ONLY public."user" DROP CONSTRAINT userid_already_exsist;
       public            postgres    false    244            �           2606    37830 /   credentials userid_already_exsist_in_user_table 
   CONSTRAINT     l   ALTER TABLE ONLY public.credentials
    ADD CONSTRAINT userid_already_exsist_in_user_table UNIQUE (userid);
 Y   ALTER TABLE ONLY public.credentials DROP CONSTRAINT userid_already_exsist_in_user_table;
       public            postgres    false    218            �           2606    37832    usertrigger usertrigger_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.usertrigger
    ADD CONSTRAINT usertrigger_pkey PRIMARY KEY (rno);
 F   ALTER TABLE ONLY public.usertrigger DROP CONSTRAINT usertrigger_pkey;
       public            postgres    false    246            �           2620    37833 (   accesscontroll accesscontrolltriggername    TRIGGER     �   CREATE TRIGGER accesscontrolltriggername AFTER INSERT OR DELETE OR UPDATE ON public.accesscontroll FOR EACH ROW EXECUTE FUNCTION public.accesscontrolllog();
 A   DROP TRIGGER accesscontrolltriggername ON public.accesscontroll;
       public          postgres    false    214    250            �           2620    37834 "   credentials credentialstriggername    TRIGGER     �   CREATE TRIGGER credentialstriggername AFTER INSERT OR DELETE OR UPDATE ON public.credentials FOR EACH ROW EXECUTE FUNCTION public.credentialslog();
 ;   DROP TRIGGER credentialstriggername ON public.credentials;
       public          postgres    false    218    251            �           2620    37835    district districttriggername    TRIGGER     �   CREATE TRIGGER districttriggername AFTER INSERT OR DELETE OR UPDATE ON public.district FOR EACH ROW EXECUTE FUNCTION public.districtlog();
 5   DROP TRIGGER districttriggername ON public.district;
       public          postgres    false    222    263            �           2620    37836    invoice invoicetriggername    TRIGGER     �   CREATE TRIGGER invoicetriggername AFTER INSERT OR DELETE OR UPDATE ON public.invoice FOR EACH ROW EXECUTE FUNCTION public.invoicelog();
 3   DROP TRIGGER invoicetriggername ON public.invoice;
       public          postgres    false    264    226            �           2620    37837    position positiontriggername    TRIGGER     �   CREATE TRIGGER positiontriggername AFTER INSERT OR DELETE OR UPDATE ON public."position" FOR EACH ROW EXECUTE FUNCTION public.positionlog();
 7   DROP TRIGGER positiontriggername ON public."position";
       public          postgres    false    265    232            �           2620    37838    previlage previlagetriggername    TRIGGER     �   CREATE TRIGGER previlagetriggername AFTER INSERT OR DELETE OR UPDATE ON public.previlage FOR EACH ROW EXECUTE FUNCTION public.previlagelog();
 7   DROP TRIGGER previlagetriggername ON public.previlage;
       public          postgres    false    236    266            �           2620    37839    state statetriggername    TRIGGER     �   CREATE TRIGGER statetriggername AFTER INSERT OR DELETE OR UPDATE ON public.state FOR EACH ROW EXECUTE FUNCTION public.statelog();
 /   DROP TRIGGER statetriggername ON public.state;
       public          postgres    false    267    240            �           2620    37840    user usertriggername    TRIGGER     �   CREATE TRIGGER usertriggername AFTER INSERT OR DELETE OR UPDATE ON public."user" FOR EACH ROW EXECUTE FUNCTION public.userlog();
 /   DROP TRIGGER usertriggername ON public."user";
       public          postgres    false    244    268            �   G   x���4�4�bCNN.S0ט����7�2��	�2�2)�
��� 1��Bu��D@�b���� 5Y�      �   �   x���K
�@���^�C�d�Cx�n��B[��V�l��ǟ��׈HC���X/S`��!u�7�-)���*
�a�z�S}3�E,j�dip=F�2��	�r��p=�eaA/"�-);h�kb����̃h���_n�T��h3�Ͻ��:��/�.��G ���Q�      �   [   x�3�442�LL���sH�M���K�υ�A21~@�eRebʙ��,�4Kr���o�Yl``�Y�G��H�g�6;9S@�)Xec���� V6>      �   �   x���K�ADו��&�Y����'�n��fh�����k��b���i!���a:��ϜN�W��2^oIHtO����ڔ�T�������6����`T�V@7�KG��l`[ݖ��r� ��6o��ة8�;=�y�X���ۇ�	�| ��BYK��gXW\
�I@M}����7��#{��	��R}�      �     x�5��n�0E�寘/�sفV��r�YD�����v#Z���u�ٜ�-���rBYF	�tE����_g��,����|���~�eYU���A��N�����=�w���2[��ʏ�k߳��c�h?�x>��N=��
�U�л���s̞i��ϗު��PY�T��<b���Tr'�����Q	߃���g�$RI��(̐J�
,�;����O7HD��#��c?B�ُ�ȗa+�ؼj���q\���"X�{����3�3Dl�{�<��U"�`�ZQkq�/y�D|��4Ԯ�:^�'��� �.���7�T�A�Ԃ���m�)vt`o�Ld�C���p}���4偌#_�)h>4���_���!��i�ڀ����B����1ťb�N�/�a�b��A~��mǵw*E��O22噧	�PE�4��,X��"����A#��T������)��
����Y�5=�!e�y�&�W�|�%W��5�U�:��Og"v5u�K#m�k�'�Ê�Ƴ��[)��R�.      �      x������ � �      �      x������ � �      �      x������ � �      �   �   x���=j1��z��������9��l)ߟ̶a��0l��~��6�]��}�߿��m�q!�P�QL�i��ܩ��HN�ɌRn��1��$��A��c>�����GbR/2%q��bΝ�R�^iL�X��q:��z�x[��,���V�5��F�)��	�F�/[!b`[�iF]Y)�}���4G�VbmS+>��%�L����M��GM�-��4�*Jr�" �z��      �   ?   x�3�4��M��LKL.)-J��".#N#Δ�⒢̤Ғ�"��1�1griqI~n*L(F��� �<      �      x������ � �      �      x������ � �      �      x������ � �      �   �   x���;� �g�=A�#<�u��dA��@"���@�tk"{����`@k�}�>��S��'r���B6P��)Kq�*��Р�d���5��T��[��h���S���fuy�!��Z�V���P�ㆺy�aJ�h��'���B����٧u�$8v����^�      �   �  x����n�0�����6�v	�"BT��洠�I�#c���3��I*}+����

q�x쌣�v���u��C�(����A��>]�"���D��,�D� ���䬰�s�gc�{;�ȉW��F#�"��`�4G:�ɑ��-��d�n4��v�!����[�P!�<C��^��h*0E���H�.b
J�)�(zGWY���5J�����L��Ω�d��C������=�STk0�e�f�M��S������;j�ڣ������_x��d�{u�g���x�QS`��i�<G���q(p�������BK��u��.���=|���z�mкS��5�c����~0��Mw�Xo��&x�'$=�{���@N�05(x�+�����b��&�      �      x������ � �      �   /  x�}�mk� �?_~L�g��m+c�/];��0�hG`y!Z�����Ŵ��/ޙ�9�@�A�����l��kVuM�˹��UH�s�4����xB��]���tFo�>�����g��n�+�S�|�U�Xg�k����`]�!6�5�d��&Ac�)�(���vI*�rp����kT�g���z1[��"`�z���Wk��9��P���"N:GZ��:s�/��q���u�5��HՄ���P�	Q))�0B�?ĕ+w;��f1�}1�/������)��M�U�F�xK�����A'���<��6�,�~���      �   :  x�͜�n\����O�p���uV��Ɔc�x#�t��7�4��}��X!%�f���-	`}]]�ץOSq�헻�\�����_��ӛ��������*L�o�s����ۻ�g���B\���,�.d������{��
|QZ$:�F;$��������ۻ�7��v���=��o�^�yhu��X(����xw��ۏX}�sWk�Q'�����>��jMxQ낁6�^zm"���;7���t�H(�-NZ��-m,d��5��|�.My!�B�'/�6���+kHǭ}s��o����<�#���G.�ұ��l\ �jotSJk'�ܻ�=�ޟׇ����Y�y��j}WG����7.��ԕ�l�i�>E9��P��*u8�c�4{Z�)6Xs+ǉ������mfڴ�+�:�d&�����X�wS�}���^S�d�+c��hFf�E<%����y֬h�<�������kV �T �s�����7��<2&�rNB/ }I�4�q��䈗���7�����������G���T|�
��	t�a���,�4�����)3�1T3���Cr��lY+s7���F6�V"���:� �Z+
J��cl����&�!�,�4.�����7*�Pk���Og�U�2=c�g���}��r��+�V?�VU�K� ���3��$�H�hմ[���y� ��9/�t:-`:*�O�]��::pX��%��K��C�'����j|1�޴�JpW�_�Mژ-}&��M��{	���\B=�M=��]�o����-bN����e�$�L�Mx��jx2͠��Ys��%�G��?����IY�Mέ��p�d���ܺ��I�f�h�dLO�z�{�.Y�K��']Pzd��s����~��ɔ�E��5s3�`☍�Ρ������l:��q<s鲢)uP���H��$H�@n���Ƌ�ktrp֦Gg�\�٢�r�3�j�D\�D��V{*Ag��mR�k��,��4Ұj)�꒑�|0��$[ř�6;:�~~���C�f�vt���~����f�.��im��֍�RH�s���s���$gIh3�ξ@�����l��Hq}-�vC�K3�}�e���T�S!f��l�"�5�a �g�&H�1����ld�����y�a �2q11�h~��~�9�j��id�����=��a��y�ս/��w`�%4�Xu�I�e_胚�0 �3IG`�ԫ$u��P2!8d\]L�7�|�y�SۘC��k(a&m\����Y�2v�6�ǫ��u$�m�Tïl���P�&�5�ʔ���=�����K7 Lw�p��G�n�h���F8��+Xo�I��s�����*9��ۘK�-����S�=��Θ.k1��G5(8$��(ꓩ����b2�_o]F8���s�=�9Z�Pԏ��.u�3����M2�l�Z�4�߳Y/�-f��ee��I��[�4��Ћ� ���b3�m���� '�L¿��ע#�bC�����:x��
�X
��9�N�N%��<��t�pP�a����z������+�Z�:�3��G�3��������U�
N�p�%�.�`m'N�և��h�ۊ�e���扮#�&�+��7��;{(�适��x��I*��Ǟ/c�u�Pgs�x�h�E�8O���5QEZ�M�֧S�8�*g�,2�biVo�g� ��F4r��8u���nKD2)���zRV��-U������_�1�I�z��(���=�1���e��/�(O�r���
F=��'�6�$�f���I�`��)襯u�4�T�pM��V�{(��挲���e�{�pN����/]ҠZ���������     