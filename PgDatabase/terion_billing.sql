PGDMP     	                    |            terion_billing    15.2    15.2 �    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
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
    public          postgres    false    214   q�       �          0    38204    accesscontroltrigger 
   TABLE DATA           �   COPY public.accesscontroltrigger (rno, distributer, product, invoicegenerator, userid, customer, staff, operation, dateandtime, invoicepayslip, d_staff) FROM stdin;
    public          postgres    false    216   ^�       �          0    38210    credentials 
   TABLE DATA           `   COPY public.credentials (rno, userid, username, password, lastupdatedby, updatedon) FROM stdin;
    public          postgres    false    218   ��       �          0    38216    credentialstrigger 
   TABLE DATA              COPY public.credentialstrigger (rno, userid, username, password, lastupdatedby, updatedon, operation, dateandtime) FROM stdin;
    public          postgres    false    220   ��       �          0    38222    district 
   TABLE DATA           X   COPY public.district (rno, stateid, districtid, districtcode, districtname) FROM stdin;
    public          postgres    false    222   ��       �          0    38226    districttrigger 
   TABLE DATA           w   COPY public.districttrigger (rno, stateid, districtid, districtcode, districtname, operation, dateandtime) FROM stdin;
    public          postgres    false    224   ��       �          0    38230    feedback 
   TABLE DATA           9   COPY public.feedback (rno, userid, feedback) FROM stdin;
    public          postgres    false    226   ��       �          0    38236    invoice 
   TABLE DATA           �   COPY public.invoice (rno, invoiceid, senderid, receiverid, invoicedate, sendernotes, subtotal, discount, total, invoicestatus, lastupdatedby, updatedon, senderstatus, date, reciverstatus, transactionid) FROM stdin;
    public          postgres    false    228   �       �          0    38244    invoiceitem 
   TABLE DATA           �   COPY public.invoiceitem (rno, invoiceid, productid, quantity, cost, discountperitem, lastupdatedby, updatedon, hsncode) FROM stdin;
    public          postgres    false    231   ��       �          0    38250    invoiceslip 
   TABLE DATA           �   COPY public.invoiceslip (rno, invoiceid, senderid, receiverid, invoicedate, hsncode, productid, quantity, discount, originalprice, afterdiscount, totalprice, lastupdatedby, updatedon) FROM stdin;
    public          postgres    false    233   ��       �          0    38256    invoicetrigger 
   TABLE DATA           �   COPY public.invoicetrigger (rno, invoiceid, senderid, receiverid, invoicedate, sendernotes, subtotal, discount, total, invoicestatus, lastupdatedby, updatedon, operation, dateandtime) FROM stdin;
    public          postgres    false    235   "�       �          0    38262    position 
   TABLE DATA           [   COPY public."position" (rno, positionid, "position", lastupdatedby, updatedon) FROM stdin;
    public          postgres    false    237   �      �          0    38268    positiontrigger 
   TABLE DATA           x   COPY public.positiontrigger (rno, positionid, "position", lastupdatedby, updatedon, operation, dateandtime) FROM stdin;
    public          postgres    false    239         �          0    38274 	   previlage 
   TABLE DATA           Z   COPY public.previlage (rno, previlageid, previlage, lastupdatedby, updatedon) FROM stdin;
    public          postgres    false    241   p      �          0    38280    previlagetrigger 
   TABLE DATA           y   COPY public.previlagetrigger (rno, previlageid, previlage, lastupdatedby, updatedon, operation, dateandtime) FROM stdin;
    public          postgres    false    243   �      �          0    38286    products 
   TABLE DATA           �   COPY public.products (rno, productid, quantity, priceperitem, "Lastupdatedby", updatedon, productname, belongsto, status, batchno, cgst, sgst) FROM stdin;
    public          postgres    false    245   �      �          0    38292    state 
   TABLE DATA           ]   COPY public.state (rno, stateid, statecode, statename, lastupdatedby, updatedon) FROM stdin;
    public          postgres    false    247   9      �          0    38298    statetrigger 
   TABLE DATA           |   COPY public.statetrigger (rno, stateid, statecode, statename, lastupdatedby, updatedon, operation, dateandtime) FROM stdin;
    public          postgres    false    249   �      �          0    38304    user 
   TABLE DATA           b  COPY public."user" (rno, userid, email, phno, aadhar, pan, positionid, adminid, updatedby, status, userprofile, pstreetname, pdistrictid, pstateid, ppostalcode, cstreetname, cdistrictid, cstateid, cpostalcode, updatedon, organizationname, gstnno, bussinesstype, fname, lname, upiid, bankname, bankaccno, passbookimg, accholdername, ifsccode) FROM stdin;
    public          postgres    false    251   �      �          0    38312    usertrigger 
   TABLE DATA           ~  COPY public.usertrigger (rno, userid, email, phno, aadhar, pan, positionid, adminid, updatedon, updatedby, status, userprofile, pstreetname, pdistrictid, pstateid, ppostalcode, cstreetname, cdistrictid, cstateid, cpostalcode, operation, dateandtime, organizationname, gstno, bussinesstype, fname, lname, upiid, bankname, bankaccno, passbookimg, accholdername, ifsccode) FROM stdin;
    public          postgres    false    254   �'      �           0    0    accesscontroll_rno_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.accesscontroll_rno_seq', 87, true);
          public          postgres    false    215            �           0    0    accesscontroltrigger_rno_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.accesscontroltrigger_rno_seq', 221, true);
          public          postgres    false    217            �           0    0    credentials_rno_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.credentials_rno_seq', 100, true);
          public          postgres    false    219            �           0    0    credentialstrigger_rno_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.credentialstrigger_rno_seq', 160, true);
          public          postgres    false    221            �           0    0    district_rno_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.district_rno_seq', 1, false);
          public          postgres    false    223            �           0    0    districttrigger_rno_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.districttrigger_rno_seq', 1, false);
          public          postgres    false    225            �           0    0    feedback_rno_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.feedback_rno_seq', 5, true);
          public          postgres    false    227            �           0    0    invoice_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.invoice_id_seq', 1312, true);
          public          postgres    false    229            �           0    0    invoice_rno_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.invoice_rno_seq', 343, true);
          public          postgres    false    230            �           0    0    invoiceitem_rno_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.invoiceitem_rno_seq', 342, true);
          public          postgres    false    232            �           0    0    invoiceslip_rno_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.invoiceslip_rno_seq', 5, true);
          public          postgres    false    234            �           0    0    invoicetrigger_rno_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.invoicetrigger_rno_seq', 499, true);
          public          postgres    false    236            �           0    0    position_rno_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.position_rno_seq', 5, true);
          public          postgres    false    238            �           0    0    positiontrigger_rno_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.positiontrigger_rno_seq', 2, true);
          public          postgres    false    240            �           0    0    previlage_rno_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.previlage_rno_seq', 1, false);
          public          postgres    false    242            �           0    0    previlagetrigger_rno_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.previlagetrigger_rno_seq', 1, false);
          public          postgres    false    244            �           0    0    products_rno_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.products_rno_seq', 128, true);
          public          postgres    false    246            �           0    0    state_rno_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.state_rno_seq', 1, false);
          public          postgres    false    248            �           0    0    statetrigger_rno_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.statetrigger_rno_seq', 1, false);
          public          postgres    false    250            �           0    0    user_rno_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.user_rno_seq', 201, true);
          public          postgres    false    252            �           0    0    user_user_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.user_user_id_seq', 1010, true);
          public          postgres    false    253            �           0    0    usertrigger_rno_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.usertrigger_rno_seq', 840, true);
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
       public          postgres    false    258    251            �   �  x�m�ˎ\!D��1�<�#�z6Qv�����)@\���R�c(L�P���G��s�b#2���͙����D�<���g犼8O�S������Z�|�K�����@��C��'���` ۑG�	vȌ)��$Ť^3x�����{-��s�[�k����8
x�}vwʖ�_l�v��vv���>�Q�X��	���@G�(6K5|���d���?���6�W��q�n�N>cf�2�e� /�	88�+�$=��(m�ە)�ǳ�Pڄ�0���>�|�vޝ3�]�fJ�ru~5s9:E�W�E��e�wD��)� g�胈���Q�Ľ��T�r�f��*�P�F��y��׳Wj�~�G��k���˹��k�9c�ud/Y������nuޯü���vp:�>o���1j���c�=X ����R�[�}�p�R����P*��wz�v�_瓔��W�z6�U��V1Q��ׯ�?�s      �   E  x��������㧘؂H�շ|�K��^�Ao�??U�Zխ�.$��1ߨ$Q?R����}������?����8��`��ܢ�8m�������7~"�~��ǟ?H՛�M���Fʑ�!5U�R���X1� P��}��8 �[�7��ST�j�������T?o���*��s�9R�i��m�Y��/�d����y˒2��(m<�����?T���yl�F�q�;)�m+I(J'�N.縓1�D7�w��!��/�6�[�-R"���xFz��ue��c�b��sJc]Vc��)����"P�ܸ�8b�R�ʟ�����Ɉ���q'�������Nr���>�1��k,�J�6�Y��7��rб��W:C�'� �F)IJ��Qʛ�)f�Pn�	��r� "��������J�{՟Ũ�5�G|2g��D.�g#ˍh�T��9�D�c���H.�{�Pz��C�X�o��אް.u!��F���:8�-c�YW����AT1C:vF¥���<�������.8�~���b�+����s,�mD~ i5�'_���o���}��d�v�"V4�"m�h�Dh'�v֔ڐz�¹��G9��L �:#W���SX��6*�Zژv�d��n"��4�<z�5)/ɱ-O�=ఙX�J��}���#�UT���"]/"?&�3;��C_'�~�����z�X��XX�KV�D]�'2��vSF�Ģpl�N�� ];6�+������|��􉝄�;��\��d�HyA"K
l��󴉌/��d�nJ�4�/5����YR�M�
�o�L>oh%*�[Q���ܷBw�vR��Pr������8f�tՓ�eQ�;'���Vҏ5���t2^#æ.[���e�̔K�F������ �m�H��(���1���Y�V��d�<K�&_ZdXHf%�nT6H�o'S��S��.�t�rR���y&:��H��E<G[���Zz_�pK��[B�k��$�t�\Z�q�,g�q������d�3����4�PY�J%c�>�e�IJO�rL��Q����`)_#]��ȲFj���im$ݪ�܊Je��Ғva�f[��,-�Y����"(ӻYJpBn ݢE
m73�3����1`�G�n*�A���d�ώ�YQ������6ϩ��s$ �k�	��&��I1T����T�g�;9�E�d�J��5�s�"�v2�d��Bn��m��"%uT�m�nr�{}_�DvR����Bn!oaJ��"���y�JO�FO�c0�y��T��_&��p��|�<��#��J����~�F��E2{^I�z�eӋ���g�1�9��9�G�O$ca����\����g9�!yA�/l�1����D�2z>�p�={�@'j2Hd��4�C-ޗ�������u�CP��>�\Dե�b�����.'ZQ�7�-��lM&/ ��r���&��+ɭ���@
"�(�<����j-�.k�]$!� �Fj)s��.W���= Q�N���ֆ,c
��tm��VK�A��!�VZ���)sݪR8D�Z;w�<�+\�qg=Jg�,�9Xbd)u�Q��P�#R"Ŏ���s�@��2�GF���Q;�'aawr��|��?������u}g���a�H"}g��I-���V�+bQ�}�C@-:��n'p`1lɉ���3�8�~���QP�u�A���y�C��sſ&Ż��Ih��.�1���{5˓}��~5]*phc�=�ϣ��(]�^r��ڦ��R�Q�<F�pe����3�qܙ��ѓ$s)��A̗Q�D��.�\Dճ�@R��"�����0)�M�a��ByA��`C�9]�dsBQ��PK��L�B�Sc�P�MU�B�1ً��Kc�.��O�Q2��x���?����\�����;Q?<r1�\b�3O)}�%Nh9?�H�
�@4�uT������Z̖��&I�QT��2�P�eR�'�y�t����^I��0�.�D�%)����/��PZ',k��+0��_R�����-E8��3�7��������=TC꠾5Q���`��ba�������z�*�Qf��i���_�?���ǃ�|?�q�vt��K��r׆:��x��|���j�.Hm���ؤhGt�EU7��:O,�e>e��
Öh#Wj�8��"!���}�z��}���K�"�4BC*�`�x@�C,��`c������!��K	��z�C:G/��[�%�1����xy�[��nѨ���sÒ�&wgc���8�Ts��O#2{_M�4Dc4�'�14J���� SK�l�}�>�3F�p��dJsT���s����o�H���Y�^���l�r�O�� ��i��U�S��K�1��]�E#�)��.�ֻl�aC�}�eϫ���D�rӛ݊R�*P�#���'HK��S#�Q�pe��[E�%x�1�<�e�gj�&�P����#���m-�;��C�P�;��~ێ��-�B��G$��2ghL[1.��r�6���I�#�Po�SN����~��F��s�o����M[��/r{W@SG�>�K��I�e��͆4�6�?H�>��Ig5�	d��a�,��B�.���f��}�LfviR[;5Pv��~{X.Y�79Z�NL�ޘ>��1�lͼ	9aĥ�Z�{�G�?��EϞ����2�����^��<H������&���r��Ԍ����j�3�>x����ȸ�Cǜ�Fcg��׷=þz�}��Ϊ?�+B!����$�B��7�����Ù$t�8��߰ы�d�^��^W�/�-�,c���`���j������,B�8�c���q��dm��2��e�26�E2�)��#��@'z��;n>4�iY%�?S��r(]�9�U�k��V:;���{n/�<�z=?�����èRo<��)8��*��B��EcB�E)���|���4����lq�o����R����������T[��	�9��*ʲ��]���0}���L��J�.�L4�s3��d���7�&0�[�D�;��垸�	Ŧ*� ��Z{��i�q-j=�hrSO4����4����,'"v�>��\�?Ri/�z/����q�;�6�KԎ�iQ_K��[���d�"�g�q�;�/�P	�]V>4��Y���>�>Jqh��H�͑Z5f��}�߾}��_���      �   <  x���Ao�0��ʏ)$ْ�[
�]��z1�n10;E��h�$>�Ȇ(��,�O�؛���������q1������<}/�!�ǳ��7�x9���>���������ĶA?r�ٗo��P�x��N���Ez���t�FS���L��/�4*�������5G	�H����B�U�7�.��	�m�[����r�,%��Su���(1�H�<Ue`[`�ö�$H�AzXZE�R�P�gJ�4dO�y#r����|>� �z�I�v���B=�3��~�$�:��h,%���@��Vh���p��N
�ݭ'K�yXFD-ի�L١J��QFP�Ո�,=n�YN�{�KD�߫��J�QF���0�j��ފL���&\���Ե� I�QFO#����Ve��r�3�D�U�iȵ�ί�4�ƅ�H���e���������7�C��-6ΚeTǶ���(�fJ�˘u^L��E�4p:��xI7�toE���H9��\���C�*�����1��uN^��u���'�EY�L�� �?̼�:n/ϧyz?�ߪ�^[��a������-      �   �	  x���ˎT9��駨��q�%W��vf�fכ�%5�h���~�;KC�YǐH�(�_����a's�����|���c{������?���|=pf}��Un7����6ͽgK����������rT�j�n-�v;rٸVK���mr亩R/5��l+G)�Qɭ����ۻ����eB��|w��	+��UbM�!XA^��ԇsۊqM�p��V���Q�V�T�D����������{����^�ݐsłllV[MD�w��_F(m�EH%;b<�	��b�n���uB=fޔ
5���"KZbK�DK";v~�4v�qӖ(�P����B��7�U����js�A�c8Q�a�����������Pk��@�7���7Z`�	�G��8V���/���i�����^	DqDYF *�n�5˚XH j�w��1pDL-fȪ��x�!,ݖ��ݹ�<��%Ϗ"�����p�m]�UI�κ�H��B�t�d-O4+��~ړ��.�o�6�v+Y��Dg�u�� l4��znI��&
I<�5�>d���H���9�H�I��i=SLf�4ҏ�6ɒ�*�$�gx�:>iô1%)K�q����ށIR�vc�.���RTOG>7Au�I��۝�⹲+^V}c�j7N���5	Z��o$����G�l�\��bq�aͣ�ؒ��u<�h�����t�n�΀���]S̥Ś�x�0�'Fdzg@m䒴��G+%k2�����c���:�8C/R���mx��U/��"1��&��=7	b�lk�:�`&{�g@�#O��:��k���b��K�d�S� !n��m[�r�9�P�t�՟2G��5c��k�
�N�X`DW���Ŋ8-�3�!�T�ƚ9pCڨ�d�S��bN44܎YQV{���-��0���&�J��;��(���pk��P�`�*
�CA��Y@p)Y4זFG�[A����iE�rw	���
aY�7|$�>���B��{�,-,�,0���3����D˳j-��	s)J�[�b�^@�^3L��Y��Ew�j��7�eF�v��k�2k�Bw~��Y�=�Tݥ�x��ُw�h�S�+M��K͂-H���K�u����Z%Zub��T�/2Q��i�j���kM4�k-�����q�Ps3����M�hhZT�|Cj|��n����6�c����^CU?Db��p���8XK-YP��{�ϕ����nu�V(�!8mߠ��b�GP�@�O��*���Q�d������}�VJ+�=�?H����@kHs�\Kj����2�Р!M4�.�~)��0g�!_�����{nc~�d�2S+�[���O��g�йp�C�]�/�C�D�}�ttI]�B�|�PJx`���ψ�n�7w�N�-�.
V<���vd�>:G��Z��a�䨉�p�ԇ�_����ǌ�!�P��G�ݗ?'���&+�R�c1h�)��!�PM��;G���$䲲�Z�j7�zW�
�]�T�5�<}fzоZL�J�:�*�Opn�L�+������!z��5a�a4�*���\Z����k;KDqw�"X!(�� ����|�50UB�:�^���$.;�I�(h�T�f���z�T�*�mp�~9u��u����048�N�o����܋@��bڴ�O(���Ұ�3r��u\Q 졮
0ã��k�]�5mX`��4j%����ܸV_�C<�Z�A��#�a�ԏ��o�)~�9ru��⪖憱��������93���sK����Ma�cHt{t���78T�\z���V^a��&���N{z�}.��g�
���U�-P�Z��֮�/�SӪ���\k��U�FF�+חo4�G�<��6E�Cz���U�"(n�L�"���w���_p�bԁ���7.�I����-��=����QA�ł
_�M��ܶgՊ���a�;5O�"//V�ɊS�=_P��ɽ?�~�p�p����Ϸ��A�{�rd̷���
��������.?ыQC ��øم�vW�>���?.�n�b�P e&Z���=��5Q:p_�iY*�y�2i��=����tx�&/� �1��Hlw3���.��\�o�PY��V:6Zg��	hE4���C\rs�Ll�FAcA!���:o�x���!̩���h�)��"�\���bGG�E�PeɣE�΄�դ����۶��uu��l.��_�>��İy5w_u�?n��Gm(��I��d���|`ͅU�^+J������ҭ�{e�F��"��d��`���F^�L/��=Z�7�SY�i㰫���Nݝ��4�����{���P��hK�v���Q���%�����>1]�mЍ!�m������-���蛀������:��z�����w_���dR�\��僾���̼��bR�����A�g4��o)��X3�      �     x�5��n�0E�寘/�sفV��r�YD�����v#Z���u�ٜ�-���rBYF	�tE����_g��,����|���~�eYU���A��N�����=�w���2[��ʏ�k߳��c�h?�x>��N=��
�U�л���s̞i��ϗު��PY�T��<b���Tr'�����Q	߃���g�$RI��(̐J�
,�;����O7HD��#��c?B�ُ�ȗa+�ؼj���q\���"X�{����3�3Dl�{�<��U"�`�ZQkq�/y�D|��4Ԯ�:^�'��� �.���7�T�A�Ԃ���m�)vt`o�Ld�C���p}���4偌#_�)h>4���_���!��i�ڀ����B����1ťb�N�/�a�b��A~��mǵw*E��O22噧	�PE�4��,X��"����A#��T������)��
����Y�5=�!e�y�&�W�|�%W��5�U�:��Og"v5u�K#m�k�'�Ê�Ƴ��[)��R�.      �      x������ � �      �   J   x�3��H��N100�2��H��ɇ�9�Ss��sS�|ΐԢ��<��Ԕ���l����\NC#c.S�R1z\\\ ��>      �   i  x���A�#�F����y4�"�$o	�|qr�%��vd��#�fF���ZlN0�����U���u�~���~��?��r���^���:ON��_������z�Y����߫H�Q��]�3���D���~�]'B't�O�I�](Ah:}�j�8n)�g}��ʜ�Lz�܅t^��wӥ,�Z}�,qNQ�JQ�,�%������ժ_:}�>�I�&�5��~����������q��?߄�Bof|/d� �����������P�	���j�jx(��U��C�5K��͘����Q$M�����AV��}�ÕT����V�.������YVΤ~c��^Q��|]�9Ǹ?Gw�����\�F��A��o�T��Q�Ԩ`N�Qs[O)=a�kXW�/U!LF�o߿TAm��u�z��셹�FG���=F�{���V�?6�b�K�{��/���"��?�˷o/_��j��/n�/�̰F����{\���m�Vӥؑq�'��*���%<X�	�xwh�'�o�iQ��@J0�r�8����Y��˯���5G�=L��%U�,)��=��ۅ��i.�k����2�6��®�]�m��먐�77��Qa;k3*���MW'�T1g�w�Y,@&���]�m���ͽ~w�`;��a����֝> n1�ޒsw��� ��p��b�_
D�I�~)`$&F��&4�7���*斸�!b�rޔ�YD�J�U���"gI���vd��cM �b¸X��(�:�
A��>hX5vk����S7��B�1yr�2=/!��z�[A`���z2k�aG	�ǖ=��S����Q��C�VC>��AX(�Ft���D�6�WHl��A2���[Hq�c}q |�|d��Q�G�G� >
���QP�i@}�;��͟�C}���U��N��j֋4�P�t���@�x}�a�%=\u�����K��:̿t|���8��G:·:��!�#�*�#�C�G�����:�����s�w.��:� :t�t����?��O��ے��X� :�"K@e)耷,���Y���g�g-�ɇ�s��� ��	�")�(e "�H�@���v\oF�zx;����������^�� D`\�����P7`�۠n �	��6���vX/���o�U��W�*��{~�|�e�� >��_e ��s=��2�� >d �&T�GAe |� >"���4��it=���'>��5Щ�Sl
\��pN������ .Y�z�t�8�@�|B�� j��(�|��t�u.~�7�������nƽ�������ѩ8��{t�o��P�ۂW�z�Ûpt�o�A�7l��9a��M:((yk��BVo�贩B�I/������3U�s���/�!>l�GN��~ǃ�r��Σ�M�`�݋ssA\�nhtʡ��uK�r���+O/U���v�k�7�_aRk��3�K��`ݴ���^i��{%���8������ܷ?��}��,�9~Խ}��g���Swy ]���R��EÏ��V j8�~q�qb�HU���R-5�h��K�����1��Up��j�z�65��܆��lf5l���9t��2w�<f5<��TA��#���5�j�_�g(�EůF���Ho�h_�'K�z4���п�5��˵����s��+p0|������5W^W~U��O^O�W4�|�hH-�3�k5А����ū���u�����^7�)z��W,�횂Ã_��Ʀ�a��a����"0����r������7�=�w5��^5�`��}��������I�w5���0�^�x,�}]�V� �v�-p0L�Ά�宆�ޙ)w5�u��*�nW�n�U�پʴ����}a��a���"Ҙ�p��p��4��'%�]�}%�J�4�]��C������Y	��j��.�F�p׽�wv0�uox�~�{����jj&Tv��Z����&<�Eș@,~ڽ�r��9�Q�Y-A��j����fⰨ�d�Y�@�ā?�s�:�N����T��lf5�`�髪n=r�r����{��������~�����w��m      �   O  x������4Ecﻰeu[1E�%���ρ4��})
"��l����������~��Gړo-��6�����~;�CR	T���/�A�eu��[�N�B���!Q�C��H!�f��P������͓�+�����#kj������wI��'E�r�r�.)�r���W�|��T�d���Ocg�E� �M�\����O 1c+ ���I�(�����
�c ��m p9vQ ���@ �92Ya2�םhP9�_ @��y �c� T�He���lP�#�*s��Ae���z��y�0Y"&K��d�<t�,���%��a�F��0Y#&k�&���yR�Y�����E�m@z�@l�cjG�s9�B������vh�[��7�t�Xݎ\��Ç��|&���C1n���&1���l�O͠0����wG�Xn ���l�`�?���~�޿��a ��K�ȟ��䓱�ٙ���<����Yf���<�I�f@\?��W;������_�0�[��\<B�@�Z[���F���������R��#_1_�i�������c�a������d�� ����x��Kn�G��u`~D{�W���^���t7���6�`(`3�1�VΛ�o�/�@��x��L'�&$��̀�L�<�3(a3��sexv��+ó�X��<{<��J�n���7���w������{���P�frׇ�7�^��r�ۇ���;Pgz����(��a�����I
֏.)x��;��L���=���=��`>����%�Y�Gm��V�g�r&[Qp_�{4əlE�}���)g��E�G���V��=s�[Qp_�{4Ι�s�6�J��J��3݊��*ݣ��t+
�t�>:ӭ(���=��L���J��3݊����*�L��྽ܷ:�����N������kvO����q�P̠��L��0��f`�3�������Δ+
3�r�3���ʿ��Δ+
���~|���{�n[2�@?0W�c.���t9t֙vEa]΀������.g��:Ӯ�J� �u�\QJ��u�\Q�t��:S��
J�Gq�)W�'��Ւt��jI�G]�$ݣ�Z��QYg��I�Gm��V�'��Ւt��:�-(�יnE�;����:w�Z	��my�xj�sporB�frBh�fבA���e֬j��^�o�z9 Zs9 TZs9 �Zs)��\n[s���\�G��P7Y��r���~��B��r���A����_(Z��؃J[[�o�B�2�S��Ro����=m�[Pp~���%�'��]A�Y�C
گ�>�&��W�R��vdI��U�
�e�7�[��PoMVxC����σ̅��O�����;c[)�;/�F�������]�Dh���'Y��z���p�'b�Vk�)�o}�ƞ����@�yN0��5�賖�'be0˵������&�E���c�\n����b}</�k�}��Gl�*����!���@�Ɔ����L`q~���Tq5��䴤��
Nӗu`�<��)d�ժ��vV��iGW��v�T�ױ��V8*��"x�U<<��| �z���a�^�S^W���vTSkW�׼:���8ӎZj����(�քiTR;����<�8Au��^=�Z7խł�A�uq-����c�]��)f�>��,�/����/�7�l�g��{~��L�����^	�����6����A�Y�_��K��:{��vv�~�^������]�F���r}#ڦ��۫]��<_1h�~���5��z�5��kh� h�2�?=:��� ��`��a[?ʚ}��v=[��_��v�����7�Q.=�w>ʥ��M���ﯯ�i��`      �      x�3��CA��F�Fh\1z\\\ �	�      �      x��]ɮ$Gr<w~E:O"|��N4:�2:�i.����DJ�/��G���xU�h�@t[Fy������y���?=��姟��_>iR�C�?��9�[.��VO����s�vKvY����R�.8��tm�S�K{��~�돿��Ro	�([Ҳ�M��㴛�UJo9/���*��VZ� ��i�ZŚ�E�* #Б�5�nM�0�՘�ů@II�GW���X���c0�>��j��z�7���V��0��~�7���tӼh:��~˶��Z*��/xa�+)}���Roҹ���Z�	� }	D��kS�͟�1_��H0�T���/Z��<���X����;p��� �i^l1=�S?���]�\j�i��৺,��u=�W��R"�b����C/l���Mq2�d5���c�����מT��q�&��y͚�����vǍ;�f����79��>:��wux��e=p����Rc��;��uS {X��'�7ו%���O��������?}�忿����/_��~���m]!���G[ko�c���dō1\��[r��ݟ��߿���7�Z��h\s�]�,G���K㕕�Ҁ����IEʧ��#^��FzlH�y�G�|���O�Wj������~��{LG�T�K[r9���_rH��Ӱ�����V�?䃪����)�	|{�Hv<DN?�����g��9ץD�k���7�m�������!(��S^�� �6��)�(��f�6�$(�.�i3}��U�&�,5xZ���ff�����V�P.|J!�وe_��������`1Aq����s;o�O�����;Y��f(y�Ԛ���[cy�����ȩ��F����sN=Cҍ�����`��oM�%�Ox��ץڿ���!G�����'E���@��6���Q��4-0\�4����������5����v݆]i����%B-���''�}r�?f��k)hcZpz-��QրO��F�|]�9h�C���{s�<\�i���]�j\u�k���Q�)W����֖�"��x�����69�`�T��X=�����5�R�R��i�Bh5�Ŗ��N�5��Ɉf��,=���vk@
�nZ�҃[[{�=n�O0I4M��96gi��i�C�\�g�mi���(���(���o�̷�a盗�g��;8�Ϝ{vg�J��ҁ��g޽�c����.����͡�7��.C��<I����{=)�`Z������-�N�؁�>��>��uKC4!v ����>�1Nj-��wx�3^��Ή�wwt�"���4/3*C�Fׇw)���4/Ѯr;>v�/�i^[��l��D/�i^�K���g��^�ӼDo�����[$�2ϊ����|�	JW���|��9�Xe>��$�2��efHY�k����̧y�ꕛ������|����%�X�~�]N�w�޾z18�B���'���DoVX7�[������i6�-#�r�;�w9���2�&
�k��rҿG��i��;�w9��~� �;�w9���t�n�
�����]X}K]Q�!?.��_��ɼ3����V��b���y���;��M,�w=��&�%s�X,�`=�wDE<rp�z���/�׊�`��iDa/���t&KXO;���he����i����&�ޤ�§�,|6��zmA��N:wJ��GC����I箜?`ݍ[��A���ޕS؛��s�I��\ך�&��8�=6�}�y����g���O�}�S�@���w�S�D���w�S�f���8��3�݂ǳ{&�[�kw�g�`���n��s�=��-�q��gD�;N�����`�ܞ)��8��3�݀��w�i�`���A��8_�ؿK0_��%�r�8uv���^�`�ܞ�ev��ik�`�ܞ�hv����6`G�®q��8�Sm����=]��8��Ul����=]��8����Q}�k��;��.�e��n��#��yE�Ʃ[��h�b^F���q��8���-��/�e�G��n���Ë�;*$v�S�`�����G��wTI��n���5N݂G��wJ��n��#ϋ��^��n�>:O݂}t����Du�щ�klMG'�[��NT�`^n����k�[��c�Duv��^����-w����例w�<�܍@�]�xپ��~쬫:�/۷�ً�ݟ5[i�؁��Ν��6��E`�*�F�G�߰���P����C�������販D�aCÐa����~n��͈�fO&�@�~���h|��x��e��MЁ9�@߈|��S��Ta�,�DF�g�Mg�y[���Eqz;	�r���nЁ7�?�,bC;�-�����8���47ʜ�pAM#ջ��S��Æ��H�`��1�ϡ;�C�#�7�ڑ+�)����t�4�Q��Z3�_	m����%�:_m�l�ąz�����ʣF�UJ$4�F���#hm�^�G�ۅ���3���|��Jh���s��E��i� uCo&�2�$����-G3����@��:Lbz|��g�Xy�-!����<4@F��O�`��C�~�57G�|4p��y���<W�Q�є3G���J����4W�}K3TANC����?��C�\��{�������8��K��yH�{�(3����������'*��j�~3�?׮|�us���u5[��#�e�q�>�J}B�<��k[�F�^Ӈw������}-�J������29ܟԟ���tc
��]Xz>
�h�;8,��V*�^�w�sg�����ʒ�t�^�s������%fĖ�΄����-4����V��Z�L��F�g��9����hy=���S
��a*�g;
>Yy�Q�뵰�~-��X�c��3��� 74M�<���(�f� E���������h,�٦^�O�.��:�c*m�<-��C�s��d��[�����>Y����#��"ǳ�e�钎�?��<�|�^�6E�w]��F��:"�Yx�=s��D�	b�� k6�+e\��^?�u�~��9�N!���(p� ב�k�΀�SY[��۠���v��à�^*�����ů���?L�7�7_�M�zf�y4�ޒ�[��(��˕9CҚ�w����
O�B����Y\_Ey�Do!��Q���G2«L�2�|5���4�R���#x���,}� }��x@Fqt������q�����8?����N���6���9^gz\��qoԠ������O�?�y�H[�z�"d��N��ʹqP��kuڼ\�2�Z�b{��j�f��c@���>��c'�|�ʬ/֍Ü ����V˼]B��Ct�π-�ƽ��8:RkÜ	:+B#z��<�,U9��zx�S��?��I�n��gt�R�*v?j�9���FM����j��zQ����ij�A�Fp0�ٸiR{d�4����bA�)s+!�>Ħ�����}�E�W�D4?Ħ�s\yk/�����Le�������ID�2H���Z�~�M3Q߸�>v�
�bj��#Z�~�h�i���ճ�\ jӨ���Vp_Q�~C��)���m^ZB ��P�2tx��
(�y�ۂ���GO�^5��<�r�  �2tx�4��������f�ܚF�[8�S-&�G}��������RL�:�,�Sx��Ǚ��s�h��d�������`���,��������x�\y��ӆ����^W~X����_���5oE�� 8���(Uc���[���a�wQ�P�cAw"ޯ������nA{"9] ocȐ��
��r��h�J�=�A~"�a7�s�~-	U(�_v|�=�(5Z�u����e7�7�?A0F�Bɯ8�����ڍ9*�Q$�笏��
�V��G�|��>Hm�9�a�@�|e�Q����q����
��o1꼅�����
���.�Yׂ<��V/@/��a�N���+(��T�Q ��2�r���6��^�w���-�)��ē��?�"�G�J9�Y^��f�Y+m8[�s6��D��ּ�����+i�q�v��0i�dE�y�fV	0�����ҖW��[���MTD�٨Z��9;&@ٹ���� Z� o
  ���+�H�]�J�p��/V���T�b�A�"�.@�Ā��"Z��+(�r�����	��WPVG����,�W�����S'��	��WP�ӠD����zc�=����f	[ϧY^~��w��1'P�]AYʛ�ѹV����vg�7��J���(ei�����oУ#���>�,�ek	���9��ƞ�gG�,�
���lv�!�F=K���wi������]AYw�is߂
�m�K�̺���$f٨iiWp�/���Z�(iiWp�wQ[]�����+8�����߫���~g���Qࣨ����ﷶr���5>�_Q��1xl �DaK�Z*3֏��z��S���'a@���������,0�&�!Q����m�[%N��¥��m�7Յ�3�aԸ��-��FHNy�!�Z�� �s�HS��AE�S����1���3��ixP�xg���L�A���v<[+D���	BM�y;���\:{����t>َ�F�a���:���ځ�t���8
	�MWpv|rsM�P�dA���
΢�Q[��tڦ�+(K}jZK�ʀd;�����Q`&�4}��\AY����pH������lZQ����5*W��W%uze�4�\AXˣ<�聰ra����,dM*W�_t@&�-'@|�+���ɨ��r�|P6�\�W�q�sVPAۤra}�R烺I�
��p /cϙ;�Aߤza}�˻�-(�T_Q����*�\yF?'��x|w2��ͫ��q��>��lA�:BEx$�����D�ꍣנt� �;�|��lC�C�:i����R~϶V�wq-��4(���Z�Ya��iڲ87	��Iu:��	O�#��!�muJ� �_Y��l�:�h�N�S���]߻'�k��)ew��]N���Vc����Ա�į�K��x�<��g,�y8��=&�@X���]�m|��3��c�dOj�$�^_ъ�J=�ԦY6ȿ==�6:��}�~l�U��ڔ���u|�pR�]mJ׀��i��×�U�ƍ��ڔ����J똮��ť�ڔ�?�3O�7�4!Sq'	���>%���?9ͪ6��q*\��w�@�O�lDgh}�Ώ9J˱C�A�s�N��g>R� ��	�vʷ������E/��;��wռdi�������iڋת�P�p�Tnnz�@��d�{ѩ�[5;���R��,���q	��$��a��ݙ��Z�
]�^��c�����%�u&�i�q!V62@���k��F���k��R�^JG$zH�>S�F��F����R��O��'����A�:�]�N��E�����;�Z�'˴M��L�������<�fc��8�t�l��� ��;�7$��M�}|a�;^*�#ag��ݖ�Ě;��疎��_���b�S&��(ZK�����I'RQÿ�F>:���7���n{k�$�O�*�<����_������
�קX��F���g�3ӯ����b��z�
���lS�]xJ9�.�����a��P�Yb�O��g/�9��U��C	z�C�����&a����x��r9�tQ:�ۻ�k�Y~l��v��5����҉8�=���<���S����#���?Vn/����i�H�o�����k�F���v�G;�}X�>�y�
D����]������k
[l�ʬ葰�6����G����������>c'��V��/�%C�B(�(��Z��l)�	2(���?����s^k�A�5�^O�cs�TP:��
�[��V��J'B���Z><0�z�Cw��A ��clI��^��X�	e7|1蟴�d�Ô�QU~8�*]�'���߃S����:~���P��N$�������w8�Y��E'
���r@�g�A���np.~Eǈ �@������w��%ȊWI�ֳ͓mC�<���<(�t����m�ݑ�x���N���&�h��7lJ�ה�R'��~w����*���A_;#g���	2'�h~�닢�QJ���C'��ty�6��Y�� ,�����Að-0�s9wP4J�&z�}�n���ŌUQ8MԾ��u��5F�Gy�Dﻯ�`17Α�2�7M��{)��/zU8c�6M����"���~k���Q�4�>��+g̉@�^8:�ʦ��w��CIY��I'"߽��Ǖ��
�Q��N$���rמ�4�E5M��fy�B�������4M佻�9\Z˸uã�i��}��k�>����۟<�&��}$��o^l��Q�4��>V��<��W��
E��ND����n{qu\r��F��i��}@��y��y��4�JI�G5�D���e��z[�tusv�Q�4Q��}���]{�bT2M�ި�̢�<��_�a�r�&b�}4�q�Ɋ~�<�[ �r4^��,����l��'�=h�l"�} �'f��;����.��Md���U��m���ҍ�Q0�D��}�^x�>N�d�KE��%��x�앶�}[��f � >%i�W��2������)G߽��$׵�m[*=Q���p�&
����^�Q���OeuTK6���~���۶g��j�HFA�d�< �
�%4�KP-�D��{�6�tX8 A�d�<_���~Y]z]��.����$�      �   R   x�3�4��M��LKL.)-J��".#N#Δ�⒢̤Ғ�"��1�1griqI~n*LȄӄ��$1-�7�4�L�G����� ���      �   X   x�u��	�0��ni !o�u�����������(Ҙ{����u��$^������TM���%:��#� ���rE
��c��2�      �      x������ � �      �      x������ � �      �     x��T=o�@��_�Е�|���ХCgDS�����%�3&$T�r���޳}Ae�;k4B �l޻�xj�K}�էRPU�LAk� �3sq�bx}<7��v��훶fWT���FSD����ÄNw��*���W`�iE��(�㔫(3����t��?��p�O"�.�9q�ޕ��$��'��)x��\�K����{�CQ�igr����uŰ���zV�V�|��n4\��3�G����._ �`Oz��.��<	��]�������� ؛/ۛ8�S�A'�����/�)�)�C�r3���f�r��/��X��]�$2!-�x	{���Zf�q���?N4(���+���tߎ(�i܏3�ʯK���81�s�h��窪� �q�      �   �  x����n�0�����6�v	�"BT��洠�I�#c���3��I*}+����

