PGDMP         1                {            postgres    15.2    15.2 N               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    5    postgres    DATABASE        CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_Indonesia.1252';
    DROP DATABASE postgres;
                postgres    false            �           0    0    DATABASE postgres    COMMENT     N   COMMENT ON DATABASE postgres IS 'default administrative connection database';
                   postgres    false    3458                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                pg_database_owner    false            �           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                   pg_database_owner    false    5            �            1259    16518    ForgotRequest    TABLE     �   CREATE TABLE public."ForgotRequest" (
    id integer NOT NULL,
    email character varying(225),
    code character varying(225),
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);
 #   DROP TABLE public."ForgotRequest";
       public         heap    postgres    false    5            �            1259    16517    ForgotRequest_id_seq    SEQUENCE     �   ALTER TABLE public."ForgotRequest" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."ForgotRequest_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    242    5            �            1259    16437 
   categories    TABLE     �   CREATE TABLE public.categories (
    id integer NOT NULL,
    name character varying(225),
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);
    DROP TABLE public.categories;
       public         heap    postgres    false    5            �            1259    16436    categories_id_seq    SEQUENCE     �   ALTER TABLE public.categories ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.categories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    5    220            �            1259    16444    cities    TABLE     �   CREATE TABLE public.cities (
    id integer NOT NULL,
    picture character varying(225),
    name character varying(225),
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);
    DROP TABLE public.cities;
       public         heap    postgres    false    5            �            1259    16443    cities_id_seq    SEQUENCE     �   ALTER TABLE public.cities ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.cities_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    222    5            �            1259    16460    eventCategories    TABLE     �   CREATE TABLE public."eventCategories" (
    id integer NOT NULL,
    "eventId" integer,
    "categoryId" integer,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);
 %   DROP TABLE public."eventCategories";
       public         heap    postgres    false    5            �            1259    16459    eventCategories_id_seq    SEQUENCE     �   ALTER TABLE public."eventCategories" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."eventCategories_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    226    5            �            1259    16451    events    TABLE        CREATE TABLE public.events (
    id integer NOT NULL,
    picture character varying(225),
    title character varying(225),
    date date,
    "cityId" integer,
    desciption text,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);
    DROP TABLE public.events;
       public         heap    postgres    false    5            �            1259    16450    events_id_seq    SEQUENCE     �   ALTER TABLE public.events ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.events_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    224    5            �            1259    16467    partners    TABLE     �   CREATE TABLE public.partners (
    id integer NOT NULL,
    picture character varying(225),
    name character varying(225),
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);
    DROP TABLE public.partners;
       public         heap    postgres    false    5            �            1259    16466    partners_id_seq    SEQUENCE     �   ALTER TABLE public.partners ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.partners_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    228    5            �            1259    16488    paymentMethod    TABLE     �   CREATE TABLE public."paymentMethod" (
    id integer NOT NULL,
    name character varying(225),
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);
 #   DROP TABLE public."paymentMethod";
       public         heap    postgres    false    5            �            1259    16487    paymentMethod_id_seq    SEQUENCE     �   ALTER TABLE public."paymentMethod" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."paymentMethod_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    234    5            �            1259    16428    profile    TABLE     �  CREATE TABLE public.profile (
    id integer NOT NULL,
    picture character varying(225),
    "fullName" character varying(225),
    "phoneNumbe" character varying(225),
    gender boolean,
    profession character varying(225),
    nasionality character varying(225),
    "birthDate" date,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone,
    "userId" integer
);
    DROP TABLE public.profile;
       public         heap    postgres    false    5            �            1259    16427    profile_id_seq    SEQUENCE     �   ALTER TABLE public.profile ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.profile_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    218    5            �            1259    16474    reservationSections    TABLE     �   CREATE TABLE public."reservationSections" (
    id integer NOT NULL,
    name character varying(225),
    price character varying(225),
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);
 )   DROP TABLE public."reservationSections";
       public         heap    postgres    false    5            �            1259    16473    reservationSections_id_seq    SEQUENCE     �   ALTER TABLE public."reservationSections" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."reservationSections_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    5    230            �            1259    16481    reservationStatus    TABLE     �   CREATE TABLE public."reservationStatus" (
    id integer NOT NULL,
    name character varying(225),
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);
 '   DROP TABLE public."reservationStatus";
       public         heap    postgres    false    5            �            1259    16480    reservationStatus_id_seq    SEQUENCE     �   ALTER TABLE public."reservationStatus" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."reservationStatus_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    232    5            �            1259    16502    reservationTickets    TABLE     �   CREATE TABLE public."reservationTickets" (
    id integer NOT NULL,
    "resevationId" integer,
    "sectionId" integer,
    quantity integer,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);
 (   DROP TABLE public."reservationTickets";
       public         heap    postgres    false    5            �            1259    16501    reservationTickets_id_seq    SEQUENCE     �   ALTER TABLE public."reservationTickets" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."reservationTickets_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    238    5            �            1259    16495    reservations    TABLE       CREATE TABLE public.reservations (
    id integer NOT NULL,
    "eventId" integer,
    "userId" integer,
    status integer,
    "paymentMethodId" integer,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);
     DROP TABLE public.reservations;
       public         heap    postgres    false    5            �            1259    16494    reservations_id_seq    SEQUENCE     �   ALTER TABLE public.reservations ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.reservations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    5    236            �            1259    16417    users    TABLE       CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(225),
    email character varying(225),
    password character varying(225),
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);
    DROP TABLE public.users;
       public         heap    postgres    false    5            �            1259    16416    user_id_seq    SEQUENCE     �   ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    216    5            �            1259    16509    wishList    TABLE     �   CREATE TABLE public."wishList" (
    id integer NOT NULL,
    "eventId" integer,
    "userId" integer,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);
    DROP TABLE public."wishList";
       public         heap    postgres    false    5            �            1259    16508    wishList_id_seq    SEQUENCE     �   ALTER TABLE public."wishList" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."wishList_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    240    5            |          0    16518    ForgotRequest 
   TABLE DATA           T   COPY public."ForgotRequest" (id, email, code, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    242   �\       f          0    16437 
   categories 
   TABLE DATA           H   COPY public.categories (id, name, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    220   B]       h          0    16444    cities 
   TABLE DATA           M   COPY public.cities (id, picture, name, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    222   �]       l          0    16460    eventCategories 
   TABLE DATA           b   COPY public."eventCategories" (id, "eventId", "categoryId", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    226   �^       j          0    16451    events 
   TABLE DATA           j   COPY public.events (id, picture, title, date, "cityId", desciption, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    224   _       n          0    16467    partners 
   TABLE DATA           O   COPY public.partners (id, picture, name, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    228   %`       t          0    16488    paymentMethod 
   TABLE DATA           M   COPY public."paymentMethod" (id, name, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    234   z`       d          0    16428    profile 
   TABLE DATA           �   COPY public.profile (id, picture, "fullName", "phoneNumbe", gender, profession, nasionality, "birthDate", "createdAt", "updatedAt", "userId") FROM stdin;
    public          postgres    false    218   �`       p          0    16474    reservationSections 
   TABLE DATA           Z   COPY public."reservationSections" (id, name, price, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    230   �a       r          0    16481    reservationStatus 
   TABLE DATA           Q   COPY public."reservationStatus" (id, name, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    232    b       x          0    16502    reservationTickets 
   TABLE DATA           s   COPY public."reservationTickets" (id, "resevationId", "sectionId", quantity, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    238   eb       v          0    16495    reservations 
   TABLE DATA           t   COPY public.reservations (id, "eventId", "userId", status, "paymentMethodId", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    236   �b       b          0    16417    users 
   TABLE DATA           X   COPY public.users (id, username, email, password, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    216   "c       z          0    16509    wishList 
   TABLE DATA           W   COPY public."wishList" (id, "eventId", "userId", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    240   �f       �           0    0    ForgotRequest_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public."ForgotRequest_id_seq"', 6, true);
          public          postgres    false    241            �           0    0    categories_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.categories_id_seq', 5, true);
          public          postgres    false    219            �           0    0    cities_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.cities_id_seq', 14, true);
          public          postgres    false    221            �           0    0    eventCategories_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public."eventCategories_id_seq"', 11, true);
          public          postgres    false    225            �           0    0    events_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.events_id_seq', 16, true);
          public          postgres    false    223            �           0    0    partners_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.partners_id_seq', 7, true);
          public          postgres    false    227            �           0    0    paymentMethod_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public."paymentMethod_id_seq"', 1, true);
          public          postgres    false    233            �           0    0    profile_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.profile_id_seq', 21, true);
          public          postgres    false    217            �           0    0    reservationSections_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public."reservationSections_id_seq"', 1, true);
          public          postgres    false    229            �           0    0    reservationStatus_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public."reservationStatus_id_seq"', 3, true);
          public          postgres    false    231            �           0    0    reservationTickets_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public."reservationTickets_id_seq"', 2, true);
          public          postgres    false    237            �           0    0    reservations_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.reservations_id_seq', 5, true);
          public          postgres    false    235            �           0    0    user_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.user_id_seq', 16, true);
          public          postgres    false    215            �           0    0    wishList_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."wishList_id_seq"', 6, true);
          public          postgres    false    239            �           2606    16523     ForgotRequest ForgotRequest_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public."ForgotRequest"
    ADD CONSTRAINT "ForgotRequest_pkey" PRIMARY KEY (id);
 N   ALTER TABLE ONLY public."ForgotRequest" DROP CONSTRAINT "ForgotRequest_pkey";
       public            postgres    false    242            �           2606    16442    categories categories_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.categories DROP CONSTRAINT categories_pkey;
       public            postgres    false    220            �           2606    16449    cities cities_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.cities
    ADD CONSTRAINT cities_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.cities DROP CONSTRAINT cities_pkey;
       public            postgres    false    222            �           2606    16465 $   eventCategories eventCategories_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public."eventCategories"
    ADD CONSTRAINT "eventCategories_pkey" PRIMARY KEY (id);
 R   ALTER TABLE ONLY public."eventCategories" DROP CONSTRAINT "eventCategories_pkey";
       public            postgres    false    226            �           2606    16458    events events_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.events DROP CONSTRAINT events_pkey;
       public            postgres    false    224            �           2606    16472    partners partners_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.partners
    ADD CONSTRAINT partners_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.partners DROP CONSTRAINT partners_pkey;
       public            postgres    false    228            �           2606    16493     paymentMethod paymentMethod_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public."paymentMethod"
    ADD CONSTRAINT "paymentMethod_pkey" PRIMARY KEY (id);
 N   ALTER TABLE ONLY public."paymentMethod" DROP CONSTRAINT "paymentMethod_pkey";
       public            postgres    false    234            �           2606    16435    profile profile_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.profile
    ADD CONSTRAINT profile_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.profile DROP CONSTRAINT profile_pkey;
       public            postgres    false    218            �           2606    16479 ,   reservationSections reservationSections_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public."reservationSections"
    ADD CONSTRAINT "reservationSections_pkey" PRIMARY KEY (id);
 Z   ALTER TABLE ONLY public."reservationSections" DROP CONSTRAINT "reservationSections_pkey";
       public            postgres    false    230            �           2606    16486 (   reservationStatus reservationStatus_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public."reservationStatus"
    ADD CONSTRAINT "reservationStatus_pkey" PRIMARY KEY (id);
 V   ALTER TABLE ONLY public."reservationStatus" DROP CONSTRAINT "reservationStatus_pkey";
       public            postgres    false    232            �           2606    16507 *   reservationTickets reservationTickets_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY public."reservationTickets"
    ADD CONSTRAINT "reservationTickets_pkey" PRIMARY KEY (id);
 X   ALTER TABLE ONLY public."reservationTickets" DROP CONSTRAINT "reservationTickets_pkey";
       public            postgres    false    238            �           2606    16500    reservations reservations_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.reservations
    ADD CONSTRAINT reservations_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.reservations DROP CONSTRAINT reservations_pkey;
       public            postgres    false    236            �           2606    16426    users user_email_key 
   CONSTRAINT     P   ALTER TABLE ONLY public.users
    ADD CONSTRAINT user_email_key UNIQUE (email);
 >   ALTER TABLE ONLY public.users DROP CONSTRAINT user_email_key;
       public            postgres    false    216            �           2606    16424    users user_pkey 
   CONSTRAINT     M   ALTER TABLE ONLY public.users
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);
 9   ALTER TABLE ONLY public.users DROP CONSTRAINT user_pkey;
       public            postgres    false    216            �           2606    16514    wishList wishList_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."wishList"
    ADD CONSTRAINT "wishList_pkey" PRIMARY KEY (id);
 D   ALTER TABLE ONLY public."wishList" DROP CONSTRAINT "wishList_pkey";
       public            postgres    false    240            |   �   x�m�;�0E��^E6k���+`i,$P��*�'��� M{4�����<�i��#\^� r�=H�ցYN�X���p���!J D�$�2�a1�6�ycYue�n�P�#��AZQ�=Qݵ��!A�� Ā�3o�����"�B��"����� �\L�      f   �   x�e�M
�0����@Cf�M�v��tW�(
���fU���'4ou��I���ad��T8ٔ�$�t3���Z���CU�b����?Jbl�)w���i��\a.N�
gt�tm���g(q����<sw�5�| z�)�      h   �   x�m�MjA����)��Mի���e��p�`c2�������z����ұ�C�)}>7�r?��mh���Αg̕��	�֭>z�I��W�h�v<�˨V99�hy�A,9.����a�h�������f!,e���g��`�#��P�~o?������G������p;�^'L+,���*�}k�T&      l   g   x�eλ�0�M����!<���#�K���-��v�_�>�F�*C,��G�͎�insn�Fq"k7vM6���P�mə������T�W���_"�      j   �   x�mϽn� ��?/`���E��ҡ]�X
�\9vd�y�w�%Ă��������F��ֶF'"و�����Z��ɡE�����/i��nM/����--G <�`"���;�č��K+���Q��I��qHs�ŭ��a1RP��{)l�c&����%���_	$£�9"��#�jv�ygq���.�>���w�,SAA�z���[��,S�JE5��xwo<��Цi��é]z꼒�U�+B`�ѣ���pZi�      n   E   x�3�44�04��4204�4��*H�,��/��4202�50�54Q02�22�20Գ45�47������� �Y      t   6   x�3�,)J�+NK-�4202�50�54Q02�2��24�33453�������� �
/      d   
  x���Mj�0�t
] b4�����٨Xnc)�nBr��N)m!��`��ON��.�[��yhS[��ivc�BJ��fB�n�5F� ��@�7�_O�+羪K�]��`�,;�x��r.�v*�b��|�<3`V�Ede|�i�s~XE�&�E�Dl��6�zP�~�-Nb�>�R'�׮���_�)�1�(�-�bV"���uMms�㣆0(p	!��̑f|�`��D	��6��_�[����3?	c2Qs 0��P�nr�      p   6   x�3�t��I�T15�4202�50�54Q02�2��22�370561������� ��      r   5   x�3�,.MNN-.�4202�50�54Q02�26�25�3��0�0������� �C	�      x   3   x�3�4�4�4�4202�50�54U0��2��26�367�46������� �}      v   j   x�m��1D�3T����M[��_G�r�"���32¾~i\֛�RT�D�H��f�!�ӽ�E6�,_�j��WY���i����ZǾ��u/MY>�G��|O!�      b   �  x���Is�\�5�Y��[��*UA�#� s��A�I�A�_��T}�%+7���S�Hd�㣀��O�IX���Iu"���-� M��W�F�:�Q�=�$��_pU��겣�R=�R#I=�Q���T��O�v��8�Ĕ�� ��}]�*G� ��o@�0Ù�N(@�$��Q^X�=�Oc�<��.zJvk��Oٕq�kRf{��>���l��ആ�ƪ�a�`����=���Є�\�+A�vF�	$ �O���|`&ve� ^u̲8Д�7iӣXUT�|�#���"��7��E�&��.�I�NZ+�h��I� 7ah���O��Ɉ�e{��BK��s�q-���v4�w�ݩ?�5��c�Vr�l��P^mB���Ѯ�����3@�[�s��J ��ȧe��tX6c�R�z����k�j�-t��b+�LG�+���3��@�"{���u��?ě�'4��xȈo2�i4v�
˝,nK%�y����?n�j*d�|����!��X]W�A��&3�,��Q����W���g7i��'�!#��pMO_u�O�����b6ip0MF���W�؈�[VT�l��W���P�!�G��F��V���8�~�c��`)�k7�Ǳhk?l���{Z�%.Xq=�D��P喠phM���Y�\�ծ��![����N&�U㖿�@��j|-K���Q�{���=���y�����kƆ���G��Sl��xr���GL+���g���khӁ���֊n��"���[F��N8H�W?i�}[�UT!��y~Ԙ�|ԣ�<�G0�CLȣJzs���O���B'xqY��Xr������>���v�?�}����g5�)��A�]JˠB���4li�̰��c��E�݂�L%��m�w^
j�\��1^ݶ�,��h�NYu�v�{�y���ݛ��	h@=�������/���      z   2   x�3�44�44�4202�50�5�P00�26�20ӳ4126������� �f     