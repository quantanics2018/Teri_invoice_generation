PGDMP         /                |            terion_billing    15.2    15.2 �    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    38189    terion_billing    DATABASE     �   CREATE DATABASE terion_billing WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_India.1252';
    DROP DATABASE terion_billing;
                postgres    false                        1255    38190    accesscontrolllog()    FUNCTION     =  CREATE FUNCTION public.accesscontrolllog() RETURNS trigger
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
       public          postgres    false                       1255    38191    credentialslog()    FUNCTION     �  CREATE FUNCTION public.credentialslog() RETURNS trigger
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
       public          postgres    false                       1255    38192    districtlog()    FUNCTION     W  CREATE FUNCTION public.districtlog() RETURNS trigger
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
       public          postgres    false                       1255    38193    invoicelog()    FUNCTION     t  CREATE FUNCTION public.invoicelog() RETURNS trigger
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
       public          postgres    false                       1255    38194    positionlog()    FUNCTION     Q  CREATE FUNCTION public.positionlog() RETURNS trigger
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
       public          postgres    false                       1255    38195    previlagelog()    FUNCTION     [  CREATE FUNCTION public.previlagelog() RETURNS trigger
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
       public          postgres    false                       1255    38196 
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
       public          postgres    false                       1255    38197 	   userlog()    FUNCTION     F
  CREATE FUNCTION public.userlog() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        INSERT INTO usertrigger(userid, email, phno, aadhar, pan, positionid, adminid, updatedby, status, userprofile, pstreetname, pdistrictid, pstateid, ppostalcode, cstreetname, cdistrictid, cstateid, cpostalcode,operation,dateandtime,organizationname,gstno,bussinesstype,fname,lname,upiid,bankname,bankaccno,passbookimg,accholdername,ifsccode)
	VALUES( NEW.userid, NEW.email, NEW.phno, NEW.aadhar,NEW.pan, NEW.positionid, NEW.adminid, NEW.updatedby, NEW.status, NEW.userprofile, NEW.pstreetname, NEW.pdistrictid, NEW.pstateid, NEW.ppostalcode, NEW.cstreetname, NEW.cdistrictid, NEW.cstateid, NEW.cpostalcode,'insert',current_timestamp,NEW.organizationname,NEW.gstnno,NEW.bussinesstype,NEW.fname,NEW.lname,NEW.upiid,NEW.bankname,NEW.bankaccno,NEW.passbookimg,NEW.accholdername,NEW.ifsccode);
   
   ELSIF TG_OP = 'DELETE' THEN
        INSERT INTO usertrigger( userid, email, phno, aadhar, pan, positionid, adminid, updatedby, status, userprofile, pstreetname, pdistrictid, pstateid, ppostalcode, cstreetname, cdistrictid, cstateid, cpostalcode,operation,dateandtime,organizationname,gstno,bussinesstype,fname,lname,upiid,bankname,bankaccno,passbookimg,accholdername,ifsccode)
	VALUES( OLD.userid, OLD.email, OLD.phno, OLD.aadhar,OLD.pan, OLD.positionid, OLD.adminid,OLD.updatedby, OLD.status, OLD.userprofile, OLD.pstreetname, OLD.pdistrictid, OLD.pstateid, OLD.ppostalcode, OLD.cstreetname, OLD.cdistrictid, OLD.cstateid, OLD.cpostalcode,'delete',current_timestamp,OLD.organizationname,OLD.gstnno,OLD.bussinesstype,OLD.fname,OLD.lname,OLD.upiid,OLD.bankname,OLD.bankaccno,OLD.passbookimg,OLD.accholdername,OLD.ifsccode);
     
	 ELSIF TG_OP = 'UPDATE' THEN
       
        INSERT INTO usertrigger( userid, email, phno, aadhar, pan, positionid, adminid, updatedby, status, userprofile, pstreetname, pdistrictid, pstateid, ppostalcode, cstreetname, cdistrictid, cstateid, cpostalcode,operation,dateandtime,organizationname,gstno,bussinesstype,fname,lname,upiid,bankname,bankaccno,passbookimg,accholdername,ifsccode)
	VALUES( NEW.userid, NEW.email, NEW.phno, NEW.aadhar,NEW.pan, NEW.positionid, NEW.adminid, NEW.updatedby, NEW.status, NEW.userprofile, NEW.pstreetname, NEW.pdistrictid, NEW.pstateid, NEW.ppostalcode, NEW.cstreetname, NEW.cdistrictid, NEW.cstateid, NEW.cpostalcode,'update',current_timestamp,NEW.organizationname,NEW.gstnno,NEW.bussinesstype,NEW.fname,NEW.lname,NEW.upiid,NEW.bankname,NEW.bankaccno,NEW.passbookimg,NEW.accholdername,NEW.ifsccode);
   
		END IF;
    
    
    RETURN OLD; 
END;
$$;
     DROP FUNCTION public.userlog();
       public          postgres    false            �            1259    38198    accesscontroll    TABLE     X  CREATE TABLE public.accesscontroll (
    rno integer NOT NULL,
    distributer character varying,
    product character varying,
    invoicegenerator character varying,
    userid character varying(20) NOT NULL,
    customer character varying,
    staff character varying,
    invoicepayslip character varying,
    d_staff character varying
);
 "   DROP TABLE public.accesscontroll;
       public         heap    postgres    false            �            1259    38203    accesscontroll_rno_seq    SEQUENCE     �   ALTER TABLE public.accesscontroll ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.accesscontroll_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    214            �            1259    38204    accesscontroltrigger    TABLE     �  CREATE TABLE public.accesscontroltrigger (
    rno integer NOT NULL,
    distributer character varying,
    product character varying,
    invoicegenerator character varying,
    userid character varying(20),
    customer character varying,
    staff character varying,
    operation character varying,
    dateandtime timestamp(6) without time zone,
    invoicepayslip character varying,
    d_staff character varying
);
 (   DROP TABLE public.accesscontroltrigger;
       public         heap    postgres    false            �            1259    38209    accesscontroltrigger_rno_seq    SEQUENCE     �   ALTER TABLE public.accesscontroltrigger ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.accesscontroltrigger_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    216            �            1259    38210    credentials    TABLE     �   CREATE TABLE public.credentials (
    rno integer NOT NULL,
    userid character varying(20),
    username character varying,
    password character varying,
    lastupdatedby character varying,
    updatedon character varying
);
    DROP TABLE public.credentials;
       public         heap    postgres    false            �            1259    38215    credentials_rno_seq    SEQUENCE     �   ALTER TABLE public.credentials ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.credentials_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    218            �            1259    38216    credentialstrigger    TABLE     >  CREATE TABLE public.credentialstrigger (
    rno integer NOT NULL,
    userid character varying(20),
    username character varying,
    password character varying,
    lastupdatedby character varying,
    updatedon character varying,
    operation character varying,
    dateandtime timestamp(6) without time zone
);
 &   DROP TABLE public.credentialstrigger;
       public         heap    postgres    false            �            1259    38221    credentialstrigger_rno_seq    SEQUENCE     �   ALTER TABLE public.credentialstrigger ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.credentialstrigger_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    220            �            1259    38222    district    TABLE     �   CREATE TABLE public.district (
    rno integer NOT NULL,
    stateid character varying(6),
    districtid character varying(6),
    districtcode character varying(6),
    districtname character varying(50)
);
    DROP TABLE public.district;
       public         heap    postgres    false            �            1259    38225    district_rno_seq    SEQUENCE     �   ALTER TABLE public.district ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.district_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    222            �            1259    38226    districttrigger    TABLE     -  CREATE TABLE public.districttrigger (
    rno integer NOT NULL,
    stateid character varying(6),
    districtid character varying(6),
    districtcode character varying(6),
    districtname character varying(50),
    operation character varying(10),
    dateandtime timestamp(6) without time zone
);
 #   DROP TABLE public.districttrigger;
       public         heap    postgres    false            �            1259    38229    districttrigger_rno_seq    SEQUENCE     �   ALTER TABLE public.districttrigger ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.districttrigger_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    224            �            1259    38230    feedback    TABLE     y   CREATE TABLE public.feedback (
    rno integer NOT NULL,
    userid character varying,
    feedback character varying
);
    DROP TABLE public.feedback;
       public         heap    postgres    false            �            1259    38235    feedback_rno_seq    SEQUENCE     �   ALTER TABLE public.feedback ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.feedback_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    226            �            1259    38236    invoice    TABLE     6  CREATE TABLE public.invoice (
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
    updatedon character varying,
    senderstatus integer,
    date character varying,
    reciverstatus integer,
    transactionid character varying
);
    DROP TABLE public.invoice;
       public         heap    postgres    false            �            1259    38242    invoice_id_seq    SEQUENCE     y   CREATE SEQUENCE public.invoice_id_seq
    START WITH 1000
    INCREMENT BY 1
    MINVALUE 0
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.invoice_id_seq;
       public          postgres    false    228            �           0    0    invoice_id_seq    SEQUENCE OWNED BY     H   ALTER SEQUENCE public.invoice_id_seq OWNED BY public.invoice.invoiceid;
          public          postgres    false    229            �            1259    38243    invoice_rno_seq    SEQUENCE     �   ALTER TABLE public.invoice ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.invoice_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    228            �            1259    38244    invoiceitem    TABLE     H  CREATE TABLE public.invoiceitem (
    rno integer NOT NULL,
    invoiceid character varying,
    productid character varying,
    quantity character varying,
    cost character varying,
    discountperitem character varying,
    lastupdatedby character varying,
    updatedon character varying,
    hsncode character varying
);
    DROP TABLE public.invoiceitem;
       public         heap    postgres    false            �            1259    38249    invoiceitem_rno_seq    SEQUENCE     �   ALTER TABLE public.invoiceitem ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.invoiceitem_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    231            �            1259    38250    invoiceslip    TABLE     �  CREATE TABLE public.invoiceslip (
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
       public         heap    postgres    false            �            1259    38255    invoiceslip_rno_seq    SEQUENCE     �   ALTER TABLE public.invoiceslip ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.invoiceslip_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    233            �            1259    38256    invoicetrigger    TABLE     �  CREATE TABLE public.invoicetrigger (
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
    lastupdatedby character varying,
    updatedon character varying,
    operation character varying,
    dateandtime timestamp(6) without time zone
);
 "   DROP TABLE public.invoicetrigger;
       public         heap    postgres    false            �            1259    38261    invoicetrigger_rno_seq    SEQUENCE     �   ALTER TABLE public.invoicetrigger ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.invoicetrigger_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    235            �            1259    38262    position    TABLE     �   CREATE TABLE public."position" (
    rno integer NOT NULL,
    positionid character varying,
    "position" character varying,
    lastupdatedby character varying,
    updatedon character varying
);
    DROP TABLE public."position";
       public         heap    postgres    false            �            1259    38267    position_rno_seq    SEQUENCE     �   ALTER TABLE public."position" ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.position_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    237            �            1259    38268    positiontrigger    TABLE       CREATE TABLE public.positiontrigger (
    rno integer NOT NULL,
    positionid character varying,
    "position" character varying,
    lastupdatedby character varying,
    updatedon character varying,
    operation character varying,
    dateandtime timestamp(6) without time zone
);
 #   DROP TABLE public.positiontrigger;
       public         heap    postgres    false            �            1259    38273    positiontrigger_rno_seq    SEQUENCE     �   ALTER TABLE public.positiontrigger ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.positiontrigger_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    239            �            1259    38274 	   previlage    TABLE     �   CREATE TABLE public.previlage (
    rno integer NOT NULL,
    previlageid character varying,
    previlage character varying,
    lastupdatedby character varying,
    updatedon character varying
);
    DROP TABLE public.previlage;
       public         heap    postgres    false            �            1259    38279    previlage_rno_seq    SEQUENCE     �   ALTER TABLE public.previlage ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.previlage_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    241            �            1259    38280    previlagetrigger    TABLE       CREATE TABLE public.previlagetrigger (
    rno integer NOT NULL,
    previlageid character varying,
    previlage character varying,
    lastupdatedby character varying,
    updatedon character varying,
    operation character varying,
    dateandtime timestamp(6) without time zone
);
 $   DROP TABLE public.previlagetrigger;
       public         heap    postgres    false            �            1259    38285    previlagetrigger_rno_seq    SEQUENCE     �   ALTER TABLE public.previlagetrigger ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.previlagetrigger_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    243            �            1259    38286    products    TABLE     �  CREATE TABLE public.products (
    rno integer NOT NULL,
    productid character varying,
    quantity integer,
    priceperitem character varying,
    "Lastupdatedby" character varying,
    updatedon timestamp with time zone[],
    productname character varying,
    belongsto character varying,
    status character varying,
    batchno character varying,
    cgst character varying,
    sgst character varying
);
    DROP TABLE public.products;
       public         heap    postgres    false            �            1259    38291    products_rno_seq    SEQUENCE     �   ALTER TABLE public.products ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.products_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    245            �            1259    38292    state    TABLE     �   CREATE TABLE public.state (
    rno integer NOT NULL,
    stateid character varying,
    statecode character varying,
    statename character varying,
    lastupdatedby character varying,
    updatedon character varying
);
    DROP TABLE public.state;
       public         heap    postgres    false            �            1259    38297    state_rno_seq    SEQUENCE     �   ALTER TABLE public.state ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.state_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    247            �            1259    38298    statetrigger    TABLE     7  CREATE TABLE public.statetrigger (
    rno integer NOT NULL,
    stateid character varying,
    statecode character varying,
    statename character varying,
    lastupdatedby character varying,
    updatedon character varying,
    operation character varying,
    dateandtime timestamp(6) without time zone
);
     DROP TABLE public.statetrigger;
       public         heap    postgres    false            �            1259    38303    statetrigger_rno_seq    SEQUENCE     �   ALTER TABLE public.statetrigger ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.statetrigger_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    249            �            1259    38304    user    TABLE     D  CREATE TABLE public."user" (
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
       public         heap    postgres    false            �            1259    38310    user_rno_seq    SEQUENCE     �   ALTER TABLE public."user" ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.user_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    251            �            1259    38311    user_user_id_seq    SEQUENCE     |   CREATE SEQUENCE public.user_user_id_seq
    START WITH 1000
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.user_user_id_seq;
       public          postgres    false    251            �           0    0    user_user_id_seq    SEQUENCE OWNED BY     F   ALTER SEQUENCE public.user_user_id_seq OWNED BY public."user".userid;
          public          postgres    false    253            �            1259    38312    usertrigger    TABLE     c  CREATE TABLE public.usertrigger (
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
    dateandtime timestamp(6) without time zone,
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
    DROP TABLE public.usertrigger;
       public         heap    postgres    false            �            1259    38317    usertrigger_rno_seq    SEQUENCE     �   ALTER TABLE public.usertrigger ALTER COLUMN rno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.usertrigger_rno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    254            �           2604    38318    invoice invoiceid    DEFAULT     �   ALTER TABLE ONLY public.invoice ALTER COLUMN invoiceid SET DEFAULT ('INVOICE'::text || nextval('public.invoice_id_seq'::regclass));
 @   ALTER TABLE public.invoice ALTER COLUMN invoiceid DROP DEFAULT;
       public          postgres    false    229    228            �           2604    38319    user userid    DEFAULT     |   ALTER TABLE ONLY public."user" ALTER COLUMN userid SET DEFAULT ('U'::text || nextval('public.user_user_id_seq'::regclass));
 <   ALTER TABLE public."user" ALTER COLUMN userid DROP DEFAULT;
       public          postgres    false    253    251            �          0    38198    accesscontroll 
   TABLE DATA           �   COPY public.accesscontroll (rno, distributer, product, invoicegenerator, userid, customer, staff, invoicepayslip, d_staff) FROM stdin;
    public          postgres    false    214   r�       �          0    38204    accesscontroltrigger 
   TABLE DATA           �   COPY public.accesscontroltrigger (rno, distributer, product, invoicegenerator, userid, customer, staff, operation, dateandtime, invoicepayslip, d_staff) FROM stdin;
    public          postgres    false    216   �       �          0    38210    credentials 
   TABLE DATA           `   COPY public.credentials (rno, userid, username, password, lastupdatedby, updatedon) FROM stdin;
    public          postgres    false    218   ��       �          0    38216    credentialstrigger 
   TABLE DATA              COPY public.credentialstrigger (rno, userid, username, password, lastupdatedby, updatedon, operation, dateandtime) FROM stdin;
    public          postgres    false    220   �       �          0    38222    district 
   TABLE DATA           X   COPY public.district (rno, stateid, districtid, districtcode, districtname) FROM stdin;
    public          postgres    false    222   r�       �          0    38226    districttrigger 
   TABLE DATA           w   COPY public.districttrigger (rno, stateid, districtid, districtcode, districtname, operation, dateandtime) FROM stdin;
    public          postgres    false    224   ��       �          0    38230    feedback 
   TABLE DATA           9   COPY public.feedback (rno, userid, feedback) FROM stdin;
    public          postgres    false    226   ��       �          0    38236    invoice 
   TABLE DATA           �   COPY public.invoice (rno, invoiceid, senderid, receiverid, invoicedate, sendernotes, subtotal, discount, total, invoicestatus, lastupdatedby, updatedon, senderstatus, date, reciverstatus, transactionid) FROM stdin;
    public          postgres    false    228   ��       �          0    38244    invoiceitem 
   TABLE DATA           �   COPY public.invoiceitem (rno, invoiceid, productid, quantity, cost, discountperitem, lastupdatedby, updatedon, hsncode) FROM stdin;
    public          postgres    false    231          �          0    38250    invoiceslip 
   TABLE DATA           �   COPY public.invoiceslip (rno, invoiceid, senderid, receiverid, invoicedate, hsncode, productid, quantity, discount, originalprice, afterdiscount, totalprice, lastupdatedby, updatedon) FROM stdin;
    public          postgres    false    233   �      �          0    38256    invoicetrigger 
   TABLE DATA           �   COPY public.invoicetrigger (rno, invoiceid, senderid, receiverid, invoicedate, sendernotes, subtotal, discount, total, invoicestatus, lastupdatedby, updatedon, operation, dateandtime) FROM stdin;
    public          postgres    false    235   �      �          0    38262    position 
   TABLE DATA           [   COPY public."position" (rno, positionid, "position", lastupdatedby, updatedon) FROM stdin;
    public          postgres    false    237   �&      �          0    38268    positiontrigger 
   TABLE DATA           x   COPY public.positiontrigger (rno, positionid, "position", lastupdatedby, updatedon, operation, dateandtime) FROM stdin;
    public          postgres    false    239   /'      �          0    38274 	   previlage 
   TABLE DATA           Z   COPY public.previlage (rno, previlageid, previlage, lastupdatedby, updatedon) FROM stdin;
    public          postgres    false    241   �'      �          0    38280    previlagetrigger 
   TABLE DATA           y   COPY public.previlagetrigger (rno, previlageid, previlage, lastupdatedby, updatedon, operation, dateandtime) FROM stdin;
    public          postgres    false    243   �'      �          0    38286    products 
   TABLE DATA           �   COPY public.products (rno, productid, quantity, priceperitem, "Lastupdatedby", updatedon, productname, belongsto, status, batchno, cgst, sgst) FROM stdin;
    public          postgres    false    245   �'      �          0    38292    state 
   TABLE DATA           ]   COPY public.state (rno, stateid, statecode, statename, lastupdatedby, updatedon) FROM stdin;
    public          postgres    false    247   �)      �          0    38298    statetrigger 
   TABLE DATA           |   COPY public.statetrigger (rno, stateid, statecode, statename, lastupdatedby, updatedon, operation, dateandtime) FROM stdin;
    public          postgres    false    249   %+      �          0    38304    user 
   TABLE DATA           b  COPY public."user" (rno, userid, email, phno, aadhar, pan, positionid, adminid, updatedby, status, userprofile, pstreetname, pdistrictid, pstateid, ppostalcode, cstreetname, cdistrictid, cstateid, cpostalcode, updatedon, organizationname, gstnno, bussinesstype, fname, lname, upiid, bankname, bankaccno, passbookimg, accholdername, ifsccode) FROM stdin;
    public          postgres    false    251   B+      �          0    38312    usertrigger 
   TABLE DATA           ~  COPY public.usertrigger (rno, userid, email, phno, aadhar, pan, positionid, adminid, updatedon, updatedby, status, userprofile, pstreetname, pdistrictid, pstateid, ppostalcode, cstreetname, cdistrictid, cstateid, cpostalcode, operation, dateandtime, organizationname, gstno, bussinesstype, fname, lname, upiid, bankname, bankaccno, passbookimg, accholdername, ifsccode) FROM stdin;
    public          postgres    false    254   K8      �           0    0    accesscontroll_rno_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.accesscontroll_rno_seq', 128, true);
          public          postgres    false    215            �           0    0    accesscontroltrigger_rno_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.accesscontroltrigger_rno_seq', 262, true);
          public          postgres    false    217            �           0    0    credentials_rno_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.credentials_rno_seq', 141, true);
          public          postgres    false    219            �           0    0    credentialstrigger_rno_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.credentialstrigger_rno_seq', 205, true);
          public          postgres    false    221            �           0    0    district_rno_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.district_rno_seq', 1, false);
          public          postgres    false    223            �           0    0    districttrigger_rno_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.districttrigger_rno_seq', 1, false);
          public          postgres    false    225            �           0    0    feedback_rno_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.feedback_rno_seq', 5, true);
          public          postgres    false    227            �           0    0    invoice_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.invoice_id_seq', 1364, true);
          public          postgres    false    229            �           0    0    invoice_rno_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.invoice_rno_seq', 395, true);
          public          postgres    false    230            �           0    0    invoiceitem_rno_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.invoiceitem_rno_seq', 396, true);
          public          postgres    false    232            �           0    0    invoiceslip_rno_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.invoiceslip_rno_seq', 5, true);
          public          postgres    false    234            �           0    0    invoicetrigger_rno_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.invoicetrigger_rno_seq', 555, true);
          public          postgres    false    236            �           0    0    position_rno_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.position_rno_seq', 5, true);
          public          postgres    false    238            �           0    0    positiontrigger_rno_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.positiontrigger_rno_seq', 2, true);
          public          postgres    false    240            �           0    0    previlage_rno_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.previlage_rno_seq', 1, false);
          public          postgres    false    242            �           0    0    previlagetrigger_rno_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.previlagetrigger_rno_seq', 1, false);
          public          postgres    false    244            �           0    0    products_rno_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.products_rno_seq', 130, true);
          public          postgres    false    246            �           0    0    state_rno_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.state_rno_seq', 1, false);
          public          postgres    false    248            �           0    0    statetrigger_rno_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.statetrigger_rno_seq', 1, false);
          public          postgres    false    250            �           0    0    user_rno_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.user_rno_seq', 262, true);
          public          postgres    false    252            �           0    0    user_user_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.user_user_id_seq', 1010, true);
          public          postgres    false    253            �           0    0    usertrigger_rno_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.usertrigger_rno_seq', 882, true);
          public          postgres    false    255            �           2606    38321 "   accesscontroll accesscontroll_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public.accesscontroll
    ADD CONSTRAINT accesscontroll_pkey PRIMARY KEY (rno);
 L   ALTER TABLE ONLY public.accesscontroll DROP CONSTRAINT accesscontroll_pkey;
       public            postgres    false    214            �           2606    38323 .   accesscontroltrigger accesscontroltrigger_pkey 
   CONSTRAINT     m   ALTER TABLE ONLY public.accesscontroltrigger
    ADD CONSTRAINT accesscontroltrigger_pkey PRIMARY KEY (rno);
 X   ALTER TABLE ONLY public.accesscontroltrigger DROP CONSTRAINT accesscontroltrigger_pkey;
       public            postgres    false    216            �           2606    38325    credentials credentials_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.credentials
    ADD CONSTRAINT credentials_pkey PRIMARY KEY (rno);
 F   ALTER TABLE ONLY public.credentials DROP CONSTRAINT credentials_pkey;
       public            postgres    false    218            �           2606    38327 *   credentialstrigger credentialstrigger_pkey 
   CONSTRAINT     i   ALTER TABLE ONLY public.credentialstrigger
    ADD CONSTRAINT credentialstrigger_pkey PRIMARY KEY (rno);
 T   ALTER TABLE ONLY public.credentialstrigger DROP CONSTRAINT credentialstrigger_pkey;
       public            postgres    false    220            �           2606    38329    district district_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public.district
    ADD CONSTRAINT district_pkey PRIMARY KEY (rno);
 @   ALTER TABLE ONLY public.district DROP CONSTRAINT district_pkey;
       public            postgres    false    222            �           2606    38331 $   districttrigger districttrigger_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY public.districttrigger
    ADD CONSTRAINT districttrigger_pkey PRIMARY KEY (rno);
 N   ALTER TABLE ONLY public.districttrigger DROP CONSTRAINT districttrigger_pkey;
       public            postgres    false    224            �           2606    38333    user email_already_exsist 
   CONSTRAINT     W   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT email_already_exsist UNIQUE (email);
 E   ALTER TABLE ONLY public."user" DROP CONSTRAINT email_already_exsist;
       public            postgres    false    251            �           2606    38335 .   credentials email_already_exsist_in_user_table 
   CONSTRAINT     m   ALTER TABLE ONLY public.credentials
    ADD CONSTRAINT email_already_exsist_in_user_table UNIQUE (username);
 X   ALTER TABLE ONLY public.credentials DROP CONSTRAINT email_already_exsist_in_user_table;
       public            postgres    false    218            �           2606    38337    invoice invoice_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.invoice
    ADD CONSTRAINT invoice_pkey PRIMARY KEY (rno);
 >   ALTER TABLE ONLY public.invoice DROP CONSTRAINT invoice_pkey;
       public            postgres    false    228            �           2606    38339    invoiceitem invoiceitem_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.invoiceitem
    ADD CONSTRAINT invoiceitem_pkey PRIMARY KEY (rno);
 F   ALTER TABLE ONLY public.invoiceitem DROP CONSTRAINT invoiceitem_pkey;
       public            postgres    false    231            �           2606    38341    invoiceslip invoiceslip_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.invoiceslip
    ADD CONSTRAINT invoiceslip_pkey PRIMARY KEY (rno);
 F   ALTER TABLE ONLY public.invoiceslip DROP CONSTRAINT invoiceslip_pkey;
       public            postgres    false    233            �           2606    38343 "   invoicetrigger invoicetrigger_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public.invoicetrigger
    ADD CONSTRAINT invoicetrigger_pkey PRIMARY KEY (rno);
 L   ALTER TABLE ONLY public.invoicetrigger DROP CONSTRAINT invoicetrigger_pkey;
       public            postgres    false    235            �           2606    38345    position position_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public."position"
    ADD CONSTRAINT position_pkey PRIMARY KEY (rno);
 B   ALTER TABLE ONLY public."position" DROP CONSTRAINT position_pkey;
       public            postgres    false    237            �           2606    38347 $   positiontrigger positiontrigger_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY public.positiontrigger
    ADD CONSTRAINT positiontrigger_pkey PRIMARY KEY (rno);
 N   ALTER TABLE ONLY public.positiontrigger DROP CONSTRAINT positiontrigger_pkey;
       public            postgres    false    239            �           2606    38349    previlage previlage_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.previlage
    ADD CONSTRAINT previlage_pkey PRIMARY KEY (rno);
 B   ALTER TABLE ONLY public.previlage DROP CONSTRAINT previlage_pkey;
       public            postgres    false    241            �           2606    38351 &   previlagetrigger previlagetrigger_pkey 
   CONSTRAINT     e   ALTER TABLE ONLY public.previlagetrigger
    ADD CONSTRAINT previlagetrigger_pkey PRIMARY KEY (rno);
 P   ALTER TABLE ONLY public.previlagetrigger DROP CONSTRAINT previlagetrigger_pkey;
       public            postgres    false    243            �           2606    38353    products products_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (rno);
 @   ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
       public            postgres    false    245            �           2606    38355    user set_unique_email 
   CONSTRAINT     S   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT set_unique_email UNIQUE (email);
 A   ALTER TABLE ONLY public."user" DROP CONSTRAINT set_unique_email;
       public            postgres    false    251            �           2606    38357    user set_unique_userid 
   CONSTRAINT     U   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT set_unique_userid UNIQUE (userid);
 B   ALTER TABLE ONLY public."user" DROP CONSTRAINT set_unique_userid;
       public            postgres    false    251            �           2606    38359    state state_pkey 
   CONSTRAINT     O   ALTER TABLE ONLY public.state
    ADD CONSTRAINT state_pkey PRIMARY KEY (rno);
 :   ALTER TABLE ONLY public.state DROP CONSTRAINT state_pkey;
       public            postgres    false    247            �           2606    38361    statetrigger statetrigger_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.statetrigger
    ADD CONSTRAINT statetrigger_pkey PRIMARY KEY (rno);
 H   ALTER TABLE ONLY public.statetrigger DROP CONSTRAINT statetrigger_pkey;
       public            postgres    false    249            �           2606    38363    user user_pkey 
   CONSTRAINT     O   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (rno);
 :   ALTER TABLE ONLY public."user" DROP CONSTRAINT user_pkey;
       public            postgres    false    251                       2606    38365    user userid_already_exsist 
   CONSTRAINT     Y   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT userid_already_exsist UNIQUE (userid);
 F   ALTER TABLE ONLY public."user" DROP CONSTRAINT userid_already_exsist;
       public            postgres    false    251            �           2606    38367 /   credentials userid_already_exsist_in_user_table 
   CONSTRAINT     l   ALTER TABLE ONLY public.credentials
    ADD CONSTRAINT userid_already_exsist_in_user_table UNIQUE (userid);
 Y   ALTER TABLE ONLY public.credentials DROP CONSTRAINT userid_already_exsist_in_user_table;
       public            postgres    false    218                       2606    38369    usertrigger usertrigger_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.usertrigger
    ADD CONSTRAINT usertrigger_pkey PRIMARY KEY (rno);
 F   ALTER TABLE ONLY public.usertrigger DROP CONSTRAINT usertrigger_pkey;
       public            postgres    false    254                       2620    38370 (   accesscontroll accesscontrolltriggername    TRIGGER     �   CREATE TRIGGER accesscontrolltriggername AFTER INSERT OR DELETE OR UPDATE ON public.accesscontroll FOR EACH ROW EXECUTE FUNCTION public.accesscontrolllog();
 A   DROP TRIGGER accesscontrolltriggername ON public.accesscontroll;
       public          postgres    false    214    256                       2620    38371 "   credentials credentialstriggername    TRIGGER     �   CREATE TRIGGER credentialstriggername AFTER INSERT OR DELETE OR UPDATE ON public.credentials FOR EACH ROW EXECUTE FUNCTION public.credentialslog();
 ;   DROP TRIGGER credentialstriggername ON public.credentials;
       public          postgres    false    218    257                       2620    38372    district districttriggername    TRIGGER     �   CREATE TRIGGER districttriggername AFTER INSERT OR DELETE OR UPDATE ON public.district FOR EACH ROW EXECUTE FUNCTION public.districtlog();
 5   DROP TRIGGER districttriggername ON public.district;
       public          postgres    false    270    222                       2620    38373    invoice invoicetriggername    TRIGGER     �   CREATE TRIGGER invoicetriggername AFTER INSERT OR DELETE OR UPDATE ON public.invoice FOR EACH ROW EXECUTE FUNCTION public.invoicelog();
 3   DROP TRIGGER invoicetriggername ON public.invoice;
       public          postgres    false    271    228                       2620    38374    position positiontriggername    TRIGGER     �   CREATE TRIGGER positiontriggername AFTER INSERT OR DELETE OR UPDATE ON public."position" FOR EACH ROW EXECUTE FUNCTION public.positionlog();
 7   DROP TRIGGER positiontriggername ON public."position";
       public          postgres    false    237    272            	           2620    38375    previlage previlagetriggername    TRIGGER     �   CREATE TRIGGER previlagetriggername AFTER INSERT OR DELETE OR UPDATE ON public.previlage FOR EACH ROW EXECUTE FUNCTION public.previlagelog();
 7   DROP TRIGGER previlagetriggername ON public.previlage;
       public          postgres    false    273    241            
           2620    38376    state statetriggername    TRIGGER     �   CREATE TRIGGER statetriggername AFTER INSERT OR DELETE OR UPDATE ON public.state FOR EACH ROW EXECUTE FUNCTION public.statelog();
 /   DROP TRIGGER statetriggername ON public.state;
       public          postgres    false    274    247                       2620    38377    user usertriggername    TRIGGER     �   CREATE TRIGGER usertriggername AFTER INSERT OR DELETE OR UPDATE ON public."user" FOR EACH ROW EXECUTE FUNCTION public.userlog();
 /   DROP TRIGGER usertriggername ON public."user";
       public          postgres    false    258    251            �   �  x�m�An� @��aF��������캛ܠ������F�R�gb�lB��f�'j��K��g�ۏ������%mz��NI���pn�%x�u����7�#r�Pc�%Q�W�P�L����$����\X�FIZF���������ݴ��ٽ;`~?����dW��cu*��+��ݯ�,����4��T��
���ׄ<�F �u��}\��Y�c�9����*��+�D�=�����5�ɑ&+xO��'�z��z~�6�+W���!F�9���=i���{�\ȟ��Xi�K"���a.3OQ�#�Ң|iD���<))x!���j�F�1���ݴ�ON7��ת�%`��=��G�~_{�->�?�����]�w�Z�Xӗ/�1�c�>Fp,��jn���hsW��u�<z�4p.���'6�΁I��X'��G�z���1��e��u�T@u��.����oו���߱�ڨ�@�׃��\+4Z\yL�%p�۰��D�g�o3rΩX��q�Sl�<���kqF}-|}-|��xL4΂ ��"@�l,G1#@��P;�(�+4�0�;̅�s���\h�0�;�e�ha.4w���Bs����a�4/0W��+�̕��J�s�y��Ҽ�\i^`��N%̿~���T���      �   �  x���ͮ����Oq_`
⯨���l��f��"@���C�$��[�]H`/ßU���CJ>����ϔ�#}��������ǿ�����K�_�}�rc��n����?���o�D~��Ǐ?<�"7�M�r#�H����M��� 9E����ߎB��|#�PY�(�_W.��t��y;(��W�|�#���&�������_��Ӻ�yˤ�n�6����(>T|E��H���d7v���(S'�N.縓�n$�w� ��_���pcP�Aҝ�32W���k���9%\����:%�}<�R��47,��VA�V��/]l�N���-��#��Y�I�|��(�}u&��Ǥ&W.���y�;)�$�xL2�S#�
gh�t.Q�LEe�0�z��A�������m7��\$"������-�6���"V5h(^��C����ld�l�����2��!� �X@���b���P�!��� ��C�kHn�.u=$C�^G���l�W�qe�!�7�!F;C��X{�"������p~��}���Ws�f.�mD| a5f�X����:I�H/���}c_Q-��6x�y8�kХ�.�,�mH�
z����^���.��ʀ����d}FJڠ�Hic�5醲125�<z�5衼�x(s[���|3}u S*���qJs��Ԡj-����1A����I|�~��d�ׯ?#�ş+��6���D]��g��=�ldLȍ���dĎ��qn�v�������ȃ��\�d�HzAz�$�-����&�_�$�nR�4�/U��d�,I�Fm�$�p&�7���Q�"�y�o��3�������S��)�D>��#]yԣ�eQݻ ���V2��1�.�I�F����l��+"�I�g�\24R/��܇&��k�E�Єܿ�k��3�V�$�<K���ȴ��$�A�<$��vRӴ�T�v1f� 	�X��\)�Z|7.9�RW��Zz_'�-�m��%/M}J�t�X���7˙�n���ǯ�$B�?cR�)�9��T�k��\F4Q}"�czI����JiL�52b�'�,M	jOk� �V�Vl�!-�gK��`���(�+Ka��IFi
��n��"
yn ��R�͌���>c�p�#�0��P��d�ώ�YѰ�ό��m�S�g%8��<�7�-�䡡Z���5�xU[��a'�\�ȼ�̡!US�k4�E��$��6�ZH�I!�<�EJꨤ8ڱ1��I�*��n��Y݉��$oiJ��"�I��,������G1�E�.P�D/�������4zZ�GP�Ja�śW�Ѝ��E2G^Q�z�e�����G�1�YB|z����������Ts��'�>����ba�����L$� 9�Qv�߳g�:�&��]|3M9ǡ��%G�<ă���I<g�Q�"*:��s�wt�DvFb��䱚�~o!�<'�5�Q@f����S����[IJ�����Q(y"�	�2�z]�H�Hz�wl��2��T�X.n`wz!:�/����JG���TK$It�� �U,����̩[UH%�c��Z$}qc�9��'Sl�/�$0Վ>�3#��ho)�;W�^��P�H��w���{`�pr?�]�F�ۣ�_���J���FD}g�ꤖ�Q�U��Z$�{Ԣ��v��[�b/ ��>��_���j�պ� ��D�;�\�I���d ��e���1��B���>V�p��~h9Ԟ��Q!z��ɽ�8��M}u��8F�te�����gj�#\9�$b)����QׄRI#."]D%�yH�F����&�I<��<�\\�(��li�cԋ�l�C�	m�ςZ�=Sz���e�復��eL����rEiL0DA�"�q�d��ġF�?"ܣ1]��~���[����1������Z�O��J�@�jB�<��QK�5Ζ���˨W� 4tH�2I��<f:{�uf���e��.�]KT.��/�˳��	˚���%7��_�E4R֦�Ϋ������Ӳ���C5Oз��]�묫�,��rݢ�U����Hl�QƸ���e�/���������|?�<e;8a�G8v��ud���.}Ծ]�� ����#�آ�J�E�2��2��qu����+%]7�"�����t�P�-�Z;7��E~�uHC*�`)xxN�'r�P���z����AU�%�	���z�2�
�Ƀ���娽�2{(\��Ɩ��2dnX����,sM�9����Mx��}52�/���=���(�6*ϘRJgu�Q���P7�^
ko&�Ϊ����T͵��4�#�B/�����w/d���,EҌx�N嫬WNy�(1Ǹ�v�w�kr���C�.�6�ln�F�;���=���w
d�)W���V�U���YF�ӧ'HK2�S�#FN�$���\w��I�#���9�-3=B35)�����yH������ux��s's�o��ְ�hA��#��{�3�u+��_�@�����5	��F:d�xxW�&� h��9�����O�hڢ[�b)�w0u��:�VN:-�����l������P��xg�Y�0��io�*K���U�Y|^���fF3�4)���K^v��~O�,�,ƛ)�NLF�1yf�5lͼ�9a���X�{�G?��qdOE�Ѽ�C\\�U6�+X����piRp)qO�~�z·���>�7�I
�{8t�qi4v��渾����3o��twV�^!H:X��֓h��y|�(�ޱ�>��D�ǎC���Qԫ�{-(rq\���7N��|�������h�ݛ��Y�d	�k���q9R�gm��2��e�R�"Y��xh��@wO��7谬v4��y|�Tz|ǄWY�Y0#Z��(��a��ȋ������}n(F�z�	QN�L^e�X����hcLh�(e��������r|0�����VoQ�O(�M<��؞7�13���ܟ�`����U�P��st�v���s3��(
=�#��.�͌zHF��y_0�o�zw�?�=qE�*��vj�'5�K�:��M-<�DB4�5�i�)niYND�x}�sM�H��DD轄ʯ�Nǣ��9�[�vt���5��w�q}h~H��<�����x9�P��e�C������cx�#R�p&�ns�V��k�܇:.�(Z>{w,����xh��m��hR��&#�!���|g����`ac��EKq4�j����C��+�X��W����xh���Y��F/!NK;4)�s6g�2L�8��&:�9���[�^5⡋N����h�OL�RᡍN����L{xD���C�NU�Չ�WS�C�F:�ꊛ#�����YW|�+�f�̍g���C+�Ou%t�R��g]�$~��#lV�+>Օ���pq���4�Ou%�Ih��wϊt�}����=��|����:�UE�9�������:�EUQ�ړ˥?yD�5�kM���meI�-�<k�ך�zC6���v֔�5���x<4�ڍ�J͚���vV��[�~y�~{fךr�������xÇ�-kM����+�CS|0TkMUv��R�M�,*Y�jGs�K�#}�e��E��V_țј�̪���*��ْgl��β���v6�Mq����YV�����v�ר=D�,+=�U}?Z���K�YVz*�R/0~�j�zQfY�Y�U���xh��WfY�YQ���#��x5�/d�p�߬�c�f]�]ŕn�2���߬��􅮘k1���4�YW�BW��$cJ��:�J_�*z��>��߷o߾��d�>      �   :  x��V�N1=g?���Ifri�����h����b�*��N��T�z$d#�g�؎��n/އ��旇�||����s�!��8�ǟ��'����$w�e������4���y�G�y��Q�Ƞ�Cv�����(@tⰲ�;����|��}�Hø�+����@R$�@R�Cf�:�X��#��|;�`%"�ۥJ۬D�l����}]���*�R���s��pl��N2��,J;C�I!Ԅ�E"����f�5��Ǘ����;�m�:6���R�Ww�r��Rl����\m���eX��B���P�ka�I���-���|J+� ���:�Y�d�Nb�
([#�5&Xy�mfY���D��:��t�NbZ�0v��/���V.�D�t��LD���[g"�@F
>�Io��I��Nb�H��L5��*�q*��.����<�$!���4�����j�ߛ�(d����t��@�0�I��T�W0�X�͋�i`�PR��ݾ���I?2b�ߛ�ӥl3o�U�'��/�8
U�d3����o^���G�x{��d	����밌K)ۣ�{-�s�)�i��N��`���ZEضx:B���4��r�M��L$�^���D�ʩi�ˑ�r$�G��f;�e��8���Zq�D$�Vܸqy:�Bft�ܹ�ZqC�۞�7�>�U+n�} �Vܐ�@�+[s'�V<0w�j�s'k�5M����r]2:�6�4$�j�$ؖ4-<ۜ{Z�³͹�%-<�<�U�6Od���0w��Rg�gO�A�=�qGt���Zq�9�n֊��3Y��l�LV�8�<�U+�6�d�:U|�i����$      �   R  x��[�n7]��
�@�w� �f6��,�D@���A��s�XWHd]5-��#�y�E��:ݿ��Ǜ�_���~<����������_N\X�+�]�o�8+���Z�(��3�o?���ˇǻ�YyoÆ�M��w�3ם[3�;�w�����4j���n�g��Q-�n���7��>�%����ۛ�Eh��.ֈu������^��6N���vus=����Mj#ۨ�~9}�������w����{��ɹ4(dg���Ftz��p��eJ�GRوb~����v��p�<?��\xW�ԁ��y~��&a���t��a��]�F����/4|���H�H�2������F0�
�\�Av�V]o���@�H�n�����0��g�ݸ4�|�7%��1��/�*� $ �C�eD%���nE7�����zbp8�L�fȪ�bx�!,]� �ۧ��x3�J�EJ5lo_o?�b�)�d���k,ɴ/!4!�p� ky�Y1N@� ސ �c������w ѓ�z ��@04��D��M��.
I|�51}Ȝ�w$r��<�VRgB�3�.u�O7�'���i�F�Y�.E
�������oE�0�L��%�x9۽
٤-Yc�_�Ƃ*��#?����M����C�w�*^�ܰ�to�OW�#i,����I��32������"��r`���cl���m~1��8OW������w�g�(w]q�:��]�����l��MG�6Z)Y���(�6���u~�1�c(�E�ft�1���U/�Eb�݌�`�I@!&����fr$�����ӽ�q�5�pq2EƵ�f�"q� 7��}��*q��"7t�$k/G��uc�v�k��N�X HW���Ŋ�=�3�!�T��5q���� )h�&��8��p?EYE�V�n��Es9h�B<�$�\���H����E�+�B�z#Hq2�	��,�sK�3��"�Qj��i���p
T��
b��>��e�B�mx�=$��,`�'>)�`$`��8"-����7��H�8KU��V��5����K��:��lk�7�e��v�<��$k�Bw~$�{�iz�v��	�w?�m��ߚ�RD	��"0���?#�x	��͵�^+�D�N����������Bm���kE4�k��m��C"�C+݄�N/�ހ�Ӣ��P�׉���]��4c�s_#�kP�/��*�{��O���,P�`x�/���O��nu.+(�!8�����B�3(f�'��,��>P�d��8Y?`4��{��2l6="3�ZC�8�V�>KQ.�(�i�+���k)�9s����A2����m�o�L�f�BC =v�'��X�;u�Ry��O^L�&�ƍ��N蒆NEs.+(5<�{��gDðӻ�Y�o�n&
4��S;2Ș�#I.+(qY.%jb�\m���/����׌�A�P登g�=�?���.��S��"
;!{�H3�6Tу+��~tY�[�jm���<�
�]�6rQI�I:f����N���Lsg*\�_�o� 
���+�KbЄ�5U�Vj/>���V;P���I��
PA�Aȧ#��5a$��Js�veM&q�	OU�6oU(�m%�;L�f����L�-�u���048]J_
��	��܋���"eZ��0���Ҡ�̂\rY��+
�=�U��h�\�a�����̴�P+Iu¨zA-�[sOq
��>�+�a?Է�ڿ�S�����s��ZJ��~�x�pmG�\�{��ޓ�����5$�=�X������|�u1�+��`�dp��M_!���h����j��OT�U�ګ��Դ�'g����|Գ�Q��������(��>`WD:�7q~��$Ŵ�t�!�x<?�}B����)Ͻ� Oo�n��w
Wa�N�
�&�c�U+&��~%�ꞒE�E�Z�+n��|Eɒ��x���Ow�����'^K�@��g=3�; ���
�����UIw8�D/F�(^c�?����tg��,�����YG��L�A��s
�k�t�Y<��EN�!�ʡm�;����t��]Y�AxBH��C��ݼ~*_f��Ce�Z�{0�f���B�x��!7w�t���

b@�֜�q�t��L!�����l���C�qɉAw���ݢ�TY򨉢13av6����GfTW����[�U� ����p�[�v��h8�hG�TOJF_~�	kN����P*�x�>�se�F��"��
Ȃ@�e�2:y�3��f��⾡\��P$H��]�rw��ÃJ^��,�+��:Ca�@[��-��.L/Y���=�����1��e�H.�mI\�pF7��;��:������ˇ�w�?���H�s�"���*0Aͼ����w>��~����J/�Q�<�>	��q�Q/���T��H�h&��c�l������#Y�	��/�+y���/ ����ݤ�	��K�eF��C���N��eF��F�8��ד�Ɋ$���g�ҝ�֩�${r\�'���^Ѭ!�&�kh.�0��P+p���MM_%]`|�bh�״�mj��3<�t������R���П0Z��uc%�_�
%5�����А)�)��_�%5���ꝡ?����5u��6fՋ�8�{Gd�G��rY�1O���2� ?�ԭr.�0>z�{��
0S���KW�؂k*b��� 3u��bhՋ��o�J9������2��SWȒC�����Ò���dV���%U�%���B	��sz��tɃ'J�d�@k�=��Z^�`��	��5~8�]�9�0M�⪗�ח^�eE(�gs��N���kj�(�u�
����{���3�d�W:��q��1�e���.����H�h.�0��ؐ�J��$�����(M|��$���ǻ���U3R'i�����n�D&u��Z
	�Y{ܞÙ�P����RHL��@��3rz\rY��[g�0�E�*�C1��=�s�����;�p����o�7S)I���H��U.��e������0��ed���
H$&��[�b��U@�K�JI��{18��>�1)����u݉A)��vJ��g��0G	9�,�`��D��}۶�$G�h      �     x�5��n�0E�寘/�sفV��r�YD�����v#Z���u�ٜ�-���rBYF	�tE����_g��,����|���~�eYU���A��N�����=�w���2[��ʏ�k߳��c�h?�x>��N=��
�U�л���s̞i��ϗު��PY�T��<b���Tr'�����Q	߃���g�$RI��(̐J�
,�;����O7HD��#��c?B�ُ�ȗa+�ؼj���q\���"X�{����3�3Dl�{�<��U"�`�ZQkq�/y�D|��4Ԯ�:^�'��� �.���7�T�A�Ԃ���m�)vt`o�Ld�C���p}���4偌#_�)h>4���_���!��i�ڀ����B����1ťb�N�/�a�b��A~��mǵw*E��O22噧	�PE�4��,X��"����A#��T������)��
����Y�5=�!e�y�&�W�|�%W��5�U�:��Og"v5u�K#m�k�'�Ê�Ƴ��[)��R�.      �      x������ � �      �   J   x�3��H��N100�2��H��ɇ�9�Ss��sS�|ΐԢ��<��Ԕ���l����\NC#c.S�R1z\\\ ��>      �   
  x���M�#�E�����|�Er� ��ga +o�a`�@f�?B��U��o�����!<~��˲h8������?�)�ԓ��~z	AN4>}j��G�O���,*3����}��!�J z��,D���}����]��=i��2����+c��i���y&չi2齤z��'ӥ.�Z}�,in�(k���5����\{�}���ZL��#t���v��˷߿���?����/��n����@�	p�8.�>����E���c1�X�ccZy0�S<\^����p����L�8u�(���L��U��|�}��4���+Kn=�:�J���浬M8j�F��)�.D����6��m���v��k�T|k�>���IF0wF�d{4���[O���䵬+��_+c�7��/�����V�&����S@�<����������L�}(U���Y½��P
���S�|���5���֗0�/���UB�����&(��[�V��+�n�tT�tT��AGM���C}>�:`�L����(��d�AM^���u?��*z��XsU���ca��1T�n`]������ ߮(���ť}�|]����fU�k�k��y]4��&��*X�[��*�pYCn@Xg�w�Z,�L��%>�����kF���M� v�b/�l��eC�NAn�ro���^�-T��(0R���Q`�P#��@#��FM0a��O��B���"�� g���SUzSu����x�8������ǚ2
�q�a�QYm�`Pdy�}`�*��[;��g���eP)����/���2�{�z+	���'�>v��{l��V�)q��vm�c�Wc9�+`X�x�F
x��$�7Ҁ��
���R��t�w)�G�X_��4��~�~�#�i����Q��i��w0��w�Ƿ|��;_0�So|��E:<�|||� ���� �_���ֿlx�����X����O���������� ~�~����*�G���e�~��� tX�F鞛-H���(����C��2���O��Ӂ���R�ѱ�v@�,u�(K`d�R���U��z����YK��am����}C,vKE� E �:@�H�P"����8oV�zx;�S�P�����8/o�"\i��@f�a�i��~@N�a�\o�y�㾆~���*����U����~�W���2���s=��2��~� ? �P�$
*�H���#������ n]�o�P��'w���y�S���9o�s�A���y��8O�n� ��� J�Н<D� �����;���l��j�'�����poCm�pyC��N�at�p�@��D�1lɫw�aT'�0*F�qs��v��R�z�^!D�j� ��]�!x�OV׾V�i8$��qVS~��׃�N"���`�\|h��&kda�����@0.�NL��ni n���v��A���<m���
!�Fv����X#�i�h�}�����8��:a���������L����%}��>�B�|="��J�py�n�m\X.H�"����Jo= 3�$���yZ�ܟ�?�h`#ɯW�أ��$�^�nǳ�8P��׫�GkHt��M]Ln4;k��YI̼긘���YGRf���YI��m*L^�Y��z����%��8�Q�ֈ��0}�+KZ;�q�g�_ͯ�
��`���H�����4K$E�A*�$�_�j|l�A&�$������{i`C��`���4�!�� �W���f�A�$�_�y�^�@��{i�B��Sp�d�+Z�l���~���� ^!��\[!W���Vs��]I�$��ٻ���i$�J���b~�z�:��}=��9:���;�	ݝ"w%�����+	��-���J�v/d a���]�@�v��]Iо>�Hg���]Iʾ�!>>)d�J2�.��i"v%������@v�H@��$__��4�u#�sC�n$[���lp��h��E�ҙ�F}���dcϸ8*����)7�&�Q!���0�2ШH�� ����/�3���/��8@�n$N_Ҷ6��:�0}5�[�\3| Y��8��$��Q��>��}�K��;| 1�=	 ������H�����hu�!H����5��ּA�n$C_�J.y.�!H��A~n$?��@�������p 	��80B�N(�L	_ׁ�3�O!�'D�>hχ>t��:@^n$/w� 07�{i��˽4��z6�i ��d����/i�=�@br/\ !���:�CDnv���� 鸑t|����A4n$w����`�KH.$����>��.����4p������mh/\ �B{i�y�I����{�����8��ƾN�@ނv�@��>�ى!h��ā4Dv��"�}40�f�>A#i"i����3�fț4���]�0��܋-������X�h,���@.m4�^�D� 8A�iד�ϗ�����5U      �   w  x���=��6m�]�Q�_{C�������͞���di2�f�@29�q�������Hg���a����_��%�@I�?�T}QPT;��=$*��7agHt)$��L]u9ʿ(���v�M��UI��5I��u�������OI��'EU�r���]R���W�/o�X��k����@��^�1�i�y�' EsS}����O 1s+ ���I�Q���G6X��(  tn� �˹� &�
 �,�����r=��s� TΝ P97] @e�Tv�,���%R١�D*;TV� ��������5�0`�FL��À�y0Y#&[4R&[�a�d=�d�o7�t���tBj�� �g�#����9�f������w�s���^4�]*����~��" �����? a�qo�<�sXߜ|�L
�1'���17�Ü����(@���g����9,��~�_S"�g��a�������m��x�������I3 �/�|�³e ����9��u� �rԢ�Y��KhH���7�}�9O���NR���������_�i����3;��hk�^0�L0X�䂁��Eb��x3y���9��q`~����v�����F�M�hD�f �ą!���D[�~�s� �4�����0�L'�&$"�ր�L�<�3��5��uxv������8<{<{<�XD�ܘ�gg������g}�ڐokr����l?u;c��,vG��,v2pM�:|�*9��&)8�]R�����H��5Ɋ��b���⒂��%��H
�t�l\S�(�/�=rM���J�(�5ي��*ݣ)�l+
�t��\ӭ(���=:sM���J�(�5�מ��3_�H�}��ўk��M�G���V�7�=��[Qpߤ{��nE�}��Ѩk��]�7$�nE�}��m�s��ϓ ������m�L�'�8�(֠�50�rEa�ZC��)W֠�50��rEa�\t�rEa��C��)W܏��|�w?��ӏdD� �Z�uD���1�C��uM���C��u�5@��)� Ѻ�]Q	�\d�rE9(9���5�*��{$�rE5P�=�uM���>I�HVK�=�Ւt�\�$�#X-I�H�5݊��$�#[�t+
�t�t�$ݣ]�t
���[Q�I}���_�PG��w-�O+O�M�:�L�J���d��y�C̚5������qB����5���5���5���rs lͥz���T���PYh[s�P��y Xw����E��z�o�ˍX�JG�/[�w�J�rj~R�g�-oyk�|O���-(8���ח��WA���!�w�Ϸ��A������r���	P0/ސ�&ސ�&ސ�v'����10�	��w�=;j�?e[i��ݑo��w��l���d�O�dеo���~3T�]_���1���܀�t_�	�q|a�����:��\T����.�E��=�y��~4L_���A��q��d�X��O�c�-�������#`�fq.��>
�cnh�!���	�A\o��T�&�՟%mS�p�����q`��00�R�8�՚�#�Vk�iG�Z�M;"����1o�
G�Z������u��������_��6��~$��iG�Z�gz�WG�Z�gڑ��=�?�(�.L#I�
�9���F&���z�xt��&~4T�B�Z�\=��4�1=R̰>��[��~3�sܢY�Wׯ=?�v �������U�������A��ӕm�Y�#�S;�sܮ���a2�]�)\�7��]?������qk@k���[Jӯ�\#4���0"3��m}ڠ��W����+�2�`�kw�1r�g�����w���[��.�z�~9�ғ��#.=�w��!-=ůC��|3�끨�$�VHJ�>̭W�=��I<�=�I<�����еXĤ[���HI7���n&�6��H�,��"��*x6�	�&<# ݄g䣻x #���#�M0���zۢ���I�'ϟ��_���.<#݅g����\t����g��g���YxF&z�H�,���Y�3"ѳ��D�,<�=�(D���{/����
ы�o����
ыx�D!�(VG!z�Q�^�g����ExF z�@���U����@�*���W��W�,DzC�>�/��?�~���v�Y      �      x�3��CA��F�Fh\1z\\\ �	�      �      x��]ˮ$�q]w}� ^+Aƃ���ay���0��6�4�����sX���V�V%3S@c�`�`0x�/Y����~���O������Ib�J�W���ꛗ7O��RR��s����-�Mz�Vn��`��oI��,�zk�������|�o	��5I��]���7�[.���r:����I�uZP>>")��j֦��* %Б��S�&�l;`��Q��o@I)߲`$oE��z��L�z�T$��M@)o��Y��vL?��@r�i���$Ms�zO-��ȗ�0a��S�t<Y��-w�ǭ�]71�H^�u�քqG����zb�\L'խ�d7){`�s�1�ƶT�p��� �̹Yћ���C�o��7/ջ�T��4FT�S,�t�t=�+�7�Ԃ�q�]��ЄMpvM���7�\z�64q|�I��M�Ay��&��$-v3��O�q�#��^9��r��}d�7��ãof{Ƴ��]L5�
���Vw���2{��f�1E�ja��o����?v�姿��O��_��O����?�!���G�jo�c���dč1\���y�������_�-�[�Ԡ���v�y>�=7\SV��l	��M��|z���w�6�ǆ�o~��g8~�=S{����k������tdKŬ����y�%����l4l��\Dg��?�IV��K�����^)�ɧ?��K�q�٪�{���~��_����m���J����?�)/��c} K���v�IS3�&e$
��~�L�}�l˘��o5x� ���T�q����C��+�\�F��V����������e$�*�Ӕ�����؎��y������,���HyS��o5������?£ґS��~\���9�����[�V����)��#�c	�z����[��#Й�!RkK�$���߷�'�EF�t�i��OC��H+�En-������]�aW�;�w҄D���{����C��GGB[�-ۘ�^�ih�5�SFN�o-���sИC���Y3�<\�i���]sQ�:�����H����֚�"�����L�փ[k>�`�T��X=����,��l��zX�TOCB�f/z�����[c#�XW�ȭ���nhE��Uj������a�+�LRM���s��Z�a]��4gQ8׶�kkڅ����wl$�-+��o�̷װ����]jj��m3�^��Q�[/���m��Kؖ� �(�v����d�\���|�D�a+�z:��V�hi3Z�a��T68	`^ڌ�k؍��ф؁�6[oְG9����sxi3^.a{�\�n�l΁�~����G����\��K?�KlWy��g��~���#/�x9^�i^b��,��9�$^�i^bo����s�ϒ�Ul�|\3Rל/�4/�G�R�Y9��O��R6�5{5`^�i^"{�!y-:�;���󲳲��߲�.'���bo߬(��F�o�'���ey��ܸ������oNs��Q�����I�ؘ��[p^����]X�䚦������I���P����I��*�v�5;�w9�߅�w��5��7��߰��ug`kۼV�����s�)5m����i���|0;ω���]𮂨�'@XO; ��0��V,��v@$��?+������Ƣha�f��i�q��MTS̤�ħ�L|6��d�-8w;��u(9K��N:we��n<b�Z��d�������N2g`{ݪI��X�=V��px!��? �b�?Y�_��cU�=_��ce�_���Ku�=ر:�R�݃˳+��=؁�K��=؁�K�=ر��R�ڃ�+%�=ر��R�ڃkp+U�=ر�R�݁�ݗ�{�cyy�P�;֗/����w	�\*����%���ev,��d/{�c	ne[�;��V2�=ر�����ʅ�r��X_Ɍ�`���ʮbv,���*�`���ʮbv,�]�˨>X*����%��y�K��=رw1/��`���;��/�e�,�S�`���żl�4~1/�>b���;�/�塚X*�����ë�;�/�晴X*����\*����%���;
%�ʩ{�c��b�K��=�G�{��VT�`����>ZQ}�-�hEu�ъ���˥���X��ֿ%J<�*�{�c��Z�H�x���4��P��c���4�wv�e��;��.�:�/���Y�����ZZ'v�e�s�_�mǰ�({ɰt�7����>4n^C�Q�d^v�e��UG�M%O6�DF�sþF��4+�u��:?�ޣ��_�mXx��q779�s�}'�]�l[��(�3�E��6���ڦ{`Z$���Ж�R��x���EthGxdU<q�߈C��i�Js#�I�t0R}�J �5}�l�<�Ǣ�H>f�9t�}H�ȴ�M�v�
h�;z5��(9��(o�YU mWB+�k+Ym�A+<���l�z�����«F�UJ$$�FV���4�m��W�ۅ���3��-��~%�I�^�|Q3r� �F�Лf���H���=W3����@��:L�r|2�qfo�ז]���
p^� �R�'zp��C����Ͳ!p��sp�{ٚy�4J9��L��-m��3�F5��C_�Ԍ	U��P{~�������˽>#���B~���ЩR��if�P��>�?�DE��_�����څ�n���n�f��<r݊9n֧�Q�ࠐE~~Kc��(�k����W|,oַR�T8L��P�?I�C����䍩� �2�B������3��|�Ri�r-��W� �9-L9U�n���.�
���R�3a��~��مf��jؕ�*��w���5�����\�z�>�q-/����>^xK!19L%��G�'#/�J��q��ݮ��:F^8�����b�T�3ˈrEڌ$X缜��~���юFӻm���T�r=BX~\J�l�Ρ���q���e,dm�]�8���>}����#������ڜ�tIG����*��*ݦ��M6�Cc��:9��f���1&�ur��ְY])����A���-�΁w
�ۋWr���f����U5qw�:9�
e���aPK�+�EAS��,~}Ķ�����ƾq��A����g�ccn-��u-�x�p��is���r5��s!tt�W�,&��"l-�[GȪvz>�a*��կ�C%���n���yD#9K�<H_.�V��#�:O������X�O��ʸ?����"�d��yg�������E��΁��0��)�8��KO�� �X���e�^����jp�����*�G�Y�h��=l���3�=��#��Y������#�����Y���9?�q��2���ZF1�G�ΒЈު�w��
�]�|j���ތ$�z9�c���ݎ�e���@#����~5���V��*=2t�4/��m::MJ��.r�|t*��AKr%�G�i��r?�A�oUY���9�����o^�J�iP~d����ID�2H���j�~d��D}���8�+���i�Q���W;O�w��ּ <0T�Qq��Qpߐ����G�)����6/-! x`�N��l����׸5�?x{�4xa�Ad�͍� $딡k��՜�V2�%0�f�PCx^��4�����j1i8j3�.�7�.�L1>�@�}ci��#��>_I��;G��g|���g��L F)J�[���G6;n�زy��O�OF���:Z~h�d+/�_O��_�UkE�� 8�V/�GR*�4�5��Z;?�{Qh��G��$[�~��"���I�t��"C��T`��+�G���+���I�W�݅����$da|P�dE�]��}�j4g��@YE�]���_F0F�B��8�����ڕkT�d?�Y���V��G�~��6
HmsOuX>P֯��+�y��G(�WP��Ũ��e����)�謫A��K�����0� ��D%�+(�*�( �[F�J9OYm��b�<�e�y�:�$�\�T���,�����Ri���r����ɟi�N�Җo�m��۽������\Γ֙%�8Z�(GH[^����y�"�p����z�� �  �������
/�^�^Y��2�KI�T�`b��LM�*T+���pDAYDˠ\��
�J�w2�JB���+(+c��d��,�W��e��S��([��,�A�*��7���
��x�m�af	[�/�l~��w���(ۮ�,���عV�l�l����N�|SI��R��j���`�z�H(��OF%K{��Մ���:��ƙ��*�Y�������k�*�,�
�ޥ	X�~0*Z���ѻM���T�l;�;�z�z����FMK�����d�/�5l����]�Y�����4����+8�wqh�������_���smd�
�(j��s�{�V��]�o��1v=
��D�(l�/YKe��yqQ�]9�Ps��������-O�_�L�<$�[�yޖ�-b��*TT���-#�����c1��~��e$���G�������25xT4�%{~\Cٰ�t.��9/�^ o�:ܐKy���]ϭ"~������𦛗νCP�H:�؎V��0�̉bI��ځ��kc)$v$]�����R��I�dG����Gtö��6%�_AY�S�Vz� ۑte�G���l���
�JO#�!�� ��_�iEXS�k$_AX��J.b�ʠi�|a�Gz�21�a���:Rk�|�5I���|�+1�� =�5_�Wˬ�*vT��&�W��d܁c�	T�6I���6)��A�$�
��r ����0�D� ���"p��]��I�e[��!���;�^`� r���I�"�}�e������Ed*'�i*�cax�/�JD�^YzJ'	���×̚}�m�uR'	��T��lk�|W��I��j/U�%�w��N���xH�N"�*�"<��4�h���)m|e�����PD� w�Rv��wU|�(�S�.��]Ni�8���A�t�i�8G��h�Y�<��g,�yX�cz �N��%�6^~g����ٓ�t�]���Wl��
���O��U6ȿ-=�62�þ��{i���:����� sz��N�б{���e�
�x���W��5�c+���:*v���҂JtJڀ�|��)|�!�$�T<I| �MI�q�On����Ce�
�2��(��2�Z���� Cj9N-(�d��ZD�?�� �Z�o=[	P�����
��j>{n����Le��4�Ŵ
+��+7-H��f2�Ut*�6qc�	
(���r��&0�{�@/�ѧv�"ն�HV��bt�<0ߋϑ�3��e�FC,W$2@���cok#�励K��R�^JG$zX`m�p��/V@Qr�ﭗ��� ~Z���~�k��t���g�D����U-�I���t��WM?�7�/�᧣�V� ��� ��E�mӮF/uä=v&�^���'V�|��4����ˋE�4_/#9h-����L����M����XD�O�[�XD�������>��u}��|����E�7��Nベ�~����zC�	*��?»M����rt.����6'�9f�B��Ğ��K��&�X��U�q��P�>1���M�h�'�?�6�ep�E�D�:�`g����������U�L���GU��sg��ݦD�����a���P_��}�Y"��/�~/����� �����0rynso"_c�p�"w��y�����r�h���o:����k�_���6U�`?�30v"	^�
;_�K���P2Q�Z���HF�J&z��O��_�;�8E�m-��d�^�D�06K8A%)�UX���ZE�

(��?�K����/�ml��[��Lt���%={c�&t���Š��/SƎ���x�t-��d"�N��3��v>|��"	�'�H�������w&8�Y��E'
�Up�\Y�O��֠{�� x��߰cD x�h}EQMO�;�x	�b*i�y�z��m� �W@��˂�I&��5Wl�kt�J�Ώ�N2�>���#�_�)�ޒ�+�N2��.���`�UA�+��v^Fv�p�dN2��>��IQ�2�<����N$����+ꨚ�`���4N�Y��E>��A�(q��}��N�UfEQ�4Q�.��ykH�n�M��Zr�dn�#+e��Q�4���R��6z8c�6M��E�/�G�~m���Q�4�>��+g���[/,Fe�D�:�>���*<�t"�]ut-1��� �H|��rמ�4��(j�|��jB�Ǝ����4M���,.metݰ�h�h{����k�����E=�DٻF�>x�U�&D5�D���-��[�r���`��@щ�����<���,��&�3�LM�z������tXHS���ZT3M$��Y湫�qMWW�1��&���I�����/F%�D������,���
��t�oՉ�w�F�m�;ٰ�C:����mT�-F��`ە��x#ۂ�I'B�p{b�;��:[+�u�YP0�D��\�3��Cs=wefL:��~D�^��[!.�T��A���a�Mi{?�e�6e ��)I#���y�4+2!�[ �r�Ô�'k]{?����.�1�t�����ՌR���?��EP-�D�����ޏ=�lZk�bdK:��>8���Wpco��.A������u�0p �hI'��Ggy>�����Y���A���.�Ip�����	*��ă\I'�]�U��
���x���Z�aW�zND�ѱg�|�wt&tl�_��9�>��������ˢU3%��J:��~D/�v��y���jTx �D��^I�ƚ�A'r�e�Nņ��pFC'b�G����;���oMp��ЉVw]�/���EeF�U��aN�,$J�qr���3��`�n����;���kM�Q�$�W$݅��+cWP'�����{�0��`B�8I�<Ey�Vq��x��D��
� ;ze�g��D�����W��NԹ��5r
�(��(���f���(�T_1�58]y�E(�� K҉2�#8Y�|��M�#� x �D��.C4�ܢ
�C'��p���k�B�C�<Cٱ�2+�F���z��6�o5#�9�N����㺑:��y`�D���F���%t��=�=z�)��A'B�e�ь����y�!�D��
��M�y��N� �E�=4�4H:�C��y�Rzj�D�I'}����2�Jch	
$�t!\g��BR�@�I�e��5�jZ:�@��__«<�� 4�I���d�Y�V�X�F:�1���K�V�Ė 2�I��#�<-nUǔ�N�.��z�E�V� -ҩ�h��!7+�/聤Sq�":�Ŵ��KE�
�"�����Q+/�T6�v �T[��m��؜Ez��N�E���[����E:�-��;���(���Su�"8(�A #z��T[�!+zr���ݙ[`6�F݃�H�ڢ��;/�`��d�nޏ�?h��x}��"}����E���4��Άn�E�6������	I(G.W���K��E:�s-����0��"�"�
�>������>tSB�H�@ѩ�k),��dg��w��v�iC��      �   R   x�3�4��M��LKL.)-J��".#N#Δ�⒢̤Ғ�"��1�1griqI~n*LȄӄ��$1-�7�4�L�G����� ���      �   X   x�u��	�0��ni !o�u�����������(Ҙ{����u��$^������TM���%:��#� ���rE
��c��2�      �      x������ � �      �      x������ � �      �   �  x��T=o�0�/���+���Pu�ҡ3���JS�����I*�8��{w����%!�B����Η��5�|
�� ��
��h��)�1�P�o����ۭ~��c�5��QEE�@$�QF]�A�����]�D�HL�(4�#�cɕ�{��@^H�?���tꟲ(��L쬴NN�[�Tt����*mp��6�ߺ��+/����蜲�2�3�̀S=��<�	��/�Q���"k���k|b�c-�[��<�չ�2Aœu�kI�4���`&Уy�p?���}=�l�{Np�+z�9����0.@��Ϸt|�u�S�g�@霺���T��D�و.|9��v��05Eo���4�Af=����1�����|^"_�_|�4�a\��=q��$�)`O��n�+���sUU%"      �   �  x����n�0�����6�v	�"BT��洠�I�#c���3��I*}+����

q�x쌣�v���u��C�(����A��>]�"���D��,�D� ���䬰�s�gc�{;�ȉW��F#�"��`�4G:�ɑ��-��d�n4��v�!����[�P!�<C��^��h*0E���H�.b
J�)�(zGWY���5J�����L��Ω�d��C������=�STk0�e�f�M��S������;j�ڣ������_x��d�{u�g���x�QS`��i�<G���q(p�������BK��u��.���=|���z�mкS��5�c����~0��Mw�Xo��&x�'$=�{���@N�05(x�+�����b��&�      �      x������ � �      �   �  x��\�r�F}������s�S$+������NU*/�H[\K�BRN)_��3M� �fCY �s�/����wc!d:~����ޖ��w����҅�૸|���!��(T��O������ꦞ����i񾾛ގ�����j�"C'��P�Rȗʎ��D��.�Q^���ty3�����W\,������"xg��
�1�X������J���F*��҈(0����'>�+]��_��n\w-��Q�ʾ�t#���%( ��}*]�BqM�G��:LG��������5V�dbJ��8*HZDM�(
V����Tjg��IU�$���I��W��r>������O��6�f���a����֮觃�Rl!-�oCw@�8WiY�.��{5���b|7�5��x�q�k|^��]n�#������V�C�4�UҮ�z���lW��H�ʈJ��.)�
�v����Q�'��FI|%E�Aj�kI�J��x8���J�R� ��`'@�����U)-j��{0���y8PI�^:���l���^D�4�}�@$ ��*���mA�89eF�W=�-���ۈ�۲��	��ⵃo��
OΎ��pv!�9H�osv���|����x^wA��y�F��[dDh���pq���%��������s=��Y/����͊'����i�I�%�r���a���'5���N�/�k��l�8u�~	��D�s�����ū��o�?��������5f��������XЂ<�O�n���&��Ȱ��'�|���L(!r�4�ز>Z�˳���Ha����^ۧ�+�d��?���M=S�1�X6^�Qr�$�QeK/���}��P�~��� R�<���)+yp[	M�B�vс�{C���%�����Lcre'�G(<Z��C)�kf�'$.{`��R6�s�������W�B%��)�-~�gK��k��طӌ���֮7��Gl:�	�:fu�z�o�1��A�
L��X�68��p�$y�D҇d.}����B �e�c�Z�aN��-��t��p�qhf�v�~P�k2��7ht�@�p(Z�E�19�x�M��1�?M�д��ʹ�I��N M~`N�o��lV�gӯ��b�|�'�Q��vt]�=<.F+�p�;����#\�Z4��?C��l<�:?ַ��P5/���[*	0��q���E��Z{�t[9LJ�7���j����~7���N��͞NE��<�z��������5y��<��T��:���&��F�7��
����9���h$>Z� P'�	���"Bw�K̱aq��`�����:`<'N٘R�DI��G��<4q�N�F����Za�A��J��T(e�"�����Z��:��o���m(bAcx=vd��%�@���nz�.�n����ҼLu�T����}�}P��)(k_YL�@��Ws1���6�[�����	C�ը��ʚ��5���x�VB��v��^(5f����V�����;��*�#���ɨƔVQ՜�9Us��1:ڻ��������|%��Ĕ��(�'��d>�׹�mU�S	^qi��-�����Rg1qߧv6����q��V �*�+��7CLj(����lK��,{�j�xw%�_�a� A��1����ɝ�^�H/���Cxopn���a�������G���Ks��a���<��uk6oB:UIѵ`��n�H
�-K�)�@�3�a�ֽ�#��#�6r��x^t��I�Xa$�,���H+���1��ߕ��+q��Š
1����:e����g�NQ��}���9!*��T�1�����́����������lI�)�+���y��¹�?q�HH�аJ�Vo��BG���B���4z40m�t��CUyqT�N���/"\�rـ�Y�A���om�h{�.u���AI���Д�(5Rue�h&����G'��,Y��{L]w;��Αi^d�G@�׎�׳ۙE��_��?=��t�����֜�ǎZ���	�Yj�l������Q��DW����o�I����-}�9�ra��-À�����O�.��{���B�8�F��BPN�7_�rM*���
�ᨦ�����@ T���a#�,��2wW�Rt�])������/ւ�� ���:�Yo��B������nҽ�V�Đ�����G8+��u�?%�f��f48�s<��(�ȆTq�����2ժ����1��w���5�>o=���Um;!��eq�v|3]AD��8�cƲ������d�u��u9�]���o�.Q���kTLg��_N�����}*X���)!I���ؼ����0�����'��� ��}@�f˛!�\Ͽ+��Lf�)��C��C�ޣ��֗?���)A�������������]=g���Q�����U���*��o���_��Y�2p���/1�u��.3i��j��Tf��A\��"8����z�3�G^¸�����l���z\�ԑ�ڝ�|e\�n�JG{�W�#�o��R��/>N���6&9k��ԫ�u֚������=�Rj���N�a$�]���R��N��N��"	2:o4�ܰL,D��RW'���m�˔�h�C�X�x' 8-��2�I�{�NH��",M�$5|��aɛ(�j�Kj$RcL���a��x�Ke+���enX��r�R�J�R{LE���D����ϵ��x,=ݻ�f���K�d����n�8K�\��@f���!6�̳��PsЀW�qu�d�M=��t{L@q�q��D�;�FTʗ^)!;,S �C�X� �B��2?O�cI�e��YC�����M=��PZ ����)�߉�yރX�ص3�]6�eK`��y��������2;��%���9�ѱ�b7�f�,�:�3sNz"����.�����]f�9O��V �v�J��a�n��f�9���/��5Ƈ���G2���Itˏ�F�)����a�y ��ƍ�!{H-Ơ��̙J��!M�nyCh���|>{�n�`H��a4�C��rʀ:W"4R�x�!wHS�����(k'?	'�(!�h{QN�3E�ᐲvZ����{ͼ���RVO�R9�IR%+��.K����Փ�T��R�ԥ��"����Y=�J�5%H�%Je���)?�N�;�Z�*hzbP��&�����!���zO���	)��V�=�*>O�ے+/�D�j���nq,�����L!M�Ԯ��!���w뭄\�s|kx�R�@�N-r5�U�gd�Ϟ�vܔB:�m[�x�C�X�5e0� �ܠ�x�|4�t	F��Ĳ��e�[��ŋ��^c      �      x��}�rɑ�s�W�Fa᷸ԓ��[��h��Fc6&�5���1j�9(���7<2,UY^y��Z6�)4p�3��~\`��l�����������Ï��O69���	��}��ǧ�O��ȿ��O7 [�-G���o���������)����rv�}�L�$���z��ъ��ǻ�}���-�-dE�i�y�6O�p�I�-�C�L�4���7S�0m%8�� D��s��<3E�	JD�^ ����� <M i��a�b9��� rP B[��1�lQ(��D$l)8��S0 �9�T#Rnov93��@�#FR��H� W(�A�!=b��V$ [d=$!�-�U6w*���"�_�H���Hѯ.R�`����D���	R>�<�@��4(��C"��4ϙ=%l��dRl4l�1�'_t�z*��b�|����0�
��)��8
[�� � ��? ���	_p��_~��'ώޞ��O*[����(����0���]J�R:\������y�^��8i�?�eV�_Y�N��_�%yu.S�br��K�,� �������E��:2%�@Y���LC(aI������P>���<�I��O"���G)Ua�"X��l�r,��5�b�QW82��Ё��<���bp+Ơ<;��V�9�U���S��W(O;cP��#o�$�)�=>�\B�j�ɛ�ql���c�!�3�n`F�q��''�Y��t3Js���1�8��o܏x�ZAtE�J���ߌ9��f�8D4�| �}!Y�/(9�C^B�f(�,A�%�MlOA��O�Rqtc6��6�d��b1=�-��ɶg$J�zp ,9w�l{F��*��)P�s����7#[�΍d)[`����q�l{F�R���b!���d�>%�K����FZ�K�-.����72��Z�q� ���pť�R���8{6�I����ղ�L���<�f��r��V��GT��EM(F��7�-�r�R���:\\�lP��I�*hpF�~��Dň6�=��Kaf����eI[]2e��`�dAY���r{$[��ar@1N�k{��Yf���m��;5�,(���&E��r�s�����&�����Q���,I6�<eqԣ"hIe�&����L����&��e	 ����s'��F�[�.eo�=�I*��$EI�V<NzF�񨉍1Y|��$��P�BKl�D=q[�����8=���T�z.!Z
�I*�C�<���&�,m%�bA	>z˹�n{F�E]*�ŒpK�lFM��A�iz�3��G������I�-�5-���$�(�Df��Qj�T�%�N,�7>��?�X�-�^CN�lR��@fX Tz��nw,���^�t�Ɇg���Sf��IS#ã(�ydL��\�&5�er��,i����d̀!�e����Ԡ'�@�2�2=�29eK=*7��w(���/�`�s��'��q��8gS�,7�=I�m%$,��e�RO�28�����ܤw����P8f��a��[��KtĶ��鵞q¤z}<[�������1'�*?��3V�RdJ�2?�����D�%��J�OO���)[F'�%��I���\y��b&�7)�T��9Z<v�Mj>I������e�|+ԃ��#Z&�}+#Ta��`z���չ�P@Z�� ZY!�pԜp���
U�)Uc�٤ݭ������I����Dk+tpp�2gS@+T�{ޤ�����F��VaP��eu6M0[٠:J�´�} 4id.0sw2c��]�d�:��1'L��>�&`�4�k�T�g��JlRұ\�S�(X�&6�A
S鮒i����ڬE�m6��2C%B2I���o|��v�3)�!c�LK��/0�A&�/ނ�����y�����3h�k@K�N���~���{�i��q�9�y�	���������~������k�bĂ�/*������U���}6������ͻn?}��������~���m�ۯ���Q5π"�23�3<�}���>�Ai<eK5�6����<����w��
�,�i�8�e��c���ʸ\ǂ8	%K;*�(b��=܇ �=��5�倚����>,�'�Y�2���E���;�~�*�Uڱ�@ ��C�҄%
S����2	
 �Y���v�iy�I���5���p�4���X�/�س:�+�������L9�J��a�|�F^�
Z�a�Xӑ�M��Vr���O����b	�-�WP���^���O���+���E`�B������F)�yK�$pe��Hc��H�2#G�镨p��y����*?�����<�,
W�R��e���@��/9,��d9�Ջ��ǹ4#�\��,: ��0�\><%�����\Q��,�vhf�h*�ʪ���F5,6�d�X�\R�b9�j%��LV�cq�KfC:��NX��dI-jU�g��Y��B��!A�O���B��P _�a���1�2N�C��T�8rVV�m�j ��� �v�*d��b$S���T�9 ����gQS��^L~wǰ0��m���.���b;@[��Z�P�%K8t�����&6ō�GB��?N�-�i�T�Ee���A��x+�*!�e�O'����u,�0�Tp��p��ɯ�j@�[akzi�m���U��rSg�RDS:�e��
�N�-:�j���Y,��rp�����H�Ao�fku�­�� )Y� b3����/j���K\(:�p-�EeI�b�"7���8��4;r:>XCDS�%�ɔ�*�B�0����+��|c�8����r(ދI�b����Z�R卌d�����z�a�'��#�Yl�}��I&@��=$h�H�!]�h��J�X�	��I$�}6ѹA���-��Ľ��.��˼;���/Q���1�X�p�wS�+^�VХ�X�f�Y"�B�it�k&%����u�]k�&W7����@jm�r��rIL�����*�1��
�u뱋D,�!�E�G!k!2YE�UH���~� x��q^xAI�D�Bc���/85�LI�,��Y���!��2yz�5R�X9~S�/��G_#�Y�3��L�B��"��S	����
t*ײ�([Vw��+[G]����}�ZV��{��V�:UPB�l��_~����I�r��O7M#�YD9eS�t�4R�QU�G����зJ�"���bl)ҡo��TW����O7M#�YSB�N���4+�`1�[k��R��K e����8*i���~Kq aqT���s�r̀V ���(T4�Iʳ���g\�:����R�G����N;�L硕S��|�dI!�2c�3�,�b�9y�j\&[��
KKA��am2�
3�r��2��x���Ly H��;"4�&+�t��;��3��4"�
��0��$��bk�j�c�0�kb[�j���,a��
7ؤ۸�U�"�H!X��[�Z�\V�޴�
q�4�4�Zty��L��ӂ4K�5Ϳ���8����K�^�5��T�Dj܌!J��7�h)8��b�E90�����E��D�L������%���|)4�nd%�dAK�&R��u�Q;I�&��a�i���h�M	yj]���h�f���cGs���A_{�09�<��5��Q��	��E&}�-��­d�����Β@�����>!'S@�-#�m���ޔ���M�#��f(�6ZG�cӸp����8.:-Ӡ�h4�Y�۞[�˳1��d'��{�ܲ�P�v��dj�Aij�:�T���Yp�ˊVy�-,/(�npA�2	�K�]��J�m:?��@�)��M�-��;��K�E�����T�03��d����K�S�%���
ʜ��h:�-
\_`&�������-Ҵ\�Т������������4�I,�YZ�f�C4�1��6hJ�0]�V6(���(l`ЌPS�)��,B+TY�5aJ�V6HW�; �"���U�%@�hQ����/0��^7 Z`��A����VF(��%%�B�판�ޛz�b�H(�S��S�)��B�I!�vV��4e�c;+���L�~��"p)�z    Sb;+Ta�e�#�&Fk�6� �����a_�9��AJ�4�O�-v�C�B<�tSjݘ�CV���MkEs�R��-�V���K������bo�7�Y�%&CvP��e
;F�������`jѶ�0SM�q��Mjb�:��.+��3�#|�ˎ����,LLc;:�R�j�!���+\�u��25Z�D���o�tn.�+&S�mn�-�J��I7��e=�}�=�"�@l���ܲ���[,Y���,h[���h�E�&ܖ�L=�r$fSQ%7�����Y).N�%ߤT��!
3�&���H�Tc��r�ȷ��ab�W,�.����
W4</��4�E�e�z�����v�ඤ�����,�E~�ZӤKN8�h��c�h+����v5�t�O�n�f^M
lA~w;�(ٴJ��%7n7)�eF��%7���sz@1[v�4maW�t��ɉ��3@�ڨŭD'h
�Z۴��MQ
�MG��MK��?*z�օ�6��$y�ȆdAk����D�ɵ����i���$Kᑠ�M�d	�+� [۴�I���lm�R7�L�Z���}6I��QK�&���c{��P�1o�� loԴG�ia6a{���|�����xq��U#�`�Ң6�=N��I��$`��gt���peL%���Qe���Õ1�������2�MԚ�����/�)ϖ �V����Aκ� �	�n�S�/I0hi�����$��ޡy3����.@Nb��q�V�JtA�DZH�g���V��	����aB�9
��#�x:3�8s����`Z�J�3:�I7����3Ï�'kVT��xK�diI�38]�i!�$n��D7d�V˲D��Tn����Ɏ*'�g��%=��#�q��%N����p�������2�B�@<=�)O�y-J�&��(���\��v
�-\#$��΢=�e,���5�p��,��$��g	���
.����lǳ�5�p�Z�cD�.I[��
Y@��"��{i���,�)��4f�A:�É�N. ��O$myw��d�@2�C+%�8ҽ�*��Q'�R���|ڦ ;�u�j.޾��0�M� Ct��a�q��RF]����VM��<�dݻE�&�5���~����<X�:'�[� E��u-�\!c�k0FSf;4�z�p�@�e�b�=�/0���e��b�=�/8�EJ��H�|�Y�G2�b�=�;�	L�W)6(d��'�����R-���~�F�d��f�֯
d���9��`*��6!X�I�༤lJ]�6!X�Q88	L�����6u8��/��B�O��q�8A��s0�'��ʒ
Y@!'b!\��$O$oA�՗`a'��$O��,�4��՝�o�(����K�v���<��Om�Rh�&;�o�@NY)C,�g��&KYur��Ͱ�7P�wgc��b���������w�n?y�â�O����C��4�`rq�ߦ��1¹���_��o���U�D�R�H���}�qv���}�3������=���,#{?�L{�oA�=�3W~Z"c�2��0@�F��c��@Z����\Z��,��$%��t|�o�^�ՁB����4�ľmzuY��vd��2�m�;�2f=��B	��2��>�B�t�I�,��}\��c���,�Z�iER/�ujN6�Ӷ�X!s�1��$Xh�fYs�/����-�L[���\v1KFC��0ˆ���_Ka�-id�7�X�F'岑E=CkcX��rJ��)�IA@�Z���B��-iP�������Teh[j|A�2Y�"�v��y�7O����L,��e��]��u=�Mm\�[n�][��06�q\t(-M��mk:Ȥ�� -�=��#�2��@wc ���I�Ab$o!�a\��S�uEM�42+M���ۻ�{�5�/�������6_���R���?�����o�>�?==�?�=<=zx�\����0?����~��|��x��~�}����ݦ~A��}Ɂǒ����|����w�����P���=³�&A��;��W��(�8����T�ݹ���x+ҿ|�:�s�%�Pi���������t�xv���Ⱥ\�W�8
7w�g"�.;o��x���F���ɸ�l��i���=�/_���S|s ���������~�d���ղg(ܳ����܂�!����٨�}�d��� �Ȝ����R�Q!ד3�?���0�2]~n�����.0%��ԝ�`����F�����<�;���U�巈Q,�e̗��֡���I�B��<y��Ha����T���{��I�J3c��&S���Ʃ0u���D��!7�^:/]n��uK2G�u��},h�g8f�.�Q8�u��\���Tù�M��\�a�dùHb�lù��:����+�7����%�p.pXC��\�K���)�)�?<�'�?��{㖐t�9�Q���]}���TG�����Z����9$� �1v���۟���:EB!{˄G����@���)�P��ѕh�M9�n��qjS& E�Qy��ǩ�K.���yy�q8c�8uഒ8u��@ 8
I��q��u 8�t�vfjbLZ]�:�9�}�:���Sǁ�eQ˙q�8�qq�8���Y��(�y��.c��q��A�:pl��<L�A^TM1�2�l)���*z�x�pu~&�H�	��f:�~���J�ⳓ��B��9���U�X�|�I6���������~&���e��XM3����ۊ�~4����~�����kr�^g��K�F�Ve����+���G�{��g8�d��d��w�g�ʺ2�(��a�eƳm@1��~����o���.�E�`gy��d��"۠�ڐAĢ�pI��O������'���Tp�|��M�@��{��e�\/,�I#���c�gP���}�MZ��G�h4���j�Tǲ�c�l�������!�GO�|�N��&8JL��`�zFQK��*?0X��S���3Eq��Y�kb	�-+�<�)`N�Z��Pʧ�@pT��K��(jv%H3�@u���3CcH�)�S= 9���K��f��>�H�:!}t����@�J�D>�IҼ�}��~o��]���Z*�̲�QH�B=|+V̺5KT?ƀ5l�j)�nL�{�9DLIٌ��l���⼰�~������KT�E�[�.
�6iI����U��<cbS�B�!V�;'�Ob! �m���!�h��Pk�X��.� R;Y�)�\�aOJ�1�����*jb�$c�-d��[�س{A�J���ejY��u����GjA�!k�8�D� �W��i�����K���@3�8\,�8�g���f��!b6�o�yl�C��y
1[���:P�g"�4 ��
�^E��{���vk��,�TY'� �qY�e,��.)�Ϣ�d&�85���r��TY�5X�Y��u�@ӹ��2N����.��Tƒ4K�w���lY��5�U�j@	Ă)�|��h�i�`YV(a&�8����z���L�q����k$��ޒ�����q�$��T�aup�xͦFXC�[*&&9�MI���XP#9��Ѥ��a��@��k�1a�QA�"xӱ��ɧ��n���T-q�^�7���A�ŹO&�a���3QL!X"����F��t�(�|�R�,��¥�Y@���y�c]~m�8�����(�y-S�c�'����($�rjt����N�'^G��O���)+�<4�:�o�x�s������ݍc^z�x�K�@^ʟ��x���QЛ��wi�sQ7��zα��7F�:����|�b��c���tS�
u�k��[**���`��
��R�g훷���u[�Xg�6�d��^��6�¤�L[b'��eT!����8�H'��k@]:��	Z:=B��}�䓜�4������q�_��~���~���[����O��>>�����O���}�}|.���i󛽼��C��>�x�yҼ��۟���G�����Ծ���]ń�=4�H�b*�F�'Lϻ׾�%%Tt8��2����$]�P�䢞0.*�t�G(h�<����PW\�?Nt�/������ӣ#����ŋ�l����Res��I�p�(.���xI�$    I]�dU�v�\*����D�����%U�t��B����T�]�~�����ˊ�PlU!�˩�.bЌz���woL����o�=�'�Zx�Y��2q�%-<tnt��z±* �.c�r��ߚ_?�=�������Z�^D��T,���_���g��q�g��Ϸ��滟��v�C�6L.���� 	�t�a�0!
h,��s�QNj���u�I�����0;������qg\\lx|җ�����Cϰ����b/�Wd��� 4d�"�$�Ycu�ˏ�W�hG�7�)y�n(���` ���K��x`���𰈠2{V�6H�,�Z���U7�v����bqz`�����,4i����F����3�睽{x������?}����7��gz{����}��&��T+�Oݣ��d�A��
IGNs���"�,��]�B��X^�P����y���s�Me�V�3���:_�~�9��]}�����v-�G���Ќj�y�J���h���9%4�z���\O�S~���Ы��h���G��ˊ����Ր/!��S�S�u]��e���~�ŭbᬳ|��Gs���|J�쓦pD�����]P��.�ݼ
+�n)�iG�k r�v~����6dH>F��w;,���GԱ�u��Gz'����dx^?�h�E�TU=����קg������E��k�K�"��%qY�V�Wh"/�C^EigA{Qgq�i���+���|��6QBNqXW���1(�H�%�0��N�����f�g�I �z�����PxEB�Jd���;,(��d�g[�x��(q�X�l�^��v� (o�랡���h�/��|�3���^�N�.i��8���rt��IMh�����ɤ�$�˓�f�#��%Q���
ו)}���f�,IIE/�)e���c=��T����y�3�%���%{�a(yi��͜O%���sZ��2��(�M��]B�����R�P$����?=���B��E��y�2��6��*��؝.�͇������?�>��F�5����SW��"L=etQ��֟���Ϸ?�~-�+�.��������fLo�9�R��<bP�HB�D)-���ɛ�
�u)dX"�ȩK�&1a���T[;.*�K�+���n�r��/>o�!i��k�4fmş���U�U��`'�<sA�&z��ܮ�$u�(G������oK�^�頤n�, ���L���$���x( ��N��;C;�Q�C���X<�$����Q��*�9]"�i�����	B�dB6��:����?�K���P����0���?ͪ`R͎zE�lw'u(�_X��^��fL��5��Yu��Ӡ�&����4���%�@��7cq�=��'ˡ��B�_�{�yI���G�뾠��ձ��pFң��u�>Ԟ�,����4��#��#�0�:;��=k�R|T�C>����Ǜ�n��O�ST:�i�ʥG����b�"R곛[Z�j��G/z�N{_�B:��s����t"�i�/? �֙s�����/._����(������J�J�%�����`���҂���~����!��pq(I��EH>�DWz��v ���v��C�1u��-���xǤE��"\�l���;&���FzrIi����輈�2�������8�Q)x.'�+�B5AG�8���Z>w^h'�#]!kL{p�Jt���U�W�ګ�dX�����=BS��/|���je�@h�h�:�*�"�./&*^WI��AJ<�.&J�:�O����z����D��PhД�!�t�r�+��E90M��6�rC�'ư?G?�L���x��j9hQ��X�גr��w�n�?�*��Z+��i��e��d����/��#�;(���rJ�����fq�i�z<R�-�2Xz��ϨI�iN(�7X��'����
|��� ܽ��
�PX{9X��N|���*���>����=�P��=UN�X��;8��Bzu�{Hu�9 �0�%�W��H��}����ٮWZ^X*�uy�bV�l�O�޳T�x@�|��_�#L_�L+���0k�� ����7Y2�Ba��H���k��_�%$8	{�}�28�"���Pj٥���B�,B�i(Y�5'.��`(����4?�hL�S�W��Ӭ�t=�J�������;$CP^�`k]��zm�t$�P�颩=�R��%�ғ�c�WA��Q�v+�	�_t?b�yD?�������{/Q���c&K`��Jr��k����'�.&'�XG�C�鄜�L��F]{L��\��pb� ��t3c:��v�'ux�5b�ܻ#���!>O�/w�c	E{ ~w��S�bt��3�g��M���4�X,r֔�0&Z�"�PҖЕoN�Lħ��mp��T�#:q�ɰ���y}M�ud����Yy��D}Q���N"E+u�]
G�s�J��>��i��y�!��	���&+�b�'N#����U#:X�j�,1�F�܆܃p�9�DϜ_�?�/���0R��	�ړMH��/�`_e�_򤃘G�ܿ�����v�c8�卄&����O�`�&�ىs�!��� �� ��7��]��q&��JM����)XhmJ�'*�A�z�VL,@�Y��]gt��E��-�����]gt��E��q
LK�٠$IN�0G9ٞe|�a|�A��%���XN%��rw��:P-v��,�cɤ	Zv��  ?���b�Iq�e��}|�������OO�?�|���@�����퇏��nv�N�N,=�s��&=���Pd�oPW�����/�Δ/'.�J�,Z	'l*��'���@`1q@�g�I$��R����_���(��]�x���}*�Q��R���OC1Y�xI�%��Ѣ=tLe��a)��C�m\Zj�b�t���APva,�cN�+meG�ʶ�{Y��Ϗw%4�phE�/��Ϲ�X�9&�T��z��tS��#��P��%��"y�䰰d��w^��Y��:Y�r�������%޴c]��A9�}J�y�?�9�t~D��I�/���_N�o����js��./�xe��IGu)���E�f�o����U�����\\�y�T"��T�d9PN�G?-��
��!1
��72J�9k������m*AS�5����-�r��|w���R��������_��K_��=��*�̸�#��'n%�W�!��1s,#m�/�V��Z4�[I]Z3�p�M�\���wR��p]������R�e)EDap7�LBJ}��p�V�A݉��Cdܟ�Y8��z���M����V�K0�0�=�Ȯ�g�.߂Dkֵ���7ܤ���~fm���0k�7�bƇ�����q�y�>vQ)�p
/�&��$�/H����VP���@�:+���)��;���������]b��*�P��@p> s���<!�˰��~q(�U�r��D�1�4(���(UR�.��K��)~�ھ �Z3M��&(X��������V8}�6{K��JŒ��5RzN�j_��U?Ck��E�XD� qȣ;C�LQ�EE�1����m���1������W+�_�8Ci.Y,R����1݌z��E�Ks^�h��"�O���[fQ�ɟ�>?o5ro�$��}��ƭ�?I볺H�N��3YG�8��"��� �Ȁؽ��|J\��m������:���F�������e,7뀠��)	 e�ʝ_}~z�������/��ME Տ�����>��'��x.��U'D2���ƥ�}h�é/2b�_����y��ө���z���$�I J{�/�͔�+��-x�r	ui����k�R��W�nO(H�cq���$���z�y�=�{ϯ�U9�~l�G p}M��r��|�^�-MoN�kd1�{jG�iC{qS���L'X���|O\�?��rHʭ���55���CjYP��=�F8��D"W�^�'�]d_U���:J��;6�/�o�C�W�[���ޢ|�9�:�	⭤�A;\�1;�r��7���ā������'�w��RK������F��:B�>N�4K���Y�����a����{�D���N�� �  �������G�����~�S�'����>wN8u�`�]�%��E%���P�i@N�����S���_M��	��ez��V#�T���³��=�-�7��'|낟!�p��3��'�����2�����=V2yy���u�8{{�A.��2�T�Tb�,�U�qD���`�3��K3��Sf��e6A�Ye�,R{���v|}}�挌����̣�R$�S���h���\j��O����PpY(T�f��4���{x��O�|�/���:"�p��N�q������c9���?ܖ�����������	�s������= 9(������%�����`���o�>�|��۟7�����9:���O�?~��Sy�_~�Ln�ֲ�����?�>�����s/�*���}x��??��m��H�+G]j��a�������E���ǿ=���|�~D�e���]�>�~v4(�C)�C���׽V>AEH�RY���goz���{��s9�C�j��߼���X�"�p�w�ʗ���%r�wK��=Y>�����e\j��<kT�-��\8j���n>�5�*�]t�!C9v+PE/��ݧIT0XY|���b�[⏲�$ޭD$����]_�������f���F��Tmu=��^���΂�Zac��oM+����@w�=��Q��w�}Xj��\�Lu5Xr�D�&��ͧ�#�
f�:��:(�����kmR�{���I��8��j�]@��"��.	�L�X�T��1�݀S�/&U]Ҥ]=,8�N����(d���b�Y���Fk�jg���	]��y�T��JS��;���^�^��~�T��C�ehp���T{�߫�NkL�*{e����z��>)DWYq%a'�p}Q��d�W�W[qϜ"��d}��*����j��*��»�I�3�}��&���;̎rȰ>��>q�W[���.�A��'�����+��تH�;(��M����SW|5��hߗ���. �d�\�&�-� ���L+�j�M�\�#��Z��	�S�����n����
U�����꼪��^�^G\E�F7fGQ<�._z��+�눫H# ��")�O�����Vrqk#��V��ЅlU��������)#��tE��j� 9˅R���s�$�\G�U����Q�|����/��!�sYr�V'�TG���R������dz�{1WnW{�L�B��e۹}bK�#��d[I��rE_�K8[���z�{!X'ܤ]�1%Z�ʍ���k��ŪpttJ�h�����^�^GH�	7�=�T��ժ��K�U�uDf�p�H(��������W�� -W�����g���܄>�&@+-�)�a����I$��tE�ՁL���j����tR�銄+�)j�B���۹	}n,\Q�FiK��� �Z�ֹ	}n,\Q�ƾi.��_�ZH��Ы�+�И+g6D��k�K����+
͸([qYt��ڄ�������L���S�amsr�|���fl��     