q�x쌣�v���u��C�(����A��>]�"���D��,�D� ���䬰�s�gc�{;�ȉW��F#�"��`�4G:�ɑ��-��d�n4��v�!����[�P!�<C��^��h*0E���H�.b
J�)�(zGWY���5J�����L��Ω�d��C������=�STk0�e�f�M��S������;j�ڣ������_x��d�{u�g���x�QS`��i�<G���q(p�������BK��u��.���=|���z�mкS��5�c����~0��Mw�Xo��&x�'$=�{���@N�05(x�+�����b��&�      �      x������ � �      �   �	  x��Z�r�F}> F���'KfRqj���Z�*���%D"%�b����=3$ 
�2
 Z �s�v���cA)�W��K��sb��������"���������
?���2�ɗ��a�,�U>/�wy�!Z�)�`��)�/){�u�EF]&D*�B�Y�뛲����&�XQ�T<U̦�������GK���{[�+X�_2�0�I�q�*���j����
����WIE�������m? ���s�g�l*���v}*�^K2E�=@M����us��]T��hf2Iɤ�N�'I�phQ�7Q�0�I�c�a��_'�j�,�l��Kr�X}�w�V���aQ� Zs����ؔ�xj6�݉��L&X&E
� �Gٗ�ż\T�bp���U���Ǣ�,4c�-&�����
�#q��%��R��O���(O%�Ԅ�ڂ�W���7��Q,���1�
����%��p1�4ZԈL�qG��P�4�<�4��j�Z&:P2����hȌA_�����Ǆu�4��%M���.h  D@c �ּ�2R�J��Tf�
�����6�	Њ��O��
��}�N;�˜ǧ�?���|��7�2o���Y��a�k`D���Wwq�z�+��^��������|]�/Ȼ-O�֒�����K"ʍ�R���:)d*��K����C`U8>�.ݡ���I�5F@=���_\�~�� ����|<�V7?�e������m9-�d�y�?ޕ����2�\D�"�{~�3�R��l�l�����x�j`'���
�
���m���2���<_�����!�Y�u��ΰ�r�Z*�����y�?<���B�ԯ�wSV��:�Y���^�:[����b:x&��R6R=�!#$d�L�����"�Ąck#e՟����O�o��t>�5�|��5��Tt'{}�aܜ�b_��GA��3a���n�����:�dR�`��|���wH�x�҇>TP��:u�Z�Y;4Ԉh��\c+�y����0�����A��d4o)���áh��i
,����Hh[�9�?,[᲍T����(ˎE ,~�L�o��b�'�E�}�\���d9���d��6�d[NU�y�qZ�J�#4�,��{Yl��X��5/�U�Zx���v�Eͽ��Y��8ns#C��&N>lW�rG�����w<N{�(F�������T�z][<�����.�z��`�O���Q�o�ܯ,f?|R����� �&pl����2V[4�s������<�5`���qL�*9�O�>��hl�&'\�S'k��N	NP����h�u�]ʜ�����Z#�00e?/�]@֎xAc��!l��-�'h/������ͧs��s�yt��i��d���doh��f��F1�{�+�����e�J{2s(̄.5*g4ת[]3*��m%�Ԡ��\*`2�}|LXA���v�D� �x��xeI'UT���n�@5g�YPh����_������%�JY/�\�V��2����Ք� ��(� mE%�dJ�\�{W���C��V0@JT���to���	�Y<�� �`�ZiQg���8�ȯ©� G�ۧ�{·������e8pPk���vQ��ؼ�Xxr�/n��	��P)y�[u�ƅK9�m��y#F1bK����6���:�v�:`>b��u猍N��4��+Ö�-�����������W�.kܽ�g�]h����Zi�]�� ��q��V�Ky��	�QX$O��҈=?�eNL�'SV����'y��+���u�������J�ێ�_��9��N!�6�TPM�3�Ǧ�M�n���P^��O'ΚE>/BM���v�A�u�]�<ڼmv��#2����ǆ&CF)��s-huh?ֵ��wS2'^�=G׭Os�ׅ�y�y|�g73��4�,���z>�Ӿ��_�5������ =,ڡl�_�|{�p�B�J-Ϲ�{Ф����[���Tܸ���܀��!��6lu�~�s_����g��@�@P�i�J���]�J%!bQ�?����A��5H�Q<���?���C�$�x�hҮ�ŀ8x�����!���
i��'��כ��~>k����t�s���=[�$D&�~2��=��h�����I=�, <���Y�Al�ɷ�nqnp�j��M�������;A��e5�v|u\D��-���e_�����f5[~O����uA޼�\RQ�z�}D����W�ٲ�.�T��ӉuFB�p�?���mc�P��Y���!���@�X�� �u���\���#�C�� BW`8@&����Ęd�_��x~*����f�/cPXQ,���^WEE�
~�*~�:�OG�!�t�|qH"�:`��̘��j�p���'�ʰ����2��ivw���0�n����y�H�s��m˘��zi3eR(�(uD0�g<����H��ܿ�R�j[d?�/^��K(m      �      x��}�rǑ���S������/K�:�O�����ވG��	H�-B4J��~+�{�!�ӓӗ�E_gW�=��������~�����߿��������&��0a��O�}w�p��q��W~��
`���(xb:�-�Z�������1�+��[��Oހ	7�ě�=@O�7Zq|�ps��#]��ż��H 9��6���a���T�P�":DΔ��E�<3�V�c�@d=�0���3S4���Dd���xH�����(��
~	 ��bt�9g�B��$"aK�	��.dP�H�����Ć#U�48��(��2�P�� czĎ�H@��zHB!ZN�lnT$7�"�_�D���Hѯ.R�`�F���D���	R>�<_A��<(��C"���̙�� N|2)��s��]������7����\��@!y9�2Ga˱$� 0�{��'m~�ǯ�8yq���P~R�ۂ�8G�^@�������Rb��q�8p�'��bx�'�1��T��Y�~qd%;I,N~X��չLы��2
�@Y&r|���JQ��9u2%�@Y���Lc(aM������P���|̤v�'o�w�φ	����0�c�	,�u�G6o��=y���C@�����W4��W|�Cn��C��in� �q�b
L��U<Cyܩ��r���n��xC$9O9���@<rY
�$&o�ǱJ�}�dp�h��������H
d9���$�-�f0��dx���q?ፇj��*тrv|3�\V�������@��L�d_Pr����PY�dK*��؞�2�ܥ���l@)md�^�bz$[
�m�D���� 0Xr�<��LF)�U,�S�&璋�)o<F�7��R��.3n��2��L������B��s��Z}2J�8�%�!��:��[\&��ŗ�d4c���VA
:/��K+�Uq�l(�|%��ue�F-y~�X����	��hK�"�PLF�o�3Z��l�>MIu6���٠.C��U���P�dq��mr{
J=��̆;F�%+ʒ�>�,d����jɊ�����H�����b�V�����f۞�w<jYP��	M�����rǳ!4MRY#i�^�AY,�lby
��GDВ�
MRY%��G��MRY�@r	s�2�NeMD��]��t{b�TVEI����x��L��Q!b���I�ӡ.���,6�z��)�7�q~�3I�8�\B�(b�TV��x
lїMRY�J�ł|��s9��L�=�2�T��%����$
��(���g��)�:���d�t[Tj8Z��I�SQr��M9��$�(K��X,o|~ڱL[b�6�٤~߁�.�@0��4?�6�X歯�h�2H���c����d���F�GQ�Ș����Mj(��"Y������Cb�FAOA�AO��enezje<rʖzTnR��Pf��_����&AO*���qΦ�Ynb{���
JHX]�&��ep�}-M�I�XEIɡp̖��&	�T����mӉ�k=ӄI��x��'�71>e-�cNU~~�g�05�ȔL#d~���*M�K8n�����t�S��N
LK:|�zO3��Γ�L�oR�0%8r�x����|�f�=73g�t�V6(���G�LZ�VF��̉��ҡ��s례�4��B��9�('���0S*���I�[�B�	f�(h3S��,Vhpp�<gS@+T�{ޤ�����F��VaP��eu6M0[٠:J�´�} 4id.0sw2c��]�d�:��1'L��>�&`�4�k�T�g��JlRұ\�S�(X�&6�A
S鮒i����ڬE�m6��2C%B2I���|��v�3)�!c�Lk���0�A&��ނ�����y��<��3h�k@K�Nla��?�yt���ɴE���<P��hs����������˿?�-F,�����˯
�k���g�����|ڼyw�����O�6�^��������o�@��[
�J5@�<�D��,.�8�	����J�Y�-�l ڼ՟�Op7��G$_��3���I2'Қq&F��#�"��ʸ\ǂ8	%K;*�(b�N=�C��n��O�r@MI}
Sa�y�f��_���,Q�o�N���J�v��)���P:7a����L��t�g�lZ�`��beM0y��.Mmi�,��0��.y�
젤��h*S΀�R�z�g_����Vv,�t$hS����:�Ӵw1�Xl���6��g����B9Du���ilX����s4�U�(%�#o��,��i��^�i��Rf��6�n�9O�X��d̬, �c�`ɢp�,��Yf�y
d�q���r�MƐ�T���_J3R�����Ҡ�Ϭ�A�:��)��e�8���b�f	�C3�DS!U.*�=jT�bcL�����%5)�a�P+��d�:��3����p�&'KjQ�b=�D,��r�	R~���:N����e�j3��d�8u�U�s��t�YY�J�e��t\g���ͫ��k3`��LYҎRA�������2��v����aa9�@��.���b;@[��Z�P�%K8t�����&6ō�'B��?��-�q�T�Ee���A��x+�*!�e�O'����u,�0�Tp��p��ɯ�j@�[akzi�m���U��rSg�RDS:�u��
���-:�j���Y,��zp�����H�Ao�fku�­�� )Y� b3����/j���K\):�p-�EeI�b�"7���8��4;r:>XCDS�%�ٔ��q�V��[V��lm�1����3Nv9�Ť	�b~�Y�p��FF2u���b=��0ޓe��"6�O�YT�$�e�����.K4MI�E,���$��>��� Q{�Fh�ހ4�Kn�2�&d�K�njiL+W.��`Jvŋ"�
��ج7K$Y�!M�q-�d�6br���km����F1�H�MX�<T.�i=�_�xX�;%wW!�n=vу��2d8k�� d�#D&ˡ�xR.縮�3 ���h�^PRtѴ�27��N�<'S7K;y�;pH��L�}M�'V���������Dy����&ӼPZ�z&y*�� ��{� �ʵ�ʖ՝~��։G@W���C�t_��VG�UEEf���豕<�N��%[�A��ߩ��v�F�\}��M�Dy�QNٔ�@?�4M�gTU�Qb0�(����#+�[�t�[%9����&v1��M�Dy�T���S}n'��!XL���%�Q�z�%�2]|��8*i���~Kq �⨬�h��]��+��PѴ&)/Rޚ�q���~K�A�f\tr�;�<2��VfLa��1�%1��ʌ)�� �	�칪i�l�J*,Q,����d+��ʹ'��+��'�w0u� Y��L�\\���(g�(�.��bDӈ�*�f���d�����R��J���Ȯ�m�R�CL6���KX
7*�`�n�V���"�`�ClkusY9{Ӓ*�EҀ��k��y3EO�"��<�Zt���Z/-x͔r��6DSQ�q3�(}��޴���hۋQ���lJc7-�e�2�V_7��w�4B �����u����--�HM�/ԑF�$)��B���E��֣UV<4%�u��C��͛�2B��E#7}������B�'GQ�&�#�X��4f
��qd�:o��Hq������L%���:��[�>zS�g7N�{����h!��M��Q:����X�L�bG��f�l{n��������r�fB�+ڕ��)�����R�R`�dŉ.+Zq�}����`{���$0�EwqZ(!B�QH��D 5�(�C�6��h��`�/%�J+S���`j$�٦j�K/wLі �V�*(sh���l�(p}��,�Z�z���H�r�B�WS�S�;�\�P&��fahQ�R�u{|���f۠Y(u��t�Z٠�����e�A3BMa�l��lPe���)�Z� ]u�|�d��C+Ta� ٣Em���>��{� h���u0KdD��[���f��L
)�3B
3xo����"��Nq�Li���
ap L&��Y�
SД���fW�#0���vV��I�h�M���P�    ɖ����!���\P��ڧS#�}�6� &)-Ҙ>���A��l�M�uczY�V�7M,t��!K	䓷[aj�.���ˢ6���ޘi��Y�AQR�)p�-�C���B���Eۺ�L5]�YL7��-�`j���2�܎L�	.;B�2p̋01M�@��J	�L� �#�p�����h�y�����U��(��L=��i�*U#'��ǖ�\�[���p�t���s˾�n�dY���m��ޣ1x�p[R3�p�Y��ME�ܴ�b7g��8�|�R��(� ,D��gGhaRe�a��"�b���E_q�Ļ�[��+\���'�P�������F���k�ے
����ƳX�E6h͓.9���O�����t��#X���/ҽ>O���y5)����p�d�*e��ܸ=ܤ�����ܸ�����lفJд�]�ҕj&'fK� Ak����) #hmӒ:6E)P6��6-��S���-ZZ۴ʒ�"�	�mZ�~)'��OB�ڦUn'/�,�G��6��%T�\lm�*'U��r��QK�N0u��6j�r�R��$��F-i�S S����B�Ǽ�����Q�m���ل���I#K�6��gV� �eJ���f�8��'%���MH
{��AH`J,Õ1g��B.G�L#/�WƼҮB�.3D��6Qk�����<[4��^�,r�m`�M�u;��I���@�f�;�\$�e�-C�1�4(dvr��@�ôW�"&�BZ�8c�����^Np���5���Q�-���᧙c���>�:WjD���L���ĶH<�~�<Y��"��[�&KKz���jN�&q��%�!�Z�%�E�r��%=LvT9�,8��,�qFW4Y�����,�p�w��-�3�Mv�(NV���Q�Dyr�kQ�4ɐ4�F������S�l�!i`��p��-ci$�Q�3�dX`a|&i`�v8K �MUpi`�v0���`;��Q�3�r#Z�tIڲV��7����K�t�g1L����0+ҁNTvr�,|"i�3�C\$��@Z�(!-���P���*8���UL��6�A�kVs��M���m
p���T����͖2�-��j
m��� ��-J6)_�A����z0�΃Ƞs���R�L�Qǰ�R�2��c4e�C���'�4ZƁ(6��SI��[k(6���S\�M������'�Eoq$SI 6��������z�b�B�Nq�1Zx�(�Ւqi�mOƛjƱm��@��k���ll����Kʦ�ul������d�>�mlS��(�r�,D�������?�{�ڮ,��r� �%JM�P@��\}	vBJM�=�bO�Xݩ1�F����*��ogJk,þ1��v�+�� �i��1���䐕2�y�hk��U7 G������|s2f|.��}���_?\��t������������J�Х�(��[�6}���N}��TT�M���$�����@rP��7o�Ӱ�>/�c_�$�50U�_��`����`�+x~R��I���s��_���JW:e���:�.���Z�g/�')�P�}��j���D��'�mӫ;�H��[ �"��ec�i�1���hJx��1>��"�H��~�"h�`���z����Z�>]��t]�����-3V�\kL% 	�.�E�����;�E� ��a���}|��.f�h�3]��k),�%�̰�+��\6��ghm�{]�C	�9E4)h[k�A�U�Q�%�жָ�\w����mK�O��S�"KV�aE֮�7���izS���Y��p�+ܴ������pˍӡk��Ʀ6���������mcM��Q �����u��CF��nl�0vRc��[|/��)亢&[���]������=Ț�P�O������t)���_ѿ�|���7oʟn�?޽},|xT���xs�yx��}��~������fS��|�d౤h?-e--z���h`t��-��i��H�<�(�Y��3S`�.�ys�v��?_����'�`i��*m����>����������u�~Ϡ�p&<nn��D�]8t&^�����F���Ѹ�d��i���=�O_���GS|K ������n��H�j�go��j��ɀYc�pj�a�43q2ji_'Y�1�>@=2����ܷT���L�D}.̋L��ک5���L@��B�NS�å�OF�����<�;���U�巈Q,�e����֡���I�B��<{��Da����T���{ަI�J3c��&S���Ʃ0u���D��!7�^:/]n��uK2G��H3��X�&�p*�]��pR�Lé���R���6��Sa�Ւ�"�ͳ�"N��n8v��|É���$N��q8�Z+�GJ�͟
�/'�?��{�֐t�9�I���M}���\G���/��Z����9$� �1v������qg�"���e#�v�j�jw�f�u��J4ϦJ7}�8��)
��e��<ͥǩ�K��N�y~�i8c�8u�t!q�4�y� p����C� p��V����4�tqq����q�4��6N�z�E-'ƩӐ�ˈS������iЛ��O��Y�25N�ĩ� ���"����YA��(�̖B��j��糷�0Q�g��d���i����ߨt(>;	,D���e\�
\K��0ɦ��>7�?��ä+�,��iFP|�|]q֏�~��o���"��K�&��y�?w[`�laU�k��<#�}~���z��IưO�{7~f;���!S�bXg<��+�Y^?���?��X�v�׏k�-�ʫD,������q�HʉP~Z�H��[���(�'�^f���r4¨O;��pe+
�ݤ�`opq�&��@����Nu,�;ʖ�K�o�>�>x���u��5�Qb��g�d��Z*-V���2�-�*���)��D�J^K oYy ��A=JsL�J5��R>EH���~�[�Q�+A�iZ�3��}���r@�U1(��ɡ���\�>6]��E��	��;��}l:T2&�L��͟�?�'�?7�rLG]�R�g���B���X�b���Y��1�asSKQ7SJ�c.!bJ�f�=fK�/�������_�d�'\�R,zܒwQ��IKJd��pT������b�9|��o����1G��f8�Z3�*vQ�r���M!�z^��T ��PkϮ�&�L2�B���ō=�'ԩ�Y�Z���ː�Ε9}�H-��e�Z4�*-���@ʴI����%�ك�C�J.�m�ņsA���1�ҷ�<6ܡ��<��-VR�2P�g"�4 ��轊���-��"Yƹ�N"A0�r	���κ�U�h>�Ⓟ,�L�X~��!{SeM.�2��E�K"���B�q�m��fpy��2��E���N8e��]�!]���@,���7Ϋ?�V�V�e���sH�ڬg[�;,d�:h�FR`��-	�2V�"�D��j�eFE\*^���.!d�-�y���B��XP#9��Ѥ�.�0vS����dc�EF]�^��M�:/S&��Z�="$S��Ezq_��Z�M��>��J�K�����b
��Dlը4	���h&��3��-g.%/�⹞�=����NÙN�N�/ejt
��ט��ZN�NB|9��ӱS��I�����`��oLwAO/o�x�s��/�<7�/���<�|�$��X���?7y���œ�7�{7�e�EOE�|�b�u8�V ����t!���#�3v�4��:U��^���RQ	ޯ{�tT��=k߼lw.���J�:��	0'C&7��]��&�%`�;��-�
�������':�/_���-xH����g���9��/}���oůe�H��l0��׿��Z¯�e�?~}���ǻ�7�t}�X������{y�������{{�v�y�׿�釻�on��LԾ�W��]ń�=4�H�#b*�&�'�ϛ��9%Tt8��2����,��(TrQOW�Pz�G(h�<��֔PW\�?�t�Ϩ�����ӣ#������U6���j��9��$J�b���n��`���    r�EU�"���,p&Q����aI�9$�d:����J��Έ.p?AREF�eŗP�������q1h�	��Ey�Ǘ�|U{s׷�s�M-<�,{�n�8�:7���z±* �.c�r�ߚ�����tw����S-|/�Hr������_��3���3�����|����.3oÌ0�l/����H�V�3����:�)娆�iXW��?�<`�#)�~��w�`�
�j������4���Ψ=Å�w��x� {}ؠ!�Q%y���_~<�E; ��O�3tCyL$% q�<�˧ā=��n��"���Yi� %�j��J.��{�����m<l�`�I+�o77�v�ϝ�=�����ǻ�~z����_���=������}�6���Zi}��t%#�UUH:r�+�H,�V�di��v�
}�
���v7����y���s�Ue�V�3���:_�~�9��]}�����v-���/�Lj�y�J��h���9%4�z���\O�S~��e��PG4�]�A�yEQ~��j����)�)�����`k�G��ϧ]�*�:��|4��O�g�t)�>i
T���Z�e����ͳ�r�w�"���Pt�L�!C�1���aٗ�>��ů�?�;q�Ĝ'���AE�.ʥ��1d6gݿ<=��6t����4��t��I^iK��&��(��D^�����΂�����t��W��|��6QBNq\W���!(�H�%�8�|�f��S�4b��@���)f��1��	%*����ﰢPv�i��rēt7E�K��f�t����@y�^�M5�3�|n�ӟ�F��v�tI���Cs���$5�1ƞ�o�'����OOƚE�R�DI6X�+��L�$D7CeIJ*z�L)�$��ԧ�ДF`̣�	��$���8/ٓ�C�kKE�h�|*A�8���r2�Q/�@m�G�z]e0
֕J�"�����''�.j^�{�9|���X!<��t�l�_��_��]��p���~��+�R������?����������+�.=�������fJo�)�R��yĠ��:��RZ�%i�7�&��RȰF5�S��Ą�fRm�8���1�8M&���A��������}�\�1k+���_�Z��v"^�3WT�a�x��*OR��rda���	Y�Fp����J���x�'`���u�π �w��C�nu2�+�3����0�`0�������'�5�B�V����`0�CTn�Ob&��ys�Q�����\B���t$�����OGP�iQ�jv�+"e�;x���@y��*��=5cb���̪cP4P�E4i�~<���mؠ��.i�D������4>qX=GG��j���OKzD?�_�	}ݯ�圅�EO^��C��Ȃ�;,���<��;?�~#;��#i�ѳ�*�G�8�ɱ�|�������t9E�s{��\��`�pi�Y/�*"ű>���^�� ����Y��q�K[H'�B}��ݜ�� 1]����D�:b�2��Z���W+���~4񱰴�����S�a��kii��Jc��JO��RH�:��K�"$��S�Wz��v �3�t�.�iju�$c�_ZZ����iwX�pγu�.�!i4ғsJ+�Ni���΋�*��I�z����9*����J�PMБ&�s>��ϝ���@W�%�=8m%:u�q��3y�Ud2\���OV�!�)��>IV�je�@h���Eu ;TDE�;\�MT|Y%�*)���(��L?^�����j	�C�QS��D�qʁ/$r��<eRۈ�!����3��w~wg'$����EYby_k�!zߕ���d�xm�xק᎖Q"@74|p��s�&>!:��lP�X��(ǣX�������x�:Z�e��}�Q��ӒP ���#Q�O�G_����%�A�{]�o-ء��r�杝�Г!<T(��} ��?-{����{�� L�N�<�vpD���(����s �a�k^�����̩롳]����
0T
���$���$���g�R�^����;F���g�V>
)5,`֞�Q(}��o
�dN��Z9���q�|ٿ&KHp:�.��et (�E����ԲK1Z%��Y(���
P��kN\���
P�+b�iy(�5ј0�#��;�ؿ�E��z(��==��/hwHƠ<��ֺd�5�ڔ�(H�G�@�ES{x��� :K���G��_�CGۭ�'H~�i�����	����?R��DY�F�����*�&�I��{�hS8��4c�9�#r�au�1�sq���S�-�i��a�-N���k�|�wGZ��C8~�ȟ���8�@4���'����D'g��xϛv9i±X�)�qL��E-�+�,q���C����E)��Gt��a��a���d�����)��4P����,KӝD�V�\�P�Εt{=|���V�y�1�����&+�b�GN#����T#:X�j�,1�F>߆�A��Y�g��׊���X�<��u~B��d����1��EY�<� �=�/`>���|'����Є3t��a&l�g��8Ga���lؼ���395Vj�׵O���@kSj<S��:��+�bb2�J��:�$&(R�n1<�x��:��F6(��D��P`^2�%�Hr��9����(�S�{�,!���r*Q���jׁj���pfaJ&��*�����yl'��'�Y�E���������O����x�}�x������>=\�:̝�Xz���MzrWݐPd�PW����/�Δ�'.�J�,3Z��6��d���.XM���x	��@�[�����U�۞�k�o�ܧ���%�n�4�5��gHOy����c*�gK���n��R;{��N�����cqs�]i� ;ZT����[��v?|��)����-����?��b�DR-~{��x����w�#� �+P��w�<ir\X�������\W��z:��lp�d+�/Z���B��>%������^:?�{�q��rFk�Я'zBE�J��9�D�a|e�pX�����rJ��"L���EX�*�WHqc�.¼b*�|�q��(�����_.	쐘	��	���K������m*AS�5����-�p��|s�S�)�w�n����7���g0r�C���91�l�H��[��Ufdg̜�H㓯�}z-����έ�c<hs��=h읔(,�D?������)鲔"�0��{!!�>oj8S�A݉��Cdܟ�Y9��z���MZ���V�K01�=�Ȯ�g�.߂Dkֵ���7ޤ���~m���0k�7�b������q�y<?vQ)�p
��&��$�#/HV����VPǡ�3@�:+���)��;��������]b��*�P��@p> �s���>!�˸��~u(�U�r��H�1�<(���(UR�.��K��)~�ھ �Z3ͳ�&(X��������.p��e��4F���%���l����վ(���~�֒'�Qtc��1��Q�E�g�������c�F��d_�,�v|i�W�Y��d�J�bL:�Tt3�5_Fy)�yƢM'��>M��oYDu&g���ȽՓ�8��]�J�(���E�u���i�:�	�ɧ�. iB��e��S��B,os4���o����6ʇ�H/g��c�Y��MI (�W�������oϜ�~�Ы9�TR��ʚ�)��(��|�_�垴�H��w�qe¸Գ]�p꓌X�%��t^��tj��q��L{�$��`�W�fJ����-x�r	ui����k�R��/h#ܞP���6�IX�0�~�e�T�=��V� ���q��k�ޗKt�+�
ni~�p�D���fq��6�7��i�t���6��'�X�I���~M��O�Z�,iϹ�	��H�U����t�{x�NE������[y(B�"|���[4�O9�Z9B���7h��0�C�WΓbxc�K?HxH�z_z�{�y/����\�A_z�7�T�b�q�@�Y
���Nr���mHh�˛���ԏ��0z���� t  {�O>cO��N	��K���9��ك��B���]��_�CM�Lr��t���ʾg��t�J^��/�b5�sUz�� <���a��2y����y��.�	����p�4��~���]&4�}r��J&�/�A�^H�#`����^cQ��*�J����2N�[�w&�pi���n�D�yQ��
���:&�__ߥ� �ry:�4������;��(��?A�Ó)*9�8\
եٺ� !��D&������׏��_��ˏ]Gd��R���).8��oW.����u9��_��ͷ�n�'d�N��GM{@rP�2�ͷ���%�����`�#���<�����/��z���vu�O>���<�?_&�_kYG�������~}���S��\��_���o6�q ���Q��3{a��Ǯ��}��\���>��x����	E�	��w�����1Шd�R�C����=W>AEH�RY���oz���{��s9�c�j�߿���X�"����v�/W��K�r�ָ�{�|ܗ��y!˸�`uy֨*[H�p��q��|�kIU�=��2B�r�.@=1w�fQ�<���j-7�з�d7I�[�8JP��w}|�NRV����/����k3     