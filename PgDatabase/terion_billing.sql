PGDMP                         |            terion_billing    15.2    15.2 �    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    37871    terion_billing    DATABASE     �   CREATE DATABASE terion_billing WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_India.1252';
    DROP DATABASE terion_billing;
                postgres    false                       1255    37872    accesscontrolllog()    FUNCTION     =  CREATE FUNCTION public.accesscontrolllog() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
      INSERT INTO accesscontroltrigger(distributer,product,invoicegenerator,userid,customer,staff,invoicepayslip,operation,dateandtime)
	VALUES(NEW.distributer,NEW.product,NEW.invoicegenerator,NEW.userid,NEW.customer,NEW.staff,NEW.invoicepayslip,'insert',current_timestamp);
   
   ELSIF TG_OP = 'DELETE' THEN
       
        INSERT INTO accesscontroltrigger(distributer,product,invoicegenerator,userid,customer,staff,invoicepayslip,operation,dateandtime)
	VALUES(OLD.distributer,OLD.product,OLD.invoicegenerator,OLD.userid,OLD.customer,OLD.staff,OLD.invoicepayslip,'delete',current_timestamp);
     
	 ELSIF TG_OP = 'UPDATE' THEN
        INSERT INTO accesscontroltrigger(distributer,product,invoicegenerator,userid,customer,staff,invoicepayslip,operation,dateandtime)
	VALUES(NEW.distributer,NEW.product,NEW.invoicegenerator,NEW.userid,NEW.customer,NEW.staff,NEW.invoicepayslip,'update',current_timestamp);
       
   
		END IF;
    
    RETURN OLD;
END;
$$;
 *   DROP FUNCTION public.accesscontrolllog();
       public          postgres    false                        1255    37873    credentialslog()    FUNCTION     �  CREATE FUNCTION public.credentialslog() RETURNS trigger
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
       public          postgres    false                       1255    37874    districtlog()    FUNCTION     W  CREATE FUNCTION public.districtlog() RETURNS trigger
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
       public          postgres    false                       1255    37875    invoicelog()    FUNCTION     t  CREATE FUNCTION public.invoicelog() RETURNS trigger
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
       public          postgres    false                       1255    37876    positionlog()    FUNCTION     Q  CREATE FUNCTION public.positionlog() RETURNS trigger
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
       public          postgres    false                       1255    37877    previlagelog()    FUNCTION     [  CREATE FUNCTION public.previlagelog() RETURNS trigger
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
       public          postgres    false                       1255    37878 
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
       public          postgres    false                       1255    37879 	   userlog()    FUNCTION     �	  CREATE FUNCTION public.userlog() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        INSERT INTO usertrigger(userid, email, phno, aadhar, pan, positionid, adminid, updatedby, status, userprofile, pstreetname, pdistrictid, pstateid, ppostalcode, cstreetname, cdistrictid, cstateid, cpostalcode,operation,dateandtime,organizationname,gstno,bussinesstype,fname,lname,upiid,bankname,bankaccno,passbookimg)
	VALUES( NEW.userid, NEW.email, NEW.phno, NEW.aadhar,NEW.pan, NEW.positionid, NEW.adminid, NEW.updatedby, NEW.status, NEW.userprofile, NEW.pstreetname, NEW.pdistrictid, NEW.pstateid, NEW.ppostalcode, NEW.cstreetname, NEW.cdistrictid, NEW.cstateid, NEW.cpostalcode,'insert',current_timestamp,NEW.organizationname,NEW.gstnno,NEW.bussinesstype,NEW.fname,NEW.lname,NEW.upiid,NEW.bankname,NEW.bankaccno,NEW.passbookimg);
   
   ELSIF TG_OP = 'DELETE' THEN
        INSERT INTO usertrigger( userid, email, phno, aadhar, pan, positionid, adminid, updatedby, status, userprofile, pstreetname, pdistrictid, pstateid, ppostalcode, cstreetname, cdistrictid, cstateid, cpostalcode,operation,dateandtime,organizationname,gstno,bussinesstype,fname,lname,upiid,bankname,bankaccno,passbookimg)
	VALUES( OLD.userid, OLD.email, OLD.phno, OLD.aadhar,OLD.pan, OLD.positionid, OLD.adminid,OLD.updatedby, OLD.status, OLD.userprofile, OLD.pstreetname, OLD.pdistrictid, OLD.pstateid, OLD.ppostalcode, OLD.cstreetname, OLD.cdistrictid, OLD.cstateid, OLD.cpostalcode,'delete',current_timestamp,OLD.organizationname,OLD.gstnno,OLD.bussinesstype,OLD.fname,OLD.lname,OLD.upiid,OLD.bankname,OLD.bankaccno,OLD.passbookimg);
     
	 ELSIF TG_OP = 'UPDATE' THEN
       
        INSERT INTO usertrigger( userid, email, phno, aadhar, pan, positionid, adminid, updatedby, status, userprofile, pstreetname, pdistrictid, pstateid, ppostalcode, cstreetname, cdistrictid, cstateid, cpostalcode,operation,dateandtime,organizationname,gstno,bussinesstype,fname,lname,upiid,bankname,bankaccno,passbookimg)
	VALUES( NEW.userid, NEW.email, NEW.phno, NEW.aadhar,NEW.pan, NEW.positionid, NEW.adminid, NEW.updatedby, NEW.status, NEW.userprofile, NEW.pstreetname, NEW.pdistrictid, NEW.pstateid, NEW.ppostalcode, NEW.cstreetname, NEW.cdistrictid, NEW.cstateid, NEW.cpostalcode,'update',current_timestamp,NEW.organizationname,NEW.gstnno,NEW.bussinesstype,NEW.fname,NEW.lname,NEW.upiid,NEW.bankname,NEW.bankaccno,NEW.passbookimg);
   
		END IF;
    
    
    RETURN OLD; 
END;
$$;
     DROP FUNCTION public.userlog();
       public          postgres    false            �            1259    37880    accesscontroll    TABLE     l  CREATE TABLE public.accesscontroll (
    rno integer NOT NULL,
    distributer character varying(2),
    product character varying(2),
    invoicegenerator character varying(2),
    userid character varying(6) NOT NULL,
    customer character varying(2),
    staff character varying(2),
    invoicepayslip character varying(2),
    d_staff character varying(2)
);
 "   DROP TABLE public.accesscontroll;
       public         heap    postgres    false            �            1259    37883    accesscontroll_rno_seq    SEQUENCE     �   ALTER TABLE public.accesscontroll ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.accesscontroll_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    214            �            1259    37884    accesscontroltrigger    TABLE     �  CREATE TABLE public.accesscontroltrigger (
    rno integer NOT NULL,
    distributer character varying(2),
    product character varying(2),
    invoicegenerator character varying(2),
    userid character varying(6),
    customer character varying(2),
    staff character varying(2),
    operation character varying(10),
    dateandtime timestamp(6) without time zone,
    invoicepayslip character varying(2),
    d_staff character varying(2)
);
 (   DROP TABLE public.accesscontroltrigger;
       public         heap    postgres    false            �            1259    37887    accesscontroltrigger_rno_seq    SEQUENCE     �   ALTER TABLE public.accesscontroltrigger ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.accesscontroltrigger_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    216            �            1259    37888    credentials    TABLE     �   CREATE TABLE public.credentials (
    rno integer NOT NULL,
    userid character varying(20),
    username character varying(50),
    password character varying(50),
    lastupdatedby character varying(50),
    updatedon character varying(16)
);
    DROP TABLE public.credentials;
       public         heap    postgres    false            �            1259    37891    credentials_rno_seq    SEQUENCE     �   ALTER TABLE public.credentials ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.credentials_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    218            �            1259    37892    credentialstrigger    TABLE     R  CREATE TABLE public.credentialstrigger (
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
       public         heap    postgres    false            �            1259    37895    credentialstrigger_rno_seq    SEQUENCE     �   ALTER TABLE public.credentialstrigger ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.credentialstrigger_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    220            �            1259    37896    district    TABLE     �   CREATE TABLE public.district (
    rno integer NOT NULL,
    stateid character varying(6),
    districtid character varying(6),
    districtcode character varying(6),
    districtname character varying(50)
);
    DROP TABLE public.district;
       public         heap    postgres    false            �            1259    37899    district_rno_seq    SEQUENCE     �   ALTER TABLE public.district ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.district_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    222            �            1259    37900    districttrigger    TABLE     -  CREATE TABLE public.districttrigger (
    rno integer NOT NULL,
    stateid character varying(6),
    districtid character varying(6),
    districtcode character varying(6),
    districtname character varying(50),
    operation character varying(10),
    dateandtime timestamp(6) without time zone
);
 #   DROP TABLE public.districttrigger;
       public         heap    postgres    false            �            1259    37903    districttrigger_rno_seq    SEQUENCE     �   ALTER TABLE public.districttrigger ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.districttrigger_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    224            �            1259    38062    feedback    TABLE     y   CREATE TABLE public.feedback (
    rno integer NOT NULL,
    userid character varying,
    feedback character varying
);
    DROP TABLE public.feedback;
       public         heap    postgres    false            �            1259    38067    feedback_rno_seq    SEQUENCE     �   ALTER TABLE public.feedback ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.feedback_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    254            �            1259    37904    invoice    TABLE     V  CREATE TABLE public.invoice (
    rno integer NOT NULL,
    invoiceid character varying(20),
    senderid character varying(20),
    receiverid character varying(20),
    invoicedate date DEFAULT CURRENT_TIMESTAMP,
    sendernotes character varying(50),
    subtotal character varying(20),
    discount character varying(20),
    total character varying(10),
    invoicestatus character varying(10),
    lastupdatedby character varying(50),
    updatedon character varying(16),
    senderstatus integer,
    date character varying,
    reciverstatus integer,
    transactionid character varying
);
    DROP TABLE public.invoice;
       public         heap    postgres    false            �            1259    37907    invoice_id_seq    SEQUENCE     y   CREATE SEQUENCE public.invoice_id_seq
    START WITH 1000
    INCREMENT BY 1
    MINVALUE 0
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.invoice_id_seq;
       public          postgres    false    226            �           0    0    invoice_id_seq    SEQUENCE OWNED BY     H   ALTER SEQUENCE public.invoice_id_seq OWNED BY public.invoice.invoiceid;
          public          postgres    false    227            �            1259    37908    invoice_rno_seq    SEQUENCE     �   ALTER TABLE public.invoice ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.invoice_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    226            �            1259    37909    invoiceitem    TABLE     d  CREATE TABLE public.invoiceitem (
    rno integer NOT NULL,
    invoiceid character varying(20),
    productid character varying(10),
    quantity character varying(10),
    cost character varying(10),
    discountperitem character varying(10),
    lastupdatedby character varying(50),
    updatedon character varying(16),
    hsncode character varying
);
    DROP TABLE public.invoiceitem;
       public         heap    postgres    false            �            1259    37914    invoiceitem_rno_seq    SEQUENCE     �   ALTER TABLE public.invoiceitem ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.invoiceitem_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    229            �            1259    37915    invoiceslip    TABLE     �  CREATE TABLE public.invoiceslip (
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
    updatedon character varying
);
    DROP TABLE public.invoiceslip;
       public         heap    postgres    false            �            1259    37920    invoiceslip_rno_seq    SEQUENCE     �   ALTER TABLE public.invoiceslip ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.invoiceslip_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    231            �            1259    37921    invoicetrigger    TABLE     "  CREATE TABLE public.invoicetrigger (
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
       public         heap    postgres    false            �            1259    37924    invoicetrigger_rno_seq    SEQUENCE     �   ALTER TABLE public.invoicetrigger ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.invoicetrigger_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    233            �            1259    37925    position    TABLE     �   CREATE TABLE public."position" (
    rno integer NOT NULL,
    positionid character varying(2),
    "position" character varying(20),
    lastupdatedby character varying(50),
    updatedon character varying(16)
);
    DROP TABLE public."position";
       public         heap    postgres    false            �            1259    37928    position_rno_seq    SEQUENCE     �   ALTER TABLE public."position" ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.position_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    235            �            1259    37929    positiontrigger    TABLE     0  CREATE TABLE public.positiontrigger (
    rno integer NOT NULL,
    positionid character varying(2),
    "position" character varying(20),
    lastupdatedby character varying(50),
    updatedon character varying(16),
    operation character varying(10),
    dateandtime timestamp(6) without time zone
);
 #   DROP TABLE public.positiontrigger;
       public         heap    postgres    false            �            1259    37932    positiontrigger_rno_seq    SEQUENCE     �   ALTER TABLE public.positiontrigger ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.positiontrigger_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    237            �            1259    37933 	   previlage    TABLE     �   CREATE TABLE public.previlage (
    rno integer NOT NULL,
    previlageid character varying(6),
    previlage character varying(30),
    lastupdatedby character varying(50),
    updatedon character varying(16)
);
    DROP TABLE public.previlage;
       public         heap    postgres    false            �            1259    37936    previlage_rno_seq    SEQUENCE     �   ALTER TABLE public.previlage ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.previlage_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    239            �            1259    37937    previlagetrigger    TABLE     1  CREATE TABLE public.previlagetrigger (
    rno integer NOT NULL,
    previlageid character varying(6),
    previlage character varying(30),
    lastupdatedby character varying(50),
    updatedon character varying(16),
    operation character varying(10),
    dateandtime timestamp(6) without time zone
);
 $   DROP TABLE public.previlagetrigger;
       public         heap    postgres    false            �            1259    37940    previlagetrigger_rno_seq    SEQUENCE     �   ALTER TABLE public.previlagetrigger ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.previlagetrigger_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    241            �            1259    37941    products    TABLE     �  CREATE TABLE public.products (
    rno integer NOT NULL,
    productid character varying,
    quantity integer,
    priceperitem character varying,
    "Lastupdatedby" character varying,
    updatedon timestamp with time zone[],
    productname character varying,
    belongsto character varying,
    status character varying(2),
    batchno character varying,
    cgst character varying,
    sgst character varying
);
    DROP TABLE public.products;
       public         heap    postgres    false            �            1259    37946    products_rno_seq    SEQUENCE     �   ALTER TABLE public.products ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.products_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    243            �            1259    37947    state    TABLE     �   CREATE TABLE public.state (
    rno integer NOT NULL,
    stateid character varying(6),
    statecode character varying(6),
    statename character varying(50),
    lastupdatedby character varying(50),
    updatedon character varying(16)
);
    DROP TABLE public.state;
       public         heap    postgres    false            �            1259    37950    state_rno_seq    SEQUENCE     �   ALTER TABLE public.state ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.state_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    245            �            1259    37951    statetrigger    TABLE     M  CREATE TABLE public.statetrigger (
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
       public         heap    postgres    false            �            1259    37954    statetrigger_rno_seq    SEQUENCE     �   ALTER TABLE public.statetrigger ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.statetrigger_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    247            �            1259    37961    user    TABLE     ?  CREATE TABLE public."user" (
    rno integer NOT NULL,
    userid character varying(20) NOT NULL,
    email character varying(50) NOT NULL,
    phno character varying(10),
    aadhar character varying(20),
    pan character varying(12),
    positionid character varying(2),
    adminid character varying(20),
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
    cpostalcode character varying(6),
    updatedon timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    organizationname character varying,
    gstnno character varying,
    bussinesstype character varying,
    fname character varying,
    lname character varying,
    upiid character varying,
    bankname character varying,
    bankaccno character varying,
    passbookimg character varying
);
    DROP TABLE public."user";
       public         heap    postgres    false            �            1259    37967    user_rno_seq    SEQUENCE     �   ALTER TABLE public."user" ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.user_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    249            �            1259    37968    user_user_id_seq    SEQUENCE     |   CREATE SEQUENCE public.user_user_id_seq
    START WITH 1000
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.user_user_id_seq;
       public          postgres    false    249            �           0    0    user_user_id_seq    SEQUENCE OWNED BY     F   ALTER SEQUENCE public.user_user_id_seq OWNED BY public."user".userid;
          public          postgres    false    251            �            1259    37969    usertrigger    TABLE     f  CREATE TABLE public.usertrigger (
    rno integer NOT NULL,
    userid character varying(20),
    email character varying(50),
    phno character varying(10),
    aadhar character varying(20),
    pan character varying(12),
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
    dateandtime timestamp(6) without time zone,
    organizationname character varying,
    gstno character varying,
    bussinesstype character varying,
    fname character varying,
    lname character varying,
    upiid character varying,
    bankname character varying,
    bankaccno character varying,
    passbookimg character varying
);
    DROP TABLE public.usertrigger;
       public         heap    postgres    false            �            1259    37974    usertrigger_rno_seq    SEQUENCE     �   ALTER TABLE public.usertrigger ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.usertrigger_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    252            �           2604    38043    invoice invoiceid    DEFAULT     �   ALTER TABLE ONLY public.invoice ALTER COLUMN invoiceid SET DEFAULT ('INVOICE'::text || nextval('public.invoice_id_seq'::regclass));
 @   ALTER TABLE public.invoice ALTER COLUMN invoiceid DROP DEFAULT;
       public          postgres    false    227    226            �           2604    37975    user userid    DEFAULT     |   ALTER TABLE ONLY public."user" ALTER COLUMN userid SET DEFAULT ('U'::text || nextval('public.user_user_id_seq'::regclass));
 <   ALTER TABLE public."user" ALTER COLUMN userid DROP DEFAULT;
       public          postgres    false    251    249            �          0    37880    accesscontroll 
   TABLE DATA           �   COPY public.accesscontroll (rno, distributer, product, invoicegenerator, userid, customer, staff, invoicepayslip, d_staff) FROM stdin;
    public          postgres    false    214   ��       �          0    37884    accesscontroltrigger 
   TABLE DATA           �   COPY public.accesscontroltrigger (rno, distributer, product, invoicegenerator, userid, customer, staff, operation, dateandtime, invoicepayslip, d_staff) FROM stdin;
    public          postgres    false    216   '�       �          0    37888    credentials 
   TABLE DATA           `   COPY public.credentials (rno, userid, username, password, lastupdatedby, updatedon) FROM stdin;
    public          postgres    false    218   P�       �          0    37892    credentialstrigger 
   TABLE DATA              COPY public.credentialstrigger (rno, userid, username, password, lastupdatedby, updatedon, operation, dateandtime) FROM stdin;
    public          postgres    false    220   ��       �          0    37896    district 
   TABLE DATA           X   COPY public.district (rno, stateid, districtid, districtcode, districtname) FROM stdin;
    public          postgres    false    222   �       �          0    37900    districttrigger 
   TABLE DATA           w   COPY public.districttrigger (rno, stateid, districtid, districtcode, districtname, operation, dateandtime) FROM stdin;
    public          postgres    false    224   (�       �          0    38062    feedback 
   TABLE DATA           9   COPY public.feedback (rno, userid, feedback) FROM stdin;
    public          postgres    false    254   E�       �          0    37904    invoice 
   TABLE DATA           �   COPY public.invoice (rno, invoiceid, senderid, receiverid, invoicedate, sendernotes, subtotal, discount, total, invoicestatus, lastupdatedby, updatedon, senderstatus, date, reciverstatus, transactionid) FROM stdin;
    public          postgres    false    226   ��       �          0    37909    invoiceitem 
   TABLE DATA           �   COPY public.invoiceitem (rno, invoiceid, productid, quantity, cost, discountperitem, lastupdatedby, updatedon, hsncode) FROM stdin;
    public          postgres    false    229   >�       �          0    37915    invoiceslip 
   TABLE DATA           �   COPY public.invoiceslip (rno, invoiceid, senderid, receiverid, invoicedate, hsncode, productid, quantity, discount, originalprice, afterdiscount, totalprice, lastupdatedby, updatedon) FROM stdin;
    public          postgres    false    231   q�       �          0    37921    invoicetrigger 
   TABLE DATA           �   COPY public.invoicetrigger (rno, invoiceid, senderid, receiverid, invoicedate, sendernotes, subtotal, discount, total, invoicestatus, lastupdatedby, updatedon, operation, dateandtime) FROM stdin;
    public          postgres    false    233   ��       �          0    37925    position 
   TABLE DATA           [   COPY public."position" (rno, positionid, "position", lastupdatedby, updatedon) FROM stdin;
    public          postgres    false    235    �       �          0    37929    positiontrigger 
   TABLE DATA           x   COPY public.positiontrigger (rno, positionid, "position", lastupdatedby, updatedon, operation, dateandtime) FROM stdin;
    public          postgres    false    237   z�       �          0    37933 	   previlage 
   TABLE DATA           Z   COPY public.previlage (rno, previlageid, previlage, lastupdatedby, updatedon) FROM stdin;
    public          postgres    false    239   ��       �          0    37937    previlagetrigger 
   TABLE DATA           y   COPY public.previlagetrigger (rno, previlageid, previlage, lastupdatedby, updatedon, operation, dateandtime) FROM stdin;
    public          postgres    false    241   ��       �          0    37941    products 
   TABLE DATA           �   COPY public.products (rno, productid, quantity, priceperitem, "Lastupdatedby", updatedon, productname, belongsto, status, batchno, cgst, sgst) FROM stdin;
    public          postgres    false    243    �       �          0    37947    state 
   TABLE DATA           ]   COPY public.state (rno, stateid, statecode, statename, lastupdatedby, updatedon) FROM stdin;
    public          postgres    false    245   z�       �          0    37951    statetrigger 
   TABLE DATA           |   COPY public.statetrigger (rno, stateid, statecode, statename, lastupdatedby, updatedon, operation, dateandtime) FROM stdin;
    public          postgres    false    247   �       �          0    37961    user 
   TABLE DATA           I  COPY public."user" (rno, userid, email, phno, aadhar, pan, positionid, adminid, updatedby, status, userprofile, pstreetname, pdistrictid, pstateid, ppostalcode, cstreetname, cdistrictid, cstateid, cpostalcode, updatedon, organizationname, gstnno, bussinesstype, fname, lname, upiid, bankname, bankaccno, passbookimg) FROM stdin;
    public          postgres    false    249   7�       �          0    37969    usertrigger 
   TABLE DATA           e  COPY public.usertrigger (rno, userid, email, phno, aadhar, pan, positionid, adminid, updatedon, updatedby, status, userprofile, pstreetname, pdistrictid, pstateid, ppostalcode, cstreetname, cdistrictid, cstateid, cpostalcode, operation, dateandtime, organizationname, gstno, bussinesstype, fname, lname, upiid, bankname, bankaccno, passbookimg) FROM stdin;
    public          postgres    false    252   �       �           0    0    accesscontroll_rno_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.accesscontroll_rno_seq', 59, true);
          public          postgres    false    215            �           0    0    accesscontroltrigger_rno_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.accesscontroltrigger_rno_seq', 146, true);
          public          postgres    false    217            �           0    0    credentials_rno_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.credentials_rno_seq', 68, true);
          public          postgres    false    219            �           0    0    credentialstrigger_rno_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.credentialstrigger_rno_seq', 104, true);
          public          postgres    false    221            �           0    0    district_rno_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.district_rno_seq', 1, false);
          public          postgres    false    223            �           0    0    districttrigger_rno_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.districttrigger_rno_seq', 1, false);
          public          postgres    false    225            �           0    0    feedback_rno_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.feedback_rno_seq', 3, true);
          public          postgres    false    255            �           0    0    invoice_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.invoice_id_seq', 1108, true);
          public          postgres    false    227            �           0    0    invoice_rno_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.invoice_rno_seq', 139, true);
          public          postgres    false    228            �           0    0    invoiceitem_rno_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.invoiceitem_rno_seq', 129, true);
          public          postgres    false    230            �           0    0    invoiceslip_rno_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.invoiceslip_rno_seq', 5, true);
          public          postgres    false    232            �           0    0    invoicetrigger_rno_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.invoicetrigger_rno_seq', 258, true);
          public          postgres    false    234            �           0    0    position_rno_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.position_rno_seq', 4, true);
          public          postgres    false    236            �           0    0    positiontrigger_rno_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.positiontrigger_rno_seq', 1, true);
          public          postgres    false    238            �           0    0    previlage_rno_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.previlage_rno_seq', 1, false);
          public          postgres    false    240            �           0    0    previlagetrigger_rno_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.previlagetrigger_rno_seq', 1, false);
          public          postgres    false    242            �           0    0    products_rno_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.products_rno_seq', 88, true);
          public          postgres    false    244            �           0    0    state_rno_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.state_rno_seq', 1, false);
          public          postgres    false    246            �           0    0    statetrigger_rno_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.statetrigger_rno_seq', 1, false);
          public          postgres    false    248            �           0    0    user_rno_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.user_rno_seq', 147, true);
          public          postgres    false    250            �           0    0    user_user_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.user_user_id_seq', 1010, true);
          public          postgres    false    251            �           0    0    usertrigger_rno_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.usertrigger_rno_seq', 704, true);
          public          postgres    false    253            �           2606    37977 "   accesscontroll accesscontroll_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public.accesscontroll
    ADD CONSTRAINT accesscontroll_pkey PRIMARY KEY (rno);
 L   ALTER TABLE ONLY public.accesscontroll DROP CONSTRAINT accesscontroll_pkey;
       public            postgres    false    214            �           2606    37979 .   accesscontroltrigger accesscontroltrigger_pkey 
   CONSTRAINT     m   ALTER TABLE ONLY public.accesscontroltrigger
    ADD CONSTRAINT accesscontroltrigger_pkey PRIMARY KEY (rno);
 X   ALTER TABLE ONLY public.accesscontroltrigger DROP CONSTRAINT accesscontroltrigger_pkey;
       public            postgres    false    216            �           2606    37981    credentials credentials_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.credentials
    ADD CONSTRAINT credentials_pkey PRIMARY KEY (rno);
 F   ALTER TABLE ONLY public.credentials DROP CONSTRAINT credentials_pkey;
       public            postgres    false    218            �           2606    37983 *   credentialstrigger credentialstrigger_pkey 
   CONSTRAINT     i   ALTER TABLE ONLY public.credentialstrigger
    ADD CONSTRAINT credentialstrigger_pkey PRIMARY KEY (rno);
 T   ALTER TABLE ONLY public.credentialstrigger DROP CONSTRAINT credentialstrigger_pkey;
       public            postgres    false    220            �           2606    37985    district district_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public.district
    ADD CONSTRAINT district_pkey PRIMARY KEY (rno);
 @   ALTER TABLE ONLY public.district DROP CONSTRAINT district_pkey;
       public            postgres    false    222            �           2606    37987 $   districttrigger districttrigger_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY public.districttrigger
    ADD CONSTRAINT districttrigger_pkey PRIMARY KEY (rno);
 N   ALTER TABLE ONLY public.districttrigger DROP CONSTRAINT districttrigger_pkey;
       public            postgres    false    224            �           2606    37989    user email_already_exsist 
   CONSTRAINT     W   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT email_already_exsist UNIQUE (email);
 E   ALTER TABLE ONLY public."user" DROP CONSTRAINT email_already_exsist;
       public            postgres    false    249            �           2606    37991 .   credentials email_already_exsist_in_user_table 
   CONSTRAINT     m   ALTER TABLE ONLY public.credentials
    ADD CONSTRAINT email_already_exsist_in_user_table UNIQUE (username);
 X   ALTER TABLE ONLY public.credentials DROP CONSTRAINT email_already_exsist_in_user_table;
       public            postgres    false    218            �           2606    37993    invoice invoice_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.invoice
    ADD CONSTRAINT invoice_pkey PRIMARY KEY (rno);
 >   ALTER TABLE ONLY public.invoice DROP CONSTRAINT invoice_pkey;
       public            postgres    false    226            �           2606    37995    invoiceitem invoiceitem_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.invoiceitem
    ADD CONSTRAINT invoiceitem_pkey PRIMARY KEY (rno);
 F   ALTER TABLE ONLY public.invoiceitem DROP CONSTRAINT invoiceitem_pkey;
       public            postgres    false    229            �           2606    37997    invoiceslip invoiceslip_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.invoiceslip
    ADD CONSTRAINT invoiceslip_pkey PRIMARY KEY (rno);
 F   ALTER TABLE ONLY public.invoiceslip DROP CONSTRAINT invoiceslip_pkey;
       public            postgres    false    231            �           2606    37999 "   invoicetrigger invoicetrigger_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public.invoicetrigger
    ADD CONSTRAINT invoicetrigger_pkey PRIMARY KEY (rno);
 L   ALTER TABLE ONLY public.invoicetrigger DROP CONSTRAINT invoicetrigger_pkey;
       public            postgres    false    233            �           2606    38001    position position_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public."position"
    ADD CONSTRAINT position_pkey PRIMARY KEY (rno);
 B   ALTER TABLE ONLY public."position" DROP CONSTRAINT position_pkey;
       public            postgres    false    235            �           2606    38003 $   positiontrigger positiontrigger_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY public.positiontrigger
    ADD CONSTRAINT positiontrigger_pkey PRIMARY KEY (rno);
 N   ALTER TABLE ONLY public.positiontrigger DROP CONSTRAINT positiontrigger_pkey;
       public            postgres    false    237            �           2606    38005    previlage previlage_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.previlage
    ADD CONSTRAINT previlage_pkey PRIMARY KEY (rno);
 B   ALTER TABLE ONLY public.previlage DROP CONSTRAINT previlage_pkey;
       public            postgres    false    239            �           2606    38007 &   previlagetrigger previlagetrigger_pkey 
   CONSTRAINT     e   ALTER TABLE ONLY public.previlagetrigger
    ADD CONSTRAINT previlagetrigger_pkey PRIMARY KEY (rno);
 P   ALTER TABLE ONLY public.previlagetrigger DROP CONSTRAINT previlagetrigger_pkey;
       public            postgres    false    241            �           2606    38009    products products_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (rno);
 @   ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
       public            postgres    false    243            �           2606    38011    user set_unique_email 
   CONSTRAINT     S   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT set_unique_email UNIQUE (email);
 A   ALTER TABLE ONLY public."user" DROP CONSTRAINT set_unique_email;
       public            postgres    false    249            �           2606    38013    user set_unique_userid 
   CONSTRAINT     U   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT set_unique_userid UNIQUE (userid);
 B   ALTER TABLE ONLY public."user" DROP CONSTRAINT set_unique_userid;
       public            postgres    false    249            �           2606    38015    state state_pkey 
   CONSTRAINT     O   ALTER TABLE ONLY public.state
    ADD CONSTRAINT state_pkey PRIMARY KEY (rno);
 :   ALTER TABLE ONLY public.state DROP CONSTRAINT state_pkey;
       public            postgres    false    245            �           2606    38017    statetrigger statetrigger_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.statetrigger
    ADD CONSTRAINT statetrigger_pkey PRIMARY KEY (rno);
 H   ALTER TABLE ONLY public.statetrigger DROP CONSTRAINT statetrigger_pkey;
       public            postgres    false    247            �           2606    38019    user user_pkey 
   CONSTRAINT     O   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (rno);
 :   ALTER TABLE ONLY public."user" DROP CONSTRAINT user_pkey;
       public            postgres    false    249                       2606    38021    user userid_already_exsist 
   CONSTRAINT     Y   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT userid_already_exsist UNIQUE (userid);
 F   ALTER TABLE ONLY public."user" DROP CONSTRAINT userid_already_exsist;
       public            postgres    false    249            �           2606    38023 /   credentials userid_already_exsist_in_user_table 
   CONSTRAINT     l   ALTER TABLE ONLY public.credentials
    ADD CONSTRAINT userid_already_exsist_in_user_table UNIQUE (userid);
 Y   ALTER TABLE ONLY public.credentials DROP CONSTRAINT userid_already_exsist_in_user_table;
       public            postgres    false    218                       2606    38025    usertrigger usertrigger_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.usertrigger
    ADD CONSTRAINT usertrigger_pkey PRIMARY KEY (rno);
 F   ALTER TABLE ONLY public.usertrigger DROP CONSTRAINT usertrigger_pkey;
       public            postgres    false    252                       2620    38026 (   accesscontroll accesscontrolltriggername    TRIGGER     �   CREATE TRIGGER accesscontrolltriggername AFTER INSERT OR DELETE OR UPDATE ON public.accesscontroll FOR EACH ROW EXECUTE FUNCTION public.accesscontrolllog();
 A   DROP TRIGGER accesscontrolltriggername ON public.accesscontroll;
       public          postgres    false    274    214                       2620    38027 "   credentials credentialstriggername    TRIGGER     �   CREATE TRIGGER credentialstriggername AFTER INSERT OR DELETE OR UPDATE ON public.credentials FOR EACH ROW EXECUTE FUNCTION public.credentialslog();
 ;   DROP TRIGGER credentialstriggername ON public.credentials;
       public          postgres    false    256    218                       2620    38028    district districttriggername    TRIGGER     �   CREATE TRIGGER districttriggername AFTER INSERT OR DELETE OR UPDATE ON public.district FOR EACH ROW EXECUTE FUNCTION public.districtlog();
 5   DROP TRIGGER districttriggername ON public.district;
       public          postgres    false    222    269                       2620    38029    invoice invoicetriggername    TRIGGER     �   CREATE TRIGGER invoicetriggername AFTER INSERT OR DELETE OR UPDATE ON public.invoice FOR EACH ROW EXECUTE FUNCTION public.invoicelog();
 3   DROP TRIGGER invoicetriggername ON public.invoice;
       public          postgres    false    270    226                       2620    38030    position positiontriggername    TRIGGER     �   CREATE TRIGGER positiontriggername AFTER INSERT OR DELETE OR UPDATE ON public."position" FOR EACH ROW EXECUTE FUNCTION public.positionlog();
 7   DROP TRIGGER positiontriggername ON public."position";
       public          postgres    false    271    235            	           2620    38031    previlage previlagetriggername    TRIGGER     �   CREATE TRIGGER previlagetriggername AFTER INSERT OR DELETE OR UPDATE ON public.previlage FOR EACH ROW EXECUTE FUNCTION public.previlagelog();
 7   DROP TRIGGER previlagetriggername ON public.previlage;
       public          postgres    false    272    239            
           2620    38032    state statetriggername    TRIGGER     �   CREATE TRIGGER statetriggername AFTER INSERT OR DELETE OR UPDATE ON public.state FOR EACH ROW EXECUTE FUNCTION public.statelog();
 /   DROP TRIGGER statetriggername ON public.state;
       public          postgres    false    273    245                       2620    38033    user usertriggername    TRIGGER     �   CREATE TRIGGER usertriggername AFTER INSERT OR DELETE OR UPDATE ON public."user" FOR EACH ROW EXECUTE FUNCTION public.userlog();
 /   DROP TRIGGER usertriggername ON public."user";
       public          postgres    false    249    257            �   W  x�m�=n�0�g�0I��5��%薭�A�T�i��( ʧ'���)�R�K��E���?��W���z�LI��C$����#��;ϨW翷8��/��n�����"���(��z��(
h��%�!������Qp��N��d�=H���ѓ��s)��9��?�=&�g;m���ӫ�^L�P�
�w�'��foq$�lN�	��ú�J{�F*�K�3_�ﴝ�v~h��ۡ�@�A_�+8"�pWf�����G�y�x��5;֯v��L1_��
.G�̻���Ԑ���`���3L��
m��Ĥm ����g�����
E���Xp��Z�����6      �     x���ˎ�E��_�P���#w���`v��Z0�=��`���*f���Fɸq#Ȣ�?!�-�~�v��?~���֯����%�]��q�L�?��7~"����_?H�]�f�5�F�g2�CZ� Őc�br#Pr�����9 �=�]d��=��OW����ƺ����*��{�=��v�[�c����1�c��iڒ�D=��(�xD_H|��4���
���")��V��J'�NN�x�v����!�;�b�����R�<H��zE���2�v퐶\^S��X3g͝�{/W
���qI:�J����W:I�A*���N��cӘ�����s��<�4�j�LT��g��vM2亂q�q��]��� ���h��Q
�-�l�UC�e(��!�D®��B|�k騴�߫�L�2W5DW|�y�뉜�g#�N�I,�kG���am^ �I%{�������P(�����5d;Υf�L-R~���3�N��q����D���q0�b��<����M�vηw�ON���<o�����@�,����K@��N����LH��8�X��4��<���#��,��VA8���/ʹ��I��uB��$�ELO��"-lTȬ��y�d��6e�F��`���#I���z�!�8JJ�<���#h�Tsk9E�_(?6�+������f��ۇ�����X����6Q�G�D�+2��h �d�Fډ�/H���*kjd�d>fd��L�ȝD=�=9�N�� �%c����'R_��IE6��,������,�%�8K;!����V���󙷑G�atW��A
�N����8���ǘ��\O ��;'嗫���5J��tR�HFظaʶܲb�Lb��RI�ȸHz_�$�զE�h�L�W�5���n���b�%H�/+��0��J
�T6X�w�1��)u���n^N
q�m��>�3%���x�Ρ+>�54�}AbZ2�6l����('r:Qri�c�rJ�u��|\m%��VPcVZ�ų�iV*���8��&1>�Ә���a�ͥ4�i�t�C#K�Ԕ���NH��D��<l(������P؅a��RX9Z�a��%���D�ڥw!��M�Rh�L�j�ۼ���#a*�A��$�GG?���>��Z����m:�2
�J ���������&ih��J.��Wp�-�1�乗M:� �k(���ѹ�M:o'���Z
�I!��F'-����=1��$u}�?��9Y��R�|�68���4�0�������}�'�Q���nT"��f^&q���{}fy:�G0�(�~-�p�>hf]$����q�k�!�"�}�g��˳������O$�`�����^o���wy���)~�	�I�G��H~A�����w��t�&�D�.Hf�A�}��}�z�,�p	l(���8C��Qe5�N\�����(_��v�Պ�{������d�d2n**�d��6��JJ�HA�
%�H{ARsĽ��y��̓�<ZK9��R�\\�(����)��Z,02�P:Jkg�VG"G�!ͼ�`룀&}T��IIs�<��M�0�ш{��x�d����-P�����t��7����O����	Z��q+�i4at����O�ła,��3�EQ�6J}<��>B?X���H�,uA]�%4�up�%��~��ŗ۷(X�-)r�"yf�_��(�����H�Y�>�!u���?'�_%-�Ј�QM��`zu��|���W#�V���4���>G%�t̒�f�3�J����a儝�厝�Q�LkaY�I2��8�y�&��0|�e5�:K�q���j���f簶xP~�����s\\r�9�T8�YPS��N��&�.c^�jn!��좠|�����E4zd����'u5b�1��Ʋ���[7�ޑz�Ȣ��b�;O)��EOh��v�J�Q@M�;jO�<j�yMSN}�&��(n�d2t(i��4vz��睽��_�a�Kt-IYF��d���4oX��]X�`���%)-�޲����zf�?(}��vVV��P3Z�Ԩ<�Ӹ`�~f�a��S���dU��n�gJl#�'s��e�W�/�'�Aw����]��K5u;�Ԇ{d��������6�R      �   �  x�}��j�0D����,�����{)��b����B��r�0{gw-q���m��|n��u�|o��:����f������H��w���27���*ԏj&�Oj�C�'}�`B}KL���hB��ޥ��E0hCI�h�7��2�{J/KP��D+$j!�5Q»��0�㮩Li�ټʈЛ�'M���u8������-�
�6"�d��&C<����8�4�lJ�{�Mt}���z:3���}[�����TG�@���n�?��8X��׃2m�R^�RJ����e�qPfr'tz�g�%�PF��׃2��.D�����F§1A)���PJDQK����^��Y��b[�}������� .�r�㠵ՙ�zP�.#�9����L�c      �     x����n7�ף��TI��f�]wSt���k���S��{(�Ĺ�(v�@6��R�K�����?�������a{��������?���M�{��z��������r���ǻ�m��[׮��7��l�[SѤ���*;�\+ukɾ���v��d�-�/w�^>�?�H,�߿/�_����,ڈk����f��ΞM���]b�eu�������i��e{���������s���`D7${ipHf��-m���_F(��	UIā��2��]4�F8��湬�^8W2rjl��".�q%LR-�n���k�����(��,~#�Pq�̽U"�H��j�IX{8�ÑL�B��d���,�6b���Z#P� �=���xD��2�y��������ot ���n��H �tS d ,��@VR�&�
@���zaQ��*����hT�e�b�]���f'8��>�Slo_n?3ቢ��m�د��H��R���T�(4+�3U�o(�mOR��ȹ1H���lE�A���zb.Nf�^<	o?�F2օcM����Q�E��	Z)���DY��I�f�p����g)R��ϊ߳<�ߊ��ՙ��Rh\�fGt�RE����X ������(�&�=U�~�j�+�RG���Xn�+�Z�w�3kt躗�I$�3*�O�Q�ƺb����<�GYS���\�+��Ugu����3 |zF����)�u�aQQ��Q,�>v�;ZiY�+P(mP�e�s]gX0*�E,)m��(�u5J&cd�(#l����0(�$ivth0�3s�3��Q�ݼÜ�s���"esN��2yq������&s�BEmp�$m�2G(��r�w�-� �{��,0�k���bG<>�3�!�d�ƚ9C��I
Ʃ	Ṯ�3��T��^�'��e��;�g!�P�&/�qv���l�W炁��欢 =���8��.m��SɆLG;0�'iE�r	Tx�
a�$.|�>�eF��[��i>,��,50(
����&�g��Y��r]���X%A�me�[/��l��W,�7D�զ��g�e��U�j�-59z��t�"ӈ��zJ;��o?1mc�OM�h����Ep���1Q��@\{/���(cT'F�OͿ��5�/�:���DEbA�6k-y�N&��V\����M�hhZt�|Cr~�����`c��%���j��W���8YK#٠�3@�6_4�O��iu~�P0C�(�=C��
�Ϥ��v^�'c�T���1d�́I:/֟sj6sc�ٌ�I:W�O���8�f�g�!:>�)�e�+n1��J������I����,l4^�TBfJ�� =�����M��>e����Rj2�x��ر�)���h>>V(6"�c>A�3�����e�����¤�㣛EiG�sr$9>V(�\����4�3�g���gF̎��H����ݳ�˟'|�-K�<�>�A��"�CB�;���.z�d�<N�\���i�J`�=���*�ek>�r��A�ju`ƨ���X��u�p�~�` �1D/QX3̠��5L�*�/��M�rJ�*�      �     x�5��n�0E�寘/�sفV��r�YD�����v#Z���u�ٜ�-���rBYF	�tE����_g��,����|���~�eYU���A��N�����=�w���2[��ʏ�k߳��c�h?�x>��N=��
�U�л���s̞i��ϗު��PY�T��<b���Tr'�����Q	߃���g�$RI��(̐J�
,�;����O7HD��#��c?B�ُ�ȗa+�ؼj���q\���"X�{����3�3Dl�{�<��U"�`�ZQkq�/y�D|��4Ԯ�:^�'��� �.���7�T�A�Ԃ���m�)vt`o�Ld�C���p}���4偌#_�)h>4���_���!��i�ڀ����B����1ťb�N�/�a�b��A~��mǵw*E��O22噧	�PE�4��,X��"����A#��T������)��
����Y�5=�!e�y�&�W�|�%W��5�U�:��Og"v5u�K#m�k�'�Ê�Ƴ��[)��R�.      �      x������ � �      �   ,   x�3��H��N100�2��H��ɇ�9�Ss��sS��=... "��      �   �  x���MO�@�������7���K=4�ԋ�$�&��(0mA�&M��<������y�����B�j��" ������{�����!1� $ �A�h�2Sc���c�,��X�d:��L��"`;F2)��#4�8~����+y;�OH�d�%e2�����ӷ��D#+��sq�C܌a�"{W7���<r�J�dl�+��*׌��I��|'P����Aa˦�R��6GlK8�p*��� -���X��ɀ��Ѷ�8G~�Y�������*ǚ�!K������MSt<��a1+�����(8 ��j�A&��?y�#a�Lf�bG�[p����d��#qu����L�d�|SZ�c��l�A����&P� q�0�>��A ��Π3j�Z�&^c�ڸK�(�v���      �   #  x���1r�0c�1*pA`���'�̑���h��4g��J���B:����?o�~oe��hݷŖ�w~ֽ��Sj�R������A��vP��9ĐD1%�/$�M�l���A�7�n��XO)�1O)8��m���L)��%��n��ZJ!���|��W����,���Lm�@V�K̀�hV�	@Q��:�a'�$ ��*	 ]�&	 Q�"]��j�H 5 \F� �Q �dS&&�����P� TF� �Q:@eS*T6�r@eS*T6�r@e7@e���+&��0a�+&��0a�+&��0a�U�&L��0aҥ���7W
:�3j+��C8�m@�F v�@mD�����`x��w���s�G�18����/{�Lyȏ�������XB�xx�*9l"���l�&(,#{�;�c\ �CdV"���@�?r�����3�̩G���S+�	�1_�;�/��	��-]��̎�Y�uҤ���ꉓOہ�ǫ?�T9��lKo�3;8�Bs z�6N��i��z�~&�<o�-.)�Ŭ��u]� �      �      x�3��CA��F�Fh\1z\\\ �	�      �   q  x���;�%�������7�a9P")�{�����}��H[;�3C6��D��k6yN�X���@,j�}��߇�>�����Y���U���ެ�,o�K�=�7ǐv�r#ڸk%ճ��n���5ך�ۃy���������72�\R�1�ݸoTz3K�Ͽɍ��N+ ��qk�$MJ"�
$:�b��l��4N���ш`�7Pr�Dvv4�0mEHrMT�a�k��&�J=�N���ʦڹ Ӯ�����+��[�|z4�f���[.������R�/���ꍺ�Ǵ�]��A| �7A.��5�������^�*;��յ嬉�����1���+��SOؓ�i�$|�S�n��N��j���yN�
�R���z>A���!�D�$C�5�9�`��;�P��PE�vz��c[�L�I�I��nl�q��I���q��a���^D�tH@���~Cx�E'Ց�p����Tc��;�Y�P {6 Ϟ�ߔ7O�[h{�������ww����}��?����?~�qt��'m����S��7�ᜑ� &H���ͷ��7�=��Ҡi����β�Ic�Jgj`s`�O�ۅ����ʟ0m�6HKvF�G�z�Ԟ����Z��Y�ӑ-�Ғ��<��C���'�U.����y!�}�&��3��W
��!����or��o��f5�(�vݛ �!l+5��T꧇ E�袼�)��.m�/�*�����dw!Q�Z��iz�!�a%�T�#ȅӤ�D�j�N(>���� f�*�/�~y���#$�*~�)�����St}��b���	R�L�Z�!<>,/X�=<�9��j��=p}�����7��E|���۟��<��V���?Y���A�o�H�53��Ԃٟ��h�=D���i��L��2ҊI�Ԃ�qjީ{�����O�u��Y2������3r#wף!��8���cL�粌FZ?rJ-h��k����6E@hA�ܖ��+w�X|�A�ܗ�H��G͚z���U���X���d-��F0�c�VD�d-|��n�����%��.�f!+�z��,���6�FR��eY-Hлpm�YK{���'LIڧ$[ք��4ž�4�p��#iKbK~D
~g#�o$`m둶��vӲu��A�z$�9v��������#uO�5{�Q
�v�.��/�
V��Z��F�`��c���tl	��l�G��c�[.D���K=������!�8;S���9�^Nj-g���#_N�-�Z���,Q�-�Ґ��7N}XK
��e_���y�~{|i˾��}�p�#
��e_�j^hc5脂/mٗ8���]5F�&
���$p��'B�J|i˾4�c��~�E����K��٫�|i˾D���Ȯ��K[�e��b,L����ˢ��^�����>��]n�7)�7�o�.����i?�6C����ﲨ�̽���]�]��{��tg}�E}�l��A;�,�{goҥV;�,�x�MuC���1aG�Į���Ζ�Y�~&	���������D��벾�<$�{b� ��,�{DE<9�.dS,d���e"�'���t�,%�.P�Mh��M� ۲ u�M�!�	VRC����q�YAP��ۢ���Ɂ X�~ � �(������#4�!x���]�J�����q�E��l�[����2�c��|?��`��������O/��O��sUߑ�Ċ칲��S�e�T�w���3��v,��T~G���S��vp�T�v���3��v,,ϔhGر�<S�a��L�v�Kp3e�v�w��ӎ�cyy�P;���]b��b}��˩r�;��f��v,��d/#�X��9֎�c	n&3a��Lf4���S��v,��dF#�X�9U��ci|�T1��S�;��.�e�>�*���c	�b_�f��r�;��.�el2�*���ci�b_�6��r�;��/�e���}�#�ʩ#�X:�X߱Cb��:�ë�K��;vIL�SG���S��v,�_���(1UNaǒ������S����z��lEu�}��:�>[Q}���lEu�}��:�������c��Z}sl񘪨��c��Z�pl�h_z���1��j�m{C��F �.`_�/�3�6ޤ(�`_�/�3��۟ͤ�����~�Ο��slQo{!�t�ıţ���S���P�*��?;������N4�!l80�$vat]��2�6�,$`���u>~�����Ϳ�������f:8;�M�3po�f��(F��&�^W�����m��3��H0No�h�{��u�@�`�Y��{G�ʪX�q2��.ëO7Ҝ�� 瓑�O	ؿ��lh~q�M�a:7�����C�D&2��#W����W�[G���=ʛ�0�z%Z<��B�}��2�@��_DJ��±od���Qo�[$8��̸�%47�m���G��y���دD���_�U�/��,O��z�
a���ȧwx��`��������w���[m�54�\����z���}�����YSRn�������5�J>)��sG�ּQ���i����E��yB�i�������G�(����O�||��D~l�ա{���*߭#�5���4�/)Q����Ʈ7���v�\�c���[�`����G��1�/�3mޟ`��F~Jc��p����:����M�V��
���o�?H���'�צ�y��[�^ɳB����3s�{���l����k��ک�N�v���)��ֵ4�q������1#�T�L<�j�p��+4��h5�J0+����7�wm�~��پ��B����7��Ы/��B��0��������i\��O������y����o���Z^��E�6#1�9+�/�<�?G#�in��|����a�����}��oX��/N�W��Y��^Y�nK)�����      �   J   x�3�4��M��LKL.)-J��".#N#Δ�⒢̤Ғ�"��1�1griqI~n*LȄӄ��$1-ʏ����       �   <   x�3�4�,.ILK���̼�ԢN##]C]CCC#+#+Ss=sCc3K#�=... �pg      �      x������ � �      �      x������ � �      �   j  x��S�n� </_�K��v�,�	�TUϹD��XM+�����#nܦ�����ƆAs�$��B��KX��W{�󹽆-��­`~3���]�#�̟3X�F���ҷ��Y���#�F�EG�X�H�\��v���|��.�S�jJ�wkr+C`KuS��?����s�r-���lY��U+���f�M͵3`1�Y���l�#��J�Ҽ_|��lS0|�k�(�T�(�j8��DP��0g�d�6e9/Qb��:��cV�K۝�Q�2*�^e1�^i�v%���Q����־{����odZ���I�
����#��u�B���A�q�2����&^q��s�d� �W?^Dz�,����	�      �   �  x����n�0�����6�v	�"BT��洠�I�#c���3��I*}+����

q�x쌣�v���u��C�(����A��>]�"���D��,�D� ���䬰�s�gc�{;�ȉW��F#�"��`�4G:�ɑ��-��d�n4��v�!����[�P!�<C��^��h*0E���H�.b
J�)�(zGWY���5J�����L��Ω�d��C������=�STk0�e�f�M��S������;j�ڣ������_x��d�{u�g���x�QS`��i�<G���q(p�������BK��u��.���=|���z�mкS��5�c����~0��Mw�Xo��&x�'$=�{���@N�05(x�+�����b��&�      �      x������ � �      �   �  x��Z[O�H~�����Zs�>~j([���
��J+����������sf�]��I�j�cC&�|�!�lù����2+n��ݒ9cV��;9��㌃�3�����g77�&[>��l�N���2�X�c�,n�gY����/U×j&�Po8�~�y�L�]"��ܰ/�j���9~6����ڨ����+��ٶ�[��b{]��\W�z{wS������g���}����j��E�9D9�)�m�;��[��^O����)������I��fl�~��l�Q����M݁!�E��z
.���H��P��JJ�f�Me�O)��XG�O���T�f�7�M��\�e��\Y�����Z��-;-6�u��a{�f'��|Y�Z�F�VӓluC6yg�`6�.�fS���.9 �e��i��~�j�^|�!�T�T(�CJ(�w틘�!V:ʟ�/߆��ILw�N�I�wN�P>�͓i�A*�3 ]�*��(����~kDjw�l5�*��I4f��f�?���������3H${>�	�J&>&h�C1�)�o���U5��!A?> ����-[g+��/	h�S@�<p;8�� 4� z��l^���_�<C�G���QlNRX��Ug��Qy�R�%y�5RAA�5���I��9�c@:�2�@W|�+������s��l��?=ү���,_/6�^�E�-^"�l�~~�/���*[.X\��9��1"���qM�A��t"FT.#q�GUGK:��v:x�N�ŷ��Fh������<x/��}���l)R;�=G)J8,��=��W9AEC��4N=���^�v��>�"��Q�ʽ�ݢͮ���I��B;�9��N-�O!k��>��d�ǭ�wO/B�p�X�TL �(�A�ͅ5��u�W�4!��T{̋�c�+/VkR3B���ފ���Ȅ�x��,�1�򸉆�dv���7�zߠ���q��Ձ+�^ؔS���M�����9F�W�J�+�y��ʲ$��
�	�Fm��q*)7��F�Wa�D(�(ǖ%��cL�G:U2�R��kt1ZK<��=#����Hb���Z,y���١xd(O-��6�F�~��,+R4�q�D���*N�b?�aH��R?*���)�'F I��h*�"&��Z��W��@c��\�m"=����jLu�Ɛ��+���Ď�,4F��֜�w4&'6U:AUf�ט�2!BR��Ñ���m숐X�m2�^J1���K�B:Jg�05P�7R̛�zj���Ǒ5�*�ee�P����|�6�xbTC�P�{yм�F��G���i�|�8��cu,U�����~�����K��ih謕���x�[o�Kaabʨ�#lc�5��
��d=��x�2�*�_��	�4�%�<&U�p��>ZQ�ZQ�a�󴦮eu�x�I�A����V��!:�]��x� �����@α?��4=�q�|$V�'")�-.zƐ�2����\��Y�g!�Oz�����h��&�8�y����8Ŝ$l�������8t5���l���!�[g\�C�U�����H,���G�1��7ē�ˁo�zB-�~�*��ap��{��C�<<�����ƴ��ui�`�?%�IH0�x%z5�e{\�m�P-"�^��I�S]OOa���Elp���x�����g���'X�x���d2����L      �      x�՝[�\Ǒ��K��`����У`��ó`a`�f�V�EZ&����~#�T���U�u.UY��"E��߉��q���᷻�~�闇����w?�w���%�(L�����?���e���"�S�7 {�=�@)���9����y�+M~�^p�5`�%�4�$��?Cy��x.��?��='(ob�c�CY$�x��#�>#X�J�=b@�J�C�M^������*$A.'f�"3ew)�JA�Q p�Bux��S���_��@8*�=��Xk���$�)�Krp��ǂ螬�V&v��sA9�8�[� � JH�>�w.�O�Z {d[�����(�{��Q1^�B9�����!S��S$WM��D6I�T�T�I���Kb����TH�%Q�Y��!� H,�#��)YkN)��a������w����'V=�<�D�D��U�{ΪHbWH��w�WB����ޞI����\�~�Se8!Bg�%������Ja���G{~$�S"��/�lB��\�s���jVJR �f�
iE3�J��1�����S7�B��g�˗�)F���5��:�_�)��+\��S��R��o݈�����,��b��Jq5 ��v �)P	|S�&"�w�L�g2r��Sf�f7�1��Y_��g�������#��0���/��f�<>WI����= %D���G��א��)1b��=���Q+׈��Jb���G
"%����+�Eg��)����~9�}�q��MM�aгR�Ϸ��X���E�8et]I>����8*���j��S��T?d�C��U��CQ4W�O�ȏ�9i�>������c!�# L~<�W��|"�����uA��?V���7g�����'{�PU���WV독��P������>��1��� �:�Y�\	��	w��Х̫�'�P����Q�s��kd7y�1��ʯ�1��pqc@�2O�^T�A ���?^֛�����rE��>��/��V㴺�_J�Z��|�E�ߐ��|��������,��G��C�����C���x�=�R�pZm�/;�-Mo����oi��X���o�G�y����yu�Vݿ�u�Ґ��ґ��7��Ko��P>5�sH"��Ґ�P�C5N	cv�G���ycu.���W��=�Pj��<$8�������}�j�c���<H�o�!��ėBI|�(�>�)�)Kt�����Xt��m�A���yHph�� ���ߐ������|s���z��h_E�?xU��|I9&W|e��h{��Lb���	]e�M��N�/C|����1vb/e����Է.,��]��^��ʞ8�hސ��WCb���e}�j����2��g��j�p�U3N�2���2Hy�*7�R\��,L|%d�Cu����Ca�o��|�|���5��(��2��K�33uHfz⫡���~�磨�G
\k'uT��b�+僂�^�|CR_
�����uHeS�P8W��lH���^����2R� ���=�!
���4��0�'?�
��J��J׫���P�_?;q} k���(� �8$�1��o��J�H�b�ٷ�!Ɂ��FT3�V���(=��Ί3���q�"i��0t^1�R$��8)�_0J�X���Q����(M� K�c�8�k䀠� �F+���k��m��Y������!�X�1�#F�#-�U�� ��#�]��w
 )�U�:��\��%����Xs����M��$��#���pHJ��--cSs�䟂8H���
*�v3�AzZAA��ւֵ�l�LG�WO�C|��%[�y*	ݸ�}ݗ8�� �"��^=��+��A�jP��W�$�&��L�{�td�Ҽ���ݶ�	�i�1�~���y$���������ݧ����/�������	�펟��i�~��y��w�>������}x���o��O�"x1�����l=�d�#7`ǥ�/���m��ŌK�s�@�{g�����#���_0�Yr&��hM�)~�͖��|֣r���E����@b��>�.�c�K1G�Y�.�N��R��]�r���T�b'�G�;�u��J8����c�P���5D����t���)W��� RM���Zl������)��5��&R�d���B�ۆo�*��D�Põ��'|gЮ�x--���>VG�CV��$��g~�c'��$],��r�YX����zY�Z.��Z��=�6��M�Yr�n�X,��̽�"h�	g
�����bZ���Q�H7��f��J�.���Y�P�mG�q]z��>nu��a���&��$^��;�[[�@���*[�C��OAoZ���+I�$���Gv4��7������Y��qZhy<F�菩��w� �0-a��A$-��(g��MN5��6�]�;���0��+�5P�˵�B���ϙ��\����&Z����L=�W�}i�5X�V��r�N�qj��-`����k�B��Q:����l��=�p*�1'_�M���=�L�&5o�:c�z�A&�&�xn�B��]L����ԪU��A�Ѥm�xQ��o���K����U��t�Ԕ�ab�Y� 5U��@��6�˘W��?��@m�H��);��T/��6P��I��+=QY��q��r�p(���H~뮍��깁�� ��=�q�DA%��Xr'��/�4�s$�6�"KG�g�8w��{�����m���XFN��<����l��{�S��
Ls���_	Y}�::�|M���Jm�^�N�Z�ö��9ϑ��7(�衸x�P�W �j(0v��5ą*��KS6�B+�i]+������T�ag:�#wK]8��5D��;�v�ȍtNo>Jj�P�J�������H�GCY����ЬVȹ��h%d
�n�\e��m
�f�\��H�5�.��5X��IC� �����;	kUn��/��7!Y]��:.u�%(��c�b��Q�<�>VBs�"�N��8�a�8�N䣮����,Ӓ�ck��^�B�a����N�I=v��dhM���{���Hn�N�_��_ø���%_�Ĕ���0ꅳ<�}�#��a�Zuu$�o�a��[�Z%gf[c\�^ʰ5r��p���e���%'���8*�f����kb?]�qT��K��T�3�	�z��P�-( �W|`��$�f����	܂?S�խMgS�-�3��v��At�[�g�9_`�>�F��f,�6�NHOΎd7I�,�jH3��&	?� c�V��U�t��(Ud�b��]F�"#L�
�tWw�,����ᩒ�O;��;�E0]��9"^����J�	��F�ad5���L��;x� S�;͠v�`X�v�I�YRsr��$i+��YR+va���1�l��'��9E�R�/!��y��Zc��MBj�,_�+�V����M�u����S,���v{�x�fs-S�����P	9v��@\_����;�_���D
b�:��
[;�ڡs�R��&XZȂ~� �'����"�|�M�4�`�V:p�\1섯it�gbE�B��}�8%d�`l9� :�3�O�,0K�O,��Y���u���M�����$��P�扤Z:.���&N��1��	t�����0�ٙ��8�>��o�`.�3�N@��TK^�ww%����<r����#�,r3P���\:e%(C5��Iz�@�r�v���)�b����B�{>�R�	fp������o5�sh�9	j�IrD���Ѯ�.���Q�� X�S#����W�~n.���(u�l>X�]g�H��
X�2zL#>@��R%�o�4"�3J	6P��iu�g_�wӈ�����sʝ}Z�GV�Y	g���#v�y�,��[�e(`��ʁ4J������w'i��k�CLP:�s�G����c0_l���m۽`>�(=2��B�.ΣI6k0K)�c&�S$�b��ṇ<�l�j�:�<N�`
 L�c&��$P�?��4	֠�tJ��8MB$S��X�q�����!�[��*H�L�Q$xHQ���c̔M���d�&�    �vC�ΉSF=`m�E����i��pXQǹDp��% h3NYL�p��me��հ�� ��zq�<0��W �%�XZ ��tZ4�}4Z JO(����ʁ��?��&So���'PQgV�����kb��Φ���}ݤ,m�D�ꑔK�ڳ� @g��n�b�z�#k��*�D��:�fzUmTE���9�d��)!c�=���s �7/�vuh��#h�6���8$uc30�$@ �՞�B@j�;���<G4� QO!N��Iqd]���9źc:M;GVFO�jnf�VWꂎ�y m7S�Q���u� �bv�9�&�������%U7��^'�4�8v��Υ>4K�\�J0r����J�À`�<P�l][@���-��Q�6��f?'N0Z1�� �q�F�b��nx��%:Z/3I����?Ea�^jsi"Rf�y'���UG��P�:�`�^jst�@�o��Rk-*h]�.(��Km�O���8Z1��s#u��	G+��&�R��#�ъ�X�S��s��5��NѯY ���r�[��	%�b��:��T	��v���.3��@hSVJ�(w2��@���@�63�46X]���i��mf�Kil�!�͸D���M�6�C���;Jt�+j�ۄ\�!#E'B��ER'8O�6X��1�Xc������`�u��`9$�E|=O��%U�>�t���6��yl�c]�ɯ!�.!L��`�+���O�^�L��͋5u.m�A�&�b��v����h�X�l�E��xȅ	��J>� ��^[��Q���C�K8 r�6��'r_0=�ȟ�B<侄�Pb@��� r_���� ��7���~ʐ[���_�A2@��7�]�;�U� ��D��ab��Hh��0��?͖d�Fy$T�&!w2�2@�<�*���[�4�D�[b���$c��5X�qJ��1�e@h�P�K�?�$$e@hm"D��, ��1$c�=��4�@餡�(=#d�(�)}s'��3J��?s�N�?��M��2Ūx� .��=�Bw�i�v�ՒE���?����~�'X���JO������DK�_c���k��l���N,�&!��l�E�20�N48�=Xc��@By�]qO�6x�ߐAy�]qO�v7zɝ"�<ஸ'B=�8S't���H���s�"���'B	R1���(_�̠�XS�����,i��QX�:�����I<�1�Pm����	��1�Pm�/IL���<F�L�z|��ǑS�`!�8�:E{]B�U�\a'�G�Ps��=�nkI�47*CbnBՆ;Өi��� j�E��N a�)	�W��Fv�OIx�-ن:���x=�%k�9��V��o0��ٴ�R��q����}�������'Џ4
>|���ӗ�`-�S�j꘠j]�${�4�>ǧ��kj�9�R��KP�QCܽS�y�dO��{1ߞ������v��}��_���lm2�K��^)����ƺ�s�&O��A�
������iJH���
%�c����<h#t�d8�R>�
 �+ه�M����yۭ�*���յF���c��3b�&ˤ��v&�|C�έ��S�s��I:�;����
�pk���/�*$�&�R���9�A��@�N��8��!W�����K�\�[�(��e���r� ���?na�BS�׮Q��K��懱Y�GX��0K�C�c�n����N��al��5��G!.8������9�Xjo\p6ҹ�5���\�8TO5P�S�X�_�8TOM�P(��~�c�D&X����?A�q�v��P���.�(,i~A��Q*�7���]�Q�Z5m�������g���*������_���7���/�'���������?���?|��������/�ӻ�޿�}������w��/����~׾@������i��K1��df�ݛ�r�R��yb^٫P��τ_x���T���S��~�i������2�ۑR4H�}|�����?������٩�#^�n�Л� �������(�Z�d�����a+T���>�v���3���xvN{A�������>{�������}~�Ss�:������1�e�^�OX� ��������q�ȳ��u��~���򴗺}C���C����Fr2��V"�3�/xc����l�`��Q�O���ş
��oH_��!Y(aX��"}� �ETS��I\�"�b6	V,�/{��W�/��uS�T��E�A�:cu��1�L$~n��c����E�$�ў���|S����2Ʒ?0]̹?�!���g-��ޟ\oԿ?�	R��|d��|�K].�%#ݒ}>6ߎ}>�o��V�c��g����핶ϵ�˧/�����Tѐ�y��t�q�Xq�\K�?����ZW��n$θ��j������_�A=i�D+�#�P��߄�Op����k{�s�?�n.a�)�E-7�)��p�f2�8���
�����5��P�\@�9Oq��xOq.�����nra�LOq.c�Oq.�M4�̅V�<�nr��ROq.,�W"� Wq%rZ��H*����=�vc'o\�^�z D���1S�c����i\�N���5H����Zock5d�,�bJn��ͨ��2������&�=KJ��=&���6��y�L���_��Wc��טg1/cD�k5f��<Y�|)�݋Q�/_<�?���ڑ+l2W������vu\)Y��Q��4➇�%���߲-Ǿ�dE��}�l�d��y&�D��/��a�>.����w@X�����s�	�]�v㪿�P�g�����il�b�1�=`��]����b`�<W{*oi�10P�{�'�<}�=�Z��oi�ER���'0�b��+m�~���
�z��2$0O�l�E�:���v���;��'_k�q>�d(�5�-ߓ��e괼
M��ϕї%�!�Q��-��Ժ�q'P�>����2�ˀ�+�	���a��ġX�#]����^�?��rM����Iҳʿ�MH.��o�F�ծH����p)�i���B�Tl�L�ع[(olY�Ow_6���lC�"�)�,й�G�Z��9j�b��@u %���)�[ʅ�XJ]�r;�e��au��0Q�Mm�EM�lѭwC���7D,��A����Kl�XT�Ggs[[aO�E����r��sT���M�!_i�S謇|�`�	)����]�Ww�N�2�,����hkqٴp�X;AP�=�r�R�����d3���2T��Ӭ��;��/��H���o17	R�	�[�n`�=���L6�n+yQr���N�InA�)��ߵ��:�w#��r�M3�Y_w'�#e����% ��_�i���Xbtu�R'ސ��������_p&i#��v9$�OF�%y�F�m�x�F�$����t�[�	X$���L��܌7���m'��n�u�=��(�"�+�nC�)/R��;��m(��k�n��h�t��p�4Kbg��m���y��!C��Jޤ.�� �s��O��.������
Pu�7�qT��L�k����+'RW�ʕ�+qo~�����Օs	����Vz�q�x�0��p&��$��P���Ǚ�|��Ǚ�rM3���*ܙ���zKg>A���ҙ�upo�<ܩE�ڽ�3�q������N��-�	=������b<�wx	�L��Ly�1_�0w%n����9̵���9�쵼i]gv�c�5����ŀ���0	���jU�>�
h�%W�2`�ō���D/|�:+�nδ'�%���� ���j�m���g@�Hx1$�+ҁ^��k>Ì/}���P���Ǚw�a}������鴷�d��>����������׏���|����ϻ�>� ={���_�=��}�x�Ow���Ǉ������*"Y.��⾠�^��& ��Bf�t�d�V	���v�5e���6=�"�ɫDs�}u\4�f���B�)��IV��%���fJ�>W��W<��5늱���=��<�!.��C��c��:g
ʤ�DF�JFWYMG���Q(j�
\\Hx�;Z����1]\F��ʨՌ�]�<CF*�%R�[p��v�P���ޫ 0  ���U u��׋D�ꀽ{�R���+a������&z�̗��0��oǍj��*&ҕ{z�������y����ǹz[�����pN�I��`�"�f�-<X4�:�$�tw�b�s�^��G(6����}�����
^�=z8ًbʯ�����7�6=���^ƯF֝;H���G�"�,f�귀UL���XV�b��"��#���!��-+<rWصK�P��$lc���l�7]�8=�4� ���!o���#�!����SG 蒛�k�4c��(�?|���ǟ���ӛ?�����i^�6�o�>���3Z�������i�V��f5d��%G/w�?Db ���zo��H������6�ֆ>q��`_��/w�����_�%�?���9,�����XT���5� o��n��<;��}۵m����ċ8 _���bN[�r]!4խ���%��o�0�l������C����6hW���
1�$�!��:����|K�ⷙ%M����%�ڍD}3�k9��=a�@v�1���}���ϥ5�L�ʦ������:���(����ӎ�T��8��k��?[1/�"��蓤ʞ$T�\ERi��hI�\�O=�T^w����'J�>t	YR-��iT6<OA��J��D�M5��yқX-`Ц�������Ǟ8��đmp�q��pq<1gu'ݎ`�M�W�q�ە^�sѣS�s�I�*�W��>�5&��Z��w�$	3��@��qyd{�ӣ��Ĝ�a���g���O���Θ�4��	 ��(}[��'��S���ċ�'�C����y�u���	�/i�<B��(5�������X�)Ģ��)������ݩ`��C�h��O@�e%� �=��)�w�1{�B&P�hX��r��f��y�:u�ˊ<=�:2��Q��&��F�۳�l3�0�r�QdLx�8�./��%���1bIߒ������J�$�kt}-���8�4Ku+#\��>nm��\�$z�ǭ���i�D������VZL=cE��]�Ǚc���a�� Ή����� �tA# �J^$�E�;����`nJ��T&-�7�7�q�!U/�fo���#�����l�{7���k��Ew�9�r�K�}?,�?=�dq�/�D_�6Fb �����/������������a��6/_O��h�V,��r�y��Z�����'������9����I�g�E���M��qs�>�
�����^8���/����y�~�7z�b�N���
>�S�qO�d=�྄�\QUP,xٜ�$9{�d'B|����o�>�Ş��læTNr�r�#B�dJY�NF�^��vrJ߬� 5��J멯��m4K��5A��r�E���_4dˉ �*^�i��U�Y9����F7����J�F�$��\�[O����қ��{��7��C��*C���	T�]1�2����*�ܺ�vBN��)!�������t�f�)9�U �L �YO�n���S2�߼2����)'6�/D��r�F-I�BI��m��5��Z�(#N�z�s�N��$�u��ಗ��ƍ3�/$�2n^J�WS��'���WU��)%�f�@h�\�Q!э�D�F�D6�T	� $���j���7�!*�j���j�Q~zz�)a��MO��Z'��o�J�Z����F���wE;�����i,���%`	ΐ����H �8�����y��f��s�4:N2��z���")���4��HGE�H�}� ��� "L|�e�L6R�TAF9����ߒ�/[B �Au ��fK��T�=�&� �+�h��%���L?-0>[�[�7HL�F��b�4�?�������̈́     